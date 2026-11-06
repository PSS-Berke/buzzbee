'use client';

import { useEffect, useState, type CSSProperties } from 'react';

// The pieces shared by the full-bleed hero slides. The entrance itself lives in CSS: see
// "the full-bleed scenes" in globals.css.

// Long enough for the slide to finish scrolling away.
const RESET_MS = 800;

/**
 * For a scene's data-active. Comes on with the slide, but goes off a moment after it, so
 * a slide doesn't go dark while it's still sliding out of view.
 */
export function useSceneActive(active: boolean) {
  const [on, setOn] = useState(active);
  if (active && !on) setOn(true);

  useEffect(() => {
    if (active) return;
    const timer = window.setTimeout(() => setOn(false), RESET_MS);
    return () => window.clearTimeout(timer);
  }, [active]);

  return on;
}

/** Delays an element's entrance by its place in the order. */
export const order = (i: number) => ({ '--i': i }) as CSSProperties;

export type Callout = {
  name: string;
  detail: string;
  /** Across the photo: stacked on a phone or tablet, on a small laptop, from 1280px up. */
  x: [string, string, string];
  /** Down the photo, as a percentage. */
  y: number;
};

/**
 * Lines that draw up from dots on the mattress to labels on the wall. All positions are
 * percentages of the photo, so they stay put however it's cropped.
 */
export function SceneCallouts({
  callouts,
  labelY,
  labelClass,
}: {
  callouts: Callout[];
  /** Where the labels meet the lines, as a percentage down the photo. */
  labelY: number;
  /** Each label's width, which depends on how far apart the callouts are. */
  labelClass: string;
}) {
  return (
    <ul>
      {callouts.map((c, i) => (
        <li
          key={c.name}
          className="scene-callout"
          style={
            {
              ...order(i),
              '--x-stacked': c.x[0],
              '--x-laptop': c.x[1],
              '--x-desktop': c.x[2],
            } as CSSProperties
          }
        >
          <span
            className="scene-line absolute left-[var(--x)] w-px origin-bottom bg-gradient-to-b from-gold-light/70 to-white"
            style={{ top: `${labelY}%`, height: `${c.y - labelY}%` }}
          />
          <span
            className="scene-dot absolute left-[var(--x)] -ml-[5px] -mt-[5px] h-2.5 w-2.5 rounded-full bg-gold ring-2 ring-white"
            style={{ top: `${c.y}%` }}
          />
          <div
            className={`scene-label absolute left-[var(--x)] -translate-x-1/2 -translate-y-full pb-1.5 text-center [text-shadow:0_1px_3px_rgb(0_0_0/0.6)] xl:pb-2 ${labelClass}`}
            style={{ top: `${labelY}%` }}
          >
            <p className="text-[11px] font-semibold leading-tight sm:text-xs md:text-sm lg:text-xs xl:text-sm xl:leading-snug">
              {c.name}
            </p>
            {/* The smallest phones only have room for the name. */}
            <p className="mt-0.5 hidden text-[10px] leading-tight text-white/85 min-[390px]:block sm:text-[11px] md:text-xs lg:text-[11px] xl:text-xs">
              {c.detail}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
