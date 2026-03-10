export default function FitsAnyCrib() {
  return (
    <section className="mt-4 py-16 md:py-20 bg-[#f5f7f9]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <span className="inline-block text-gold-dark font-sans text-xs tracking-[0.25em] uppercase mb-3">
            Standard Crib Compatibility
          </span>
          <h2 className="text-2xl md:text-3xl font-serif text-navy">
            Fits any Standard Crib
          </h2>
        </div>

        {/* Crib illustration */}
        <div className="flex justify-center">
          <div className="w-full max-w-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/products/crib.svg"
              alt="Standard crib"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
