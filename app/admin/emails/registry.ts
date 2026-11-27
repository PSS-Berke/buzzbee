import 'server-only';
import {
  renderAdminReservationEmail,
  renderUserReminderEmail,
  renderUserReservationEmail,
  renderUserSleepGuideEmail,
  renderUserStartingSoonEmail,
} from '@/lib/email';
import {
  SAMPLE_RESERVATION,
  SAMPLE_SALE_RESERVATION,
  SAMPLE_SENIOR_RESERVATION,
  SAMPLE_SLEEP_GUIDE_TO,
} from '@/lib/email-fixtures';

export interface EmailTemplateMeta {
  title: string;
  description: string;
  recipient: string;
  trigger: string;
  render: () => { subject: string; html: string };
}

export const EMAIL_TEMPLATES: Record<string, EmailTemplateMeta> = {
  'user-sleep-guide': {
    title: 'User — sleep guide welcome',
    description: 'Long-form sleep guide sent to new subscribers on first signup only.',
    recipient: 'New subscriber',
    trigger: 'POST /api/subscribe (first signup)',
    render: () => renderUserSleepGuideEmail(SAMPLE_SLEEP_GUIDE_TO),
  },
  'user-reservation': {
    title: 'User — reservation confirmation',
    description: "Confirmation sent to the visitor with date, address, and 'add to calendar' link.",
    recipient: 'Reservation submitter',
    trigger: 'POST /api/reserve',
    render: () => renderUserReservationEmail(SAMPLE_RESERVATION),
  },
  'user-reservation-senior': {
    title: 'User — Senior Booking confirmation',
    description:
      'The reservation confirmation for a booking from /senior-booking, with the $300 senior discount card under the date.',
    recipient: 'Reservation submitter',
    trigger: 'POST /api/reserve (source senior-booking)',
    render: () => renderUserReservationEmail(SAMPLE_SENIOR_RESERVATION),
  },
  'user-reservation-sale': {
    title: 'User — Sale Booking confirmation',
    description:
      'The reservation confirmation for a booking from /sale-booking, with the 30% year-end sale card under the date.',
    recipient: 'Reservation submitter',
    trigger: 'POST /api/reserve (source sale-booking)',
    render: () => renderUserReservationEmail(SAMPLE_SALE_RESERVATION),
  },
  'user-reminder': {
    title: 'User — day-of reminder',
    description:
      'Short reminder sent the morning of the visit with the time, address, and a call/directions button.',
    recipient: 'Reservation submitter',
    trigger: 'GET /api/cron/reminders (daily, 8am Central)',
    render: () => renderUserReminderEmail(SAMPLE_RESERVATION),
  },
  'user-starting-soon': {
    title: 'User — starting soon (final nudge)',
    description:
      'Sent ~15 minutes before the appointment. Deliberately minimal: time, address, directions, and a tap-to-call button.',
    recipient: 'Reservation submitter',
    trigger: 'GET /api/cron/reminders-soon (every 5 min)',
    render: () => renderUserStartingSoonEmail(SAMPLE_RESERVATION),
  },
  'admin-reservation': {
    title: 'Internal — new booking notification',
    description:
      'Sent to the team on every booking with the visitor’s details. Reply-to is the customer, so a reply reaches them directly.',
    recipient: 'RESERVATIONS_INBOX_EMAIL (team)',
    trigger: 'POST /api/reserve (every booking)',
    render: () => renderAdminReservationEmail(SAMPLE_RESERVATION),
  },
  'admin-reservation-sale': {
    title: 'Internal — Sale Booking notification',
    description:
      'The team notification for a booking from /sale-booking. Subject and Type name the page; Elmhurst and Studio Go bookings read the same with their own page name.',
    recipient: 'RESERVATIONS_INBOX_EMAIL (team)',
    trigger: 'POST /api/reserve (source sale-booking, elmhurst-booking or studio-go-booking)',
    render: () => renderAdminReservationEmail(SAMPLE_SALE_RESERVATION),
  },
  'admin-reservation-senior': {
    title: 'Internal — Senior Booking notification',
    description:
      'The team notification for a booking from /senior-booking. Subject and Type say to take the extra $300 off.',
    recipient: 'RESERVATIONS_INBOX_EMAIL (team)',
    trigger: 'POST /api/reserve (source senior-booking)',
    render: () => renderAdminReservationEmail(SAMPLE_SENIOR_RESERVATION),
  },
};

export type TemplateKey = keyof typeof EMAIL_TEMPLATES;
