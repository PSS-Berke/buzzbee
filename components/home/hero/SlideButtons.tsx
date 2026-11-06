'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * A slide's buttons, for use on a dark background. The second invites a showroom visit, so
 * leave it off for a bed that isn't on the floor.
 */
export default function SlideButtons({
  href,
  label,
  onClick,
  showVisit = true,
  className = '',
}: {
  href: string;
  label: string;
  onClick?: () => void;
  showVisit?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Link
        href={href}
        onClick={onClick}
        className="scene-shine group/go relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-sm bg-gold px-5 py-3 font-semibold text-navy transition-colors hover:bg-gold-light"
      >
        {label}
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover/go:translate-x-1 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </Link>
      {showVisit && (
        <a
          href="#quick-book"
          className="inline-flex min-h-11 items-center justify-center rounded-sm border-2 border-white/30 px-5 py-2.5 font-semibold text-white transition-colors hover:border-gold"
        >
          Try it in Elmhurst
        </a>
      )}
    </div>
  );
}
