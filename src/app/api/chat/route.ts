import { NextRequest, NextResponse } from 'next/server';

/**
 * Backend Chat Handler with Security Layer
 * Implements HMAC verification, rate limiting, and authenticated webhook forwarding.
 */

const ipRequestMap = new Map<string, { count: number; windowStart: number; blocked: boolean }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 10;
const CHAT_SECRET = process.env.NEXT_PUBLIC_CHAT_SECRET || 'dev_secret_only_for_local';
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

// HMAC Verification Logic
async function verifySignature(req: NextRequest, body: any): Promise<boolean> {
  const signature = req.headers.get('X-Chat-Signature');
  const timestamp = req.headers.get('X-Chat-Timestamp');
  const nonce = req.headers.get('X-Chat-Nonce');

  if (!signature || !timestamp || !nonce) return false;

  // Prevent replay attacks (requests older than 5 mins)
  const now = Date.now();
  if (Math.abs(now - parseInt(timestamp)) > 5 * 60 * 1000) return false;

  const encoder = new TextEncoder();
  const keyBuffer = encoder.encode(CHAT_SECRET);
  const dataToSign = JSON.stringify({ ...body, timestamp: parseInt(timestamp), nonce });

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
    
    // 1. Multi-layer Security Check: HMAC Verification
    const isAuthentic = await verifySignature(req, body);
    if (!isAuthentic) {
      console.warn(`[SECURITY_ALERT] Invalid HMAC signature from IP: ${ip}`);
      return NextResponse.json({ error: 'Request authentication failed.' }, { status: 403 });
    }

    // 2. Input Sanitization
    const sanitizedMessage = sanitizeInput(body.message);
    if (!sanitizedMessage) {
      return NextResponse.json({ error: 'Invalid message content.' }, { status: 400 });
    }

    // 3. Forwarding to AI Webhook (n8n)
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json({ 
        success: true, 
        plainText: "AImatic is currently in maintenance. Security verification passed, but the AI core is offline.",
        segments: [{ type: 'text', content: "Maintenance Mode: AI Core Offline." }]
      });
    }

    const n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-API-Key': WEBHOOK_API_KEY // Industry standard header for API authentication
      },
      body: JSON.stringify({
        message: sanitizedMessage,
        sessionId: body.sessionId,
        fingerprint: req.headers.get('X-Chat-Fingerprint'),
        timestamp: Date.now(),
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
    });

  } catch (err: unknown) {
    console.error('Chat API error:', err);
    return NextResponse.json({ error: 'Service temporarily unavailable.' }, { status: 503 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
}
