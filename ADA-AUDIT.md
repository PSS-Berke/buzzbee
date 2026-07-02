# ADA Accessibility Audit — mybusby.com (Busby)

**Date:** July 1, 2026
**Standard:** WCAG 2.1 Levels A & AA (the benchmark used by the DOJ and courts for ADA Title III web compliance), with WCAG 2.2 target-size noted as forward-looking best practice
**Method:** Full static code review of all 45 routes and 45 components (Next.js 16 / Tailwind 4), mathematically computed contrast ratios for every brand color pairing found in the code, and spot verification against the live production HTML at mybusby.com
**Scope:** Entire public site (home, shop, PDPs, compare, quiz, booking, cart/checkout, sleep-guide, locations, press, legal) plus a light pass on internal `/admin` pages

---

## 1. Executive Summary

**Overall assessment: Not currently conformant with WCAG 2.1 AA.** The site fails multiple Level A criteria on core user journeys. The most severe problems cluster in two areas:

1. **Keyboard & screen-reader operability of custom widgets.** Four components are built in ways that make content or actions unreachable without a mouse: the header's Shop dropdown (hover-only), the cart drawer (not a dialog, no focus management), the home page's "6 Essential Components" widget (clickable `div`s), and the Shop-by-Feel page (product links nested inside `<button>` elements — invalid HTML that strips them from assistive tech).

2. **A brand palette that systematically fails contrast minimums.** Verified mathematically: white-on-gold — used for most primary CTAs — is **2.06:1** (minimum is 4.5:1); the gold-dark eyebrow/CTA text used on nearly every section is **3.2:1** at small sizes; `gray-400`/`gray-500` secondary text (**2.26:1 / 4.02:1**) is used for real content including product descriptions and prices; and the new Studio line's clay-on-paper text is **2.65:1**. Separately, every checkout/booking/newsletter input suppresses the focus outline and replaces it with a gold border that itself fails contrast.

There are genuine strengths: `lang` is set, zoom is not disabled, there is exactly one `h1` per page with mostly clean hierarchies, icons are correctly hidden from assistive tech (lucide-react auto-`aria-hidden`, verified), map iframes have titles, the reserve form has model label/fieldset/autocomplete structure, and honeypots are correctly hidden. The codebase is close enough that a focused remediation effort (see §8) can reach AA conformance without redesign — the CTA color change is the only decision requiring design input.

**Finding counts (consolidated):**

| Severity | Count | Definition |
|---|---|---|
| Critical | 4 | Blocks a core task entirely for keyboard/AT users |
| Serious | 24 | Significant barrier on a core journey |
| Moderate | 19 | Degraded experience or conditional barrier |
| Minor | 17 (grouped) | Best-practice gaps, polish |

**ADA context (not legal advice):** ADA Title III applies to places of public accommodation, which courts have consistently applied to retail e-commerce sites. DOJ guidance and settlement practice reference WCAG 2.1 AA as the de facto technical standard. Purchase-path barriers (checkout, product selection, booking) are the fact patterns that appear most often in demand letters — and several findings below sit exactly there.

---

## 2. Verified Color-Contrast Analysis

Ratios computed with the WCAG relative-luminance formula from the palette in `app/globals.css`. Thresholds: **4.5:1** normal text, **3:1** large text (≥24px, or ≥18.66px bold), **3:1** non-text UI (borders, focus indicators, icons, state cues).

### 2.1 Failing pairs in active use

| Pair | Ratio | Verdict | Where used |
|---|---|---|---|
| White on gold `#F3A51D` | **2.06** | FAIL all sizes | Nearly all primary CTAs: header "Shop Now", quiz Start/Next/Shop Now, sleep-guide CTAs, newsletter Subscribe, ReserveForm submit, SleepGuides booking CTA, Elmhurst "Visit the Showroom", cart count badge, admin buttons, one-sheet "Save as PDF", "Try in store" badge |
| Gold on white / `#faf8f5` | 2.06 / 1.79 | FAIL all sizes | Elmhurst phone link, quiz eyebrow, FAQ open-state "−" indicator, all `hover:text-gold` link states, 404 eyebrow |
| Gold-dark `#D4792C` on white | **3.20** | FAIL normal text | Site-wide 12–14px eyebrows ("In Store", "Flagship Collection", "The Pinnacle"…), "Discover the Dream"-style CTAs, feature pills, "You Save" amounts, thank-you page inline links |
| Gold-dark on `#faf8f5` cream | 2.78 | FAIL normal text | Same eyebrow/CTA pattern on cream sections (most of the site) |
| `gray-400` on white | **2.26** | FAIL all sizes | Flagship product description (products page & FeaturedProducts), PDP breadcrumb links, "Queen" size labels, payment note, "Size guide", checkout trust badges & item sizes, "Clear Cart", press logo links, book-page chips, SixComponents detail text |
| `gray-300` on white | 1.49 | FAIL all sizes | Cart item product-type line, "No image"/placeholder text, card arrow icons |
| `gray-500` on white | **4.02** | FAIL normal text (passes large/bold) | The site's default secondary text: taglines, card descriptions, section intros, trust badges, dropdown sublabels, "Question X of Y" |
| `gray-500` on `#faf8f5` | 3.50 | FAIL normal text | Tier names, trust badge rows, section intros on cream |
| Clay `#C08768` on paper `#F2EFE9` | **2.65** | FAIL all sizes | Every Studio eyebrow ("Design Principle", "The Collection", "Introducing — The Studio Line") and the functional "Read the spec" CTA (StudioSpecCard.tsx:49) |
| `navy/60` on paper | 3.54 | FAIL normal text | Studio section intros, spec-card descriptors, "Compare both lines" link |
| `navy/50`, `navy/40` on paper | ~2.7 / ~2.2 | FAIL | Spec-card price/layers labels, "Macro shot coming soon" |
| `white/35–45%` on dark navy | ~3.1–3.6 | FAIL normal text | LayerSwitcher stat labels/subtitles/"Layer 01" badges; press one-sheet 9–10px labels |
| Gold border `focus:border-gold` on white | 2.06 | FAIL 3:1 UI | The *replacement* focus indicator on all checkout/reserve/newsletter/admin inputs |
| `border-gold/10` input borders (checkout) | **1.07** | FAIL | Checkout field boundaries are essentially invisible |
| Focus ring `sky #3776BB` on navy / gold / clay | 2.64 / 2.28 / 1.54 | FAIL 3:1 UI | The global focus indicator is inadequate on dark navy sections, gold CTAs, and clay surfaces |
| Gold progress fill on `gray-200` track | ~1.67 | FAIL 3:1 UI | Quiz progress bar |
| Gold-dark `text-xs` over photo gradients | unverifiable, likely FAIL | — | Product-card tier lines over photos (shop/mattresses, home-line) |

### 2.2 Passing pairs to migrate toward

| Pair | Ratio | Use for |
|---|---|---|
| Navy on gold | **6.03** | CTA text on gold buttons (drop-in fix for white-on-gold) |
| Navy on white / paper | 12.41 / 10.81 | Body text (already dominant — good) |
| White on navy / navy-light | 12.41 / 6.08 | Buttons (already used — good) |
| `gray-600` on white / `#faf8f5` | 7.53 / 6.56 | Replacement for gray-400/gray-500 secondary text |
| Clay-deep `#95553C` on paper | **5.02** | Replacement for clay text in the Studio line |
| White on clay-deep | 5.77 | Studio buttons |
| `white/70`+ on navy | ≥6.9 | Muted text on dark sections (raise all `white/35–60` to ≥`white/70`) |
| Gold-light on navy | 7.09 | Accent text on dark sections |
| Coral/error `#D0403E` & `red-600` on white | 4.68 / 4.83 | Error text (current red-600 usage already passes) |
| Footer `gray-400` on navy | 5.50 | Current footer headings pass — no change needed |

---

## 3. Critical Findings (blocks core tasks)

### C1 — Shop dropdown is hover-only; keyboard users can never open the primary navigation menu
**WCAG 2.1.1 (A), 4.1.2 (A), 1.4.13 (AA)** — `components/layout/Header.tsx:85-93`
The dropdown opens only via `onMouseEnter`/`onMouseLeave` on a wrapper div; the "Shop" `<button>` has no `onClick`, no focus handler, no `aria-expanded`/`aria-haspopup`/`aria-controls`, and there is no Escape dismissal. **"Sleep Accessories" has no other header path, so that page is unreachable by keyboard**, along with the in-store booking cards in the panel.
**Fix:** Toggle on click, open on focus/Enter, add `aria-expanded`/`aria-haspopup`/`aria-controls`, close on Escape and focusout, return focus to the trigger.

### C2 — Cart drawer is not an accessible dialog
**WCAG 4.1.2 (A), 2.1.2 (A), 2.4.3 (A)** — `components/cart/CartDrawer.tsx:36-124` (mounted last in `<body>`, `app/layout.tsx:128`)
The drawer is plain `div`s: no `role="dialog"`, no `aria-modal`, no `aria-labelledby`. Focus never moves into it on open, is not trapped, and is not restored on close. Because the drawer is the last element in the body, a keyboard user must Tab through the **entire obscured page** — landing on visually hidden, click-blocked background controls — before reaching "Close cart"/"Checkout". Screen readers are never told a modal opened.
**Fix:** `role="dialog" aria-modal="true" aria-labelledby` on the panel; move focus to the close button on open; trap Tab; restore focus to the cart icon on close; set `inert` on the rest of the page (or use native `<dialog>`). Escape and scroll-lock already work (good).

### C3 — "6 Essential Components" widget is mouse-only; its content is unreachable
**WCAG 2.1.1 (A), 4.1.2 (A)** — `components/home/SixComponents.tsx:78-87, 103-110`
Both the mattress-slab visualization and the component list cards are `div`s with `onClick` and `cursor-pointer` — no `role`, no `tabIndex`, no key handlers, no exposed selected state. The per-component `detail` paragraph renders only for the active item, so **keyboard and screen-reader users can never read the details for components 2–6**.
**Fix:** Convert both control sets to `<button>`s using the ARIA tabs pattern (`tablist/tab/tabpanel` + `aria-selected`) or disclosure buttons with `aria-expanded`; add a non-color active indicator.

### C4 — Shop-by-Feel nests product links inside toggle buttons
**WCAG 4.1.2 (A), 1.3.1 (A), 2.1.1** — `app/shop-by-feel/page.tsx:103-173` (verified: `<Link>` at 155 renders inside the `<button>` opened at 103)
Each category card is one big `<button>` whose *expanded content* — including the `/products/[slug]` recommendation links and the card's `<h3>` — lives inside it. Interactive content inside a button is invalid HTML; ARIA treats button descendants as presentational, so the recommendation links may not be exposed as links at all, clicks on them also fire the toggle, headings vanish from navigation, and the entire card text is flattened into one enormous button name. The button also lacks `aria-expanded`.
**Fix:** Keep only the card header inside the button (standard pattern: `<h3><button aria-expanded aria-controls>`), and move the tip + links to a sibling panel `div` referenced by `aria-controls`.

---

## 4. Serious Findings

### Site-wide / systemic

**S1 — No skip-to-content link** — WCAG 2.4.1 (A) — `app/layout.tsx`
No bypass mechanism exists anywhere (verified sitewide grep: 0 hits). Keyboard users must traverse the full header (top bar, nav, dropdown, cart) on every page.
*Fix:* Add a visually-hidden-until-focused "Skip to main content" link as the first element in `<body>`, targeting `<main id="main">`.

**S2 — Form fields suppress the focus outline and replace it with a failing indicator** — WCAG 2.4.7 (AA), 1.4.11 (AA)
`focus:outline-none` + `focus:border-gold` on **all 9 checkout inputs** (`app/checkout/page.tsx:139-269`), all ReserveForm fields (`components/locations/ReserveForm.tsx:170-280`), both EmailCaptureForm variants (`:126,173`), and admin inputs (`app/admin/notifications/page.tsx:125,136`). The Tailwind class outspecifies the global `*:focus-visible` rule, so the only focus cue is a gold border at 2.06:1 — below the 3:1 minimum. Checkout inputs additionally use `border-gold/10` (1.07:1) resting borders, so field boundaries are nearly invisible.
*Fix:* Remove `focus:outline-none`, or add `focus-visible:ring-2 focus-visible:ring-navy ring-offset-2`; raise resting borders to ≥3:1 (e.g. `border-gray-300`+).

**S3 — Reserve form's mattress chips have no visible keyboard focus at all** — WCAG 2.4.7 (AA) — `ReserveForm.tsx:262-268`
The checkboxes are `peer sr-only` (visually clipped); the visible chip has `peer-checked:` styles but **no `peer-focus-visible:` styles**, so the global outline lands on a 1px invisible input. Keyboard users tab through five invisible stops.
*Fix:* `peer-focus-visible:ring-2 peer-focus-visible:ring-navy peer-focus-visible:ring-offset-2` on the chip span. Also add a non-color checked indicator (checkmark) — current state is gold fill only (1.4.1).

**S4 — Global focus indicator fails on dark/gold/clay surfaces** — WCAG 1.4.11 (AA) — `app/globals.css:232-235`
The single sky-blue outline is 2.64:1 on navy sections (footer, hero bands, press), 2.28:1 on gold CTAs, 1.54:1 on clay.
*Fix:* Two-tone indicator, e.g. `outline: 2px solid var(--sky); box-shadow: 0 0 0 4px #fff;` or a white outer ring on dark surfaces.

**S5–S9 — Palette contrast failures in active use** — WCAG 1.4.3 (AA)
See §2.1 for the full verified table. The five systemic items, each spanning dozens of instances:
- **S5:** White-on-gold primary CTAs (2.06:1) — switch to **navy-on-gold (6.03:1)** or navy buttons.
- **S6:** Gold-dark 12–14px eyebrows/CTAs/pills (3.2:1 on white, 2.78:1 on cream) — darken the token for small text (needs ≈`#B05E0F` or darker), or reserve gold-dark for ≥18.66px bold.
- **S7:** `gray-400`/`gray-300` used for real content (2.26/1.49:1) — replace with `gray-600`.
- **S8:** `gray-500` as the default secondary text (4.02:1 on white; 3.50:1 on cream) — replace with `gray-600` for anything below large-text size.
- **S9:** Studio line: clay text on paper (2.65:1) → use **clay-deep (5.02:1)**; raise `navy/40–60` body/labels to `navy/70`+ (4.60:1); same for LayerSwitcher/one-sheet `white/35–45` → `white/70`+.

**S10 — No `prefers-reduced-motion` support anywhere** — WCAG 2.3.3 (AAA, reported as high-priority best practice; interacts with 2.2.2)
Verified 0 hits sitewide. Compounding factors: global `scroll-behavior: smooth` animates every anchor/route scroll; LayerSwitcher is a 400–500vh scroll-jacked animated section with JS smooth-scrolling (`LayerSwitcher.tsx:396`); infinite `animate-pulse` dots (header badge, cart badge, about, FAQ); drawer slide-ins; pervasive hover scale/translate.
*Fix:* Add a global reduced-motion block to `globals.css`:
```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, ::before, ::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
}
```
plus `matchMedia` guards in LayerSwitcher/ScrollToTop JS scrolling.

### Purchase path

**S11 — Add-to-cart and all cart mutations are silent to screen readers** — WCAG 4.1.3 (AA) — `components/product/ProductInfo.tsx:18-32`, `contexts/CartContext.tsx`, `components/cart/*`
Verified: zero live regions in the entire cart system. Add, remove, quantity, and subtotal changes produce no announcement; the removed row simply vanishes under the virtual cursor.
*Fix:* One visually-hidden `role="status"` region in `CartProvider` announcing "Added Busby Dream, Queen, to cart", "Item removed", etc.

**S12 — PDP size selector exposes no selected state** — WCAG 4.1.2 (A), 1.3.1 — `components/product/ProductInfo.tsx:74-105`
Four identical unnamed-state buttons; selection is border/shadow styling plus a decorative dot. The "Select Size" `<label>` is orphaned (no `htmlFor`, wraps nothing). Price silently rewrites on change (4.1.3). **Real risk of purchasing the wrong size/price.**
*Fix:* `role="radiogroup"` labelled by "Select Size", `role="radio"`+`aria-checked` per option (or `aria-pressed`); wrap the price in `aria-live="polite"`.

**S13 — Cart remove buttons are indistinguishable** — WCAG 2.4.6 (AA), 4.1.2 — `components/cart/CartItem.tsx:64-70`
Every line item's destructive button is `aria-label="Remove item"`.
*Fix:* `aria-label={"Remove " + item.productName + " (" + item.size + ") from cart"}`.

**S14 — Image gallery cluster** — WCAG 2.1.1, 3.2.2, 2.1.2, 2.4.3, 2.4.7 — `components/product/ImageGallery.tsx`
(a) Zoom/lightbox opens only via `onClick` on a non-interactive div (`:48`) — keyboard users can't open it; (b) prev/next/dot clicks bubble to that div and **unexpectedly launch the lightbox** (`:81,93,105` — no `stopPropagation`); (c) the lightbox has no `role="dialog"`/`aria-modal`, no focus move/trap/restore (`:144`); (d) on desktop the controls are `md:opacity-0 md:group-hover:opacity-100` with no `group-focus-within` — **keyboard focus lands on fully invisible buttons** (`:78`).
*Fix:* Dedicated zoom `<button>`; `stopPropagation` in nav handlers; full dialog semantics + focus trap; add `md:group-focus-within:opacity-100`.

**S15 — Product tabs have no tab semantics** — WCAG 4.1.2 (A) — `components/product/ProductTabs.tsx:26-41`
Overview/Materials/Delivery are bare buttons; active state is styling only; panels are anonymous. No `aria-selected`, no panel relationship, no announcement of content change.
*Fix:* ARIA tabs pattern (`tablist/tab/tabpanel`, `aria-selected`, roving tabindex + arrow keys).

**S16 — Compare page's desktop grid has no table semantics** — WCAG 1.3.1 (A) — `app/compare/CompareClient.tsx:171-296`
Values ("5 Layers", ratings, Best For) have no programmatic association with their product column — screen readers hear an undifferentiated stream, defeating the page's purpose. The AT-friendly mobile card layout is `display:none` on desktop, so it doesn't help desktop SR users.
*Fix:* Rebuild as a real `<table>` with `<th scope="col">` products and `<th scope="row">` categories.

**S17 — Checkout failure is not announced and renders in the opposite column** — WCAG 4.1.3 (AA), 3.3.1 (A) — `app/checkout/page.tsx:289-291`
The error `<p>` has no `role="alert"`; no focus move; on desktop it appears in the left card while the submit button is in the right sticky summary. A blind user pressing "Proceed to Secure Payment" gets a silent dead end at the payment step.
*Fix:* `role="alert"`, render adjacent to the pressed button (both instances), move focus to it.

**S18 — No `autocomplete` on any of the nine checkout fields** — WCAG 1.3.5 (AA) — `app/checkout/page.tsx:132-271`
Email, phone, first/last name, address, apartment, city, state, ZIP all lack autocomplete tokens — browser autofill and AT input-purpose support are lost on the highest-friction step.
*Fix:* `email`, `tel`, `given-name`, `family-name`, `address-line1`, `address-line2`, `address-level2`, `address-level1`, `postal-code` (+ `inputMode="numeric"` on ZIP).

### Conversion flows

**S19 — Quiz answers expose no selected state; steps and results are silent** — WCAG 4.1.2 (A), 1.3.1, 4.1.3, 2.4.3 — `components/quiz/QuizQuestion.tsx:27-35,82-99`, `app/quiz/page.tsx:29-37,138-139`
Options are plain buttons with a fake visual radio; no `aria-checked`/`aria-pressed`, no group/legend tying options to the question. Pressing Next swaps the question with no announcement and no focus move; "See Results" unmounts the view and drops focus to `<body>` with the recommendation never announced.
*Fix:* Radiogroup semantics (or `aria-pressed`); announce "Question X of Y" via `aria-live`; move focus to the new question heading and to the result heading.

**S20 — Booking confirmation is silent and drops focus** — WCAG 4.1.3 (AA), 2.4.3 — `components/locations/ReserveForm.tsx:120-139`
On success the whole form (which carries the `aria-live` wrapper) unmounts, replaced by an un-announced confirmation div; focus falls to `<body>`. The single most important state change in the booking flow is inaudible.
*Fix:* Persistent `role="status"` region + move focus to the confirmation heading (`tabIndex={-1}`).

**S21 — Footer newsletter errors are screen-reader-only; sighted users get nothing** — WCAG 3.3.1 (A) — `components/forms/EmailCaptureForm.tsx:135-139`
In the inline (footer) variant the only error output is `className="sr-only"`. With `noValidate` set, a sighted user submitting a bad email sees the button flick back to "Subscribe" — the form appears to succeed while silently failing. (The stacked variant shows errors correctly.)
*Fix:* Render the error visibly in the inline variant too; keep `role="alert"`.

**S22 — Duplicate form `id`s break label association on the sleep-guide page** — WCAG 4.1.1, 1.3.1, 3.3.2 (A) — `EmailCaptureForm.tsx:119,166` + `app/sleep-guide/page.tsx:117,230`
The LP mounts the component twice with the same `source`, producing two `id="email-sleep-guide-lp"` inputs: the second form's label resolves to the first form's field.
*Fix:* Use `useId()` for the input id.

### Content

**S23 — FAQ accordion: no state semantics, and collapsed answers remain in the accessibility tree with a focusable invisible link** — WCAG 4.1.2 (A), 2.4.3, 2.4.7 — `app/faq/page.tsx:91-123`
Buttons have no `aria-expanded`/`aria-controls`; collapsed panels are `max-h-0 opacity-0` (never hidden from AT), so screen readers read all 14 answers regardless of state, and the warranty `<Link>` inside answer 13 stays tabbable while invisible. Also `max-h-96` clips long answers at 200% zoom (1.4.4/1.4.10).
*Fix:* Copy the pattern already used in `components/locations/LocationFAQ.tsx` (conditional render + `aria-expanded`); add `aria-controls`/panel ids; drop the max-height cap.

**S24 — Broken and misleading interactive destinations** — WCAG 2.4.4 (A) + functional dead ends
- `app/terms/page.tsx:184` — "Click here" → `/privacy` **404s** (route is `/privacy-policy`); text also non-descriptive.
- `app/home-line/page.tsx:334` — "Shop Sleep Accessories" → `/accessories` **404s** (should be `/shop/sleep-accessories`).
- `app/faq/page.tsx:201` — "Get in Touch" is a `tel:` to placeholder `+1-800-000-0000` (real number is 844-886-1640), with no phone indication in the label.
- `app/press/page.tsx:409-417` — four "As Seen In" links go to `#` in a new tab.
- `components/product/ProductInfo.tsx:122` — "Financing Available" links to the home page; `:77` — "Size guide" button has no handler at all (announced, focusable, does nothing).
- `app/studio/page.tsx:143` — "Shop the Studio line" navigates to `/compare`.
*Fix:* Correct the hrefs, real number, real URLs (or unlink), wire or remove the dead button.

**S25 — Hero video autoplays and loops with no pause mechanism** — WCAG 2.2.2 (A) — `components/home/Hero.tsx:52`
`autoPlay muted loop playsInline`, no controls, no custom pause, no reduced-motion fallback; also unnamed (1.1.1).
*Fix:* Add a pause/play toggle (or `controls`), a static poster under reduced motion, and `aria-label` or `aria-hidden` as appropriate.

**S26 — Shop listing cards place low-contrast text over photos** — WCAG 1.4.3 (AA) — `app/shop/mattresses/page.tsx:197-206`, `app/home-line/page.tsx:196-205`
White + `text-gold-dark text-xs italic` + `text-gray-300` over a `from-navy/80 via-navy/40 to-transparent` gradient on arbitrary photos — name, tier, and price can be unreadable on light image regions.
*Fix:* Solidify the gradient behind the text block (e.g. `from-navy/95 via-navy/80`) and use white/gold-light for the tier line.

---

## 5. Moderate Findings

| # | Finding | WCAG | Location(s) |
|---|---|---|---|
| M1 | Mobile menu toggle lacks `aria-expanded`/`aria-controls`; menu is a bare div (no `<nav>` landmark, `<p>` group labels); no Escape; sticky header + no `max-h`/overflow can make lower items unreachable at 200 % zoom | 4.1.2, 1.3.1, 1.4.10 | `Header.tsx:177-282` |
| M2 | Missing/duplicate page titles: `/cart`, `/checkout`, `/checkout/success`, `/checkout/cancel`, `/shop-by-feel`, `/press/one-sheet` all fall back to the root title; `/home-line` title is generic; `/admin/emails/[template]` static for all templates | 2.4.2 | client pages without `metadata`/layouts |
| M3 | Heading-structure defects: PDP h1→h3 (ProductTabs, StudioSpecSheet section heads), "Customer Satisfaction Guarantee" h4 skip, compare h1→h3, one-sheet section "headings" are styled `<div>`s, press "As Seen In" is a `<p>`, about page splits one heading into two `<h2>`s, shop pages' flagship h2 vs sibling h3 implies false nesting | 1.3.1, 2.4.6 | `ProductTabs.tsx:50`, `StudioSpecSheet.tsx:14`, `app/products/[slug]/page.tsx:182`, `CompareClient.tsx:122,197`, `app/press/one-sheet/page.tsx:123-228`, `app/press/page.tsx:404`, `app/about/page.tsx:274-277` |
| M4 | `target="_blank"` links never announce the new tab (social icons, maps/directions, press/LinkedIn, one-sheet) | 2.4.4 / G201 | `Footer.tsx:82-142`, `ElmhurstAnnouncement.tsx:44,75`, `appointment:109-138`, `book:165`, `GettingHere.tsx:47`, `LocationHero.tsx:41-64`, `press:227,516,543` |
| M5 | Cart icon: no `aria-haspopup="dialog"`/`aria-expanded`; count badge pulses indefinitely; "1 items" grammar | 4.1.2, 2.2.2 | `CartIcon.tsx:10-20` |
| M6 | Strikethrough original price is visual-only — SRs read two contradictory prices | 1.3.1 | `CartItem.tsx:55-59` |
| M7 | ReserveForm: `noValidate` with no client validation; single generic error; no `aria-invalid`/`aria-describedby`/focus-to-error; slot-conflict recovery silently clears the chosen slot | 3.3.1, 3.3.3 | `ReserveForm.tsx:70-118,284-291` |
| M8 | EmailCaptureForm: placeholder-only visible label; no `aria-invalid`/`aria-describedby`; success replaces form with a just-mounted live region (often unannounced) + focus drop | 3.3.2, 3.3.1, 4.1.3 | `EmailCaptureForm.tsx:89-96,115-139` |
| M9 | Quiz: focus lost when Start/intro unmounts; IconGrid selection is color-only; disabled Next unfocusable with no explanation | 2.4.3, 1.4.1 | `app/quiz/page.tsx:54-56,122-129`, `QuizQuestion.tsx:30-47` |
| M10 | Gallery thumbnails & dots: no `aria-current`; selected state is border-tint/opacity (color/luminosity only) | 4.1.2, 1.4.1 | `ImageGallery.tsx:91-129` |
| M11 | Compare: Artisan/Studio toggle lacks `aria-pressed`; four identical "View Details" links | 4.1.2, 2.4.4 | `CompareClient.tsx:79-89,282-290` |
| M12 | LayerSwitcher (PDP): progress dots lack `aria-current` (mobile+desktop); stat callout sits outside the live region; live region announces full body copy at every scroll threshold; desktop dots <24px | 4.1.2, 4.1.3 | `LayerSwitcher.tsx:106-124,244-303,459` |
| M13 | StudioSpecSheet table: `<th>`s lack `scope`; material names are `<td>`; horizontal scroll container not keyboard-focusable (560px min-width overflows phones); same scroll issue on admin tables | 1.3.1, 2.1.1 | `StudioSpecSheet.tsx:101-120`, `app/admin/page.tsx:85,125` |
| M14 | Sleep-guide thanks page nests a second `<main>` inside the root layout's `<main>`; thank-you links distinguished by color alone (gold-dark vs gray-600 ≈ 2.35:1, underline only on hover) | 1.3.1, 1.4.1 | `app/sleep-guide/thanks/page.tsx:37,47-82` |
| M15 | Elmhurst map iframe is keyboard-focusable third-party UI placed before the section's content in tab order | 2.1.1, 2.4.3 | `ElmhurstAnnouncement.tsx:32-42` |
| M16 | About-page alt text: "Factory team" on an AI-generated bedroom render (likely wrong), "Fancy interior", "Bedroom lifestyle" — generic/inaccurate | 1.1.1 | `app/about/page.tsx:158,172`, `OurStoryTeaser.tsx:37` |
| M17 | Header top-bar address link labeled with the street address navigates to `/appointment` | 2.4.4 | `Header.tsx:50-56` |
| M18 | Announcement bar dismissal destroys the focused button with no focus management or announcement | 2.4.3, 4.1.3 | `AnnouncementBar.tsx:46-58` |
| M19 | Admin: status/error messages have no `role="status"`/`alert`; "Remove" deletes instantly with no confirmation at a ~16px target; press one-sheet fixed 8.5×11in canvas doesn't reflow (2-D scroll at zoom) | 4.1.3, 3.3.4, 1.4.10 | `app/admin/notifications/page.tsx:85-99,175`, `app/press/one-sheet/print.css:33` |

---

## 6. Minor Findings (grouped)

1. **Lists not marked up as lists** (`1.3.1`): TrustBar items, FeaturedProducts grid, OurStoryTeaser stats, shop-page badge/tier rows, StudioDesignIndex grid, ProductTabs features/tags/delivery steps, desktop nav/dropdown/mobile-menu link groups, compare "Best For" tags. Footer columns already do this right — extend the pattern.
2. **Verbose whole-card link names + duplicated image alts** (`2.4.4`, `1.1.1`): flagship/product cards concatenate entire card text into one link name; `alt={product.name}` duplicates the adjacent heading (products, home-line, compare, FitsAnyBed). Use concise `aria-label`s and `alt=""` where text carries the name.
3. **Decorative characters exposed to AT**: "›" tier separators, "|" divider on compare, breadcrumb "/" spans, ghost index numerals inside Studio card links ("zero one…"), LayerSwitcher watermark numbers, FAQ "+/−" glyphs — add `aria-hidden="true"`.
4. **Raw hand-written SVGs lacking `aria-hidden`**: TheDifference arrow (`:85`), one-sheet print/chevron icons. (All lucide icons are auto-hidden — verified in the installed package.)
5. **Navigation polish**: no `aria-current="page"` anywhere; primary `<nav>` unlabeled; footer link columns not `<nav>` landmarks; PDP breadcrumb missing `aria-label="Breadcrumb"`/`<ol>`/`aria-current`.
6. **Touch targets below 24px** (WCAG 2.2 2.5.8, forward-looking): gallery dots (8×8), top-bar links, footer social icons (20×20), "Clear Cart", quiz Back/Retake, admin Remove, desktop LayerSwitcher dots.
7. **SleepQuizCTA mock quiz** reads as a real quiz to AT (fake "Question 1 of 6", result card) — `aria-hidden` the illustration column.
8. **Duplicate adjacent links** to the same product (cart item image + title) — merge or `tabIndex={-1} aria-hidden` the image link.
9. **Empty `<th>`s** over admin action columns; identical "View preview" links — add sr-only header text and per-row labels.
10. **Warranty page** blank `___` return-address placeholder (SRs voice underscore runs; the address is legally required content); Terms has two "SECTION 18"s.
11. **FAQ JSON-LD** lists 8 questions while the page shows 14 — generate both from one source.
12. **Studio numbered list** uses `<ul>` with painted "01/02/03" spans — use `<ol>` or hide numerals.
13. **`animate-in fade-in`** classes on shop-by-feel resolve to nothing (plugin not installed) — dead code today; unguarded motion if the plugin is ever added.
14. **Status-message polish**: "Redirecting to Stripe…" and inline-newsletter "Sending…" states lack `role="status"` mirrors.
15. **`role="alert"` combined with `aria-live="polite"`** in EmailCaptureForm (contradictory politeness) — use one.
16. **Quiz progress bar** fill vs track ≈1.67:1 (non-text) — darken fill or add a border.
17. **CustomerTestimonials.tsx is dead code** (imported nowhere) — remove or note; it has its own minor issues (10px "Placeholder" badges) if revived.

---

## 7. What the Site Already Does Well

- `lang="en"`, viewport allows zoom to 5×, one `<main>` landmark, exactly one `h1` per page, and a mostly clean h1→h2→h3 outline on the composed home page.
- A global `*:focus-visible` outline exists (the problem is where components override it, not absence).
- **lucide-react auto-applies `aria-hidden="true"` to all decorative icons** (verified in the installed package) — hundreds of icons are correctly hidden.
- Live-site check: rendered images all have alt text; 68 of 69 SVGs aria-hidden; cart button announces its item count.
- ReserveForm is structurally excellent: persistent visible labels, correct `autocomplete`/`inputMode`, `fieldset`/`legend` for both groups, real slot `<button>`s with `aria-pressed` + non-color disabled cue, `aria-live` on the form, visible `role="alert"` errors, no session timers.
- Checkout keeps native HTML5 validation enabled (browser focuses first invalid field) and explains the Stripe redirect before it happens.
- Honeypots correctly hidden from AT and tab order; forms have real `action`/`method` fallbacks.
- Map iframes have descriptive `title`s; `tel:`/`mailto:` links show the real number/address as text; the store record even includes an accessibility description line (`data/store.ts:61` → GettingHere).
- Escape closes the cart drawer and body scroll locks; the announcement bar is a labeled region with a real dismiss button.
- LocationFAQ implements the correct accordion pattern (`aria-expanded`, conditional render) — the template for fixing the main FAQ.
- Per-route metadata exists on most marketing pages, with `generateMetadata` for product slugs; legal pages use real lists and underlined in-prose links.

---

## 8. Remediation Roadmap

**Phase 1 — Unblock keyboard/AT users (≈1–2 dev-days, no design input needed)**
1. Skip link in `app/layout.tsx` (S1).
2. Header Shop dropdown: click/focus/Escape + disclosure ARIA (C1).
3. Cart drawer → accessible dialog with focus trap/restore + `inert` background (C2).
4. SixComponents → buttons with tabs/disclosure semantics (C3).
5. Shop-by-Feel → button-in-heading + sibling panel (C4).
6. Delete every `focus:outline-none` (or add `focus-visible:ring-2 ring-navy`), add `peer-focus-visible` ring to reserve chips (S2, S3).
7. Fix broken destinations: `/accessories`, `/privacy`, placeholder tel, financing link, dead Size-guide button (S24).
8. Global `prefers-reduced-motion` CSS block + guard LayerSwitcher/ScrollToTop JS scrolling (S10) and add a hero-video pause control (S25).

**Phase 2 — Purchase path (≈2–3 dev-days)**
9. Cart live region in `CartProvider`; per-item remove labels; strikethrough price sr-text (S11, S13, M6).
10. Size selector radiogroup + live price; fix orphaned label (S12).
11. ImageGallery: zoom button, `stopPropagation`, lightbox dialog semantics, `group-focus-within` reveal, `aria-current` on dots/thumbnails (S14, M10).
12. ProductTabs → ARIA tabs (S15).
13. Compare desktop → real `<table>` (S16).
14. Checkout: `autocomplete` tokens, `role="alert"` error beside the button, per-route titles for cart/checkout/success/cancel (S17, S18, M2).

**Phase 3 — Color system (1 design decision + ≈1 dev-day)**
15. Gold CTAs: switch label to navy (6.03:1) or switch buttons to navy — one decision, applied via shared classes (S5).
16. Token swaps: small-text gold-dark → darker accent; `gray-400/500` content text → `gray-600`; Studio clay text → clay-deep; `navy/40–60` → `navy/70`+; LayerSwitcher/one-sheet `white/35–45` → `white/70`+ (S6–S9).
17. Two-tone focus ring for dark/gold/clay surfaces; checkout input borders ≥3:1 (S4, S2).
18. Solidify shop-card photo gradients (S26).

**Phase 4 — Flows & content (≈2 dev-days)**
19. Quiz: radio semantics, step/result announcements, focus management (S19, M9).
20. Booking confirmation live region + focus; per-field validation with `aria-invalid`/`aria-describedby` (S20, M7).
21. Newsletter: visible inline errors, `useId()`, persistent success live region, visible label treatment (S21, S22, M8).
22. FAQ accordion rebuild on the LocationFAQ pattern (S23).
23. Heading-hierarchy pass, `target="_blank"` announcements, mobile-menu landmark/`aria-expanded`/max-height, remaining titles (M1–M4), then the grouped minors.

**Phase 5 — Keep it accessible (ongoing)**
- Add `eslint-plugin-jsx-a11y` (extends `next/core-web-vitals` coverage) and fix its findings in CI.
- Add an automated axe pass (`@axe-core/playwright`) over the top ~10 routes in CI.
- Manual test cadence: keyboard-only walkthrough of nav → PDP → cart → checkout and the booking/quiz flows; VoiceOver (Safari) and NVDA (Firefox/Chrome) passes after each phase.
- Publish an accessibility statement page with a feedback channel (standard ADA-mitigation practice).
- Re-audit after Phase 3, since the palette changes touch every page.

---

## 9. Limitations

This is a static code audit with computed contrast and a live-HTML spot check. It cannot verify: rendered text over specific photos (flagged where risky), third-party embeds' internals (Google Maps, Stripe's hosted checkout page), PDF/print output of the one-sheet, actual screen-reader behavior across AT/browser pairs, or images' embedded text. A runtime axe scan plus manual screen-reader and keyboard passes (Phase 5) should follow remediation to confirm conformance. Product photography alt text should also be reviewed editorially once imagery is finalized (several current images are AI-generated with prompt-derived filenames).
