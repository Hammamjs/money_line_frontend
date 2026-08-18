import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const protectedPage = ['/profile', '/users-list'];

const AdminPagesOnly = ['/users-list'];

export function proxy(request: NextRequest) {
  const token = request.cookies.get('refreshToken')?.value;
  const pathname = request.nextUrl.pathname;

  const isAuthPage =
    pathname === '/sign-in' ||
    pathname === '/sign-up' ||
    pathname === '/forgot-password';

  const isAdminPage =
    pathname === '/admin' ||
    pathname === '/transfer' ||
    pathname.startsWith('/admin/');

  const isProtected = isAdminPage || protectedPage.includes(pathname);

  if (!token && isProtected) {
    const signInUrl = new URL('/sign-in', request.url);

    signInUrl.searchParams.set('returnUrl', pathname);

    return NextResponse.redirect(signInUrl);
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const requirementsAdmin = isAdminPage || AdminPagesOnly.includes(pathname);

  if (token && requirementsAdmin) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_REFRESH_TOKEN_SECRET!,
      ) as { role?: string };

      if (decoded?.role !== 'admin' && decoded?.role !== 'super_admin') {
        return NextResponse.redirect(new URL('/', request.url));
      }

      console.log(decoded);
    } catch {
      const singInUrl = new URL('/sign-in', request.url);
      singInUrl.searchParams.set('returnUrl', pathname);
      return NextResponse.redirect(singInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/sign-in',
    '/sign-up',
    '/users-list',
    '/profile',
    '/forgot-password',
  ],
};
