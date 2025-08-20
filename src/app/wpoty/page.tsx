"use client"

import React, { useState, useEffect } from 'react'
import { Navbar } from '../../components/header'
import { ContactSection } from '../../components/contact-section'
import { Footer } from '../../components/footer'

interface Winner {
  name: string;
  category: string;
  image: string;
  competitionCategory: 'Open' | 'Junior';
}

interface WPOYConfig {
  isAnnounced: boolean;
  currentYear: number;
  googleSheetLink: string;
  announcementDate: string;
  submissionDeadline: string;
  resultsDate: string;
}

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
  year: number;
}

export default function WPOYPage() {
  const [selectedYear, setSelectedYear] = useState(2024)
  const [selectedCategory, setSelectedCategory] = useState<'Open' | 'Junior'>('Open')
  const [winnersByYearAndCategory, setWinnersByYearAndCategory] = useState<Record<number, Record<'Open' | 'Junior', Winner[]>>>({})
  const [winnersLoading, setWinnersLoading] = useState(true)
  const [wpotyConfig, setWpotyConfig] = useState<WPOYConfig | null>(null)
  const [configLoading, setConfigLoading] = useState(true)
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [galleryLoading, setGalleryLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedWinner, setSelectedWinner] = useState<Winner | null>(null)
  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState(false)
  const [galleryFilter, setGalleryFilter] = useState<'all' | number>('all')
  
  const currentWinners = winnersByYearAndCategory[selectedYear]?.[selectedCategory] || []
  const availableYears = Object.keys(winnersByYearAndCategory).map(Number).sort((a, b) => b - a)
  const minYear = availableYears.length > 0 ? Math.min(...availableYears) : 2024
  const maxYear = availableYears.length > 0 ? Math.max(...availableYears) : 2024

  // Gallery filtering
  const filteredGalleryImages = galleryFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(image => image.year === galleryFilter)
  
  const galleryYears = [...new Set(galleryImages.map(image => image.year))].sort((a, b) => b - a)

  useEffect(() => {
    const loadWinnersData = async () => {
      try {
        const response = await fetch('/winners.json')
        if (response.ok) {
          const data = await response.json()
          setWinnersByYearAndCategory(data)
        }
      } catch (error) {
        console.error('Error loading winners data:', error)
        // Fallback data if JSON loading fails
        setWinnersByYearAndCategory({
          2024: {
            Open: [
              { name: 'Chitral Rajiv Jayatilake', category: 'Winner - Lunging for Life', image: 'https://dm7ldj21i44fm.cloudfront.net/img/winners/2024/open/open-2024-1.png', competitionCategory: 'Open' },
              { name: 'Sujeewa Nishantha Mallawaarachchi', category: '1st runners-Up - Feeding Time ', image: 'https://dm7ldj21i44fm.cloudfront.net/img/winners/2024/open/open-2024-2.png', competitionCategory: 'Open' },
              { name: 'Samith Chandula Perera', category: '2nd runners-Up -  Under the Wings of Danger', image: 'https://dm7ldj21i44fm.cloudfront.net/img/winners/2024/open/open-2024-3.png', competitionCategory: 'Open' },
            ],
            Junior: [
              { name: 'Danuja Santhusa Palihawadana Arachchi', category: 'Winner - Had Enough', image: 'https://dm7ldj21i44fm.cloudfront.net/img/winners/2024/junior/junior-2024-1.png', competitionCategory: 'Junior' },
              { name: 'Sesadi Wickramasinghe', category: '1st runners-Up - A Deadly Delicacy', image: 'https://dm7ldj21i44fm.cloudfront.net/img/winners/2024/junior/junior-2024-2.png', competitionCategory: 'Junior' },
              { name: 'Sesadi Wickramasinghe', category: '2nd runners-Up - Avian Elegance', image: 'https://dm7ldj21i44fm.cloudfront.net/img/winners/2024/junior/junior-2024-3.png', competitionCategory: 'Junior' },
            ]
          }
        })
      } finally {
        setWinnersLoading(false)
      }
    }

    const loadWPOYConfig = async () => {
      try {
        const response = await fetch('/wpoty-config.json')
        if (response.ok) {
          const data = await response.json()
          setWpotyConfig(data)
        }
      } catch (error) {
        console.error('Error loading WPOY config:', error)
        // Fallback config if JSON loading fails
        setWpotyConfig({
          isAnnounced: false,
          currentYear: 2025,
          googleSheetLink: '',
          announcementDate: '',
          submissionDeadline: '',
          resultsDate: ''
        })
      } finally {
        setConfigLoading(false)
      }
    }

    const loadGalleryData = async () => {
      try {
        const response = await fetch('/wpoty-gallery.json')
        if (response.ok) {
          const data = await response.json()
          setGalleryImages(data.galleryImages)
        }
      } catch (error) {
        console.error('Error loading gallery data:', error)
        // Fallback gallery data if JSON loading fails
        setGalleryImages([
          {
            id: 1,
            src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
            alt: "Leopard in tree with person observing",
            title: "Wildlife Photography",
            description: "Capturing nature's essence",
            year: 2024
          },
          {
            id: 2,
            src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
            alt: "Indoor exhibition with people viewing photos",
            title: "Gallery Exhibition",
            description: "Showcasing talent",
            year: 2024
          }
        ])
      } finally {
        setGalleryLoading(false)
      }
    }

    loadWinnersData()
    loadWPOYConfig()
    loadGalleryData()
  }, [])

  // Auto-switch to available category when current category has no data
  useEffect(() => {
    if (winnersByYearAndCategory[selectedYear]) {
      const hasOpenData = winnersByYearAndCategory[selectedYear].Open && winnersByYearAndCategory[selectedYear].Open.length > 0
      const hasJuniorData = winnersByYearAndCategory[selectedYear].Junior && winnersByYearAndCategory[selectedYear].Junior.length > 0
      
      if (selectedCategory === 'Open' && !hasOpenData && hasJuniorData) {
        setSelectedCategory('Junior')
      } else if (selectedCategory === 'Junior' && !hasJuniorData && hasOpenData) {
        setSelectedCategory('Open')
      }
    }
  }, [selectedYear, winnersByYearAndCategory, selectedCategory])

  // Handle modal open/close
  const openModal = (image: GalleryImage) => {
    setSelectedImage(image)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
    document.body.style.overflow = 'unset'
  }

  // Handle winner modal open/close
  const openWinnerModal = (winner: Winner) => {
    setSelectedWinner(winner)
    setIsWinnerModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeWinnerModal = () => {
    setIsWinnerModalOpen(false)
    setSelectedWinner(null)
    document.body.style.overflow = 'unset'
  }

  // Close modals on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isModalOpen) {
          closeModal()
        }
        if (isWinnerModalOpen) {
          closeWinnerModal()
        }
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isModalOpen, isWinnerModalOpen])

  return (
    <>
      <Navbar />
      
      {/* WPOY Content */}
      <section className="py-20" style={{ backgroundColor: '#f8f6f2' }}>
        <div className="max-w-6xl mx-auto px-4">
          {/* Title */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-4 text-black">WILDLIFE PHOTOGRAPHER OF THE YEAR</h2>
            <div className="w-24 h-1 bg-primary"></div>
          </div>
          
          {/* Top Text Blocks */}
          <div className="mb-12">
            <div className="mb-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Launched in 2018, the Wild Srilanka Photographer of the Year competition has become one of the country’s most popular platforms for wildlife photography. Organized by Wild Srilanka, a community-driven group of over 52,000 members, the event not only showcases the talent of Sri Lanka’s photographers but also uses photography as a powerful tool for conservation.              
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">The competition now features <strong>two categories</strong>:</p>
              <br />
              <p className="text-lg text-gray-700 leading-relaxed"><strong>Open Category</strong> – welcoming participants over 18, with winners, merit awards, and exhibition acceptances.</p>
              <p className="text-lg text-gray-700 leading-relaxed"><strong>Junior Category</strong> – introduced in 2024 for school students aged 17 and below, offering free submissions and dedicated recognition to encourage the next generation of wildlife photographers.</p>
            </div>
            
            <div className="mb-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">Entries are judged with strict authenticity standards, requiring original RAW files to ensure that photographs are free from manipulation or AI-generated elements.</p>

              <p className="text-lg text-gray-700 leading-relaxed mb-4">Beyond the competition, <em>Wild Srilanka</em> hosts <strong>workshops and awareness programs</strong> aimed at inspiring both amateur and professional photographers to deepen their knowledge of wildlife, ecosystems, and the role of photography in conservation. Proceeds and initiatives linked to the competition also support various conservation projects and awareness programs that contribute to protecting wildlife and promoting sustainable coexistence with nature.</p>

              <p className="text-lg text-gray-700 leading-relaxed">With each passing year, the <strong>Wild Srilanka Photographer of the Year</strong> continues to grow in scale and impact, providing a platform where creativity, conservation, and community come together.</p>

            </div>
          </div>
        </div>
      </section>

      {/* Competition Entry Section */}
      {!configLoading && (
        <section className="py-20" style={{ backgroundColor: 'rgb(34, 34, 34)' }}>
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">COMPETITION {wpotyConfig?.currentYear}</h2>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
            </div>

            {wpotyConfig?.isAnnounced ? (
              /* Competition is announced - Show entry form */
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8 md:p-12 border border-primary/20">
                <div className="text-center mb-8">
                  {(() => {
                    const today = new Date()
                    const deadline = new Date(wpotyConfig.submissionDeadline)
                    const isDeadlinePassed = today > deadline
                    
                    return isDeadlinePassed ? (
                      <div className="inline-flex items-center space-x-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>Submissions Closed</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Competition Now Open!</span>
                      </div>
                    )
                  })()}
                  <h3 className="text-2xl font-bold text-white mb-2">Wildlife Photographer of the Year {wpotyConfig.currentYear}</h3>
                  <p className="text-gray-300 mb-6">Submit your best wildlife photographs and compete with photographers worldwide</p>
                  
                  {/* Competition Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                                             <h4 className="font-semibold text-gray-800 mb-2">Announcement Date</h4>
                       <p className="text-gray-700">{wpotyConfig.announcementDate}</p>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                                             <h4 className="font-semibold text-gray-800 mb-2">Submission Deadline</h4>
                       <p className="text-gray-700">{wpotyConfig.submissionDeadline}</p>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                                             <h4 className="font-semibold text-gray-800 mb-2">Results Date</h4>
                       <p className="text-gray-700">{wpotyConfig.resultsDate}</p>
                    </div>
                  </div>
                  
                  {/* Entry Button */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {(() => {
                      const today = new Date()
                      const deadline = new Date(wpotyConfig.submissionDeadline)
                      const isDeadlinePassed = today > deadline
                      
                      return isDeadlinePassed ? (
                        /* Deadline passed - Show disabled button */
                        <div className="group relative px-8 py-4 text-gray-400 font-semibold rounded-xl transition-all duration-300 shadow-2xl cursor-not-allowed"
                          style={{ backgroundColor: '#f3f4f6' }}
                        >
                          <span className="relative z-10 flex items-center justify-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            SUBMISSIONS CLOSED
                          </span>
                        </div>
                      ) : (
                        /* Deadline not passed - Show active button */
                        <a 
                          href={wpotyConfig.googleSheetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative px-8 py-4 text-black font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
                          style={{ backgroundColor: '#F0A641' }}
                        >
                          <span className="relative z-10 flex items-center justify-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            ENTER COMPETITION
                          </span>
                          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: '#d8942e' }}></div>
                        </a>
                      )
                    })()}
                  </div>
                </div>
              </div>
            ) : (
              /* Competition not announced - Show coming soon */
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 md:p-12 border border-gray-200">
                <div className="text-center">
                  <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Coming Soon</span>
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-2">Competition {wpotyConfig?.currentYear} Announcement</h3>
                  <p className="text-black mb-6">The Wildlife Photographer of the Year {wpotyConfig?.currentYear} competition will be announced soon. Stay tuned for updates!</p>
                  
                  <div className="bg-white rounded-xl p-6 shadow-lg max-w-md mx-auto">
                    <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 15h6v-2H4v2zM4 11h6V9H4v2zM4 7h6V5H4v2zM4 3h6V1H4v2z" />
                      </svg>
                    </div>
                                         <h4 className="font-semibold text-gray-800 mb-2">Get Notified</h4>
                     <p className="text-gray-700 text-sm">We'll notify you when the competition opens for submissions</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Previous Winners Section */}
      <section id="winners" className="py-20" style={{ backgroundColor: '#f8f6f2' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-black mb-4">WINNERS</h2>
            <div className="w-24 h-1 bg-primary"></div>
          </div>
          
          {/* Year and Category Selection */}
          <div className="mb-12">
            <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between gap-8 md:gap-20">
              {/* Year Selection - Left Aligned */}
              <div className="md:w-1/2">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg bg-primary">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Select Year</h3>
                    <p className="text-sm text-gray-500">Browse winning entries</p>
                  </div>
                </div>
                
                {/* Current Year Display */}
                <div className="mb-6">
                  <div className="px-6 py-4 rounded-2xl shadow-lg bg-primary">
                    <span className="text-2xl font-bold text-white">{selectedYear}</span>
                  </div>
                </div>
                
                {/* Year Range Selector */}
                <div className="space-y-4">
                  {/* Year Buttons */}
                  <div className="flex justify-between">
                    {availableYears.map((year) => (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
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
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg bg-primary">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">Select Category</h3>
                        <p className="text-sm text-gray-500">Choose competition type</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Category Options */}
                  <div className="bg-white rounded-3xl p-2 shadow-xl border border-gray-100">
                    <div className="flex relative">
                      <div 
                        className={`absolute top-2 bottom-2 w-1/2 rounded-2xl transition-all duration-500 ease-out bg-primary ${
                          selectedCategory === 'Junior' ? 'translate-x-full' : 'translate-x-0'
                        }`}
                      ></div>
                      <button
                        onClick={() => setSelectedCategory('Open')}
                        disabled={!winnersByYearAndCategory[selectedYear]?.Open || winnersByYearAndCategory[selectedYear].Open.length === 0}
                        className={`flex-1 py-4 px-6 rounded-2xl font-semibold transition-all duration-500 flex items-center justify-center space-x-3 relative z-10 ${
                          selectedCategory === 'Open'
                            ? 'text-white'
                            : !winnersByYearAndCategory[selectedYear]?.Open || winnersByYearAndCategory[selectedYear].Open.length === 0
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-600 hover:text-primary'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                        <span className="font-medium">Open</span>
                      </button>
                      <button
                        onClick={() => setSelectedCategory('Junior')}
                        disabled={!winnersByYearAndCategory[selectedYear]?.Junior || winnersByYearAndCategory[selectedYear].Junior.length === 0}
                        className={`flex-1 py-4 px-6 rounded-2xl font-semibold transition-all duration-500 flex items-center justify-center space-x-3 relative z-10 ${
                          selectedCategory === 'Junior'
                            ? 'text-white'
                            : !winnersByYearAndCategory[selectedYear]?.Junior || winnersByYearAndCategory[selectedYear].Junior.length === 0
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-600 hover:text-primary'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                        <span className="font-medium">Junior</span>
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentWinners.map((winner: Winner, index: number) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="relative cursor-pointer" onClick={() => openWinnerModal(winner)}>
                  <img 
                    src={winner.image} 
                    alt={winner.name} 
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />

                  <div className="absolute top-2 left-2 bg-[#F0A641] text-white px-2 py-1 rounded text-xs font-semibold">
                    {winner.competitionCategory}
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 rounded-lg px-4 py-2 text-black font-semibold">
                      Click to view
                    </div>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-bold text-lg mb-1 text-black">{winner.name}</h3>
                  <p className="text-black text-sm">{winner.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20" style={{ backgroundColor: '#f8f6f2' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-black mb-4">GALLERY</h2>
            <div className="w-24 h-1 bg-primary"></div>
          </div>

          {/* Gallery Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setGalleryFilter('all')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  galleryFilter === 'all'
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                All Years
              </button>
              {galleryYears.map((year) => (
                <button
                  key={year}
                  onClick={() => setGalleryFilter(year)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    galleryFilter === year
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
          
          {/* Optimized Gallery Grid */}
          <div className="mb-12">
            {galleryLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filteredGalleryImages.map((image) => (
                  <div 
                    key={image.id}
                    className="group relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500 cursor-pointer"
                    onClick={() => openModal(image)}
                  >
                    <div className="aspect-[4/3] relative">
                      <img 
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="font-semibold text-lg mb-1">
                          {image.title}
                        </h3>
                        <p className="text-sm text-gray-200">
                          {image.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Image Modal */}
      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full w-full">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image Container */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              
              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-lg text-gray-200">
                  {selectedImage.description}
                </p>
              </div>
            </div>

            {/* Click outside to close */}
            <div 
              className="absolute inset-0 -z-10" 
              onClick={closeModal}
            ></div>
          </div>
        </div>
      )}

      {/* Winner Modal */}
      {isWinnerModalOpen && selectedWinner && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full w-full">
            {/* Close Button */}
            <button
              onClick={closeWinnerModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image Container */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={selectedWinner.image}
                alt={selectedWinner.name}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              
              {/* Winner Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-[#F0A641] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {selectedWinner.competitionCategory}
                  </span>
                  <span className="text-white/80 text-sm">
                    {selectedYear} Winner
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selectedWinner.name}
                </h3>
                <p className="text-lg text-gray-200">
                  {selectedWinner.category}
                </p>
              </div>
            </div>

            {/* Click outside to close */}
            <div 
              className="absolute inset-0 -z-10" 
              onClick={closeWinnerModal}
            ></div>
          </div>
        </div>
      )}
    </>
  )
} 