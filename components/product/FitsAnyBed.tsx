const bedTypes = [
  {
    name: 'Slatted Frame',
    description: 'Wood or metal slats spaced up to 4" apart',
    icon: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/images/products/Untitled (1500 x 1200 px).png" alt="Slatted bed frame" className="w-full h-full object-contain" />
    ),
  },
  {
    name: 'Box Foundation',
    description: 'Traditional box spring or solid foundation',
    icon: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/images/Untitled (1500 x 1200 px) (1).png" alt="Box foundation bed frame" className="w-full h-full object-contain" />
    ),
  },
  {
    name: 'Adjustable Base',
    description: 'Fits any bed and its adjustable base',
    icon: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/images/products/adjustable bed.png" alt="Adjustable base" className="w-full h-full object-contain scale-[1.44]" />
    ),
  },
  {
    name: 'Platform Bed',
    description: 'Low-profile frame, no box spring needed',
    icon: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/images/products/Untitled (1500 x 1200 px) (2).png" alt="Platform bed frame" className="w-full h-full object-contain" />
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
              <p className="text-xs text-gray-400 leading-relaxed max-w-[160px]">
                {bed.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
