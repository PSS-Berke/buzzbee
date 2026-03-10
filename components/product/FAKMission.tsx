import Image from 'next/image';

export default function FAKMission() {
  return (
    <section className="py-16 bg-[#f5f7f9]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 rounded-3xl border border-gray-100 shadow-sm px-8 py-12 md:px-16 md:py-14 flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Left: FAK logo */}
          <div className="shrink-0">
            <Image
              src="/images/products/Luna refrence/Untitled design (30).png"
              alt="For Autistic Kids Foundation"
              width={200}
              height={180}
              className="object-contain"
            />
          </div>

          {/* Right: headline + body */}
          <div>
            <h2 className="font-serif text-navy text-3xl md:text-4xl leading-tight mb-4">
              A Mattress<br />With Purpose
            </h2>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-md">
              For every ten FAK Cosmos mattresses sold in store or online, Sleep6 will donate one
              mattress to the For Autistic Kids Foundation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
