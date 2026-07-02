import type { Product } from '@/data/products';

const DELIVERY_STEPS = [
  { title: 'Order', desc: 'Production begins the moment you order — nothing sits in a warehouse.' },
  { title: 'Build', desc: 'Made to order in the USA and quality-checked layer by layer.' },
  { title: 'Ship', desc: 'Compressed, boxed, and shipped free within 5–7 days.' },
  { title: 'Sleep', desc: 'Unbox, let it expand, and try it for 100 nights.' },
];

function SectionHeader({ index, title }: { index: string; title: string }) {
  return (
    <header className="flex items-baseline gap-3 mb-8 pb-4 border-b border-grid">
      <span className="text-clay-deep tabular-nums text-sm">{index}</span>
      <h2 className="font-sans text-xl font-semibold text-navy tracking-tight">{title}</h2>
    </header>
  );
}

function FirmnessScale({ levels, selected }: { levels: string[]; selected: string }) {
  const idx = Math.max(0, levels.findIndex((l) => l.toLowerCase() === selected.toLowerCase()));
  const pct = levels.length > 1 ? (idx / (levels.length - 1)) * 100 : 50;
  return (
    <div>
      <h3 className="text-xs tracking-[0.18em] uppercase text-clay-deep mb-5">Firmness</h3>
      <div className="max-w-lg">
        <div className="relative h-1 bg-grid rounded-full">
          <div className="absolute h-1 bg-clay rounded-full" style={{ width: `${pct}%` }} />
          <div
            className="absolute w-3 h-3 bg-clay rounded-full -top-1 border-2 border-paper"
            style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}
          />
        </div>
        <div className="flex justify-between mt-3">
          {levels.map((l, i) => (
            <span
              key={l}
              className={`text-xs ${i === idx ? 'text-clay-deep font-semibold' : 'text-navy/70'}`}
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function StudioSpecSheet({ product }: { product: Product }) {
  const specRows: [string, string][] = [
    ['Type', product.type],
    ['Feel', product.selectedFirmness],
    ['Layers', String(product.components.length)],
    ['Sizes', product.sizes.map((s) => s.name).join(' · ')],
    ['Best for', product.bestFor.join(' · ')],
    ['From', `$${product.price.toLocaleString()}`],
  ];

  return (
    <div className="mt-20 max-w-4xl mx-auto space-y-20">
      {/* 01 — Overview */}
      <section>
        <SectionHeader index="01" title="Overview" />
        <div className="space-y-10">
          <dl className="border-t border-grid">
            {specRows.map(([k, v]) => (
              <div
                key={k}
                className="grid grid-cols-[110px_1fr] sm:grid-cols-[170px_1fr] gap-4 py-3.5 border-b border-grid"
              >
                <dt className="text-xs tracking-[0.18em] uppercase text-clay-deep pt-0.5">{k}</dt>
                <dd className="text-navy">{v}</dd>
              </div>
            ))}
          </dl>

          <p className="text-navy/70 leading-relaxed">{product.description}</p>

          <div>
            <h3 className="text-xs tracking-[0.18em] uppercase text-clay-deep mb-3">Specifications</h3>
            <ul className="grid sm:grid-cols-2 sm:gap-x-10">
              {product.features.map((f, i) => (
                <li
                  key={i}
                  className="flex gap-3 py-2.5 border-b border-grid/60 text-navy/80 text-sm"
                >
                  <span className="text-clay-deep tabular-nums text-xs pt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 02 — Materials */}
      <section>
        <SectionHeader index="02" title="Materials" />
        <div className="space-y-12">
          <div
            tabIndex={0}
            role="region"
            aria-label="Materials table"
            className="overflow-x-auto"
          >
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr className="text-left text-xs tracking-[0.18em] uppercase text-clay-deep border-b border-grid">
                  <th scope="col" className="py-3 pr-4 font-medium w-10">#</th>
                  <th scope="col" className="py-3 pr-4 font-medium">Material</th>
                  <th scope="col" className="py-3 pr-4 font-medium">Certification</th>
                  <th scope="col" className="py-3 font-medium">Source</th>
                </tr>
              </thead>
              <tbody>
                {product.materials.map((m, i) => (
                  <tr key={i} className="border-b border-grid align-top">
                    <td className="py-4 pr-4 text-clay-deep tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </td>
                    <th scope="row" className="py-4 pr-4 text-left font-normal">
                      <span className="text-navy font-medium block">{m.name}</span>
                      <span className="text-navy/70 text-xs block mt-1 max-w-sm">{m.description}</span>
                    </th>
                    <td className="py-4 pr-4">
                      <span className="inline-block bg-clay/10 text-clay-deep text-xs px-2.5 py-1 rounded-sm whitespace-nowrap">
                        {m.certification}
                      </span>
                    </td>
                    <td className="py-4 text-navy/70 whitespace-nowrap">{m.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {product.firmness.length > 0 && (
            <FirmnessScale
              levels={product.firmness.map((f) => f.level)}
              selected={product.selectedFirmness}
            />
          )}
        </div>
      </section>

      {/* 03 — Delivery */}
      <section>
        <SectionHeader index="03" title="Delivery" />
        <div className="space-y-8">
          <p className="text-navy/70 leading-relaxed max-w-2xl">
            {product.firmness.length === 0
              ? `Your ${product.name} ships fast and arrives ready to use straight out of the box.`
              : `Your ${product.name} ships compressed in a box, straight to your door. Unbox, unroll, and it expands to full size within hours.`}
          </p>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-grid">
            {DELIVERY_STEPS.map((s, i) => (
              <li key={i} className="border-b border-r border-grid p-6">
                <span className="text-clay-deep tabular-nums text-xs">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-sans font-semibold text-navy mt-2">{s.title}</h3>
                <p className="text-navy/70 text-sm mt-1.5 leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
