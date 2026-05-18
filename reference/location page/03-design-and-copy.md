# Busby — Design & Copy Doc

**Companion to:** `02-prd-spec.md` (what to build), `01-research-competitive-analysis.md` (why these decisions)
**Date:** May 2026

This doc holds the visible content (copy variants, layout descriptions, visual direction, microcopy) for the new landing page, the home-page updates, and the Chicago store page. Every block of copy is provided in 2–3 variants where relevant so Berke can pick.

---

## 0. Brand voice cheat sheet

Pulled from the existing site so the new content sounds like Busby, not like a generic ad.

**Personality:** Warm, mission-driven, confident without bragging, transparent. Skeptical of industry hype.
**Existing taglines:** "Built for How You Actually Sleep" • "Better sleep changes everything" • "No shortcuts. No hype. Just real comfort."
**Words Busby uses:** craftspeople, fundamentals, handcrafted, expertise, transparent, real, honest, perfect sleep, foundation, six essential components.
**Words to avoid:** revolutionary, cutting-edge, disruptive, game-changing, "luxury for less" (cheapens the price point), "sleep like a baby" (cliché). Avoid "we" too aggressively at the start of every sentence.
**Tone for the LP:** A little more direct and benefit-focused than the home page (visitors arriving from ads are colder), but never bro-y or pushy.
**Tone for the store announcement:** Genuine excitement without exclamation marks. The Chicago opening is a milestone for a Chicago-based company; let that pride sit naturally in the copy.

---

## 1. Visual direction

### Photography
- **Real bedrooms, real light.** Not stock photography. Saatva and Avocado win on photography that reads as "this is a home," not "this is an ad." Linen, low-saturation morning light, a cup of coffee on the nightstand — the small human details.
- **People sometimes, mostly implied.** A hand pulling back a sheet, feet under a duvet, a half-made bed at 7 a.m. — not "model sleeping with mouth open."
- **Factory + craftspeople** — the existing "These are the hands that build your mattress" shot is exactly right. Use more of that on the LP and the brand-story sections.
- **Store photos** — when shooting the Chicago store, brief the photographer for a "boutique hotel meets craft showroom" feel. Look at Saatva Viewing Room imagery for reference. Avoid retail-floor wide shots that make it look like a Mattress Firm.

### Color
Match the existing site palette. The new sections should not introduce a new color system. If a campaign-specific accent is wanted on the LP, pull a single soft accent (warm clay, deep sage, or muted slate) and use it sparingly on CTAs and section dividers. Confirm with Berke before using a new color.

### Typography
Use the existing site's typeface stack. Don't introduce a new display face for these sections — premium consistency is the win. Headlines lean a little tighter than body. No all-caps for body or subheads.

### Iconography
Simple, line-based, consistent stroke weight. The existing trust strip (Made in USA, 100 Night, etc.) likely already has these — reuse the same set.

### Spacing & layout
- Generous vertical space between sections (the current home page is well-paced — match it)
- Mobile: sections stack with breathing room; never crammed
- One key visual per section — don't compete for attention

---

## 2. New landing page — `/sleep-guide`

### A1 — Hero (above the fold)

**Eyebrow** (small, all-caps, optional):
> "FREE SLEEP GUIDE"

**Headline (H1)** — pick one:

| # | Variant | Notes |
|---|---|---|
| 1 | **Sleep deeper, in 30 nights or less.** | Outcome-focused, specific. Recommended. |
| 2 | **The mattress decision, simplified.** | Anchored on the decision, not the product. |
| 3 | **Better sleep starts with better information.** | Closer to existing brand voice. |

**Subhead** — pick one (each names the incentive):

| # | Variant |
|---|---|
| 1 | Get the Busby Sleep Guide — 25 years of bedding expertise, distilled into one PDF. Plus early access to new mattresses and showroom events. |
| 2 | Our craftspeople have built mattresses for 25 years. Get the guide they wish every shopper read first. |
| 3 | The 6 things that actually matter when you buy a mattress. Free, no-strings, in your inbox in 60 seconds. |

**Form**
- Single field: email (placeholder: "your@email.com")
- Button label: **"Send me the guide"** (or: "Get my free guide" / "Email me the guide")
- Below the form, in 12–13px text: "We won't spam you. Unsubscribe anytime."

**Hero image**: A real bedroom shot — late-morning light, linen sheets, a Busby mattress without it being a product hero. Mobile crop should keep the bed and pull tight; desktop can be wider with environmental context.

**Trust microcopy below form** (small, single line):
> "10,000+ American sleepers • Made in USA • 100-night trial"

---

### A2 — Trust strip (4 stats in a row)

| Stat | Label |
|---|---|
| **25+** | Years of bedding expertise |
| **100%** | Made in the USA |
| **100** | Nights to try at home |
| **10** | Year warranty |

Use the existing icon set if present. On mobile, this becomes 2×2 instead of 1×4.

---

### A3 — "What's in the guide"

**Section headline:**
> What's in the guide

**Subhead:**
> A 12-page PDF written by our 25-year-veteran craftspeople. No jargon, no upsells, just the things we wish every shopper knew.

**Three cards:**

**Card 1**
- **Title:** The 6 essentials
- **Body:** Support, feel, temperature, stability, isolation, materials. Why each one matters and how to test for it in any mattress (Busby or otherwise).

**Card 2**
- **Title:** How to tell what's actually in your mattress
- **Body:** A plain-English guide to certifications, foam types, coil counts, and the marketing words that don't mean anything.

**Card 3**
- **Title:** Sleep style → mattress fit
- **Body:** Side, back, stomach, combo. Hot sleeper, cold sleeper. Couple with different preferences. A simple decision flow you can use anywhere.

---

### A4 — One attributed customer quote

**Layout:** Large pull-quote, customer photo (round, ~120×120), name + city + product on a single line below.

**Format:**
> "[Quote — 2 to 4 sentences. Specific and concrete. Mentions a real moment, not 'great mattress, A+.']"
>
> **— [First name], [city] · sleeps on her [side/back/stomach] · Busby [model]**

**Placeholder example** (to be replaced with a real quote):
> "I'd tried four other online mattresses before Busby. The one that finally let me stop waking up at 4 a.m. with a sore lower back. I should have started here."
>
> **— Jenna, Oak Park · side sleeper · Busby Slumber**

If real quotes aren't ready by ship time, use the placeholder with a `[PLACEHOLDER]` tag in the markup. Don't fabricate.

---

### A5 — Secondary CTA: Sleep Quiz

**Headline:**
> Want a recommendation right now?

**Body:**
> Skip the guide and take our 2-minute Sleep Quiz. Six questions, instant personalized mattress match. (You can always come back for the guide later.)

**Button:** "Take the Sleep Quiz" → links to existing `/sleep-quiz`

---

### A6 — Repeat email form (mid-page)

**Headline above form:**
> Ready for the guide?

**Form:** Same single-field email + "Send me the guide" button.

---

### A7 — Founder note + factory photo

**Layout:** Two-column on desktop (image left, copy right), stacked on mobile.

**Image:** The existing "These are the hands that build your mattress" photo or similar.

**Headline:**
> A note from our craftspeople

**Body** (3 short paragraphs):
> After 25 years in the bedding industry, we knew two things: what makes a perfect mattress, and why most people never get one.
>
> Too many middlemen. Too much markup. Too little transparency. So we built our own factory in the USA and went back to the fundamentals.
>
> If you're shopping for a mattress — Busby or otherwise — this guide is the one we wish we'd had when we started. It's free. We hope it helps.

---

### A8 — FAQ (3 short Q&As)

**Q1: What's actually in the guide?**
A 12-page PDF covering the six essentials of a great mattress, how to read materials and certifications, and how to match a mattress to your sleep style. No jargon, no hard sell.

**Q2: Do I have to buy a mattress?**
No. The guide is genuinely free, and we won't pretend otherwise. If you do shop with us later, you'll have the same 100-night home trial and 10-year warranty as everyone else.

**Q3: How often will you email me?**
About twice a month — sleep tips, occasional new-product news, and early invites to showroom events. You can unsubscribe in one click anytime.

---

### A9 — Footer (minimal)

Logo / "© 2026 Busby" / Privacy Policy / Terms / Unsubscribe / `support@mybusby.com`

---

### Confirmation state (after form submit)

Replace the form area in place — don't redirect.

**Headline:**
> Check your inbox.

**Body:**
> Your Sleep Guide is on its way. (Subject line: "Your Busby Sleep Guide.") If you don't see it in 5 minutes, peek in spam or `support@mybusby.com` will sort it out.
>
> While you're here — [take the 2-minute Sleep Quiz](/sleep-quiz) for an instant mattress match.

---

### `<title>` and meta description

- **Title:** "Free Sleep Guide | Busby Mattresses"
- **Meta:** "Get the Busby Sleep Guide — 25 years of bedding expertise distilled into one free PDF. Plus early access to new mattresses and showroom events."

---

## 3. Home-page updates

### B1 — Sticky announcement bar (top of every page)

Three variants depending on launch timing — choose based on where Busby is in the calendar.

| Phase | Copy | When |
|---|---|---|
| Pre-launch | **Coming soon: Visit Busby in Chicago →** | 4–8 weeks before opening |
| Pre-launch (specific date) | **Opening [DATE]: Visit Busby in Chicago →** | 1–4 weeks before opening |
| Now open | **Now Open: Visit Busby in Chicago →** | Day of opening + ongoing for 4–8 weeks |
| Steady state | **Try every Busby mattress in person — Chicago →** | After the launch-window cools |

Microcopy and behavior:
- Underline the right-aligned arrow + city, signal it's a link
- Dismiss button (`×`) on the far right; dismissal lasts 7 days

---

### B2 — Hero stat enhancement (no copy change, layout only)

The existing hero stays. **Add** "10,000+ American sleepers" to the existing trust strip below it.

If Berke wants a slightly punchier hero subhead variant for testing later:

> Built for how you actually sleep. **10,000+ American sleepers, one American factory, 25 years of expertise.**

(Pulled in the stat to make the subhead earn the headline.)

---

### B3 — Press logo strip

**Section eyebrow** (small text above the row):
> AS FEATURED IN

**Logos:** 4–6 publication logos in grayscale, equal heights. Berke to provide. Until then, placeholders are clearly marked `[REPLACE: press logo — Outlet Name]`.

**No headline** above the eyebrow — the strip is meant to feel like quiet, confident credentials, not a section in itself.

---

### B4 — Customer Testimonials section (replaces the unattributed press quotes)

**Section eyebrow:**
> WHAT BUSBY OWNERS SAY

**Section headline** — pick one:

| # | Variant |
|---|---|
| 1 | **Real sleep, real reviews.** |
| 2 | **From the people who actually sleep on it.** |
| 3 | **Reviews from across America.** |

**Section subhead:**
> No paid placements, no edited highlights. Just verified Busby owners.

**Three testimonials** — placeholder copy, to be replaced with real quotes:

**Testimonial 1**
> "First mattress where my husband and I actually agree. He's a side sleeper, I'm a back sleeper, and the Dream genuinely works for both of us. Six months in and we keep telling people."
>
> **— [Sarah], [Evanston, IL] · couple · Busby Dream**

**Testimonial 2**
> "I'm a hot sleeper and a stomach sleeper, which is apparently the worst possible combination. The Slumber is the first mattress I've owned that doesn't make me wake up sweating. I don't know how they did it, but I'm a believer."
>
> **— [Michael], [Austin, TX] · stomach sleeper · Busby Slumber**

**Testimonial 3**
> "The 100-night trial is what got me to try it. I didn't need it — first night was the deepest sleep I'd had in months. The fact that they'd offer that kind of guarantee tells you what they think of the mattress."
>
> **— [Priya], [Brooklyn, NY] · back sleeper · Busby Doze**

If real customer photos are available, add them as round avatars (~80×80) next to the attribution line. If not, use a Busby monogram circle or skip the avatar entirely (better than a stock photo).

**Below the row:** small "Read more reviews →" link to a dedicated reviews page if/when one exists.

---

### B5 — Chicago store announcement section

**Layout:** Two-column on desktop (image left, content right). Single-column on mobile, image first.

**Eyebrow:**
> NOW OPEN IN CHICAGO

**Headline (H2)** — pick one:

| # | Variant | Notes |
|---|---|---|
| 1 | **Try every Busby mattress, side by side.** | Most direct value prop. Recommended. |
| 2 | **Now you can lie down before you commit.** | Witty, on-brand. |
| 3 | **Visit our Chicago Showroom.** | Plain. Lowest risk. |

**Subhead** (one line, address + hours):
> [Address line 1, neighborhood, Chicago, IL ZIP] · Open [hours]. Walk-ins welcome.

**Body copy** (2–3 sentences) — pick one:

| # | Variant |
|---|---|
| 1 | Test all four Busby mattresses in one visit, with no-pressure guidance from a Sleep Guide who works on salary, not commission. Same prices online and in store, same 100-night trial. |
| 2 | Our Chicago Showroom is set up the way we wish every mattress store was: every Busby model, side by side, with a Sleep Guide on hand to answer questions — not to upsell. Walk in or reserve a time. |
| 3 | One showroom, four mattresses, zero commission. Come try every Busby model in the room they were designed for, with someone who actually knows how each one is built. |

**Primary CTA button:** "Visit the Showroom →" → `/locations/chicago/<neighborhood>`
**Secondary CTA (text link):** "Reserve a visit" → `/locations/chicago/<neighborhood>#reserve`

**Image:** Hero photo of the store interior. If unavailable, placeholder marked `[REPLACE: Chicago store hero photo]`.

---

### B6 — Header nav

Insert "Showrooms" link. Final order (left to right): **Shop · About Us · Showrooms · FAQ · Sleep Quiz · Shop Now**

Mobile menu: same insertion point.

---

### B7 — Footer "Visit Us" block

New footer column (between the existing "Shop" and "Company" columns, or wherever fits the existing grid):

**Column header:**
> Visit Us

**Content:**
> **Chicago**
> [Street address]
> [Neighborhood, Chicago, IL ZIP]
> [Hours summary, e.g., "Mon–Sat 10–7, Sun 11–6"]
>
> [Find a Showroom →]

Phone link (`tel:`) on the address; map link on the address opens Google Maps.

---

## 4. Chicago store page — `/locations/chicago/<neighborhood>`

### C1 — Hero

**Eyebrow:**
> NOW OPEN

**Headline (H1):**
> Visit Busby in Chicago

**Subhead:**
> Try every Busby mattress, side by side, with a Sleep Guide who's not on commission.

**Quick-facts strip (under hero image):**
| Address | Hours | Phone | Visits |
|---|---|---|---|
| [Address line 1, neighborhood] | [Hours summary] | [Phone] | Walk-ins welcome · [Reserve →](#reserve) |

**Hero image:** Wide store interior or storefront. Real photography.

---

### C2 — What to expect

**Headline:**
> What to expect when you visit

**Six value-prop tiles** (icon + 1–2 sentence description):

1. **Every mattress, side by side.** All four Busby models in one room — Dream, Slumber, Nod, Doze. Try them in any order, as many times as you want.
2. **Real guidance, no commission.** Our Sleep Guides work on salary. They have nothing to gain from steering you to a more expensive model.
3. **Same online prices.** What you see online is what you pay in the showroom. No "store-only" pricing tricks.
4. **100 nights to keep deciding.** Even if you buy in the showroom, the 100-night home trial is the same. Take it home, sleep on it, decide for real.
5. **No appointment required.** Walk in any time we're open. Reservations are optional and just guarantee guide time during peak hours.
6. **Coffee, a quiet room, and zero hovering.** We built the showroom we'd want to shop in.

---

### C3 — Photo gallery / virtual tour

**Headline:**
> Inside the Showroom

**Layout:** 4–8 photo grid; if a 30–60 second walkthrough video exists, feature as the lead asset (16:9, autoplay muted with prefers-reduced-motion respected).

---

### C4 — Meet your Sleep Guide

**Headline:**
> Meet your Sleep Guide

**Subhead:**
> Our Chicago team has [X+ years] of combined experience in mattresses — and zero commission. They're here to help you find the right one, not to sell you the most expensive one.

**Card per guide:**
- Photo (square, ~280×280)
- Name + role
- 2–3 sentence bio
- Optional: "Schedule time with [Name]" CTA → opens reserve form prefilled

Placeholder until real bios come in:
> **[First name]** — Sleep Guide
> [2–3 sentence bio: how long they've been at Busby, what they geek out about, a small personal detail.]

---

### C5 — Products on display

**Headline:**
> What you can try

**Grid:** Reuse the existing mattress card component from the home page (Dream, Slumber, Nod, Doze). Each card gets a small "Try in store" badge; cards link to existing PDPs.

---

### C6 — Reserve a visit (form)

**Anchor:** `#reserve` so home-page secondary CTA scrolls right to it

**Eyebrow:**
> OPTIONAL

**Headline:**
> Reserve a visit

**Body:**
> Walk-ins are always welcome. Reservations guarantee Sleep Guide time and a quiet space to test. Either way, we're glad you're coming.

**Form fields:**
- **Name** (required)
- **Email** (required)
- **Phone** (optional)
- **Preferred date** (date picker)
- **Time window** (Morning / Afternoon / Evening)
- **Mattresses you'd like to try** (multi-select: Dream, Slumber, Nod, Doze, "Not sure yet")
- **Anything we should know?** (optional text area — e.g., "side sleeper with shoulder pain")

**Submit button:** "Reserve my visit"

**On success:** "We'll see you on [date]. A confirmation is on its way to [email]."

**Confirmation email** sent automatically to the visitor (with date, address, hours, parking) and to the store inbox.

---

### C7 — Getting here

**Headline:**
> How to find us

**Sub-blocks:**
- **Map** — embed (lazy-loaded; static fallback if blocked)
- **Address** — full address with "Get directions" link
- **Parking** — [parking notes — to provide]
- **Public transit** — [transit notes — to provide, mention nearest L stop and bus lines]
- **Accessibility** — [accessibility notes — wheelchair access, accessible restroom, etc.]

---

### C8 — FAQ

**Q: Do I need an appointment?**
No. Walk in any time we're open. Reservations are only useful if you want guaranteed Sleep Guide time during a busy stretch.

**Q: Are prices the same as online?**
Yes. Exactly the same. No "in-store only" deals, no upcharges. The showroom is a place to try, not a place we mark up.

**Q: Can I take a mattress home from the showroom?**
We don't keep inventory in the showroom — every mattress is built to order in our USA factory and delivered free to your door. Most orders ship within 1–2 weeks.

**Q: Can I bring my kids?**
Please do. There's space to wait and our team likes the company.

**Q: What if I want to return a mattress I bought online?**
You can start a return through `support@mybusby.com` or in the showroom. Either way, the 100-night home trial works the same way.

---

## 5. Microcopy library

Quick reference for small bits of copy that appear across surfaces.

### Email form variants
- Placeholder: "your@email.com" / "Your email"
- Button: "Send me the guide" / "Get my free guide" / "Reserve my spot" / "Subscribe"
- Below form: "We won't spam you. Unsubscribe anytime." / "About 2 emails a month. Unsubscribe in one click."

### Loading state on form submit
- Button text: "Sending…"

### Error messages
- Invalid email: "That email doesn't look right — could you double-check?"
- Network error: "Something on our end. Try once more, or email `support@mybusby.com`."
- ESP unavailable: "We're having trouble saving emails right now. Email `newsletter@mybusby.com` and we'll add you manually."

### Success states
- Sleep Guide LP: "Check your inbox — your Sleep Guide is on the way."
- Reserve form: "We'll see you on [date]. A confirmation is on its way to [email]."
- Footer newsletter: "You're in. Welcome to Busby."

### Sticky announcement bar
See § B1 for the four phase variants.

### Skip-to-content link (a11y)
"Skip to main content"

---

## 6. Asset checklist (what Berke needs to provide)

Marked with `[REPLACE: ...]` in the eventual codebase so each is grep-able.

### Photography
- [ ] Hero image for `/sleep-guide` — real bedroom shot, mobile + desktop crops
- [ ] Founder/factory shot for `/sleep-guide` § A7 (existing one is likely fine)
- [ ] Customer photos for testimonials (round avatars) — only if real customer permissions in hand
- [ ] Chicago store hero — interior wide shot
- [ ] Chicago store gallery — 4–8 supporting shots
- [ ] Sleep Guide headshots (one per named guide)
- [ ] Optional: 30–60 second store walkthrough video

### Copy assets
- [ ] **Sleep Guide PDF** — the actual deliverable promised by the LP. If not yet written, this is a stretch deliverable for the project.
- [ ] **3+ real customer testimonials** with first name, city, sleep style, product, and consent to publish
- [ ] **3–6 press logos** + the actual articles they came from (used to populate "AS FEATURED IN" + a future `/press` page)
- [ ] **Sleep Guide bios** (2–3 sentences each)
- [ ] **Store address, hours, phone, opening date**
- [ ] **Parking + transit + accessibility notes** for the store

### Technical / integration
- [ ] Confirm ESP (Mailchimp / Klaviyo / etc.) and provide API key/list ID for the new tags (`sleep-guide-lp`, `chicago-store`)
- [ ] Confirm reviews widget (Yotpo / Okendo / Trustpilot / none) — affects whether testimonial section gets a verified-purchase badge
- [ ] Confirm analytics provider and event-tracking pattern in current codebase
- [ ] Set up Google Business Profile for the Chicago store (out of scope for code, but coordinate timing)

---

## 7. Tone reference: do / don't

| ✅ Do | ❌ Don't |
|---|---|
| "10,000+ American sleepers" | "Thousands love us" |
| "Built in our USA factory" | "Crafted with passion" |
| "Walk-ins welcome" | "Visit our state-of-the-art retail experience" |
| "No commission, no upsells" | "Industry-leading customer experience" |
| "Same prices online and in store" | "Exclusive in-store savings!!!" |
| "About two emails a month" | "Get exclusive deals delivered straight to your inbox" |
| "Try every Busby mattress, side by side" | "Discover the Busby difference today" |
| "We built the showroom we'd want to shop in" | "Welcome to Busby Chicago, your premium sleep destination" |

---

## 8. One-page summary for skimming

**New landing page** at `/sleep-guide` — single email field, headline "Sleep deeper, in 30 nights or less," incentive is a free Sleep Guide PDF + early access. Layered with trust strip, three "what's in the guide" cards, one attributed customer quote, sleep-quiz cross-link, founder note, FAQ, repeat form. Premium framing, no % off.

**Home page changes:**
- Sticky bar: "Now Open: Visit Busby in Chicago →"
- New press logo strip below the hero
- "10,000+ American sleepers" added to the existing trust row
- Replace the two unattributed quotes with a real Customer Testimonials section (3 cards)
- New Chicago store section between products and the 6 Components philosophy
- Header nav adds "Showrooms"
- Footer adds "Visit Us · Chicago" block

**New store page** at `/locations/chicago/<neighborhood>` — full marketing surface modeled on Saatva's Viewing Room pages: hero, what-to-expect, photo gallery, Sleep Guide bios, products on display, optional reserve form, getting-here details, FAQ. Walk-ins welcome, no commission, same online prices.
