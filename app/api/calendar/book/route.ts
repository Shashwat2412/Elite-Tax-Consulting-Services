









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
      return tokens.access_token
    } catch (error) {
      console.error("Error refreshing token:", error)
    }
  }

  return process.env.GOOGLE_CALENDAR_ACCESS_TOKEN
}

export async function POST(request: Request) {
  try {
    const { userData, appointmentDate, appointmentTime } = await request.json()

    // Get valid access token
    const accessToken = await getValidAccessToken()

    const startDateTime = new Date(`${appointmentDate}T${convertTo24Hour(appointmentTime)}:00`)
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000) // 1 hour later

    let calendarEvent = null
    let meetLink = null

    // Try to create Google Calendar event
    if (accessToken) {
      try {
        const calendarData = {
          summary: `Consultation - ${userData.name}`,
          description: `Service: ${userData.service}\nRequirement: ${userData.requirement}\nContact: ${userData.contact}`,
          start: {
            dateTime: startDateTime.toISOString(),
            timeZone: "America/New_York",
          },
          end: {
            dateTime: endDateTime.toISOString(),
            timeZone: "America/New_York",
          },
          attendees: [{ email: userData.email || userData.contact }, { email: "gp@elitetaxconsultingservices.com" }],
          conferenceData: {
            createRequest: {
              requestId: `chat-meeting-${Date.now()}`,
              conferenceSolutionKey: { type: "hangoutsMeet" },
            },
          },
        }

        // Create Google Calendar event
        const calendarResponse = await fetch(
          "https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(calendarData),
          },
        )

        if (calendarResponse.ok) {
          calendarEvent = await calendarResponse.json()
          meetLink = calendarEvent.conferenceData?.entryPoints?.[0]?.uri || calendarEvent.htmlLink
          console.log("Calendar event created successfully")
        } else {
          const errorText = await calendarResponse.text()
          console.error("Calendar API Error:", errorText)
          throw new Error(`Failed to create calendar event: ${calendarResponse.status}`)
        }
      } catch (calendarError) {
        console.error("Error creating calendar event:", calendarError)
        // Continue without calendar - create a basic meet link
        meetLink = `https://meet.google.com/new`
      }
    } else {
      console.log("No access token available - using basic meet link")
      meetLink = `https://meet.google.com/new`
    }

    // Send confirmation emails
    const emailResults = { clientEmail: false, adminEmail: false }

    try {
      // Email to client
      if (userData.email || userData.contact.includes("@")) {
        const clientEmail = userData.email || userData.contact

        await resend.emails.send({
          from: "Elite Tax Consulting <onboarding@resend.dev>",
          to: [clientEmail],
          subject: "Meeting Confirmed - Elite Tax Consulting",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #1e40af; margin: 0;">Elite Tax Consulting</h1>
                <p style="color: #6b7280; margin: 5px 0;">Professional Tax & Immigration Services</p>
              </div>
              
              <h2 style="color: #1e40af;">Meeting Confirmed! 🎉</h2>
              <p>Dear ${userData.name},</p>
              <p>Thank you for booking a consultation with Elite Tax Consulting Services through our chat.</p>
              
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #374151; margin-top: 0;">Meeting Details:</h3>
                <p><strong>Date:</strong> ${new Date(appointmentDate).toLocaleDateString()}</p>
                <p><strong>Time:</strong> ${appointmentTime}</p>
                <p><strong>Service:</strong> ${userData.service}</p>
                <p><strong>Duration:</strong> 60 minutes</p>
                ${userData.requirement ? `<p><strong>Your Requirements:</strong> ${userData.requirement}</p>` : ""}
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${meetLink}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Join Google Meet</a>
              </div>
              
              <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1e40af; margin-top: 0;">Before the Meeting:</h3>
                <ul style="color: #1e40af; margin: 0; padding-left: 20px;">
                  <li>Prepare any documents related to your ${userData.service.toLowerCase()}</li>
                  <li>Write down specific questions you'd like to discuss</li>
                  <li>Test your Google Meet connection beforehand</li>
                  <li>Have your contact information ready</li>
                </ul>
              </div>
              
              <p>We look forward to helping you with your ${userData.service.toLowerCase()} needs.</p>
              
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
      await resend.emails.send({
        from: "Elite Tax Consulting <onboarding@resend.dev>",
        to: ["gp@elitetaxconsultingservices.com"],
        subject: `📅 New Chat Meeting Booked - ${userData.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1e40af; margin: 0;">Elite Tax Consulting</h1>
              <p style="color: #6b7280; margin: 5px 0;">New Chat Meeting Booked</p>
            </div>
            
            <h2 style="color: #1e40af;">New Chat Meeting Booked 📅</h2>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Client Details:</h3>
              <p><strong>Name:</strong> ${userData.name}</p>
              <p><strong>Contact:</strong> ${userData.contact}</p>
              <p><strong>Service:</strong> ${userData.service}</p>
              <p><strong>Requirement:</strong> ${userData.requirement || "N/A"}</p>
              <p><strong>Source:</strong> Chatbot</p>
            </div>
            
            <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e40af; margin-top: 0;">Meeting Details:</h3>
              <p><strong>Date:</strong> ${new Date(appointmentDate).toLocaleDateString()}</p>
              <p><strong>Time:</strong> ${appointmentTime}</p>
              <p><strong>Duration:</strong> 60 minutes</p>
              <p><strong>Calendar Event:</strong> ${calendarEvent ? "✅ Created" : "❌ Manual setup needed"}</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${meetLink}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Join Google Meet</a>
            </div>
            
            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #92400e; margin-top: 0;">⚡ Action Required:</h3>
              <ul style="color: #92400e; margin: 0; padding-left: 20px;">
                <li>Prepare materials for ${userData.service}</li>
                <li>Review client's requirements: ${userData.requirement || "General consultation"}</li>
                <li>Join the meeting at the scheduled time</li>
                ${!calendarEvent ? "<li>⚠️ Manually add to your calendar (OAuth not configured)</li>" : ""}
              </ul>
            </div>
          </div>
        `,
      })

      emailResults.adminEmail = true
      console.log("Chat meeting emails sent successfully")
    } catch (emailError) {
      console.error("Error sending chat meeting emails:", emailError)
      emailResults.error = emailError.message
    }

    return NextResponse.json({
      success: true,
      calendarEvent: calendarEvent
        ? {
            id: calendarEvent.id,
            meetLink: meetLink,
            startTime: calendarEvent.start?.dateTime,
          }
        : null,
      meetLink,
      emailResults,
      message: calendarEvent ? "Meeting created and emails sent" : "Meeting scheduled with basic link and emails sent",
    })
  } catch (error) {
    console.error("Error booking calendar appointment:", error)
    return NextResponse.json({ error: "Failed to book appointment" }, { status: 500 })
  }
}

function convertTo24Hour(time12h: string) {
  const [time, modifier] = time12h.split(" ")
  let [hours, minutes] = time.split(":")
  if (hours === "12") {
    hours = "00"
  }
  if (modifier === "PM") {
    hours = (Number.parseInt(hours, 10) + 12).toString()
  }
  return `${hours}:${minutes || "00"}`
}
