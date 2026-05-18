# Busby — PRD: Lead-Gen Landing Page + Home-Page Updates

**Owner:** Berke
**Audience:** Claude Code (working in VS Code) + any human contributor
**Date:** May 2026
**Companion docs:** `01-research-competitive-analysis.md` (why), `03-design-and-copy.md` (what it looks/reads like)

---

## How to use this doc

This PRD is the source of truth for **what to build**. Where copy is needed it points to `03-design-and-copy.md`. Where research justifies a decision it points to `01-research-competitive-analysis.md`. Acceptance criteria are testable. Everything in `[brackets]` is content/asset Berke needs to provide before launch.

**Before starting**, Claude Code should:
1. Open the existing repo in VS Code and identify the current framework (Berke noted "Java" — verify in the repo: it could be a Java backend serving server-rendered pages, a static site, or a JS framework. The work below is described in framework-agnostic terms.)
2. Locate the existing **home page template**, **footer/header components**, and the **newsletter signup component** already in the footer.
3. Locate the existing **sleep quiz** flow.
4. Identify the email service provider currently in use (Mailchimp / Klaviyo / Constant Contact / etc.) — visible in the footer subscribe form's `action` URL or in an env file.

If any of these can't be found, surface a question to Berke before scaffolding new code.

---

## 1. Goals & non-goals

### Goals (in priority order)
1. **Ship a dedicated email-capture landing page** (`/sleep-guide`) that we can drive paid + partnership + organic traffic to. KPI: ≥8% capture rate on warm/branded traffic, ≥3% on cold paid.
2. **Announce the Chicago store** prominently on the home page and via a dedicated location page (`/locations/chicago/<neighborhood>`).
3. **Replace weak/unattributed social proof** on the home page with a layered system: aggregate review stat + press logo strip + attributed customer quotes.
4. **Set up the URL & nav structure to scale** to multiple stores later (header link is "Showrooms" plural; URL pattern is `/locations/<city>/<neighborhood>`).

### Non-goals (out of scope this round)
- Re-platforming or rewriting the site
- Redesigning the product detail pages (PDPs)
- Changing the sleep quiz flow itself (we just link to it from new surfaces)
- Adding a real-time booking / appointment system (we'll use a simple form that emails the store; integrate later)
- SMS marketing setup (out of scope; mention only as a future "+10% if you opt-in" lift)

---

## 2. Users & jobs to be done

| User | Job | Surface that serves them |
|---|---|---|
| **Cold paid-traffic visitor (Meta / Google ads)** | "I'm researching mattresses, what makes Busby different?" | New landing page (`/sleep-guide`) — capture email with content offer |
| **Returning home-page visitor** | "Has anything changed since I last looked?" | Home-page social-proof + store announcement |
| **Local Chicago shopper** | "Where can I try a Busby in person?" | Sticky announcement bar → `/locations/chicago/<neighborhood>` |
| **Press / journalist** | "Is this brand legit? Who has covered them?" | Press logo strip + footer `press@mybusby.com` |
| **Newsletter subscriber** | "Tell me about new products / sales" | Existing footer signup, kept |
| **Quiz-curious visitor** | "Help me pick the right mattress" | Existing sleep quiz, linked as secondary CTA from new LP |

---

## 3. Scope summary — three workstreams

### A. New landing page: `/sleep-guide`
A dedicated email-capture page with one job: convert the visitor's email in exchange for a Busby Sleep Guide PDF + early access to new launches and showroom events. Built mobile-first. Linkable from ads, social, partnerships, and from a small "Get the Sleep Guide" CTA in the home-page footer.

### B. Home page updates
1. **Sticky announcement bar** at the very top: "Now Open: Visit Busby in Chicago →"
2. **Hero stat strip** — surface "10,000+ American sleepers" prominently (and once a verified review widget is in place, add aggregate review score).
3. **Press-and-award strip** — horizontal logo strip of publications that have covered or endorsed Busby.
4. **Replace existing unattributed quotes** with a proper testimonials section: 3–6 quotes attributed to real customers (first name, city, sleep style, product, photo).
5. **Chicago store announcement section** — between the product collection and the "6 Components" philosophy. Hero image of store interior, hours, address, "What to expect," CTA to the location page.
6. **Header nav:** Add **"Showrooms"** between "About Us" and "FAQ."
7. **Footer:** Add "Visit Us → Chicago" near the "Shop" column.

### C. New page: `/locations/chicago/<neighborhood>`
A full-fidelity store page modeled on Saatva's `/locations/chicago/oakbrook`. Hero photo, address, hours, parking + transit, products on display, named Sleep Guide(s), "Reserve a visit" form (optional, walk-ins always welcome), short walkthrough video or photo gallery.

---

## 4. Detailed specs

### A. `/sleep-guide` — landing page

**Route:** `/sleep-guide` (also accept `/sleepguide` redirect → 301)
**Layout:** Single-column, mobile-first. No global header / footer chrome — minimal header (logo only, links back to `/`) and minimal footer (legal, privacy, unsubscribe).

#### Section A1 — Above-the-fold hero
- **Headline** (H1): see `03-design-and-copy.md` § Landing page hero
- **Subhead**: names the incentive specifically
- **Email form**: single field (email), CTA button: "Send me the guide"
- **Trust microcopy** below form: "We won't spam you. Unsubscribe anytime."
- **Hero image**: real bedroom photography (not stock or illustration). Provide a `<picture>` element with WebP + JPG fallback. Mobile gets a tighter crop.
- **Press logos strip** (immediately below or beside form on desktop)

#### Section A2 — Trust strip (horizontal row of 4 stats)
- 25+ years of expertise
- Made in USA
- 100-night home trial
- 10-year warranty

#### Section A3 — "What's in the guide"
3 cards/rows describing the 3 things in the Sleep Guide. (Copy in `03-design-and-copy.md`.)

#### Section A4 — One full attributed customer quote + photo
Single high-impact quote, attributed to a real customer with city + sleep style + product. Counts as social proof above the second form.

#### Section A5 — Secondary CTA: "Or take the 2-minute Sleep Quiz"
Card linking to the existing `/sleep-quiz` flow. Reduces bounce for visitors who'd rather get a recommendation now than wait for an email.

#### Section A6 — Repeat email form (sticky on mobile, inline on desktop)
Same single-field form. Visitors who scrolled this far have read the content; second ask is appropriate.

#### Section A7 — Founder note + factory photo
Small founder quote + factory photo. Premium brands (Warby Parker, Saatva) win with this.

#### Section A8 — FAQ (3 short Q&As)
"What's in the guide?" / "Do I need to buy anything?" / "How often will you email me?"

#### Section A9 — Minimal footer
Legal, privacy, unsubscribe link.

#### Form behavior
- On submit → POST to existing email service provider (Mailchimp / Klaviyo / etc.)
- Tag subscriber with source: `sleep-guide-lp` so segmentation works
- Tag with UTM params if present (`utm_source`, `utm_medium`, `utm_campaign`)
- On success → in-place confirmation: "Check your inbox — your Sleep Guide is on the way." No redirect.
- Trigger a transactional email with the Sleep Guide PDF attached (or Drive/S3 link)
- Add to "early access" segment (used later for showroom events, new launches)
- Validate email on the client (regex) AND let the ESP handle real validation
- Honor `prefers-reduced-motion` for any animations

#### Acceptance criteria for A
- [ ] `/sleep-guide` returns 200 and renders without console errors on mobile + desktop
- [ ] Lighthouse score ≥ 90 performance, ≥ 95 accessibility on mobile throttled
- [ ] Form submits successfully end-to-end (test email arrives, subscriber appears in ESP with source tag)
- [ ] UTM params are preserved on the subscriber record
- [ ] Mobile: form field is visible above the fold on a 390×844 viewport (iPhone 14)
- [ ] Keyboard-only navigable; form has `<label>` (visible or sr-only), correct `inputmode="email"`, `autocomplete="email"`
- [ ] Single H1, descriptive page `<title>` and meta description
- [ ] Open Graph + Twitter card meta tags set with hero image
- [ ] Page works with JavaScript disabled (form falls back to native POST + thank-you page `/sleep-guide/thanks`)

---

### B. Home-page updates

#### B1 — Sticky announcement bar (top of every page, not just home)
- **Position:** Above the existing header
- **Copy:** "Now Open: Visit Busby in Chicago →" (full copy variants in `03-design-and-copy.md`)
- **Behavior:** Dismissable with an `×` button. Dismissal persists in `localStorage` for 7 days; resets when copy changes.
- **Link:** Anchors to `/locations/chicago/<neighborhood>`
- **Mobile:** Single line, marquee-style only if it doesn't fit (no auto-scroll)

#### B2 — Hero stat enhancement (in or just below existing hero)
The current hero says "Built for How You Actually Sleep" + subhead + 2 CTAs ("Shop Mattresses" / "Take the Sleep Quiz"). Keep that. Below it, **promote the existing trust row** (Financing / 10 Year Warranty / Made in USA / Free Delivery / 100 Night Guarantee) into a more prominent stat strip and **add** "10,000+ American sleepers" to the row.

#### B3 — Press logo strip
- **Position:** Between the hero/stat strip and the "Busby Home Line" product collection
- **Layout:** Horizontal row of 4–6 logos, grayscale, equal heights, generous spacing
- **Behavior:** Logos scroll horizontally on mobile if they don't fit; no autoplay
- **Asset:** Berke to provide actual logos. Until then, use the existing CSS pattern but with text placeholders Claude Code clearly marks `[REPLACE: press logo]`
- **Accessibility:** Each logo gets `alt="Featured in [Outlet Name]"`

#### B4 — Replace unattributed press quotes with attributed testimonials
The current page has two italic quotes ending in ellipsis with no source. **Remove these.**

Replace with a new **Customer Testimonials** section between the "Busby Difference" comparison and the Sleep Quiz teaser:
- 3 quotes initially (room for 6 with horizontal scroll on mobile)
- Each quote: 1–3 sentences + first name + city + sleep style + product purchased
- Optional: customer photo (round avatar, 80×80) — if no photos, use a Busby monogram circle
- Verified-purchase badge if integration with a reviews widget is in place
- The press quotes (if Berke has real ones with attribution) move to a separate "In the Press" mini-section below

**If Berke doesn't have real customer quotes yet:** Claude Code should still build the section with placeholder copy clearly marked `[PLACEHOLDER — replace with real customer quote]` so the layout is ready when Berke collects them. Don't ship fabricated quotes.

#### B5 — Chicago store announcement section
- **Position:** Between the product collection ("Explore the Busby Home Line" CTA) and "The Busby Philosophy" / 6 Components section
- **Layout:** Two-column on desktop (image left, content right), single-column on mobile
- **Image:** Hero photo of the store interior or exterior. If not yet shot, use placeholder with `[REPLACE: store hero photo]`
- **Content:**
  - Eyebrow: "Now Open"
  - H2 headline: see `03-design-and-copy.md`
  - Subhead with address + hours
  - 2–3 sentence "what to expect" copy
  - Primary CTA: "Visit the Showroom" → `/locations/chicago/<neighborhood>`
  - Secondary CTA: "Reserve a visit" → form on the location page
- **Acceptance criteria:**
  - [ ] Renders without breaking the existing home page layout
  - [ ] All text content is editable from one place (CMS field or constants file — match the project's existing pattern)
  - [ ] CTAs are real `<a>` tags, not buttons that simulate links

#### B6 — Header nav: add "Showrooms"
- Insert between "About Us" and "FAQ" (current order: Shop, About Us, FAQ, Sleep Quiz, Shop Now)
- New order: Shop, About Us, **Showrooms**, FAQ, Sleep Quiz, Shop Now
- Links to `/locations` (an index page that initially lists just Chicago and a "More cities coming" line)
- Mobile: include in the existing mobile menu

#### B7 — Footer: "Visit Us" mini-block
- New column under the existing "Shop" / "Company" columns: **Visit Us**
  - Chicago — `<address>` + hours
  - "Find a Showroom" link → `/locations`
- Keep the existing newsletter signup block intact (we're not replacing it; the new LP is a separate surface)

---

### C. `/locations/chicago/<neighborhood>` — store page

**Route pattern:** `/locations/chicago/<neighborhood>` (e.g., `/locations/chicago/lincoln-park`). Index page at `/locations` lists all cities (currently just Chicago).

#### Section C1 — Hero
- Eyebrow: "Now Open in Chicago"
- H1: see `03-design-and-copy.md`
- Hero image of the store
- Quick facts strip: address (with map pin icon), hours, phone, "Walk-ins welcome — appointments optional"

#### Section C2 — What to expect
4–6 short value props, each with an icon and 1–2 sentence description:
- Try every Busby mattress side-by-side
- No-pressure guidance from a Sleep Guide
- No commission, no upsell scripts
- Same online prices, in person
- Free delivery, 100-night trial, 10-year warranty
- (If applicable) Optional virtual consult if you can't make it in

#### Section C3 — Photo gallery / virtual tour
- 4–8 photos (interior, products, friendly Sleep Guide candid)
- If a 30–60 second walkthrough video exists, feature as the lead asset

#### Section C4 — Meet your Sleep Guide
- Photo, first name, short bio (2–3 sentences) for each named Sleep Guide
- "Schedule time with [Name]" CTA opens the same reserve-a-visit form

#### Section C5 — Products on display
- A grid of the 4 mattress models with "Try in store" badges
- Each card links to the existing PDP

#### Section C6 — Reserve a visit (optional)
- Form fields: name, email, phone (optional), preferred date, preferred time window, mattress(es) you'd like to try (multi-select)
- On submit: emails the store, confirms with the visitor, adds them to the email list with a "Chicago store" tag
- Copy clearly states: "Walk-ins always welcome. Reservations guarantee guide time and a quiet space to test."

#### Section C7 — Getting here
- Embedded map (Google Maps or alternative — match existing site's pattern)
- Address, parking notes, public transit info, accessibility notes

#### Section C8 — FAQ (specific to the store)
3–5 Q&As: appointments? bring kids? same prices online? what if I want it now? returns at the store?

#### Acceptance criteria for C
- [ ] Page is reachable from: announcement bar, home-page store section, header "Showrooms" link, footer "Visit Us"
- [ ] Page has its own unique `<title>`, meta description, OG/Twitter image
- [ ] LocalBusiness JSON-LD structured data on the page (name, address, hours, phone, geo coords, image, url) for local SEO
- [ ] Map embed lazy-loads (don't block initial paint)
- [ ] Reserve-a-visit form submits successfully end-to-end (test email arrives at store inbox + visitor)
- [ ] Mobile: address & hours visible without scrolling on iPhone 14 viewport
- [ ] Walk-ins-welcome copy appears above any "Reserve" CTA (don't hide the no-friction option)

---

## 5. Tracking & analytics

Every new surface needs analytics events. Match the existing site's analytics provider (Google Analytics 4 / Plausible / Fathom — Claude Code should check `<head>` and the existing event-fire pattern).

| Event | Where | Payload |
|---|---|---|
| `lp_view` | `/sleep-guide` page view | `{utm_source, utm_medium, utm_campaign}` |
| `lp_form_submit` | `/sleep-guide` form success | `{form_position: "hero"|"mid-page"}` |
| `lp_quiz_click` | `/sleep-guide` secondary CTA | – |
| `home_announcement_click` | Sticky bar click | `{destination: "chicago"}` |
| `home_announcement_dismiss` | Sticky bar × | – |
| `home_store_section_click` | Home-page store CTA | `{cta: "visit"|"reserve"}` |
| `home_press_logo_click` | Press logo click (if linked) | `{outlet}` |
| `home_testimonial_view` | Testimonial card seen ≥ 50% | `{position}` |
| `store_view` | `/locations/chicago/...` page view | – |
| `store_reserve_submit` | Reserve form success | – |
| `store_directions_click` | "Get directions" click | – |

---

## 6. Performance & accessibility budget

- **Lighthouse mobile (throttled, simulated 4G):** Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95 on `/sleep-guide` and `/locations/chicago/...`
- **CLS** ≤ 0.1 — reserve image dimensions, lazy-load below-fold media, preload hero image
- **LCP** ≤ 2.5s on 4G — hero image must be optimized (WebP, sized correctly, `fetchpriority="high"`)
- **Accessibility:**
  - Skip-to-content link
  - Color contrast ≥ 4.5:1 for body text, 3:1 for large text
  - All form inputs have associated `<label>` (visible or sr-only) and visible focus rings
  - Forms expose errors via `aria-live` polite region
  - Non-decorative images have meaningful `alt`; decorative images have `alt=""`
  - Keyboard-only flow works through hero → form → footer
  - Honors `prefers-reduced-motion`

---

## 7. SEO

| Surface | Title (≤ 60 ch) | Meta description (≤ 155 ch) |
|---|---|---|
| `/sleep-guide` | "Free Sleep Guide \| Busby Mattresses" | Get our expert sleep guide and be first to know about new mattresses and showroom events. From the makers of American-made Busby. |
| `/locations` | "Visit a Busby Showroom" | Try every Busby mattress in person. Now open in Chicago, with more cities coming soon. |
| `/locations/chicago/<neighborhood>` | "Visit Busby Chicago — [Neighborhood]" | Try every Busby mattress side-by-side at our [Neighborhood] showroom. Walk-ins welcome. American-made, 100-night trial, 10-year warranty. |

Add the new pages to `sitemap.xml` and `robots.txt` (no `Disallow`). LocalBusiness JSON-LD on the store page (covered in C section).

---

## 8. Edge cases & error states

- **ESP outage** on form submit → show a friendly error and a `mailto:newsletter@mybusby.com` fallback. Don't lose the lead silently.
- **Duplicate email** → treat as success ("You're already on the list — check your inbox") and re-send the welcome email.
- **JavaScript disabled** → forms gracefully POST to a server endpoint and redirect to a `/thanks` page.
- **Invalid email** → inline validation message after blur, not on every keystroke.
- **Slow connection** → form button shows a loading state and disables to prevent double-submit.
- **Map embed blocked** (e.g., users with privacy extensions) → show a static map image fallback with a "Get directions" link to Google Maps / Apple Maps.

---

## 9. Build order (recommended)

Phase 1 — **Don't block on assets**:
1. Sticky announcement bar (B1) — Berke just needs to confirm copy
2. Header "Showrooms" link (B6) — links to a placeholder `/locations` index initially
3. Replace unattributed press quotes (B4) — remove them and ship the new testimonials section with placeholders
4. Stat-strip enhancement on home page (B2) — add "10,000+ American sleepers"

Phase 2 — **Core deliverables**:
5. `/sleep-guide` landing page (A) — fully functional with placeholders for hero photo
6. `/locations` index page + `/locations/chicago/<neighborhood>` page (C) — wired up with placeholders for photos / video / Sleep Guide bios
7. Home-page Chicago store section (B5) — wired to the location page
8. Footer "Visit Us" block (B7)

Phase 3 — **Asset swap-in** (Berke provides):
9. Real press logos (B3)
10. Real customer testimonials with attribution (B4)
11. Real store photography + video (C, B5)
12. Sleep Guide PDF + transactional email content (A)
13. Real Sleep Guide bios (C4)

This sequencing means Claude Code can ship most of the structure and behavior while Berke gathers the assets. Every placeholder in the codebase should be marked `[REPLACE: ...]` so it's grep-able.

---

## 10. Open questions for Berke

These should be answered before or during implementation. Claude Code should pause and ask if any block progress.

1. **Store address & neighborhood?** — needed for routing (`/locations/chicago/<neighborhood>`), JSON-LD, copy.
2. **Store hours?**
3. **Opening date?** — drives the announcement-bar copy ("Opening June 14" vs. "Now open").
4. **Sleep Guide PDF** — does it exist? If not, we should produce one as a stretch deliverable.
5. **ESP** — confirm the email service provider in use (Mailchimp / Klaviyo / etc.) so the form posts to the right place.
6. **Reviews widget** — Yotpo / Okendo / Trustpilot in place yet? If not, we'll launch with attributed quotes only and add the widget later.
7. **Press placements** — what real outlets have covered Busby (the press@ inbox should have these)?
8. **Real customer permissions** — has anyone signed off to be quoted publicly with a first name + city?
9. **Photography** — store interior shoot scheduled? If so, when?
10. **Booking system** — okay to ship the simple form for v1, or is there a paid tool (Calendly / Resy) we should integrate with from the start?

---

## 11. Out-of-band considerations

- **Local SEO:** Set up a Google Business Profile for the Chicago store as soon as the address is finalized. Out of scope for code changes but should happen alongside.
- **Press embargo:** If doing a coordinated press launch, plan content drops to coincide.
- **A/B test ideas (post-launch, future round):**
  - Sleep Guide vs. "Be first to try our next model" as the LP incentive
  - Single-step form vs. multi-step (start with sleep-position question)
  - Hero photo vs. hero video on the LP
  - Sticky bar copy variations
- **Future stores:** The URL structure (`/locations/<city>/<neighborhood>`) and "Showrooms" plural nav are deliberately scaled for store #2 in 2026/2027.
