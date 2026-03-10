import Link from 'next/link';
import { MapPin, Clock, Phone, Calendar } from 'lucide-react';

export default function ShowroomCTA() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-[4/3] lg:aspect-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-navy to-navy-light flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-10 h-10 text-gold" />
                  </div>
                  <p className="text-2xl font-bold mb-2">Visit Our Showroom</p>
                  <p className="text-gray-300">Experience Sleep6 in person</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-navy mb-4">
                Experience the Difference in Person
              </h2>

              <p className="text-gray-600 mb-8">
                Want to feel the quality before you buy? Visit our showroom to test every
                mattress, meet our sleep experts, and see why American craftsmanship
                makes all the difference.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-navy/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy">Location</p>
                    <p className="text-gray-600">123 Main Street, Austin, TX 78701</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-navy/10 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy">Hours</p>
                    <p className="text-gray-600">Mon-Sat: 10am - 7pm | Sun: 12pm - 5pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-navy/10 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy">Phone</p>
                    <a href="tel:18443753376" className="text-gold hover:text-gold-dark transition-colors">
                      1-844-375-3376
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/showroom"
                  className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-white font-semibold px-8 py-4 rounded-full transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  Book a Visit
                </Link>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 hover:border-navy hover:text-navy font-semibold px-8 py-4 rounded-full transition-colors"
                >
                  <MapPin className="w-5 h-5" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
