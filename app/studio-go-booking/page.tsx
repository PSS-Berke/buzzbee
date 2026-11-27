import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import BookingLanding from '@/components/booking/BookingLanding';

// Studio Go Booking: landing page for Google Ads "BUS | Search | Studio Go".
// Bookings made here are saved with source `studio-go-booking` and tagged on
// /appointment/confirmed (?offer=studio-go), so they count on their own.
//
// Studio Go is not on the showroom floor (see /studio-go), so this page never
// says you can lie on it. The visit is a talk with a Sleep Guide about Studio
// Go plus the showroom beds to compare. People who just want to buy it get a
// link to /studio-go under the form.

export default function StudioGoBookingPage() {
  return (
    <BookingLanding
      offer="studio-go"
      badge={{
        icon: <Star className="w-4 h-4 fill-navy" aria-hidden="true" />,
        label: 'Studio Go, $599',
      }}
      title={
        <>
          Studio Go. <span className="text-gold">$599.</span> Questions first?
        </>
      }
      intro="Book a free visit to our Elmhurst showroom. A Sleep Guide answers your Studio Go questions, can order it for you, and shows you our showroom beds if you want to compare."
      highlights={[
        { value: '$599', label: 'Studio Go queen' },
        { value: '72 hrs', label: 'store pickup' },
        { value: '96 hrs', label: 'free delivery' },
      ]}
      formTitle="Book your visit"
      formNote="Takes about a minute. Pick your time and it's confirmed."
      afterForm={
        <Link
          href="/studio-go"
          className="inline-flex min-h-11 items-center gap-2 text-gold-light font-semibold hover:text-white transition-colors"
        >
          Already sure? Order Studio Go online
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      }
      reasonsTitle="Why come in first"
      reasons={[
        {
          title: 'Ask a real person',
          body: 'Feel, firmness, pickup or delivery. Get straight answers before you spend anything.',
        },
        {
          title: 'Compare it properly',
          body: 'See how Studio Go stacks up against our showroom beds, which are 30% off through December 31.',
        },
        {
          title: 'The showroom to yourself',
          body: 'We book one visit at a time. No crowd, no rush and no pressure to buy.',
        },
        {
          title: 'Leave with it ordered',
          body: 'If Studio Go is the one, your Sleep Guide can order it for you. Pickup in 72 hours or free delivery in 96.',
        },
      ]}
      finePrint="Studio Go is always $599 and is not part of the showroom sale."
    />
  );
}
