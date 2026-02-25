import { NextRequest, NextResponse } from 'next/server';

// ── Rate limiting (in-memory, per-instance) ───────────────────────────────
// For production with multiple instances, replace with Upstash Redis
const ipRequestMap = new Map<string, { count: number; windowStart: number; blocked: boolean }>();

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5;               // 5 requests per minute per IP
const BLOCK_AFTER_ABUSE = 3;            // abuse attempts before hard block

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

// Clean stale entries every 5 minutes to prevent memory leak
setInterval(() => {
  const cutoff = Date.now() - RATE_LIMIT_WINDOW_MS * 5;
  for (const [key, val] of ipRequestMap.entries()) {
    if (val.windowStart < cutoff) ipRequestMap.delete(key);
  }
}, 5 * 60 * 1000);

// ── Input sanitization ────────────────────────────────────────────────────
function sanitizeInput(input: unknown): string | null {
  if (typeof input !== 'string') return null;

  let text = input
    .replace(/\0/g, '')                    // null bytes
    .replace(/<script[\s\S]*?<\/script>/gi, '') // script tags
    .replace(/<[^>]+>/g, '')              // all html tags
    .replace(/javascript:/gi, '')         // js protocol
    .replace(/on\w+\s*=/gi, '')           // event handlers
    .trim();

  if (text.length === 0 || text.length > 500) return null;

  // Reject non-printable heavy strings (encoding attacks)
  const printable = (text.match(/[\x20-\x7E\u00A0-\uFFFF]/g) || []).length;
  if (text.length > 10 && printable / text.length < 0.7) return null;

  return text;
}

function sanitizeSessionId(input: unknown): string {
  if (typeof input !== 'string') return 'anonymous';
  return input.replace(/[^a-zA-Z0-9_-]/g, '').substring(0, 64) || 'anonymous';
}

// ── Main handler ──────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    // 1. Get real IP (Cloudflare sends CF-Connecting-IP)
    const ip =
      req.headers.get('cf-connecting-ip') ||
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      '0.0.0.0';

    // 2. Rate limit check
    const record = getRateLimitRecord(ip);

    if (record.blocked) {
      return NextResponse.json(
        { error: 'Too many requests.' },
        { status: 429 }
      );
    }

    record.count++;

    if (record.count > RATE_LIMIT_MAX + BLOCK_AFTER_ABUSE) {
      record.blocked = true;
      return NextResponse.json(
        { error: 'Too many requests.' },
        { status: 429 }
      );
    }

    if (record.count > RATE_LIMIT_MAX) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment.' },
        { status: 429 }
      );
    }

    // 3. Parse and validate body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
    }

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
    }

    const { message, sessionId: rawSession } = body as Record<string, unknown>;

    const sanitizedMessage = sanitizeInput(message);
    if (!sanitizedMessage) {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
    }

    const sessionId = sanitizeSessionId(rawSession);

    // 4. Validate env vars
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    const apiKey = process.env.N8N_API_KEY;

    if (!webhookUrl) {
      console.error('Missing N8N_WEBHOOK_URL env var');
      return NextResponse.json({ error: 'Service unavailable.' }, { status: 503 });
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'x-forwarded-ip': ip,
    };

    if (apiKey) {
      headers['x-api-key'] = apiKey;
    }

    // 5. Forward to n8n webhook
    const n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        message: sanitizedMessage,
        sessionId,
        timestamp: Date.now(),
      }),
      signal: AbortSignal.timeout(30000), // 30s timeout for LLM response
    });

    if (!n8nResponse.ok) {
      const status = n8nResponse.status;
      let errorMessage = 'Service unavailable.';

      try {
        const errorData = await n8nResponse.json();
        errorMessage = errorData.error?.message || errorData.error || errorData.message || `API Error: ${status}`;
      } catch {
        errorMessage = `API Error: ${status}`;
      }

      console.error(`[CHAT_API_ERROR] Status: ${status} | Message: ${errorMessage}`);

      if (status === 429) {
        return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
      }
      return NextResponse.json({ error: errorMessage }, { status });
    }

    const data = await n8nResponse.json();

    // 6. Validate n8n response shape before passing to frontend
    if (!data || typeof data !== 'object') {
      return NextResponse.json({ error: 'Service unavailable.' }, { status: 503 });
    }

    // Only pass through what the frontend needs — never leak internal fields
    return NextResponse.json({
      success: data.success ?? true,
      segments: Array.isArray(data.segments) ? data.segments : [],
      plainText: typeof data.plainText === 'string' ? data.plainText : '',
    });

  } catch (err: unknown) {
    if (err instanceof Error && err.name === 'TimeoutError') {
      return NextResponse.json({ error: 'Request timed out.' }, { status: 504 });
    }
    console.error('Chat API error:', err);
    return NextResponse.json({ error: 'Service unavailable.' }, { status: 503 });
  }
}

// Block all other HTTP methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
}