"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ExternalLink,
  Copy,
  CheckCircle,
  AlertCircle,
  Settings,
  Key,
  Mail,
  FileText,
  ArrowRight,
  Info,
  Home,
} from "lucide-react"
import Link from "next/link"

export default function SetupGuidePage() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
              <Home className="h-5 w-5" />
              <span>← Back to Website</span>
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Complete Setup Guide</h1>
          <p className="text-gray-600 text-lg">Step-by-step instructions to get all required API keys and tokens</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="google-cloud">Google Cloud</TabsTrigger>
            <TabsTrigger value="google-sheets">Sheets API</TabsTrigger>
            <TabsTrigger value="oauth">OAuth Setup</TabsTrigger>
            <TabsTrigger value="resend">Resend API</TabsTrigger>
            <TabsTrigger value="final">Final Steps</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  What You'll Need
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg">Google APIs (Free)</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>Google Cloud Console Account</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>Google Sheets API Key</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>Google Calendar API Access</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>OAuth 2.0 Credentials</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg">Email Service</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>Resend Account (Free tier available)</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>Domain verification (optional)</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Estimated Time:</strong> 15-20 minutes total setup time. All services have free tiers
                    suitable for this project.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Environment Variables You'll Get</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "GOOGLE_CLIENT_ID", source: "Google Cloud Console", status: "Required" },
                    { name: "GOOGLE_CLIENT_SECRET", source: "Google Cloud Console", status: "Required" },
                    { name: "GOOGLE_REDIRECT_URI", source: "Your App URL", status: "Auto-generated" },
                    { name: "GOOGLE_SHEETS_API_KEY", source: "Google Cloud Console", status: "Required" },
                    { name: "GOOGLE_REFRESH_TOKEN", source: "OAuth Flow", status: "Auto-generated" },
                    { name: "RESEND_API_KEY", source: "Resend Dashboard", status: "Required" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <code className="text-sm font-mono">{item.name}</code>
                        <p className="text-xs text-gray-600">{item.source}</p>
                      </div>
                      <Badge variant={item.status === "Required" ? "destructive" : "default"}>{item.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Google Cloud Setup */}
          <TabsContent value="google-cloud" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Step 1: Google Cloud Console Setup
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
                        Visit the Google Cloud Console to create your project
                      </p>
                      <Button
                        onClick={() => window.open("https://console.cloud.google.com/", "_blank")}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open Google Cloud Console
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
                    <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-green-900">Create or Select Project</h3>
                      <div className="text-green-800 text-sm space-y-2">
                        <p>
                          <strong>Option A - Create New Project:</strong>
                        </p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                          <li>Click "Select a project" dropdown at the top</li>
                          <li>Click "NEW PROJECT"</li>
                          <li>Enter project name: "Elite Tax Consulting"</li>
                          <li>Click "CREATE"</li>
                        </ul>
                        <p>
                          <strong>Option B - Use Existing Project:</strong>
                        </p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                          <li>Select your existing project from the dropdown</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg">
                    <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-purple-900">Enable Required APIs</h3>
                      <div className="text-purple-800 text-sm space-y-2">
                        <p>You need to enable these APIs:</p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                          <li>
                            <strong>Google Sheets API</strong> - For saving form data
                          </li>
                          <li>
                            <strong>Google Calendar API</strong> - For booking meetings
                          </li>
                        </ul>
                        <p className="mt-2">
                          <strong>How to enable:</strong>
                        </p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                          <li>Go to "APIs & Services" → "Library"</li>
                          <li>Search for "Google Sheets API" and click "ENABLE"</li>
                          <li>Search for "Google Calendar API" and click "ENABLE"</li>
                        </ul>
                      </div>
                      <Button
                        onClick={() => window.open("https://console.cloud.google.com/apis/library", "_blank")}
                        className="mt-3 bg-purple-600 hover:bg-purple-700"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open API Library
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Continue with other tabs... */}
          <TabsContent value="google-sheets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Step 2: Get Google Sheets API Key
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>GOOGLE_SHEETS_API_KEY</strong> - This is a public API key used to access Google Sheets
                  </AlertDescription>
                </Alert>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Your API Key is already configured:</h3>
                  <code className="bg-white p-2 rounded border text-sm block">
                    AIzaSyD16BlSNA_q_hecLy_frw6NHgsF0Glba3U
                  </code>
                  <p className="text-sm text-gray-600 mt-2">
                    This is the value for <strong>GOOGLE_SHEETS_API_KEY</strong>
                  </p>
                  <Button
                    onClick={() => copyToClipboard("AIzaSyD16BlSNA_q_hecLy_frw6NHgsF0Glba3U", "sheets_api")}
                    className="mt-2 bg-blue-600 hover:bg-blue-700"
                  >
                    {copied === "sheets_api" ? (
                      <CheckCircle className="h-4 w-4 mr-2" />
                    ) : (
                      <Copy className="h-4 w-4 mr-2" />
                    )}
                    Copy API Key
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="oauth" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="h-5 w-5 mr-2" />
                  Step 3: OAuth 2.0 Setup
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>OAuth Setup</strong> - This gets you GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and
                    GOOGLE_REFRESH_TOKEN
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-blue-900">Configure OAuth Consent Screen</h3>
                      <div className="text-blue-800 text-sm space-y-2">
                        <p>First-time setup only:</p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                          <li>Go to "APIs & Services" → "OAuth consent screen"</li>
                          <li>Choose "External" user type</li>
                          <li>
                            Fill in required fields:
                            <ul className="list-disc list-inside ml-4 mt-1">
                              <li>
                                <strong>App name:</strong> Elite Tax Consulting
                              </li>
                              <li>
                                <strong>User support email:</strong> Your email
                              </li>
                              <li>
                                <strong>Developer contact:</strong> Your email
                              </li>
                            </ul>
                          </li>
                          <li>Click "SAVE AND CONTINUE" through all steps</li>
                        </ul>
                      </div>
                      <Button
                        onClick={() =>
                          window.open("https://console.cloud.google.com/apis/credentials/consent", "_blank")
                        }
                        className="mt-3 bg-blue-600 hover:bg-blue-700"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        OAuth Consent Screen
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
                    <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-green-900">Create OAuth 2.0 Client</h3>
                      <div className="text-green-800 text-sm space-y-2">
                        <ul className="list-disc list-inside ml-4 space-y-1">
                          <li>Go back to "Credentials" tab</li>
                          <li>Click "+ CREATE CREDENTIALS" → "OAuth client ID"</li>
                          <li>Choose "Web application"</li>
                          <li>Name: "Elite Tax Consulting Web Client"</li>
                          <li>
                            <strong>Authorized redirect URIs:</strong> Add this URL:
                            <div className="bg-white p-2 rounded mt-2 font-mono text-xs">
                              http://localhost:3000/api/auth/google
                            </div>
                          </li>
                          <li>Click "CREATE"</li>
                        </ul>
                      </div>
                      <Button
                        onClick={() => window.open("https://console.cloud.google.com/apis/credentials", "_blank")}
                        className="mt-3 bg-green-600 hover:bg-green-700"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Create OAuth Client
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resend" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Step 4: Resend API Setup
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>RESEND_API_KEY</strong> - Free tier includes 3,000 emails/month, perfect for this project
                  </AlertDescription>
                </Alert>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Your Resend API Key is already configured:</h3>
                  <code className="bg-white p-2 rounded border text-sm block">
                    re_RXY3XTjY_NV4TBfFtccTNxupxWnqKP3Ep
                  </code>
                  <p className="text-sm text-gray-600 mt-2">
                    This is the value for <strong>RESEND_API_KEY</strong>
                  </p>
                  <Button
                    onClick={() => copyToClipboard("re_RXY3XTjY_NV4TBfFtccTNxupxWnqKP3Ep", "resend_api")}
                    className="mt-2 bg-blue-600 hover:bg-blue-700"
                  >
                    {copied === "resend_api" ? (
                      <CheckCircle className="h-4 w-4 mr-2" />
                    ) : (
                      <Copy className="h-4 w-4 mr-2" />
                    )}
                    Copy API Key
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-blue-900">Create Resend Account (Optional)</h3>
                      <p className="text-blue-800 text-sm mb-3">
                        If you want your own API key, sign up for a free Resend account
                      </p>
                      <Button
                        onClick={() => window.open("https://resend.com/signup", "_blank")}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Sign Up for Resend
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="final" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Step 5: Final Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-blue-900">Update .env.local File</h3>
                      <p className="text-blue-800 text-sm mb-3">Copy this template to your .env.local file</p>
                      <div className="bg-white p-3 rounded border">
                        <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                          {`# Google OAuth 2.0 Credentials
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google

# Google Sheets API
GOOGLE_SHEETS_API_KEY=AIzaSyD16BlSNA_q_hecLy_frw6NHgsF0Glba3U

# Google API Access Tokens (Generated automatically)
GOOGLE_SHEETS_ACCESS_TOKEN=will_be_generated
GOOGLE_CALENDAR_ACCESS_TOKEN=will_be_generated
GOOGLE_REFRESH_TOKEN=will_be_generated

# Resend Email Service
RESEND_API_KEY=re_RXY3XTjY_NV4TBfFtccTNxupxWnqKP3Ep

# Public Environment Variables
NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY=AIzaSyD16BlSNA_q_hecLy_frw6NHgsF0Glba3U
NEXT_PUBLIC_RESEND_API_KEY=re_RXY3XTjY_NV4TBfFtccTNxupxWnqKP3Ep`}
                        </pre>
                      </div>
                      <Button
                        onClick={() =>
                          copyToClipboard(
                            `# Google OAuth 2.0 Credentials
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google

# Google Sheets API
GOOGLE_SHEETS_API_KEY=AIzaSyD16BlSNA_q_hecLy_frw6NHgsF0Glba3U

# Google API Access Tokens (Generated automatically)
GOOGLE_SHEETS_ACCESS_TOKEN=will_be_generated
GOOGLE_CALENDAR_ACCESS_TOKEN=will_be_generated
GOOGLE_REFRESH_TOKEN=will_be_generated

# Resend Email Service
RESEND_API_KEY=re_RXY3XTjY_NV4TBfFtccTNxupxWnqKP3Ep

# Public Environment Variables
NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY=AIzaSyD16BlSNA_q_hecLy_frw6NHgsF0Glba3U
NEXT_PUBLIC_RESEND_API_KEY=re_RXY3XTjY_NV4TBfFtccTNxupxWnqKP3Ep`,
                            "env_template",
                          )
                        }
                        className="mt-3 bg-blue-600 hover:bg-blue-700"
                      >
                        {copied === "env_template" ? (
                          <CheckCircle className="h-4 w-4 mr-2" />
                        ) : (
                          <Copy className="h-4 w-4 mr-2" />
                        )}
                        Copy .env Template
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
                    <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-green-900">Generate OAuth Tokens</h3>
                      <div className="text-green-800 text-sm space-y-2">
                        <p>After updating your .env.local file:</p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                          <li>Restart your development server</li>
                          <li>Visit /admin/setup in your browser</li>
                          <li>Click "Authorize Google APIs"</li>
                          <li>Complete the OAuth flow</li>
                          <li>Copy the generated tokens back to .env.local</li>
                        </ul>
                      </div>
                      <Button
                        onClick={() => (window.location.href = "/admin/setup")}
                        className="mt-3 bg-green-600 hover:bg-green-700"
                      >
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Go to Setup Page
                      </Button>
                    </div>
                  </div>
                </div>

                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>🎉 You're Almost Done!</strong> Once you complete the OAuth flow, your Elite Tax Consulting
                    website will be fully configured!
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
