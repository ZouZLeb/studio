'use client';

import { useState, useCallback, useRef } from 'react';
import type { ChatMessage, Segment, ChatApiResponse } from '../types/chat';

// Generate a stable session ID per browser tab (not persisted intentionally)
function generateSessionId(): string {
  return `sess_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
}

// Sanitize user input on the client side before sending
function sanitizeClientInput(input: string): string {
  return input
    .replace(/<[^>]+>/g, '')
    .replace(/\0/g, '')
    .trim()
    .substring(0, 500);
}

const SESSION_ID = generateSessionId();

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  plainText: "Hi! I'm Ema, your AI assistant at AImatic Dev Solutions. 👋 I'm here to help you explore how AI and automation can transform your business. What can I help you with today?",
  segments: [
    {
      type: 'text',
      content: "Hi! I'm Ema, your AI assistant at AImatic Dev Solutions. 👋 I'm here to help you explore how AI and automation can transform your business. What can I help you with today?"
    }
  ],
  timestamp: Date.now(),
};

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(async (rawInput: string) => {
    const input = sanitizeClientInput(rawInput);
    if (!input || isLoading) return;

    setError(null);

    // Add user message immediately
    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      plainText: input,
      segments: [{ type: 'text', content: input }],
      timestamp: Date.now(),
    };

    // Add typing indicator for assistant
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

    // Cancel any in-flight request
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          sessionId: SESSION_ID,
        }),
        signal: abortRef.current.signal,
      });

      const data: ChatApiResponse = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Something went wrong.');
      }

      // Replace typing indicator with real response
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

      const actualErrorText = err instanceof Error ? err.message : "I'm having trouble connecting right now. Please try again in a moment.";

      const errorMessage: ChatMessage = {
        id: `error_${Date.now()}`,
        role: 'assistant',
        plainText: actualErrorText,
        segments: [{
          type: 'text',
          content: actualErrorText
        }],
        timestamp: Date.now(),
      };

      setMessages(prev =>
        prev.map(m => m.id === typingId ? errorMessage : m)
      );

      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const clearMessages = useCallback(() => {
    setMessages([WELCOME_MESSAGE]);
    setError(null);
  }, []);

  return { messages, isLoading, error, sendMessage, clearMessages };
}