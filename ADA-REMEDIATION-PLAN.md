# ADA Remediation Plan — mybusby.com

> **STATUS (July 1, 2026): All five phases implemented.** Automated verification passes:
> `npm run lint` (full jsx-a11y rule set, 0 errors), `npm run build`, and
> `npm run test:a11y` (axe-core WCAG 2.1 A/AA — 25/25 tests, 0 critical/serious violations
> across 22 routes + cart drawer, lightbox, and mobile-menu states). CI enforces all three
> via `.github/workflows/accessibility.yml`. Accessibility statement live at `/accessibility`.
> Remaining: manual VoiceOver/NVDA passes per the phase test scripts below, and a handful of
> deferred minors (FAQ JSON-LD sharing, list markup on a few card grids, one-sheet on-screen
> reflow, LayerSwitcher live-region debounce, admin Remove confirm step).

**Companion to:** [ADA-AUDIT.md](./ADA-AUDIT.md) (July 1, 2026). Finding IDs (C1–C4, S1–S26, M1–M19, minor groups) refer to that document.
**Goal:** WCAG 2.1 AA conformance on all public routes, verified by keyboard walkthrough, screen-reader pass, and automated scan.
**Total estimated effort:** ~7–9 dev-days across 5 phases. Phases 1–2 are independent of the design decision in Phase 3, so work can start immediately.

## How to use this plan

- Each phase is scoped to ship as **1–3 focused PRs** with its own exit criteria — the site gets safer with every merge, and nothing depends on a big-bang release.
- Fix order is by **user impact**, not by file: keyboard/AT blockers first, then the purchase path, then the color system, then flows and polish.
- Shared primitives (focus trap, live announcer, skip link) are built once in Phase 1 and reused everywhere after.
- Every phase ends with a **test script** — run it before merging. Phase 5 adds automation so regressions get caught in CI.

### One decision needed from design (blocks Phase 3 only)

Gold CTAs fail contrast at 2.06:1 with white text. Two compliant options, same effort:

| Option | Result | Trade-off |
|---|---|---|
| **A. Navy text on gold buttons** (recommended) | 6.03:1 ✓ | Keeps the gold brand moment; label color flips |
| B. Navy buttons with white text | 12.41:1 ✓ | Site already uses this style widely; gold becomes accent-only |

Decide during Phase 1 so Phase 3 isn't blocked. Everything else in Phase 3 is mechanical token swapping.

---

## Phase 1 — Critical blockers & global keyboard access

**Fixes:** C1, C2, C3, C4, S1, S2, S3, S10, S24, S25
**Estimate:** 1.5–2 dev-days · **Suggested PRs:** three (1A nav+drawer, 1B widgets, 1C globals+links)

### PR 1A — Navigation & cart drawer

1. **Skip link (S1)** — `app/layout.tsx`
   Add as first element in `<body>`: an `<a href="#main">Skip to main content</a>` styled `sr-only focus:not-sr-only` (visible on focus, navy on white, high z-index); add `id="main"` to the existing `<main>`.
2. **Shop dropdown (C1)** — `components/layout/Header.tsx:85-141`
   - Add `onClick` toggle to the Shop button; keep hover-open for pointer users.
   - Add `aria-expanded={activeDropdown === 'shop'}`, `aria-haspopup="true"`, `aria-controls="shop-menu"`; give the panel `id="shop-menu"`.
   - Close on `Escape` (return focus to the button) and on `focusout` when focus leaves the wrapper (satisfies 1.4.13).
   - While here: `aria-label="Primary"` on the `<nav>`; `aria-expanded`/`aria-controls` on the mobile toggle (front-runs M1).
3. **Cart drawer → accessible dialog (C2)** — `components/cart/CartDrawer.tsx`
   - Build `hooks/useFocusTrap.ts` (trap Tab, set initial focus, restore focus on unmount) — **reused in Phase 2 for the lightbox**.
   - Panel: `role="dialog" aria-modal="true" aria-labelledby="cart-heading"`; id on the "Your Cart" h2.
   - On open: focus the close button. On close (button, backdrop, Escape, CTA links): restore focus to the cart icon.
   - Set `inert` on `Header`/`main`/`Footer` siblings while open (React 19 supports the `inert` prop).
   - Cart icon (`CartIcon.tsx`): add `aria-haspopup="dialog"`, `aria-expanded={state.isOpen}`; fix "1 items" pluralization (front-runs M5).

### PR 1B — Mouse-only widgets

4. **SixComponents (C3)** — `components/home/SixComponents.tsx:78-125`
   Convert slabs and list cards to `<button type="button">`. Wire as disclosure: `aria-expanded={active}` + `aria-controls` on each card, id on the detail region. Add a non-color active cue (left border + check) alongside the gold highlight.
5. **Shop-by-Feel (C4)** — `app/shop-by-feel/page.tsx:100-174`
   Restructure `renderCategoryCard`: `<h3><button aria-expanded aria-controls>` contains only the header row; move tip + recommendation `<Link>`s to a sibling `<div id role="region">`. Card container keeps the visual styling; button gets the click.

### PR 1C — Global CSS, focus, motion, dead links

6. **Restore focus indicators (S2, S3)**
   - Remove `focus:outline-none` (or add `focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2`) in: `app/checkout/page.tsx` (9 inputs), `components/locations/ReserveForm.tsx` (5 fields), `components/forms/EmailCaptureForm.tsx` (both variants), `app/admin/notifications/page.tsx` (2 inputs).
   - ReserveForm chips (`:264`): add `peer-focus-visible:ring-2 peer-focus-visible:ring-navy peer-focus-visible:ring-offset-2` + a `peer-checked` checkmark (also clears the 1.4.1 color-only state).
   - Checkout resting borders: `border-gold/10` → `border-gray-300`.
7. **Reduced motion (S10)** — `app/globals.css`
   ```css
   @media (prefers-reduced-motion: reduce) {
     html { scroll-behavior: auto; }
     *, ::before, ::after {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```
   Plus `matchMedia('(prefers-reduced-motion: reduce)')` guards on JS scrolling in `components/home/LayerSwitcher.tsx:396` and `components/layout/ScrollToTop.tsx` (use `behavior:'instant'`).
8. **Hero video pause (S25)** — `components/home/Hero.tsx:52`
   Add a small pause/play `<button aria-pressed>` overlay; swap to the static poster under reduced motion; `aria-hidden="true"` on the video (decorative).
9. **Broken/misleading destinations (S24)**
   - `app/home-line/page.tsx:334`: `/accessories` → `/shop/sleep-accessories`
   - `app/terms/page.tsx:184`: `/privacy` → `/privacy-policy`, text → "View our Privacy Policy"
   - `app/faq/page.tsx:201`: real number `tel:+18448861640`, label "Call us: (844) 886-1640"
   - `components/product/ProductInfo.tsx:77`: remove the dead "Size guide" button; `:122`: financing badge → non-link span (until a financing page exists)
   - `app/press/page.tsx:409`: unlink the four "As Seen In" logos (render as text) until real URLs exist
   - `app/studio/page.tsx:143`: relabel "Compare the Studio builds" (or retarget)

### Phase 1 exit criteria (test script)

- [ ] Load any page, press Tab once → skip link appears; Enter → focus lands in main content.
- [ ] Keyboard only: open Shop menu with Enter, Tab through items, reach `/shop/sleep-accessories`, Escape closes and returns focus.
- [ ] Keyboard only: open cart → focus lands on Close; Tab cycles inside the drawer only; Escape closes and returns focus to the cart icon. VoiceOver announces "Your Cart, dialog".
- [ ] Keyboard only: operate all 6 SixComponents items and both Shop-by-Feel card sets; reach a recommended product link.
- [ ] Tab through checkout + reserve forms: every field (and all 5 mattress chips) shows a visible focus ring.
- [ ] macOS "Reduce Motion" on: no smooth scrolling, hero video paused/static.
- [ ] No 404s from the six corrected links.

---

## Phase 2 — Purchase path (PDP → cart → checkout → compare)

**Fixes:** S11–S18, M2 (checkout titles), M6, M10, M11
**Estimate:** 2–2.5 dev-days · **Suggested PRs:** three (2A announcements, 2B PDP widgets, 2C compare+checkout)

### PR 2A — Cart announcements

1. **Live announcer (S11)** — `contexts/CartContext.tsx`
   Add a visually-hidden `<div role="status" aria-live="polite">` rendered by `CartProvider`, plus an `announce(msg)` helper. Announce: "Added {name}, {size}, to cart", "{name} removed from cart", "Cart cleared".
2. **Remove-button names (S13)** — `components/cart/CartItem.tsx:64`
   `aria-label={`Remove ${item.productName} (${item.size}) from cart`}`.
3. **Sale-price semantics (M6)** — `CartItem.tsx:55-59`
   Wrap original price in `<s>` with `<span className="sr-only">Original price:</span>`; sr-only "Sale price:" before the current price.

### PR 2B — PDP widgets

4. **Size selector (S12)** — `components/product/ProductInfo.tsx:74-105`
   Container: `role="radiogroup" aria-labelledby="size-label"` (id the "Select Size" text). Options: `role="radio" aria-checked={selected}` + roving `tabIndex`, Arrow-key handler. Wrap the price block in `aria-live="polite"` so variant changes announce.
5. **Image gallery (S14, M10)** — `components/product/ImageGallery.tsx`
   - Replace the clickable div (`:48`) with a wrapping `<button aria-label={`View larger image of ${productName}`}>`.
   - `e.stopPropagation()` in `nextImage`/`prevImage`/dot handlers.
   - Lightbox: `role="dialog" aria-modal="true"` + `useFocusTrap` from Phase 1; focus Close on open; restore on close.
   - Controls container: add `md:group-focus-within:opacity-100`.
   - Dots/thumbnails: `aria-current` on the active one; thicker ring (non-color cue); add sr-only live "Image N of M".
6. **Product tabs (S15)** — `components/product/ProductTabs.tsx:26-41`
   ARIA tabs: `role="tablist"` (labeled), `role="tab" aria-selected aria-controls` + roving tabindex + Left/Right keys; panels get `role="tabpanel" aria-labelledby` + `tabIndex={-1}`.

### PR 2C — Compare & checkout

7. **Compare table (S16)** — `app/compare/CompareClient.tsx:171-296`
   Rebuild the desktop grid as `<table>`: `<th scope="col">` per product (image+name+price), `<th scope="row">` per category. Keep visual styling via table classes. Line toggle: `aria-pressed` (M11); "View Details" links: `aria-label={`View details: ${product.name}`}` (M11).
8. **Checkout (S17, S18)** — `app/checkout/page.tsx`
   - Add the nine `autocomplete` tokens (`email`, `tel`, `given-name`, `family-name`, `address-line1`, `address-line2`, `address-level2`, `address-level1`, `postal-code`) + `inputMode="numeric"` on ZIP.
   - Error: `role="alert"`, rendered directly above whichever submit button was pressed; `.focus()` it on set.
   - "Redirecting to Stripe…" mirrored in a `role="status"` span.
9. **Flow titles (M2 subset)** — add `layout.tsx` exporting metadata for `/cart` ("Shopping Cart | Busby"), `/checkout` ("Checkout | Busby"), `/checkout/success` ("Order Confirmed | Busby"), `/checkout/cancel` ("Order Cancelled | Busby").

### Phase 2 exit criteria (test script)

- [ ] VoiceOver: select a size → hears "selected" + new price; Add to Cart → hears the confirmation; remove an item → hears which one.
- [ ] Keyboard-only full purchase: PDP → size → add → drawer → cart → checkout → (Stripe redirect starts). Zero mouse.
- [ ] Gallery: Tab reveals controls on desktop; Enter on Next changes image *without* opening the lightbox; lightbox opens only from the zoom button, traps focus, Escape restores.
- [ ] VoiceOver on /compare desktop: navigating by table cell announces product + category context for every value.
- [ ] Browser autofill populates the full checkout address.
- [ ] Force a checkout API error → VoiceOver announces it; message appears next to the button pressed.

---

## Phase 3 — Color & contrast system

**Fixes:** S4, S5, S6, S7, S8, S9, S26, plus quiz-progress-bar minor
**Estimate:** 1–1.5 dev-days once the CTA decision (§above) is made · **Suggested PRs:** one, touching tokens + sweep

1. **Gold CTAs (S5)** — apply the chosen option everywhere white-on-gold appears (header Shop Now ×2, quiz Start/Next/Shop Now, sleep-guide CTAs, newsletter Subscribe, ReserveForm submit, SleepGuides CTA, Elmhurst "Visit the Showroom", one-sheet button, "Try in store" badge, admin gold buttons, cart count badge → navy badge or navy text).
2. **Small gold-dark text (S6)** — add a darker accent token (e.g. `--gold-text: #A85A0A`-range, verify ≥4.5:1 on both white and `#faf8f5`) and swap it into 12–14px eyebrows, CTAs-in-text, pills, "You Save" amounts. Keep `gold-dark` for ≥19px bold display uses.
3. **Gray text (S7, S8)** — codemod-style sweep: content-bearing `text-gray-400`/`text-gray-300` → `text-gray-600`; `text-gray-500` → `text-gray-600` wherever the computed size is <24px (<18.66px bold). Placeholders: `placeholder-gray-400` → `placeholder-gray-500` (on white) — placeholders still shouldn't be the only label (Phase 4 handles that).
4. **Studio palette (S9)** — `text-clay` → `text-clay-deep` for all text on paper (eyebrows, "Read the spec"); `text-navy/40–60` → `text-navy/70`+ for body/labels; StudioSpecCard price/labels to `navy/70`.
5. **Dark-section muted text (S9)** — LayerSwitcher `white/35–45` → `white/70`+; press one-sheet low-alpha labels → ≥`rgba(255,255,255,0.7)`.
6. **Focus ring on dark/gold/clay (S4)** — `app/globals.css`: `*:focus-visible { outline: 2px solid var(--sky); outline-offset: 2px; box-shadow: 0 0 0 5px rgba(255,255,255,.9); }` (white halo makes it visible on navy/gold/clay).
7. **Photo-overlay cards (S26)** — `shop/mattresses` + `home-line` supporting cards: gradient → `from-navy/95 via-navy/75 to-transparent`, extend under the text block; tier line `text-gold-dark` → `text-gold-light`.
8. **Quiz progress bar** — add `border border-gray-400` to the track or darken the fill (≥3:1 vs track).

### Phase 3 exit criteria

- [ ] Re-run the contrast calculator (script preserved in the audit workspace; re-derive from ADA-AUDIT.md §2 if needed) over the new token values — every §2.1 row now passes its threshold.
- [ ] Visual QA pass on home, PDP, studio, checkout in light of the swaps (no unreadable-on-brand regressions).
- [ ] Keyboard focus visibly rings on: navy footer links, gold CTA, Studio card links.

---

## Phase 4 — Flows, content & polish

**Fixes:** S19–S23, M1, M2 (rest), M3, M4, M7, M8, M9, M12–M19, minor groups 1–17
**Estimate:** 2–2.5 dev-days · **Suggested PRs:** three (4A flows, 4B content/structure, 4C polish sweep)

### PR 4A — Quiz, booking, newsletter, FAQ

1. **Quiz (S19, M9)** — `QuizQuestion.tsx`, `app/quiz/page.tsx`
   Radiogroup semantics on options (`role="radio" aria-checked`, group `aria-labelledby` → question h2); `aria-live` on "Question X of Y"; on step change and on result, move focus to the new heading (`tabIndex={-1}`); result heading inside `role="status"`; add a check icon to selected IconGrid cards; make Next `aria-disabled` with an sr-only hint instead of `disabled`.
2. **Booking (S20, M7)** — `ReserveForm.tsx`
   Persistent `role="status"` region that receives the confirmation text; focus the confirmation heading. Client-validate name/email; per-field error text with `aria-invalid` + `aria-describedby`; on slot conflict, extend the alert: "That time was just taken — please pick another."
3. **Newsletter (S21, S22, M8)** — `EmailCaptureForm.tsx`
   Inline variant: render the error visibly below the row (keep `role="alert"`). Replace `id={'email-'+source}` with `useId()`. Keep one persistent live region; inject success text instead of swapping the form; move focus to the success message. Add `aria-invalid`/`aria-describedby`. Drop `aria-live="polite"` from the `role="alert"` element.
4. **FAQ accordion (S23)** — `app/faq/page.tsx`
   Adopt the `LocationFAQ.tsx` pattern: conditional render of panels, `aria-expanded` + `aria-controls`/ids, `<h3>` wrapping each button, `aria-hidden` on the +/− glyph, remove the `max-h-96` cap. Give `LocationFAQ` its missing `aria-controls`/ids too (minor).

### PR 4B — Structure & navigation

5. **Mobile menu (M1)** — `Header.tsx`
   `<nav aria-label="Mobile" id>` wrapper; `aria-controls` from the toggle; heading/group semantics for "Shop / In Store / Online"; `max-h-[calc(100dvh-4rem)] overflow-y-auto`; Escape closes.
6. **Remaining titles (M2)** — layouts for `/shop-by-feel` ("Shop by Feel | Busby") and `/press/one-sheet`; retitle `/home-line` ("The Artisan Collection | Busby") — or redirect it to `/shop/mattresses` and delete the near-duplicate page (also resolves its duplicated findings); `generateMetadata` for `/admin/emails/[template]`.
7. **Heading hierarchy (M3)** — promote ProductTabs panel h3→h2 (h4→h3), StudioSpecSheet SectionHeader h3→h2 (h4→h3), guarantee h4→h2, compare product names h3→h2 (categories h4→h3), one-sheet div-headings → h2, press "As Seen In" p→h2, merge the about-page split h2, add sr-only group h2s on shop listing pages.
8. **New-tab announcements (M4)** — add a tiny `<NewTabLink>` (or sr-only "(opens in new tab)" suffix) and apply at the 12 audited `target="_blank"` sites.
9. **Landmarks & current-page (minor 5)** — `aria-current="page"` + visible active style in Header (desktop + mobile); footer columns → `<nav aria-label>`; PDP breadcrumb → `<nav aria-label="Breadcrumb"><ol>` with `aria-current` and hidden separators.

### PR 4C — Polish sweep (grouped minors + remaining moderates)

10. LayerSwitcher (M12): `aria-current` on dots, stat inside the live region, announce short label only ("Layer 3 of 5: {title}"), 24px desktop dot hit areas, `aria-hidden` watermark.
11. Tables & scroll regions (M13): StudioSpecSheet `scope="col"`/`scope="row"`, `tabIndex={0} role="region" aria-label` on its scroll wrapper and the two admin table wrappers.
12. Thanks page (M14): remove nested `<main>`; underline the mailto links.
13. Elmhurst embed (M15): move the map iframe after the content column in DOM (preserve layout with CSS `order`).
14. Alt-text pass (M16 + minor 2): fix about-page alts ("Factory team"→accurate, "Fancy interior"→descriptive, "Bedroom lifestyle"→descriptive); `alt=""` on card images whose name is adjacent text (products, home-line, compare, FitsAnyBed); concise `aria-label` on whole-card links.
15. Header address link (M17) → point at `/locations/elmhurst` (or relabel).
16. Announcement bar (M18): on dismiss, move focus to `#main`; announce "Announcement dismissed" via the Phase-2 announcer.
17. Admin (M19): `role="status"`/`role="alert"` on messages; confirm step + ≥24px "Remove" with per-email label; sr-only "Actions" `<th>`s; scale the one-sheet on-screen (`max-width:100%` wrapper; keep fixed geometry `@media print` only).
18. Remaining minors: list semantics (`<ul>/<li>` at the 10 audited spots), `aria-hidden` separators/ghost numerals/mock-quiz column/raw SVGs, cart-item duplicate link (`tabIndex={-1} aria-hidden` on image link), touch-target padding (dots, top-bar links, social icons, Clear Cart, quiz Back/Retake), warranty blank-address text, Terms Section-18 renumber, FAQ schema from shared array, studio `<ol>`, delete dead `CustomerTestimonials.tsx` + inert `animate-in` classes.

### Phase 4 exit criteria (test script)

- [ ] VoiceOver: complete the quiz start-to-result hearing every step and the recommendation; complete a booking hearing the confirmation.
- [ ] Submit a bad email in the *footer* form → visible error appears.
- [ ] FAQ: collapsed answers absent from VoiceOver rotor; no invisible tab stop inside answer 13; answers survive 200% zoom.
- [ ] Heading outline per page (browser a11y tree or axe): no skips, one h1.
- [ ] Every remaining route shows a unique tab title.

---

## Phase 5 — Verification, automation & ongoing program

**Estimate:** 0.5–1 dev-day setup, then ongoing
**Fixes regressions before they ship; closes out audit §8 Phase 5**

1. **Lint gate:** add `eslint-plugin-jsx-a11y` (`plugin:jsx-a11y/recommended`) to the ESLint config; fix or explicitly disable-with-comment anything it flags; runs in CI via existing `npm run lint`.
2. **Automated scan:** add dev-deps `@playwright/test` + `@axe-core/playwright`; one spec that boots `next dev`/`next start` and runs axe over: `/`, `/shop/mattresses`, `/products/busby-dream`, a Studio PDP, `/compare`, `/quiz`, `/cart`, `/checkout`, `/appointment`, `/faq`, `/studio`. Fail CI on serious/critical axe violations. (Also add axe checks for open cart-drawer and lightbox states.)
3. **Manual test cadence:** the phase test scripts above become the regression checklist — run the Phase 1+2 scripts on any PR touching nav, cart, PDP, or checkout; full pass quarterly. Screen-reader matrix: VoiceOver+Safari (macOS), NVDA+Chrome (Windows).
4. **Accessibility statement:** add `/accessibility` page (commitment, WCAG 2.1 AA target, known gaps if any, feedback email + phone) and link it in the footer next to Privacy/Terms. Standard ADA-mitigation practice.
5. **Re-audit checkpoint:** after Phases 1–4 merge, rerun the full audit (same method as ADA-AUDIT.md) and archive both reports; fix any residuals.
6. **Content guardrails:** alt-text required for any new product photography (no filename-derived alts); contrast-check new brand colors against §2.2 of the audit before use; new modals must use the Phase-1 `useFocusTrap`; new forms must use visible labels + `autocomplete` + `role="alert"` errors.

### Final exit criteria (conformance gate)

- [ ] axe scan: zero critical/serious violations on all scanned routes and open-dialog states.
- [ ] Keyboard-only: complete all four core journeys (browse→purchase, quiz→result, booking, newsletter) with visible focus at every step.
- [ ] VoiceOver + NVDA: same four journeys with all state changes announced.
- [ ] Contrast calculator: all pairs in ADA-AUDIT.md §2.1 remeasure at/above threshold.
- [ ] Accessibility statement live and linked.

---

## Sequencing at a glance

| Phase | Theme | Effort | Depends on | Ships as |
|---|---|---|---|---|
| 1 | Critical blockers + global keyboard/motion/links | 1.5–2 d | — (start now) | PRs 1A, 1B, 1C |
| 2 | Purchase path | 2–2.5 d | Phase 1 (`useFocusTrap`) | PRs 2A, 2B, 2C |
| 3 | Color & contrast system | 1–1.5 d | CTA decision (make during Phase 1) | 1 PR |
| 4 | Flows, content & polish | 2–2.5 d | Announcer from 2A (for 4C item 16) | PRs 4A, 4B, 4C |
| 5 | Automation & program | 0.5–1 d + ongoing | Phases 1–4 merged | 1 PR + process |

Two devs can parallelize: one takes 1A→2B→2C (nav/PDP/checkout track), the other 1B→1C→3 (widgets/globals/color track), converging on Phase 4. Solo, run the phases in order — each is independently shippable.
