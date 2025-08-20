import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../../components/header'
import { ContactSection } from '../../components/contact-section'
import { Footer } from '../../components/footer'

interface NewsItem {
  id: number
  newsId: string
  image: string
  title: string
  description: string
  date: string
  author?: string
  category?: string
  tags?: string[]
  content?: string
}

export default function NewsPage() {
  const [newsData, setNewsData] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadNewsData = async () => {
      try {
        const response = await fetch('/news.json')
        if (!response.ok) {
          throw new Error('Failed to load news data')
        }
        const data = await response.json()
        setNewsData(data)
      } catch (error) {
        console.error('Error loading news data:', error)
        // Fallback data
        setNewsData([
          {
            id: 1,
            newsId: "leopard-population-discovery",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
            title: "New Leopard Population Discovered in Yala National Park",
            description: "Conservationists have identified a previously unknown population of Sri Lankan leopards in the remote regions of Yala National Park. This discovery marks a significant milestone in wildlife conservation efforts.",
            date: "2024-12-15",
            author: "Wild Sri Lanka Team",
            category: "Conservation",
            tags: ["leopard", "yala", "conservation", "wildlife"]
          },
          {
            id: 2,
            newsId: "wildlife-photography-workshop-2025",
            image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80",
            title: "Wildlife Photography Workshop Announced for March 2025",
            description: "Join our expert photographers for an immersive 5-day workshop in the heart of Sri Lanka's wilderness. Learn advanced techniques for capturing wildlife in their natural habitat.",
            date: "2024-12-12",
            author: "Wild Sri Lanka Team",
            category: "Workshop",
            tags: ["photography", "workshop", "wildlife", "training"]
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    loadNewsData()
  }, [])

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return "Date not available"
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch (error) {
      return "Date not available"
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg font-medium">Loading news...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-8" style={{ backgroundColor: '#f8f6f2' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-4 text-black">LATEST NEWS</h2>
            <div className="w-24 h-1 bg-primary"></div>
          </div>
          
          <div className="max-w-4xl">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Stay updated with the latest news, conservation efforts, and wildlife photography developments 
              from Wild Sri Lanka. Discover stories about our wildlife, conservation projects, and community initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* News Grid Section */}
      <section className="pt-8 pb-20" style={{ backgroundColor: '#f8f6f2' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsData.map((news, index) => (
              <div key={news.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Date Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 text-sm font-semibold shadow-lg">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {formatDate(news.date)}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {news.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {news.description}
                  </p>
                  
                  {/* Read More Button */}
                  <div className="mt-6">
                    <Link 
                      to={`/news/${news.id}`} 
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-black font-semibold rounded-xl hover:bg-primary-dark transition-colors duration-300"
                      onClick={() => {
                        // Scroll to top when navigating to news detail page
                        window.scrollTo(0, 0)
                      }}
                    >
                      <span>Read More</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </>
  )
} 