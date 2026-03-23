"use client";

import dynamic from 'next/dynamic';

const ChatWidget = dynamic(() => import('./chat').then(mod => mod.ChatWidget), { ssr: false });
const WelcomePopup = dynamic(() => import('./landing/welcome-popup').then(mod => mod.WelcomePopup), { ssr: false });

export function GlobalDynamicComponents() {
  return (
    <>
      <WelcomePopup />
      <ChatWidget />
    </>
  );
}
