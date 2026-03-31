import React from 'react';
import { cn } from '@/lib/utils';

interface BrandNameProps {
  className?: string;
}

export function BrandName({ className }: BrandNameProps) {
  return (
    <span className={cn("text-primary font-black", className)}>
    <span className={cn("font-brand")}>
      AI
    </span>matic
    </span>
  );
}
