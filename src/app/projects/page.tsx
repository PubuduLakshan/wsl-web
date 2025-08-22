import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '@/components/header'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'

interface Project {
  id: number
  title: string
  description: string
  image: string
  category: string
  status: string
  startDate: string
  endDate: string
  location: string
  team: string[]
  funding: string
  partners: string[]
  achievements: string[]
  gallery: string[]
}

interface ProjectsData {
  projects: Project[]
}

export default function ProjectsPage() {
  const [projectsData, setProjectsData] = useState<ProjectsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

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
          projects: []
        })
      } finally {
        setLoading(false)
      }
    }

    loadProjectsData()
  }, [])

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

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(projectsData?.projects.map(project => project.category) || []))]

  // Filter projects by category and sort by startDate (newest first)
  const filteredProjects = projectsData?.projects
    .filter(project => selectedCategory === 'All' || project.category === selectedCategory)
    .sort((a, b) => {
      const dateA = new Date(a.startDate).getTime()
      const dateB = new Date(b.startDate).getTime()
      return dateB - dateA // Descending order (newest first)
    }) || []

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg font-medium">Loading projects...</p>
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
            <h2 className="text-4xl font-bold mb-4 text-black">OUR PROJECTS</h2>
            <div className="w-24 h-1 bg-primary"></div>
          </div>
          
          <div className="max-w-4xl">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Discover our ongoing and completed conservation projects, research initiatives, and community programs that are making a difference in wildlife photography and environmental protection across Sri Lanka.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
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

      {/* Projects Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600">No projects match the selected category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                >
                  {/* Project Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 text-sm font-semibold shadow-lg">
                        {project.category}
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-semibold shadow-lg ${
                        project.status === 'Ongoing' ? 'bg-green-500' :
                        project.status === 'Completed' ? 'bg-blue-500' :
                        'bg-yellow-500'
                      }`}>
                        {project.status}
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
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
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {formatDate(project.startDate)} - {formatDate(project.endDate)}
                      </div>

                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        {project.funding}
                      </div>
                    </div>

                    {/* Read More Button */}
                    <Link
                      to={`/projects/${project.id}`}
                      className="inline-flex items-center px-6 py-3 bg-primary text-black font-semibold rounded-xl hover:bg-primary-dark transition-colors duration-300"
                      onClick={() => {
                        // Scroll to top when navigating to project detail page
                        window.scrollTo(0, 0)
                      }}
                    >
                      View Details
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <ContactSection />
      <Footer />
    </>
  )
}
