/**
 * Studio identity — the ONE place a deployment is re-skinned per tenant.
 * Everything customer-facing (name, locale, contact, brand copy) resolves
 * through here. Values fall back to the reference deployment when the matching
 * environment variable is absent, so the app boots with zero configuration.
 */
export const studioConfig = {
  name: process.env.NEXT_PUBLIC_STUDIO_NAME ?? "Trailside Yoga & Beyond",
  shortName: process.env.NEXT_PUBLIC_STUDIO_SHORT_NAME ?? "Trailside",
  timezone: process.env.NEXT_PUBLIC_STUDIO_TIMEZONE ?? "America/Chicago",
  city: process.env.NEXT_PUBLIC_STUDIO_CITY ?? "Fayetteville, AR",
  tagline: "A calmer way to practice, book, and belong.",
  description:
    "Yoga classes, workshops, and wellness services in Fayetteville, Arkansas. " +
    "Book classes, manage your membership, and join the community.",
  builtBy: "Hayarta",
} as const

export type StudioConfig = typeof studioConfig
