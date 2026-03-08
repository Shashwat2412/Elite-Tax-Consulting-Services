// app/privacy/page.tsx (New file: Reuses header and footer logic from main page.tsx. Displays extracted Privacy Policy content from PDF in a clean, sectioned format.)
"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  Users,
  Globe,
  FileText,
  Building,
  Calendar,
  Star,
  Shield,
  Zap,
  Heart,
  ArrowRight,
  ExternalLink,
  Quote,
  ChevronDown,
  Plus,
  Minus,
  Loader2,
  Truck,
  Scale,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChatBot } from "../components/chat-bot"
import { WhatsAppWidget } from "../components/whatsapp-widget"
import { MobileMenu } from "../components/mobile-menu"

import logo from "../logofinal.png"

import tax from "../tax.jpg"
import svc2 from "../sv2.jpg"
import svc21 from "../svc21.jpg"
import svc41 from "../svcv41.jpg"
import svc6 from "../svc6.jpg"
import banner from "../bsnner.png"
import usics from '../usics.jpg'
import pro from '../prof.jpg'
import { Skeleton } from "@/components/ui/skeleton"

// Extracted and formatted Privacy Policy content from PDF
const privacyContent = {
//   lastRevised: "Last Revised: [, e.g., March 2025]",
  sections: [
    {
      title: "1. Introduction",
      content: [
        "We care about your trust and confidence, and therefore make it a priority to ensure that your information is secure and confidential. Please read this Policy to learn about how we collect, use, and share user information whenever you access our Platform or use our Services. By visiting our Website, downloading or using our Services or Platform, you consent to the data collection and use practices described herein. You also acknowledge that any dispute you may have over privacy is subject to this Policy and our Terms of Use.",
        "This Policy does not apply to any website, product or service of any Third-Party, Partner or other company, even if such website, product or service links to (or from) the Platform. Elite Tax & Consulting Services does not operate those Third-Party or Partner sites or application links. Please review the privacy practices of those websites or services before deciding whether to provide any of your information to them.",
        "The terms and conditions applicable to use of this Platform are described in Elite Tax & Consulting Services’ Terms of Use."
      ]
    },
    {
      title: "2. Consent to Policy",
      content: [
        "By visiting and/or using the Platform (defined below), you (“you”, “your” and/or “user”) agree to be bound by this Privacy Policy (the “Policy”). If you do not agree to this Policy, then you may not access or use the Platform.",
        "Elite Tax & Consulting Services and its affiliates, parent and subsidiary entities and their respective agents, representatives, employees, owners, managers, and subcontractors are collectively referred to in this Policy as “Elite Tax & Consulting Services,” “Company,” “we”, “us” or “our”.",
        "Elite Tax & Consulting Services is committed to protecting your privacy.",
        "This Policy governs the manner in which Elite Tax & Consulting Services collects, uses, maintains and discloses information collected from visitors and users of:",
        " (a) any website owned and/or operated by Elite Tax & Consulting Services including, but not limited to, www.elitetaxconsultingservices.com (the “Website” or “Site”),",
        " (b) the Elite Tax & Consulting Services Mobile Application (the “Application” or “App”), and",
        " (c) the respective features, applications, products and services offered by Elite Tax & Consulting Services or available on the Website or Application (collectively, the “Services”).",
        "The Website, Application and our Services are collectively referred to herein as the “Platform”.",
        "You affirm that you:",
        " are 18 years of age or older and are fully able and competent to enter into, and accept the terms and conditions of this Policy;",
        " are at least 16 years of age but not yet 18 years of age and that you have your parent or legal guardian’s permission to use the Platform;",
        " if using the Platform on behalf of a company or organization, you have authority to bind that entity;",
        " if you are a parent or legal guardian allowing your child to use the Platform, you are responsible for their activity.",
        "The Platform is not intended for use by persons under the age of 16."
      ]
    },
    {
      title: "3. Changes to Policy",
      content: [
        "Elite Tax & Consulting Services reserves the right, in its sole discretion, to modify this Policy at any time and without prior notice. Any changes will be effective immediately upon posting and indicated by a change to the “Last Revised” date.",
        "Your continued use of the Platform after changes constitutes acceptance."
      ]
    },
    {
      title: "4. Information We May Collect",
      content: [
        "We may collect:",
        "**Public Information and Posts** Comments, reviews, usernames, profile information, and any public content submitted.",
        "**User Generated Content** Messages, reviews, ratings, responses, and submissions through the Platform.",
        "**Information from Social Media** If you log in via Facebook®, LinkedIn®, or similar platforms, we may collect user IDs, authentication tokens, profile information, and other publicly available data.",
        "**Activity Information** IP address, browser type, device identifiers, geolocation data, and usage behavior.",
        "**Personal Identifying Information (PII)** May include: Name, Address, Email, Phone number, Social Security Number, Date of Birth, Bank account information, Credit card information, Demographic data. Users may browse without providing PII, but refusal may limit Services.",
        "**Aggregate Information** Usage statistics, device data, timestamps, clickstream patterns, etc."
      ]
    },
    {
      title: "5. Methods We Use to Collect Information",
      content: [
        "We may use: Cookies, Web Beacons, Conversion Tracking, Mobile Device Tracking, Location Tracking (GPS/Wi-Fi), Recorded Phone Calls (where lawful), Referral program data.",
        "Users may disable cookies but some features may not function properly."
      ]
    },
    {
      title: "6. How We Use and/or Share Information",
      content: [
        "We may use collected information for: Providing services, Processing transactions, Responding to inquiries, Marketing and promotional purposes, Fraud prevention, Legal compliance, Network security, Dispute resolution.",
        "We may share information with: Service providers and contractors, Payment processors, Partners, Government authorities (as required by law), Lenders or funders, Professional regulatory bodies.",
        "We do not store credit card information. Payment processing is handled by third-party vendors.",
        "We may disclose information in cases of: Legal compliance, Fraud prevention, Business mergers or transfers."
      ]
    },
    {
      title: "7. How We Protect Your Information",
      content: [
        "We use commercially reasonable security measures including SSL encryption.",
        "However, no system is 100% secure. Transmission of data is at your own risk.",
        "Information may be transferred and stored in the United States."
      ]
    },
    {
      title: "8. Telephone Consumer Protection Act (TCPA) Disclaimer",
      content: [
        "By providing your phone number, you provide express written consent to be contacted by: Phone, SMS, Automated dialing systems, Prerecorded messages.",
        "You may revoke consent by emailing: contact@elitetaxconsultingservices.com or replying STOP to text messages."
      ]
    },
    {
      title: "9. Access Rights to Data",
      content: [
        "To request, correct, or delete your information: Email: contact@elitetaxconsultingservices.com",
        "Mail: Elite Tax & Consulting Services ATTN: PRIVACY POLICY ADMINISTRATOR 981 W County Line Rd Greenwood, IN 46142",
        "California residents have rights under CCPA.",
        "EEA residents have rights under GDPR including access, rectification, restriction, portability, and withdrawal of consent."
      ]
    },
    {
      title: "10. Other",
      content: [
        "The Elite Tax & Consulting Services may be linked to sites operated by unaffiliated companies, and may carry advertisements or offer content, functionality, newsletters, contests or sweepstakes, or applications developed and maintained by unaffiliated companies. Elite Tax & Consulting Services is not responsible for the privacy practices of unaffiliated companies, and once you leave the Elite Tax & Consulting Services or click an advertisement you should check the applicable privacy policy of the other service.",
        "In addition, Elite Tax & Consulting Services is not responsible for the privacy or data security practices of its Partners or any other organizations, such as Facebook, Tumblr, Twitter, Apple, Google, Microsoft or any other app developer, app provider, social media platform provider, operating system provider, wireless service provider, or device manufacturer, including in connection with any information you disclose to our Partners or other organizations through or in connection with the Elite Tax & Consulting Services."
      ]
    },
    {
      title: "11. Children’s Policy",
      content: [
        "Not intended for individuals under 16 years of age."
      ]
    },
    {
      title: "12. Governing Law",
      content: [
        "By visiting and/or using any part of the Platform, you accept that any dispute over privacy is subject to this Privacy Policy and our Terms of Use. This Privacy Policy and the privacy practices of Elite Tax & Consulting Services are subject exclusively to the laws of the State of Indiana, United States of America without regard to any conflict of law principles. We make no representation that this Privacy Policy and such practices comply with the laws of any other state or any country outside the United States. Any reference made in this Privacy Policy to the law or regulation of any other jurisdiction or governing body shall not in any way whatsoever modify this Section 12."
      ]
    },
    {
      title: "13. Dispute Resolution",
      content: [
        "If you have any concerns about privacy issues, please contact us as directed in this Privacy Policy. If, however, your claim, arising out of or relating to this Policy, has not been handled within forty-five (45) days of our receipt of notification from you, you may seek resolution by complying with the Dispute Resolution procedures found at Section 15 of the Terms of Use."
      ]
    },
    {
      title: "14. Updates to Policy",
      content: [
        "We reserve the right to occasionally update this Privacy Policy in the future. At such time, we will also revise the “last revised” date found at the top of this Policy. We encourage you to periodically review this Privacy Policy. You acknowledge and agree that it is your sole responsibility to review this Policy periodically for modifications."
      ]
    },
    {
      title: "How to Contact Us",
      content: [
        "Should you have questions, comments or disputes regarding this Policy, please contact us by mail or email at the following:",
        "EMAIL: contact@elitetaxconsultingservices.com",
        "MAIL: Elite Tax & Consulting Services ATTN: PRIVACY POLICY ADMINISTRATOR 981 W County Line Rd Greenwood, IN 46142"
      ]
    }
  ]
}

  const services = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Personal & Business Tax Services",
      description: "Complete Tax Solutions for Individuals & Businesses",
      items: [
        "Personal Tax Return Filing",
        "Business Tax Return Filing", 
        "Quarterly Tax Payments",
        "ITIN Application",
        "Amendment Return Status",
        "Federal Return Status"
      ],
      href: "/services/tax-services",
      gradient: "from-blue-500 to-blue-600",
      image: tax,
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: " Visa Application & Appointment Assistance",
      description: "Comprehensive Immigration Solutions Worldwide",
      items: [
        "Visa Applications ",
        "Emergency",
        "Form DS - 160",
        // "Green Card Applications", 
        // "Work Permit Applications",
      
        // "Immigration Case Expedite",
      ],
      href: "/services/immigration-visa",
      gradient: "from-blue-500 to-blue-600",
      image: svc2,
    },
    {
      icon: <Scale className="h-8 w-8" />,
      title: "USCIS & Immigration Assistance",
      description: "Expert Assistance with All USCIS Forms",
      items: [
        "Green Card Applications",
        "Petition for Relative Applications",
        " Work Permit Applications",
        " Travel Document",
        " (N-400) Citizenship/Naturalization",
        "Form DS-260",
      ],
      href: "/services/usics-forms",
      gradient: "from-blue-500 to-blue-600",
      image: usics,
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Documentation Services",
      description: "Professional Documentation Services",
      items: [
        // "Green Card Applications",
        "Indian Embassy Document Services",
        "Power of Attorney Services",
        "Affidavit Attestation",
        "OCI (Overseas Citizenship)",
        "Renunciation of Citizenship",
        "Immigration Case expedite"
      ],
      href: "/services/legal-documents",
      gradient: "from-blue-500 to-blue-600",
      image: svc41,
    },
    {
      icon: <Building className="h-8 w-8" />,
      title: "Business & Corporate Services",
      description: "Complete Business Formation & Corporate Solutions",
      items: [
        "LLC Formation & Setup",
        "S-Corp & C-Corp Setup",
        "Business Tax Forms",
        "Corporate Compliance",
        "Visa Services for Business",
        "EIN Application"
      ],
      href: "/services/business-services",
      gradient: "from-blue-500 to-blue-600",
      image: pro,
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Trucking Compliance & Setup",
      description: "Specialized Trucking Industry Services",
      items: [
        "MC & DOT Number Application",
        "Truck Permits & Plates",
        "USDOT Registration",
        "Operating Authority Filing",
        "Safety Compliance",
        "FMCSA Registration",
      ],
      href: "/services/trucking-services",
      gradient: "from-blue-500 to-blue-600",
      image: svc6,
    },
  ]
export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header (Duplicated from main page.tsx for reuse) */}
      <header className="bg-white shadow-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="bg-navy-900 text-white py-2 hidden md:block">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>317-999-3738 , 718-866-8602</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>info@elitetaxconsultingservices.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Mon-Fri 9AM-6:30PM</span> & <span>Sat 10AM-6:00PM</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span>Follow Us:</span>
                <div className="flex space-x-2">
                  <Link href="https://www.instagram.com/elite_taxandconsultingservices?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank">
                    <Button size="sm" variant="outline" className="border-blue-600 text-blue-300 hover:bg-blue-800 hover:text-white bg-transparent hover:scale-105 transition-all duration-200 w-fit text-xs md:text-sm">
                      Instagram
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image src={logo || "/placeholder.svg"} alt="Elite Tax Consulting" width={50} height={50} className="rounded-lg transition-transform group-hover:scale-105" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-navy-900 group-hover:text-blue-600 transition-colors">
                  Elite Tax & Consulting Services
                </h1>
              </div>
            </Link>
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-navy-800 hover:text-blue-600 transition-colors relative group">Home <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span></Link>
              <div className="relative group">
                <button className="flex items-center text-navy-800 hover:text-blue-600 transition-colors">
                  Services <ChevronDown className="h-4 w-4 ml-1 transform group-hover:rotate-180 transition-transform" />
                </button>
 <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-lg shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-3">
                      {services.map((service, index) => (
                        <Link
                          key={index}
                          href={service.href}
                          className="flex items-center p-3 rounded-lg hover:bg-blue-50 transition-colors group/item"
                        >
                          <div
                            className={`bg-gradient-to-r ${service.gradient} rounded-lg p-2 mr-3 flex items-center justify-center flex-shrink-0`}
                          >
                            <div className="text-white text-sm">{service.icon}</div>
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-semibold text-navy-900 group-hover/item:text-blue-600 transition-colors text-sm">
                              {service.title}
                            </h4>
                            <p className="text-xs text-gray-600 truncate">{service.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>              </div>
              <Link href="/#about" className="text-navy-800 hover:text-blue-600 transition-colors relative group">About <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span></Link>
              <Link href="/#reviews" className="text-navy-800 hover:text-blue-600 transition-colors relative group">Reviews <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span></Link>
              <Link href="/blog" className="text-navy-800 hover:text-blue-600 transition-colors relative group">Blog <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span></Link>
              <Link href="/#faq" className="text-navy-800 hover:text-blue-600 transition-colors relative group">FAQ <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span></Link>
              <Link href="/#contact" className="text-navy-800 hover:text-blue-600 transition-colors relative group">Contact <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span></Link>
              <Button onClick={() => window.open('tel:13179993738', '_self')} className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all">
                <Phone className="h-4 w-4 mr-2" /> Call Now
              </Button>
            </nav>
            <MobileMenu services={services} />
          </div>
        </div>
      </header>

      {/* Privacy Policy Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4 text-center">Privacy Policy</h1>
            {/* <p className="text-gray-600 text-center mb-8">{privacyContent.lastRevised}</p> */}
            <div className="space-y-8">
              {privacyContent.sections.map((section, index) => (
                <Card key={index} className="border-0 bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-navy-900">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {section.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-gray-700 leading-relaxed text-sm md:text-base">{paragraph}</p>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer (Duplicated from main page.tsx for reuse - MODIFIED to include Legal links) */}
      <footer className="bg-navy-900 text-white py-8 md:py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 to-blue-900"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="animate-fade-in">
              <div className="flex items-center space-x-3 mb-4">
                <Image src={logo || "/placeholder.svg"} alt="Elite Tax Consulting" width={40} height={40} className="rounded" />
                <div>
                  <h3 className="font-bold text-sm md:text-base">Elite Tax Consulting</h3>
                </div>
              </div>
              <p className="text-blue-100 text-xs md:text-sm">Your trusted partner for tax, immigration, and business solutions.</p>
            </div>
            <div className="animate-slide-in-up" style={{ animationDelay: "0.1s" }}>
              <h4 className="font-semibold mb-4 text-sm md:text-base">Services</h4>
              <ul className="space-y-2 text-xs md:text-sm text-blue-100">
                <li className="hover:text-white transition-colors cursor-pointer">Tax Services</li>
                <li className="hover:text-white transition-colors cursor-pointer">Immigration & Visa</li>
                <li className="hover:text-white transition-colors cursor-pointer">USCIS Forms</li>
                <li className="hover:text-white transition-colors cursor-pointer">Legal Documents</li>
                <li className="hover:text-white transition-colors cursor-pointer">Business Services</li>
                <li className="hover:text-white transition-colors cursor-pointer">Trucking Compliance</li>
              </ul>
            </div>
            <div className="animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
              <h4 className="font-semibold mb-4 text-sm md:text-base">Contact</h4>
              <ul className="space-y-2 text-xs md:text-sm text-blue-100">
                <li className="flex items-center hover:text-white transition-colors"><Phone className="h-4 w-4 mr-2" /> 317-999-3738 | 718-866-8602</li>
                <li className="flex items-center hover:text-white transition-colors"><Mail className="h-4 w-4 mr-2" /> info@elitetaxconsultingservices.com</li>
                <li className="flex items-center hover:text-white transition-colors"><Clock className="h-4 w-4 mr-2" /> Mon-Fri 9AM-6:30PM & Sat 10AM-6PM</li>
                <li className="flex items-start hover:text-white transition-colors"><MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" /><span>981W County Line Rd, Greenwood, 46142 Indiana</span></li>
              </ul>
            </div>
            
            <div className="animate-slide-in-up" style={{ animationDelay: "0.3s" }}>
              <h4 className="font-semibold mb-4 text-sm md:text-base">Legal</h4>
              <ul className="space-y-2 text-xs md:text-sm text-blue-100">
                <li className="hover:text-white transition-colors cursor-pointer"><Link href="/privacy">Privacy Policy</Link></li>
                {/* <li className="hover:text-white transition-colors cursor-pointer"><Link href="/terms">Terms of Use</Link></li> */}
              </ul>
              <h4 className="font-semibold mb-4 text-sm md:text-base mt-4">Follow Us</h4>
              <div className="flex flex-col space-y-2">
                <Link href="https://www.instagram.com/elite_taxandconsultingservices?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank">
                  <Button size="sm" variant="outline" className="border-blue-600 text-blue-300 hover:bg-blue-800 hover:text-white bg-transparent hover:scale-105 transition-all duration-200 w-fit text-xs md:text-sm">Instagram</Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-xs md:text-sm text-blue-300">
            <p>&copy; 2026 Elite Tax Consulting Services. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Sticky Widgets */}
      <WhatsAppWidget />
      <ChatBot />
    </div>
  )
}