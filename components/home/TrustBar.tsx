import { Flag, Truck, DollarSign, Shield, Moon } from 'lucide-react';

const trustItems = [
  {
    icon: Flag,
    title: 'Made in USA',
    description: 'American materials, American workers',
  },
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'Free returns',
  },
  {
    icon: Moon,
    title: '100 Night Guarantee',
    description: 'Sleep on it — risk free',
  },
  {
    icon: DollarSign,
    title: 'Financing Available',
    description: 'Flexible payment options',
  },
  {
    icon: Shield,
    title: '10 Year Warranty',
    description: 'We stand behind our craft',
  },
];

export default function TrustBar() {
  return (
    <section className="py-8 border-y border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
          {trustItems.map((item) => (
            <div key={item.title} className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gold/15 rounded-full flex items-center justify-center">
                <item.icon className="w-6 h-6 text-gold-dark" />
              </div>
              <div>
                <p className="font-semibold text-navy">{item.title}</p>
                <p className="text-sm text-gray-500 hidden sm:block">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
