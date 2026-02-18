# AImatic | Technical Walkthrough

This document provides a detailed overview of the AImatic project architecture, file structure, and implementation details.

## 🏗 Project Architecture

The application is built using **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Genkit** for AI functionality.

### 🏢 Key Architecture Concepts
- **Server vs. Client Boundary:**
    - **Server Components/Actions:** Genkit flows (`src/ai`), configuration, and main page structure (`src/app/page.tsx`).
    - **Client Components:** Interactive UI elements (`src/components`), ROI calculator, carousel, and the chatbot interface.
- **Data Sovereignty Messaging:** The entire site architecture reflects the agency's value proposition: clients own their systems and data remains private.

---

## 📂 File Map & Walkthrough

### ⚙️ Configuration & Root
- **`src/app/layout.tsx` (Server)**: The root wrapper. Injects global styles, handles the design theme, and safely loads analytics using `next/script`.
- **`src/app/globals.css`**: Defines the HSL color palette and the custom `.btn-custom-glass` component styling.
- **`tailwind.config.ts`**: Configures the design system, including custom Inter fonts and Source Code Pro for code snippets.

### 🧠 AI Engine (Genkit)
- **`src/ai/genkit.ts` (Server)**: Initializes the Genkit environment with Google AI.
- **`src/ai/flows/lead-qualifying-chatbot.ts` (Server Action)**: The core AI logic. It uses a structured prompt to qualify users based on privacy needs and technical complexity. The user message is securely injected via Handlebars (`{{{message}}}`).

### 🎨 Key Landing Sections (Client-Side)
- **`src/components/landing/hero.tsx`**: A high-impact entry point comparing generic AI agencies to private engineered builds.
- **`src/components/landing/differentiation-table.tsx`**: A detailed comparison tool highlighting security and ownership benefits.
- **`src/components/landing/case-studies.tsx`**: A mobile-optimized carousel showing real-world automation results.
- **`src/components/landing/process-overview.tsx`**: A vertical timeline visualizing the "Engineering Lifecycle" from Audit to Handover.
- **`src/components/landing/roi-calculator.tsx`**: A financial tool that calculates potential savings by comparing manual labor costs against system investment.
- **`src/components/landing/tech-stack.tsx`**: An infinite looping marquee of elite technologies used in the builds.
- **`src/components/chatbot.tsx`**: The interactive chat UI that connects users to the server-side Genkit flow.

### 🛠 Utilities
- **`src/lib/placeholder-images.json`**: Centralized storage for Unsplash image metadata to ensure fast loading and consistent visual quality.
- **`src/hooks/use-mobile.tsx`**: Utility for responsive component behavior (e.g., the vertical timeline spine adjustment).

---

## 🔒 Security Best Practices

1. **Environment Variable Protection**: All API keys are accessed via server-side Genkit flows; no secrets are exposed to the client.
2. **Sanitized Inputs**: User messages are handled through Genkit's prompt system, protecting against prompt injection while ensuring accurate context.
3. **Optimized Scripts**: Analytics and tracking scripts use Next.js `afterInteractive` strategy to prevent blocking the main thread.
4. **Hydration Safety**: Interactive components use standard React hooks to prevent server/client mismatches in dynamic values.
