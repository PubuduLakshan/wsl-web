import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useEvents } from './events-context'

export function Navbar() {
  const location = useLocation()
  const pathname = location.pathname
  const { hasEventsToday } = useEvents()

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

  const getUnderlineClasses = (path: string) => {
    const active = isActive(path)
    return `absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
      active ? 'w-full' : 'w-0 group-hover:w-full'
    }`
  }

  return (
    <nav className="w-full bg-white/10 backdrop-blur-md h-20 flex items-center justify-between sticky top-0 z-40 px-8 border-b border-white/20">
      {/* Logo - Left Side */}
      <div className="flex items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-sm font-bold">W</span>
          </div>
          <span className="font-bold text-xl text-white">WILD SRI LANKA</span>
        </div>
      </div>

      {/* Navigation - Right Side */}
      <div className="flex items-center gap-8">
        <Link to="/" className={getLinkClasses('/')}>
          HOME
          <div className={getUnderlineClasses('/')}></div>
        </Link>
        <Link to="/wpoty" className={getLinkClasses('/wpoty')}>
          WPOTY
          <div className={getUnderlineClasses('/wpoty')}></div>
        </Link>
        <Link to="/projects" className={getLinkClasses('/projects')}>
          <span className="flex items-center">
            PROJECTS
            {hasEventsToday && (
              <span className="ml-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </span>
          <div className={getUnderlineClasses('/projects')}></div>
        </Link>
        <Link to="/news" className={getLinkClasses('/news')}>
          NEWS
          <div className={getUnderlineClasses('/news')}></div>
        </Link>
        <Link to="/team" className={getLinkClasses('/team')}>
          OUR TEAM
          <div className={getUnderlineClasses('/team')}></div>
        </Link>
        <Link to="/about-us" className={getLinkClasses('/about-us')}>
          ABOUT US
          <div className={getUnderlineClasses('/about-us')}></div>
        </Link>

      </div>
    </nav>
  )
}