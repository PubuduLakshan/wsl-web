"use client"

import React from 'react'

export function ContactSection() {
  return (
    <section className="py-20 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80"
          alt="Leopard Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-4">REACH US</h2>
          <div className="w-24 h-1 bg-primary"></div>
        </div>
        
        <p className="text-lg text-gray-300 mb-12 max-w-2xl">
          Lorem ipsum dolor sit amet consectetur. Nunc vel tincidunt facilisis sit consequat et scelerisque. Lorem ipsum dolor sit amet consectetur.
        </p>
        
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
            
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            
            <div>
              <input
                type="tel"
                placeholder="Phone"
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            
            <div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            
            <div>
              <textarea
                placeholder="Message"
                rows={5}
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-primary transition-colors resize-none"
              ></textarea>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className="px-8 py-4 bg-white text-black font-semibold rounded-xl border border-white hover:bg-gray-100 transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
} 