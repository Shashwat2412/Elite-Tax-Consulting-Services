"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhatsAppWidget() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "1234567890" // Replace with actual WhatsApp number
    const message = "Hi! I'm interested in your tax and immigration services. Can you help me?"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="fixed left-4 bottom-4 z-50">
      <Button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        size="lg"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Contact us on WhatsApp</span>
      </Button>
    </div>
  )
}
