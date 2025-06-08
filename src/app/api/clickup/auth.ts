import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.CLICKUP_CLIENT_ID!;
  const redirectUri = process.env.NEXT_PUBLIC_CLICKUP_REDIRECT_URI!;
  const authUrl = `https://app.clickup.com/api?client_id=${clientId}&redirect_uri=${redirectUri}`;
  return NextResponse.redirect(authUrl);
}
