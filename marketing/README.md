# Prana — Marketing folder

Everything you need to position, pitch, and sell Prana (studio-management software
by Hayarta, the calm alternative to Mindbody). Start with the kit; grab the rest as
you need it.

**Live demo (no login):** [prana-nu.vercel.app](https://prana-nu.vercel.app) —
flip the **Member / Instructor / Owner** switcher in the demo banner.

## What's here

| File | What it's for |
| --- | --- |
| **[MARKETING-KIT.md](./MARKETING-KIT.md)** | The core sales kit — pitches, proof, objection handling, call/email/LinkedIn scripts, demo talk track, pricing, competitive quick-ref. **Start here.** |
| **[PROSPECTING-PROMPTS.md](./PROSPECTING-PROMPTS.md)** | Paste-ready AI prompts to build verified lists of studios to call — by type, by ZIP, plus a big-markets ZIP list and helper prompts. |
| **[prospect-tracker-template.csv](./prospect-tracker-template.csv)** | Drop AI results here; track outreach status and the 12-day cadence. |
| **[EMAIL-QUICK-REFERENCE.md](./EMAIL-QUICK-REFERENCE.md)** | The whole cold-email sequence on one screen + subject-line swipe file. |
| **[PRICING.md](./PRICING.md)** | Recommended plans, competitor benchmarks, and the levers (founding rate, annual, migration). |
| **[SOCIAL-POSTS.md](./SOCIAL-POSTS.md)** | 8 ready-to-paste LinkedIn/IG/X posts, paired with the graphics. |
| **[PITCH-DECK.md](./PITCH-DECK.md)** | Slide-by-slide outline for a ~10-min pitch. |
| **[sell-sheet.html](./sell-sheet.html) / [sell-sheet.pdf](./sell-sheet.pdf)** | One-page printable sell sheet (edit the HTML, re-export the PDF). |
| **[assets/](./assets)** | Brand-matched SVG graphics: `social-card`, `how-it-works`, `stats`. |

## A simple way to start

1. **Read** `MARKETING-KIT.md` §1–3 so the story is in your head.
2. **Build a list** with a prompt from `PROSPECTING-PROMPTS.md` (start with
   *"studios already on Mindbody"* in one metro), paste into `prospect-tracker-*.csv`.
3. **Reach out** using `EMAIL-QUICK-REFERENCE.md` + the call script; always send
   the demo link.
4. **Post** one item from `SOCIAL-POSTS.md` a couple times a week to build
   authority while you prospect.

## Two honest reminders

- **Sell what the demo shows.** Some deeper mechanics (auto-charged no-show fees,
  attendance-based payroll, dunning) are roadmap — call them "where it's going,"
  not "what it does today."
- **Pricing and any numbers are illustrative** until you set them — keep the
  sell sheet, `PRICING.md`, and kit §13 in sync when you change them.

## Regenerating the sell-sheet PDF

Edit `sell-sheet.html`, then:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="sell-sheet.pdf" "file://$PWD/sell-sheet.html"
```

*Built by Hayarta · August 2026.*
