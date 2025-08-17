
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
    const formData = await request.json()
    console.log("Form data received:", formData)

    // Create Google Calendar Event if meeting is requested
    let calendarEvent = null
    let meetLink = null

    if (formData.meetingDate && formData.meetingTime) {
      const startDateTime = new Date(`${formData.meetingDate}T${convertTo24Hour(formData.meetingTime)}:00`)
      const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000) // 1 hour later

      // Try to create calendar event (will work once OAuth is set up)
      try {
        const accessToken = await getValidAccessToken()

        if (accessToken) {
          const calendarData = {
            summary: `Consultation - ${formData.firstName} ${formData.lastName}`,
            description: `Service: ${formData.service}\nQuestions: ${formData.questions}\nPhone: ${formData.phone}\nCompany: ${formData.company}`,
            start: {
              dateTime: startDateTime.toISOString(),
              timeZone: "America/New_York",
            },
            end: {
              dateTime: endDateTime.toISOString(),
              timeZone: "America/New_York",
            },
            attendees: [{ email: formData.email }, { email: "gp@elitetaxconsultingservices.com" }],
            conferenceData: {
              createRequest: {
                requestId: `form-meeting-${Date.now()}`,
                conferenceSolutionKey: { type: "hangoutsMeet" },
              },
            },
          }

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
          }
        }
      } catch (calendarError) {
        console.error("Error creating calendar event:", calendarError)
        // Continue without calendar - we'll create a basic meet link
        meetLink = `https://meet.google.com/new`
      }

      // If no calendar event was created, use a basic meet link
      if (!meetLink) {
        meetLink = `https://meet.google.com/new`
      }
    }

    // Send confirmation emails - This is the main functionality
    const emailResults = { clientEmail: false, adminEmail: false }

    try {
      console.log("Attempting to send emails...")
      console.log("Resend API Key exists:", !!process.env.RESEND_API_KEY)

      // Email to client
      if (formData.email) {
        console.log("Sending email to client:", formData.email)

        const clientEmailResult = await resend.emails.send({
          from: "Elite Tax Consulting <onboarding@resend.dev>", // Using default Resend domain
          to: [formData.email],
          subject: "Consultation Request Received - Elite Tax Consulting",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #1e40af; margin: 0;">Elite Tax Consulting</h1>
                <p style="color: #6b7280; margin: 5px 0;">Professional Tax & Immigration Services</p>
              </div>
              
              <h2 style="color: #1e40af;">Thank You for Your Interest! 🎉</h2>
              <p>Dear ${formData.firstName},</p>
              <p>We have received your consultation request and will get back to you within 24 hours.</p>
              
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #374151; margin-top: 0;">Your Request Details:</h3>
                <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Phone:</strong> ${formData.phone}</p>
                ${formData.company ? `<p><strong>Company:</strong> ${formData.company}</p>` : ""}
                <p><strong>Service:</strong> ${formData.service}</p>
                ${formData.questions ? `<p><strong>Questions:</strong> ${formData.questions}</p>` : ""}
                ${formData.meetingDate ? `<p><strong>Preferred Meeting Date:</strong> ${new Date(formData.meetingDate).toLocaleDateString()}</p>` : ""}
                ${formData.meetingTime ? `<p><strong>Preferred Time:</strong> ${formData.meetingTime}</p>` : ""}
              </div>
              
              ${
                meetLink
                  ? `
              <div style="text-align: center; margin: 30px 0;">
                <a href="${meetLink}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Join Meeting (When Scheduled)</a>
              </div>
              `
                  : ""
              }
              
              <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1e40af; margin-top: 0;">What Happens Next?</h3>
                <ul style="color: #1e40af; margin: 0; padding-left: 20px;">
                  <li>Our team will review your request</li>
                  <li>We'll contact you within 24 hours</li>
                  <li>We'll schedule your consultation at your preferred time</li>
                  <li>You'll receive a calendar invite with meeting details</li>
                </ul>
              </div>
              
              <p>We look forward to helping you with your ${formData.service.toLowerCase()} needs.</p>
              
              <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
                <p><strong>Elite Tax Consulting Services Team</strong></p>
                <p style="color: #6b7280; font-size: 14px;">
                  📞 Phone: (555) 123-4567<br>
                  📧 Email: info@elitetax.com<br>
                  📍 Address: 180 US-31, Whiteland, IN 46184
                </p>
              </div>
            </div>
          `,
        })

        console.log("Client email result:", clientEmailResult)
        emailResults.clientEmail = true
      }

      // Email to admin
      console.log("Sending email to admin: gp@elitetaxconsultingservices.com")

      const adminEmailResult = await resend.emails.send({
        from: "Elite Tax Consulting <onboarding@resend.dev>", // Using default Resend domain
        to: ["gp@elitetaxconsultingservices.com"],
        subject: `🔔 New Consultation Request - ${formData.firstName} ${formData.lastName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1e40af; margin: 0;">Elite Tax Consulting</h1>
              <p style="color: #6b7280; margin: 5px 0;">New Consultation Request</p>
            </div>
            
            <h2 style="color: #1e40af;">New Consultation Request 📋</h2>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Client Details:</h3>
              <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
              <p><strong>Email:</strong> ${formData.email}</p>
              <p><strong>Phone:</strong> ${formData.phone}</p>
              ${formData.company ? `<p><strong>Company:</strong> ${formData.company}</p>` : ""}
              <p><strong>Service Requested:</strong> ${formData.service}</p>
              ${formData.questions ? `<p><strong>Questions:</strong> ${formData.questions}</p>` : ""}
              ${formData.message ? `<p><strong>Additional Message:</strong> ${formData.message}</p>` : ""}
              ${formData.hearAbout ? `<p><strong>How they heard about us:</strong> ${formData.hearAbout}</p>` : ""}
            </div>
            
            ${
              formData.meetingDate
                ? `
            <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e40af; margin-top: 0;">Meeting Request:</h3>
              <p><strong>Preferred Date:</strong> ${new Date(formData.meetingDate).toLocaleDateString()}</p>
              <p><strong>Preferred Time:</strong> ${formData.meetingTime}</p>
              ${meetLink ? `<p><strong>Meeting Link:</strong> <a href="${meetLink}">${meetLink}</a></p>` : ""}
            </div>
            `
                : ""
            }
            
            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #92400e; margin-top: 0;">⚡ Action Required:</h3>
              <ul style="color: #92400e; margin: 0; padding-left: 20px;">
                <li>Contact the client within 24 hours</li>
                <li>Schedule the consultation meeting</li>
                <li>Send calendar invite with meeting details</li>
                <li>Prepare relevant documents for the service</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="mailto:${formData.email}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin-right: 10px;">Reply to Client</a>
              <a href="tel:${formData.phone}" style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Call Client</a>
            </div>
            
            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; font-size: 12px; color: #6b7280;">
              <p>This email was sent automatically from the Elite Tax Consulting website contact form.</p>
              <p>Timestamp: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `,
      })

      console.log("Admin email result:", adminEmailResult)
      emailResults.adminEmail = true

      console.log("All emails sent successfully!")
    } catch (emailError) {
      console.error("Error sending emails:", emailError)
      console.error("Email error details:", emailError.message)

      // Don't throw error, just log it
      emailResults.error = emailError.message
    }

    // Try to save to Google Sheets (will work once OAuth is properly set up)
    try {
      const accessToken = await getValidAccessToken()

      if (accessToken) {
        const FORM_SHEET_URL = `https://sheets.googleapis.com/v4/spreadsheets/161jlyT09HZ3cbmfS6MjWNy6F-A8DvVPOdKK4_nxGtIQ/values/Sheet1:append?valueInputOption=RAW`

        const sheetData = {
          values: [
            [
              new Date().toISOString(),
              formData.firstName || "",
              formData.lastName || "",
              formData.email || "",
              formData.phone || "",
              formData.company || "",
              formData.service || "",
              formData.questions || "",
              formData.meetingDate || "",
              formData.meetingTime || "",
              formData.hearAbout || "",
              formData.message || "",
              "form_submission",
            ],
          ],
        }

        const sheetResponse = await fetch(FORM_SHEET_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(sheetData),
        })

        if (sheetResponse.ok) {
          console.log("Successfully saved to Google Sheets")
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
      message: "Form submitted successfully!",
      emailResults,
      calendarEvent: calendarEvent
        ? {
            id: calendarEvent.id,
            meetLink: meetLink,
            startTime: calendarEvent.start?.dateTime,
          }
        : null,
    })
  } catch (error) {
    console.error("Error processing form submission:", error)
    return NextResponse.json(
      {
        error: "Failed to process submission",
        details: error.message,
      },
      { status: 500 },
    )
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
