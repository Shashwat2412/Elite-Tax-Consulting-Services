"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Copy, Settings, Key, Calendar, Mail, AlertCircle, Home } from "lucide-react"
import Link from "next/link"

export default function AdminSetupPage() {
  const [tokens, setTokens] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [authStatus, setAuthStatus] = useState<string>("checking")

  useEffect(() => {
    // Check if we're returning from OAuth
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get("code")
    const error = urlParams.get("error")

    if (error) {
      setAuthStatus("error")
      console.error("OAuth error:", error)
    } else if (code) {
      setAuthStatus("processing")
      handleOAuthCallback(code)
    } else {
      setAuthStatus("ready")
    }
  }, [])

  const handleOAuthCallback = async (code: string) => {
    try {
      const response = await fetch(`/api/auth/google?code=${code}`)
      const result = await response.json()

      if (result.success) {
        setTokens(result)
        setAuthStatus("success")
      } else {
        setAuthStatus("error")
        console.error("OAuth callback error:", result)
      }
    } catch (error) {
      setAuthStatus("error")
      console.error("Error processing OAuth callback:", error)
    }
  }

  const handleGoogleAuth = async () => {
    setLoading(true)
    try {
      // Redirect to Google OAuth
      const googleAuthUrl =
        `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=1002937978065-3i3jt15ohnl4bfuhlmh1fmiorh40heui.apps.googleusercontent.com&` +
        `redirect_uri=${encodeURIComponent("http://localhost:3000/api/auth/google")}&` +
        `response_type=code&` +
        `scope=${encodeURIComponent("https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/calendar")}&` +
        `access_type=offline&` +
        `prompt=consent`

      window.location.href = googleAuthUrl
    } catch (error) {
      console.error("Error initiating Google auth:", error)
      setLoading(false)
      setAuthStatus("error")
    }
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const testGoogleSheets = async () => {
    try {
      const response = await fetch("/api/chat/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: "test_session",
          service: "Test Service",
          name: "Test User",
          contact: "test@example.com",
          requirement: "Testing Google Sheets integration",
          status: "test",
          messages: [{ text: "Test message", sender: "bot", timestamp: new Date() }],
        }),
      })

      const result = await response.json()
      alert(result.success ? "Google Sheets test successful!" : "Google Sheets test failed!")
    } catch (error) {
      alert("Google Sheets test failed!")
      console.error(error)
    }
  }

  const testResend = async () => {
    try {
      const response = await fetch("/api/form/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: "Test",
          lastName: "User",
          email: "gp@elitetaxconsultingservices.com",
          phone: "555-123-4567",
          service: "Test Service",
          questions: "Testing email integration",
          meetingDate: new Date().toISOString().split("T")[0],
          meetingTime: "2:00 PM",
        }),
      })

      const result = await response.json()
      alert(result.success ? "Email test successful!" : "Email test failed!")
    } catch (error) {
      alert("Email test failed!")
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
              <Home className="h-5 w-5" />
              <span>← Back to Website</span>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Elite Tax Consulting - OAuth Setup</h1>
          <p className="text-gray-600">Generate Google API tokens for Sheets and Calendar integration</p>
        </div>

        <div className="grid gap-6">
          {/* Current Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Current Configuration Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Google Client ID</Label>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-500">✅ Configured</Badge>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      49477293283-qkoh8draoppvharhqgtmggikm7si7mmf.apps.googleusercontent.com
                    </code>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Google Client Secret</Label>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-500">✅ Configured</Badge>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">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</code>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Resend API Key</Label>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-500">✅ Configured</Badge>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">re_RXY3XTjY_NV4TBfFtccTNxupxWnqKP3Ep</code>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Google Refresh Token</Label>
                  <div className="flex items-center space-x-2">
                    <Badge variant="destructive">❌ Missing</Badge>
                    <span className="text-sm text-gray-600">Generate using OAuth flow below</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* OAuth Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key className="h-5 w-5 mr-2" />
                OAuth Token Generation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {authStatus === "checking" && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>Checking OAuth status...</AlertDescription>
                </Alert>
              )}

              {authStatus === "ready" && (
                <div className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Ready to generate tokens!</strong> Click the button below to start the OAuth flow.
                    </AlertDescription>
                  </Alert>

                  <Button
                    onClick={handleGoogleAuth}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {loading ? "Redirecting to Google..." : "🔐 Authorize Google APIs"}
                  </Button>
                </div>
              )}

              {authStatus === "processing" && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>Processing OAuth callback...</AlertDescription>
                </Alert>
              )}

              {authStatus === "success" && tokens && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-4">✅ Tokens Generated Successfully!</h3>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm text-green-800">Access Token:</Label>
                      <div className="flex items-center space-x-2">
                        <Input value={tokens.access_token} readOnly className="text-xs font-mono" />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(tokens.access_token, "access_token")}
                        >
                          {copied === "access_token" ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {tokens.refresh_token && (
                      <div>
                        <Label className="text-sm text-green-800">Refresh Token:</Label>
                        <div className="flex items-center space-x-2">
                          <Input value={tokens.refresh_token} readOnly className="text-xs font-mono" />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(tokens.refresh_token, "refresh_token")}
                          >
                            {copied === "refresh_token" ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    )}

                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Next Steps:</strong>
                        <ol className="list-decimal list-inside mt-2 space-y-1">
                          <li>Copy the tokens above</li>
                          <li>Add them to your .env.local file</li>
                          <li>Restart your development server</li>
                          <li>Test the integrations below</li>
                        </ol>
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              )}

              {authStatus === "error" && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>OAuth Error!</strong> Please try again or check your Google Cloud Console configuration.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Environment Variables Template */}
          <Card>
            <CardHeader>
              <CardTitle>Updated Environment Variables</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  After generating tokens, update your .env.local file with these values:
                </p>

                <Textarea
                  readOnly
                  rows={15}
                  value={`# Google OAuth 2.0 Credentials
GOOGLE_CLIENT_ID=49477293283-qkoh8draoppvharhqgtmggikm7si7mmf.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google

# Google Sheets API
GOOGLE_SHEETS_API_KEY=AIzaSyD16BlSNA_q_hecLy_frw6NHgsF0Glba3U

# Google API Access Tokens (Replace with generated tokens)
GOOGLE_SHEETS_ACCESS_TOKEN=${tokens?.access_token || "your_access_token_here"}
GOOGLE_CALENDAR_ACCESS_TOKEN=${tokens?.access_token || "your_access_token_here"}
GOOGLE_REFRESH_TOKEN=${tokens?.refresh_token || "your_refresh_token_here"}

# Resend Email Service
RESEND_API_KEY=re_RXY3XTjY_NV4TBfFtccTNxupxWnqKP3Ep

# Public Environment Variables
NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY=AIzaSyD16BlSNA_q_hecLy_frw6NHgsF0Glba3U
NEXT_PUBLIC_RESEND_API_KEY=re_RXY3XTjY_NV4TBfFtccTNxupxWnqKP3Ep`}
                  className="font-mono text-sm"
                />
                <Button
                  className="mt-2 bg-transparent"
                  variant="outline"
                  onClick={() =>
                    copyToClipboard(
                      `# Google OAuth 2.0 Credentials
GOOGLE_CLIENT_ID=49477293283-qkoh8draoppvharhqgtmggikm7si7mmf.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google

# Google Sheets API
GOOGLE_SHEETS_API_KEY=AIzaSyD16BlSNA_q_hecLy_frw6NHgsF0Glba3U

# Google API Access Tokens (Replace with generated tokens)
GOOGLE_SHEETS_ACCESS_TOKEN=${tokens?.access_token || "your_access_token_here"}
GOOGLE_CALENDAR_ACCESS_TOKEN=${tokens?.access_token || "your_access_token_here"}
GOOGLE_REFRESH_TOKEN=${tokens?.refresh_token || "your_refresh_token_here"}

# Resend Email Service
RESEND_API_KEY=re_RXY3XTjY_NV4TBfFtccTNxupxWnqKP3Ep

# Public Environment Variables
NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY=AIzaSyD16BlSNA_q_hecLy_frw6NHgsF0Glba3U
NEXT_PUBLIC_RESEND_API_KEY=re_RXY3XTjY_NV4TBfFtccTNxupxWnqKP3Ep`,
                      "env_vars",
                    )
                  }
                >
                  {copied === "env_vars" ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  Copy Environment Variables
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Test Integrations */}
          <Card>
            <CardHeader>
              <CardTitle>Test Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button onClick={testGoogleSheets} variant="outline" className="h-20 flex-col bg-transparent">
                  <Calendar className="h-6 w-6 mb-2" />
                  Test Google Sheets
                </Button>
                <Button onClick={testResend} variant="outline" className="h-20 flex-col bg-transparent">
                  <Mail className="h-6 w-6 mb-2" />
                  Test Email (Resend)
                </Button>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Important:</strong> After generating tokens, restart your development server and test the
                  integrations.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
