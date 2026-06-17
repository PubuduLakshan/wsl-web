import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../../../components/header'
import { ContactSection } from '../../../components/contact-section'
import { Footer } from '../../../components/footer'
import { renderTextWithLinks } from '../../../lib/render-links'

// Generate static params for all news articles
export async function generateStaticParams() {
  // This function is required for static export
  // It tells Next.js which dynamic routes to pre-generate
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' }
  ]
}

interface NewsItem {
  id: number
  newsId: string
  image: string
  title: string
  description: string
  date: string
  content?: string
  author?: string
  category?: string
  tags?: string[]
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Await params to fix the async issue
  const { id: idParam } = await params
  
  // Load news data from JSON file
  let newsData: NewsItem[] = []
  try {
    const response = await fetch('/news.json')
    if (response.ok) {
      newsData = await response.json()
    }
  } catch (error) {
    console.error('Error loading news data:', error)
    // Fallback data if JSON loading fails
    newsData = [
      {
        id: 1,
        newsId: "leopard-population-discovery",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
        title: "New Leopard Population Discovered in Yala National Park",
        description: "Conservationists have identified a previously unknown population of Sri Lankan leopards in the remote regions of Yala National Park. This discovery marks a significant milestone in wildlife conservation efforts.",
        date: "2024-12-15",
        author: "Wild Sri Lanka Team",
        category: "Conservation",
        tags: ["leopard", "yala", "conservation", "wildlife"],
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.\n\nUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
      }
    ]
  }

  const id = parseInt(idParam)
  const newsItem = newsData.find(item => item.id === id)

  if (!newsItem) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
            <Link 
              to="/news" 
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              onClick={() => {
                // Scroll to top when navigating to news page
                window.scrollTo(0, 0)
              }}
            >
              Back to News
            </Link>
          </div>
        </div>
      </>
    )
  }

  // Use the news item directly since it now contains all the data from JSON
  const fullContent = newsItem

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

  return (
    <>
      <Navbar />
      
      {/* Article Header */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link 
              to="/news" 
              className="text-primary hover:text-primary-dark transition-colors"
              onClick={() => {
                // Scroll to top when navigating to news page
                window.scrollTo(0, 0)
              }}
            >
              ← Back to News
            </Link>
          </div>

          {/* Article Meta */}
          <div className="mb-8">
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                {fullContent.category}
              </span>
              <span>•</span>
              <span>{formatDate(fullContent.date)}</span>
              <span>•</span>
              <span>By {fullContent.author}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {fullContent.title}
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              {renderTextWithLinks(fullContent.description)}
            </p>
          </div>
        </div>
      </section>

      {/* Article Image */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative overflow-hidden shadow-2xl">
            <img
              src={fullContent.image}
              alt={fullContent.title}
              className="w-full h-96 md:h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed space-y-6">
              {fullContent.content?.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-lg leading-relaxed">
                  {renderTextWithLinks(paragraph)}
                </p>
              ))}
            </div>
          </div>

          {/* Article Footer */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-end">
              <Link 
                to="/news" 
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                onClick={() => {
                  // Scroll to top when navigating to news page
                  window.scrollTo(0, 0)
                }}
              >
                Back to News
              </Link>
            </div>
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