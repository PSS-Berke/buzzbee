// The struck-through regular price shown beside a sale price. Renders nothing
// when there's no sale, so it can sit next to any price unconditionally.
// `className` replaces the default spacing, color and size.
export default function WasPrice({
  value,
  className = 'ml-2 text-gray-600 text-[0.7em]',
}: {
  value?: number;
  className?: string;
}) {
  if (value === undefined) return null;
  return (
    <del className={`font-normal align-middle decoration-1 ${className}`}>
      <span className="sr-only">Regular price </span>${value.toLocaleString('en-US')}
    </del>
  );
}
