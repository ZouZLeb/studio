# SecureAutomate | Privacy-First Business Automation

SecureAutomate is a premium engineering agency site built to showcase custom, self-hosted automation solutions. We help businesses save hours of manual work by building "software robots" that they own completely, ensuring data privacy and zero recurring per-task fees.

## 🚀 The Mission

Our goal is to move businesses away from fragile, "rented" AI tools and towards robust, engineered systems. We focus on:
- **Ownership:** You own 100% of the code and workflows.
- **Privacy:** Your sensitive business data stays on your private servers.
- **ROI:** Replacing manual labor with systems that pay for themselves in weeks.

## 🛠 Tech Stack

This project is built with a high-performance, modern stack:

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **AI Orchestration:** [Genkit](https://github.com/firebase/genkit) (Google Gemini 1.5 Flash)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Charts/Graphs:** [Recharts](https://recharts.org/)

## 📂 Key Features

- **Lead Qualifying Chatbot:** A Genkit-powered assistant that helps potential clients understand our services and book calls.
- **ROI Calculator:** An interactive tool to help business owners visualize their potential yearly savings.
- **Engineering Lifecycle:** A visual vertical timeline showing our 6-step build process.
- **Case Studies Carousel:** Real-world examples of automation projects with clear metrics.
- **Atmospheric UI:** A modern, glassy aesthetic optimized for both Light and Dark modes.

## 🚦 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Environment Variables:**
   Create a `.env` file and add your `GOOGLE_GENAI_API_KEY`.

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Start Genkit (for AI development):**
   ```bash
   npm run genkit:dev
   ```

## 🔒 Security & Standards

This project follows professional engineering standards:
- **Server-Side AI:** All AI logic is handled via Server Actions to protect API keys.
- **Data Sanitization:** User inputs are safely handled within structured prompts.
- **Optimized Performance:** Using Next.js image optimization and efficient animation loops.
