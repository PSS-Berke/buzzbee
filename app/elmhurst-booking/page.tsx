import { MapPin } from 'lucide-react';
import BookingLanding from '@/components/booking/BookingLanding';

// Elmhurst Booking: landing page for Google Ads "BUS | Search | Elmhurst
// Local". Bookings made here are saved with source `elmhurst-booking` and
// tagged on /appointment/confirmed (?offer=local), so they count on their own.

export default function ElmhurstBookingPage() {
  return (
    <BookingLanding
      offer="local"
      badge={{ icon: <MapPin className="w-4 h-4" aria-hidden="true" />, label: 'Elmhurst, IL' }}
      title={
        <>
          Elmhurst&rsquo;s <span className="text-gold">private</span> mattress showroom.
        </>
      }
      intro="Book a time and the showroom is yours. A Sleep Guide meets you at the door on North Avenue, with free parking right outside."
      highlights={[
        { value: 'Free', label: 'visit, no obligation' },
        { value: '1:1', label: 'one visit at a time' },
        { value: '30%', label: 'off showroom beds through Dec 31' },
      ]}
      formTitle="Book your private visit"
      formNote="Takes about a minute. Pick your time and it's confirmed."
      reasonsTitle="Why it beats a mattress store"
      reasons={[
        {
          title: 'No crowd, no rush',
          body: 'We book one visit at a time, so there are no salespeople circling while you think.',
        },
        {
          title: 'Beds ready when you arrive',
          body: 'Tell us what you want to try and it is made up and waiting for you.',
        },
        {
          title: 'Nobody is closing you',
          body: 'Your Sleep Guide is there to help you choose. There is no pressure to buy.',
        },
        {
          title: 'Close to home',
          body: 'Made in the USA, sold from right here in Elmhurst, with a 100-night home trial and a 10-year warranty.',
        },
      ]}
    />
  );
}
