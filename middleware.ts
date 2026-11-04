import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // docs.snpi.edu.kh -> rewrite root to /document
  if (host.startsWith('docs.snpi.edu.kh')) {
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/document', request.url));
    }
    if (pathname === '/design') {
      return NextResponse.rewrite(new URL('/document/design', request.url));
    }
    if (pathname === '/design-system' || pathname === '/components' || pathname === '/ui-library') {
      return NextResponse.rewrite(new URL('/document/design-system', request.url));
    }
    if (pathname === '/changelog') {
      return NextResponse.rewrite(new URL('/document/changelog', request.url));
    }
    if (pathname === '/open-api') {
      return NextResponse.rewrite(new URL('/document/open-api', request.url));
    }
    if (pathname === '/scaffold') {
      return NextResponse.rewrite(new URL('/document/scaffold', request.url));
    }
    if (pathname === '/states') {
      return NextResponse.rewrite(new URL('/document/states', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - static assets with extensions (.png, .jpg, .svg, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)',
  ],
};
