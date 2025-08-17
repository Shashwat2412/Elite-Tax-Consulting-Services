"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileText, Calculator, TrendingUp, Shield, CheckCircle, Users, Clock, DollarSign, Phone, Mail, MessageCircle } from 'lucide-react'
import { ChatBot } from "../../components/chat-bot"
import { WhatsAppWidget } from "../../components/whatsapp-widget"
import logo from '../../logofinal.png'

export default function TaxServicesPage() {
  const taxServices = [
    {
      title: "Personal Tax Return Filing",
      description:
        "Federal and state income tax returns, accurately prepared to maximize your refund and ensure compliance.",
      features: [
        "Federal tax return preparation",
        "State tax return filing",
        "Deduction optimization",
        "Refund maximization",
        "IRS compliance assurance",
        "Electronic filing available",
      ],
      icon: <Users className="h-8 w-8" />,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Business Tax Return Filing",
      description:
        "Expert filing for LLCs, corporations, and self-employed professionals, with guidance on deductions and tax planning.",
      features: [
        "LLC tax preparation",
        "Corporate tax returns",
        "Self-employment taxes",
        "Quarterly tax planning",
        "Business deduction analysis",
        "Multi-state filing support",
      ],
      icon: <TrendingUp className="h-8 w-8" />,
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  const benefits = [
    {
      icon: <Calculator className="h-6 w-6" />,
      title: "Maximum Refunds",
      description: "We ensure you get every deduction and credit you're entitled to",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "100% Accuracy",
      description: "Our expert team guarantees error-free tax preparation",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Fast Processing",
      description: "Quick turnaround times to meet all tax deadlines",
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Affordable Pricing",
      description: "Competitive rates with transparent pricing structure",
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
                <h1 className="text-l font-bold text-navy-900 group-hover:text-blue-600 transition-colors">
                   Elite Tax & Consulting Services
                </h1>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
                  {/* <ArrowLeft className="h-4 w-4 mr-2" /> */}
                  Home
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
            <Badge className="bg-blue-100 text-blue-800 mb-4">Tax Services</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">
              Professional <span className="text-blue-600">Tax Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ensure your personal finances are in order with our expert tax services. We handle all aspects of tax
              preparation, ensuring compliance and maximizing your returns for both individuals and businesses.
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

      {/* Services Detail Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {taxServices.map((service, index) => (
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
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent"></div>
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
                    <h3 className="text-xl font-semibold text-navy-900">What's Included:</h3>
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
                        const message = "Hi! I'm interested in your tax services. Can you help me?"
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
                      <FileText className="h-4 w-4 mr-2" />
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Tax Services?</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              We make tax preparation simple, accurate, and stress-free for individuals and businesses
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Tax Professionals",
                description:
                  "Our team consists of licensed tax experts with years of experience in personal and business tax preparation.",
                icon: <Users className="h-8 w-8" />,
              },
              {
                title: "Comprehensive Tax Planning",
                description:
                  "We don't just file your taxes - we help you plan for next year to minimize your tax liability.",
                icon: <TrendingUp className="h-8 w-8" />,
              },
              {
                title: "Year-Round Support",
                description:
                  "Our support doesn't end after tax season. We're here to help with tax questions all year long.",
                icon: <Shield className="h-8 w-8" />,
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
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">Ready to Get Your Taxes Done Right?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Don't let tax season stress you out. Let our experts handle your tax preparation while you focus on what
              matters most.
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
