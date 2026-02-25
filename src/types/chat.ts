export type SegmentType = 'heading' | 'list-item' | 'text';

export interface Segment {
  type: SegmentType;
  content: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  segments: Segment[];
  plainText: string;
  timestamp: number;
  isTyping?: boolean;
}

export interface ChatApiResponse {
  success: boolean;
  segments: Segment[];
  plainText: string;
  error?: string;
}