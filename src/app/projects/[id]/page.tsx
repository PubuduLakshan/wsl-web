import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
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

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    const loadProjectData = async () => {
      try {
        const response = await fetch('/projects.json')
        if (!response.ok) {
          throw new Error('Failed to fetch project data')
        }
        const data: ProjectsData = await response.json()
        const foundProject = data.projects.find(p => p.id === Number(id))
        
        if (foundProject) {
          setProject(foundProject)
        } else {
          setError('Project not found')
        }
      } catch (error) {
        console.error('Error loading project data:', error)
        setError('Failed to load project')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      loadProjectData()
    }
  }, [id])

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImage(null)
      }
    }

    if (selectedImage) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [selectedImage])

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

  // Function to format date range
  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    
    // Check if both dates are valid and the same
    if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && start.getTime() === end.getTime()) {
      return formatDate(startDate)
    }
    
    // If dates are different or invalid, show range
    return `${formatDate(startDate)} - ${formatDate(endDate)}`
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg font-medium">Loading project...</p>
          </div>
        </div>
      </>
    )
  }

  if (error || !project) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Project Not Found</h3>
            <p className="text-gray-600 mb-6">{error || 'The requested project could not be found.'}</p>
            <Link
              to="/projects"
              className="inline-flex items-center px-6 py-3 bg-primary text-black font-semibold rounded-xl hover:bg-primary-dark transition-colors duration-300"
              onClick={() => {
                // Scroll to top when navigating back to projects page
                window.scrollTo(0, 0)
              }}
            >
              Back to Projects
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="mb-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold">
                {project.category}
              </span>
              <span className={`inline-flex items-center px-4 py-2 rounded-full ml-2 text-white text-sm font-semibold ${
                project.status === 'Ongoing' ? 'bg-green-500' :
                project.status === 'Completed' ? 'bg-blue-500' :
                'bg-yellow-500'
              }`}>
                {project.status}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">{project.description}</p>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                {project.description}
              </p>

              {/* Project Details */}
              <div className="bg-gray-50 rounded-2xl p-8 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Project Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-semibold text-gray-900">{project.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-semibold text-gray-900">{formatDateRange(project.startDate, project.endDate)}</p>
                    </div>
                  </div>
                  
                  {project.funding && project.funding !== 'N/A' && project.funding.trim() !== '' && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-500">Funding</p>
                        <p className="font-semibold text-gray-900">{project.funding}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Team Size</p>
                      <p className="font-semibold text-gray-900">{project.team.length} members</p>
                    </div>
                  </div>
                </div>
              </div>

                             {/* Achievements */}
               {project.achievements.length > 0 && (
                 <div className="mb-8">
                   <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Achievements</h3>
                   <ul className="space-y-3">
                     {project.achievements.map((achievement, index) => (
                       <li key={index} className="flex items-start">
                         <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                         </svg>
                         <span className="text-gray-700">{achievement}</span>
                       </li>
                     ))}
                   </ul>
                 </div>
               )}

               {/* Project Gallery */}
               {project.gallery.length > 0 && (
                 <div className="mb-8">
                   <h3 className="text-2xl font-bold text-gray-900 mb-6">Project Gallery</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {project.gallery.map((image, index) => (
                       <div 
                         key={index} 
                         className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
                         onClick={() => setSelectedImage(image)}
                       >
                         <img
                           src={image}
                           alt={`Project gallery ${index + 1}`}
                           className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                         />
                         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                         <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                           <p className="text-white text-sm font-medium">Click to view</p>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Team */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Team</h3>
                <div className="space-y-3">
                  {project.team.map((member, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3">
                        <span className="text-black text-sm font-semibold">{member.charAt(0)}</span>
                      </div>
                      <span className="text-gray-700">{member}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Partners */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Partners</h3>
                <div className="space-y-2">
                  {project.partners.map((partner, index) => (
                    <div key={index} className="text-gray-700">{partner}</div>
                  ))}
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>

      {/* Back to Projects */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center px-8 py-4 bg-primary text-black font-semibold rounded-xl hover:bg-primary-dark transition-colors duration-300"
            onClick={() => {
              // Scroll to top when navigating back to projects page
              window.scrollTo(0, 0)
            }}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200 text-2xl font-bold"
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Full size project gallery image"
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}

      <ContactSection />
      <Footer />
    </>
  )
}
