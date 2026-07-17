import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Automated WCAG 2.1 A/AA scan (axe-core) over the public routes plus the
 * interactive dialog states. Fails on critical/serious violations only —
 * moderate/minor findings are surfaced during manual review cadences
 * (see ADA-REMEDIATION-PLAN.md, Phase 5).
 *
 * Run with: npm run build && npm run test:a11y
 */

const ROUTES = [
  '/',
  '/shop/mattresses',
  '/shop/sleep-accessories',
  '/shop-by-feel',
  '/studio',
  '/products',
  '/products/dream',
  '/products/studio-hybrid',
  '/compare',
  '/quiz',
  '/cart',
  '/checkout',
  '/appointment',
  '/appointment/confirmed?date=2026-07-24&slot=14:30',
  '/faq',
  '/about',
  '/locations',
  '/locations/elmhurst',
  '/press',
  '/sleep-guide',
  '/warranty',
  '/terms',
  '/privacy-policy',
];

const SEVERE_IMPACTS = new Set(['critical', 'serious']);

async function severeViolations(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  return results.violations.filter((v) => SEVERE_IMPACTS.has(v.impact ?? ''));
}

function report(violations: Awaited<ReturnType<typeof severeViolations>>) {
  return JSON.stringify(
    violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      help: v.help,
      nodes: v.nodes.slice(0, 5).map((n) => n.html),
    })),
    null,
    2
  );
}

for (const route of ROUTES) {
  test(`axe: ${route}`, async ({ page }) => {
    await page.goto(route);
    const violations = await severeViolations(page);
    expect(violations, report(violations)).toEqual([]);
  });
}

test('axe: cart drawer open', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /shopping cart/i }).first().click();
  await page.getByRole('dialog', { name: /your cart/i }).waitFor();
  const violations = await severeViolations(page);
  expect(violations, report(violations)).toEqual([]);
});

test('axe: PDP image lightbox open', async ({ page }) => {
  await page.goto('/products/dream');
  const zoom = page.getByRole('button', { name: /view larger image/i });
  test.skip((await zoom.count()) === 0, 'Product has no gallery images yet');
  await zoom.click();
  await page.getByRole('dialog').waitFor();
  const violations = await severeViolations(page);
  expect(violations, report(violations)).toEqual([]);
});

test('axe: mobile menu open', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Menu' }).click();
  await page.getByRole('navigation', { name: 'Mobile' }).waitFor();
  const violations = await severeViolations(page);
  expect(violations, report(violations)).toEqual([]);
});
