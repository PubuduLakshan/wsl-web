import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from './logo'

export function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <Logo size="lg" />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Wild Srilanka is dedicated to nature and wildlife photography, managed by Wild Unlimited. 
              We serve as a platform for showcasing talents in wildlife photography to local and international arenas.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/groups/WildSriLankaPhoto" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors" title="Follow us on Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/wildsrilankaphoto" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors" title="Follow us on Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-400 hover:text-primary transition-colors"
                  onClick={() => {
                    // Scroll to top when navigating to home page
                    window.scrollTo(0, 0)
                  }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/wslpoty" 
                  className="text-gray-400 hover:text-primary transition-colors"
                  onClick={() => {
                    // Scroll to top when navigating to WSLPOTY page
                    window.scrollTo(0, 0)
                  }}
                >
                  WSLPOTY
                </Link>
              </li>
              <li>
                <Link 
                  to="/projects" 
                  className="text-gray-400 hover:text-primary transition-colors"
                  onClick={() => {
                    // Scroll to top when navigating to projects page
                    window.scrollTo(0, 0)
                  }}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link 
                  to="/news" 
                  className="text-gray-400 hover:text-primary transition-colors"
                  onClick={() => {
                    // Scroll to top when navigating to news page
                    window.scrollTo(0, 0)
                  }}
                >
                  News
                </Link>
              </li>
              <li>
                <Link 
                  to="/team" 
                  className="text-gray-400 hover:text-primary transition-colors"
                  onClick={() => {
                    // Scroll to top when navigating to team page
                    window.scrollTo(0, 0)
                  }}
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link 
                  to="/about-us" 
                  className="text-gray-400 hover:text-primary transition-colors"
                  onClick={() => {
                    // Scroll to top when navigating to about us page
                    window.scrollTo(0, 0)
                  }}
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Colombo, Sri Lanka
              </li>
              <li className="flex items-center text-gray-400">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                info@wildsrilanka.com
              </li>
              <li className="flex items-center text-gray-400">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                +94 11 234 5678
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Wild Sri Lanka. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="#" className="text-gray-400 hover:text-primary text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-gray-400 hover:text-primary text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="#" className="text-gray-400 hover:text-primary text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 