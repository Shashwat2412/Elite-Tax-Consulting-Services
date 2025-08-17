import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")

  if (!code) {
    // Redirect to Google OAuth
    const googleAuthUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
      `redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&` +
      `response_type=code&` +
      `scope=https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/calendar&` +
      `access_type=offline&` +
      `prompt=consent`

    return NextResponse.redirect(googleAuthUrl)
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      }),
    })

    const tokens = await tokenResponse.json()

    // Store tokens securely (in production, use a database)

    return NextResponse.json({
      success: true,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      message: "Tokens generated successfully. Add these to your environment variables.",
    })
  } catch (error) {
    console.error("Error exchanging code for tokens:", error)
    return NextResponse.json({ error: "Failed to get tokens" }, { status: 500 })
  }
}
