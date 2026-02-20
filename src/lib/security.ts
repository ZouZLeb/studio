/**
 * @fileOverview Security utilities for request signing and anti-spoofing.
 */

/**
 * Generates a simple SHA-256 HMAC-like signature for client-side requests.
 * Note: For production, a more robust secret management system should be used.
 */
export async function generateSignature(message: string, nonce: string, timestamp: number): Promise<string> {
  const secret = process.env.NEXT_PUBLIC_CHAT_SECRET || 'aimatic-default-secret';
  const data = `${message}:${nonce}:${timestamp}`;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  return btoa(String.fromCharCode(...new Uint8Array(signature)));
}

/**
 * Validates the signature and timestamp on the server.
 */
export async function verifySignature(
  message: string,
  nonce: string,
  timestamp: number,
  signature: string
): Promise<boolean> {
  // 1. Timestamp validation (prevent replay attacks, allow 5 min window)
  const now = Date.now();
  if (Math.abs(now - timestamp) > 300000) {
    return false;
  }

  // 2. Signature verification
  const expected = await generateSignature(message, nonce, timestamp);
  return expected === signature;
}

/**
 * Simple device fingerprinting helper.
 */
export function getDeviceFingerprint() {
  if (typeof window === 'undefined') return 'server';
  const { userAgent, platform, language } = window.navigator;
  const { width, height, colorDepth } = window.screen;
  return btoa(`${userAgent}|${platform}|${language}|${width}x${height}|${colorDepth}`);
}
