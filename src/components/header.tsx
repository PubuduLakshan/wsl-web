import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useEvents } from './events-context'
import { useWPOY } from './wpoty-context'
import { Logo } from './logo'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const pathname = location.pathname
  const { hasEventsToday } = useEvents()
  const { isWPOYAnnounced, isSubmissionClosed } = useWPOY()

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  const getLinkClasses = (path: string) => {
    const active = isActive(path)
    return `text-sm font-medium transition-all duration-300 no-underline relative group ${
      active 
        ? 'text-primary hover:text-primary-light' 
        : 'text-white/90 hover:text-primary'
    }`
  }

  const getMobileLinkClasses = (path: string) => {
    const active = isActive(path)
    return `block w-full text-left px-4 py-3 text-base font-medium transition-all duration-300 no-underline ${
      active 
        ? 'text-primary bg-white/10' 
        : 'text-white hover:text-primary hover:bg-white/10'
    }`
  }

  const getUnderlineClasses = (path: string) => {
    const active = isActive(path)
    return `absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
      active ? 'w-full' : 'w-0 group-hover:w-full'
    }`
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="w-full bg-black/90 backdrop-blur-md h-16 sm:h-20 flex items-center justify-between sticky top-0 z-40 px-4 sm:px-6 md:px-8 border-b border-white/20">
      {/* Logo - Left Side */}
      <div className="flex items-center">
        <Logo size="md" />
      </div>

      {/* Desktop Navigation - Hidden on Mobile */}
      <div className="hidden lg:flex items-center gap-6 md:gap-8">
        <Link 
          to="/" 
          className={getLinkClasses('/')}
          onClick={() => {
            // Scroll to top when navigating to home page
            window.scrollTo(0, 0)
          }}
        >
          HOME
          <div className={getUnderlineClasses('/')}></div>
        </Link>
        <Link 
          to="/wpoty" 
          className={getLinkClasses('/wpoty')}
          onClick={() => {
            // Scroll to top when navigating to wpoty page
            window.scrollTo(0, 0)
          }}
        >
          <span className="flex items-center">
            WPOTY
            {isWPOYAnnounced && (
              <span className={`ml-1 w-2 h-2 rounded-full animate-pulse ${
                isSubmissionClosed ? 'bg-red-500' : 'bg-green-500'
              }`}></span>
            )}
          </span>
          <div className={getUnderlineClasses('/wpoty')}></div>
        </Link>
        <Link 
          to="/events" 
          className={getLinkClasses('/events')}
          onClick={() => {
            // Scroll to top when navigating to events page
            window.scrollTo(0, 0)
          }}
        >
          <span className="flex items-center">
            EVENTS
            {hasEventsToday && (
              <span className="ml-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </span>
          <div className={getUnderlineClasses('/events')}></div>
        </Link>
        <Link 
          to="/projects" 
          className={getLinkClasses('/projects')}
          onClick={() => {
            // Scroll to top when navigating to projects page
            window.scrollTo(0, 0)
          }}
        >
          <span className="flex items-center">
            PROJECTS
          </span>
          <div className={getUnderlineClasses('/projects')}></div>
        </Link>
        <Link 
          to="/news" 
          className={getLinkClasses('/news')}
          onClick={() => {
            // Scroll to top when navigating to news page
            window.scrollTo(0, 0)
          }}
        >
          NEWS
          <div className={getUnderlineClasses('/news')}></div>
        </Link>
        <Link 
          to="/team" 
          className={getLinkClasses('/team')}
          onClick={() => {
            // Scroll to top when navigating to team page
            window.scrollTo(0, 0)
          }}
        >
          OUR TEAM
          <div className={getUnderlineClasses('/team')}></div>
        </Link>
        <Link 
          to="/about-us" 
          className={getLinkClasses('/about-us')}
          onClick={() => {
            // Scroll to top when navigating to about-us page
            window.scrollTo(0, 0)
          }}
        >
          ABOUT US
          <div className={getUnderlineClasses('/about-us')}></div>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden w-10 h-10 bg-white/10 rounded-lg backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black z-50">
          <div className="flex flex-col h-full bg-black">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20 bg-black">
              <div className="flex items-center gap-3">
                <Logo size="md" />
              </div>
              <button
                onClick={toggleMobileMenu}
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Links */}
            <div className="flex-1 flex flex-col justify-center px-6 py-8 bg-black">
              <div className="space-y-4">
                <Link 
                  to="/" 
                  className={getMobileLinkClasses('/')} 
                  onClick={() => {
                    toggleMobileMenu()
                    // Scroll to top when navigating to home page
                    window.scrollTo(0, 0)
                  }}
                >
                  <span className="text-lg font-semibold">HOME</span>
                </Link>
                <Link 
                  to="/wpoty" 
                  className={getMobileLinkClasses('/wpoty')} 
                  onClick={() => {
                    toggleMobileMenu()
                    // Scroll to top when navigating to wpoty page
                    window.scrollTo(0, 0)
                  }}
                >
                  <span className="flex items-center text-lg font-semibold">
                    WPOTY
                    {isWPOYAnnounced && (
                      <span className={`ml-2 w-2 h-2 rounded-full animate-pulse ${
                        isSubmissionClosed ? 'bg-red-500' : 'bg-green-500'
                      }`}></span>
                    )}
                  </span>
                </Link>
                <Link 
                  to="/events" 
                  className={getMobileLinkClasses('/events')} 
                  onClick={() => {
                    toggleMobileMenu()
                    // Scroll to top when navigating to events page
                    window.scrollTo(0, 0)
                  }}
                >
                  <span className="flex items-center text-lg font-semibold">
                    EVENTS
                    {hasEventsToday && (
                      <span className="ml-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    )}
                  </span>
                </Link>
                <Link 
                  to="/projects" 
                  className={getMobileLinkClasses('/projects')} 
                  onClick={() => {
                    toggleMobileMenu()
                    // Scroll to top when navigating to projects page
                    window.scrollTo(0, 0)
                  }}
                >
                  <span className="text-lg font-semibold">PROJECTS</span>
                </Link>
                <Link 
                  to="/news" 
                  className={getMobileLinkClasses('/news')} 
                  onClick={() => {
                    toggleMobileMenu()
                    // Scroll to top when navigating to news page
                    window.scrollTo(0, 0)
                  }}
                >
                  <span className="text-lg font-semibold">NEWS</span>
                </Link>
                <Link 
                  to="/team" 
                  className={getMobileLinkClasses('/team')} 
                  onClick={() => {
                    toggleMobileMenu()
                    // Scroll to top when navigating to team page
                    window.scrollTo(0, 0)
                  }}
                >
                  <span className="text-lg font-semibold">OUR TEAM</span>
                </Link>
                <Link 
                  to="/about-us" 
                  className={getMobileLinkClasses('/about-us')} 
                  onClick={() => {
                    toggleMobileMenu()
                    // Scroll to top when navigating to about-us page
                    window.scrollTo(0, 0)
                  }}
                >
                  <span className="text-lg font-semibold">ABOUT US</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}