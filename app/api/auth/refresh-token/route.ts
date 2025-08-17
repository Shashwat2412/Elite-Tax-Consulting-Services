import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { refresh_token } = await request.json()

    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        refresh_token,
        grant_type: "refresh_token",
      }),
    })

    const tokens = await response.json()

    return NextResponse.json({
      success: true,
      access_token: tokens.access_token,
      expires_in: tokens.expires_in,
    })
  } catch (error) {
    console.error("Error refreshing token:", error)
    return NextResponse.json({ error: "Failed to refresh token" }, { status: 500 })
  }
}
