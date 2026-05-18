export interface Testimonial {
  name: string;
  city: string;
  sleepStyle: string;
  product: string;
  quote: string;
  isPlaceholder: boolean;
}

// Placeholder copy from reference/location page/03-design-and-copy.md § B4.
// Replace with real, consented quotes — keep `isPlaceholder: false` once swapped.
export const homeTestimonials: Testimonial[] = [
  {
    name: '[Sarah]',
    city: '[Evanston, IL]',
    sleepStyle: 'couple',
    product: 'Busby Dream',
    quote:
      'First mattress where my husband and I actually agree. He’s a side sleeper, I’m a back sleeper, and the Dream genuinely works for both of us. Six months in and we keep telling people.',
    isPlaceholder: true,
  },
  {
    name: '[Michael]',
    city: '[Austin, TX]',
    sleepStyle: 'stomach sleeper',
    product: 'Busby Slumber',
    quote:
      'I’m a hot sleeper and a stomach sleeper, which is apparently the worst possible combination. The Slumber is the first mattress I’ve owned that doesn’t make me wake up sweating. I don’t know how they did it, but I’m a believer.',
    isPlaceholder: true,
  },
  {
    name: '[Priya]',
    city: '[Brooklyn, NY]',
    sleepStyle: 'back sleeper',
    product: 'Busby Doze',
    quote:
      'The 100-night trial is what got me to try it. I didn’t need it — first night was the deepest sleep I’d had in months. The fact that they’d offer that kind of guarantee tells you what they think of the mattress.',
    isPlaceholder: true,
  },
];
