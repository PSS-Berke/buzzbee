import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface Guide {
  name: string;
  role: string;
  bio: string;
  image: string;
  imageAlt: string;
}

const guides: Guide[] = [
  {
    name: 'Robert Taglianetti',
    role: 'Founder & Sleep Guide, Busby',
    bio: 'Robert brings 25+ years in the mattress industry to every appointment. He focuses on the connection between quality sleep and overall wellness, and takes a hands-on, relationship-driven approach — no scripts, no upsells, just honest guidance to help you find the right bed.',
    image: '/images/team/tag no tag.png',
    imageAlt: 'Robert Taglianetti, Founder of Busby',
  },
];

export default function SleepGuides() {
  return (
    <section className="py-20 md:py-24 bg-[#faf8f5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-widest text-gold-dark mb-3">
            BY APPOINTMENT
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-navy mb-3">
            Meet your Sleep Guide.
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The showroom is self-serve by design. When you want expert guidance — choosing between
            two models, sleep position questions, anything technical — book a Sleep Consultation
            and Robert will meet you in store.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-10">
          {guides.map((g) => (
            <div key={g.name} className="bg-white rounded-2xl p-6 border-2 border-gold/15 shadow-sm">
              <div className="flex items-start gap-5">
                <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 relative">
                  <Image
                    src={g.image}
                    alt={g.imageAlt}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="text-lg font-semibold text-navy">{g.name}</p>
                  <p className="text-sm text-gold-dark mb-3">{g.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{g.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/appointment"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
          >
            Book a Sleep Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
