import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  // Check for NextAuth v5 session cookies (handles both HTTP and HTTPS environments)
  const token = request.cookies.get('authjs.session-token') || request.cookies.get('__Secure-authjs.session-token');
  const isLoggedIn = !!token;
  
  const isAuthPage = request.nextUrl.pathname.startsWith('/login');

  if (isAuthPage) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next();
  }

  // Protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin') && !isLoggedIn) {
    let from = request.nextUrl.pathname;
    if (request.nextUrl.search) {
      from += request.nextUrl.search;
    }
    return NextResponse.redirect(new URL(`/login?from=${encodeURIComponent(from)}`, request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
