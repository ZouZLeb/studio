import { BrandName } from "@/components/brand-name";
import React from "react";

export function formatBrandName(text: string): React.ReactNode {
  if (!text) return text;
  const parts = text.split(/(AImatic)/g);
  return parts.map((part, i) => 
    part === 'AImatic' ? <BrandName key={i} /> : part
  );
}
