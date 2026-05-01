import { NextResponse } from 'next/server';

// Middleware is kept minimal — all security is handled by:
// 1. Firebase Auth (onAuthStateChanged in admin/layout.tsx)
// 2. Firestore Security Rules (cloud-level identity lock)

export function middleware() {
  return NextResponse.next();
}

// Only run on admin paths for performance
export const config = {
  matcher: ['/admin/:path*'],
};
