'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/header'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'

interface Project {
  id: number
  title: string
  description: string
  image: string
  date: string
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

interface ProjectsData {
  upcomingEvents: Project[]
  pastEvents: Project[]
}

export default function ProjectsPage() {
  const [projectsData, setProjectsData] = useState<ProjectsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<'upcoming' | 'past'>('upcoming')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const loadProjectsData = async () => {
      try {
        const response = await fetch('/projects.json')
        if (!response.ok) {
          throw new Error('Failed to fetch projects data')
        }
        const data = await response.json()
        setProjectsData(data)
      } catch (error) {
        console.error('Error loading projects data:', error)
        // Fallback data
        setProjectsData({
          upcomingEvents: [],
          pastEvents: []
        })
      } finally {
        setLoading(false)
      }
    }

    loadProjectsData()
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
            <p className="text-gray-600 text-lg font-medium">Loading projects...</p>
          </div>
        </div>
      </>
    )
  }

  const currentProjects = activeFilter === 'upcoming' 
    ? projectsData?.upcomingEvents || []
    : projectsData?.pastEvents || []

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-8" style={{ backgroundColor: '#f8f6f2' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-4 text-black">OUR PROJECTS</h2>
            <div className="w-24 h-1 bg-primary"></div>
          </div>
          
          <div className="max-w-4xl">
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-6 mb-8">
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
              <span className="relative z-10">Upcoming Events ({projectsData?.upcomingEvents.length || 0})</span>
              {activeFilter === 'upcoming' && (
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: '#d8942e' }}></div>
              )}
            </button>
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
              <span className="relative z-10">Past Events ({projectsData?.pastEvents.length || 0})</span>
              {activeFilter === 'past' && (
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: '#d8942e' }}></div>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="pt-8 pb-20" style={{ backgroundColor: '#f8f6f2' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProjects.map((project) => (
              <div key={project.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden flex flex-col h-full">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 text-sm font-semibold shadow-lg">
                      {project.category}
                    </div>
                  </div>

                  {/* Date Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-black/80 backdrop-blur-sm text-white text-sm font-semibold shadow-lg">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {formatDate(project.date)}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Project Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {project.location}
                    </div>

                    {/* Dynamic details based on project type */}
                    {activeFilter === 'upcoming' && project.spots && (
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                        {project.spots} spots available
                      </div>
                    )}

                    {activeFilter === 'past' && project.participants && (
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                        {project.participants} participants
                      </div>
                    )}

                    {project.duration && (
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {project.duration}
                      </div>
                    )}
                  </div>

                  {/* Price for upcoming events */}
                  {activeFilter === 'upcoming' && project.price && (
                    <div className="mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary font-semibold text-sm">
                        {project.price}
                      </span>
                    </div>
                  )}

                  {/* Action Button - Pushed to bottom */}
                  <div className="mt-auto pt-4">
                    <button 
                      onClick={() => {
                        setSelectedProject(project)
                        setShowModal(true)
                      }}
                      className="w-full px-6 py-3 bg-primary text-black font-semibold rounded-xl hover:bg-primary-dark transition-colors duration-300"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {currentProjects.length === 0 && (
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

      {/* Project Details Modal */}
      {showModal && selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
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
                  {selectedProject.category}
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {selectedProject.title}
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {selectedProject.location}
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  {formatDate(selectedProject.date)}
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {selectedProject.description}
              </p>

              {/* Additional Details */}
              <div className="space-y-3">
                {activeFilter === 'upcoming' && selectedProject.spots && (
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    {selectedProject.spots} spots available
                  </div>
                )}

                {activeFilter === 'upcoming' && selectedProject.price && (
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    Price: {selectedProject.price}
                  </div>
                )}

                {activeFilter === 'past' && selectedProject.participants && (
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    {selectedProject.participants} participants
                  </div>
                )}

                {selectedProject.duration && (
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Duration: {selectedProject.duration}
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