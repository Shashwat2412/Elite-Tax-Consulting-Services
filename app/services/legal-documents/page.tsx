"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Building, Truck, FileCheck, Users, CheckCircle, Clock, Shield, Award, Phone, Mail, Zap, MessageCircle } from 'lucide-react'
import { ChatBot } from "../../components/chat-bot"
import { WhatsAppWidget } from "../../components/whatsapp-widget"
import logo from '../../logofinal.png'


export default function BusinessServicesPage() {
  const businessServices = [
    {
      title: "Business Setup Services",
      description:
        "Set up your business confidently with our comprehensive services. We specialize in LLC, S-Corp, and C-Corp formations tailored to your needs.",
      features: [
        "LLC formation and registration",
        "S-Corporation setup",
        "C-Corporation establishment",
        "Operating agreement drafting",
        "EIN number acquisition",
        "State compliance filing",
        "Registered agent services",
        "Business license assistance",
      ],
      icon: <Building className="h-8 w-8" />,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "MC & DOT for Trucking",
      description:
        "Navigate trucking regulations effortlessly with our MC & DOT number application services. We ensure compliance for smooth operations.",
      features: [
        "Motor Carrier (MC) number registration",
        "DOT number application",
        "USDOT registration",
        "Operating authority filing",
        "Insurance compliance",
        "Safety compliance assistance",
        "FMCSA registration",
        "Trucking permit services",
      ],
      icon: <Truck className="h-8 w-8" />,
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  const businessTypes = [
    {
      title: "LLC Formation",
      description: "Limited Liability Company formation with flexible management structure",
      benefits: ["Personal asset protection", "Tax flexibility", "Simple management structure", "Credibility boost"],
      icon: <Shield className="h-6 w-6" />,
    },
    {
      title: "S-Corporation",
      description: "S-Corp election for tax advantages and professional structure",
      benefits: [
        "Tax savings on self-employment",
        "Professional credibility",
        "Easy transfer of ownership",
        "Perpetual existence",
      ],
      icon: <Award className="h-6 w-6" />,
    },
    {
      title: "C-Corporation",
      description: "Traditional corporation structure for larger businesses",
      benefits: [
        "Unlimited growth potential",
        "Easy to raise capital",
        "Tax deductible benefits",
        "Professional management",
      ],
      icon: <Building className="h-6 w-6" />,
    },
  ]

  const benefits = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Fast Formation",
      description: "Quick business setup with all required documentation",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Full Compliance",
      description: "Ensure all state and federal requirements are met",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Expert Guidance",
      description: "Professional advice on the best business structure",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Ongoing Support",
      description: "Continued assistance with compliance and filings",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100 sticky top-0 z-40">
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
                <h1 className="text-xl font-bold text-navy-900 group-hover:text-blue-600 transition-colors">
                   Elite Tax & Consulting Services
                </h1>
                {/* <p className="text-sm text-blue-600">Business & Corporate Services</p> */}
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-navy-900/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="bg-blue-100 text-blue-800 mb-4">Business & Corporate Services</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">
              <span className="text-blue-600">Business Formation</span> & Corporate Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Complete support for LLC, S-Corp, and C-Corp registration and compliance filing. We also specialize in
              trucking business services including MC & DOT number registration.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group"
              >
                <CardContent className="pt-6">
                  <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <div className="text-blue-600">{benefit.icon}</div>
                  </div>
                  <h3 className="font-semibold text-navy-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Business Types Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">Choose Your Business Structure</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We help you select and establish the right business entity for your specific needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {businessTypes.map((type, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-white group transform hover:scale-105"
              >
                <CardHeader className="text-center pb-4">
                  <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <div className="text-blue-600">{type.icon}</div>
                  </div>
                  <CardTitle className="text-xl text-navy-900 group-hover:text-blue-600 transition-colors">
                    {type.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {type.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {businessServices.map((service, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
              >
                <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""} animate-slide-in-left`}>
                  <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl group">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 bg-white rounded-full p-3 shadow-lg">
                      <div className="text-blue-600">{service.icon}</div>
                    </div>
                  </div>
                </div>

                <div className={`${index % 2 === 1 ? "lg:col-start-1" : ""} space-y-6 animate-slide-in-right`}>
                  <div>
                    <h2 className="text-3xl font-bold text-navy-900 mb-4">{service.title}</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">{service.description}</p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-navy-900">Services Included:</h3>
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
                        const phoneNumber = "1234567890" // Replace with actual WhatsApp number
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
                      className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                    >
                      <Building className="h-4 w-4 mr-2" />
                      Get Quote
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gradient-to-r from-navy-900 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Business Services?</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Professional business formation and compliance services tailored to your success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Complete Business Setup",
                description: "From entity formation to EIN numbers, we handle every aspect of your business setup.",
                icon: <Building className="h-8 w-8" />,
              },
              {
                title: "Trucking Expertise",
                description: "Specialized knowledge in trucking industry regulations and DOT/MC number requirements.",
                icon: <Truck className="h-8 w-8" />,
              },
              {
                title: "Ongoing Compliance",
                description: "We ensure your business stays compliant with all state and federal requirements.",
                icon: <FileCheck className="h-8 w-8" />,
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-sm border-0 text-white hover:bg-white/20 transition-all duration-300"
              >
                <CardHeader className="text-center">
                  <div className="bg-blue-500 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <div className="text-white">{item.icon}</div>
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-100 text-center">{item.description}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">Ready to Start Your Business?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Let us handle the complex paperwork while you focus on building your business. Our experts will guide you
              through every step of the formation process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all">
                <Phone className="h-5 w-5 mr-2" />
                Schedule Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                onClick={() => {
                  window.location.href = "/#consultation-form"
                }}
              >
                <Mail className="h-5 w-5 mr-2" />
                Get Free Quote
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
