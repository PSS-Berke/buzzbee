import { NextRequest, NextResponse } from 'next/server';

// Compares two strings in time that depends only on their lengths, so response
// timing can't be used to guess the password a character at a time.
function safeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const x = enc.encode(a);
  const y = enc.encode(b);
  let diff = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  }
  return diff === 0;
}

export function proxy(req: NextRequest) {
  const user = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSWORD;

  if (!user || !password) {
    return new NextResponse('Admin credentials not configured.', { status: 500 });
  }

  const auth = req.headers.get('authorization') ?? '';
  const expected = `Basic ${btoa(`${user}:${password}`)}`;

  if (!safeEqual(auth, expected)) {
    return new NextResponse('Authentication required.', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Busby Admin", charset="UTF-8"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
