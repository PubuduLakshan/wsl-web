"use client"

import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Navbar } from '../../../components/header'
import { ContactSection } from '../../../components/contact-section'
import { Footer } from '../../../components/footer'

interface TeamMember {
  id: string
  name: string
  position?: string
  email: string
  image: string
  bio?: string
  website?: string
  facebook?: string
  instagram?: string
  galleryImages?: string[]
}

interface TeamData {
  boardOfficials: TeamMember[]
  moderaTeam: TeamMember[]
}

export default function TeamMemberProfile() {
  const { id } = useParams<{ id: string }>()
  const [member, setMember] = useState<TeamMember | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    const loadTeamMember = async () => {
      try {
        const response = await fetch('/team.json')
        if (!response.ok) {
          throw new Error('Failed to load team data')
        }
        const data: TeamData = await response.json()
        
        // Find the member by ID in both arrays
        const foundMember = data.boardOfficials.find(m => m.id === id) || 
                           data.moderaTeam.find(m => m.id === id)
        
        if (foundMember) {
          setMember(foundMember)
        } else {
          setError('Team member not found')
        }
      } catch (error) {
        console.error('Error loading team member:', error)
        setError('Failed to load team member data')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      loadTeamMember()
    }
  }, [id])

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg font-medium">Loading team member profile...</p>
          </div>
        </div>
      </>
    )
  }

  if (error || !member) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Team Member Not Found</h1>
            <p className="text-gray-600 mb-8">The team member you're looking for doesn't exist.</p>
            <Link 
              to="/team" 
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors duration-200"
            >
              ← Back to Team
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
      <section className="py-20" style={{ backgroundColor: '#f8f6f2' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <Link 
              to="/team" 
              className="inline-flex items-center text-primary hover:text-primary-dark transition-colors duration-200 mb-4"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Team
            </Link>
            <h1 className="text-4xl font-bold mb-4 text-black">Team Member Profile</h1>
            <div className="w-24 h-1 bg-primary"></div>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Profile Content */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Left Column - Text Information */}
                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">{member.name.toUpperCase()}</h2>
                    {member.position && (
                      <h3 className="text-xl font-bold text-gray-700">{member.position.toUpperCase()}</h3>
                    )}
                  </div>

                  {/* Biography */}
                  <div>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {member.bio || `${member.name} is a dedicated member of the Wild Sri Lanka team, contributing their expertise and passion for wildlife photography and conservation. With a commitment to preserving Sri Lanka's natural heritage, they work tirelessly to promote awareness and appreciation for the country's diverse wildlife.`}
                    </p>
                  </div>
                </div>

                {/* Right Column - Circular Profile Image */}
                <div className="flex flex-col items-center">
                  <div className="relative mb-6">
                    <div className="w-80 h-80 rounded-full overflow-hidden shadow-2xl">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <span className="text-gray-600">{member.email}</span>
                    </div>

                    {/* Social Links */}
                    <div className="flex space-x-6 justify-center">
                      {member.website && (
                        <a 
                          href={member.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary underline hover:text-primary-dark transition-colors duration-200"
                        >
                          Website
                        </a>
                      )}
                      {member.facebook && (
                        <a 
                          href={member.facebook} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary underline hover:text-primary-dark transition-colors duration-200"
                        >
                          Facebook
                        </a>
                      )}
                      {member.instagram && (
                        <a 
                          href={member.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary underline hover:text-primary-dark transition-colors duration-200"
                        >
                          Instagram
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Gallery Images Section */}
              {member.galleryImages && member.galleryImages.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {member.galleryImages.map((image, index) => (
                      <div 
                        key={index} 
                        className="group relative overflow-hidden rounded-xl shadow-lg aspect-[4/3] cursor-pointer"
                        onClick={() => setSelectedImage(image)}
                      >
                        <img
                          src={image}
                          alt={`${member.name} gallery ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Click to view
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
                      alt="Full size gallery image"
                      className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                    />
                  </div>
                </div>
              )}

              {/* Back to Team Button */}
              <div className="mt-8 flex justify-center">
                <Link 
                  to="/team" 
                  className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors duration-200"
                >
                  ← Back to Team
                </Link>
              </div>
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
