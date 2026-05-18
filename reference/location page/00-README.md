# Busby — Website Update Brief

Three docs, designed to be handed to Claude Code in VS Code. Read in order, or hand all three to Claude Code at once.

## The docs

1. **`01-research-competitive-analysis.md`** — Why we're making these changes. Audit of mybusby.com, deep-dive into 9 mattress competitors (Casper, Saatva, Purple, Helix, Avocado, Tempur-Pedic, Tuft & Needle, DreamCloud, Nectar), and the best-practice research that informs the recommendations. *Useful as background for Claude Code; not strictly required to start building.*

2. **`02-prd-spec.md`** — What to build. Goals, scope, user stories, section-by-section specs, acceptance criteria, performance budget, edge cases, build order, and open questions. *This is the primary source of truth for Claude Code.*

3. **`03-design-and-copy.md`** — What it looks and reads like. Brand voice notes, visual direction, headline/subhead/CTA variants, copy for every section, microcopy library, and the asset checklist of things you (Berke) still need to provide.

## What's being built

- **New landing page** `/sleep-guide` — dedicated email-capture page with a free Sleep Guide PDF as the incentive. Premium framing, no flat % off.
- **Home page updates** — sticky "Now Open in Chicago" bar, press logo strip, "10,000+ American sleepers" stat lifted into the hero area, replacement of the unattributed press quotes with proper attributed customer testimonials, dedicated Chicago store announcement section, "Showrooms" added to the header nav, "Visit Us" block in the footer.
- **New store page** `/locations/chicago/<neighborhood>` — full marketing surface modeled on Saatva's Viewing Room pages.

## Recommended way to hand this to Claude Code

Open the Busby repo in VS Code, then in the Claude Code session say:

> Please read these three docs in order before you start: `00-README.md`, `02-prd-spec.md`, `03-design-and-copy.md`. Background research is in `01-research-competitive-analysis.md`. Then identify the framework, the existing newsletter signup component, the existing sleep quiz flow, and the email service provider. Surface any open questions from `02-prd-spec.md` § 10 before scaffolding new code.

That keeps Claude Code grounded in the spec rather than freelancing.

## Open questions you'll want to answer

From `02-prd-spec.md` § 10 — these block parts of the implementation:

1. Store address & neighborhood
2. Store hours
3. Opening date (drives announcement-bar copy)
4. Sleep Guide PDF — exists yet? If not, we should produce one as a stretch deliverable.
5. Email service provider (Mailchimp / Klaviyo / etc.)
6. Reviews widget (Yotpo / Okendo / Trustpilot / none)
7. Real press placements
8. Real customer permissions to be quoted publicly
9. Store photography schedule
10. Booking system preference (simple form vs. paid tool)
