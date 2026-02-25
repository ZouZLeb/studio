'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useChat } from '../../hooks/useChat';
import { MessageRenderer } from './MessageRenderer';
import { TypingIndicator } from './TypingIndicator';

// EMA avatar initials
function EmaAvatar() {
  return (
    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-md">
      <span className="text-white text-[10px] font-bold tracking-wide">EMA</span>
    </div>
  );
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [animatedIds, setAnimatedIds] = useState<Set<string>>(new Set(['welcome']));
  const { messages, isLoading, sendMessage } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Mark new assistant messages for animation
  useEffect(() => {
    messages.forEach(msg => {
      if (msg.role === 'assistant' && !msg.isTyping && !animatedIds.has(msg.id)) {
        setAnimatedIds(prev => new Set([...prev, msg.id]));
      }
    });
  }, [messages, animatedIds]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;
    const text = input.trim();
    setInput('');
    await sendMessage(text);
  }, [input, isLoading, sendMessage]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  return (
    <>
      {/* ── Floating button ── */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        className={`
          fixed bottom-6 right-6 z-50
          w-14 h-14 rounded-full shadow-2xl
          bg-gradient-to-br from-violet-600 to-indigo-700
          flex items-center justify-center
          transition-all duration-300 ease-out
          hover:scale-110 hover:shadow-violet-500/40 hover:shadow-2xl
          ${isOpen ? 'rotate-90' : 'rotate-0'}
        `}
      >
        {isOpen ? (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* ── Chat panel ── */}
      <div
        className={`
          fixed bottom-24 right-6 z-50
          w-[360px] max-w-[calc(100vw-24px)]
          flex flex-col
          rounded-2xl overflow-hidden
          shadow-2xl shadow-black/40
          border border-white/10
          transition-all duration-300 ease-out origin-bottom-right
          ${isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
          }
        `}
        style={{ height: '520px', background: '#0f0f18' }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-white/5 shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow">
            <span className="text-white text-[10px] font-bold">EMA</span>
          </div>
          <div>
            <p className="text-white text-sm font-semibold leading-none">Ema</p>
            <p className="text-white/40 text-[11px] mt-0.5">AImatic Dev Solutions</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/40 text-[11px]">Online</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {msg.role === 'assistant' && <EmaAvatar />}

              <div
                className={`
                  max-w-[85%] rounded-2xl px-3.5 py-2.5
                  ${msg.role === 'user'
                    ? 'bg-violet-600 text-white rounded-tr-sm'
                    : 'bg-white/8 text-white rounded-tl-sm border border-white/8'
                  }
                `}
              >
                {msg.isTyping ? (
                  <TypingIndicator />
                ) : msg.role === 'user' ? (
                  <p className="text-[14px] leading-relaxed">{msg.plainText}</p>
                ) : (
                  <MessageRenderer
                    segments={msg.segments}
                    animate={!animatedIds.has(msg.id) || msg.id === messages[messages.length - 1]?.id}
                    onAnimationComplete={() =>
                      setAnimatedIds(prev => new Set([...prev, msg.id]))
                    }
                  />
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div className="shrink-0 px-3 py-3 border-t border-white/10 bg-white/5">
          <div className="flex items-end gap-2 bg-white/8 rounded-xl px-3 py-2 border border-white/10 focus-within:border-violet-500/50 transition-colors">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder="Ask me anything..."
              rows={1}
              className="
                flex-1 bg-transparent text-white text-[14px] placeholder:text-white/30
                resize-none outline-none leading-relaxed
                max-h-24 overflow-y-auto
                disabled:opacity-50
              "
              style={{ scrollbarWidth: 'none' }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className="
                w-8 h-8 rounded-lg shrink-0
                bg-violet-600 hover:bg-violet-500
                disabled:opacity-30 disabled:cursor-not-allowed
                flex items-center justify-center
                transition-all duration-150
                hover:scale-105 active:scale-95
              "
            >
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </div>
          <p className="text-white/20 text-[10px] text-center mt-1.5">
            Powered by AImatic Dev Solutions
          </p>
        </div>
      </div>
    </>
  );
}