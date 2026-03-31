import { Metadata } from "next";
import QAContent from "./qa-content";

export const metadata: Metadata = {
  title: "Q&A | AI Automation & Expert Advice | AImatic Dev Solutions",
  description: "Common questions about AI automation, security, implementation, and how to save time in your business with AImatic.",
};

export default function QAPage() {
  return <QAContent />;
}
