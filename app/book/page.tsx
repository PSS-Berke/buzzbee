import Link from 'next/link';
import {
  Mic,
  Clock,
  Video,
  Calendar,
  Mail,
  Phone,
  Linkedin,
  ArrowLeft,
  CheckCircle,
  Globe,
} from 'lucide-react';

export const metadata = {
  title: 'Book Robert as a Guest | Sleep6 & Busby',
  description:
    'Schedule a podcast interview with Robert Taglianetti — 25+ year sleep industry expert, founder of Sleep6 & Busby. Pick a time that works for you.',
  alternates: { canonical: '/book' },
};

const formats = [
  {
    icon: Mic,
    title: 'Podcast Interview',
    duration: '30–60 min',
    description: 'In-depth conversation on sleep, manufacturing, entrepreneurship, or consumer advocacy.',
  },
  {
    icon: Video,
    title: 'Video Podcast / Zoom',
    duration: '30–60 min',
    description: 'Camera-ready for video formats. Robert records from a quiet, professional setup.',
  },
  {
    icon: Globe,
    title: 'Pre-Interview Call',
    duration: '15 min',
    description: 'Quick alignment call before recording. Confirm topics, format, and logistics.',
  },
];

const whatToExpect = [
  'Confirmation email with Google Meet link within 24 hours',
  'Robert will review your show before the call',
  'Talking points and bio sent ahead of time',
  'Flexible reschedule policy — life happens',
];

export default function BookPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] linen-texture relative">
      {/* Warm ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(255, 220, 180, 0.4) 0%, rgba(255, 200, 150, 0.2) 30%, transparent 60%)',
        }}
      />

      <div className="relative z-10">

        {/* ── Hero ── */}
        <section className="bg-navy relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gold/10 blob-shape blur-3xl -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[200px] h-[200px] md:w-[350px] md:h-[350px] bg-white/5 blob-shape-alt blur-3xl translate-y-1/3 -translate-x-1/4" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/press"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-gold text-sm mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Press Kit
            </Link>

            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-4 py-2 text-sm text-gold mb-6">
                <Calendar className="w-4 h-4" />
                <span>Schedule a Recording</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-serif leading-tight text-white mb-4">
                Book Robert as{' '}
                <span className="text-gold">a Guest</span>
              </h1>

              <p className="text-lg text-gray-400 leading-relaxed">
                Pick a time below and we will confirm your slot with a Google Meet link.
                Robert is available for podcast interviews, video shows, and pre-interview calls.
              </p>
            </div>
          </div>
        </section>

        {/* ── Booking Embed ── */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12 items-start">

              {/* Left: context */}
              <div className="lg:col-span-1 space-y-8">
                {/* Format options */}
                <div>
                  <h2 className="text-xl font-serif text-navy mb-5">What Robert Offers</h2>
                  <div className="space-y-4">
                    {formats.map((f) => {
                      const Icon = f.icon;
                      return (
                        <div
                          key={f.title}
                          className="flex gap-4 border-2 border-gold/20 rounded-2xl p-5 bg-white shadow-sm shadow-gold/5"
                        >
                          <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-gold" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-navy text-sm">{f.title}</p>
                              <span className="flex items-center gap-1 text-xs text-gray-400">
                                <Clock className="w-3 h-3" />
                                {f.duration}
                              </span>
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* What to expect */}
                <div className="border-2 border-gold/20 rounded-2xl p-6 bg-white shadow-sm shadow-gold/5">
                  <h3 className="font-semibold text-navy mb-4">What to Expect</h3>
                  <ul className="space-y-3">
                    {whatToExpect.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct contact fallback */}
                <div className="border-2 border-gold/20 rounded-2xl p-6 bg-white shadow-sm shadow-gold/5">
                  <h3 className="font-semibold text-navy mb-4">Prefer to Reach Out Directly?</h3>
                  <div className="space-y-3">
                    <a
                      href="mailto:press@mybusby.com"
                      className="flex items-center gap-3 text-sm text-gray-600 hover:text-navy transition-colors"
                    >
                      <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                      press@mybusby.com
                    </a>
                    <a
                      href="tel:18448861640"
                      className="flex items-center gap-3 text-sm text-gray-600 hover:text-navy transition-colors"
                    >
                      <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                      (844) 886-1640
                    </a>
                    <a
                      href="https://linkedin.com/in/robert-taglianetti-25499795"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-gray-600 hover:text-navy transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-gold flex-shrink-0" />
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>

              {/* Right: Google booking embed */}
              <div className="lg:col-span-2">
                <div className="border-2 border-gold/20 rounded-3xl overflow-hidden bg-white shadow-xl shadow-gold/10">
                  {/* Placeholder — replace src with Google Booking link */}
                  <div className="bg-gold/5 border-b-2 border-gold/20 px-6 py-4 flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gold-dark" />
                    <p className="font-semibold text-navy">Select a Time</p>
                  </div>

                  {/* TODO: Replace this placeholder div with an <iframe> once Google Booking link is available.
                      Example:
                      <iframe
                        src="YOUR_GOOGLE_BOOKING_URL"
                        width="100%"
                        height="600"
                        frameBorder="0"
                        title="Book Robert Taglianetti"
                      />
                  */}
                  <div className="flex flex-col items-center justify-center py-24 px-8 text-center">
                    <div className="w-16 h-16 bg-gold/15 rounded-2xl flex items-center justify-center mb-5">
                      <Calendar className="w-8 h-8 text-gold-dark" />
                    </div>
                    <h3 className="text-xl font-serif text-navy mb-3">Booking Calendar Coming Soon</h3>
                    <p className="text-gray-500 max-w-sm leading-relaxed mb-6">
                      The scheduling calendar will appear here once set up. In the meantime,
                      reach out directly and we will find a time that works.
                    </p>
                    <a
                      href="mailto:press@mybusby.com"
                      className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale-105"
                    >
                      <Mail className="w-5 h-5" />
                      Email to Book
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
