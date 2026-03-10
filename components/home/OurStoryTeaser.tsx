import Link from 'next/link';
import Image from 'next/image';
import { Users, Factory, Award, Heart } from 'lucide-react';

const stats = [
  { icon: Users, value: '25+', label: 'Years Experience' },
  { icon: Factory, value: '1', label: 'American Factory' },
  { icon: Award, value: '100%', label: 'USA Materials' },
  { icon: Heart, value: '10K+', label: 'Happy Customers' },
];

export default function OurStoryTeaser() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
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

          {/* Content */}
          <div>
            <span className="inline-block bg-gold/15 text-gold-dark font-semibold px-4 py-1 rounded-full text-sm mb-6">
              Our Story
            </span>

            <h2 className="text-3xl md:text-4xl font-serif text-navy mb-6">
              Meet the Makers Behind Your Perfect Sleep
            </h2>

            <p className="text-xl text-gray-600 mb-6">
              After 25 years in the bedding industry, we knew two things: what makes a
              perfect mattress, and why most people never get one.
            </p>

            <p className="text-gray-600 mb-8">
              Too many middlemen. Too much markup. Too little transparency. So we built
              our own factory right here in the USA and went back to the fundamentals —
              the 6 essential components every mattress needs.
            </p>

            <blockquote className="border-l-4 border-gold pl-6 mb-8">
              <p className="text-lg text-navy italic">
                &quot;These are the hands that build your mattress. Real craftspeople,
                real expertise, real American jobs.&quot;
              </p>
            </blockquote>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="w-8 h-8 text-gold mx-auto mb-2" />
                  <p className="text-2xl font-bold text-navy">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white font-semibold px-8 py-4 rounded-full transition-colors"
            >
              Read Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
