'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import type { ChatMessage, ChatApiResponse } from '../types/chat';
import { getPersistentDeviceId, getBrowserFingerprint, signRequest } from '@/lib/security';

// Client-side sanitization
function sanitizeClientInput(input: string): string {
  return input
    .replace(/<[^>]+>/g, '')
    .replace(/\0/g, '')
    .trim()
    .substring(0, 500);
}

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  plainText: "Hi! I'm Ema, your AI assistant at AImatic. 👋 I recognize you! I'm here to help you explore how secure automation can transform your business. What can I help you with today?",
  segments: [
    {
      type: 'text',
      content: "Hi! I'm Ema, your AI assistant at AImatic. 👋 I'm here to help you explore how secure automation can transform your business. What can I help you with today?"
    }
  ],
  timestamp: Date.now(),
};

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deviceId, setDeviceId] = useState<string>('');
  const abortRef = useRef<AbortController | null>(null);

  // Initialize device ID on mount
  useEffect(() => {
    setDeviceId(getPersistentDeviceId());
  }, []);

  const sendMessage = useCallback(async (rawInput: string) => {
    const input = sanitizeClientInput(rawInput);
    if (!input || isLoading || !deviceId) return;

    setError(null);

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      plainText: input,
      segments: [{ type: 'text', content: input }],
      timestamp: Date.now(),
    };

    const typingId = `typing_${Date.now()}`;
    const typingMessage: ChatMessage = {
      id: typingId,
      role: 'assistant',
      plainText: '',
      segments: [],
      timestamp: Date.now(),
      isTyping: true,
    };

    setMessages(prev => [...prev, userMessage, typingMessage]);
    setIsLoading(true);

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      const timestamp = Date.now();
      const nonce = crypto.randomUUID();
      const fingerprint = getBrowserFingerprint();
      
      const payload = {
        message: input,
        sessionId: deviceId, // Use persistent ID for context
      };

      // Sign request for multi-layer defense
      const signature = await signRequest(payload, timestamp, nonce);

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Chat-Timestamp': timestamp.toString(),
          'X-Chat-Nonce': nonce,
          'X-Chat-Fingerprint': fingerprint,
          'X-Chat-Signature': signature
        },
        body: JSON.stringify(payload),
        signal: abortRef.current.signal,
      });

      const data: ChatApiResponse = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Connection issues. Please try again.');
      }

      const assistantMessage: ChatMessage = {
        id: `assistant_${Date.now()}`,
        role: 'assistant',
        segments: data.segments,
        plainText: data.plainText,
        timestamp: Date.now(),
        isTyping: false,
      };

      setMessages(prev =>
        prev.map(m => m.id === typingId ? assistantMessage : m)
      );

    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;

      const errorMessageText = err instanceof Error 
        ? err.message 
        : "I'm having trouble connecting. Security policies might be blocking the request. Please refresh.";

      const errorMessage: ChatMessage = {
        id: `error_${Date.now()}`,
        role: 'assistant',
        plainText: errorMessageText,
        segments: [{ type: 'text', content: errorMessageText }],
        timestamp: Date.now(),
      };

      setMessages(prev =>
        prev.map(m => m.id === typingId ? errorMessage : m)
      );
      setError(errorMessageText);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, deviceId]);

  const clearMessages = useCallback(() => {
    setMessages([WELCOME_MESSAGE]);
    setError(null);
  }, []);

  return { messages, isLoading, error, sendMessage, clearMessages };
}
