"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Scale, FileText, Users, CheckCircle, Clock, Shield, Award, Phone, Mail, MessageCircle, Globe, Heart, FileCheck } from 'lucide-react'
import { ChatBot } from "../../components/chat-bot"
import { WhatsAppWidget } from "../../components/whatsapp-widget"
import logo from '../../logofinal.png'


export default function USCISFormsPage() {
  const uscisServices = [
    {
      title: "Family-Based Immigration Forms",
      description:
        "Complete assistance with family-based immigration forms to reunite with your loved ones in the United States.",
      features: [
        " Petition for Alien Relative",
        " Affidavit of Support",
      ],
      icon: <Heart className="h-8 w-8" />,
      image: "/fam.jpg",
    },
    {
      title: "Employment-Based Immigration Forms",
      description:
        "Professional guidance for employment-based immigration forms and work authorization applications.",
      features: [
        " Immigrant Petition for Alien Worker",
        // "Form I-485 (Adjustment of Status)",
        // "Form I-765 (Employment Authorization)",
        // "Form I-94 (Arrival/Departure Record)",
        // "PERM Labor Certification",
        // "H-1B, L-1, O-1 Applications",
      ],
      icon: <Users className="h-8 w-8" />,
      image: "/emp.jpeg",
    },

    //  {
    //   title: "Green Card Applications",
    //   description: "End-to-end guidance to help you become a lawful permanent resident of the United States.",
    //   features: [
    //     "Family-based green cards",
    //     "Employment-based green cards",
    //     "Investment-based green cards",
    //     "Diversity visa program",
    //     "Adjustment of status",
    //     "Consular processing",
    //     "US tourist visa from any country with appointment support at very reasonable cost",
    //   ],
    //   icon: <FileCheck className="h-8 w-8" />,
    //   image: "/gr.jpg",
    // },
    {
      title: "Work Permit Applications",
      description: "Secure employment authorization with our expert help.",
      features: [
        "A 5 Asylee",
        "A 10 Withholding of deportation or removal granted  ",
        "C 8 Asylum application pending",
        "C 9 Pending adjustment of status  ",
        "C 31 VAWA self-petitioners with an approved Form I-360 ",
        "C 3 C F-1 student",
        "A 19 U-1 nonimmigrant",
        "Form I-765 – Application for Employment Authorization (EAD)",
      ],
      icon: <Users className="h-8 w-8" />,
      image: "/wpnew.jpg",
    },
    // {
    //   title: "Citizenship & Naturalization Forms",
    //   description:
    //     "Expert assistance with citizenship applications and naturalization process documentation.",
    //   features: [
    //     "Form N-400 (Citizenship Application)",
    //     "Form N-600 (Certificate of Citizenship)",
    //     "Form N-565 (Replacement Certificate)",
    //     "Citizenship test preparation",
    //     "Interview preparation",
    //     "Document translation services",
    //   ],
    //   icon: <Award className="h-8 w-8" />,
    //   image: "/placeholder.svg?height=300&width=400",
    // },
    // {
    //   title: "Consular Processing Forms",
    //   description:
    //     "Complete support for consular processing and visa applications through US embassies and consulates.",
    //   features: [
    //     "Form DS-160 (Online Application)",
    //     "Form DS-260 (Immigrant Visa)",
    //     "Form DS-230 (Visa Application)",
    //     "NVC document preparation",
    //     "Interview scheduling assistance",
    //     "Embassy appointment support",
    //   ],
    //   icon: <Globe className="h-8 w-8" />,
    //   image: "/placeholder.svg?height=300&width=400",
    // },
    {
      title: " Humanitarian & Special Petitions",
      description:
        "Provides immigration relief for vulnerable individuals, humanitarian cases, and special immigrants.",
      features: [
        " Amerasian, Widow(er), or Special Immigrant (including VAWA)",
        "Application for Asylum & Withholding of Removal",
      ],
      icon: <Award className="h-8 w-8" />,
      image: "/visa14.jpg",
    },
    // {
    //   title: "Adjustment of Status & Residency",
    //   description:
    //     "Allows eligible applicants to adjust their immigration status to lawful permanent residency.",
    //   features: [
    //     " Application to Register Permanent Residence or Adjust Status",
    //   ],
    //   icon: <Award className="h-8 w-8" />,
    //   image: "/visa19.jpg",
    // },
    {
      title: "Travel & Entry Documents",
      description:
        "Grants authorization for international travel, reentry, or lawful entry into the United States.",
      features: [
        " Application for Travel Document / Advance Parole / Humanitarian Parole",
        "Arrival/Departure Record I-94",
      ],
      icon: <Award className="h-8 w-8" />,
      image: "/visa18.jpg",
    },
    {
      title: "Supporting Documentation",
      description:
        "Essential records verifying health, eligibility, vaccinations, and compliance with immigration requirements.",
      features: [
        " Report of Medical Examination and Vaccination Record",
      ],
      icon: <Award className="h-8 w-8" />,
      image: "/visa17.jpg",
    },
     {
      title: "(N-400) Citizenship/Naturalization",
      description:"",
      features: [
        "Application Purpose",
        "Eligibility Criteria",
        "Estimated Processing Timeline",
        "Citizenship Interview",
        "Naturalization Process Steps"
      ],
      icon: <Award className="h-8 w-8" />,
      image: "/ccznew.jpg",
    },
  ]

  const benefits = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Expert Form Preparation",
      description: "Accurate completion of all USCIS forms with zero errors",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "USCIS Compliance",
      description: "Full compliance with latest USCIS requirements and regulations",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Fast Processing",
      description: "Quick turnaround times to meet critical deadlines",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Personal Support",
      description: "Dedicated case manager for personalized assistance",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-indigo-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <Image
                src={logo}
                alt="Elite Tax Consulting"
                width={50}
                height={50}
                className="rounded-lg transition-transform group-hover:scale-105"
              />
              <div>
                <h1 className="text-l font-bold text-navy-900 group-hover:text-indigo-600 transition-colors">
                   Elite Tax & Consulting Services
                </h1>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button
                  variant="outline"
                  className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 bg-transparent"
                >
                  {/* <ArrowLeft className="h-4 w-4 mr-2" /> */}
                  Home
                </Button>
              </Link>
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
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 to-blue-800 text-white"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12 animate-fade-in">
            {/* <Badge className="bg-indigo-100 text-indigo-800 mb-4">USCIS & Immigration Forms</Badge> */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="text-white font-bold">USCIS </span> & Immigration Assistance
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
              Expert assistance with all USCIS forms and immigration documentation. From family petitions to
              citizenship applications, we ensure accurate completion and timely submission of your critical
              immigration paperwork.
            </p>
          </div>

          {/* <div className="grid md:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group"
              >
                <CardContent className="pt-6">
                  <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                    <div className="text-indigo-600">{benefit.icon}</div>
                  </div>
                  <h3 className="font-semibold text-navy-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div> */}
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {uscisServices.map((service, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""} animate-slide-in-left`}>
                  <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl group">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 bg-white rounded-full p-3 shadow-lg">
                      <div className="text-indigo-600">{service.icon}</div>
                    </div>
                  </div>
                </div>

                <div className={`${index % 2 === 1 ? "lg:col-start-1" : ""} space-y-6 animate-slide-in-right`}>
                  <div>
                    <h2 className="text-3xl font-bold text-navy-900 mb-4">{service.title}</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">{service.description}</p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-navy-900">Forms We Handle:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      onClick={() => {
                        const phoneNumber = "7188668602" // Replace with actual WhatsApp number
                        const message = "Hi! I'm interested in your business formation services. Can you help me?"
                        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
                        window.open(whatsappUrl, "_blank")
                      }}
                      className="bg-green-600 hover:bg-green-700 transform hover:scale-105 transition-all"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Text Us
                    </Button>
                    <Button
                      onClick={() => {
                        window.location.href = "/#consultation-form"
                      }}
                      variant="outline"
                      className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 bg-transparent"
                    >
                      <Scale className="h-4 w-4 mr-2" />
                       Having a question? connect with a speacialist
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gradient-to-r from-navy-900 to-indigo-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our USCIS Form Services?</h2>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              Professional, accurate, and timely completion of all your immigration forms
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "USCIS Expertise",
                description:
                  "Deep knowledge of USCIS procedures, requirements, and latest policy changes to ensure success.",
                icon: <Scale className="h-8 w-8" />,
              },
              {
                title: "Error-Free Preparation",
                description:
                  "Meticulous attention to detail ensures your forms are completed accurately the first time.",
                icon: <Shield className="h-8 w-8" />,
              },
              {
                title: "End-to-End Support",
                description:
                  "From initial consultation to final submission, we guide you through every step of the process.",
                icon: <Users className="h-8 w-8" />,
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-sm border-0 text-white hover:bg-white/20 transition-all duration-300"
              >
                <CardHeader className="text-center">
                  <div className="bg-indigo-500 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <div className="text-white">{item.icon}</div>
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-indigo-100 text-center">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">
              Ready to Complete Your USCIS Forms?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Don't let complex immigration forms delay your dreams. Our USCIS experts will ensure your applications
              are completed accurately and submitted on time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 transform hover:scale-105 transition-all">
                <Phone className="h-5 w-5 mr-2" />
                Schedule Consultation
              </Button> */}
              <Button
                size="lg"
                variant="outline"
                className="border-orange-500 text-orange-600 hover:bg-blue-50 bg-transparent font-bold"
                onClick={() => {
                  window.location.href = "/#consultation-form"
                }}
              >
                <Mail className="h-5 w-5 mr-2" />
                Having a question? connect with a speacialist
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Widgets */}
      <WhatsAppWidget />
      <ChatBot />
    </div>
  )
}
