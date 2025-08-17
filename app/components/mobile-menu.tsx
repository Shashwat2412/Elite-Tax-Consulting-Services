"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Phone, X, ChevronDown, ChevronRight } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface Service {
  title: string
  href: string
  icon: React.ReactNode
  gradient: string
}

interface MobileMenuProps {
  services: Service[]
}

export function MobileMenu({ services }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 p-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full">
          <nav className="flex-1 p-6 space-y-4">
            <Link 
              href="/" 
              className="block py-2 text-navy-800 hover:text-blue-600 transition-colors"
              onClick={closeMenu}
            >
              Home
            </Link>
             <Link href="/blog" className="text-white hover:text-blue-200 block px-3 py-2 transition-colors">
            Blog
          </Link>
            
            <Collapsible open={servicesOpen} onOpenChange={setServicesOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-navy-800 hover:text-blue-600 transition-colors">
                Services
                {servicesOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 ml-4">
                {services.map((service, index) => (
                  <Link
                    key={index}
                    href={service.href}
                    className="flex items-center py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={closeMenu}
                  >
                    <div className={`bg-gradient-to-r ${service.gradient} rounded p-1 mr-2 flex items-center justify-center`}>
                      <div className="text-white text-xs">{service.icon}</div>
                    </div>
                    {service.title}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>

            <a 
              href="#about" 
              className="block py-2 text-navy-800 hover:text-blue-600 transition-colors"
              onClick={closeMenu}
            >
              About
            </a>
            <a 
              href="#reviews" 
              className="block py-2 text-navy-800 hover:text-blue-600 transition-colors"
              onClick={closeMenu}
            >
              Reviews
            </a>
            <a 
              href="#faq" 
              className="block py-2 text-navy-800 hover:text-blue-600 transition-colors"
              onClick={closeMenu}
            >
              FAQ
            </a>
            <a 
              href="#contact" 
              className="block py-2 text-navy-800 hover:text-blue-600 transition-colors"
              onClick={closeMenu}
            >
              Contact
            </a>
          </nav>
          
          <div className="p-6 border-t">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
