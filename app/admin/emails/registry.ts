import 'server-only';
import {
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
};

export type TemplateKey = keyof typeof EMAIL_TEMPLATES;
