import { Video, PackageCheck, ShieldCheck, Ruler, MessageSquare, Truck } from 'lucide-react';
import VirtualConsultForm from '@/components/virtual/VirtualConsultForm';

// The national counterpart to /book-a-fitting. Deliberately carries NO showroom
// framing: this page has to work for someone in Denver, so the offer is the
// conversation and the shipping, not the address. See lib/consult.ts.

const steps = [
  {
    n: '1',
    title: 'Pick your time',
    body: 'Every slot is shown in your own timezone. You get a confirmation and a calendar invite straight away.',
    icon: MessageSquare,
  },
  {
    n: '2',
    title: 'Fifteen minutes on video',
    body: 'We walk the floor with you, hold the beds up to the camera, and answer what you actually asked.',
    icon: Video,
  },
  {
    n: '3',
    title: 'Sleep on it',
    body: 'No pressure on the call. If you order, it ships to your door and you have 100 nights to change your mind.',
    icon: PackageCheck,
  },
];

const reasons = [
  {
    title: 'A person, not a chat widget',
    body: 'You are talking to the people who have the beds in front of them, not a script and not a bot.',
    icon: MessageSquare,
  },
  {
    title: 'See the actual construction',
    body: 'Cutaways, coil counts, quilting, how the layers stack. The things a product page flattens into a bullet.',
    icon: Ruler,
  },
  {
    title: 'Made in Wisconsin',
    body: 'Built in the Midwest, not imported. Ten-year warranty on every mattress.',
    icon: ShieldCheck,
  },
  {
    title: 'Ships anywhere in the country',
    body: 'You do not need to live near a showroom to buy a bed from people who can explain it.',
    icon: Truck,
  },
];

export default function VirtualConsultationPage() {
  return (
    <div className="bg-[#faf8f5]">
      {/* ── Hero: offer left, form right, both above the fold ── */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(255,220,180,0.35) 0%, rgba(255,200,150,0.15) 35%, transparent 65%)',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 md:pt-20 md:pb-20 grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[auto_1fr] gap-6 lg:gap-x-14 lg:gap-y-8 items-start">
          {/* Headline. First on every screen size. */}
          <div className="lg:col-start-1 lg:row-start-1">
            <span className="inline-flex items-center gap-2 rounded-full bg-navy/[0.06] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-navy">
              <Video className="w-3.5 h-3.5 text-gold-dark" aria-hidden="true" />
              Free video consultation
            </span>

            <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-serif leading-tight text-navy">
              Buying a mattress online is guessing. Talk to someone first.
            </h1>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-600">
              Fifteen minutes on video with the people who sell these beds every day. Tell us how
              you sleep and what has not worked. We will show you the mattresses up close and tell
              you which one we would actually put you on, including when the answer is the cheaper
              one.
            </p>
          </div>

          {/* How it works. Below the form on a phone — it explains the ask, so it
              belongs after it rather than in front of it. */}
          <div className="lg:col-start-1 lg:row-start-2 order-last lg:order-none">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {steps.map((s) => (
                <div key={s.n} className="rounded-2xl border-2 border-gold/15 bg-white p-5">
                  <s.icon className="w-5 h-5 text-gold-dark" aria-hidden="true" />
                  <p className="mt-3 text-sm font-semibold text-navy">{s.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* The form. Second on a phone, right-hand column on desktop. */}
          <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-24">
            <VirtualConsultForm />
          </div>
        </div>
      </section>

      {/* ── Why bother ── */}
      <section className="border-t border-gold/15 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-serif text-navy">
            What you get that a product page cannot give you
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {reasons.map((r) => (
              <div key={r.title} className="rounded-2xl border-2 border-gold/15 bg-white p-6">
                <r.icon className="w-5 h-5 text-gold-dark" aria-hidden="true" />
                <p className="mt-3 font-semibold text-navy">{r.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Local footnote: the showroom exists, it just is not the pitch here ── */}
      <section className="border-t border-gold/15 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 leading-relaxed">
            Near Chicago? You can skip the call and lie on every bed instead.{' '}
            <a
              href="/book-a-fitting"
              className="text-gold-dark underline underline-offset-2 hover:text-navy transition-colors"
            >
              Book a free fitting at the Elmhurst showroom
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
