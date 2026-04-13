import { NextRequest, NextResponse } from 'next/server';

/**
 * Backend Chat Handler
 * Implements rate limiting and authenticated webhook forwarding to n8n.
 * Security: relies on same-origin (browser can only call from aimatic.dev),
 * per-session limits, and the n8n API key for the backend webhook.
 */

const ipRequestMap = new Map<string, { count: number; windowStart: number }>();
const sessionUsageMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 10;
const SESSION_LIMIT_MAX = 30;
const SESSION_WINDOW_MS = 24 * 60 * 60 * 1000;

const WEBHOOK_API_KEY = process.env.N8N_API_KEY || '';

function getRateLimitRecord(ip: string) {
  const now = Date.now();
  const record = ipRequestMap.get(ip);
  if (!record || now - record.windowStart > RATE_LIMIT_WINDOW_MS) {
    const fresh = { count: 0, windowStart: now };
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

function sanitizeInput(input: unknown): string | null {
  if (typeof input !== 'string') return null;
  let text = input.replace(/<[^>]+>/g, '').trim();
  if (text.length === 0 || text.length > 500) return null;
  return text;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for') || '0.0.0.0';
    const record = getRateLimitRecord(ip);

    if (record.count > RATE_LIMIT_MAX) {
      return NextResponse.json({ error: 'System busy. Try again later.' }, { status: 429 });
    }
    record.count++;

    const body = await req.json();
    const sessionId = body.sessionId;
    const fingerprint = body.fingerprint;

    if (!sessionId || !fingerprint) {
      return NextResponse.json({ error: 'Session and fingerprint required.' }, { status: 400 });
    }

    // Session-based Usage Limit (30 messages / 24h)
    const usage = getSessionUsage(sessionId);
    if (usage.count >= SESSION_LIMIT_MAX) {
      const waitTimeHours = Math.ceil((usage.resetAt - Date.now()) / (1000 * 60 * 60));
      return NextResponse.json({ 
        error: `Daily message limit reached. Resetting in ${waitTimeHours} hours.`,
        remainingMessages: 0 
      }, { status: 429 });
    }

    // Input Sanitization
    const sanitizedMessage = sanitizeInput(body.message);
    if (!sanitizedMessage) {
      return NextResponse.json({ error: 'Invalid message content.' }, { status: 400 });
    }

    // Increment after validation
    usage.count++;

    // Forward to AI Webhook (n8n)
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json({ 
        success: true, 
        plainText: "AImatic is currently in maintenance. The AI core is offline.",
        segments: [{ type: 'text', content: "Maintenance Mode: AI Core Offline." }],
        remainingMessages: SESSION_LIMIT_MAX - usage.count
      });
    }

    const n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-api-key': WEBHOOK_API_KEY
      },
      body: JSON.stringify({
        message: sanitizedMessage,
        sessionId: body.sessionId,
        fingerprint: body.fingerprint,
        timestamp: Date.now(),
        messageCount: usage.count
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

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
