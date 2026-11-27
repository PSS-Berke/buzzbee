import { Tag } from 'lucide-react';
import BookingLanding from '@/components/booking/BookingLanding';

// Sale Booking: landing page for Google Ads "BUS | Search | Sale". Bookings
// made here are saved with source `sale-booking` and tagged on
// /appointment/confirmed (?offer=sale), so they count on their own.

export default function SaleBookingPage() {
  return (
    <BookingLanding
      offer="sale"
      badge={{ icon: <Tag className="w-4 h-4" aria-hidden="true" />, label: 'Year-end sale' }}
      title={
        <>
          <span className="text-gold">30% off</span> every showroom bed.
        </>
      }
      intro="Through December 31. Book a private visit to our Elmhurst showroom and try every bed before you choose."
      highlights={[
        { value: '30%', label: 'off every showroom bed' },
        { value: 'Dec 31', label: 'last day of the sale' },
        { value: 'Free', label: 'visit, no obligation' },
      ]}
      formTitle="Book your sale visit"
      formNote="Takes about a minute. Pick your time and it's confirmed."
      reasonsTitle="Why come in for the sale"
      reasons={[
        {
          title: 'The showroom to yourself',
          body: 'We book one visit at a time. A Sleep Guide meets you at the door, and nobody else is on the floor.',
        },
        {
          title: 'Lie on them properly',
          body: 'Ten minutes a bed, in your own time. It tells you more than a hundred reviews.',
        },
        {
          title: 'Sale prices at the visit',
          body: 'Every showroom bed is 30% off through December 31, whether you order that day or later in the month.',
        },
        {
          title: 'Sleep on it at home',
          body: 'Every bed comes with a 100-night home trial and a 10-year warranty.',
        },
      ]}
      finePrint="Applies to showroom beds. Studio Go is not included. Sale ends December 31, 2026."
    />
  );
}
