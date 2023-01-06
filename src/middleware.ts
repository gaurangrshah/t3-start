import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const start = Date.now();
  console.log('middleware running...', { start });
  //token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  const whitelist: string[] = ['api/auth', '/'];

  if (whitelist.includes(pathname) || token) {
    console.log('response.next at middleware', null);
    return NextResponse.next();
  }

  //redirect them to login if they don't have token and are
  //requesting a protected route
  const protectedRoutes: string[] = ['/admin'];

  const isProtectedRoute = protectedRoutes.every((path) => path === pathname);

  if (!token && isProtectedRoute) {
    console.log('redirect to login middleware', null);
    // add ?callbackUrl="req.url"
    return NextResponse.redirect(
      new URL(`/auth/signin/?callbackUrl=${req.url}`, req.url)
    );
  }

  const end = Date.now();
  console.log('middleware ended', { start, end, elapsed: end - start });
}

export const config = {
  matcher: '/',
};
