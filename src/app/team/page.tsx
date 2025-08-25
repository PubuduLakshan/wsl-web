"use client"

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../../components/header'
import { ContactSection } from '../../components/contact-section'
import { Footer } from '../../components/footer'

interface TeamMember {
  id: string
  name: string
  position?: string
  email: string
  image: string
}

interface TeamData {
  boardOfficials: TeamMember[]
  moderaTeam: TeamMember[]
}

export default function TeamPage() {
  const [teamData, setTeamData] = useState<TeamData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTeamData = async () => {
      try {
        const response = await fetch('/team.json')
        if (!response.ok) {
          throw new Error('Failed to load team data')
        }
        const data = await response.json()
        setTeamData(data)
      } catch (error) {
        console.error('Error loading team data:', error)
        // Fallback data in case of error
        setTeamData({
          boardOfficials: [
            { id: 'niro-genzarry-president', name: 'Niro Genzarry', position: 'President', email: 'nina.genzarry@team.collection', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
            { id: 'clara-huel-vice-president', name: 'Clara Huel', position: 'Vice President', email: 'clara.huel@team.collection', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=400&q=80' },
            { id: 'max-collins-secretary', name: 'Max Collins', position: 'Secretary', email: 'm.collins@team.collection', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' }
          ],
          moderaTeam: [
            { id: 'niro-genzarry-moderator-1', name: 'Niro Genzarry', email: 'nina.genzarry@team.collection', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
            { id: 'clara-huel-moderator-1', name: 'Clara Huel', email: 'clara.huel@team.collection', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=400&q=80' },
            { id: 'max-collins-moderator-1', name: 'Max Collins', email: 'm.collins@team.collection', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' }
          ]
        })
      } finally {
        setLoading(false)
      }
    }

    loadTeamData()
  }, [])

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg font-medium">Loading our amazing team...</p>
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
            <h2 className="text-4xl font-bold mb-4 text-black">MEET OUR TEAM</h2>
            <div className="w-24 h-1 bg-primary"></div>
          </div>
          
          <div className="max-w-4xl">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The staff of "Wild Srilanka" comprises talented wildlife photographers and conservation enthusiasts in Sri Lanka. 
            Our team includes both young and elder volunteers who contribute their time and expertise without any financial benefit. 
            Our collective aim is to create a better country for the next generation, fostering peaceful coexistence with wildlife and nature. 
            We strive to promote wildlife photography as a tool for conservation, raise awareness, and inspire the public about the magnificent fauna and flora of our country. 
            Through these efforts, we hope to encourage sincere initiatives for the conservation of Sri Lankan wildlife.
            </p>
          </div>
        </div>
      </section>

      {/* BOARD OF OFFICIALS Section */}
      <section className="py-20" style={{ backgroundColor: '#222222' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">BOARD OF OFFICIALS</h2>
            <div className="w-24 h-1 bg-primary"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamData?.boardOfficials.map((member, index) => (
              <div key={index} className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Position Badge */}
                  {member.position && (
                    <div className="absolute bottom-4 left-4">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-primary text-sm font-semibold shadow-lg">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        {member.position}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                    {member.name}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 text-sm">
                    <svg className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="truncate">{member.email}</span>
                  </div>
                  
                  {/* Hover Profile Button */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link 
                      to={`/team/${member.id}`}
                      className="block w-full px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors duration-200 text-center"
                      onClick={() => {
                        // Scroll to top when navigating to team member profile
                        window.scrollTo(0, 0)
                      }}
                    >
                      Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODERA Section */}
      <section className="py-20" style={{ backgroundColor: '#f8f6f2' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4 text-black">MODERATION TEAM MEMBERS</h2>
            <div className="w-24 h-1 bg-primary"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamData?.moderaTeam.map((member, index) => (
              <div key={index} className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Role Badge */}
                  <div className="absolute bottom-4 left-4">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 text-sm font-semibold shadow-lg">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                      Moderator
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                    {member.name}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 text-sm">
                    <svg className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="truncate">{member.email}</span>
                  </div>
                  
                  {/* Hover Profile Button */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link 
                      to={`/team/${member.id}`}
                      className="block w-full px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors duration-200 text-center"
                      onClick={() => {
                        // Scroll to top when navigating to team member profile
                        window.scrollTo(0, 0)
                      }}
                    >
                      Profile
                    </Link>
                  </div>
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