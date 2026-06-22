import Link from 'next/link';
import { listReservations, listSubscribes } from '@/lib/db';
import { formatSlot } from '@/lib/slots';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const metadata = {
  title: 'Admin · Busby',
  robots: { index: false, follow: false },
};

function fmtDate(value: string | Date): string {
  return new Date(value).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function fmtDateOnly(value: string | Date | null): string {
  if (!value) return '—';
  const d = value instanceof Date ? value : new Date(value);
  return d.toISOString().slice(0, 10);
}

function fmtVisitDate(value: string | Date | null): string {
  if (!value) return '—';
  const isoDay =
    value instanceof Date ? value.toISOString().slice(0, 10) : value.slice(0, 10);
  const [y, m, d] = isoDay.split('-').map(Number);
  if (!y || !m || !d) return isoDay;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default async function AdminPage() {
  const [subs, reservs] = await Promise.all([listSubscribes(200), listReservations(200)]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex items-baseline justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-serif text-navy">Admin</h1>
            <p className="text-sm text-gray-500 mt-1">
              Latest 200 of each. Use CSV export for the full history.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/admin/emails"
              className="px-4 py-2 bg-white border border-gray-200 text-navy rounded-full text-sm font-medium hover:bg-gray-50"
            >
              Email previews
            </Link>
            <Link
              href="/admin/notifications"
              className="px-4 py-2 bg-white border border-gray-200 text-navy rounded-full text-sm font-medium hover:bg-gray-50"
            >
              Notification recipients
            </Link>
            <a
              href="/api/admin/export?type=subscribes"
              className="px-4 py-2 bg-navy text-white rounded-full text-sm font-medium hover:bg-navy/90"
            >
              Export subscribes (CSV)
            </a>
            <a
              href="/api/admin/export?type=reservations"
              className="px-4 py-2 bg-gold text-white rounded-full text-sm font-medium hover:bg-gold-dark"
            >
              Export reservations (CSV)
            </a>
          </div>
        </header>

        <section className="mb-12">
          <h2 className="text-xl font-serif text-navy mb-3">
            Subscribes <span className="text-gray-400 text-base">({subs.length})</span>
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-navy">When</th>
                  <th className="px-4 py-3 font-semibold text-navy">Email</th>
                  <th className="px-4 py-3 font-semibold text-navy">Source</th>
                  <th className="px-4 py-3 font-semibold text-navy">UTM</th>
                </tr>
              </thead>
              <tbody>
                {subs.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                      No signups yet.
                    </td>
                  </tr>
                )}
                {subs.map((s) => (
                  <tr key={s.id} className="border-b border-gray-100 last:border-0">
                    <td className="px-4 py-2.5 text-gray-600 whitespace-nowrap">
                      {fmtDate(s.created_at)}
                    </td>
                    <td className="px-4 py-2.5 font-medium text-navy">{s.email}</td>
                    <td className="px-4 py-2.5 text-gray-600">{s.source}</td>
                    <td className="px-4 py-2.5 text-gray-500 text-xs">
                      {[s.utm_source, s.utm_medium, s.utm_campaign].filter(Boolean).join(' · ') ||
                        '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-serif text-navy mb-3">
            Reservations <span className="text-gray-400 text-base">({reservs.length})</span>
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-navy">Visit</th>
                  <th className="px-4 py-3 font-semibold text-navy">Name</th>
                  <th className="px-4 py-3 font-semibold text-navy">Contact</th>
                  <th className="px-4 py-3 font-semibold text-navy">Mattresses</th>
                  <th className="px-4 py-3 font-semibold text-navy">Notes</th>
                  <th className="px-4 py-3 font-semibold text-navy">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {reservs.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                      No reservations yet.
                    </td>
                  </tr>
                )}
                {reservs.map((r) => (
                  <tr key={r.id} className="border-b border-gray-100 last:border-0 align-top">
                    <td className="px-4 py-2.5 text-navy whitespace-nowrap">
                      <div className="font-medium">{fmtVisitDate(r.preferred_date)}</div>
                      {r.time_slot && (
                        <div className="text-xs text-gray-500 mt-0.5">{formatSlot(r.time_slot)}</div>
                      )}
                    </td>
                    <td className="px-4 py-2.5 font-medium text-navy">{r.name}</td>
                    <td className="px-4 py-2.5 text-gray-600">
                      <div>{r.email}</div>
                      {r.phone && <div className="text-xs text-gray-400">{r.phone}</div>}
                    </td>
                    <td className="px-4 py-2.5 text-gray-600">
                      {r.mattresses.length ? r.mattresses.join(', ') : '—'}
                    </td>
                    <td className="px-4 py-2.5 text-gray-500 text-xs max-w-xs">
                      {r.notes || '—'}
                    </td>
                    <td className="px-4 py-2.5 text-gray-400 text-xs whitespace-nowrap">
                      {fmtDate(r.created_at)}
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
