'use client';

/**
 * Multi-layer security utilities for AImatic Chatbot.
 * Handles HMAC signing, fingerprinting, and persistent device identification.
 */

const STORAGE_KEY = 'aimatic_device_id';
const SECRET_KEY = process.env.NEXT_PUBLIC_CHAT_SECRET || 'dev_secret_only_for_local';

/**
 * Generates or retrieves a persistent UUID for the device/user.
 * This allows the AI agent to maintain context across sessions.
 */
export function getPersistentDeviceId(): string {
  if (typeof window === 'undefined') return 'server_side';

  let deviceId = localStorage.getItem(STORAGE_KEY);
  if (!deviceId) {
    deviceId = `aim_${crypto.randomUUID()}`;
    localStorage.setItem(STORAGE_KEY, deviceId);
  }
  return deviceId;
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
  const encoder = new TextEncoder();
  const keyBuffer = encoder.encode(SECRET_KEY);
  
  const dataToSign = JSON.stringify({
    ...payload,
    timestamp,
    nonce
  });

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
}
