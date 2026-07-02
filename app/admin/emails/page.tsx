import Link from 'next/link';
import { EMAIL_TEMPLATES } from './registry';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const metadata = {
  title: 'Email previews · Admin · Busby',
  robots: { index: false, follow: false },
};

export default function EmailPreviewsIndexPage() {
  const entries = Object.entries(EMAIL_TEMPLATES);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex items-baseline justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-serif text-navy">Email previews</h1>
            <p className="text-sm text-gray-600 mt-1">
              Rendered with sample data. The actual sends use real payloads.
            </p>
          </div>
          <Link
            href="/admin"
            className="px-4 py-2 bg-white border border-gray-200 text-navy rounded-full text-sm font-medium hover:bg-gray-50"
          >
            ← Back to admin
          </Link>
        </header>

        <section>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-navy">Template</th>
                  <th className="px-4 py-3 font-semibold text-navy">Recipient</th>
                  <th className="px-4 py-3 font-semibold text-navy">Trigger</th>
                  <th className="px-4 py-3 font-semibold text-navy w-32"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {entries.map(([key, meta]) => (
                  <tr key={key} className="border-b border-gray-100 last:border-0 align-top">
                    <td className="px-4 py-3">
                      <div className="font-medium text-navy">{meta.title}</div>
                      <div className="text-xs text-gray-600 mt-1 max-w-md">
                        {meta.description}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{meta.recipient}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{meta.trigger}</td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/emails/${key}`}
                        className="px-3 py-1.5 bg-navy text-white rounded-full text-xs font-medium hover:bg-navy/90"
                      >
                        View preview
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
