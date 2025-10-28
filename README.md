<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1R8LzMVZgTmbqMGcZ3WJKazYVC8sJHNaS

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Vercel

You can deploy this Vite + React app to Vercel either from the Vercel dashboard (connect your Git provider) or from your local machine using the Vercel CLI.

Steps (local deploy):

1. Install the Vercel CLI (optional — you can also use `npx`):

```powershell
npm i -g vercel
# or use npx vercel
```

2. Build and deploy (first time will ask you to log in and configure project):

```powershell
# Build is run automatically by Vercel, but you can build locally to verify
npm run build

# Deploy (use --prod for a production deployment)
npx vercel --prod
```

3. Alternative: Connect your Git repository (GitHub/GitLab/Bitbucket) to Vercel and set the project root to the repository root. Vercel will detect the `package.json` and run `npm run build`. The `vercel.json` in this repo forces Vercel to use the static-build and serve the `dist` folder, plus rewrites all routes to `index.html` for SPA routing.

Notes:
- The app build output directory is `dist` (Vite default). The `vercel.json` config ensures Vercel serves that output.
- If your app requires environment variables, add them in the Vercel dashboard under Project Settings → Environment Variables before deploying.

## Auto-deploy with GitHub Actions

You can add automated deployments from GitHub by using the included GitHub Actions workflow. It will run on push to `main` or `master`, build the app, and deploy to Vercel using the Vercel CLI.

What you need:

- A Vercel account and a personal access token (aka `VERCEL_TOKEN`).
   - Create one at https://vercel.com/account/tokens and copy the token.
- Add the token to your GitHub repository secrets as `VERCEL_TOKEN` (Repository → Settings → Secrets → Actions).
- (Optional) If you want the workflow to target a specific Vercel project or scope, add these optional secrets:
   - `VERCEL_PROJECT_ID` — the project ID in Vercel (found in Project Settings → General).
   - `VERCEL_ORG_ID` — the team/org scope ID (if applicable).

How it works:
- The workflow installs dependencies and runs `npm run build`.
- It then runs `npx vercel --prod --token "$VERCEL_TOKEN" --confirm` to deploy. If you provide `VERCEL_PROJECT_ID` and/or `VERCEL_ORG_ID` as secrets the workflow will pass them to the CLI.

After adding the `VERCEL_TOKEN` secret, push to `main` (or open a PR merged into `main`) and check the Actions tab in GitHub. The workflow will run and deploy to Vercel.

