'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/header'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { useEvents } from '@/components/events-context'

interface Event {
  id: number
  title: string
  description: string
  image: string
  dates: string[]
  date?: string // For backward compatibility
  location: string
  category: string
  spots?: number
  price?: string
  participants?: number
  winners?: number
  reach?: number
  schools?: number
  duration?: string
  animals?: number
  publications?: number
  traps?: number
  species?: number
  students?: number
  equipment?: number
  recipients?: number
  flights?: number
  coverage?: string
  villages?: number
}

interface EventsData {
  events: Event[]
}

export default function EventsPage() {
  const [eventsData, setEventsData] = useState<EventsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<'upcoming' | 'past'>('upcoming')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showModal, setShowModal] = useState(false)
  const { hasEventsToday } = useEvents()

  // Function to check if event is happening today
  const isEventToday = (event: Event) => {
    const today = new Date()
    const eventDates = event.dates || (event.date ? [event.date] : [])
    
    const isToday = eventDates.some(eventDate => {
      const event = new Date(eventDate)
      return today.getFullYear() === event.getFullYear() &&
             today.getMonth() === event.getMonth() &&
             today.getDate() === event.getDate()
    })
    
    // Debug logging
    console.log(`Event dates: ${eventDates.join(', ')}, Today: ${today.toISOString().split('T')[0]}, Is today: ${isToday}`)
    
    return isToday
  }

  // Function to categorize events based on date
  const categorizeEvents = (events: Event[]) => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    const upcoming: Event[] = []
    const past: Event[] = []
    
    events.forEach(event => {
      // Handle both old 'date' and new 'dates' format for backward compatibility
      const eventDates = event.dates || (event.date ? [event.date] : [])
      
      if (eventDates.length === 0) {
        // If no dates, treat as past event
        past.push(event)
        return
      }
      
      // Check if any date in the array is today or in the future
      const hasUpcomingDate = eventDates.some(date => new Date(date) >= today)
      if (hasUpcomingDate) {
        upcoming.push(event)
      } else {
        past.push(event)
      }
    })
    
    // Sort upcoming events by starting date (descending - furthest future first)
    upcoming.sort((a, b) => {
      const aDates = a.dates || (a.date ? [a.date] : [])
      const bDates = b.dates || (b.date ? [b.date] : [])
      const aEarliest = Math.min(...aDates.map(date => new Date(date).getTime()))
      const bEarliest = Math.min(...bDates.map(date => new Date(date).getTime()))
      return bEarliest - aEarliest // Descending order (furthest future first)
    })
    
    // Sort past events by starting date (descending - most recent first)
    past.sort((a, b) => {
      const aDates = a.dates || (a.date ? [a.date] : [])
      const bDates = b.dates || (b.date ? [b.date] : [])
      const aEarliest = Math.min(...aDates.map(date => new Date(date).getTime()))
      const bEarliest = Math.min(...bDates.map(date => new Date(date).getTime()))
      return bEarliest - aEarliest // Descending order (most recent first)
    })
    
    return { upcoming, past }
  }

  useEffect(() => {
    const loadEventsData = async () => {
      try {
        const response = await fetch('/events.json')
        if (!response.ok) {
          throw new Error('Failed to fetch projects data')
        }
        const data = await response.json()
        setEventsData(data)
      } catch (error) {
        console.error('Error loading events data:', error)
        // Fallback data
        setEventsData({
          events: []
        })
      } finally {
        setLoading(false)
      }
    }

    loadEventsData()
  }, [])

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
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
            <p className="text-gray-600 text-lg font-medium">Loading events...</p>
          </div>
        </div>
      </>
    )
  }

  const { upcoming, past } = eventsData ? categorizeEvents(eventsData.events) : { upcoming: [], past: [] }
  
  // Get unique categories
  const categories = ['All', ...Array.from(new Set(eventsData?.events.map(event => event.category) || []))]
  
  // Filter events by category and time, maintaining descending order by starting date
  const filteredEvents = (activeFilter === 'upcoming' ? upcoming : past)
    .filter(event => selectedCategory === 'All' || event.category === selectedCategory)
    .sort((a, b) => {
      const aDates = a.dates || (a.date ? [a.date] : [])
      const bDates = b.dates || (b.date ? [b.date] : [])
      const aEarliest = Math.min(...aDates.map(date => new Date(date).getTime()))
      const bEarliest = Math.min(...bDates.map(date => new Date(date).getTime()))
      return bEarliest - aEarliest // Descending order by starting date
    })

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-8" style={{ backgroundColor: '#f8f6f2' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-4 text-black">EVENTS</h2>
            <div className="w-24 h-1 bg-primary"></div>
          </div>
          
          <div className="max-w-4xl">
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Discover our exciting lineup of wildlife photography events, workshops, exhibitions, and conservation initiatives. From hands-on workshops to international competitions, join us in celebrating and preserving Sri Lanka's incredible biodiversity through the art of photography.
            </p>
          </div>

          {/* Filter Buttons */}
          {(upcoming.length > 0 || past.length > 0) && (
            <div className="flex flex-wrap gap-6 mb-8">
              {upcoming.length > 0 && (
                <button
                  onClick={() => setActiveFilter('upcoming')}
                  className={`group relative px-8 py-4 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl ${
                    activeFilter === 'upcoming'
                      ? 'text-black' 
                      : 'text-black border-2 border-gray-300 hover:border-primary'
                  }`}
                  style={{ 
                    backgroundColor: activeFilter === 'upcoming' ? '#F0A641' : 'white' 
                  }}
                >
                  <span className="relative z-10 flex items-center">
                    Upcoming Events ({upcoming.length})
                    {hasEventsToday && (
                      <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full bg-red-500 text-white text-xs font-bold animate-pulse">
                        <span className="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-ping"></span>
                        TODAY
                      </span>
                    )}
                  </span>
                  {activeFilter === 'upcoming' && (
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: '#d8942e' }}></div>
                  )}
                </button>
              )}
              {past.length > 0 && (
                <button
                  onClick={() => setActiveFilter('past')}
                  className={`group relative px-8 py-4 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl ${
                    activeFilter === 'past'
                      ? 'text-black' 
                      : 'text-black border-2 border-gray-300 hover:border-primary'
                  }`}
                  style={{ 
                    backgroundColor: activeFilter === 'past' ? '#F0A641' : 'white' 
                  }}
                >
                  <span className="relative z-10">Past Events ({past.length})</span>
                  {activeFilter === 'past' && (
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: '#d8942e' }}></div>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Category Filter */}
      {(upcoming.length > 0 || past.length > 0) && categories.length > 1 && (
        <section className="py-8 bg-white border-b">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-primary text-black shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Events Grid Section */}
      <section className="pt-8 pb-20" style={{ backgroundColor: '#f8f6f2' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => {
                              const isToday = isEventToday(event)
              return (
                <div 
                  key={event.id} 
                  className={`group rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden flex flex-col h-full ${
                    isToday 
                      ? 'bg-gradient-to-br from-yellow-100 to-yellow-50 border-2 border-yellow-400 shadow-yellow-200' 
                      : 'bg-white border border-gray-100'
                  }`}
                >
                <div className="relative overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 text-sm font-semibold shadow-lg">
                      {event.category}
                    </div>
                  </div>

                  {/* Today Banner */}
                  {isToday && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-500 text-white text-sm font-bold shadow-lg animate-pulse">
                        <span className="w-2 h-2 bg-white rounded-full mr-2 animate-ping"></span>
                        HAPPENING TODAY
                      </div>
                    </div>
                  )}

                  {/* Date Badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full backdrop-blur-sm text-sm font-semibold shadow-lg ${
                      isToday 
                        ? 'bg-yellow-400 text-black font-bold' 
                        : 'bg-black/80 text-white'
                    }`}>
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {isToday ? 'TODAY' : formatDate((event.dates || (event.date ? [event.date] : []))[0] || '')}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div>

                    {/* Dynamic details based on event type */}
                    {activeFilter === 'upcoming' && event.spots && (
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                        {event.spots} spots available
                      </div>
                    )}

                    {activeFilter === 'past' && event.participants && (
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                        {event.participants} participants
                      </div>
                    )}

                    {event.duration && (
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {event.duration}
                      </div>
                    )}
                  </div>

                  {/* Price for upcoming events */}
                  {activeFilter === 'upcoming' && event.price && (
                    <div className="mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary font-semibold text-sm">
                                                  {event.price}
                      </span>
                    </div>
                  )}

                  {/* Action Button - Pushed to bottom */}
                  <div className="mt-auto pt-4">
                    <button 
                      onClick={() => {
                        setSelectedEvent(event)
                        setShowModal(true)
                      }}
                      className="w-full px-6 py-3 bg-primary text-black font-semibold rounded-xl hover:bg-primary-dark transition-colors duration-300"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
              )
            })}
          </div>

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No {activeFilter === 'upcoming' ? 'upcoming' : 'past'} events</h3>
              <p className="text-gray-500">Check back later for new projects and events.</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Event Details Modal */}
      {showModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="relative">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute top-4 left-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 text-sm font-semibold shadow-lg">
                  {selectedEvent.category}
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {selectedEvent.title}
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {selectedEvent.location}
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  {(() => {
                    const dates = selectedEvent.dates || (selectedEvent.date ? [selectedEvent.date] : [])
                    return dates.length > 1 
                      ? `${formatDate(dates[0])} - ${formatDate(dates[dates.length - 1])}`
                      : formatDate(dates[0] || '')
                  })()}
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {selectedEvent.description}
              </p>

              {/* Additional Details */}
              <div className="space-y-3">
                {activeFilter === 'upcoming' && selectedEvent.spots && (
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    {selectedEvent.spots} spots available
                  </div>
                )}

                {activeFilter === 'upcoming' && selectedEvent.price && (
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    Price: {selectedEvent.price}
                  </div>
                )}

                {activeFilter === 'past' && selectedEvent.participants && (
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    {selectedEvent.participants} participants
                  </div>
                )}

                {selectedEvent.duration && (
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Duration: {selectedEvent.duration}
                  </div>
                )}
              </div>

              {/* Modal Actions */}
              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-primary transition-colors"
                >
                  Close
                </button>
                {activeFilter === 'upcoming' && (
                  <button className="flex-1 px-6 py-3 bg-primary text-black font-semibold rounded-xl hover:bg-primary-dark transition-colors">
                    Register Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 