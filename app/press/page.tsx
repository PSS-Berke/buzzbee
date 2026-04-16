import Link from 'next/link';
import { SITE_URL } from '@/lib/site';
import {
  ArrowRight,
  Mail,
  Phone,
  Download,
  Mic,
  BookOpen,
  Factory,
  ShoppingCart,
  MapPin,
  TrendingUp,
  Users,
  AlertCircle,
  Home,
  BarChart2,
  Heart,
  Briefcase,
  Flag,
  Star,
  FileText,
  Image as ImageIcon,
  Linkedin,
} from 'lucide-react';

export const metadata = {
  title: 'Press Kit | Robert Taglianetti – Sleep6 & Busby',
  description:
    'Book Robert Taglianetti as a podcast guest. 25+ years in the sleep industry. Founder of Sleep6 & Busby. Topics: mattress science, Made in USA, sleep wellness.',
  alternates: { canonical: '/press' },
  openGraph: {
    title: 'Robert Taglianetti – Podcast Press Kit',
    description:
      'Sleep industry expert. 25+ years. Founder of Sleep6 & Busby. Book as a guest.',
    url: `${SITE_URL}/press`,
  },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Robert Taglianetti',
  jobTitle: 'Founder & Operator',
  worksFor: [
    { '@type': 'Organization', name: 'Sleep6' },
    { '@type': 'Organization', name: 'Busby' },
  ],
  url: `${SITE_URL}/press`,
  sameAs: [
    'https://linkedin.com/in/robert-taglianetti-25499795',
    'https://instagram.com/sleep6_',
  ],
};

const topics = [
  {
    icon: BookOpen,
    title: 'Mattress Science',
    description: 'How foam layers, support systems, and materials actually affect sleep quality.',
  },
  {
    icon: Heart,
    title: 'Sleep Wellness',
    description: 'The connection between quality sleep and physical recovery, mental clarity, and daily performance.',
  },
  {
    icon: Flag,
    title: 'Made in USA Manufacturing',
    description: 'What it really takes to keep production domestic — and why it matters for the consumer.',
  },
  {
    icon: ShoppingCart,
    title: 'Supply Chain & Retail',
    description: 'Navigating the complexity of mattress distribution from factory floor to front door.',
  },
  {
    icon: MapPin,
    title: 'Chicago Entrepreneurship',
    description: 'Building and scaling a manufacturing business in the heart of the Midwest.',
  },
  {
    icon: BarChart2,
    title: 'Apt. Partnership',
    description: 'The inside story of landing a major retail partnership and what it demands of a small manufacturer.',
  },
  {
    icon: AlertCircle,
    title: 'Consumer Buying Mistakes',
    description: 'The top mistakes shoppers make when buying a mattress — and how to avoid them.',
  },
  {
    icon: Factory,
    title: 'Factory-Direct Model',
    description: 'How cutting out the middleman changes pricing, quality, and the customer relationship.',
  },
  {
    icon: Users,
    title: 'Family Business & Legacy',
    description: 'Growing a generational business and the values that guide decision-making.',
  },
  {
    icon: TrendingUp,
    title: 'Sleep Industry Trends',
    description: 'Where the $16 billion sleep industry is heading — from DTC disruption to wellness tech.',
  },
];

const angles = [
  {
    icon: Briefcase,
    title: 'The Business Story',
    description:
      'From factory floor to national retail: how Robert built Sleep6 and Busby into a recognized brand, scored an Apt. partnership, and kept it all Made in USA.',
  },
  {
    icon: Heart,
    title: 'Health & Wellness',
    description:
      'Robert breaks down the science of sleep — what your mattress is actually doing to your body and why most people are sleeping on the wrong one.',
  },
  {
    icon: MapPin,
    title: 'Chicago Made',
    description:
      'A proud Chicago entrepreneur who manufactures locally, hires locally, and proves that American-made can still compete in a global market.',
  },
  {
    icon: Users,
    title: 'Consumer Advocacy',
    description:
      'After 25+ years in the industry, Robert knows every trick in the mattress sales playbook — and he is here to help consumers cut through the noise.',
  },
];

const sampleQuestions = [
  'You have been in the sleep industry for over 25 years — what is the biggest change you have seen in how people think about mattresses?',
  'Most people spend a third of their life in bed. Why do you think so few take the time to really research their mattress?',
  'Walk us through what actually goes into building a quality mattress — what should consumers be paying attention to that they typically ignore?',
  'You manufacture in the USA at a time when most competitors have gone overseas. How do you make that work economically?',
  'Tell us about landing the Apt. partnership. What did that process look like for a smaller manufacturer?',
  'What are the top three mistakes people make when buying a mattress?',
  'There is a huge price range in the mattress market — from a few hundred dollars to tens of thousands. How should a consumer think about value?',
  'Sleep technology is everywhere now — smart beds, sleep trackers, weighted blankets. How much of it actually moves the needle?',
  'You founded both Sleep6 and Busby. What is the difference between the two brands and who are they each for?',
  'If someone is waking up with back pain every morning, where do you tell them to start?',
];

const quickFacts = [
  { value: '25+', label: 'Years in the Industry' },
  { value: 'Chicago', label: 'Headquarters & Factory' },
  { value: '100%', label: 'USA-Made Materials' },
  { value: 'Apt.', label: 'National Retail Partner' },
  { value: '2', label: 'Brands: Sleep6 & Busby' },
  { value: '10yr', label: 'Product Warranty' },
];

const pressLogos = [
  { name: 'Built In Chicago', href: '#' },
  { name: 'InsideHook', href: '#' },
  { name: 'BedTimes Magazine', href: '#' },
  { name: 'PR Newswire', href: '#' },
];

const downloads = [
  { icon: FileText, label: 'One-Sheet (PDF)', file: '/press/one-sheet', newTab: true },
  { icon: FileText, label: 'Full Press Kit (PDF)', file: '/press/Robert_Taglianetti_Press_Kit.pdf', newTab: false },
  { icon: ImageIcon, label: 'High-Res Headshot (JPG)', file: '/press/robert-headshot.jpg', newTab: false },
  { icon: ImageIcon, label: 'Brand Logos (ZIP)', file: '/press/brand-logos.zip', newTab: false },
];

export default function PressPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

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

          {/* ── Section 1: Hero ── */}
          <section className="bg-navy relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gold/10 blob-shape blur-3xl -translate-y-1/3 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] md:w-[350px] md:h-[350px] bg-white/5 blob-shape-alt blur-3xl translate-y-1/3 -translate-x-1/4" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-4 py-2 text-sm text-gold mb-8">
                  <Mic className="w-4 h-4" />
                  <span>Podcast Guest &nbsp;·&nbsp; Sleep Industry Expert</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-white mb-4">
                  Robert{' '}
                  <span className="wavy-underline text-gold">Taglianetti</span>
                </h1>

                <p className="text-xl text-gray-300 mb-4 font-light">
                  Founder of Sleep6 & Busby &nbsp;|&nbsp; Chicago, IL
                </p>

                <p className="text-lg text-gray-400 max-w-2xl leading-relaxed mb-10">
                  25+ years building mattress brands from the factory floor up. Robert speaks on
                  sleep science, Made-in-USA manufacturing, retail partnerships, and what consumers
                  are getting wrong about the product they spend a third of their life on.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/book"
                    className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale-105"
                  >
                    <Mic className="w-5 h-5" />
                    Book Robert as a Guest
                  </Link>
                  <a
                    href="/press/one-sheet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-gold text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale-105"
                  >
                    <Download className="w-5 h-5" />
                    Download One-Sheet
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ── Section 2: Bio ── */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-3 gap-12 items-start">
                {/* Bio text */}
                <div className="lg:col-span-2">
                  <span className="inline-block bg-gold/15 text-gold-dark font-semibold px-4 py-1 rounded-full text-sm mb-6">
                    About Robert
                  </span>
                  <h2 className="text-3xl md:text-4xl font-serif text-navy mb-6">
                    25 Years of Building Better Sleep
                  </h2>
                  <div className="space-y-5 text-gray-600 leading-relaxed text-lg">
                    <p>
                      Robert Taglianetti has spent over two and a half decades in the sleep
                      industry, working every layer of the business — from factory floor production
                      to national retail distribution. He is the founder of Sleep6 and Busby, two
                      Chicago-based mattress brands built on the belief that quality sleep should
                      be accessible, honest, and American-made.
                    </p>
                    <p>
                      Under Robert&apos;s leadership, Sleep6 secured a partnership with Apt.,
                      bringing factory-direct mattresses to consumers across the country. Every
                      product in both brands is manufactured using 100% USA-sourced materials —
                      a commitment Robert has maintained even as competitors have shifted overseas
                      in pursuit of lower costs.
                    </p>
                    <p>
                      Robert is a straight-talking operator who has seen every trend the sleep
                      industry has tried to sell consumers over the past 25 years. He brings that
                      experience to every conversation — whether he is breaking down mattress
                      science, sharing the realities of scaling a manufacturing business in
                      Chicago, or helping consumers cut through the noise in a crowded market.
                    </p>
                  </div>
                </div>

                {/* Stat callouts */}
                <div className="space-y-4">
                  <div className="border-2 border-gold/20 rounded-3xl p-6 bg-[#faf8f5]">
                    <p className="text-4xl font-bold text-gold-dark mb-1">25+</p>
                    <p className="text-navy font-medium">Years in the sleep industry</p>
                  </div>
                  <div className="border-2 border-gold/20 rounded-3xl p-6 bg-[#faf8f5]">
                    <p className="text-4xl font-bold text-gold-dark mb-1">2</p>
                    <p className="text-navy font-medium">National brands: Sleep6 & Busby</p>
                  </div>
                  <div className="border-2 border-gold/20 rounded-3xl p-6 bg-[#faf8f5]">
                    <p className="text-2xl font-bold text-gold-dark mb-1">Apt.</p>
                    <p className="text-navy font-medium">National retail partnership</p>
                  </div>
                  <div className="border-2 border-gold/20 rounded-3xl p-6 bg-[#faf8f5]">
                    <p className="text-2xl font-bold text-gold-dark mb-1">Made in USA</p>
                    <p className="text-navy font-medium">100% domestic materials</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Section 3: Topics ── */}
          <section className="py-20 bg-[#faf8f5] linen-texture">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="inline-block bg-gold/15 text-gold-dark font-semibold px-4 py-1 rounded-full text-sm mb-4">
                  What Robert Covers
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-navy">
                  Topics He Speaks On
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {topics.map((topic) => {
                  const Icon = topic.icon;
                  return (
                    <div
                      key={topic.title}
                      className="border-2 border-gold/20 rounded-3xl p-6 bg-white shadow-lg shadow-gold/5 hover:shadow-xl hover:shadow-gold/10 transition-shadow"
                    >
                      <div className="w-10 h-10 bg-gold/15 rounded-2xl flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5 text-gold-dark" />
                      </div>
                      <h3 className="font-semibold text-navy mb-2">{topic.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{topic.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── Section 4: Interview Angles ── */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="inline-block bg-gold/15 text-gold-dark font-semibold px-4 py-1 rounded-full text-sm mb-4">
                  For Hosts
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-navy">
                  Interview Angles
                </h2>
                <p className="text-gray-500 mt-3">
                  Pick the framing that fits your audience — Robert can go deep on any of these.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {angles.map((angle) => {
                  const Icon = angle.icon;
                  return (
                    <div
                      key={angle.title}
                      className="border-2 border-gold/20 rounded-3xl p-8 bg-[#faf8f5] shadow-lg shadow-gold/5"
                    >
                      <div className="w-12 h-12 bg-navy rounded-2xl flex items-center justify-center mb-5">
                        <Icon className="w-6 h-6 text-gold" />
                      </div>
                      <h3 className="font-semibold text-navy text-lg mb-3">{angle.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{angle.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── Section 5: Sample Questions ── */}
          <section className="py-20 bg-[#faf8f5] linen-texture">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                  <span className="inline-block bg-gold/15 text-gold-dark font-semibold px-4 py-1 rounded-full text-sm mb-4">
                    Pre-Interview Research
                  </span>
                  <h2 className="text-3xl md:text-4xl font-serif text-navy mb-3">
                    Suggested Questions
                  </h2>
                  <p className="text-gray-500">
                    Copy-paste ready for your show prep. Robert has detailed answers for all of these.
                  </p>
                </div>

                <div className="space-y-4">
                  {sampleQuestions.map((question, index) => (
                    <div
                      key={index}
                      className="flex gap-5 bg-white border-2 border-gold/20 rounded-2xl p-6 shadow-sm shadow-gold/5"
                    >
                      <span className="text-2xl font-bold text-gold/40 leading-none w-8 flex-shrink-0 pt-0.5">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <p className="text-gray-700 leading-relaxed">{question}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── Section 6: As Seen In ── */}
          <section className="py-16 bg-white border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm uppercase tracking-widest text-gray-400 font-semibold mb-10">
                As Seen In
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
                {pressLogos.map((logo) => (
                  <a
                    key={logo.name}
                    href={logo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-navy font-semibold text-lg transition-colors duration-200 border-2 border-gray-200 hover:border-navy rounded-full px-6 py-2"
                  >
                    {logo.name}
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* ── Section 7: Quick Facts ── */}
          <section className="py-20 bg-[#faf8f5] linen-texture">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="inline-block bg-gold/15 text-gold-dark font-semibold px-4 py-1 rounded-full text-sm mb-4">
                  At a Glance
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-navy">Quick Facts</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {quickFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="text-center border-2 border-gold/20 rounded-3xl p-6 bg-white shadow-lg shadow-gold/5"
                  >
                    <p className="text-3xl font-bold text-gold-dark mb-2">{fact.value}</p>
                    <p className="text-navy text-sm font-medium">{fact.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Section 8: Downloads ── */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl mx-auto text-center mb-12">
                <span className="inline-block bg-gold/15 text-gold-dark font-semibold px-4 py-1 rounded-full text-sm mb-4">
                  Media Assets
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-navy mb-3">
                  Downloads
                </h2>
                <p className="text-gray-500">
                  Everything you need to promote the episode — grab what you need below.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {downloads.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.file}
                      {...(item.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : { download: true })}
                      className="flex items-center gap-4 border-2 border-gold/20 rounded-2xl p-5 bg-[#faf8f5] hover:border-gold hover:bg-gold/5 transition-all group"
                    >
                      <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-gold" />
                      </div>
                      <span className="font-medium text-navy group-hover:text-gold-dark transition-colors">
                        {item.label}
                      </span>
                      <Download className="w-4 h-4 text-gray-400 group-hover:text-gold ml-auto transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── Section 9: Booking CTA ── */}
          <section className="bg-navy py-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gold/10 blob-shape blur-3xl -translate-y-1/3 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] md:w-[350px] md:h-[350px] bg-white/5 blob-shape-alt blur-3xl translate-y-1/3 -translate-x-1/4" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-4 py-2 text-sm text-gold mb-6">
                <Mic className="w-4 h-4" />
                <span>Ready to Book?</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-4">
                Let&apos;s Make{' '}
                <span className="text-gold">Great Radio</span>
              </h2>

              <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10">
                Robert is available for podcast interviews, panel appearances, and media
                commentary. Reach out directly to check availability.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                {/* TODO: Replace href with Calendly link when available */}
                <a
                  href="mailto:press@mybusby.com"
                  className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale-105"
                >
                  <Mic className="w-5 h-5" />
                  Book Robert as a Guest
                </a>
                <a
                  href="/press/one-sheet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-gold text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  Download One-Sheet
                </a>
              </div>

              {/* Contact details */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400">
                <a
                  href="mailto:press@mybusby.com"
                  className="flex items-center gap-2 hover:text-gold transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  press@mybusby.com
                </a>
                <a
                  href="tel:18448861640"
                  className="flex items-center gap-2 hover:text-gold transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  (844) 886-1640
                </a>
                <a
                  href="https://linkedin.com/in/robert-taglianetti-25499795"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-gold transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
