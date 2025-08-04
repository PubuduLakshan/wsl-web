import React from 'react'
import { Link } from 'wouter'
import { Navbar } from '../../../components/header'
import { ContactSection } from '../../../components/contact-section'
import { Footer } from '../../../components/footer'

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
    const response = await fetch('http://localhost:3000/news.json')
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
            <Link href="/news" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
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
            <Link href="/news" className="text-primary hover:text-primary-dark transition-colors">
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
              {fullContent.description}
            </p>
          </div>
        </div>
      </section>

      {/* Article Image */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
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
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Article Footer */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-gray-600">Share this article:</span>
                <div className="flex gap-2">
                  <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </button>
                  <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </button>
                  <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              <Link href="/news" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
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