export default function StudioHero() {
  return (
    <section className="pt-16 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 studio-paper-wash pointer-events-none" />
      <div className="absolute inset-0 blueprint-grid-hero pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <span className="inline-block text-clay-deep font-medium text-sm tracking-[0.2em] uppercase mb-4">
          Introducing — The Studio Line
        </span>
        <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-semibold text-navy mb-6 tracking-tight">
          Comfort, engineered by the numbers.
        </h1>
        <p className="text-navy/70 text-lg max-w-2xl mx-auto leading-relaxed">
          Studio strips sleep down to what matters: clean geometry, honest materials, and a
          build you can read like a blueprint. Four builds, from essential foam to a
          pocketed-coil hybrid. Zero guesswork.
        </p>
        <div className="w-16 h-px bg-clay mx-auto mt-8" />
      </div>
    </section>
  );
}
