# SecureAutomate | Technical Walkthrough

This document provides a detailed overview of the SecureAutomate project architecture, file structure, and implementation details.

## 🏗 Project Architecture

The application is built using **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Genkit** for AI functionality. It follows a modular component-based architecture designed for high performance and security.

### 🏢 Key Architecture Concepts
- **Server vs. Client:** By default, components in `src/app` and `src/ai` are Server Components. Interactive UI elements in `src/components` use the `"use client"` directive.
- **AI Integration:** Genkit flows handle lead qualification on the server, ensuring LLM keys never reach the browser.
- **Theming:** A hybrid CSS variable system (HSL) supports smooth Dark/Light mode transitions with a custom "Glassmorphism" aesthetic.

---

## 📂 File Map & Walkthrough

### ⚙️ Configuration & Root
- **`package.json`**: Manages dependencies. Includes Genkit for AI, Framer Motion for animations, and ShadCN/Radix for accessible UI.
- **`next.config.ts`**: Configures Next.js. Specifically permits remote images from Unsplash and Picsum for the portfolio.
- **`tailwind.config.ts`**: Defines the design system (fonts, custom colors, animations).
- **`src/app/layout.tsx` (Server)**: The root wrapper. Injects global fonts (Inter & Source Code Pro), initializes the `ThemeProvider`, and handles security-conscious analytics loading via `next/script`.
- **`src/app/globals.css`**: The design engine. Contains HSL variables for themes and custom `@layer components` for the signature `.btn-custom-glass` effect.

### 🧠 AI Engine (Genkit)
- **`src/ai/genkit.ts` (Server)**: Initializes Genkit with the Google Generative AI plugin (Gemini 2.5 Flash).
- **`src/ai/flows/lead-qualifying-chatbot.ts` (Server Action)**: Defines the `leadQualifyingChatbot` flow. This is a secure server-side function that evaluates user messages to determine if they are high-intent leads.

### 🎨 UI Components (Client-Side Focus)
- **`src/app/page.tsx` (Server)**: The assembly line. It imports and sequences all landing page sections. It also contains the atmospheric background logic.
- **`src/components/chatbot.tsx` (Client)**: The interactive lead qualifier. It calls the server-side Genkit flow and handles message state.
- **`src/components/landing/navigation.tsx` (Client)**: Responsive header with a glass-morphic mobile burger menu.
- **`src/components/landing/hero.tsx` (Client)**: High-impact intro using Framer Motion for entrance animations.
- **`src/components/landing/roi-calculator.tsx` (Client)**: The financial engine. Uses React `useMemo` to calculate labor savings vs. engineering costs in real-time.
- **`src/components/landing/process-overview.tsx` (Client)**: The vertical timeline. Visualizes the engineering lifecycle with dynamic connector lines.
- **`src/components/landing/tech-stack.tsx` (Client)**: The infinite marquee loop of technology logos.
- **`src/components/landing/case-studies.tsx` (Client)**: A ShadCN Carousel-based portfolio of previous builds.

### 🛠 Utilities & Data
- **`src/lib/utils.ts`**: Standard Tailwind class merging utility.
- **`src/lib/placeholder-images.json`**: Centralized metadata for all images to ensure consistent aspect ratios and search hints.
- **`src/hooks/use-toast.ts`**: ShadCN utility for non-intrusive error notifications.

---

## 🔒 Security & Best Practices

1. **Zero-Secret Exposure**: No API keys or sensitive strings are present in the source code. All AI calls are wrapped in Server Actions.
2. **Hydration Safety**: Components using browser APIs (like `window` or `Math.random`) use the `useEffect` hook to prevent server/client mismatches.
3. **Data Sovereignty**: The UI messaging reinforces the engineering standard: SecureAutomate clients own their code and their data remains in their VPC.
4. **Content Security**: Third-party scripts (Analytics/Hotjar) are loaded via Next.js optimized script tags with explicit strategy markers.

---

## 🚀 Deployment Notes

- **Environment Variables**: Ensure `GOOGLE_GENAI_API_KEY` is set in your production environment (e.g., Firebase App Hosting, Vercel, or GCP).
- **Build**: Run `npm run build` to generate the production-ready static and dynamic routes.
- **Performance**: Images use `next/image` for automatic WebP conversion and lazy loading.
