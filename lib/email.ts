import 'server-only';
import { Resend } from 'resend';
import { env } from './env';
import { elmhurstStore, formatAddress } from '@/data/store';
import { formatSlot } from './slots';
import { isVirtualSource } from './consult';
import { listNotificationRecipients } from './db';
import { formatPhone, isValidEmail } from './submissions';
import { buildIcs, googleCalendarUrl, outlookCalendarUrl, type CalendarEvent } from './calendar';

// Absolute origin for images referenced in email. Mail clients have no page
// context, so every asset URL must be fully qualified.
const SITE_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL || 'https://mybusby.com').replace(/\/$/, '');

let _resend: Resend | null = null;

function client(): Resend {
  if (!_resend) _resend = new Resend(env.RESEND_API_KEY);
  return _resend;
}

// The Resend SDK does not throw on API-level failures — send() resolves with
// { data: null, error }. Convert that into a thrown error so callers' existing
// catch/log paths fire; otherwise a rejected send (suppressed recipient, bad
// domain, quota) is silently swallowed and never logged.
function assertSent(result: { error: { name: string; message: string } | null }): void {
  if (result.error) {
    throw new Error(`Resend send failed: ${result.error.name} — ${result.error.message}`);
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function renderUserSleepGuideEmail(toEmail: string): {
  subject: string;
  html: string;
  text: string;
  headers: Record<string, string>;
} {
  const unsubscribeMailto = `mailto:${env.LEADS_INBOX_EMAIL}?subject=Unsubscribe&body=Please%20remove%20${encodeURIComponent(toEmail)}%20from%20the%20list.`;

  // Reusable inline styles to keep template readable.
  const labelStyle =
    "font-family:Georgia,'Times New Roman',serif;color:#D4792C;font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;";
  const chapterTitleStyle =
    "margin:8px 0 0 0;font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:26px;line-height:1.2;color:#203552;letter-spacing:-0.005em;";
  const bodyStyle =
    "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#3a4a64;font-size:16px;line-height:1.65;";
  const subheadStyle =
    "font-family:Georgia,'Times New Roman',serif;color:#203552;font-size:17px;font-weight:700;font-style:italic;";

  const chapter = ({
    number,
    title,
    intro,
    items,
  }: {
    number: string;
    title: string;
    intro: string;
    items: Array<{ head: string; body: string }>;
  }) => `
    <tr>
      <td class="px" style="padding:0 40px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border-radius:14px;border:1px solid #e6dccd;">
          <tr>
            <td style="padding:32px 32px 28px 32px;">
              <div style="${labelStyle}">${escapeHtml(number)}</div>
              <h2 style="${chapterTitleStyle}">${escapeHtml(title)}</h2>
              <p style="margin:14px 0 0 0;${bodyStyle}">${intro}</p>
              ${items
                .map(
                  (it) => `
                <div style="margin-top:22px;">
                  <div style="${subheadStyle}">${escapeHtml(it.head)}</div>
                  <p style="margin:6px 0 0 0;${bodyStyle}">${it.body}</p>
                </div>`
                )
                .join('')}
            </td>
          </tr>
        </table>
      </td>
    </tr>`;

  const goldRule = `
    <tr>
      <td class="px" style="padding:32px 40px;">
        <div style="height:2px;width:48px;background:#F3A51D;line-height:0;font-size:0;margin:0 auto;">&nbsp;</div>
      </td>
    </tr>`;

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="color-scheme" content="light only" />
<meta name="supported-color-schemes" content="light only" />
<title>The Busby Sleep Guide</title>
<style>
  :root { color-scheme: light only; supported-color-schemes: light only; }
  @media only screen and (max-width: 600px) {
    .container { width:100% !important; }
    .px { padding-left:24px !important; padding-right:24px !important; }
    .h1 { font-size:36px !important; line-height:1.1 !important; }
    .btn { display:block !important; width:100% !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#faf8f5;">
  <div style="display:none;visibility:hidden;mso-hide:all;height:0;width:0;overflow:hidden;font-size:1px;line-height:1px;color:#faf8f5;opacity:0;">
    Twelve pages, one email. Everything you need to choose a mattress.
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#faf8f5;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" class="container" style="width:600px;max-width:600px;">

          <!-- Header -->
          <tr>
            <td class="px" style="padding:0 40px 8px 40px;">
              <div style="font-family:Georgia,'Times New Roman',serif;font-weight:700;letter-spacing:0.32em;font-size:14px;color:#203552;">BUSBY</div>
            </td>
          </tr>

          <!-- Hero -->
          <tr>
            <td class="px" style="padding:32px 40px 0 40px;">
              <h1 class="h1" style="margin:0;font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:44px;line-height:1.05;color:#203552;letter-spacing:-0.01em;">
                Welcome to Busby.
              </h1>
            </td>
          </tr>

          <!-- Gold rule -->
          <tr>
            <td class="px" style="padding:24px 40px 0 40px;">
              <div style="height:2px;width:48px;background:#F3A51D;line-height:0;font-size:0;">&nbsp;</div>
            </td>
          </tr>

          <!-- Intro -->
          <tr>
            <td class="px" style="padding:24px 40px 0 40px;">
              <p style="margin:0;${bodyStyle}">
                Thanks for joining the list. We promised a sleep guide — here it is. Twelve pages of bedding expertise, distilled into one email so you don't have to print anything.
              </p>
              <p style="margin:14px 0 0 0;${bodyStyle}">
                It comes in three parts: what makes a mattress good, how to tell what's actually inside one, and how to match a mattress to the way you actually sleep.
              </p>
            </td>
          </tr>

          ${goldRule}

          ${chapter({
            number: 'Chapter one',
            title: 'The six essentials of a great mattress.',
            intro:
              "A mattress only needs to do six things well. If it nails these, the brand on the label barely matters. If it misses any one of them, the others can't make up for it.",
            items: [
              {
                head: 'Support',
                body:
                  'Your spine should stay neutral — not arched, not sagging — whether you sleep on your side, back, or stomach. Press your palm into the mattress: a good one pushes back evenly in a few seconds. A bad one keeps caving.',
              },
              {
                head: 'Feel',
                body:
                  "Soft, medium, firm — this is personal. Match it to your body, not to a chart. Side sleepers usually want softer at the shoulder and hip; stomach sleepers usually need firmer to keep the spine from bowing.",
              },
              {
                head: 'Temperature',
                body:
                  'Foam traps heat, coils breathe. Wool, latex, and breathable covers help. If "cooling gel" is the only answer to your hot-sleeper question, ask what else is going on underneath.',
              },
              {
                head: 'Stability',
                body:
                  'Edge support matters more than people expect. Sit on the corner. If you slide off, the mattress is going to feel smaller than it is — and harder on the perimeter coils long-term.',
              },
              {
                head: 'Motion isolation',
                body:
                  "If you share the bed, this is the one you'll feel every night. Pocketed coils and dense foam absorb motion. Continuous coils transfer it.",
              },
              {
                head: 'Materials',
                body:
                  "Density and certifications tell the truth. Polyfoam under 1.5 lb/ft³ flattens fast. Memory foam under 3 lb/ft³ sags. Look for CertiPUR-US, OEKO-TEX, or GOLS — they're not marketing.",
              },
            ],
          })}

          ${goldRule}

          ${chapter({
            number: 'Chapter two',
            title: "How to tell what's actually in your mattress.",
            intro:
              "Most mattresses lie about what they are. The phrases below sound specific but mean nothing on their own. Here's the translation key, and the questions that get you a real answer.",
            items: [
              {
                head: '"Eco-friendly"',
                body:
                  "On its own, this means nothing. The certifications that do mean something: GOTS (organic textile), GOLS (organic latex), CertiPUR-US (foam emissions and density), Greenguard Gold (low VOCs), OEKO-TEX (no harmful chemicals).",
              },
              {
                head: '"Memory foam"',
                body:
                  "This covers at least five different chemistries with five different lifespans. Ask the seller for the foam density in lb/ft³. Anything 4+ will last. Anything under 3 won't make it past year three.",
              },
              {
                head: '"Hybrid"',
                body:
                  "Coils plus foam. In most cases this beats all-foam — the coils keep airflow and edge support that foam can't match. The questions that matter: how many coils, what gauge wire (lower number = thicker), and pocketed or continuous?",
              },
              {
                head: '"Cooling"',
                body:
                  'Phase-change covers and gel beads help on the surface for ten or twenty minutes. After that, what cools the mattress is airflow. Coils breathe. Latex breathes. Solid memory foam does not.',
              },
              {
                head: '"Handcrafted in the USA"',
                body:
                  'Ask where, by whom, and what percentage of the materials are also from the US. Most "USA" mattresses use imported foam and imported covers, assembled here.',
              },
            ],
          })}

          ${goldRule}

          ${chapter({
            number: 'Chapter three',
            title: 'Match the mattress to how you actually sleep.',
            intro:
              "Forget what the showroom tag says. Buy for the way you actually sleep — including the parts that aren't in the brochure (you sleep hot, your partner moves, you read in bed for an hour first).",
            items: [
              {
                head: 'If you sleep on your side',
                body:
                  'Softer at the shoulder and hip, firmer through the lumbar. Most mattresses labeled "medium" lean too firm for proper side sleeping. Test by lying for at least ten minutes — pressure points show up after five.',
              },
              {
                head: 'If you sleep on your back',
                body:
                  "Medium-firm. The mattress should feel even from neck to lumbar — no arch, no sag. Slide your hand under the small of your back: if there's a real gap, the mattress is too firm.",
              },
              {
                head: 'If you sleep on your stomach',
                body:
                  "Firm. Most stomach sleepers wake up sore on softer mattresses because the hips sink and the spine bows. A medium-firm pillow (or none at all) helps too.",
              },
              {
                head: 'If you sleep hot',
                body:
                  "Look for: wool, latex, breathable knit covers (not polyester satin), open-cell foams. Avoid: closed-cell memory foam without coils underneath. Sheets matter — percale and linen breathe; sateen doesn't.",
              },
              {
                head: 'If you share the bed',
                body:
                  'Pocketed coils plus a thin foam comfort layer give you motion isolation without trapping heat. Buy a king if your bedroom can take one — the difference between a queen and a king is mostly your shoulders.',
              },
              {
                head: "If you read or work in bed",
                body:
                  "Edge support matters more than for anyone else. Sit on the side of the mattress for two minutes. If your hip drops, you'll be picking the mattress wrong for that hour you spend sitting up every night.",
              },
            ],
          })}

          ${goldRule}

          <!-- Closing -->
          <tr>
            <td class="px" style="padding:0 40px;font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:18px;line-height:1.6;color:#203552;">
              That's the guide. If you want to talk through any of it, hit reply — we read every message. And if you want to feel the difference, book a visit to the Elmhurst showroom — 9 AM–7 PM daily, or walk in Mon–Thu, 10 AM–2 PM.
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td class="px" style="padding:28px 40px 0 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td class="btn" align="center" style="border-radius:999px;background:#203552;mso-padding-alt:14px 28px;">
                    <a href="https://mybusby.com/appointment" target="_blank" rel="noopener" style="display:inline-block;padding:14px 28px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;color:#faf8f5;text-decoration:none;border-radius:999px;">
                      Visit the showroom
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sign-off -->
          <tr>
            <td class="px" style="padding:24px 40px 0 40px;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#203552;">
              — The Busby team
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td class="px" style="padding:40px 40px 0 40px;">
              <div style="height:1px;background:#e6dccd;line-height:0;font-size:0;">&nbsp;</div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="px" style="padding:20px 40px 40px 40px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:#8a8174;">
              ${escapeHtml(elmhurstStore.name)} · ${escapeHtml(formatAddress(elmhurstStore.address))}<br/>
              You're receiving this because you signed up at mybusby.com.
              <a href="${unsubscribeMailto}" style="color:#8a8174;text-decoration:underline;">Unsubscribe</a>.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    'Welcome to Busby.',
    '',
    "Thanks for joining the list. We promised a sleep guide — here it is. Twelve pages of bedding expertise, distilled into one email.",
    '',
    'It comes in three parts: what makes a mattress good, how to tell what is actually inside one, and how to match a mattress to the way you sleep.',
    '',
    '— CHAPTER ONE —',
    'The six essentials of a great mattress.',
    '',
    'Support — Your spine should stay neutral on side, back, or stomach. A good mattress pushes back evenly; a bad one keeps caving.',
    'Feel — Soft, medium, firm is personal. Match it to your body, not a chart.',
    'Temperature — Foam traps heat, coils breathe. Wool and latex help.',
    'Stability — Edge support matters. Sit on the corner; if you slide off, the bed will feel smaller than it is.',
    'Motion isolation — Pocketed coils and dense foam absorb motion. Continuous coils transfer it.',
    'Materials — Density and certifications tell the truth. Look for CertiPUR-US, OEKO-TEX, or GOLS.',
    '',
    '— CHAPTER TWO —',
    "How to tell what's actually in your mattress.",
    '',
    '"Eco-friendly" on its own means nothing. The real ones: GOTS, GOLS, CertiPUR-US, Greenguard Gold, OEKO-TEX.',
    '"Memory foam" hides five different chemistries. Ask the density in lb/ft³. 4+ lasts. Under 3 sags by year three.',
    '"Hybrid" = coils + foam. Ask coil count, gauge, and whether they\'re pocketed.',
    '"Cooling" works for ten or twenty minutes. After that, airflow cools — and solid foam does not breathe.',
    '"Handcrafted in the USA" — ask where, by whom, and how much of the material is also American.',
    '',
    '— CHAPTER THREE —',
    'Match the mattress to how you actually sleep.',
    '',
    'Side sleepers — Softer at the shoulder and hip, firmer through the lumbar.',
    'Back sleepers — Medium-firm. Even from neck to lumbar, no gap at the small of the back.',
    'Stomach sleepers — Firm. Soft mattresses make hips sink and the spine bow.',
    'Hot sleepers — Wool, latex, breathable knit covers, open-cell foams. Skip closed-cell foam without coils.',
    'Couples — Pocketed coils plus a thin foam comfort layer. King > queen if the room allows.',
    'In-bed readers — Edge support matters more than for anyone else.',
    '',
    "That's the guide. Reply to this email if you want to talk through any of it.",
    'And if you want to feel the difference, book a visit to the Elmhurst showroom — 9 AM–7 PM daily, or walk in Mon–Thu, 10 AM–2 PM: https://mybusby.com/appointment',
    '',
    '— The Busby team',
    '',
    '---',
    `${elmhurstStore.name} · ${formatAddress(elmhurstStore.address)}`,
    `You're receiving this because you signed up at mybusby.com.`,
    `Unsubscribe: ${unsubscribeMailto}`,
  ].join('\n');

  return {
    subject: 'The Busby Sleep Guide.',
    html,
    text,
    headers: {
      'List-Unsubscribe': `<${unsubscribeMailto}>`,
      'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    },
  };
}

// --- Quiz match --------------------------------------------------------------

export interface QuizMatchPayload {
  email: string;
  productName: string;
  productSlug: string;
  firmness: string;
  headline: string;
}

/**
 * The email a quiz-taker actually asked for: their result, not a generic PDF.
 * The quiz is the best-engaged page on the site (36s average against 3s on the
 * gated guide), so the result IS the lead magnet — and unlike a download it
 * points at a bed rather than a folder.
 */
export function renderUserQuizMatchEmail(payload: QuizMatchPayload): {
  subject: string;
  html: string;
  text: string;
  headers: Record<string, string>;
} {
  const unsubscribeMailto = `mailto:${env.LEADS_INBOX_EMAIL}?subject=Unsubscribe&body=Please%20remove%20${encodeURIComponent(payload.email)}%20from%20the%20list.`;
  const productUrl = `${SITE_ORIGIN}/products/${encodeURIComponent(payload.productSlug)}?firmness=${encodeURIComponent(payload.firmness)}`;
  const fittingUrl = `${SITE_ORIGIN}/book-a-fitting`;
  const name = escapeHtml(payload.productName);
  const firmness = escapeHtml(payload.firmness);

  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#faf8f5;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Your match: ${name}, ${firmness}.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#faf8f5;">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:#ffffff;border:1px solid #e6dccd;border-radius:14px;">
        <tr><td style="padding:36px 36px 8px 36px;font-family:Georgia,'Times New Roman',serif;color:#D4792C;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">Your match</td></tr>
        <tr><td style="padding:8px 36px 0 36px;font-family:Georgia,'Times New Roman',serif;color:#203552;font-size:28px;line-height:1.25;">${name}</td></tr>
        <tr><td style="padding:10px 36px 0 36px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#203552;font-size:16px;line-height:1.6;">
          Recommended firmness: <strong>${firmness}</strong>.<br/>${escapeHtml(payload.headline)}
        </td></tr>
        <tr><td style="padding:26px 36px 0 36px;">
          <a href="${productUrl}" style="display:inline-block;padding:13px 28px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;color:#203552;background:#F3A51D;text-decoration:none;border-radius:999px;">See the ${name}</a>
        </td></tr>
        <tr><td style="padding:26px 36px 36px 36px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#5c5c5c;font-size:15px;line-height:1.6;border-top:1px solid #f0e9dd;margin-top:20px;">
          A quiz can only get you close. If you are near Chicago we will have this one made up and
          ready when you come in, plus the two it was closest to, so you can feel the difference.
          <br/><br/>
          <a href="${fittingUrl}" style="color:#203552;border-bottom:1px solid #F3A51D;text-decoration:none;">Book a free fitting</a>
          &nbsp;·&nbsp; Or just reply to this email with a question. A person reads it.
        </td></tr>
      </table>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
        <tr><td style="padding:18px 36px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#8a8174;font-size:12px;line-height:1.6;">
          You are receiving this because you took the quiz at mybusby.com.
          <a href="${unsubscribeMailto}" style="color:#8a8174;">Unsubscribe</a>.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const text = [
    `Your match: ${payload.productName}`,
    '',
    `Recommended firmness: ${payload.firmness}`,
    payload.headline,
    '',
    `See it: ${productUrl}`,
    '',
    'A quiz can only get you close. If you are near Chicago we will have this one made up',
    'and ready when you come in, plus the two it was closest to, so you can feel the difference.',
    `Book a free fitting: ${fittingUrl}`,
    '',
    'Or just reply to this email with a question. A person reads it.',
    '',
    '---',
    'You are receiving this because you took the quiz at mybusby.com.',
    `Unsubscribe: ${unsubscribeMailto}`,
  ].join('\n');

  return {
    subject: `Your match: ${payload.productName}.`,
    html,
    text,
    headers: {
      'List-Unsubscribe': `<${unsubscribeMailto}>`,
      'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    },
  };
}

export async function sendUserQuizMatchEmail(payload: QuizMatchPayload): Promise<void> {
  const { subject, html, text, headers } = renderUserQuizMatchEmail(payload);
  assertSent(
    await client().emails.send({
      from: env.EMAIL_FROM,
      to: payload.email,
      subject,
      html,
      text,
      headers,
    })
  );
}

export async function sendUserSleepGuideEmail(toEmail: string): Promise<void> {
  const { subject, html, text, headers } = renderUserSleepGuideEmail(toEmail);
  assertSent(
    await client().emails.send({
      from: env.EMAIL_FROM,
      to: toEmail,
      subject,
      html,
      text,
      headers,
    })
  );
}

export interface ReservationPayload {
  name: string;
  email: string;
  phone: string | null;
  preferred_date: string | null;
  time_slot: string | null;
  mattresses: string[];
  notes: string | null;
  source: string;
  location: string;
}

function formatPreferredDate(input: string | null): { full: string; short: string } | null {
  if (!input) return null;
  const [y, m, d] = input.split('-').map(Number);
  if (!y || !m || !d) return null;
  const dt = new Date(Date.UTC(y, m - 1, d));
  const full = dt.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
  const short = dt
    .toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' })
    .toUpperCase()
    .replace(',', ' ·');
  return { full, short };
}

/**
 * The calendar event for a booking, or null when the reservation lacks a usable
 * date/slot pair (legacy rows — the reserve route requires both now).
 */
function calendarEventFor(payload: ReservationPayload): CalendarEvent | null {
  if (!payload.preferred_date || !payload.time_slot) return null;
  // Same calendar block either way, but a video call must not put the showroom
  // address in the location field: the invitee would drive to Elmhurst.
  if (isVirtualSource(payload.source)) {
    return {
      title: 'Busby video consultation',
      description:
        'Your join link arrives by email before the call. Reply to your confirmation email to change anything.',
      location: 'Video call',
      date: payload.preferred_date,
      timeSlot: payload.time_slot,
    };
  }
  return {
    title: 'Busby showroom visit',
    description:
      'Looking forward to seeing you. Reply to your confirmation email to change anything.',
    location: `${elmhurstStore.name}, ${formatAddress(elmhurstStore.address)}`,
    date: payload.preferred_date,
    timeSlot: payload.time_slot,
  };
}

export function renderUserReservationEmail(payload: ReservationPayload): {
  subject: string;
  html: string;
  text: string;
} {
  const store = elmhurstStore;
  const addressText = formatAddress(store.address);
  // A video booking has no address and no showroom hours. Everything else about
  // the email — the date pill, the calendar attachment, the reply-to-us line —
  // is identical, so only the location block and the wording change.
  const virtual = isVirtualSource(payload.source);
  const date = formatPreferredDate(payload.preferred_date);
  const slotPretty = payload.time_slot ? formatSlot(payload.time_slot) : null;
  const calEvent = calendarEventFor(payload);
  const googleUrl = calEvent ? googleCalendarUrl(calEvent) : null;
  const outlookUrl = calEvent ? outlookCalendarUrl(calEvent) : null;

  const noun = virtual ? 'call' : 'visit';
  const preheader = date
    ? `You're booked for ${date.full}${slotPretty ? ` at ${slotPretty}` : ''} — here are the details.`
    : `Your ${noun} is booked — here are the details.`;

  const datePill = date
    ? `
        <tr>
          <td class="px" style="padding:24px 40px 0 40px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="background:#F3A51D;border-radius:999px;padding:8px 16px;font-family:Georgia,'Times New Roman',serif;color:#203552;font-size:13px;font-weight:700;letter-spacing:0.12em;">
                  ${escapeHtml(date.short)}
                </td>
              </tr>
            </table>
            ${
              slotPretty
                ? `<div style="margin-top:10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#4a5568;font-size:15px;">${escapeHtml(slotPretty)}</div>`
                : ''
            }
          </td>
        </tr>`
    : '';

  const mattressesRow = payload.mattresses.length
    ? `
            <tr>
              <td style="padding:18px 0 0 0;font-family:Georgia,'Times New Roman',serif;color:#D4792C;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">On your list</td>
            </tr>
            <tr>
              <td style="padding:6px 0 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#203552;font-size:16px;line-height:1.5;">
                ${escapeHtml(payload.mattresses.join(', '))}
              </td>
            </tr>`
    : '';

  // Add-to-calendar is the single highest-value action in this email — a booking
  // on the customer's calendar is the one that gets shown up for. So it gets its
  // own card above the details rather than a button sharing a row with
  // "directions", with the provider logos to make it scannable.
  //
  // Logos are remote images: Outlook desktop blocks those by default, so each
  // button must still read correctly as text alone. Hence the label carries the
  // meaning and the logo is decorative (alt="" ), not load-bearing.
  const calendarCard =
    googleUrl || outlookUrl
      ? `
          <tr>
            <td class="px" style="padding:28px 40px 0 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border-radius:14px;border:2px solid #F3A51D;">
                <tr>
                  <td style="padding:24px 24px 22px 24px;" align="center">
                    <div style="font-family:Georgia,'Times New Roman',serif;color:#203552;font-size:18px;font-weight:700;">
                      Put it on your calendar
                    </div>
                    <div style="margin-top:6px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#5a6577;font-size:14px;line-height:1.5;">
                      One tap so it's waiting for you with a reminder.
                    </div>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" class="cal-row" style="margin-top:18px;">
                      <tr>
                        ${
                          googleUrl
                            ? `<td class="cal-btn" align="center" style="border-radius:10px;border:1.5px solid #dadce0;background:#ffffff;mso-padding-alt:12px 18px;">
                          <a href="${googleUrl}" target="_blank" rel="noopener" style="display:inline-block;padding:11px 18px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;color:#203552;text-decoration:none;">
                            <img src="${SITE_ORIGIN}/email/google-calendar.png" width="20" height="20" alt="" style="vertical-align:middle;border:0;margin-right:9px;" />Google Calendar
                          </a>
                        </td>
                        <td class="cal-spacer" style="width:10px;font-size:0;line-height:0;">&nbsp;</td>`
                            : ''
                        }
                        ${
                          outlookUrl
                            ? `<td class="cal-btn" align="center" style="border-radius:10px;border:1.5px solid #dadce0;background:#ffffff;mso-padding-alt:12px 18px;">
                          <a href="${outlookUrl}" target="_blank" rel="noopener" style="display:inline-block;padding:11px 18px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;color:#203552;text-decoration:none;">
                            <img src="${SITE_ORIGIN}/email/outlook.png" width="20" height="20" alt="" style="vertical-align:middle;border:0;margin-right:9px;" />Outlook
                          </a>
                        </td>`
                            : ''
                        }
                      </tr>
                    </table>
                    <div style="margin-top:14px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#8a8174;font-size:12.5px;line-height:1.5;">
                      Apple Calendar or something else? Open the <strong style="color:#5a6577;">.ics</strong> file attached to this email.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`
      : '';

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="color-scheme" content="light only" />
<meta name="supported-color-schemes" content="light only" />
<title>Your Busby showroom visit</title>
<style>
  :root { color-scheme: light only; supported-color-schemes: light only; }
  @media only screen and (max-width: 600px) {
    .container { width:100% !important; }
    .px { padding-left:24px !important; padding-right:24px !important; }
    .h1 { font-size:34px !important; line-height:1.1 !important; }
    .btn { display:block !important; width:100% !important; }
    .btn-spacer { display:none !important; }
    .btn-row td { display:block !important; width:100% !important; }
    .btn-row td + td { margin-top:12px !important; }
    /* Calendar buttons stack on narrow screens; the spacer cell would otherwise
       become a full-width empty row between them. */
    .cal-row, .cal-row tr, .cal-btn { display:block !important; width:100% !important; }
    .cal-btn { margin-bottom:10px !important; }
    .cal-spacer { display:none !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#faf8f5;">
  <div style="display:none;visibility:hidden;mso-hide:all;height:0;width:0;overflow:hidden;font-size:1px;line-height:1px;color:#faf8f5;opacity:0;">
    ${escapeHtml(preheader)}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#faf8f5;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" class="container" style="width:600px;max-width:600px;">
          <tr>
            <td class="px" style="padding:0 40px 8px 40px;">
              <div style="font-family:Georgia,'Times New Roman',serif;font-weight:700;letter-spacing:0.32em;font-size:14px;color:#203552;">BUSBY</div>
            </td>
          </tr>
          <tr>
            <td class="px" style="padding:32px 40px 0 40px;">
              <h1 class="h1" style="margin:0;font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:40px;line-height:1.1;color:#203552;letter-spacing:-0.01em;">
                See you soon,<br/>${escapeHtml(payload.name)}.
              </h1>
            </td>
          </tr>
          <tr>
            <td class="px" style="padding:24px 40px 0 40px;">
              <div style="height:2px;width:48px;background:#F3A51D;line-height:0;font-size:0;">&nbsp;</div>
            </td>
          </tr>
          ${datePill}
          ${calendarCard}
          <tr>
            <td class="px" style="padding:24px 40px 0 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border-radius:14px;border:1px solid #e6dccd;">
                <tr>
                  <td style="padding:28px 28px 24px 28px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="font-family:Georgia,'Times New Roman',serif;color:#D4792C;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">${virtual ? 'How to join' : 'Address'}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#203552;font-size:16px;line-height:1.5;">
                          ${
                            virtual
                              ? `Rob will email you a link before your call. It opens in your browser, so there is nothing to download.`
                              : `${escapeHtml(store.address.street)}<br/>
                          ${escapeHtml(store.address.city)}, ${escapeHtml(store.address.state)} ${escapeHtml(store.address.zip)}<br/>
                          <a href="${store.mapsLink}" target="_blank" rel="noopener" style="color:#203552;text-decoration:none;border-bottom:1px solid #F3A51D;">Get directions</a>`
                          }
                        </td>
                      </tr>
                      ${
                        virtual
                          ? ''
                          : `<tr>
                        <td style="padding:18px 0 0 0;font-family:Georgia,'Times New Roman',serif;color:#D4792C;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">Hours</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#203552;font-size:16px;line-height:1.5;">
                          ${escapeHtml(store.hours)}
                        </td>
                      </tr>`
                      }
                      <tr>
                        <td style="padding:18px 0 0 0;font-family:Georgia,'Times New Roman',serif;color:#D4792C;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">Phone</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#203552;font-size:16px;line-height:1.5;">
                          <a href="tel:${escapeHtml(store.phoneE164)}" style="color:#203552;text-decoration:none;border-bottom:1px solid #F3A51D;">${escapeHtml(store.phone)}</a>
                        </td>
                      </tr>
                      ${mattressesRow}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="px" style="padding:24px 40px 0 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" class="btn-row">
                <tr>
                  <td class="btn" align="center" style="border-radius:999px;border:1.5px solid #203552;mso-padding-alt:13px 28px;">
                    <a href="${store.mapsLink}" target="_blank" rel="noopener" style="display:inline-block;padding:12px 26px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;color:#203552;text-decoration:none;border-radius:999px;">
                      Get directions
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="px" style="padding:36px 40px 0 40px;font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:17px;line-height:1.6;color:#203552;">
              Anything change — different time, more questions, can't make it — just reply to this email and we'll sort it.
            </td>
          </tr>
          <tr>
            <td class="px" style="padding:14px 40px 0 40px;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#203552;">
              — The Busby team
            </td>
          </tr>
          <tr>
            <td class="px" style="padding:40px 40px 0 40px;">
              <div style="height:1px;background:#e6dccd;line-height:0;font-size:0;">&nbsp;</div>
            </td>
          </tr>
          <tr>
            <td class="px" style="padding:20px 40px 40px 40px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:#8a8174;">
              ${escapeHtml(store.name)} · ${escapeHtml(addressText)}<br/>
              You're receiving this because you reserved a visit at mybusby.com.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    `See you soon, ${payload.name}.`,
    '',
    date
      ? `You're booked for ${date.full}${slotPretty ? ` at ${slotPretty}` : ''}.`
      : `Your ${noun} is booked.`,
    '',
    ...(virtual
      ? [
          'HOW TO JOIN',
          'Rob will email you a link before your call. It opens in your browser,',
          'so there is nothing to download.',
        ]
      : [
          'ADDRESS',
          store.address.street,
          `${store.address.city}, ${store.address.state} ${store.address.zip}`,
          `Directions: ${store.mapsLink}`,
          '',
          `HOURS`,
          store.hours,
        ]),
    '',
    `PHONE`,
    `${store.phone} (tel:${store.phoneE164})`,
    payload.mattresses.length ? `\nON YOUR LIST\n${payload.mattresses.join(', ')}` : '',
    googleUrl || outlookUrl
      ? [
          '',
          'PUT IT ON YOUR CALENDAR',
          googleUrl ? `Google Calendar: ${googleUrl}` : '',
          outlookUrl ? `Outlook: ${outlookUrl}` : '',
          'Apple Calendar or anything else: open the .ics file attached to this email.',
        ]
          .filter(Boolean)
          .join('\n')
      : '',
    '',
    `Anything change — different time, more questions, can't make it — just reply to this email.`,
    '',
    '— The Busby team',
    '',
    '---',
    `${store.name} · ${addressText}`,
    `You're receiving this because you reserved a visit at mybusby.com.`,
  ]
    .filter((line) => line !== '')
    .join('\n');

  return {
    subject: virtual ? 'Your Busby video call is booked.' : 'Your Busby showroom visit is booked.',
    html,
    text,
  };
}

export async function sendUserReservationEmail(payload: ReservationPayload): Promise<void> {
  const { subject, html, text } = renderUserReservationEmail(payload);

  // The .ics covers every client the two URL buttons can't — Apple Calendar,
  // Outlook desktop, and the default calendar on both mobile platforms.
  const calEvent = calendarEventFor(payload);
  const ics = calEvent ? buildIcs(calEvent, `${payload.email}|${payload.preferred_date}|${payload.time_slot}`) : null;

  assertSent(
    await client().emails.send({
      from: env.EMAIL_FROM,
      to: payload.email,
      replyTo: env.RESERVATIONS_INBOX_EMAIL,
      subject,
      html,
      text,
      ...(ics
        ? {
            attachments: [
              {
                filename: 'busby-showroom-visit.ics',
                content: Buffer.from(ics, 'utf8').toString('base64'),
                contentType: 'text/calendar; charset=utf-8; method=PUBLISH',
              },
            ],
          }
        : {}),
    })
  );
}

export function renderUserReminderEmail(payload: ReservationPayload): {
  subject: string;
  html: string;
  text: string;
} {
  const store = elmhurstStore;
  const addressText = formatAddress(store.address);
  const slotPretty = payload.time_slot ? formatSlot(payload.time_slot) : null;
  // First name only — a reminder should read like a note, not a form letter.
  const firstName = payload.name.trim().split(/\s+/)[0] || payload.name;

  const preheader = slotPretty
    ? `Your Busby visit is today at ${slotPretty}. ${store.address.street}, ${store.address.city}.`
    : `Your Busby visit is today. ${store.address.street}, ${store.address.city}.`;

  const timePill = slotPretty
    ? `
        <tr>
          <td class="px" style="padding:24px 40px 0 40px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="background:#F3A51D;border-radius:999px;padding:8px 16px;font-family:Georgia,'Times New Roman',serif;color:#203552;font-size:13px;font-weight:700;letter-spacing:0.12em;">
                  TODAY · ${escapeHtml(slotPretty.toUpperCase())}
                </td>
              </tr>
            </table>
          </td>
        </tr>`
    : '';

  const mattressesRow = payload.mattresses.length
    ? `
            <tr>
              <td style="padding:18px 0 0 0;font-family:Georgia,'Times New Roman',serif;color:#D4792C;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">We'll have these ready</td>
            </tr>
            <tr>
              <td style="padding:6px 0 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#203552;font-size:16px;line-height:1.5;">
                ${escapeHtml(payload.mattresses.join(', '))}
              </td>
            </tr>`
    : '';

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="color-scheme" content="light only" />
<meta name="supported-color-schemes" content="light only" />
<title>Your Busby visit is today</title>
<style>
  :root { color-scheme: light only; supported-color-schemes: light only; }
  @media only screen and (max-width: 600px) {
    .container { width:100% !important; }
    .px { padding-left:24px !important; padding-right:24px !important; }
    .h1 { font-size:34px !important; line-height:1.1 !important; }
    .btn { display:block !important; width:100% !important; }
    .btn-row td { display:block !important; width:100% !important; }
    .btn-row td + td { margin-top:12px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#faf8f5;">
  <div style="display:none;visibility:hidden;mso-hide:all;height:0;width:0;overflow:hidden;font-size:1px;line-height:1px;color:#faf8f5;opacity:0;">
    ${escapeHtml(preheader)}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#faf8f5;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" class="container" style="width:600px;max-width:600px;">
          <tr>
            <td class="px" style="padding:0 40px 8px 40px;">
              <div style="font-family:Georgia,'Times New Roman',serif;font-weight:700;letter-spacing:0.32em;font-size:14px;color:#203552;">BUSBY</div>
            </td>
          </tr>
          <tr>
            <td class="px" style="padding:32px 40px 0 40px;">
              <h1 class="h1" style="margin:0;font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:40px;line-height:1.1;color:#203552;letter-spacing:-0.01em;">
                Today's the day,<br/>${escapeHtml(firstName)}.
              </h1>
            </td>
          </tr>
          <tr>
            <td class="px" style="padding:24px 40px 0 40px;">
              <div style="height:2px;width:48px;background:#F3A51D;line-height:0;font-size:0;">&nbsp;</div>
            </td>
          </tr>
          ${timePill}
          <tr>
            <td class="px" style="padding:24px 40px 0 40px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#3a4a64;font-size:16px;line-height:1.65;">
              ${
                slotPretty
                  ? `Just a note that we're expecting you at <strong style="color:#203552;">${escapeHtml(slotPretty)}</strong> in Elmhurst. Wear something you can lie down in — the only way to know a mattress is to spend ten minutes on it.`
                  : `Just a note that we're expecting you in Elmhurst today. Wear something you can lie down in — the only way to know a mattress is to spend ten minutes on it.`
              }
            </td>
          </tr>
          <tr>
            <td class="px" style="padding:28px 40px 0 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border-radius:14px;border:1px solid #e6dccd;">
                <tr>
                  <td style="padding:28px 28px 24px 28px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="font-family:Georgia,'Times New Roman',serif;color:#D4792C;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">Where</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#203552;font-size:16px;line-height:1.5;">
                          ${escapeHtml(store.address.street)}<br/>
                          ${escapeHtml(store.address.city)}, ${escapeHtml(store.address.state)} ${escapeHtml(store.address.zip)}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:18px 0 0 0;font-family:Georgia,'Times New Roman',serif;color:#D4792C;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">Phone</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#203552;font-size:16px;line-height:1.5;">
                          <a href="tel:${escapeHtml(store.phoneE164)}" style="color:#203552;text-decoration:none;border-bottom:1px solid #F3A51D;">${escapeHtml(store.phone)}</a>
                        </td>
                      </tr>
                      ${mattressesRow}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="px" style="padding:24px 40px 0 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" class="btn-row">
                <tr>
                  <td class="btn" align="center" style="border-radius:999px;background:#203552;mso-padding-alt:14px 28px;">
                    <a href="${store.mapsLink}" target="_blank" rel="noopener" style="display:inline-block;padding:14px 28px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;color:#faf8f5;text-decoration:none;border-radius:999px;">
                      Get directions
                    </a>
                  </td>
                  <td style="width:12px;font-size:0;line-height:0;">&nbsp;</td>
                  <td class="btn" align="center" style="border-radius:999px;border:1.5px solid #203552;mso-padding-alt:13px 28px;">
                    <a href="tel:${escapeHtml(store.phoneE164)}" style="display:inline-block;padding:12px 26px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;color:#203552;text-decoration:none;border-radius:999px;">
                      Call the showroom
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="px" style="padding:36px 40px 0 40px;font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:17px;line-height:1.6;color:#203552;">
              Running late or something came up? Reply to this email or give us a call — no problem either way.
            </td>
          </tr>
          <tr>
            <td class="px" style="padding:14px 40px 0 40px;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#203552;">
              — The Busby team
            </td>
          </tr>
          <tr>
            <td class="px" style="padding:40px 40px 0 40px;">
              <div style="height:1px;background:#e6dccd;line-height:0;font-size:0;">&nbsp;</div>
            </td>
          </tr>
          <tr>
            <td class="px" style="padding:20px 40px 40px 40px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:#8a8174;">
              ${escapeHtml(store.name)} · ${escapeHtml(addressText)}<br/>
              You're receiving this because you reserved a visit at mybusby.com.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    `Today's the day, ${firstName}.`,
    '',
    slotPretty
      ? `We're expecting you at ${slotPretty} today in Elmhurst.`
      : `We're expecting you in Elmhurst today.`,
    'Wear something you can lie down in — the only way to know a mattress is to spend ten minutes on it.',
    '',
    'WHERE',
    store.address.street,
    `${store.address.city}, ${store.address.state} ${store.address.zip}`,
    `Directions: ${store.mapsLink}`,
    '',
    'PHONE',
    `${store.phone} (tel:${store.phoneE164})`,
    payload.mattresses.length ? `\nWE'LL HAVE THESE READY\n${payload.mattresses.join(', ')}` : '',
    '',
    'Running late or something came up? Reply to this email or give us a call — no problem either way.',
    '',
    '— The Busby team',
    '',
    '---',
    `${store.name} · ${addressText}`,
    `You're receiving this because you reserved a visit at mybusby.com.`,
  ]
    .filter((line) => line !== '')
    .join('\n');

  return {
    subject: slotPretty
      ? `Today at ${slotPretty} — your Busby showroom visit.`
      : 'Today — your Busby showroom visit.',
    html,
    text,
  };
}

export async function sendUserReminderEmail(payload: ReservationPayload): Promise<void> {
  const { subject, html, text } = renderUserReminderEmail(payload);
  assertSent(
    await client().emails.send({
      from: env.EMAIL_FROM,
      to: payload.email,
      replyTo: env.RESERVATIONS_INBOX_EMAIL,
      subject,
      html,
      text,
    })
  );
}

/**
 * The final nudge, sent minutes before the visit. Deliberately the shortest
 * template we send: it's read on a phone, probably in a car, so it carries the
 * time, the address, and two tap targets — directions and the showroom's number
 * — and nothing else.
 */
export function renderUserStartingSoonEmail(payload: ReservationPayload): {
  subject: string;
  html: string;
  text: string;
} {
  const store = elmhurstStore;
  const addressText = formatAddress(store.address);
  const slotPretty = payload.time_slot ? formatSlot(payload.time_slot) : null;
  const firstName = payload.name.trim().split(/\s+/)[0] || payload.name;

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="color-scheme" content="light only" />
<meta name="supported-color-schemes" content="light only" />
<title>Your Busby visit starts soon</title>
<style>
  :root { color-scheme: light only; supported-color-schemes: light only; }
  @media only screen and (max-width: 600px) {
    .container { width:100% !important; }
    .px { padding-left:24px !important; padding-right:24px !important; }
    .h1 { font-size:30px !important; }
    .btn-row, .btn-row tr, .btn { display:block !important; width:100% !important; }
    .btn { margin-bottom:10px !important; }
    .btn-spacer { display:none !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#faf8f5;">
  <div style="display:none;visibility:hidden;mso-hide:all;height:0;width:0;overflow:hidden;font-size:1px;line-height:1px;color:#faf8f5;opacity:0;">
    ${escapeHtml(`${store.address.street}, ${store.address.city}. See you in a few minutes.`)}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#faf8f5;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" class="container" style="width:600px;max-width:600px;">
          <tr>
            <td class="px" style="padding:0 40px 8px 40px;">
              <div style="font-family:Georgia,'Times New Roman',serif;font-weight:700;letter-spacing:0.32em;font-size:14px;color:#203552;">BUSBY</div>
            </td>
          </tr>
          <tr>
            <td class="px" style="padding:28px 40px 0 40px;">
              <h1 class="h1" style="margin:0;font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:34px;line-height:1.1;color:#203552;letter-spacing:-0.01em;">
                See you in a few minutes, ${escapeHtml(firstName)}.
              </h1>
            </td>
          </tr>
          <tr>
            <td class="px" style="padding:20px 40px 0 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background:#F3A51D;border-radius:999px;padding:9px 18px;font-family:Georgia,'Times New Roman',serif;color:#203552;font-size:14px;font-weight:700;letter-spacing:0.1em;">
                    ${slotPretty ? escapeHtml(`STARTS AT ${slotPretty.toUpperCase()}`) : 'STARTING SOON'}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="px" style="padding:24px 40px 0 40px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#203552;font-size:17px;line-height:1.55;">
              <strong>${escapeHtml(store.address.street)}</strong><br/>
              ${escapeHtml(store.address.city)}, ${escapeHtml(store.address.state)} ${escapeHtml(store.address.zip)}
            </td>
          </tr>
          <tr>
            <td class="px" style="padding:24px 40px 0 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" class="btn-row">
                <tr>
                  <td class="btn" align="center" style="border-radius:999px;background:#203552;mso-padding-alt:14px 28px;">
                    <a href="${store.mapsLink}" target="_blank" rel="noopener" style="display:inline-block;padding:14px 28px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;font-weight:600;color:#faf8f5;text-decoration:none;border-radius:999px;">
                      Directions
                    </a>
                  </td>
                  <td class="btn-spacer" style="width:12px;font-size:0;line-height:0;">&nbsp;</td>
                  <td class="btn" align="center" style="border-radius:999px;border:1.5px solid #203552;mso-padding-alt:13px 28px;">
                    <a href="tel:${escapeHtml(store.phoneE164)}" style="display:inline-block;padding:13px 26px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;font-weight:600;color:#203552;text-decoration:none;border-radius:999px;">
                      Call ${escapeHtml(store.phone)}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="px" style="padding:28px 40px 0 40px;font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:16px;line-height:1.6;color:#203552;">
              Running behind? Give us a call — we'll hold your spot.
            </td>
          </tr>
          <tr>
            <td class="px" style="padding:32px 40px 0 40px;">
              <div style="height:1px;background:#e6dccd;line-height:0;font-size:0;">&nbsp;</div>
            </td>
          </tr>
          <tr>
            <td class="px" style="padding:16px 40px 32px 40px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:#8a8174;">
              ${escapeHtml(store.name)} · ${escapeHtml(addressText)}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    `See you in a few minutes, ${firstName}.`,
    '',
    slotPretty ? `Your visit starts at ${slotPretty}.` : 'Your visit starts shortly.',
    '',
    store.address.street,
    `${store.address.city}, ${store.address.state} ${store.address.zip}`,
    `Directions: ${store.mapsLink}`,
    `Call: ${store.phone} (tel:${store.phoneE164})`,
    '',
    "Running behind? Give us a call — we'll hold your spot.",
    '',
    '---',
    `${store.name} · ${addressText}`,
  ].join('\n');

  return {
    subject: slotPretty
      ? `Starting soon — your ${slotPretty} visit at Busby.`
      : 'Starting soon — your visit at Busby.',
    html,
    text,
  };
}

export async function sendUserStartingSoonEmail(payload: ReservationPayload): Promise<void> {
  const { subject, html, text } = renderUserStartingSoonEmail(payload);
  assertSent(
    await client().emails.send({
      from: env.EMAIL_FROM,
      to: payload.email,
      replyTo: env.RESERVATIONS_INBOX_EMAIL,
      subject,
      html,
      text,
    })
  );
}

// Recipients for the internal booking notification. Prefer the DB-managed list
// (editable at /admin/notifications); fall back to the RESERVATIONS_INBOX_EMAIL
// env var (comma-separated) whenever the list is empty or unreadable, so alerts
// never silently stop.
async function reservationRecipients(): Promise<string[]> {
  // Validate on every branch: Resend rejects the WHOLE `to` batch if any single
  // address is malformed, so one typo (in the env value or a hand-inserted row)
  // would silently kill alerts to everyone. Drop bad addresses instead.
  try {
    const rows = await listNotificationRecipients();
    const emails = rows.map((r) => r.email.trim()).filter(isValidEmail);
    if (emails.length > 0) return emails;
  } catch (err) {
    console.error('[email] could not load notification recipients; using env fallback', err);
  }
  return env.RESERVATIONS_INBOX_EMAIL.split(',')
    .map((s) => s.trim())
    .filter(isValidEmail);
}

export function renderAdminReservationEmail(payload: ReservationPayload): {
  subject: string;
  html: string;
  text: string;
} {
  const store = elmhurstStore;
  const date = formatPreferredDate(payload.preferred_date);
  const slotPretty = payload.time_slot ? formatSlot(payload.time_slot) : null;
  const whenText = date
    ? `${date.full}${slotPretty ? ` at ${slotPretty}` : ''}`
    : (slotPretty ?? 'No date specified');

  // A video booking needs a human action the in-person one doesn't: somebody has
  // to send the join link. Put it in the subject so it survives a phone's
  // notification preview, and at the top of the body so it can't be scrolled past.
  const virtual = isVirtualSource(payload.source);

  const subject = `${virtual ? 'VIDEO CALL — send join link — ' : 'New booking — '}${payload.name}${
    date ? `, ${date.full}` : ''
  }${slotPretty ? ` at ${slotPretty}` : ''}`;

  const rows: Array<[string, string]> = [
    ['Type', virtual ? '<strong>Video call — send the join link</strong>' : 'In-person fitting'],
    ['When', escapeHtml(whenText)],
    ['Name', escapeHtml(payload.name)],
    [
      'Email',
      `<a href="mailto:${escapeHtml(payload.email)}" style="color:#203552;">${escapeHtml(payload.email)}</a>`,
    ],
  ];
  if (payload.phone) {
    rows.push([
      'Phone',
      `<a href="tel:${escapeHtml(payload.phone)}" style="color:#203552;">${escapeHtml(formatPhone(payload.phone))}</a>`,
    ]);
  }
  if (payload.mattresses.length) {
    rows.push(['Mattresses', escapeHtml(payload.mattresses.join(', '))]);
  }
  if (payload.notes) {
    rows.push(['Notes', escapeHtml(payload.notes)]);
  }
  rows.push(['Location', escapeHtml(store.name)]);
  rows.push(['Source', escapeHtml(payload.source)]);

  const rowsHtml = rows
    .map(
      ([label, value]) => `
            <tr>
              <td style="padding:9px 18px 9px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;color:#8a8174;white-space:nowrap;vertical-align:top;">${label}</td>
              <td style="padding:9px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.5;color:#203552;">${value}</td>
            </tr>`
    )
    .join('');

  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f4f4f5;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f4f5;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="width:560px;max-width:560px;background:#ffffff;border:1px solid #e6dccd;border-radius:12px;">
          <tr>
            <td style="padding:24px 28px 0 28px;">
              <div style="font-family:Georgia,'Times New Roman',serif;font-weight:700;letter-spacing:0.26em;font-size:12px;color:#8a8174;">BUSBY · INTERNAL</div>
              <h1 style="margin:10px 0 0 0;font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:24px;color:#203552;">New showroom booking</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 28px 4px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rowsHtml}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 28px 24px 28px;margin-top:8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;line-height:1.6;color:#8a8174;border-top:1px solid #eee;">
              Reply to this email to reach ${escapeHtml(payload.name)} directly.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    virtual ? 'NEW VIDEO CALL — someone must send the join link' : 'New showroom booking',
    '',
    `Type:       ${virtual ? 'Video call' : 'In-person fitting'}`,
    `When:       ${whenText}`,
    `Name:       ${payload.name}`,
    `Email:      ${payload.email}`,
    payload.phone ? `Phone:      ${formatPhone(payload.phone)}` : '',
    payload.mattresses.length ? `Mattresses: ${payload.mattresses.join(', ')}` : '',
    payload.notes ? `Notes:      ${payload.notes}` : '',
    `Location:   ${store.name}`,
    `Source:     ${payload.source}`,
    '',
    `Reply to this email to reach ${payload.name} directly.`,
  ]
    .filter((l) => l !== '')
    .join('\n');

  return { subject, html, text };
}

export async function sendAdminReservationEmail(payload: ReservationPayload): Promise<void> {
  const to = await reservationRecipients();
  if (to.length === 0) return;
  const { subject, html, text } = renderAdminReservationEmail(payload);
  assertSent(
    await client().emails.send({
      from: env.EMAIL_FROM,
      to,
      replyTo: payload.email,
      subject,
      html,
      text,
    })
  );
}
