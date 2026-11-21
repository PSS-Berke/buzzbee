# Busby — mybusby.com

Next.js (App Router) site for Busby mattresses: catalog, Stripe checkout, showroom and video-call booking, sleep quiz, and a password-protected `/admin`. Deployed on Vercel; data in Neon Postgres; email through Resend.

## Run locally

```bash
vercel env pull .env.local   # or create .env.local by hand, see below
npm install
npm run dev
```

## Environment variables

| Variable | Used for |
|---|---|
| `DATABASE_URL` | Neon Postgres: subscribers, reservations, orders, rate limits |
| `RESEND_API_KEY`, `EMAIL_FROM` | All outgoing email |
| `RESERVATIONS_INBOX_EMAIL` | Fallback team inbox for booking and order alerts (the list at `/admin/notifications` takes precedence) |
| `LEADS_INBOX_EMAIL` | Address in the unsubscribe link of marketing emails |
| `STRIPE_SECRET_KEY` | Checkout sessions |
| `STRIPE_WEBHOOK_SECRET` | Verifies `/api/stripe/webhook` (records paid orders) |
| `ADMIN_USER`, `ADMIN_PASSWORD` | Basic Auth on `/admin` and `/api/admin` |
| `CRON_SECRET` | Authorizes the reminder crons in `vercel.json` |
| `NEXT_PUBLIC_SITE_URL` | Absolute origin for links and images in emails (defaults to `https://mybusby.com`) |

## Database

Migrations are one-shot, idempotent scripts in `scripts/`. Run any you haven't yet:

```bash
node --env-file=.env.local scripts/migrate-orders.mjs
```

## Stripe webhook

In the Stripe Dashboard (Developers → Webhooks), add an endpoint at `https://www.mybusby.com/api/stripe/webhook` for `checkout.session.completed` and `checkout.session.async_payment_succeeded`, then set its signing secret as `STRIPE_WEBHOOK_SECRET`. Stripe Tax must also be active, since checkout uses `automatic_tax`.

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run test:a11y
```
