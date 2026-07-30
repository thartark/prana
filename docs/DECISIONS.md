# Decisions

Running log of non-obvious calls made while hardening the v0 scaffold. Each
entry: the fork, the choice, and why a studio owner would want it.

## D1 — Design identity: house style over the "Wellness Calm" spec
The build prompt prescribed a pastel + gradient-hero + clip-text look. That
collides with the house rules shared by TELL/LEDGER/FOOTPRINT/CATALYST (no
gradient washes, no clip-text, token-only, AA contrast). Chose the house
discipline with a wellness-appropriate palette (studio sage accent; pastels
demoted to the chart ramp). See `DESIGN_NOTES.md`.

## D2 — Toolchain: Homebrew pnpm, not corepack
`corepack`'s pinned pnpm shim crashes under this machine's Node v26
(`ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING`). Use `/opt/homebrew/bin/pnpm`.
`sharp`'s native build is intentionally skipped (`pnpm.ignoredBuiltDependencies`)
because images are unoptimized — Stripe/Supabase don't need it. `.npmrc` and the
`pnpm` manifest field keep `pnpm build`/`dev` from erroring on the skipped build.

## D3 — Payments are lazy + null-safe
Stripe was instantiated at module scope with `process.env.STRIPE_SECRET_KEY!`,
which throws during `next build` with no key. Moved to `lib/stripe.ts`
`getStripe()` (lazy, returns null when unconfigured). Payment API routes return
503 in mock mode; the client-side checkout simulates success. Also added
idempotency (on `stripe_payment_intent_id`), metadata verification, and a
`revenue_records` write to `confirm-membership`.

## D4 — Repository contract: `createClient()` returns `null` in mock mode
`createClient()` returns `null` when Supabase is unconfigured. This is the
scaffold's actual contract: **27 pages** already branch on `if (!supabase)` and
fall back to `mockDataManager` (which is server-safe — `getMockDataManager()`
builds an in-memory instance when `window` is undefined). Those pages —
including the primary demo surfaces `/`, `/classes`, `/instructors`,
`/memberships`, `/dashboard`, `/workshops`, `/shop`, and several `/admin/*` —
render **populated** in mock mode. (An earlier attempt to return a truthy mock
client was reverted: it silently disabled all 27 mock branches.)

**32 other pages** (secondary member/admin/instructor surfaces: `/payment-plans`,
`/membership/*`, `/notifications*`, `/instructor/*`, many `/admin/*`) had no mock
branch and dereferenced the null client — crashing static export. Each now has a
uniform guard: `if (!supabase) return <Demo-mode notice>`. Non-crashing and
honest; not yet populated.

**Later-phase work:** give those 32 pages real `mockDataManager` branches (or
unify everything behind the prompt's `lib/data/` repository) so the entire app
is populated in mock mode, not just the primary surfaces.
