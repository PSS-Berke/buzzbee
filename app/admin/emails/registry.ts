import 'server-only';
import {
  renderAdminReservationEmail,
  renderUserReservationEmail,
  renderUserSleepGuideEmail,
} from '@/lib/email';
import {
  SAMPLE_RESERVATION,
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
  'admin-reservation': {
    title: 'Internal — new booking notification',
    description:
      'Sent to the team on every booking with the visitor’s details. Reply-to is the customer, so a reply reaches them directly.',
    recipient: 'RESERVATIONS_INBOX_EMAIL (team)',
    trigger: 'POST /api/reserve (every booking)',
    render: () => renderAdminReservationEmail(SAMPLE_RESERVATION),
  },
};

export type TemplateKey = keyof typeof EMAIL_TEMPLATES;
