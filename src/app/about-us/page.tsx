"use client"

import React from 'react'
import { Navbar } from '../../components/header'
import { ContactSection } from '../../components/contact-section'
import { Footer } from '../../components/footer'

export default function AboutUsPage() {
  return (
    <>
      <Navbar />
      
      {/* ABOUT US Section */}
      <section className="py-20" style={{ backgroundColor: '#f8f6f2' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-4 text-black">ABOUT US</h2>
            <div className="w-24 h-1 bg-primary"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              In November 2015, a passionate group of photographers, driven by their love for nature and wildlife, laid the foundation for "Wild Sri Lanka." Our community, initially formed on social media, was conceived with a noble vision: to contribute to the conservation of Sri Lankan wildlife and elevate the standard of wildlife photography to an international level.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
              Over the years, our community has experienced remarkable growth, evolving into the largest wildlife photography hub in Sri Lanka, boasting over 49,000 members. Committed to our primary goal of wildlife conservation, we have successfully executed various projects that have become landmarks within the global wildlife photography community.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
                alt="Our Team" 
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* OUR MISSION Section */}
      <section className="py-20" style={{ backgroundColor: '#F0A641' }}>
      <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-4 text-white">OUR VISION</h2>
            <div className="w-24 h-1 bg-white"></div>
          </div>
          
          <div className="max-w-4xl">
           <p className="text-xl text-white leading-relaxed">
           To promote wildlife photography as a tool of wildlife conservation.
          </p>
          </div>
        </div>
        <br />
        <br />
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-4 text-white">OUR MISSION</h2>
            <div className="w-24 h-1 bg-white"></div>
          </div>
          
          <div className="max-w-4xl">
           <p className="text-xl text-white leading-relaxed">
            Create awareness and inspire the public about the magnificent fauna and Flora of this country so they yield sincere initiatives for the conservation of Sri Lankan wildlife.
           </p>
          </div>
        </div>
      </section>

      {/* WHY WE STARTED? Section */}
      <section className="py-20" style={{ backgroundColor: '#f8f6f2' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-4 text-black">WHY WE STARTED?</h2>
            <div className="w-24 h-1 bg-primary"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Share knowledge about wildlife photography with others who are interested in improving their skills and abilities.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Create a platform for our members to share their creative and rare captures from around the world.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Enable our members to win the highest global recognition—an international photography competition—and to bring honor to Sri Lanka.
              </p>
            </div>
          </div>
          
          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Row 1 */}
            <div className="space-y-6">
              <img 
                src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=400&q=80" 
                alt="Gallery Exhibition" 
                className="w-full h-48 object-cover rounded-xl shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <img 
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" 
                alt="Team Meeting" 
                className="w-full h-48 object-cover rounded-xl shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <img 
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80" 
                alt="Award Ceremony" 
                className="w-full h-48 object-cover rounded-xl shadow-lg"
              />
            </div>
            
            {/* Row 2 */}
            <div className="space-y-6">
              <img 
                src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" 
                alt="Presentation" 
                className="w-full h-48 object-cover rounded-xl shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <img 
                src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80" 
                alt="Graduation Ceremony" 
                className="w-full h-48 object-cover rounded-xl shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <img 
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" 
                alt="Wildlife Management" 
                className="w-full h-48 object-cover rounded-xl shadow-lg"
              />
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