import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  addNotificationRecipient,
  listNotificationRecipients,
  removeNotificationRecipient,
} from '@/lib/db';
import { isValidEmail } from '@/lib/submissions';
import { env } from '@/lib/env';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const metadata = {
  title: 'Notification recipients · Busby Admin',
  robots: { index: false, follow: false },
};

const PATH = '/admin/notifications';

async function addRecipient(formData: FormData) {
  'use server';
  const email = formData.get('email')?.toString().trim().toLowerCase() ?? '';
  const label = formData.get('label')?.toString().trim() || null;
  if (!email || !isValidEmail(email)) {
    redirect(`${PATH}?error=email`);
  }
  await addNotificationRecipient(email, label);
  revalidatePath(PATH);
  redirect(`${PATH}?ok=added`);
}

async function removeRecipient(formData: FormData) {
  'use server';
  const id = Number(formData.get('id'));
  if (Number.isInteger(id) && id > 0) {
    await removeNotificationRecipient(id);
  }
  revalidatePath(PATH);
  redirect(`${PATH}?ok=removed`);
}

function envFallbackRecipients(): string[] {
  try {
    return env.RESERVATIONS_INBOX_EMAIL.split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

function fmtDate(value: string | Date): string {
  return new Date(value).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
}

export default async function NotificationsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; ok?: string }>;
}) {
  const { error, ok } = await searchParams;
  const recipients = await listNotificationRecipients();
  const fallback = envFallbackRecipients();
  const usingFallback = recipients.length === 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 flex items-baseline justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-serif text-navy">Notification recipients</h1>
            <p className="text-sm text-gray-600 mt-1">
              Who gets an email every time someone books a showroom visit.
            </p>
          </div>
          <a
            href="/admin"
            className="px-4 py-2 bg-white border border-gray-200 text-navy rounded-full text-sm font-medium hover:bg-gray-50"
          >
            ← Back to admin
          </a>
        </header>

        {ok === 'added' && (
          <p role="status" className="mb-5 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl p-3">
            Recipient added.
          </p>
        )}
        {ok === 'removed' && (
          <p role="status" className="mb-5 text-sm text-gray-600 bg-white border border-gray-200 rounded-xl p-3">
            Recipient removed.
          </p>
        )}
        {error === 'email' && (
          <p role="alert" className="mb-5 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl p-3">
            That doesn’t look like a valid email address.
          </p>
        )}

        {usingFallback && (
          <div className="mb-6 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="font-medium">No custom recipients yet.</p>
            <p className="mt-1 leading-relaxed">
              Booking alerts currently go to the default{' '}
              <code className="text-xs bg-amber-100 px-1.5 py-0.5 rounded">RESERVATIONS_INBOX_EMAIL</code>{' '}
              setting:{' '}
              <strong>{fallback.length ? fallback.join(', ') : '(not configured)'}</strong>. Add an
              address below and this managed list takes over.
            </p>
          </div>
        )}

        <form
          action={addRecipient}
          className="bg-white rounded-xl border border-gray-200 p-5 mb-8 flex flex-col sm:flex-row gap-3 sm:items-end"
        >
          <label className="block flex-1">
            <span className="block text-sm font-medium text-navy mb-1.5">Email</span>
            <input
              name="email"
              type="email"
              required
              placeholder="name@mybusby.com"
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-gold"
            />
          </label>
          <label className="block flex-1">
            <span className="block text-sm font-medium text-navy mb-1.5">
              Label <span className="text-gray-600 font-normal">(optional)</span>
            </span>
            <input
              name="label"
              type="text"
              placeholder="e.g. Front desk"
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-gold"
            />
          </label>
          <button
            type="submit"
            className="px-6 py-2.5 bg-gold hover:bg-gold-light text-navy font-semibold rounded-lg transition-colors whitespace-nowrap"
          >
            Add recipient
          </button>
        </form>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold text-navy">Email</th>
                <th className="px-4 py-3 font-semibold text-navy">Label</th>
                <th className="px-4 py-3 font-semibold text-navy">Added</th>
                <th className="px-4 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {recipients.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-gray-600">
                    No managed recipients yet.
                  </td>
                </tr>
              )}
              {recipients.map((r) => (
                <tr key={r.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-2.5 font-medium text-navy">{r.email}</td>
                  <td className="px-4 py-2.5 text-gray-600">{r.label || '—'}</td>
                  <td className="px-4 py-2.5 text-gray-600 text-xs whitespace-nowrap">
                    {fmtDate(r.created_at)}
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <form action={removeRecipient}>
                      <input type="hidden" name="id" value={r.id} />
                      <button
                        type="submit"
                        aria-label={`Remove ${r.email} from notification recipients`}
                        className="px-2 py-1.5 text-xs text-red-600 hover:text-red-700 hover:underline"
                      >
                        Remove
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
