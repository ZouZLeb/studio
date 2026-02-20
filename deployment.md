# AImatic | Deployment Guide

This guide outlines the steps to take the **AImatic** project from development to a production-ready state, hosted on your live domain using standard providers or specialized edge platforms like Cloudflare.

## 🏗 Requirements for Production

Since AImatic uses **Next.js 15 (App Router)** and **Genkit (Server Actions)**, your hosting provider must support a **Node.js environment**.

### Recommended Hosting Providers:
1. **Cloudflare Pages** (Best for global performance, requires `@cloudflare/next-on-pages`)
2. **Vercel** (Easiest, optimized for Next.js)
3. **VPS (DigitalOcean / Linode)** (Best for "Ownership" — gives you total control)

---

## 🚀 Cloudflare Deployment (Recommended)

Cloudflare offers industry-leading security and performance. To deploy AImatic to Cloudflare:

### 1. Optimize for Cloudflare
AImatic is optimized for the edge. Ensure you are using `node-fetch` compatible libraries and standard Web APIs for security.

### 2. Environment Variables
Add these in the Cloudflare Dashboard under **Settings > Variables**:
- `GOOGLE_GENAI_API_KEY`: Your Gemini API Key.
- `NEXT_PUBLIC_CHAT_SECRET`: A long, random string used for HMAC request signing.

### 3. Deploy via Git
1. Connect your GitHub repository to Cloudflare Pages.
2. Set the build command: `npm run build`
3. Set the build output directory: `.next`
4. Set the Framework preset: **Next.js**.

---

## 🚦 Step-by-Step General Deployment

### 1. Security Preparation
Ensure `NEXT_PUBLIC_CHAT_SECRET` is set in your production environment. This key powers the HMAC defense system that protects your chatbot from spoofed requests.

### 2. The Build Process
Run the following command locally to ensure there are no errors:
```bash
npm run build
```

### 3. Connecting Your Personal Domain
1. In your hosting dashboard (Vercel, Cloudflare, etc.), find the **Domains** section.
2. Add your domain (e.g., `www.aimatic.com`).
3. Update your **DNS Records** (A, CNAME) at your domain registrar.

---

## 🔒 Production Best Practices

- **Enable SSL (HTTPS):** Essential for secure HMAC validation.
- **WAF Rules:** If using Cloudflare, enable "Bot Fight Mode" to add another layer of protection to the `/api` and server action endpoints.
- **Rate Limiting:** Set a rate limit on the chatbot endpoint to prevent cost overruns from automated scraping.

## 🛠 Self-Hosting (The "AImatic" Way)
If you want to follow the **100% Ownership** model, host on a **VPS** using **Docker**:
1. Build the image: `docker build -t aimatic-site .`
2. Run it on your server.
3. Use **Nginx** as a reverse proxy with Let's Encrypt for SSL.

This method ensures you own the entire server infrastructure, mirroring the systems you build for your clients.
