'use client';

import { useEffect, useState, useRef } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;         // ms per character
  onComplete?: () => void;
  className?: string;
}

export function TypewriterText({
  text,
  speed = 18,
  onComplete,
  className = '',
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Reset on new text
    setDisplayed('');
    setDone(false);
    indexRef.current = 0;

    function tick() {
      if (indexRef.current < text.length) {
        // Batch a few chars at once for emoji/unicode safety
        const nextIndex = Math.min(indexRef.current + 2, text.length);
        setDisplayed(text.slice(0, nextIndex));
        indexRef.current = nextIndex;
        timerRef.current = setTimeout(tick, speed);
      } else {
        setDone(true);
        onComplete?.();
      }
    }

    timerRef.current = setTimeout(tick, speed);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, speed, onComplete]);

  return (
    <span className={className}>
      {displayed}
      {!done && (
        <span className="inline-block w-[2px] h-[1em] bg-current ml-[1px] align-middle animate-pulse" />
      )}
    </span>
  );
}