import Image from 'next/image';

const bedTypes = [
  {
    name: 'Slatted Frame',
    description: 'Wood or metal slats spaced up to 4" apart',
    icon: (
      <Image src="/images/products/slatted-bed-frame.png" alt="Busby mattress on a slatted bed frame" width={500} height={400} className="w-full h-full object-contain" />
    ),
  },
  {
    name: 'Box Foundation',
    description: 'Traditional box spring or solid foundation',
    icon: (
      <Image src="/images/box-foundation.png" alt="Busby mattress on a box spring foundation" width={500} height={400} className="w-full h-full object-contain" />
    ),
  },
  {
    name: 'Adjustable Base',
    description: 'Fits any bed and its adjustable base',
    icon: (
      <Image src="/images/products/adjustable-bed-base.png" alt="Busby mattress on an adjustable bed base" width={500} height={400} className="w-full h-full object-contain scale-[1.44]" />
    ),
  },
  {
    name: 'Platform Bed',
    description: 'Low-profile frame, no box spring needed',
    icon: (
      <Image src="/images/products/platform-bed.png" alt="Busby mattress on a platform bed" width={500} height={400} className="w-full h-full object-contain" />
    ),
  },
];

export default function FitsAnyBed() {
  return (
    <section className="mt-4 py-16 md:py-20 bg-[#f5f7f9]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <span className="inline-block text-gold-dark font-sans text-xs tracking-[0.25em] uppercase mb-3">
            Universal Compatibility
          </span>
          <h2 className="text-2xl md:text-3xl font-serif text-navy">
            Fits any bed
          </h2>
        </div>

        {/* Bed type grid — 3 columns with generous spacing */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-20">
          {bedTypes.map((bed) => (
            <div key={bed.name} className="flex flex-col items-center text-center">
              {/* Icon container — consistent fixed height for all three */}
              <div className="w-full h-56 md:h-64 mb-6">
                {bed.icon}
              </div>
              {/* Label */}
              <p className="text-sm font-semibold text-navy mb-1">
                {bed.name}
              </p>
              {/* Description */}
              <p className="text-xs text-gray-600 leading-relaxed max-w-[160px]">
                {bed.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
