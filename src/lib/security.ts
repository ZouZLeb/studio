'use client';

/**
 * Multi-layer security utilities for AImatic Chatbot.
 * Handles HMAC signing, fingerprinting, and persistent device identification.
 */

const STORAGE_KEY = 'aimatic_device_id';
const SECRET_KEY = process.env.NEXT_PUBLIC_CHAT_SECRET || 'dev_secret_only_for_local';

/**
 * Generates a UUID V4, using crypto.randomUUID if available, 
 * with a fallback for insecure contexts (HTTP/IP-based access).
 */
export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Generates a session ID based on the device fingerprint and the current date.
 * This ensures a unique, consistent session per device per day, naturally resetting daily.
 */
export function getDailySessionId(): string {
  if (typeof window === 'undefined') return 'server_side';

  const fp = getBrowserFingerprint();
  const d = new Date();
  const dateStr = `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`;
  return `sess_${fp}_${dateStr}`;
}

/**
 * Generates a basic browser fingerprint.
 * Used to detect anomalies and prevent request spoofing.
 */
export function getBrowserFingerprint(): string {
  if (typeof window === 'undefined') return 'server';
  
  const nav = window.navigator;
  const screen = window.screen;
  
  const fingerprint = [
    nav.userAgent,
    nav.language,
    screen.colorDepth,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    nav.hardwareConcurrency || 'unknown',
  ].join('|');

  return btoa(fingerprint).substring(0, 32);
}

/**
 * Creates an HMAC-SHA256 signature for a message payload.
 * Validates request authenticity on the server.
 */
export async function signRequest(payload: any, timestamp: number, nonce: string): Promise<string> {
  // Check if crypto.subtle is available (it’s not in insecure contexts like HTTP/IP)
  if (typeof crypto === 'undefined' || !crypto.subtle) {
    console.warn('[SECURITY] Crypto.subtle is not available. Using placeholder signature for development.');
    return 'insecure_context_skip_signing';
  }

  const encoder = new TextEncoder();
  const keyBuffer = encoder.encode(SECRET_KEY);
  
  // Use deterministic string concatenation instead of JSON.stringify which is sensitive to key order
  const dataToSign = `${payload.sessionId}:${payload.message}:${timestamp}:${nonce}`;

  try {
    const key = await crypto.subtle.importKey(
      'raw',
      keyBuffer,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signature = await crypto.subtle.sign(
      'HMAC',
      key,
      encoder.encode(dataToSign)
    );

    return Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  } catch (error) {
    console.error('[SECURITY_ERROR] Signature generation failed:', error);
    return 'signature_error';
  }
}
