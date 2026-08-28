import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Showroom videos | Busby',
  // Staff-facing, for the tablet on the floor. Never indexed, never linked
  // from the public site.
  robots: { index: false, follow: false },
};

export default function ShowroomVideosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
