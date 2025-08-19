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



export default function WPOYPage() {
  const [selectedYear, setSelectedYear] = useState(2024)
  const [selectedCategory, setSelectedCategory] = useState<'Open' | 'Junior'>('Open')
  const [winnersByYearAndCategory, setWinnersByYearAndCategory] = useState<Record<number, Record<'Open' | 'Junior', Winner[]>>>({})
  const [winnersLoading, setWinnersLoading] = useState(true)
  
  const currentWinners = winnersByYearAndCategory[selectedYear]?.[selectedCategory] || []
  const availableYears = Object.keys(winnersByYearAndCategory).map(Number).sort((a, b) => b - a)
  const minYear = availableYears.length > 0 ? Math.min(...availableYears) : 2024
  const maxYear = availableYears.length > 0 ? Math.max(...availableYears) : 2024

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

    loadWinnersData()
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
                Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            
            <div className="mb-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
          
          {/* Extended Modern Image Grid */}
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
              {/* Row 1: Large + 2 Medium */}
              <div className="md:col-span-6 group relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80" 
                  alt="Leopard in tree with person observing" 
                  className="w-full h-80 md:h-96 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold text-xl mb-2">Wildlife Photography</h3>
                  <p className="text-base text-gray-200">Capturing nature's essence</p>
                </div>
              </div>
              
              <div className="md:col-span-3 group relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80" 
                  alt="Indoor exhibition with people viewing photos" 
                  className="w-full h-80 md:h-96 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold text-lg mb-1">Gallery Exhibition</h3>
                  <p className="text-sm text-gray-200">Showcasing talent</p>
                </div>
              </div>
              
              <div className="md:col-span-3 group relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80" 
                  alt="Exhibition with Wild Sri Lanka branding" 
                  className="w-full h-80 md:h-96 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold text-lg mb-1">Conservation Story</h3>
                  <p className="text-sm text-gray-200">Preserving nature</p>
                </div>
              </div>
              
              {/* Row 2: 4 Small Images */}
              <div className="md:col-span-3 group relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80" 
                  alt="Group of men with Wild Sri Lanka bags" 
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold text-lg mb-1">Team Event</h3>
                  <p className="text-sm text-gray-200">Community gathering</p>
                </div>
              </div>
              
              <div className="md:col-span-3 group relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" 
                  alt="Gallery with framed nature photographs" 
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold text-lg mb-1">Art Gallery</h3>
                  <p className="text-sm text-gray-200">Framed masterpieces</p>
                </div>
              </div>
              
              <div className="md:col-span-3 group relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=600&q=80" 
                  alt="Man in green shirt viewing photographs" 
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold text-lg mb-1">Visitor Experience</h3>
                  <p className="text-sm text-gray-200">Engaging displays</p>
                </div>
              </div>
              
              <div className="md:col-span-3 group relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80" 
                  alt="Man with red backpack viewing gallery" 
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold text-lg mb-1">Photography Exhibition</h3>
                  <p className="text-sm text-gray-200">Celebrating wildlife</p>
                </div>
              </div>
              
              {/* Row 3: 2 Medium + Large */}
              <div className="md:col-span-3 group relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=600&q=80" 
                  alt="Elephant in natural habitat" 
                  className="w-full h-80 md:h-96 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold text-lg mb-1">Elephant Family</h3>
                  <p className="text-sm text-gray-200">Majestic wildlife</p>
                </div>
              </div>
              
              <div className="md:col-span-3 group relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=600&q=80" 
                  alt="Bird in flight" 
                  className="w-full h-80 md:h-96 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold text-lg mb-1">Bird Photography</h3>
                  <p className="text-sm text-gray-200">Avian beauty</p>
                </div>
              </div>
              
              <div className="md:col-span-6 group relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80" 
                  alt="Leopard in natural environment" 
                  className="w-full h-80 md:h-96 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold text-xl mb-2">Leopard Portrait</h3>
                  <p className="text-base text-gray-200">Rare wildlife capture</p>
                </div>
              </div>
              
              {/* Row 4: 6 Small Images */}
              <div className="md:col-span-2 group relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=400&q=80" 
                  alt="Elephant close-up" 
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold text-sm mb-1">Elephant Eye</h3>
                  <p className="text-xs text-gray-200">Intimate moment</p>
                </div>
              </div>
              
              <div className="md:col-span-2 group relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=400&q=80" 
                  alt="Bird perched" 
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold text-sm mb-1">Bird Perched</h3>
                  <p className="text-xs text-gray-200">Natural pose</p>
                </div>
              </div>
              
              <div className="md:col-span-2 group relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" 
                  alt="Gallery interior" 
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold text-sm mb-1">Gallery Space</h3>
                  <p className="text-xs text-gray-200">Exhibition hall</p>
                </div>
              </div>
              
              <div className="md:col-span-2 group relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" 
                  alt="Conservation work" 
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold text-sm mb-1">Conservation</h3>
                  <p className="text-xs text-gray-200">Protecting nature</p>
                </div>
              </div>
              
              <div className="md:col-span-2 group relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80" 
                  alt="Team collaboration" 
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold text-sm mb-1">Team Work</h3>
                  <p className="text-xs text-gray-200">Collaboration</p>
                </div>
              </div>
              
              <div className="md:col-span-2 group relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" 
                  alt="Art display" 
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold text-sm mb-1">Art Display</h3>
                  <p className="text-xs text-gray-200">Creative showcase</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Text Blocks */}
          <div>
            <div className="mb-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            
            <div>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        </div>
      </section>

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
              <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                <div className="relative">
                  <img 
                    src={winner.image} 
                    alt={winner.name} 
                    className="w-full h-64 object-cover"
                  />

                  <div className="absolute top-2 left-2 bg-[#F0A641] text-white px-2 py-1 rounded text-xs font-semibold">
                    {winner.competitionCategory}
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

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </>
  )
} 