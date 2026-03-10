import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Users,
  Factory,
  DollarSign,
  Shield,
  Flag,
  Check,
  X,
  Layers,
  Scissors,
  Palette,
  Hammer,
} from 'lucide-react';

export const metadata = {
  title: 'About Us | Sleep6',
  description: 'Learn about Sleep6 - 25+ years of bedding expertise, American-made mattresses built for real comfort without compromise.',
};

const stats = [
  { icon: Users, value: '25+', label: 'Years Experience' },
  { icon: Factory, value: '1', label: 'American Factory' },
  { icon: Shield, value: '20', label: 'Year Warranty' },
  { icon: Flag, value: '100%', label: 'USA Materials' },
];

const philosophyItems = [
  'Support proper spinal alignment',
  'Reduce pressure points',
  'Stay cool and breathable',
  'Be built with high-quality materials',
  'Last for years',
];

const designFocusItems = [
  { icon: Layers, label: 'Clean construction' },
  { icon: Scissors, label: 'Premium fabrics' },
  { icon: Palette, label: 'Thoughtful design' },
  { icon: Hammer, label: 'Reliable durability' },
];

const promises = [
  {
    icon: DollarSign,
    title: 'Financing Available',
    description: 'Flexible payment options to fit your budget. Get the sleep you deserve with easy monthly payments.',
  },
  {
    icon: Shield,
    title: '10 Year Warranty',
    description: 'We stand behind our craft. Your mattress is protected with our industry-leading warranty.',
  },
  {
    icon: Flag,
    title: 'Made in USA',
    description: 'American materials, American workers. Every mattress is handcrafted in our own factory.',
  },
];

const dontBelieve = [
  'Overcomplicated layers',
  'Inflated "luxury" pricing',
  'Aggressive gimmicks',
];

const doBelieve = [
  'Quality materials',
  'Honest value',
  'Helping customers sleep better than ever',
];

export default function AboutPage() {
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
        {/* Section 1: Hero */}
        <section className="relative overflow-hidden pt-8 pb-20 md:py-24">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/15 blob-shape blur-3xl -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-navy/5 blob-shape-alt blur-3xl translate-y-1/3 -translate-x-1/4" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-gold/10 rounded-full px-4 py-2 text-sm text-navy mb-8">
                <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                <span>Our Story</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-navy mb-6">
                Better Sleep{' '}
                <span className="wavy-underline">Changes Everything</span>
              </h1>

              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                At Sleep6, we believe your mattress should deliver the perfect balance of support,
                pressure relief, and durability — comfort without compromise, built to help your
                body recover, restore, and wake up ready.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: About Sleep6 */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <span className="inline-block bg-gold/15 text-gold-dark font-semibold px-4 py-1 rounded-full text-sm mb-6">
                  About Sleep6
                </span>

                <h2 className="text-3xl md:text-4xl font-serif text-navy mb-6">
                  We Built Sleep6 Around One Simple Idea
                </h2>

                <p className="text-2xl font-light text-gray-500 mb-6 leading-relaxed">
                  Your energy. Your health. Your focus. Your mood. Your life.
                </p>

                <p className="text-gray-600 mb-6">
                  That&apos;s why we created Sleep6 — a mattress company built around one simple idea:
                  comfort without compromise. We design mattresses that deliver the perfect balance
                  of support, pressure relief, and durability — without unnecessary gimmicks or
                  inflated markups.
                </p>

                <p className="text-gray-600 mb-8">
                  Every Sleep6 mattress is thoughtfully engineered to help your body recover,
                  restore, and wake up ready.
                </p>

                <blockquote className="border-l-4 border-gold pl-6">
                  <p className="text-lg text-navy italic">
                    &quot;Better sleep improves every part of life — from physical recovery to
                    mental clarity.&quot;
                  </p>
                </blockquote>
              </div>

              {/* Image grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[4/3] bg-gray-100 rounded-3xl overflow-hidden relative">
                    <Image
                      src="/images/team/tag city corner.jpg"
                      alt="Factory team"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="aspect-square bg-gold/20 border-2 border-gold/30 rounded-3xl p-6 flex flex-col justify-center">
                    <p className="text-4xl font-bold text-gold-dark mb-2">25+</p>
                    <p className="text-navy">Years of bedding expertise</p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden relative">
                    <Image
                      src="/images/team/girl with foot on box.png"
                      alt="Fancy interior"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="aspect-[4/3] bg-gray-100 rounded-3xl overflow-hidden relative">
                    <Image
                      src="/images/team/mattress factory.jpeg"
                      alt="Craftsman at work"
                      fill
                      className="object-cover object-left scale-[1.25] origin-left"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Stats */}
        <section className="py-16 bg-navy/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-gold-dark" />
                  </div>
                  <p className="text-3xl font-bold text-navy mb-1">{stat.value}</p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Meet Robert */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold/10 blob-shape blur-3xl translate-x-1/3 translate-y-1/3" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <span className="inline-block bg-gold/15 text-gold-dark font-semibold px-4 py-1 rounded-full text-sm mb-6">
                  Meet Our Founder
                </span>

                <h2 className="text-3xl md:text-4xl font-serif text-navy mb-2">
                  Robert Taglianetti
                </h2>
                <p className="text-gold-dark font-semibold mb-6">Founder, Sleep6</p>

                <p className="text-gray-600 mb-6">
                  Robert brings over 25 years of experience in the mattress industry to his role
                  as founder of Sleep6. Throughout his career, Robert has focused not just on
                  selling mattresses, but on helping people understand the connection between
                  quality sleep and overall wellness.
                </p>

                <p className="text-gray-600 mb-8">
                  He believes that better sleep improves every part of life — from physical
                  recovery to mental clarity. With a hands-on, relationship-driven approach,
                  Robert has built Sleep6 around personal connection, education, and trust.
                </p>

                <blockquote className="border-l-4 border-gold pl-6">
                  <p className="text-lg text-navy italic">
                    &quot;My mission is simple: help every customer sleep better and wake up
                    stronger.&quot;
                  </p>
                  <footer className="mt-2 text-sm text-gray-500">— Robert Taglianetti</footer>
                </blockquote>
              </div>

              {/* Founder image */}
              <div className="bg-white border-2 border-gold/20 rounded-3xl p-8 shadow-xl shadow-gold/5">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden relative">
                  <Image
                    src="/images/team/tag touching on mattress.jpg"
                    alt="Robert Taglianetti, Founder of Sleep6"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Our Philosophy */}
        <section className="py-20 relative overflow-hidden bg-white/50">
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-gold/10 blob-shape blur-3xl -translate-x-1/2 -translate-y-1/2" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <span className="inline-block bg-gold/15 text-gold-dark font-semibold px-4 py-1 rounded-full text-sm mb-6">
                  Our Philosophy
                </span>

                <h2 className="text-3xl md:text-4xl font-serif text-navy mb-3">
                  Sleep Is Not a Luxury.
                </h2>
                <h2 className="text-3xl md:text-4xl font-serif text-navy mb-6">
                  It&apos;s a Foundation.
                </h2>

                <p className="text-xl text-gray-600 mb-8">
                  We believe your mattress should:
                </p>

                <ul className="space-y-4 mb-8">
                  {philosophyItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-navy">
                      <div className="flex-shrink-0 w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center mt-0.5">
                        <Check className="w-4 h-4 text-gold-dark" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-lg font-semibold text-navy">
                  No shortcuts. No hype. Just real comfort.
                </p>
              </div>

              {/* Visual */}
              <div className="bg-white border-2 border-gold/20 rounded-3xl p-8 shadow-xl shadow-gold/5">
                <div className="aspect-video bg-gradient-to-br from-navy/5 to-navy/10 rounded-2xl flex items-center justify-center">
                  <div className="text-center px-6">
                    <p className="text-2xl font-serif text-navy mb-4">
                      &quot;The right mattress should feel incredible on day one — and still feel
                      incredible years later.&quot;
                    </p>
                    <p className="text-sm text-gold-dark font-semibold">Sleep6</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Designed for Real Life */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 blob-shape blur-3xl translate-x-1/3 -translate-y-1/3" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block bg-gold/15 text-gold-dark font-semibold px-4 py-1 rounded-full text-sm mb-6">
                Designed for Real Life
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-navy mb-4">
                Every Product Created with Care
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Every Sleep6 product — from the Nod to the Dream — is made with the same
                commitment to quality, safety, and sleep that holds up over time.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {designFocusItems.map((item) => (
                <div
                  key={item.label}
                  className="bg-white border-2 border-gold/20 rounded-3xl p-6 text-center shadow-lg shadow-gold/5"
                >
                  <div className="w-14 h-14 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-gold-dark" />
                  </div>
                  <h3 className="text-navy font-semibold">{item.label}</h3>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/home-line"
                className="inline-flex items-center gap-2 text-gold-dark hover:text-gold font-semibold transition-colors"
              >
                Explore our mattresses
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Section 7: Why Sleep6? */}
        <section className="py-20 bg-navy/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block bg-gold/15 text-gold-dark font-semibold px-4 py-1 rounded-full text-sm mb-6">
                Why Sleep6?
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-navy mb-4">
                There Are Dozens of Mattress Brands.
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Very few are built on simplicity and integrity.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Don't believe */}
              <div className="bg-white border-2 border-gray-200 rounded-3xl p-8">
                <h3 className="text-lg font-semibold text-gray-500 mb-6">We don&apos;t believe in</h3>
                <ul className="space-y-4">
                  {dontBelieve.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-500">
                      <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mt-0.5">
                        <X className="w-4 h-4 text-gray-400" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Do believe */}
              <div className="bg-white border-2 border-gold/30 rounded-3xl p-8 shadow-lg shadow-gold/5">
                <h3 className="text-lg font-semibold text-navy mb-6">We believe in</h3>
                <ul className="space-y-4">
                  {doBelieve.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-navy">
                      <div className="flex-shrink-0 w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center mt-0.5">
                        <Check className="w-4 h-4 text-gold-dark" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Our Promise */}
        <section className="py-20 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block bg-gold/15 text-gold-dark font-semibold px-4 py-1 rounded-full text-sm mb-6">
                Our Promise
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-navy mb-4">
                Our Promise to You
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We are confident that you will love your new mattress and get the sleep you deserve.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {promises.map((promise) => (
                <div
                  key={promise.title}
                  className="bg-white border-2 border-gold/20 rounded-3xl p-8 shadow-lg shadow-gold/5 text-center"
                >
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <promise.icon className="w-8 h-8 text-gold-dark" />
                  </div>
                  <h3 className="text-xl font-semibold text-navy mb-4">{promise.title}</h3>
                  <p className="text-gray-600">{promise.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 9: CTA */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-navy/5" />
          <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-gold/10 blob-shape blur-3xl -translate-x-1/2 -translate-y-1/2" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif text-navy mb-6">
                Ready to Sleep Better and Wake Up Stronger?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Experience real comfort without compromise. Find the mattress that&apos;s right for
                you — or let us help you find it.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/home-line"
                  className="inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale-105"
                >
                  Shop Mattresses
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center gap-2 bg-white border-2 border-navy/20 hover:border-gold text-navy font-semibold px-8 py-4 rounded-full transition-all"
                >
                  Take the Sleep Quiz
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
