import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const hostname = request.headers.get('host') || '';
    const adminDomain = process.env.ADMIN_DOMAIN || 'z9k-v3-management.com';
    const isLocalhost = hostname.includes('localhost') || hostname.includes('127.0.0.1');

    // SECURITY GUARD: Only allow uploads from the Admin Domain or Localhost
    if (!isLocalhost && !hostname.includes(adminDomain)) {
      return NextResponse.json({ error: "Unauthorized: Domain Restricted" }, { status: 403 });
    }
    
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder: "ankit730" },
      process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({ signature, timestamp });
  } catch (error) {
    console.error("Signature Error:", error);
    return NextResponse.json({ error: "Failed to generate signature" }, { status: 500 });
  }
}
