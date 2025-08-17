






import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

async function getValidAccessToken() {
  if (process.env.GOOGLE_REFRESH_TOKEN) {
    try {
      const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: process.env.GOOGLE_CLIENT_ID!,
          client_secret: process.env.GOOGLE_CLIENT_SECRET!,
          refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
          grant_type: "refresh_token",
        }),
      })

      const tokens = await response.json()
      if (tokens.access_token) {
        return tokens.access_token
      }
    } catch (error) {
      console.error("Error refreshing token:", error)
    }
  }

  return process.env.GOOGLE_SHEETS_ACCESS_TOKEN
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Send email notifications for chat interactions
    const emailResults = { clientEmail: false, adminEmail: false }

    try {

      // Email to client (if they provided an email)
      if (data.contact && data.contact.includes("@")) {

        const clientEmailResult = await resend.emails.send({
          from: "Elite Tax Consulting <onboarding@resend.dev>",
          to: [data.contact],
          subject: "Chat Consultation Request Received - Elite Tax Consulting",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #1e40af; margin: 0;">Elite Tax Consulting</h1>
                <p style="color: #6b7280; margin: 5px 0;">Professional Tax & Immigration Services</p>
              </div>
              
              <h2 style="color: #1e40af;">Thank You for Chatting with Us! 💬</h2>
              <p>Dear ${data.name || "Valued Client"},</p>
              <p>We received your inquiry through our chat system and will get back to you shortly.</p>
              
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #374151; margin-top: 0;">Your Chat Request Details:</h3>
                <p><strong>Name:</strong> ${data.name || "Not provided"}</p>
                <p><strong>Contact:</strong> ${data.contact}</p>
                <p><strong>Service:</strong> ${data.service || "General Inquiry"}</p>
                ${data.requirement ? `<p><strong>Requirement:</strong> ${data.requirement}</p>` : ""}
                ${data.appointmentDate ? `<p><strong>Requested Meeting Date:</strong> ${new Date(data.appointmentDate).toLocaleDateString()}</p>` : ""}
                ${data.appointmentTime ? `<p><strong>Requested Time:</strong> ${data.appointmentTime}</p>` : ""}
              </div>
              
              <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1e40af; margin-top: 0;">What Happens Next?</h3>
                <ul style="color: #1e40af; margin: 0; padding-left: 20px;">
                  <li>Our team will review your chat request</li>
                  <li>We'll contact you within 24 hours</li>
                  ${data.appointmentDate ? "<li>We'll confirm your meeting time and send calendar invite</li>" : "<li>We'll schedule a consultation at your convenience</li>"}
                  <li>You'll receive all meeting details via email</li>
                </ul>
              </div>
              
              <p>We look forward to helping you with your ${(data.service || "service").toLowerCase()} needs.</p>
              
              <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
                <p><strong>Elite Tax Consulting Services Team</strong></p>
                <p style="color: #6b7280; font-size: 14px;">
                  📞 Phone: (555) 123-4567<br>
                  📧 Email: info@elitetax.com<br>
                  💬 Chat: Available on our website
                </p>
              </div>
            </div>
          `,
        })

        emailResults.clientEmail = true
      }

      // Email to admin

      const adminEmailResult = await resend.emails.send({
        from: "Elite Tax Consulting <onboarding@resend.dev>",
        to: ["gp@elitetaxconsultingservices.com"],
        subject: `💬 New Chat Inquiry - ${data.name || "Anonymous"}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1e40af; margin: 0;">Elite Tax Consulting</h1>
              <p style="color: #6b7280; margin: 5px 0;">New Chat Inquiry</p>
            </div>
            
            <h2 style="color: #1e40af;">New Chat Inquiry 💬</h2>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Client Details:</h3>
              <p><strong>Name:</strong> ${data.name || "Not provided"}</p>
              <p><strong>Contact:</strong> ${data.contact || "Not provided"}</p>
              <p><strong>Service:</strong> ${data.service || "General Inquiry"}</p>
              <p><strong>Requirement:</strong> ${data.requirement || "Not specified"}</p>
              <p><strong>Status:</strong> ${data.status || "New inquiry"}</p>
              <p><strong>Session ID:</strong> ${data.sessionId}</p>
            </div>
            
            ${
              data.appointmentDate
                ? `
            <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e40af; margin-top: 0;">Meeting Request:</h3>
              <p><strong>Requested Date:</strong> ${new Date(data.appointmentDate).toLocaleDateString()}</p>
              <p><strong>Requested Time:</strong> ${data.appointmentTime}</p>
              <p><strong>Status:</strong> ${data.status === "appointment_booked" ? "✅ Booked" : "⏳ Pending confirmation"}</p>
            </div>
            `
                : ""
            }
            
            ${
              data.messages && data.messages.length > 0
                ? `
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Chat Conversation:</h3>
              <div style="max-height: 200px; overflow-y: auto; font-size: 14px;">
                ${data.messages
                  .map(
                    (msg) => `
                  <div style="margin-bottom: 10px; padding: 8px; background: ${msg.sender === "user" ? "#dbeafe" : "#f3f4f6"}; border-radius: 4px;">
                    <strong>${msg.sender === "user" ? "👤 User" : "🤖 Bot"}:</strong> ${msg.text}
                  </div>
                `,
                  )
                  .join("")}
              </div>
            </div>
            `
                : ""
            }
            
            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #92400e; margin-top: 0;">⚡ Action Required:</h3>
              <ul style="color: #92400e; margin: 0; padding-left: 20px;">
                <li>Contact the client within 24 hours</li>
                ${data.appointmentDate ? "<li>Confirm the meeting time and send calendar invite</li>" : "<li>Schedule a consultation meeting</li>"}
                <li>Prepare relevant documents for the requested service</li>
                <li>Follow up on their specific requirements</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              ${data.contact && data.contact.includes("@") ? `<a href="mailto:${data.contact}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin-right: 10px;">Reply to Client</a>` : ""}
              ${data.contact && !data.contact.includes("@") ? `<a href="tel:${data.contact}" style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Call Client</a>` : ""}
            </div>
            
            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; font-size: 12px; color: #6b7280;">
              <p>This email was sent automatically from the Elite Tax Consulting chatbot.</p>
              <p>Timestamp: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `,
      })

      emailResults.adminEmail = true
    } catch (emailError) {
      console.error("Error sending chat emails:", emailError)
      emailResults.error = emailError.message
    }

    // Try to save to Google Sheets (will work once OAuth is properly set up)
    try {
      const accessToken = await getValidAccessToken()

      if (accessToken) {
        const CHATBOT_SHEET_URL = `https://sheets.googleapis.com/v4/spreadsheets/1jtXzrrpH9eoPTdixbCC--qNI_zDGj9mCsnk2L5FLCZ4/values/Sheet1:append?valueInputOption=RAW`

        const sheetData = {
          values: [
            [
              new Date().toISOString(),
              data.sessionId || "",
              data.language || "english",
              data.service || "",
              data.name || "",
              data.contact || "",
              data.requirement || "",
              data.appointmentDate || "",
              data.appointmentTime || "",
              data.status || "lead_captured",
              JSON.stringify(data.messages || []),
            ],
          ],
        }

        const response = await fetch(CHATBOT_SHEET_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(sheetData),
        })

        if (response.ok) {
          console.log("Successfully saved to chatbot sheet")
        } else {
          console.log("Google Sheets not configured yet - skipping")
        }
      } else {
        console.log("No access token available - skipping Google Sheets")
      }
    } catch (sheetError) {
      console.log("Google Sheets not configured yet - skipping:", sheetError.message)
    }

    return NextResponse.json({
      success: true,
      message: "Chat data processed successfully",
      emailResults,
    })
  } catch (error) {
    console.error("Error saving chat data:", error)
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 })
  }
}
