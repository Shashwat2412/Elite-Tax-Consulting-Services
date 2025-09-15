"use client"

import { useEffect, useState } from "react"
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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog" // Add Dialog components
import { ChatBot } from "./components/chat-bot"
import { WhatsAppWidget } from "./components/whatsapp-widget"
import { MobileMenu } from "./components/mobile-menu"
import { useReviews } from "./hooks/useReviews"

import logo from "./logofinal.png"
import tax from "./tax.jpg"
import svc2 from "./sv2.jpg"
import svc21 from "./svc21.jpg"
import svc41 from "./svcv41.jpg"
import svc6 from "./svc6.jpg"
import banner from "./bsnner.png"
import usics from './usics.jpg'
import pro from './prof.jpg'
import { Skeleton } from "@/components/ui/skeleton"

export default function HomePage() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false) // New state for modal
  const { reviewsData, loading: reviewsLoading, error: reviewsError } = useReviews()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    questions: "",
    meetingDate: "",
    meetingTime: "",
    hearAbout: "",
    message: "",
  })

useEffect(() => {
    // Optional: Auto-close modal after a certain time (e.g., 30 seconds)
    // const timer = setTimeout(() => setIsModalOpen(false), 30000)
    // return () => clearTimeout(timer)


    const timer = setTimeout(() => {
      setIsModalOpen(true)
    }, 3000) // 3-second delay
    return () => clearTimeout(timer) // Cleanup on unmount
  }, [])

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsFormSubmitted(true)

    try {
      const response = await fetch("/api/form/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      const result = await response.json()

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsFormSubmitted(false)
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          questions: "",
          meetingDate: "",
          meetingTime: "",
          hearAbout: "",
          message: "",
        })
      }, 3000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setIsFormSubmitted(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleGoogleReview = () => {
    const googleReviewUrl = "https://g.page/r/CfS4mtz8vBL8EBI/review"
    window.open(googleReviewUrl, "_blank")
  }
  const handleWhatsAppClick = () => {
    const phoneNumber = "7188668602"
    const message = "Hi! I'm interested in your tax and immigration services. Can you help me?"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const convertTo24Hour = (time12h: string) => {
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

  const addHour = (time24h: string) => {
    const [hours, minutes] = time24h.split(":")
    const newHour = (Number.parseInt(hours, 10) + 1).toString().padStart(2, "0")
    return `${newHour}:${minutes}`
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
      title: "Indian Embassy & Visa Services",
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
      title: "Legal & Documentation",
      description: "Professional Legal Documentation Services",
      items: [
        "Green Card Applications",
        "Passport Application Assistance",
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

  const faqs = [
    {
      question: "Will a professional tax consultant handle my return?",
      answer:
        "Yes. When you choose Elite Tax & Consulting Services, a dedicated tax consultant will personally manage the entire process—from collecting your documents to preparing, reviewing, and e-filing your return. We make sure your taxes are done right, on time, and with the best possible outcome.",
    },
    {
      question: "What tax services do you offer for individuals and businesses?",
      answer:
        "Elite Tax & Consulting Services provides complete professional solutions, including: Personal & Business Tax Services – Tax return filing, planning, and IRS audit support. Immigration & Visa Services – Visa, Green Card, OCI, and renunciation assistance. USCIS & Immigration Forms Assistance – Guidance in preparing and submitting immigration paperwork. Legal & Documentation Services – Notary, affidavits, power of attorney, and document authentication. Business & Corporate Services – Company registration, EIN, compliance, and annual filings. Trucking Compliance & Setup Services – MC/DOT registration, permits, and regulatory compliance.",
    },
    {
      question: "Do you guarantee the maximum tax refund?",
      answer:
        "While no one can guarantee a specific refund amount, our goal is to ensure your return is prepared accurately and in full compliance with tax laws—while claiming every deduction and credit you're legally entitled to. We use a thorough review process to help you get the best possible outcome based on your situation.",
    },
    {
      question: "Can you help if I'm not ready to file before the tax deadline?",
      answer:
        "Absolutely. We can file an IRS extension (Form 4868) on your behalf, giving you more time to prepare. Extensions extend your filing deadline, but any taxes owed must still be estimated and paid by the original due date to avoid penalties.",
    },
    {
      question: "How do you keep my information secure?",
      answer:
        "We use secure, encrypted systems to protect your data. All communication is handled through trusted channels by your assigned consultant. We also recommend adding our official email to your safe senders list to ensure you never miss important tax updates.",
    },
    {
      question: "What does a tax consultant do?",
      answer:
        "A tax consultant prepares, reviews, and files tax returns, ensures compliance with tax laws, and finds ways to maximize refunds or minimize taxes. Elite assigns you a professional to manage everything.",
    },
    {
      question: "Is it worth hiring a tax consultant?",
      answer:
        "Yes. A tax consultant saves time, reduces errors, and ensures you claim all eligible deductions and credits.",
    },
    {
      question: "How much does it cost to hire a tax consultant?",
      answer:
        "Pricing depends on the complexity of your return. Elite offers transparent, affordable packages for individuals and businesses with no hidden fees.",
    },
    {
      question: "Can a tax consultant help me get a bigger refund?",
      answer:
        "Yes. Our experts use every legal deduction and credit available to maximize your refund, and our Maximum Refund Guarantee backs it up.",
    },
    {
      question: "How do I choose the best tax consultant near me?",
      answer:
        "Look for proven experience, accuracy guarantees, strong reviews, and secure data handling. Elite Tax & Consulting meets all these standards with personalized, one-on-one service.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">

<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md bg-white rounded-lg shadow-2xl border-0 p-6">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl font-bold text-navy-900 text-center">
              Get Expert Help in 30 Mins
            </DialogTitle>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              {/* <X className="h-5 w-5" /> */}
            </button>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-sm md:text-base text-gray-600">
              Connect with our experts instantly via WhatsApp for personalized tax and immigration assistance.
            </p>
            <Button
              onClick={handleWhatsAppClick}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 text-sm md:text-base font-semibold flex items-center justify-center mx-auto transform hover:scale-105 transition-all duration-200"
            >
              <svg
                className="h-5 w-5 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.134.559 4.135 1.537 5.88L0 24l6.305-1.653a11.95 11.95 0 005.695 1.446c6.627 0 12-5.373 12-12S18.627 0 12 0zm6.503 16.427c-.294.832-.973 1.52-1.854 1.737-.788.194-1.81.367-2.946-.404-1.25-.847-2.305-1.835-3.292-2.976-.987-1.14-1.854-2.378-2.146-3.79-.294-1.412.147-2.305.876-3.097.176-.194.412-.294.647-.294h.441c.235 0 .47.118.647.529.176.412.588.988.824 1.4.235.412.294.647.059.882-.235.235-.353.412-.588.647-.235.235-.412.529-.176.764.882 1.058 1.94 1.94 3.232 2.523.294.147.588.235.882.118.294-.118 1.058-.529 1.763-.823.706-.294 1.293-.176 1.528.118.235.294 1.058.706 1.234 1.058.176.353.176.647-.118 1.058z" />
              </svg>
              Message Us on WhatsApp
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
                  <span>elitetaxandconsultingservices@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Mon-Fri 9AM-6:30PM</span>        &           <span>Sat 10AM-6:00PM</span>

                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span>Follow Us:</span>
                <div className="flex space-x-2">
                  <Link href="https://www.instagram.com/elite_taxandconsultingservices?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-600 text-blue-300 hover:bg-blue-800 hover:text-white bg-transparent hover:scale-105 transition-all duration-200 w-fit text-xs md:text-sm"
                    >
                      Instagram
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image
                  src={logo || "/placeholder.svg"}
                  alt="Elite Tax Consulting"
                  width={50}
                  height={50}
                  className="rounded-lg transition-transform group-hover:scale-105"
                />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-navy-900 group-hover:text-blue-600 transition-colors">
                   Elite Tax & Consulting Services
                </h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-navy-800 hover:text-blue-600 transition-colors relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
              {/* <Link href="/blog" className="text-navy-800 hover:text-blue-600 transition-colors relative group">
                Blog
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>  */}

              {/* Services Dropdown */}
              <div className="relative group">
                <button className="flex items-center text-navy-800 hover:text-blue-600 transition-colors">
                  Services
                  <ChevronDown className="h-4 w-4 ml-1 transform group-hover:rotate-180 transition-transform" />
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
                </div>
              </div>

              <a href="#about" className="text-navy-800 hover:text-blue-600 transition-colors relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
              <a href="#reviews" className="text-navy-800 hover:text-blue-600 transition-colors relative group">
                Reviews
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
              <Link href="/blog" className="text-navy-800 hover:text-blue-600 transition-colors relative group">
                Blog
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link> 
              <a href="#faq" className="text-navy-800 hover:text-blue-600 transition-colors relative group">
                FAQ
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
              <a href="#contact" className="text-navy-800 hover:text-blue-600 transition-colors relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>

              <Button
  onClick={() => {
    const phoneNumber = "13179993738"; // Same number as WhatsApp
    window.open(`tel:${phoneNumber}`, "_self");
  }}
  className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all"
>
  <Phone className="h-4 w-4 mr-2" />
  Call Now
</Button>
            </nav>

            {/* Mobile Menu */}
            <MobileMenu services={services} />
          </div>
        </div>
      </header>

      {/* Hero Section with Banner and Overlapping Form */}
      <section className="relative bg-white">
         <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden bg-gradient-to-r from-blue-900 to-blue-700">
          <Image
            src={banner || "/placeholder.svg"}
            alt="Professional Tax and Immigration Services - Collaborative Business Meeting"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 flex items-center px-4 sm:px-6 md:px-8">
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center w-full">
                {/* Left Side - Content */}
                    <div className="text-white space-y-4 sm:space-y-6 md:space-y-8 animate-fade-in pr-4 lg:pr-8">

                  <div className="space-y-3 sm:space-y-4 md:space-y-6">

                    <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                      Elite Tax & Consulting Services
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-blue-100 leading-relaxed">
                      Maximize your tax savings by up to 50% with Elite Tax Consulting Services
                    </p>
                                        <p className="font-bold text-3xl mt-5">Through out the all states in USA</p>  

                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                    onClick={() => {
                        window.location.href = "/#consultation-form"
                      }}
                      size="lg"
                      className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold transform hover:scale-105 transition-all duration-200"
                    >
                      BOOK A FREE CONSULTATION
                    </Button>
                  </div>

                  {/* Stats Grid - Better mobile display */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 pt-4 sm:pt-6 md:pt-8">
                    {[
                      { number: "500+", label: "Happy Clients" },
                      { number: "4+", label: "Years Experience" },
                      { number: "24hr", label: "Response Time" },
                      { number: "100%", label: "Compliance Rate" },
                    ].map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-300 mb-1 sm:mb-2">
                          {stat.number}
                        </div>
                        <div className="text-xs sm:text-sm md:text-base text-blue-100">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side - Spacer for form positioning */}
                <div className="hidden lg:block"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlapping Form - Enhanced with new fields */}
          {/* Overlapping Form - Desktop only */}
        <div className="hidden lg:block absolute top-1/2 right-4 sm:right-6 md:right-8 lg:right-16 xl:right-64 transform -translate-y-1/6 z-20 w-full max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-md px-2 sm:px-0">
          <Card
            id="consultation-form"
            className="bg-white shadow-2xl border-0 animate-slide-in-right mx-2 sm:mx-4 lg:mx-0"
          >
            <CardHeader className="bg-blue-500 text-white text-center rounded-t-lg pb-4 sm:pb-6 pt-4 sm:pt-6 md:pt-8 -mt-2 sm:-mt-4 md:-mt-6">
              <CardTitle className="text-base sm:text-lg md:text-2xl font-bold">Book a Free Consultation</CardTitle>
            </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6">
              {isFormSubmitted ? (
                <div className="text-center py-4 sm:py-6 md:py-8 animate-fade-in">
                  <CheckCircle className="h-10 sm:h-12 md:h-16 w-10 sm:w-12 md:w-16 text-green-500 mx-auto mb-3 sm:mb-4 animate-bounce" />
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-navy-900 mb-2">Thank You!</h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-3 sm:mb-4">
                    Your consultation has been scheduled. Check your email for confirmation and Google Meet link.
                  </p>
                  <Badge className="bg-green-100 text-green-800 animate-pulse">
                  <Calendar className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />
                    Meeting Scheduled
                  </Badge>
                </div>
              ) : (

                <form onSubmit={handleFormSubmit} className="space-y-2 sm:space-y-3 md:space-y-4">
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div>
                      <Input
                        placeholder="First name*"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-xs text-xs sm:text-sm h-8 sm:h-10"
                      />
                    </div>
                    <div>
                      <Input
                        placeholder="Last name*"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-xs sm:text-sm h-8 sm:h-10"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div>
                      <Input
                        type="email"
                        placeholder="Email*"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-xs sm:text-sm h-8 sm:h-10"
                      />
                    </div>
                    <div>
                      <Input
                        type="tel"
                        placeholder="Phone*"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-xs sm:text-sm h-8 sm:h-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Input
                      placeholder="Company name"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-xs sm:text-sm h-8 sm:h-10"
                    />
                  </div>

                  <div>
                    <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                      <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-xs sm:text-sm h-8 sm:h-10">
                        <SelectValue placeholder="What service are you looking for?*" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tax-services">Personal Tax Services</SelectItem>
                        <SelectItem value="business-tax">Business Tax Services</SelectItem>
                        <SelectItem value="immigration-visa">Indian Embassy & Visa Services</SelectItem>
                        <SelectItem value="uscis-forms">USCIS & Immigration Assistance</SelectItem>
                        <SelectItem value="legal-documents">Legal & Documentation Services</SelectItem>
                        <SelectItem value="business-services">Business & Corporate Services</SelectItem>
                        <SelectItem value="trucking-services">Trucking Compliance & Setup</SelectItem>
                               <SelectItem value="english">Elite Trucker English Learn</SelectItem>
                        <SelectItem value="other">Other / Not Sure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    <div>
                      <Input
                        type="date"
                        placeholder="Preferred Date"
                        value={formData.meetingDate}
                        onChange={(e) => handleInputChange("meetingDate", e.target.value)}
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div>
                      <Select
                        value={formData.meetingTime}
                        onValueChange={(value) => handleInputChange("meetingTime", value)}
                      >
                        <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm">
                          <SelectValue placeholder="Time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                          <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                          <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                          <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                          <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                          <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                          <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                          <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                          <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Select value={formData.hearAbout} onValueChange={(value) => handleInputChange("hearAbout", value)}>
                      <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm">
                        <SelectValue placeholder="How did you hear about Elite Tax?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="google">Google Search</SelectItem>
                        <SelectItem value="referral">Referral</SelectItem>
                        <SelectItem value="social-media">Social Media</SelectItem>
                        <SelectItem value="advertisement">Advertisement</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Textarea
                      placeholder="Do you have any specific questions for us?"
                      value={formData.questions}
                      onChange={(e) => handleInputChange("questions", e.target.value)}
                      rows={2}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm"
                    />
                  </div>

                  <div>
                    <Textarea
                      placeholder="Additional message (optional)"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      rows={2}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm"
                    />
                  </div>

                  <div className="text-xs text-gray-600">
                    By providing your information you agree to our privacy policy.
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 md:py-3 text-sm md:text-lg font-semibold transform hover:scale-105 transition-all duration-200"
                  >
                    SUBMIT
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="lg:hidden py-8 bg-gray-50">

        <div className="container mx-auto px-4">

          <Card className="bg-white shadow-xl border-0 max-w-md mx-auto">

            <CardHeader className="bg-blue-500 text-white text-center rounded-t-lg pb-6 pt-6">

              <CardTitle className="text-xl font-bold">Book a Free Consultation</CardTitle>

            </CardHeader>

            <CardContent className="p-6">

              {isFormSubmitted ? (

                <div className="text-center py-6 animate-fade-in">

                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4 animate-bounce" />

                  <h3 className="text-lg font-semibold text-navy-900 mb-2">Thank You!</h3>

                  <p className="text-sm text-gray-600 mb-4">

                    Your consultation has been scheduled. Check your email for confirmation and Google Meet link.

                  </p>

                  <Badge className="bg-green-100 text-green-800 animate-pulse">

                    <Calendar className="h-4 w-4 mr-1" />

                    Meeting Scheduled

                  </Badge>

                </div>

              ) : (

                <form onSubmit={handleFormSubmit} className="space-y-4">

                  <div className="grid grid-cols-2 gap-3">

                    <div>

                      <Input

                        placeholder="First name*"

                        value={formData.firstName}

                        onChange={(e) => handleInputChange("firstName", e.target.value)}

                        required

                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm h-10"

                      />

                    </div>

                    <div>

                      <Input

                        placeholder="Last name*"

                        value={formData.lastName}

                        onChange={(e) => handleInputChange("lastName", e.target.value)}

                        required

                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm h-10"

                      />

                    </div>

                  </div>



                  <div className="grid grid-cols-2 gap-3">

                    <div>

                      <Input

                        type="email"

                        placeholder="Email*"

                        value={formData.email}

                        onChange={(e) => handleInputChange("email", e.target.value)}

                        required

                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm h-10"

                      />

                    </div>

                    <div>

                      <Input

                        type="tel"

                        placeholder="Phone*"

                        value={formData.phone}

                        onChange={(e) => handleInputChange("phone", e.target.value)}

                        required

                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm h-10"

                      />

                    </div>

                  </div>



                  <div>

                    <Input

                      placeholder="Company name"

                      value={formData.company}

                      onChange={(e) => handleInputChange("company", e.target.value)}

                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm h-10"

                    />

                  </div>



                  <div>

                    <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>

                      <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm h-10">

                        <SelectValue placeholder="What service are you looking for?*" />

                      </SelectTrigger>

                      <SelectContent>

                        <SelectItem value="tax-services">Personal Tax Services</SelectItem>

                        <SelectItem value="business-tax">Business Tax Services</SelectItem>

                        <SelectItem value="immigration-visa">Indian Embassy & Visa Services</SelectItem>

                        <SelectItem value="uscis-forms">USCIS & Immigration Assistance</SelectItem>

                        <SelectItem value="legal-documents">Legal & Documentation Services</SelectItem>

                        <SelectItem value="business-services">Business & Corporate Services</SelectItem>

                        <SelectItem value="trucking-services">Trucking Compliance & Setup</SelectItem>
                               <SelectItem value="english">Elite Trucker English Learn</SelectItem>

                        <SelectItem value="other">Other / Not Sure</SelectItem>

                      </SelectContent>

                    </Select>

                  </div>



                  <div className="grid grid-cols-2 gap-3">

                    <div>

                      <Input

                        type="date"

                        placeholder="Preferred Date"

                        value={formData.meetingDate}

                        onChange={(e) => handleInputChange("meetingDate", e.target.value)}

                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm h-10"

                        min={new Date().toISOString().split("T")[0]}

                      />

                    </div>

                    <div>

                      <Select

                        value={formData.meetingTime}

                        onValueChange={(value) => handleInputChange("meetingTime", value)}

                      >

                        <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm h-10">

                          <SelectValue placeholder="Time" />

                        </SelectTrigger>

                        <SelectContent>

                          <SelectItem value="9:00 AM">9:00 AM</SelectItem>

                          <SelectItem value="10:00 AM">10:00 AM</SelectItem>

                          <SelectItem value="11:00 AM">11:00 AM</SelectItem>

                          <SelectItem value="12:00 PM">12:00 PM</SelectItem>

                          <SelectItem value="1:00 PM">1:00 PM</SelectItem>

                          <SelectItem value="2:00 PM">2:00 PM</SelectItem>

                          <SelectItem value="3:00 PM">3:00 PM</SelectItem>

                          <SelectItem value="4:00 PM">4:00 PM</SelectItem>

                          <SelectItem value="5:00 PM">5:00 PM</SelectItem>

                        </SelectContent>

                      </Select>

                    </div>

                  </div>



                  <div>

                    <Select value={formData.hearAbout} onValueChange={(value) => handleInputChange("hearAbout", value)}>

                      <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm h-10">

                        <SelectValue placeholder="How did you hear about Elite Tax?" />

                      </SelectTrigger>

                      <SelectContent>

                        <SelectItem value="google">Google Search</SelectItem>

                        <SelectItem value="referral">Referral</SelectItem>

                        <SelectItem value="social-media">Social Media</SelectItem>

                        <SelectItem value="advertisement">Advertisement</SelectItem>

                        <SelectItem value="other">Other</SelectItem>

                      </SelectContent>

                    </Select>

                  </div>



                  <div>

                    <Textarea

                      placeholder="Do you have any specific questions for us?"

                      value={formData.questions}

                      onChange={(e) => handleInputChange("questions", e.target.value)}

                      rows={2}

                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm"

                    />

                  </div>



                  <div>

                    <Textarea

                      placeholder="Additional message (optional)"

                      value={formData.message}

                      onChange={(e) => handleInputChange("message", e.target.value)}

                      rows={2}

                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm"

                    />

                  </div>



                  <div className="text-xs text-gray-600">

                    By providing your information you agree to our privacy policy.

                  </div>



                  <Button

                    type="submit"

                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-200"

                  >

                    SUBMIT

                  </Button>

                </form>

              )}

            </CardContent>

          </Card>

        </div>

      </section>

      {/* Content Section - Better mobile spacing */}
      <section className="py-8 md:py-16 bg-gray-50 pt-20 md:pt-24" id="about">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">
            {/* Left Column - Content */}
            <div className="space-y-4 md:space-y-6 text-gray-700 leading-relaxed order-2 lg:order-1">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4 md:mb-6">
                About Elite Tax Consulting Services
              </h2>
              <p className="text-base md:text-lg">
                At Elite Tax Consulting Services, we offer a wide range of services to cater to your personal, 
                immigration forms assistance and business needs. Our experienced team provides comprehensive solutions for individuals,
                families, and businesses across multiple industries.
              </p>

              <p className="text-base md:text-lg">
                From tax preparation and immigration services to business formation and trucking compliance, we handle
                all aspects of your professional and personal documentation needs. Our multilingual team ensures that
                language is never a barrier to receiving quality service.
              </p>

              <p className="text-base md:text-lg">
                We specialize in complex cases and provide personalized attention to each client. Whether you need help
                with USCIS forms, business setup, or tax planning, our certified professionals are here to guide you
                through every step of the process.
              </p>

              <p className="text-base md:text-lg">
                With years of experience and a commitment to excellence, Elite Tax Consulting Services is your trusted
                partner for all your tax, immigration, legal, and business needs. We stay up-to-date with the latest
                regulations to ensure full compliance and maximum benefits for our clients.
              </p>
            </div>
          </div>
        </div>
      </section>


         <div className=" bg-gradient-to-r from-navy-900 to-blue-800 text-white p-4 mx-8 md:p-6 lg:p-8 rounded-lg shadow-lg order-1 lg:order-2 lg:my-16 xl:my-24">
              <div className="text-center mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                  Get your taxes done right and your biggest tax refund—
                  <span className="text-white">guaranteed</span>
                </h3>
              </div>

              <div className="grid mx-3 grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {[
                  {
                    title: "TAX RETURN LIFETIME GUARANTEE",
                    subtitle: "Your tax return, backed for life",
                    description: "100% accuracy guaranteed. All backed by the full faith and credit of our guarantee.",
                    icon: "🛡️",
                  },
                  {
                    title: "MAXIMUM REFUND GUARANTEE",
                    subtitle: "Your best tax outcome",
                    description:
                      "We'll find every deduction and credit to help you'll get your maximum refund, guaranteed or your money back.",
                    icon: "💰",
                  },
                  {
                    title: "100% ACCURATE GUARANTEE",
                    subtitle: "Your Taxes, Our Priority",
                    description: "Your taxes will be done right, guaranteed, or we'll pay any IRS penalties.",
                    icon: "✅",
                  },
                ].map((guarantee, index) => (
                  <div key={index} className="text-center">
                    <div className="relative mb-4">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg border-4 border-yellow-300">
                        <div className="text-2xl">{guarantee.icon}</div>
                      </div>
                      <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full border-2 border-dashed border-yellow-600 animate-spin-slow"></div>
                    </div>
                    <h4 className="font-bold text-white text-sm mb-2 leading-tight">{guarantee.title}</h4>
                    <p className="font-semibold text-white text-sm mb-2">{guarantee.subtitle}</p>
                    <p className="text-white text-xs leading-relaxed">{guarantee.description}</p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button   onClick={() => {
                        window.location.href = "/#consultation-form"
                      }} className="bg-orange-600 hover:bg-blue-700 text-white px-6 py-2 text-sm font-semibold transform hover:scale-105 transition-all duration-200">
                  Get Your Guaranteed Refund
                </Button>
              </div>
            </div>

      {/* Services Section - Mobile responsive grid */}
      <section id="services" className="py-8 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12 animate-fade-in">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy-900 mb-4">Our Services</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions for all your tax, immigration, legal, business, and trucking compliance needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {services.map((service, index) => (
              <Link key={index} href={service.href}>
                <Card className="hover:shadow-2xl transition-all duration-300 border-0 bg-white group cursor-pointer transform hover:scale-105 overflow-hidden h-full">
                  <div className="relative h-32 md:h-48 overflow-hidden">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={`${service.title} - Professional Services`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                 
                    <div className="absolute top-2 md:top-4 left-2 md:left-4 bg-white rounded-full p-2 md:p-3 shadow-lg">
                      <div className="text-navy-900 text-sm md:text-base">{service.icon}</div>
                    </div>
                  </div>
                  <CardHeader className="pb-2 md:pb-4 p-4 md:p-6">
                    <CardTitle className="text-base md:text-lg text-navy-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                      {service.title}
                      <ArrowRight className="h-4 md:h-5 w-4 md:w-5 transform group-hover:translate-x-1 transition-transform" />
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-sm">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0">
                    <ul className="space-y-1 md:space-y-2">
                      {service.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center text-xs md:text-sm text-gray-700">
                          <CheckCircle className="h-3 md:h-4 w-3 md:w-4 text-green-500 mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section - Mobile responsive */}
      <section id="reviews" className="py-8 md:py-16  bg-gradient-to-r from-navy-900 to-blue-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
            <p className="text-base md:text-lg text-white max-w-2xl mx-auto mb-6 md:mb-8">
              Real reviews from our satisfied clients on Google
            </p>
            <Button
              onClick={handleGoogleReview}
              className="bg-orange-600 hover:bg-blue-700 text-white px-4 md:px-8 py-2 md:py-3 text-sm md:text-lg font-semibold transform hover:scale-105 transition-all duration-200"
            >
              <Star className="h-4 md:h-5 w-4 md:w-5 mr-2" />
              Review Us on Google
              <ExternalLink className="h-3 md:h-4 w-3 md:w-4 ml-2" />
            </Button>
          </div>

          {/* Loading State */}
          {reviewsLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
              {[...Array(4)].map((_, index) => (
                <Card key={index} className="bg-white border-0">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center mb-4">
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-4 w-16 ml-2" />
                    </div>
                    <Skeleton className="h-8 w-8 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <div className="border-t pt-4">
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Error State */}
          {reviewsError && (
            <div className="text-center py-8 md:py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 md:p-6 max-w-md mx-auto">
                <h3 className="text-base md:text-lg font-semibold text-red-800 mb-2">Unable to Load Reviews</h3>
                <p className="text-sm md:text-base text-red-600 mb-4">
                  We're having trouble loading our latest reviews. Please try again later.
                </p>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-50"
                >
                  <Loader2 className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {/* Reviews Display */}
          {/* {reviewsData && !reviewsLoading && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
                {reviewsData.reviews.slice(0, 4).map((review) => (
                  <Card
                    key={review.id}
                    className="bg-white hover:shadow-xl transition-all duration-300 border-0 transform hover:scale-105"
                  >
                    <CardContent className="p-4 md:p-6">
                      <div className="flex items-center mb-4">
                        <div className="flex text-yellow-400">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 md:h-5 w-4 md:w-5 fill-current" />
                          ))}
                        </div>
                        <span className="ml-2 text-xs md:text-sm text-gray-600">
                          {review.relative_time_description}
                        </span>
                      </div>
                      <Quote className="h-6 md:h-8 w-6 md:w-8 text-blue-200 mb-3" />
                      <p className="text-sm md:text-base text-gray-700 mb-4 italic line-clamp-4">"{review.text}"</p>
                      <div className="border-t pt-4">
                        <p className="font-semibold text-navy-900 text-sm md:text-base">{review.author_name}</p>
                        <div className="flex items-center text-xs md:text-sm text-blue-600">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          <span>Google Review</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 md:h-6 w-5 md:w-6 fill-current" />
                    ))}
                  </div>
                  <span className="text-xl md:text-2xl font-bold text-navy-900">{reviewsData.averageRating}/5</span>
                </div>
                <p className="text-sm md:text-base text-gray-600">
                  Based on {reviewsData.totalReviews}+ Google Reviews
                </p>
              </div>
            </>
          )} */}
        </div>
      </section>

      {/* FAQ Section - Mobile responsive */}
      <section id="faq" className="py-8 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our services
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <CardHeader
                    className="cursor-pointer p-4 md:p-6"
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-base md:text-lg font-semibold text-navy-900 pr-4">{faq.question}</h3>
                      <div className="text-blue-600 flex-shrink-0">
                        {openFAQ === index ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                      </div>
                    </div>
                  </CardHeader>
                  {openFAQ === index && (
                    <CardContent className="pt-0 p-4 md:p-6 animate-fade-in">
                      <p className="text-sm md:text-base text-gray-700 leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section with Map - Split layout */}
      <section id="contact" className="py-8 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12 animate-fade-in">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy-900 mb-4">Get In Touch</h2>
            <p className="text-base md:text-lg text-gray-600">
              Ready to get started? Contact us today for a free consultation
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Left Side - Contact Details */}
            <div className="space-y-6 md:space-y-8">
              <div className="grid  md:grid-cols-2 gap-4 md:gap-6">
                {[
                  {
                    icon: <Phone className="h-8 md:h-12 w-8 md:w-12 text-blue-600 mx-auto mb-4" />,
                    title: "Call Us",
                    description: "Speak with our experts",
                    action: "317-999-3738 | 718-866-8602",
                    gradient: "from-blue-500 to-blue-600",
                  },
                  {
                    icon: <Mail className="h-8 md:h-12 w-8 md:w-12 text-blue-600 mx-auto mb-4" />,
                    title: "Email Us",
                    description: "Send us your questions",
                    action: "elitetaxandconsultingservices@gmail.com",
                    gradient: "from-green-500 to-green-600",
                  },
                ].map((contact, index) => (
                  <Card
                    key={index}
                    className="text-center hover:shadow-2xl transition-all duration-300 group transform hover:scale-105 border-0 bg-white relative overflow-hidden"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${contact.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
                    ></div>
                    <CardContent className="pt-4 md:pt-6 p-2 md:p-2 relative">
                      <div className="group-hover:scale-110 transition-transform duration-300">{contact.icon}</div>
                      <h3 className="font-semibold text-navy-900 mb-2 group-hover:text-blue-600 transition-colors text-sm md:text-base">
                        {contact.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-xs md:text-sm">{contact.description}</p>
                      <Button
                        variant="outline"
                        className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent group-hover:transform group-hover:scale-105 transition-all text-xs md:text-sm"
                      >
                        {contact.action}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Address Card */}
              <Card className="bg-white border-0 shadow-lg">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 rounded-full p-3 flex-shrink-0">
                      <MapPin className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-900 mb-2 text-sm md:text-base">Visit Our Office</h3>
                      <p className="text-gray-600 text-xs md:text-sm mb-2">
                        Come to our office for in-person consultation
                      </p>
                      <div className="text-xs md:text-sm text-gray-700">
                        <p className="font-medium">Elite Tax & Consulting Services Inc.</p>
                        <p>180 US-31, Whiteland, IN 46184</p>
                        <p>United States</p>
                        <p>Gurpreet Singh (Registered tax Preparer)</p>
                        <p>Fax 929-810-3644</p>
                      </div>
                      <div className="mt-3">
                        <Button
                          variant="outline"
                           onClick={() =>
    window.open(
      "https://www.google.com/maps/dir//180+US-31+Whiteland,+IN+46184/@39.5523292,-86.0884002,17z/data=!4m5!4m4!1m0!1m2!1m1!1s0x886b687bd41ff693:0x5106f881bed5d97e",
      "_blank"
    )
  }
                          className="border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent text-xs md:text-sm"
                        >
                          Get Directions
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card className="bg-white border-0 shadow-lg">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-900 mb-2 text-sm md:text-base">Business Hours</h3>
                      <div className="text-xs md:text-sm text-gray-700 space-y-1">
                        <p>
                          <span className="font-medium">Monday - Friday:</span> 9:00 AM - 6:30 PM
                        </p>
                        <p>
                          <span className="font-medium">Saturday:</span> 10:00 AM - 6:00 PM
                        </p>
                        <p>
                          <span className="font-medium">Sunday:</span> Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Map */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-64 md:h-96 lg:h-full min-h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.8234567890123!2d-86.1234567!3d39.5678901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x886b50c123456789%3A0x123456789abcdef0!2s180%20US-31%2C%20Whiteland%2C%20IN%2046184%2C%20USA!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Elite Tax Consulting Services Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Mobile responsive */}
      <footer className="bg-navy-900 text-white py-8 md:py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 to-blue-900"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="animate-fade-in">
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src={logo || "/placeholder.svg"}
                  alt="Elite Tax Consulting"
                  width={40}
                  height={40}
                  className="rounded"
                />
                <div>
                  <h3 className="font-bold text-sm md:text-base">Elite Tax Consulting</h3>
                </div>
              </div>
              <p className="text-blue-100 text-xs md:text-sm">
                Your trusted partner for tax, immigration, and business solutions.
              </p>
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
                <li className="flex items-center hover:text-white transition-colors">
                  <Phone className="h-4 w-4 mr-2" /> 317-999-3738 | 718-866-8602

                </li>
                <li className="flex items-center hover:text-white transition-colors">
                  <Mail className="h-4 w-4 mr-2" /> elitetaxandconsultingservices@gmail.com

                </li>
                <li className="flex items-center hover:text-white transition-colors">
                  <Clock className="h-4 w-4 mr-2" /> Mon-Fri 9AM-6:30PM  & Sat 10AM-6PM
                               

                </li>
                <li className="flex items-start hover:text-white transition-colors">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>180 US-31, Whiteland, IN 46184, United States</span>
                </li>
              </ul>
            </div>

            <div className="animate-slide-in-up" style={{ animationDelay: "0.3s" }}>
              <h4 className="font-semibold mb-4 text-sm md:text-base">Follow Us</h4>
              <div className="flex flex-col space-y-2">
                <Link href="https://www.instagram.com/elite_taxandconsultingservices?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-600 text-blue-300 hover:bg-blue-800 hover:text-white bg-transparent hover:scale-105 transition-all duration-200 w-fit text-xs md:text-sm"
                    >
                      Instagram
                    </Button>
                  </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-blue-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-xs md:text-sm text-blue-300">
            <p>&copy; 2024 Elite Tax Consulting Services. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Sticky Widgets */}
      <WhatsAppWidget />
      <ChatBot />
    </div>
  )
}
