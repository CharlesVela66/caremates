import { NextRequest, NextResponse } from 'next/server';
import { getSession, updateSession } from './app/api/auth/route';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bypass middleware for static files
  if (pathname.startsWith('/_next') || pathname.startsWith('/static')) {
    return NextResponse.next();
  }

  const session = request.cookies.get('session')?.value;

  if (!session) {
    // Avoid redirect loop by checking if the current path is already '/sign-in'
    if (pathname !== '/sign-in') {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
    return NextResponse.next();
  }

  // Update the session if it exists
  return await updateSession(request);
}
