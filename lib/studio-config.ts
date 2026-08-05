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

  // Practical studio info (customer-facing; re-skinned per tenant).
  address: process.env.NEXT_PUBLIC_STUDIO_ADDRESS ?? "18 E Center St, Fayetteville, AR 72701",
  phone: process.env.NEXT_PUBLIC_STUDIO_PHONE ?? "(479) 555-0142",
  email: process.env.NEXT_PUBLIC_STUDIO_EMAIL ?? "hello@trailsideyoga.com",
  hours: "Mon–Fri 6am–8pm · Sat–Sun 7am–2pm",
  parking: "Free lot behind the building, plus street parking on Center St.",
  whatToBring: "Just yourself and water — mats, blocks, and props are provided.",
  introOffer: {
    headline: "$40 for your first month, unlimited",
    subtext: "New to Trailside? Practice as often as you like for 30 days. No commitment.",
  },
} as const

export type StudioConfig = typeof studioConfig
