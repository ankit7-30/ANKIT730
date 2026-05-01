import { NextResponse, NextRequest } from 'next/server';


export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  const adminDomain = process.env.ADMIN_DOMAIN || 'z9k-v3-management.com';
  
  // Define which paths are "Admin" paths
  const isAdminPath = url.pathname.startsWith('/admin') || url.pathname.startsWith('/api/upload');

  // Logic:
  // 1. If it's local development (localhost), allow everything.
  // 2. In production, if it's an admin path, only allow it on the ADMIN_DOMAIN.
  // 3. If someone tries to access /admin on the main brand domain, return 404.

  const isLocalhost = hostname.includes('localhost') || hostname.includes('127.0.0.1');
  const isMainDomain = hostname.includes('ankit730.com'); // Replace with your actual public domain
  const isAdminDomain = hostname.includes(adminDomain);

  if (!isLocalhost && isAdminPath) {
    if (isMainDomain && !isAdminDomain) {
      // Hide the admin panel from the main domain by returning a 404
      return new NextResponse(null, { status: 404 });
    }
  }

  return NextResponse.next();
}

// Only run middleware on admin and upload paths for performance
export const config = {
  matcher: ['/admin/:path*', '/api/upload/:path*'],
};
