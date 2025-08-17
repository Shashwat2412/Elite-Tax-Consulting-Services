"use client"

import { useState, useEffect } from "react"

interface Review {
  id: string
  author_name: string
  author_url: string
  language: string
  profile_photo_url: string
  rating: number
  relative_time_description: string
  text: string
  time: number
  translated: boolean
}

interface ReviewsData {
  reviews: Review[]
  averageRating: number
  totalReviews: number
  status: string
}

export function useReviews() {
  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/reviews")

        if (!response.ok) {
          throw new Error("Failed to fetch reviews")
        }

        const data = await response.json()
        setReviewsData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  return { reviewsData, loading, error }
}
