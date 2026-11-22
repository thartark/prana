# Project notes for Claude

## Deploy workflow — ALWAYS push alongside deploys
After every production deploy (`vercel --prod`), also run `git push` so GitHub
(`origin/main` → github.com/thartark/prana) stays in sync with what's live. Never
deploy without pushing. Commit → deploy → push, as one routine.

- Live URL: https://prana-nu.vercel.app
- The app runs in **mock/demo mode** when no Supabase env is configured (which is
  the deployed state) — demo data comes from `lib/mock-data.ts`.
