import Image from 'next/image';

const options = [
  {
    logo: '/afterpay logos/all_black_logo-transparent_bg.png',
    alt: 'Afterpay',
    width: 110,
    height: 36,
    detail: '4 interest-free payments',
  },
  {
    logo: '/afterpay logos/Klarna_Logo_1.png',
    alt: 'Klarna',
    width: 90,
    height: 36,
    detail: 'Pay in 4 or monthly installments',
  },
];

export default function FinancingBanner() {
  return (
    <section className="border-y border-gold/10 bg-navy/[0.03] py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          <p className="text-sm font-semibold text-navy tracking-wide uppercase">
            Flexible Financing
          </p>

          <div className="w-px h-5 bg-gold/30 hidden sm:block" />

          {options.map((opt) => (
            <div key={opt.alt} className="flex items-center gap-3">
              <div className="relative flex items-center" style={{ width: opt.width, height: opt.height }}>
                <Image
                  src={opt.logo}
                  alt={opt.alt}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm text-gray-500">{opt.detail}</span>
            </div>
          ))}

          <div className="w-px h-5 bg-gold/30 hidden sm:block" />

          <p className="text-xs text-gray-400 tracking-wide">Powered by Stripe</p>
        </div>
      </div>
    </section>
  );
}
