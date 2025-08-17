"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, AlertCircle, CheckCircle, Settings, Users, Home } from "lucide-react"
import Link from "next/link"

export default function OAuthFixPage() {
  const [step, setStep] = useState(1)

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Fix Google OAuth Verification</h1>
          <p className="text-gray-600">Resolve the "Access blocked" error for development</p>
        </div>

        <div className="space-y-6">
          {/* Error Explanation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-red-600">
                <AlertCircle className="h-5 w-5 mr-2" />
                OAuth Error Explanation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Error 403: access_denied</strong>
                  <br />
                  Your Google Cloud project is in "testing" mode and hasn't completed Google's verification process.
                  This is normal for development projects.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Quick Fix Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Quick Fix for Development
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-900">Go to Google Cloud Console</h3>
                    <p className="text-blue-800 text-sm mb-3">
                      Open your Google Cloud Console and navigate to OAuth consent screen
                    </p>
                    <Button
                      onClick={() => window.open("https://console.cloud.google.com/apis/credentials/consent", "_blank")}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open OAuth Consent Screen
                    </Button>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-900">Add Test Users</h3>
                    <div className="text-green-800 text-sm space-y-2">
                      <p>In the OAuth consent screen:</p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>Scroll down to "Test users" section</li>
                        <li>Click "+ ADD USERS"</li>
                        <li>
                          Add your email: <strong>anantmishrapro@gmail.com</strong>
                        </li>
                        <li>Click "SAVE"</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg">
                  <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-purple-900">Verify Scopes</h3>
                    <div className="text-purple-800 text-sm space-y-2">
                      <p>Make sure these scopes are added:</p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>
                          <code>https://www.googleapis.com/auth/spreadsheets</code>
                        </li>
                        <li>
                          <code>https://www.googleapis.com/auth/calendar</code>
                        </li>
                      </ul>
                      <p className="mt-2">If not present, add them in the "Scopes" section.</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-lg">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-orange-900">Try OAuth Again</h3>
                    <p className="text-orange-800 text-sm mb-3">
                      After adding yourself as a test user, try the OAuth flow again
                    </p>
                    <Button
                      onClick={() => (window.location.href = "/admin/setup")}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Go to Setup Page
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alternative: Manual Token Generation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Alternative: Use Google OAuth Playground
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>If the above doesn't work immediately,</strong> you can generate tokens manually using Google
                  OAuth Playground.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Step 1: Configure OAuth Playground</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Go to Google OAuth Playground</li>
                    <li>Click the gear icon (⚙️) in the top right</li>
                    <li>Check "Use your own OAuth credentials"</li>
                    <li>
                      Enter your Client ID:{" "}
                      <code className="bg-white px-1 rounded">
                        49477293283-qkoh8draoppvharhqgtmggikm7si7mmf.apps.googleusercontent.com
                      </code>
                    </li>
                    <li>
                      Enter your Client Secret:{" "}
                      <code className="bg-white px-1 rounded">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</code>
                    </li>
                  </ol>
                  <Button
                    onClick={() => window.open("https://developers.google.com/oauthplayground/", "_blank")}
                    className="mt-3 bg-blue-600 hover:bg-blue-700"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open OAuth Playground
                  </Button>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Step 2: Authorize APIs</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>In the left panel, find "Google Sheets API v4"</li>
                    <li>
                      Select: <code>https://www.googleapis.com/auth/spreadsheets</code>
                    </li>
                    <li>Also find "Calendar API v3"</li>
                    <li>
                      Select: <code>https://www.googleapis.com/auth/calendar</code>
                    </li>
                    <li>Click "Authorize APIs"</li>
                    <li>Sign in with your Google account</li>
                  </ol>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Step 3: Get Tokens</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Click "Exchange authorization code for tokens"</li>
                    <li>
                      Copy the <strong>Access Token</strong>
                    </li>
                    <li>
                      Copy the <strong>Refresh Token</strong>
                    </li>
                    <li>Add these to your .env.local file</li>
                    <li>Restart your development server</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Status */}
          <Card>
            <CardHeader>
              <CardTitle>Your Current OAuth Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Client ID</span>
                    <Badge className="bg-green-500">✅ Configured</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Client Secret</span>
                    <Badge className="bg-green-500">✅ Configured</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Redirect URI</span>
                    <Badge className="bg-green-500">✅ Configured</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Test User Added</span>
                    <Badge variant="destructive">❌ Needed</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Access Token</span>
                    <Badge variant="destructive">❌ Missing</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Refresh Token</span>
                    <Badge variant="destructive">❌ Missing</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>🎯 Next Steps:</strong>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>Add yourself as a test user in Google Cloud Console</li>
                <li>Try the OAuth flow again at /admin/setup</li>
                <li>If still blocked, use OAuth Playground method</li>
                <li>Test everything at /admin/test once tokens are generated</li>
              </ol>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}
