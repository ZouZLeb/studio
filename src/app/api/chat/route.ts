import { NextRequest, NextResponse } from 'next/server';

// Required for Cloudflare Workers: forces the edge runtime.
// Without this, OpenNext may fall back to the Node.js runtime, which cannot
// properly handle POST requests in the Cloudflare Workers deployment environment.
export const runtime = 'edge';

/**
 * Backend Chat Handler with Security Layer
 * Implements HMAC verification, rate limiting, and authenticated webhook forwarding.
 */

const ipRequestMap = new Map<string, { count: number; windowStart: number; blocked: boolean }>();
const sessionUsageMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 10;
const SESSION_LIMIT_MAX = 30;
const SESSION_WINDOW_MS = 24 * 60 * 60 * 1000;

// NOTE: Use CHAT_SECRET (no NEXT_PUBLIC_ prefix) for the server.
// NEXT_PUBLIC_ variables are baked into the client at build time and are unavailable at runtime on Cloudflare Workers.
const CHAT_SECRET = process.env.CHAT_SECRET || process.env.NEXT_PUBLIC_CHAT_SECRET || 'dev_secret_only_for_local';
const WEBHOOK_API_KEY = process.env.N8N_API_KEY || '';

function getRateLimitRecord(ip: string) {
  const now = Date.now();
  const record = ipRequestMap.get(ip);
  if (!record || now - record.windowStart > RATE_LIMIT_WINDOW_MS) {
    const fresh = { count: 0, windowStart: now, blocked: false };
    ipRequestMap.set(ip, fresh);
    return fresh;
  }
  return record;
}

function getSessionUsage(sessionId: string) {
  const now = Date.now();
  let usage = sessionUsageMap.get(sessionId);

  if (!usage || now > usage.resetAt) {
    usage = { count: 0, resetAt: now + SESSION_WINDOW_MS };
    sessionUsageMap.set(sessionId, usage);
  }
  
  return usage;
}

// HMAC Verification Logic
async function verifySignature(req: NextRequest, body: any): Promise<boolean> {
  const signature = req.headers.get('X-Chat-Signature');
  const timestamp = req.headers.get('X-Chat-Timestamp');
  const nonce = req.headers.get('X-Chat-Nonce');

  if (!signature || !timestamp || !nonce) return false;

  // Development bypass for insecure contexts (HTTP via IP access)
  if (process.env.NODE_ENV === 'development' && signature === 'insecure_context_skip_signing') {
    return true;
  }

  // Prevent replay attacks (requests older than 1 hour to allow for local clock skew)
  const now = Date.now();
  if (Math.abs(now - parseInt(timestamp)) > 60 * 60 * 1000) return false;

  const encoder = new TextEncoder();
  const keyBuffer = encoder.encode(CHAT_SECRET);
  // Use deterministic string concatenation exactly matching the client
  const dataToSign = `${body.sessionId}:${body.message}:${timestamp}:${nonce}`;

  try {
    const key = await crypto.subtle.importKey(
      'raw',
      keyBuffer,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const sigBuffer = new Uint8Array(
      signature.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))
    );

    return await crypto.subtle.verify(
      'HMAC',
      key,
      sigBuffer,
      encoder.encode(dataToSign)
    );
  } catch {
    return false;
  }
}

function sanitizeInput(input: unknown): string | null {
  if (typeof input !== 'string') return null;
  let text = input.replace(/<[^>]+>/g, '').trim();
  if (text.length === 0 || text.length > 500) return null;
  return text;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('cf-connecting-ip') || '0.0.0.0';
    const record = getRateLimitRecord(ip);

    if (record.blocked || record.count > RATE_LIMIT_MAX) {
      return NextResponse.json({ error: 'System busy. Try again later.' }, { status: 429 });
    }
    record.count++;

    const body = await req.json();
    const sessionId = body.sessionId;

    if (!sessionId) {
      return NextResponse.json({ error: 'Session required.' }, { status: 400 });
    }

    // 1. Session-based Usage Limit (30 messages / 24h)
    const usage = getSessionUsage(sessionId);
    if (usage.count >= SESSION_LIMIT_MAX) {
      const waitTimeHours = Math.ceil((usage.resetAt - Date.now()) / (1000 * 60 * 60));
      return NextResponse.json({ 
        error: `Daily message limit reached. Resetting in ${waitTimeHours} hours.`,
        remainingMessages: 0 
      }, { status: 429 });
    }

    // 2. Multi-layer Security Check: HMAC Verification
    const isAuthentic = await verifySignature(req, body);
    if (!isAuthentic) {
      console.warn(`[SECURITY_ALERT] Invalid HMAC signature from IP: ${ip}`);
      return NextResponse.json({ error: 'Request authentication failed.' }, { status: 403 });
    }

    // 3. Input Sanitization
    const sanitizedMessage = sanitizeInput(body.message);
    if (!sanitizedMessage) {
      return NextResponse.json({ error: 'Invalid message content.' }, { status: 400 });
    }

    // Increment usage after all validation passes
    usage.count++;

    // 4. Forwarding to AI Webhook (n8n)
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json({ 
        success: true, 
        plainText: "AImatic is currently in maintenance. Security verification passed, but the AI core is offline.",
        segments: [{ type: 'text', content: "Maintenance Mode: AI Core Offline." }],
        remainingMessages: SESSION_LIMIT_MAX - usage.count
      });
    }

    const n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-api-key': WEBHOOK_API_KEY // Industry standard header for API authentication
      },
      body: JSON.stringify({
        message: sanitizedMessage,
        sessionId: body.sessionId,
        fingerprint: req.headers.get('X-Chat-Fingerprint'),
        timestamp: Date.now(),
        messageCount: usage.count // Pass message count to webhook if needed
      }),
      signal: AbortSignal.timeout(30000),
    });

    if (!n8nResponse.ok) {
      const errorData = await n8nResponse.text();
      console.error(`[WEBHOOK_ERROR] Status: ${n8nResponse.status} - ${errorData}`);
      throw new Error('AI Core connection failure');
    }

    const data = await n8nResponse.json();
    return NextResponse.json({
      success: true,
      segments: data.segments || [],
      plainText: data.plainText || '',
      remainingMessages: SESSION_LIMIT_MAX - usage.count
    });

  } catch (err: unknown) {
    console.error('Chat API error:', err);
    return NextResponse.json({ error: 'Service temporarily unavailable.' }, { status: 503 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
}

// Handle CORS preflight requests so browsers don't block the POST
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': 'https://aimatic.dev',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Chat-Signature, X-Chat-Timestamp, X-Chat-Nonce, X-Chat-Fingerprint',
    },
  });
}
