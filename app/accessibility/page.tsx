import Link from 'next/link';

export const metadata = {
  title: 'Accessibility Statement | Busby',
  description:
    'Busby is committed to making mybusby.com accessible to everyone, including people who use assistive technology.',
  alternates: { canonical: '/accessibility' },
};

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        <h1 className="text-3xl md:text-4xl font-serif text-navy mb-8">
          Accessibility Statement
        </h1>

        <section className="mb-8">
          <p className="text-gray-700 leading-relaxed mb-4">
            Busby is committed to making our website accessible to everyone — including
            people who use screen readers, keyboard navigation, voice control, magnification,
            or other assistive technology. Better sleep is for every body, and so is our site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-navy mb-3">Our standard</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We aim to conform to the{' '}
            <a
              href="https://www.w3.org/TR/WCAG21/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy underline hover:text-gold-dark transition-colors"
            >
              Web Content Accessibility Guidelines (WCAG) 2.1, Level AA
              <span className="sr-only"> (opens in new tab)</span>
            </a>
            . These guidelines explain how to make web content more accessible to people
            with a wide range of disabilities.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-navy mb-3">What we do</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
            <li>Every page is designed to be operable with a keyboard alone.</li>
            <li>
              Interactive components — menus, dialogs, forms, galleries — expose their
              names, roles, and states to assistive technology.
            </li>
            <li>Text and interface colors are checked against WCAG contrast minimums.</li>
            <li>We respect your system&apos;s reduced-motion preference.</li>
            <li>
              Automated accessibility checks run on every code change, and we review the
              site with screen readers as part of our release process.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-navy mb-3">
            Tell us if something isn&apos;t working
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Accessibility is an ongoing effort, and we know we may not get everything right.
            If you have trouble using any part of this site, or you&apos;d like information
            in a different format, we want to hear about it — and we&apos;ll respond within
            two business days.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>
              Email:{' '}
              <a
                href="mailto:support@mybusby.com"
                className="text-navy underline hover:text-gold-dark transition-colors"
              >
                support@mybusby.com
              </a>
            </li>
            <li>
              Phone:{' '}
              <a
                href="tel:+18448861640"
                className="text-navy underline hover:text-gold-dark transition-colors"
              >
                (844) 886-1640
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-navy mb-3">Prefer to shop in person?</h2>
          <p className="text-gray-700 leading-relaxed">
            Our Elmhurst showroom is open 24/7, and our team is happy to help by phone or to{' '}
            <Link
              href="/appointment"
              className="text-navy underline hover:text-gold-dark transition-colors"
            >
              schedule a one-on-one sleep consultation
            </Link>
            .
          </p>
        </section>

        <p className="text-sm text-gray-600">This statement was last updated on July 1, 2026.</p>
      </div>
    </div>
  );
}
