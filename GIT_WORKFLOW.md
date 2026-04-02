# AImatic Git Workflow

This guide explains how to manage the `main` and `cloudflare` branches to ensure your code updates and blog posts never conflict.

## Branch Strategy
- **`main`**: Your working branch. Use this for bug fixes, new features, and design changes.
- **`cloudflare`**: Your production branch. This is where live deployments happen and where new blog posts are added via the GitHub API/TinaCMS.

---

## 1. Working on Features (Main Branch)
Always do your primary coding work on the `main` branch.

```bash
# Switch to main
git checkout main

# ... make your code changes ...

# Add and Commit
git add .
git commit -m "feat: your feature description"

# Push to Main (Overwrites remote main with your local version)
git push origin main --force
```

## 2. Syncing to Production (Cloudflare Branch)
You don't need to manually merge `main` into `cloudflare`. I have set up a **GitHub Action** that automatically merges every push to `main` into the `cloudflare` branch.

### How the Auto-Merge Works:
1. When you push to `main`, GitHub sees the update.
2. It automatically runs a script that:
   - Switches to the `cloudflare` branch.
   - Merges your new `main` code into it.
   - **Preserves** all blog posts already on the `cloudflare` branch.
   - Deploys the combined result to Cloudflare.

---

## 3. Handling Blog Posts
Blog posts are added to the `cloudflare` branch automatically via the API. 
- **They stay on the `cloudflare` branch.**
- **They are NEVER merged back into `main`** (to keep your development branch clean).

### If you want to see the new blog posts locally:
```bash
git checkout cloudflare
git pull origin cloudflare
```

### ⚠️ Important Rules:
1. **Never merge `cloudflare` into `main`.** This would pull production-only blog posts into your clean dev environment.
2. **Push to `main` for code changes.** Let the automation handle the rest.
3. **Use the GitHub API/TinaCMS** for blog posts as usual.
