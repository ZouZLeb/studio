
# AImatic | Deployment Guide (Cloudflare + Firebase)

This guide outlines the steps to deploy the **AImatic** project to **Cloudflare Pages** while maintaining your **Firebase** integrations for authentication and database services.

## 🏗 Requirements for Production

Since AImatic uses **Next.js 15 (App Router)** and **Genkit (Server Actions)**, we use the `@opennextjs/cloudflare` adapter to run the application on Cloudflare's global edge network.

---

## 🚦 Step-by-Step Deployment

### 1. Firebase Preparation
Before deploying, ensure your Firebase environment is ready:
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. In **Project Settings**, find your **Firebase Config** object.
3. In **Build > Authentication**, ensure your preferred login methods (Email, Google, etc.) are enabled.
4. In **Build > Firestore Database**, ensure your security rules are deployed and match the `docs/backend.json` structure.
5. **CRITICAL:** Add your production domain (e.g., `aimatic.com`) to the **Authorized Domains** list in the Firebase Auth settings.

### 2. Cloudflare Pages Setup
1. Push your code to a **GitHub** repository.
2. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and go to **Workers & Pages > Create > Pages > Connect to Git**.
3. Select your repository.
4. **Build Settings:**
   - **Framework Preset:** `Next.js` (Note: Ensure `@opennextjs/cloudflare` is installed).
   - **Build Command:** `npm run build`
   - **Build Output Directory:** `.next`
5. **Environment Variables:**
   Add these in the Cloudflare Dashboard under **Settings > Variables**:
   - `GOOGLE_GENAI_API_KEY`: Your Gemini API Key.
   - `NEXT_PUBLIC_CHAT_SECRET`: A long, random string for HMAC signing.
   - `NEXT_PUBLIC_FIREBASE_API_KEY`: From your Firebase config.
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`: From your Firebase config.
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: From your Firebase config.
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`: From your Firebase config.
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`: From your Firebase config.
   - `NEXT_PUBLIC_FIREBASE_APP_ID`: From your Firebase config.

### 3. Deploying via Wrangler (CLI Alternative)
If you prefer deploying from your local terminal:
```bash
npx @opennextjs/cloudflare
npx wrangler pages deploy .open-next/assets --branch main --project-name aimatic
```

---

## 🔒 Production Security Checklist

- **WAF Rules:** Enable "Bot Fight Mode" in Cloudflare to protect your `/api` and server action endpoints from scrapers.
- **HMAC Verification:** Ensure the `NEXT_PUBLIC_CHAT_SECRET` in Cloudflare matches your local development secret to maintain request integrity.
- **Rate Limiting:** Use Cloudflare's built-in Rate Limiting to prevent excessive usage of the Genkit AI flows.

## 🛠 Troubleshooting
- **ERESOLVE Error:** If you see dependency conflicts, ensure `next` is set to `15.5.10` or higher to satisfy the peer dependencies of the `@opennextjs/cloudflare` adapter.
- **CORS Issues:** If Firebase calls fail, double-check that your Cloudflare URL is added to the **Authorized Domains** in the Firebase Console.
