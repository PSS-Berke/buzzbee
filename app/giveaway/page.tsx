import type { Metadata } from 'next';
import Link from 'next/link';
import { Gift, CalendarCheck, Instagram, MessageCircle, Users } from 'lucide-react';
import { SITE_URL } from '@/lib/site';
import { elmhurstStore, formatAddress } from '@/data/store';
import { getGiveawayStatus, formatDeadline, formatDay, type Giveaway } from '@/data/giveaways';

export const metadata: Metadata = {
  title: 'Mattress Giveaway | Busby Mattress, Elmhurst IL',
  description:
    'Win a Busby mattress. Follow @My_Busby on Instagram, answer the monthly sleep question, and tag 2 friends to enter. Official rules inside.',
  alternates: { canonical: '/giveaway' },
  openGraph: {
    title: 'Win a Busby Mattress',
    description: 'Follow @My_Busby, answer the sleep question, tag 2 friends. Official rules inside.',
    url: `${SITE_URL}/giveaway`,
    type: 'website',
  },
};

// Re-render hourly so the page flips between live / winner / coming-soon on its own.
export const revalidate = 3600;

const INSTAGRAM_URL = 'https://www.instagram.com/my_busby';

function OfficialRules({ giveaway }: { giveaway: Giveaway }) {
  return (
    <section aria-labelledby="rules-heading" className="mt-10">
      <h2 id="rules-heading" className="font-heading text-lg font-bold text-navy">Official rules</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        No purchase necessary. Must be 18+ and a U.S. resident. One entry per person. Follow @My_Busby, answer the
        question, and tag 2 friends to enter. Giveaway ends {formatDeadline(giveaway.endsAt)}. Winner selected at
        random and announced {giveaway.announceDate}. Not sponsored, endorsed, or administered by Instagram, Facebook,
        or Meta. Sponsored by LR3 Logistics DBA Busby, {formatAddress(elmhurstStore.address)}.
      </p>
    </section>
  );
}

function LiveGiveaway({ giveaway }: { giveaway: Giveaway }) {
  const steps = [
    {
      icon: Instagram,
      title: 'Follow @My_Busby',
      body: (
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy underline">
          Open our Instagram<span className="sr-only"> (opens in new tab)</span>
        </a>
      ),
    },
    { icon: MessageCircle, title: 'Answer the sleep question', body: 'Leave your answer in the comments on our giveaway post.' },
    { icon: Users, title: 'Tag 2 friends', body: 'In the same comment, or a new one.' },
  ];

  return (
    <>
      <p className="font-heading text-sm font-semibold uppercase tracking-widest text-gold-dark">
        {giveaway.month} giveaway · {formatDay(giveaway.startsAt)} to {formatDay(giveaway.endsAt)}
      </p>
      <h1 className="mt-2 font-heading text-3xl font-bold text-navy sm:text-4xl">Win {giveaway.prize}</h1>
      <p className="mt-3 text-lg text-gray-700">
        Enter by {formatDeadline(giveaway.endsAt)}. Winner announced {giveaway.announceDate}.
      </p>

      <div className="mt-8 rounded-2xl bg-navy p-6 text-white">
        <p className="font-heading text-sm font-semibold uppercase tracking-widest text-gold">
          This month&apos;s sleep question
        </p>
        <p className="mt-2 text-xl font-semibold">{giveaway.question}</p>
      </div>

      <section aria-labelledby="enter-heading" className="mt-10">
        <h2 id="enter-heading" className="font-heading text-lg font-bold text-navy">How to enter</h2>
        <ol className="mt-4 space-y-3">
          {steps.map(({ icon: Icon, title, body }, i) => (
            <li key={title} className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-gray-200">
              <Icon className="mt-0.5 h-6 w-6 flex-shrink-0 text-gold-dark" aria-hidden="true" />
              <div>
                <p className="font-semibold text-navy">
                  <span className="sr-only">Step {i + 1}: </span>
                  {title}
                </p>
                <p className="mt-1 text-gray-600">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <OfficialRules giveaway={giveaway} />
    </>
  );
}

export default function GiveawayPage() {
  const status = getGiveawayStatus();

  return (
    <div className="min-h-screen bg-[#faf8f5] px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-2xl">
        {status.state === 'live' ? (
          <LiveGiveaway giveaway={status.giveaway} />
        ) : (
          <>
            <Gift className="h-10 w-10 text-gold-dark" aria-hidden="true" />
            <h1 className="mt-4 font-heading text-3xl font-bold text-navy sm:text-4xl">
              {status.state === 'upcoming' ? `Our ${status.giveaway.month} giveaway starts soon` : 'Our next giveaway is coming soon'}
            </h1>
            {(status.state === 'upcoming' || status.state === 'ended') && status.last && (
              <p className="mt-4 text-lg text-gray-700">
                {status.last.winner
                  ? <>Congratulations to <span className="font-semibold text-navy">@{status.last.winner}</span>, winner of our {status.last.month} giveaway!</>
                  : <>Our {status.last.month} giveaway has closed. The winner is announced {status.last.announceDate} on Instagram.</>}
              </p>
            )}
            <p className="mt-4 text-gray-700">
              {status.state === 'upcoming'
                ? `Entries open ${formatDay(status.giveaway.startsAt)}. `
                : ''}
              Follow{' '}
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy underline">
                @My_Busby<span className="sr-only"> (opens in new tab)</span>
              </a>{' '}
              so you don&apos;t miss it.
            </p>
            {status.state === 'ended' && <OfficialRules giveaway={status.last} />}
          </>
        )}

        <div className="mt-12 rounded-2xl bg-white p-6 ring-1 ring-gray-200">
          <p className="font-semibold text-navy">Can&apos;t wait to try one?</p>
          <p className="mt-1 text-gray-600">Book a free private visit to our Elmhurst showroom and try every Busby mattress.</p>
          <Link
            href="/appointment"
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-navy px-6 py-3 font-semibold text-white hover:bg-navy-dark"
          >
            <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            Book an appointment
          </Link>
        </div>
      </div>
    </div>
  );
}
