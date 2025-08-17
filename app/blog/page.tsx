import type { Metadata } from "next"
import BlogClientPage from "./BlogClientPage"

export const metadata: Metadata = {
  title: "Tax & Business Blog | Elite Tax Consulting Services",
  description: "Expert insights on tax planning, business formation, immigration services, and compliance. Stay informed with our professional tax and business advice.",
}

export default function BlogPage() {
  return <BlogClientPage />
}
