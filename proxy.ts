import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

const protectedPage = ['/profile', '/users-list', '/transfer'];
const AdminPagesOnly = ['/users-list'];

const secret = new TextEncoder().encode(process.env.JWT_REFRESH_TOKEN_SECRET!);

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('refreshToken')?.value;
  const pathname = request.nextUrl.pathname;

  const isAuthPage =
    pathname === '/sign-in' ||
    pathname === '/sign-up' ||
    pathname === '/forgot-password';

  const isAdminPage = pathname === '/admin' || pathname.startsWith('/admin/');

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
      const { payload } = await jwtVerify(token, secret);
      const role = payload.role as string | undefined;

      if (role !== 'admin' && role !== 'super_admin') {
        return NextResponse.redirect(new URL('/', request.url));
      }
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
    '/transfer',
  ],
};
