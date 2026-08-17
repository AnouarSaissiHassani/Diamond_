import { auth } from "./auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith('/login');

  if (isAuthPage) {
    if (isLoggedIn) {
      return Response.redirect(new URL('/admin', req.nextUrl));
    }
    return;
  }

  // Protect /admin and any other routes if needed
  if (req.nextUrl.pathname.startsWith('/admin') && !isLoggedIn) {
    let from = req.nextUrl.pathname;
    if (req.nextUrl.search) {
      from += req.nextUrl.search;
    }
    return Response.redirect(new URL(`/login?from=${encodeURIComponent(from)}`, req.nextUrl));
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
