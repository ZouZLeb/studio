# AImatic | Deployment Guide

This guide outlines the steps to take the **AImatic** project from development to a production-ready state, hosted on your live personal domain.

## 🏗 Requirements for Production

Since AImatic uses **Next.js 15 (App Router)** and **Genkit (Server Actions)**, your hosting provider must support a **Node.js environment**. Standard "shared hosting" (often used for WordPress) may not work unless they specifically offer Node.js support.

### Recommended Hosting Providers:
1. **Vercel** (Easiest, optimized for Next.js)
2. **Netlify** (Great for Next.js)
3. **Railway / Render** (Excellent for simple Node.js app deployment)
4. **VPS (DigitalOcean / Linode)** (Best for "Ownership" — gives you total control)

---

## 🚀 Step-by-Step Deployment

### 1. Environment Variables
Before deploying, ensure your production environment has access to your API keys.
- **Key:** `GOOGLE_GENAI_API_KEY`
- **Value:** Your Gemini API Key from [Google AI Studio](https://aistudio.google.com/).

### 2. The Build Process
Run the following command locally to ensure there are no errors:
```bash
npm run build
```
This creates an optimized `.next` folder ready for production.

### 3. Deploying to a Provider (e.g., Vercel/Netlify)
1. Push your code to a private GitHub/GitLab repository.
2. Connect your repository to the hosting provider.
3. Add the `GOOGLE_GENAI_API_KEY` in the provider's "Environment Variables" settings.
4. The provider will automatically run the build and deploy your site to a temporary URL.

### 4. Connecting Your Personal Domain
1. In your hosting dashboard, find the **Domains** section.
2. Add your domain (e.g., `www.aimatic.com`).
3. Update your **DNS Records** (A, CNAME) at your domain registrar (Namecheap, GoDaddy, etc.) to point to your hosting provider's servers.

---

## 🔒 Production Best Practices

- **Enable SSL (HTTPS):** Most modern providers (Vercel, Netlify) provide free SSL certificates automatically. This is non-negotiable for security.
- **Set Up a Custom Email:** Use a service like Google Workspace or Zoho to set up `hello@aimatic.com` to match the site's contact info.
- **Monitor the Chatbot:** Keep an eye on your Gemini API usage in the Google AI Console to ensure you don't hit rate limits during high traffic.

## 🛠 Self-Hosting (The "AImatic" Way)
If you want to follow your own business model of **100% Ownership**, you should host on a **VPS** using **Docker**:
1. Create a `Dockerfile` for the project.
2. Build the image: `docker build -t aimatic-site .`
3. Run it on your server using `docker-compose`.
4. Use **Nginx** as a reverse proxy to handle your SSL and domain routing.

This method ensures that you own the entire server infrastructure, just like the systems you build for your clients.
