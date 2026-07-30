import Stripe from "stripe"

let cached: Stripe | null | undefined

/**
 * Lazily construct the Stripe client. Returns null when STRIPE_SECRET_KEY is
 * absent, so the app builds and runs with zero configuration (mock mode). Never
 * instantiate Stripe at module scope — that throws during `next build` when the
 * key is missing and breaks the "boots with no env vars" guarantee.
 */
export function getStripe(): Stripe | null {
  if (cached !== undefined) return cached
  const key = process.env.STRIPE_SECRET_KEY
  cached = key ? new Stripe(key, { apiVersion: "2024-12-18.acacia" }) : null
  return cached
}

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY)
}
