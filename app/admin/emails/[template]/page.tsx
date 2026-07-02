import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EMAIL_TEMPLATES } from '../registry';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PageProps {
  params: Promise<{ template: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { template } = await params;
  const meta = EMAIL_TEMPLATES[template];
  return {
    title: meta ? `${meta.title} · Email preview · Busby` : 'Email preview · Admin · Busby',
    robots: { index: false, follow: false },
  };
}

export default async function EmailPreviewDetailPage({ params }: PageProps) {
  const { template } = await params;
  const meta = EMAIL_TEMPLATES[template];
  if (!meta) notFound();

  const { subject, html } = meta.render();

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 flex items-baseline justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-serif text-navy">{meta.title}</h1>
            <p className="text-sm text-gray-600 mt-1">{meta.description}</p>
          </div>
          <Link
            href="/admin/emails"
            className="px-4 py-2 bg-white border border-gray-200 text-navy rounded-full text-sm font-medium hover:bg-gray-50"
          >
            ← All templates
          </Link>
        </header>

        <section className="mb-4 bg-white rounded-xl border border-gray-200 p-4 text-sm">
          <dl className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <dt className="text-xs uppercase tracking-wider text-gray-600 font-semibold">Subject</dt>
              <dd className="text-navy mt-1">{subject}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-gray-600 font-semibold">Recipient</dt>
              <dd className="text-navy mt-1">{meta.recipient}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-gray-600 font-semibold">Trigger</dt>
              <dd className="text-navy mt-1">{meta.trigger}</dd>
            </div>
          </dl>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <iframe
            title={`${meta.title} preview`}
            srcDoc={html}
            sandbox="allow-same-origin"
            className="w-full block"
            style={{ minHeight: '900px', border: 0 }}
          />
        </section>
      </div>
    </div>
  );
}
