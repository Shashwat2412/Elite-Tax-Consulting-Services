"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, User, ArrowRight, Home, Search } from 'lucide-react'
import pro from '../prof.jpg'
import top from '../top.jpg'
import svc21 from "../svc21.jpg"
import svc4 from "../svcv4.jpeg"
import svc6 from "../svc6.jpg"
import usics from '../usics.jpg'
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const blogPosts = [
  {
    id: "tax-deductions-2024",
    slug: "tax-deductions-2024",
    title: "Top 10 Tax Deductions You Shouldn't Miss in 2024",
    excerpt:
      "Maximize your tax savings with these often-overlooked deductions that could save you thousands of dollars this tax season.",
    category: "Personal Tax",
    author: "Elite Tax Team",
    date: "2024-01-15",
    readTime: "8 min read",
    image: top,
    tags: ["Tax Deductions", "Personal Tax", "Tax Savings"],
  },
  {
    id: "small-business-tax-tips",
    slug: "small-business-tax-tips",
    title: "Small Business Tax Planning Strategies for 2024",
    excerpt:
      "Essential tax planning strategies every small business owner needs to know to minimize tax liability and maximize profits.",
    category: "Business Tax",
    author: "Elite Tax Team",
    date: "2024-01-10",
    readTime: "12 min read",
    image: svc4,
    tags: ["Business Tax", "Tax Planning", "Small Business"],
  },
  {
    id: "immigration-tax-guide",
    slug: "immigration-tax-guide",
    title: "Tax Obligations for New Immigrants: A Complete Guide",
    excerpt:
      "Navigate the complex world of U.S. tax obligations as a new immigrant. Learn about filing requirements, deductions, and common mistakes to avoid.",
    category: "Immigration Tax",
    author: "Elite Tax Team",
    date: "2024-01-05",
    readTime: "15 min read",
    image: svc21,
    tags: ["Immigration", "Tax Filing", "New Immigrants"],
  },
  {
    id: "trucking-business-setup",
    slug: "trucking-business-setup",
    title: "Starting a Trucking Business: Tax and Legal Considerations",
    excerpt:
      "Everything you need to know about setting up a trucking business, from choosing the right business structure to understanding tax obligations.",
    category: "Trucking Services",
    author: "Elite Tax Team",
    date: "2023-12-28",
    readTime: "10 min read",
    image: svc6,
    tags: ["Trucking", "Business Setup", "Transportation"],
  },
  {
    id: "irs-audit-preparation",
    slug: "irs-audit-preparation",
    title: "How to Prepare for an IRS Audit: A Step-by-Step Guide",
    excerpt:
      "Don't panic if you receive an audit notice. Learn how to prepare, what documents you need, and how to navigate the audit process successfully.",
    category: "Tax Compliance",
    author: "Elite Tax Team",
    date: "2023-12-20",
    readTime: "11 min read",
    image: usics,
    tags: ["IRS Audit", "Tax Compliance", "Tax Defense"],
  },
  {
    id: "business-entity-selection",
    slug: "business-entity-selection",
    title: "Choosing the Right Business Entity: LLC vs Corporation vs Partnership",
    excerpt:
      "Compare different business structures and their tax implications to make the best choice for your business goals and tax situation.",
    category: "Business Services",
    author: "Elite Tax Team",
    date: "2023-12-15",
    readTime: "14 min read",
    image: pro,
    tags: ["Business Entity", "LLC", "Corporation", "Tax Planning"],
  },
]

const categories = [
  "All",
  "Personal Tax",
  "Business Tax",
  "Immigration Tax",
  "Trucking Services",
  "Tax Compliance",
  "Business Services",
]

export default function BlogClientPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", ...Array.from(new Set(blogPosts.map(post => post.category)))]

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleGetConsultation = () => {
    window.location.href = "/#consultation-form"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
              <span className="text-gray-300">|</span>
              <span className="text-gray-600 font-medium">Blog</span>
            </div>
            <Button 
              onClick={handleGetConsultation}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Get Free Consultation
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Tax & Business Insights
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Expert advice on tax planning, business formation, immigration services, and compliance
            </p>
            
            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-3 text-gray-900 bg-white border-0 rounded-lg"
                />
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category 
                      ? "bg-blue-600 text-white" 
                      : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 bg-white group cursor-pointer transform hover:scale-105 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-blue-600 text-white">{post.category}</Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-navy-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <CalendarDays className="h-4 w-4 mr-1" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <ArrowRight className="h-4 w-4 text-blue-600 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
              <p className="text-gray-500">Try adjusting your search terms or category filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Professional Tax & Business Advice?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Our expert team is ready to help you with personalized solutions for all your tax, immigration, and business needs.
            </p>
            <Button 
              onClick={handleGetConsultation}
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-200"
            >
              Get Free Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
