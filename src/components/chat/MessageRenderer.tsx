'use client';

import { useState, useCallback, useEffect } from 'react';
import { TypewriterText } from './TypewriterText';
import type { Segment } from '../../types/chat';

interface MessageRendererProps {
  segments: Segment[];
  animate: boolean;
  onAnimationComplete?: () => void;
}

// Parse inline formatting: **bold**, *italic*, emojis pass through naturally
function parseInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  // Match **bold** or *italic*
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[0].startsWith('**')) {
      parts.push(<strong key={match.index} className="font-semibold">{match[2]}</strong>);
    } else {
      parts.push(<em key={match.index} className="italic">{match[3]}</em>);
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

export function MessageRenderer({
  segments,
  animate,
  onAnimationComplete,
}: MessageRendererProps) {
  const [currentSegment, setCurrentSegment] = useState(0);
  const [completed, setCompleted] = useState(!animate);

  const handleSegmentComplete = useCallback(() => {
    setCurrentSegment(prev => prev + 1);
  }, []);

  useEffect(() => {
    if (animate && !completed && segments.length > 0 && currentSegment >= segments.length) {
      setCompleted(true);
      onAnimationComplete?.();
    }
  }, [currentSegment, segments.length, animate, completed, onAnimationComplete]);

  if (!segments || segments.length === 0) return null;

  return (
    <div className="space-y-1.5">
      {segments.map((segment, index) => {
        const isVisible = !animate || completed || index <= currentSegment;
        const shouldAnimate = animate && !completed && index === currentSegment;

        if (!isVisible) return null;

        if (segment.type === 'heading') {
          return (
            <p key={index} className="font-semibold text-[15px] text-white mt-2 mb-0.5">
              {shouldAnimate ? (
                <TypewriterText
                  text={segment.content}
                  speed={14}
                  onComplete={handleSegmentComplete}
                />
              ) : (
                segment.content
              )}
            </p>
          );
        }

        if (segment.type === 'list-item') {
          return (
            <div key={index} className="flex items-start gap-2 pl-1">
              <span className="text-violet-400 mt-[3px] text-xs shrink-0">•</span>
              <p className="text-[14px] leading-relaxed text-white/90 m-0">
                {shouldAnimate ? (
                  <TypewriterText
                    text={segment.content}
                    speed={16}
                    onComplete={handleSegmentComplete}
                  />
                ) : (
                  parseInline(segment.content)
                )}
              </p>
            </div>
          );
        }

        // Default: text paragraph
        return (
          <p key={index} className="text-[14px] leading-relaxed text-white/90 m-0">
            {shouldAnimate ? (
              <TypewriterText
                text={segment.content}
                speed={18}
                onComplete={handleSegmentComplete}
              />
            ) : (
              parseInline(segment.content)
            )}
          </p>
        );
      })}
    </div>
  );
}