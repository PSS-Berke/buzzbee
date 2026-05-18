function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        `Set it in Vercel project settings (and pull locally via \`vercel env pull .env.local\`).`
    );
  }
  return value;
}

export const env = {
  get DATABASE_URL() {
    return required('DATABASE_URL');
  },
  get RESEND_API_KEY() {
    return required('RESEND_API_KEY');
  },
  get EMAIL_FROM() {
    return required('EMAIL_FROM');
  },
  get LEADS_INBOX_EMAIL() {
    return required('LEADS_INBOX_EMAIL');
  },
  get RESERVATIONS_INBOX_EMAIL() {
    return required('RESERVATIONS_INBOX_EMAIL');
  },
  get ADMIN_USER() {
    return required('ADMIN_USER');
  },
  get ADMIN_PASSWORD() {
    return required('ADMIN_PASSWORD');
  },
};
