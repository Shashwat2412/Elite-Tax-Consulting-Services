"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Globe, Plane, FileCheck, Users, CheckCircle, Clock, Shield, Heart, Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import { ChatBot } from "../../components/chat-bot"
import { WhatsAppWidget } from "../../components/whatsapp-widget"
import logo from '../../logofinal.png'


export default function ImmigrationVisaPage() {
  const immigrationServices = [
    {
      title: "Visa Applications",
      description:
        "We assist with visa applications for Canada, USA, India, Australia, Nepal, Germany, Italy, and Spain.",
      countries: ["Canada", "USA", "India", "Australia", "Nepal", "Germany", "Italy", "Spain"],
      icon: <Globe className="h-8 w-8" />,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "blue Card Applications",
      description: "End-to-end guidance to help you become a lawful permanent resident of the United States.",
      features: [
        "Family-based blue cards",
        "Employment-based blue cards",
        "Investment-based blue cards",
        "Diversity visa program",
        "Adjustment of status",
        "Consular processing",
      ],
      icon: <FileCheck className="h-8 w-8" />,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Work Permit Applications",
      description: "Secure employment authorization with our expert help.",
      features: [
        "H-1B work visas",
        "L-1 intracompany transfers",
        "O-1 extraordinary ability",
        "TN NAFTA professionals",
        "EAD applications",
        "PERM labor certification",
      ],
      icon: <Users className="h-8 w-8" />,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "OCI (Overseas Citizenship of India)",
      description: "We handle OCI card applications efficiently for those of Indian origin.",
      features: [
        "OCI application preparation",
        "Document verification",
        "Appointment scheduling",
        "Status tracking",
        "Renewal services",
        "Emergency travel documents",
      ],
      icon: <Heart className="h-8 w-8" />,
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  const additionalServices = [
    {
      title: "Renunciation of Indian Citizenship",
      description: "Let us manage the paperwork and process for renouncing Indian citizenship.",
      icon: <FileCheck className="h-6 w-6" />,
    },
    {
      title: "Family Petitions",
      description: "Reunite with loved ones by filing immigration family petitions correctly.",
      icon: <Heart className="h-6 w-6" />,
    },
    {
      title: "Immigration Case Expedite Requests",
      description: "Speed up your immigration case with our support for expedite inquiries.",
      icon: <Clock className="h-6 w-6" />,
    },
    {
      title: "US Visa Early Appointment Booking",
      description: "We help you schedule early visa appointments when time matters.",
      icon: <Plane className="h-6 w-6" />,
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
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
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
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-900/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="bg-blue-100 text-blue-800 mb-4">Immigration & Visa Services</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">
              <span className="text-blue-600">Immigration & Visa</span> Solutions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From Canada to Australia, navigate visa applications effortlessly with our comprehensive services. We
              specialize in visas for multiple countries and provide end-to-end immigration support.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: <Globe className="h-6 w-6" />, title: "8+ Countries", desc: "Visa services worldwide" },
              { icon: <Clock className="h-6 w-6" />, title: "Fast Processing", desc: "Quick turnaround times" },
              { icon: <Shield className="h-6 w-6" />, title: "100% Legal", desc: "Full compliance assured" },
              { icon: <Users className="h-6 w-6" />, title: "Expert Team", desc: "Licensed consultants" },
            ].map((item, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group"
              >
                <CardContent className="pt-6">
                  <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <div className="text-blue-600">{item.icon}</div>
                  </div>
                  <h3 className="font-semibold text-navy-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
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
            {immigrationServices.map((service, index) => (
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

                  {service.countries && (
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-navy-900">Countries We Serve:</h3>
                      <div className="flex flex-wrap gap-2">
                        {service.countries.map((country, countryIndex) => (
                          <Badge key={countryIndex} className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                            <MapPin className="h-3 w-3 mr-1" />
                            {country}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {service.features && (
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-navy-900">Services Included:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      onClick={() => {
                        const phoneNumber = "1234567890" // Replace with actual WhatsApp number
                        const message = "Hi! I'm interested in your immigration and visa services. Can you help me?"
                        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
                        window.open(whatsappUrl, "_blank")
                      }}
                      className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all"
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
                      <Globe className="h-4 w-4 mr-2" />
                      Get Quote
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">Additional Immigration Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive support for all your immigration needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 border-0 bg-white group transform hover:scale-105"
              >
                <CardHeader className="text-center pb-4">
                  <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <div className="text-blue-600">{service.icon}</div>
                  </div>
                  <CardTitle className="text-lg text-navy-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 text-center">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-navy-900 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Immigration Journey?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Let our immigration experts guide you through every step of the process. From visa applications to
              permanent residency, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all">
                <Phone className="h-5 w-5 mr-2" />
                Schedule Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-400 text-blue-100 hover:bg-blue-800 bg-transparent"
              >
                <Mail className="h-5 w-5 mr-2" />
                Get Free Assessment
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
