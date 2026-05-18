import { NextRequest, NextResponse } from 'next/server';

export function proxy(req: NextRequest) {
  const user = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSWORD;

  if (!user || !password) {
    return new NextResponse('Admin credentials not configured.', { status: 500 });
  }

  const auth = req.headers.get('authorization');
  const expected = `Basic ${btoa(`${user}:${password}`)}`;

  if (auth !== expected) {
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
