"use client"

import React, { useState, useEffect } from 'react'
import { Navbar } from '../components/header'
import { ContactSection } from '../components/contact-section'
import { Footer } from '../components/footer'
import { Link } from 'wouter'
import { useTheme } from '../components/theme-provider'

interface NewsItem {
  id: number;
  newsId: string;
  image: string;
  title: string;
  description: string;
  date: string;
  author?: string;
  category?: string;
  tags?: string[];
  content?: string;
}

const featuredImages = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
]

const competitionCategories = [
  { title: 'Wildlife Portrait', description: 'Capture the essence of Sri Lanka\'s wildlife in stunning portraits' },
  { title: 'Landscape', description: 'Showcase the diverse landscapes and natural beauty of the island' },
  { title: 'Conservation Story', description: 'Tell stories of conservation efforts and environmental awareness' },
  { title: 'Underwater', description: 'Explore the marine biodiversity of Sri Lanka\'s coastal waters' },
]

const testimonials = [
  { name: 'Sarah Johnson', role: '2024 Winner', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=400&q=80', quote: 'The Wild Sri Lanka competition opened my eyes to the incredible biodiversity of this beautiful island.' },
  { name: 'Michael Chen', role: 'Professional Photographer', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', quote: 'This platform has given me the opportunity to showcase Sri Lanka\'s wildlife to the world.' },
  { name: 'Priya Fernando', role: 'Conservationist', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80', quote: 'Through photography, we can inspire others to protect our natural heritage.' },
]

interface Winner {
  name: string;
  category: string;
  image: string;
  competitionCategory: 'Open' | 'School';
}

const winnersByYearAndCategory: Record<number, Record<'Open' | 'School', Winner[]>> = {
  2025: {
    Open: [
      { name: 'Alex Thompson', category: 'First Place - Wildlife Portrait', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', competitionCategory: 'Open' },
      { name: 'Maria Rodriguez', category: 'First Place - Landscape', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80', competitionCategory: 'Open' },
      { name: 'David Chen', category: 'First Place - Conservation Story', image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80', competitionCategory: 'Open' },
    ],
    School: [
      { name: 'Emma Wilson', category: 'First Place - Wildlife Portrait', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80', competitionCategory: 'School' },
      { name: 'Liam Davis', category: 'First Place - Landscape', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80', competitionCategory: 'School' },
      { name: 'Sophia Brown', category: 'First Place - Conservation Story', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80', competitionCategory: 'School' },
    ]
  },
  2024: {
    Open: [
      { name: 'Sarah Johnson', category: 'First Place - Wildlife Portrait', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80', competitionCategory: 'Open' },
      { name: 'James Wilson', category: 'First Place - Landscape', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80', competitionCategory: 'Open' },
      { name: 'Emma Davis', category: 'First Place - Conservation Story', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80', competitionCategory: 'Open' },
    ],
    School: [
      { name: 'Noah Miller', category: 'First Place - Wildlife Portrait', image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80', competitionCategory: 'School' },
      { name: 'Olivia Garcia', category: 'First Place - Landscape', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', competitionCategory: 'School' },
      { name: 'William Taylor', category: 'First Place - Conservation Story', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80', competitionCategory: 'School' },
    ]
  },
  2023: {
    Open: [
      { name: 'Michael Brown', category: 'First Place - Wildlife Portrait', image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80', competitionCategory: 'Open' },
      { name: 'Lisa Wang', category: 'First Place - Landscape', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', competitionCategory: 'Open' },
      { name: 'Robert Kim', category: 'First Place - Conservation Story', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80', competitionCategory: 'Open' },
    ],
    School: [
      { name: 'Ava Martinez', category: 'First Place - Wildlife Portrait', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80', competitionCategory: 'School' },
      { name: 'Ethan Anderson', category: 'First Place - Landscape', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80', competitionCategory: 'School' },
      { name: 'Isabella Thomas', category: 'First Place - Conservation Story', image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80', competitionCategory: 'School' },
    ]
  },
  2022: {
    Open: [
      { name: 'Daniel Lee', category: 'First Place - Wildlife Portrait', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80', competitionCategory: 'Open' },
      { name: 'Sophia Chen', category: 'First Place - Landscape', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80', competitionCategory: 'Open' },
      { name: 'Ryan Park', category: 'First Place - Conservation Story', image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80', competitionCategory: 'Open' },
    ],
    School: [
      { name: 'Mia Rodriguez', category: 'First Place - Wildlife Portrait', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80', competitionCategory: 'School' },
      { name: 'Lucas Johnson', category: 'First Place - Landscape', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', competitionCategory: 'School' },
      { name: 'Zoe Williams', category: 'First Place - Conservation Story', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80', competitionCategory: 'School' },
    ]
  },
  2021: {
    Open: [
      { name: 'Christopher Wong', category: 'First Place - Wildlife Portrait', image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80', competitionCategory: 'Open' },
      { name: 'Amanda Foster', category: 'First Place - Landscape', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', competitionCategory: 'Open' },
      { name: 'Kevin Zhang', category: 'First Place - Conservation Story', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80', competitionCategory: 'Open' },
    ],
    School: [
      { name: 'Chloe Davis', category: 'First Place - Wildlife Portrait', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80', competitionCategory: 'School' },
      { name: 'Nathan Brown', category: 'First Place - Landscape', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80', competitionCategory: 'School' },
      { name: 'Ella Wilson', category: 'First Place - Conservation Story', image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80', competitionCategory: 'School' },
    ]
  },
}

export default function HomePage() {
  const [selectedYear, setSelectedYear] = useState(2025)
  const [selectedCategory, setSelectedCategory] = useState<'Open' | 'School'>('Open')
  const [newsData, setNewsData] = useState<NewsItem[]>([])
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0)
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0)
  
  // Hero slides data
  const heroSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80",
      badge: "Wildlife Photography Competition",
      title: "WILD SRI LANKA\nPHOTOGRAPHER OF THE YEAR 2025",
      description: "Capture the untamed beauty of Sri Lanka's wildlife and compete with photographers worldwide in our prestigious annual competition.",
      primaryButton: "ENTER THE COMPETITION",
      secondaryButton: "VIEW GALLERY"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=2000&q=80",
      badge: "Conservation Through Art",
      title: "PRESERVE NATURE\nTHROUGH PHOTOGRAPHY",
      description: "Join our mission to document and protect Sri Lanka's biodiversity through the powerful medium of wildlife photography.",
      primaryButton: "LEARN MORE",
      secondaryButton: "SUPPORT CONSERVATION"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=2000&q=80",
      badge: "Expert Workshops",
      title: "MASTER WILDLIFE\nPHOTOGRAPHY SKILLS",
      description: "Enhance your photography skills with expert-led workshops and discover the secrets of capturing wildlife in their natural habitat.",
      primaryButton: "JOIN WORKSHOP",
      secondaryButton: "VIEW SCHEDULE"
    }
  ]
  
  const currentWinners = winnersByYearAndCategory[selectedYear]?.[selectedCategory] || []

  useEffect(() => {
    const loadNewsData = async () => {
      try {
        const response = await fetch('/news.json')
        const data = await response.json()
        setNewsData(data)
      } catch (error) {
        console.error('Error loading news data:', error)
        // Fallback data if JSON loading fails
        setNewsData([
          {
            id: 1,
            newsId: "leopard-population-discovery",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
            title: "New Leopard Population Discovered in Yala National Park",
            description: "Conservationists have identified a previously unknown population of Sri Lankan leopards in the remote regions of Yala National Park.",
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
            description: "Join our expert photographers for an immersive 5-day workshop in the heart of Sri Lanka's wilderness.",
            date: "2024-12-12",
            author: "Wild Sri Lanka Team",
            category: "Workshop",
            tags: ["photography", "workshop", "wildlife", "training"]
          },
          {
            id: 3,
            newsId: "elephant-corridor-restoration",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
            title: "Conservation Success: Elephant Corridor Restoration Complete",
            description: "The restoration of the ancient elephant migration corridor between Minneriya and Kaudulla National Parks has been completed.",
            date: "2024-12-10",
            author: "Wild Sri Lanka Team",
            category: "Conservation",
            tags: ["elephant", "corridor", "conservation", "migration"]
          }
        ])
      }
    }

    loadNewsData()
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (newsData.length > 1) {
      const interval = setInterval(() => {
        setCurrentNewsIndex((prevIndex) => 
          prevIndex === newsData.length - 1 ? 0 : prevIndex + 1
        )
      }, 5000) // Change slide every 5 seconds

      return () => clearInterval(interval)
    }
  }, [newsData.length])

  // Auto-play for hero slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prevSlide) => 
        prevSlide === heroSlides.length - 1 ? 0 : prevSlide + 1
      )
    }, 6000) // Change slide every 6 seconds

    return () => clearInterval(interval)
  }, [heroSlides.length])
  
  const availableYears = Object.keys(winnersByYearAndCategory).map(Number).sort((a, b) => a - b)
  const minYear = Math.min(...availableYears)
  const maxYear = Math.max(...availableYears)

  // Function to format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return 'Date not available'
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch (error) {
      return 'Date not available'
    }
  }

  // Function to get the latest news date
  const getLatestNewsDate = () => {
    if (newsData.length === 0) return null
    const dates = newsData.map(news => new Date(news.date))
    const validDates = dates.filter(date => !isNaN(date.getTime()))
    if (validDates.length === 0) return null
    return new Date(Math.max(...validDates.map(date => date.getTime())))
  }

  // Check if current news is the latest
  const isLatestNews = (newsDate: string) => {
    const latestDate = getLatestNewsDate()
    if (!latestDate) return false
    const currentDate = new Date(newsDate)
    return currentDate.getTime() === latestDate.getTime()
  }

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section id="hero" className="relative w-full h-screen flex items-center overflow-hidden bg-black">
        {/* Hero Slider */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentHeroSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={slide.image}
                  alt={`Hero Slide ${slide.id}`}
                  className="w-full h-full object-cover grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
              </div>
            ))}
          </div>
        </div>
        
                 {/* Hero Content */}
         <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8">
           <div className="flex items-center h-screen">
             {/* Text Content - Left-aligned on all devices */}
             <div className="text-white text-left max-w-2xl">
               <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 md:px-4 py-2 rounded-full mb-4 md:mb-6">
                 <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#F0A641' }}></div>
                 <span className="text-xs md:text-sm font-medium">{heroSlides[currentHeroSlide].badge}</span>
               </div>
               <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight text-white whitespace-pre-line">
                 {heroSlides[currentHeroSlide].title}
               </h1>
               <p className="text-base md:text-xl mb-6 md:mb-10 text-gray-300 max-w-lg leading-relaxed">
                 {heroSlides[currentHeroSlide].description}
               </p>
               <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-start">
                 <button className="group relative px-6 md:px-8 py-3 md:py-4 text-black font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl text-sm md:text-base" style={{ backgroundColor: '#F0A641' }}>
                   <span className="relative z-10">{heroSlides[currentHeroSlide].primaryButton}</span>
                   <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: '#d8942e' }}></div>
                 </button>
                 <button className="px-6 md:px-8 py-3 md:py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300 text-sm md:text-base">
                   {heroSlides[currentHeroSlide].secondaryButton}
                 </button>
               </div>
             </div>
           </div>
         </div>

        {/* Navigation Arrows */}
        <button 
          onClick={() => setCurrentHeroSlide(currentHeroSlide === 0 ? heroSlides.length - 1 : currentHeroSlide - 1)}
          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-black/50 hover:bg-primary text-white border border-white/20 hover:border-primary transition-all duration-300 backdrop-blur-sm"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          onClick={() => setCurrentHeroSlide(currentHeroSlide === heroSlides.length - 1 ? 0 : currentHeroSlide + 1)}
          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-black/50 hover:bg-primary text-white border border-white/20 hover:border-primary transition-all duration-300 backdrop-blur-sm"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHeroSlide(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentHeroSlide 
                  ? 'bg-primary scale-125 shadow-lg' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 md:py-20" style={{ backgroundColor: '#f8f6f2' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-6 md:mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">ABOUT US</h2>
            <div className="w-24 h-1 bg-primary"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900">
                Discover the <span className="bg-clip-text text-transparent" style={{ color: '#F0A641' }}>Wild Beauty</span> of Sri Lanka
              </h3>
              <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6 leading-relaxed">
                Wild Sri Lanka is a platform dedicated to showcasing the incredible biodiversity of Sri Lanka through the art of photography. Our mission is to inspire conservation through visual storytelling and connect photographers with the natural wonders of this beautiful island.
              </p>
              <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
                From the majestic elephants of Minneriya to the elusive leopards of Yala, from the vibrant coral reefs to the misty mountains, Sri Lanka offers photographers an unparalleled opportunity to capture nature at its finest.
              </p>
              <Link href="/about-us" className="group relative px-6 md:px-8 py-3 md:py-4 text-black font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg inline-block text-sm md:text-base" style={{ backgroundColor: '#F0A641' }}>
                <span className="relative z-10">Learn More</span>
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: '#d8942e' }}></div>
              </Link>
            </div>
            <div className="order-1 md:order-2 grid grid-cols-2 gap-3 md:gap-4">
              {featuredImages.slice(0, 4).map((src, idx) => (
                <div key={idx} className="group relative overflow-hidden rounded-xl md:rounded-2xl shadow-lg">
                  <img src={src} alt={`Wildlife ${idx + 1}`} className="w-full h-32 md:h-48 object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Wildlife Workshop Section */}
      <section id="competition" className="py-12 md:py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: '#222222' }}></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-full mb-6 md:mb-8">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-xs md:text-sm font-medium">Competition</span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6">
            WILD SRI LANKA PHOTOGRAPHER OF THE YEAR
          </h2>
          <p className="text-base md:text-xl mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed">
            Wild Sri Lanka Photographer of the Year is our flagship wildlife photography competition, spotlighting the raw, untamed beauty of Sri Lanka's biodiversity. This annual celebration invites photographers of all levels—from passionate amateurs to seasoned professionals—to showcase their most powerful nature and wildlife captures.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center mb-12 md:mb-16">
            <button className="group relative px-6 md:px-8 py-3 md:py-4 text-black font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl text-sm md:text-base" style={{ backgroundColor: '#F0A641' }}>
              <span className="relative z-10">ENTER THE COMPETITION</span>
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: '#d8942e' }}></div>
            </button>
            <button className="px-6 md:px-8 py-3 md:py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300 text-sm md:text-base">
              <span className="relative z-10">PREVIOUS WINNERS</span>
            </button>
          </div>
          
          {/* Exhibition Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-2 md:gap-3">
            {/* Large tile - spans 6 columns */}
            <div className="col-span-2 md:col-span-6 h-48 md:h-80 group relative overflow-hidden rounded-lg md:rounded-xl shadow-lg md:shadow-2xl transform hover:scale-105 transition-all duration-500">
              <img 
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" 
                alt="Wildlife Portrait" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-semibold text-sm md:text-xl mb-1 md:mb-2">Wildlife Portrait</h3>
                <p className="text-xs md:text-base text-gray-200">Capturing nature's essence</p>
              </div>
            </div>
            
            {/* Medium tile - spans 3 columns */}
            <div className="col-span-1 md:col-span-3 h-48 md:h-80 group relative overflow-hidden rounded-lg md:rounded-xl shadow-lg md:shadow-2xl transform hover:scale-105 transition-all duration-500">
              <img 
                src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80" 
                alt="Landscape View" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-semibold text-xs md:text-lg mb-1">Landscape View</h3>
                <p className="text-xs md:text-sm text-gray-200">Natural beauty</p>
              </div>
            </div>
            
            {/* Medium tile - spans 3 columns */}
            <div className="col-span-1 md:col-span-3 h-48 md:h-80 group relative overflow-hidden rounded-lg md:rounded-xl shadow-lg md:shadow-2xl transform hover:scale-105 transition-all duration-500">
              <img 
                src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=600&q=80" 
                alt="Abstract Art" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-semibold text-xs md:text-lg mb-1">Abstract Art</h3>
                <p className="text-xs md:text-sm text-gray-200">Creative expression</p>
              </div>
            </div>
            
            {/* Medium tile - spans 3 columns */}
            <div className="col-span-1 md:col-span-3 h-48 md:h-80 group relative overflow-hidden rounded-lg md:rounded-xl shadow-lg md:shadow-2xl transform hover:scale-105 transition-all duration-500">
              <img 
                src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80" 
                alt="Close-up Portrait" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-semibold text-xs md:text-lg mb-1">Close-up Portrait</h3>
                <p className="text-xs md:text-sm text-gray-200">Intimate moments</p>
              </div>
            </div>
            
            {/* Medium tile - spans 3 columns */}
            <div className="col-span-1 md:col-span-3 h-48 md:h-80 group relative overflow-hidden rounded-lg md:rounded-xl shadow-lg md:shadow-2xl transform hover:scale-105 transition-all duration-500">
              <img 
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80" 
                alt="Mountain View" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-semibold text-xs md:text-lg mb-1">Mountain View</h3>
                <p className="text-xs md:text-sm text-gray-200">Majestic landscapes</p>
              </div>
            </div>
            
            {/* Large tile - spans 6 columns */}
            <div className="col-span-2 md:col-span-6 h-48 md:h-80 group relative overflow-hidden rounded-lg md:rounded-xl shadow-lg md:shadow-2xl transform hover:scale-105 transition-all duration-500">
              <img 
                src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80" 
                alt="Gallery Exhibition" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-semibold text-sm md:text-xl mb-1 md:mb-2">Gallery Exhibition</h3>
                <p className="text-xs md:text-base text-gray-200">Showcasing talent</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Previous Winners Section */}
      <section id="winners" className="py-12 md:py-20" style={{ backgroundColor: '#f8f6f2' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-6 md:mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">PREVIOUS WINNERS</h2>
            <div className="w-24 h-1 bg-primary"></div>
          </div>
          
          {/* Year and Category Selection */}
          <div className="mb-8 md:mb-12">
            <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between gap-6 md:gap-20">
              {/* Year Selection - Left Aligned */}
              <div className="md:w-1/2">
                <div className="flex items-center space-x-3 md:space-x-4 mb-4 md:mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg bg-primary">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-gray-800">Select Year</h3>
                    <p className="text-xs md:text-sm text-gray-500">Browse winning entries</p>
                  </div>
                </div>
                
                {/* Current Year Display */}
                <div className="mb-4 md:mb-6">
                  <div className="px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl shadow-lg bg-primary">
                    <span className="text-xl md:text-2xl font-bold text-white">{selectedYear}</span>
                  </div>
                </div>
                
                {/* Year Range Selector */}
                <div className="space-y-3 md:space-y-4">
                  {/* Year Buttons */}
                  <div className="flex justify-between">
                    {availableYears.map((year) => (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`px-2 md:px-4 py-1 md:py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 ${
                          selectedYear === year
                            ? 'bg-primary text-white shadow-lg transform scale-110'
                            : 'text-gray-500 hover:text-primary hover:bg-primary/10'
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                  
                  {/* Slider Track */}
                  <div className="relative">
                    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500 ease-out bg-primary"
                        style={{
                          width: `${((selectedYear - minYear) / (maxYear - minYear)) * 100}%`
                        }}
                      ></div>
                    </div>
                    <input
                      type="range"
                      min={minYear}
                      max={maxYear}
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(Number(e.target.value))}
                      className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
                    />
                  </div>
                  
                  {/* Range Labels */}
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400 font-medium">{minYear}</span>
                    <span className="text-xs text-gray-400 font-medium">{maxYear}</span>
                  </div>
                </div>
              </div>
              
              {/* Category Selection - Right Aligned */}
              <div className="md:w-1/2 md:flex md:justify-end">
                <div className="w-full md:max-w-sm">
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg bg-primary">
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-base md:text-lg font-bold text-gray-800">Select Category</h3>
                        <p className="text-xs md:text-sm text-gray-500">Choose competition type</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Category Options */}
                  <div className="bg-white rounded-2xl md:rounded-3xl p-2 shadow-xl border border-gray-100">
                    <div className="flex relative">
                      <div 
                        className={`absolute top-2 bottom-2 w-1/2 rounded-xl md:rounded-2xl transition-all duration-500 ease-out bg-primary ${
                          selectedCategory === 'School' ? 'translate-x-full' : 'translate-x-0'
                        }`}
                      ></div>
                      <button
                        onClick={() => setSelectedCategory('Open')}
                        className={`flex-1 py-3 md:py-4 px-4 md:px-6 rounded-xl md:rounded-2xl font-semibold transition-all duration-500 flex items-center justify-center space-x-2 md:space-x-3 relative z-10 text-sm md:text-base ${
                          selectedCategory === 'Open'
                            ? 'text-white'
                            : 'text-gray-600 hover:text-primary'
                        }`}
                      >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                        <span className="font-medium">Open</span>
                      </button>
                      <button
                        onClick={() => setSelectedCategory('School')}
                        className={`flex-1 py-3 md:py-4 px-4 md:px-6 rounded-xl md:rounded-2xl font-semibold transition-all duration-500 flex items-center justify-center space-x-2 md:space-x-3 relative z-10 text-sm md:text-base ${
                          selectedCategory === 'School'
                            ? 'text-white'
                            : 'text-gray-600 hover:text-primary'
                        }`}
                      >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                        <span className="font-medium">School</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Category Description */}
                  <div className="mt-4">
                    <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm border border-gray-100">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-sm text-gray-700 font-medium">
                        {selectedCategory === 'Open' 
                          ? 'Professional & amateur photographers (18+)' 
                          : 'Students & young photographers (13-17)'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {currentWinners.map((winner: Winner, index: number) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                <div className="relative">
                  <img 
                    src={winner.image} 
                    alt={winner.name} 
                    className="w-full h-48 md:h-64 object-cover"
                  />

                  <div className="absolute top-2 left-2 bg-[#F0A641] text-white px-2 py-1 rounded text-xs font-semibold">
                    {winner.competitionCategory}
                  </div>
                </div>
                <div className="p-4 md:p-6 text-center">
                  <h3 className="font-bold text-base md:text-lg mb-1 text-black">{winner.name}</h3>
                  <p className="text-black text-xs md:text-sm">{winner.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* News Section */}
      <section id="news" className="py-12 md:py-20 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-6 md:mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">NEWS</h2>
            <div className="w-24 h-1 bg-primary"></div>
          </div>
          
          {/* News Slider */}
          <div className="relative pb-12">
            {/* Slider Container */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentNewsIndex * 100}%)` }}
              >
                {newsData.map((news: NewsItem, index: number) => (
                  <div key={news.id} className="w-full flex-shrink-0 px-4">
                    <div className="max-w-4xl mx-auto">
                      <div className="grid md:grid-cols-2 gap-8 items-start">
                        {/* Image Side */}
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                          <img 
                            src={news.image} 
                            alt={news.title}
                            className="w-full h-80 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                        </div>
                        
                                                 {/* Content Side */}
                         <div className="space-y-4 md:space-y-6 pb-12 md:pb-16">
                           {isLatestNews(news.date) && (
                             <div className="inline-flex items-center space-x-2 px-3 md:px-4 py-2 rounded-full bg-primary/20 border border-primary">
                               <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                               <span className="text-xs md:text-sm font-medium text-primary">Latest News</span>
                             </div>
                           )}
                           
                           <h3 className="text-xl md:text-3xl font-bold text-white leading-tight">
                             {news.title}
                           </h3>
                           
                           <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                             {news.description}
                           </p>
                           
                           <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                             <div className="flex items-center space-x-2 md:space-x-4">
                               <span className="text-xs md:text-sm text-gray-400">Wild Sri Lanka</span>
                               <div className="w-1 h-1 bg-primary rounded-full"></div>
                               <span className="text-xs md:text-sm text-gray-400">Conservation</span>
                             </div>
                             <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-400">
                               <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                               </svg>
                               <span>{formatDate(news.date)}</span>
                             </div>
                           </div>
                           
                           <Link href={`/news/${news.id}`} className="inline-flex items-center space-x-2 px-4 md:px-6 py-2 md:py-3 bg-primary text-black font-semibold rounded-xl hover:bg-primary-dark transition-colors duration-300 text-sm md:text-base">
                             <span>Read More</span>
                             <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                             </svg>
                           </Link>
                         </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Arrows */}
            <button 
              onClick={() => setCurrentNewsIndex(Math.max(0, currentNewsIndex - 1))}
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border ${
                currentNewsIndex === 0 
                  ? 'bg-gray-800/50 text-gray-400 cursor-not-allowed' 
                  : 'bg-black/50 hover:bg-primary text-white border-white/20 hover:border-primary'
              }`}
              disabled={currentNewsIndex === 0}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={() => setCurrentNewsIndex(Math.min(newsData.length - 1, currentNewsIndex + 1))}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border ${
                currentNewsIndex === newsData.length - 1 
                  ? 'bg-gray-800/50 text-gray-400 cursor-not-allowed' 
                  : 'bg-black/50 hover:bg-primary text-white border-white/20 hover:border-primary'
              }`}
              disabled={currentNewsIndex === newsData.length - 1}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
              {newsData.map((_, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentNewsIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 ${
                    index === currentNewsIndex 
                      ? 'bg-primary scale-125 shadow-lg' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
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