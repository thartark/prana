# PRANA — Design Notes

Running record of design decisions. Shares the house discipline used across
TELL / LEDGER / FOOTPRINT / CATALYST, applied to a wellness product. The build
prompt shipped a "Wellness Calm" pastel-gradient spec; that direction was
rejected where it collided with the house rules (see below) and rebuilt around
the same rules with a wellness-appropriate palette.

## Identity concept

**A warm-cream studio.** The surface is warm paper in light, dim dusk in dark,
with ONE grounding accent — **studio sage**. Calm comes from space and
restraint, not decoration. The product should feel like a deep breath, not a
SaaS dashboard — even though the admin surface is dense.

## Hard rules (inherited from the house style)

- Never ship: purple→blue gradients, gradient clip-text headings,
  glassmorphism, emoji-as-icons, the "big number + 3 stats + gradient" hero.
- Avoid the three AI-design defaults (cream/serif/terracotta; near-black + one
  acid accent; hairline rules + zero radius).
- **No raw hex in components** — everything chrome-related resolves to a token
  in `globals.css`. (User-selectable *data* colors — class swatches, tag
  colors in a color picker — are data, not chrome, and stay literal.)
- No new npm dependencies without a stated what + why.
- Every route must read correctly in **both** light and dark.

## What changed from the v0 "Wellness Calm" spec

| v0 spec | Why rejected | Replacement |
|---|---|---|
| Three loud pastels as `secondary`/`accent`/`sidebar` chrome | The exact AI pastel cliché; fails the house rule | Sage is the single brand accent; pastels demoted to the **chart ramp only** |
| Gradient hero `from-secondary/20 via-background to-accent/10` | Banned gradient wash | `.surface-breath` — a single-hue sage radial, barely there |
| `bg-clip-text` gradient H1 | Banned | Solid `text-foreground` heading, tightened tracking |
| `--foreground: #6B6B6B` on cream | ~4.0:1, borderline AA | `#3d3a34` warm ink, comfortably AA |
| `--primary: #8FB89C` with white text | ~1.9:1, fails AA badly | `#4e7a60` deepened sage, passes AA with white |

## Tokens

Light "warm-cream studio" / dark "studio at dusk", both hand-tuned in
`app/globals.css`. One accent (`--primary` sage). `--secondary` / `--muted` /
`--accent` are quiet warm greige surfaces, never a brand color. Semantic status
ramp (`--success` / `--warning` / `--info`) drives `StatusBadge`. Radius 6/8/10/14.
Shadows tinted from the warm ink hue (`--shadow-hsl`), never flat black.

## Type

- **Geist Sans + Geist Mono** (pinned by the build prompt), wired via
  `--font-geist-sans` / `--font-geist-mono` and mapped to `--font-sans` /
  `--font-mono` / `--font-display`.
- `.num` utility = mono + `tabular-nums` for every figure that updates in place
  (prices, class counts, capacities, times). "The numbers are the design."
- `.label-caps` for quiet section eyebrows. Headings tighten `-0.02em`.

## Theme mechanics

- `next-themes` `ThemeProvider`, `attribute="class"`, `defaultTheme="system"`,
  `disableTransitionOnChange`. `.dark` class variant via
  `@custom-variant dark (&:is(.dark *))`. `suppressHydrationWarning` on `<html>`.

## Re-skinning per tenant

All customer-facing identity resolves through `lib/studio-config.ts`, backed by
`NEXT_PUBLIC_STUDIO_*` env vars with reference-deployment fallbacks. Change the
env (or the config defaults) to re-brand; no component edits required.

## Open follow-ups

- Sweep dark-mode contrast across all ~165 routes (Quality Gate).
- Introduce a signature data-viz element for `/practice-dna` using the chart ramp.
- Audit remaining decorative gradients as pages are hardened per phase.
