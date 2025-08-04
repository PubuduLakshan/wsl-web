"use client"

import React, { useState } from 'react'
import { Link, useLocation } from 'wouter'

export function Navbar() {
  const [location] = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === '/') {
      return location === '/'
    }
    return location.startsWith(path)
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
    return `block py-3 px-4 text-lg font-medium transition-all duration-300 ${
      active 
        ? 'text-primary bg-white/10' 
        : 'text-white/90 hover:text-primary hover:bg-white/5'
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

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="w-full bg-white/10 backdrop-blur-md h-16 md:h-20 flex items-center justify-between sticky top-0 z-40 px-4 md:px-8 border-b border-white/20">
      {/* Logo - Left Side */}
      <div className="flex items-center">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-primary rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-xs md:text-sm font-bold">W</span>
          </div>
          <span className="font-bold text-lg md:text-xl text-white">WILD SRI LANKA</span>
        </div>
      </div>

      {/* Desktop Navigation - Hidden on mobile */}
      <div className="hidden md:flex items-center gap-8">
        <Link href="/" className={getLinkClasses('/')}>
          HOME
          <div className={getUnderlineClasses('/')}></div>
        </Link>
        <Link href="/wpoty" className={getLinkClasses('/wpoty')}>
          WPOTY
          <div className={getUnderlineClasses('/wpoty')}></div>
        </Link>
        <Link href="/projects" className={getLinkClasses('/projects')}>
          PROJECTS
          <div className={getUnderlineClasses('/projects')}></div>
        </Link>
        <Link href="/news" className={getLinkClasses('/news')}>
          NEWS
          <div className={getUnderlineClasses('/news')}></div>
        </Link>
        <Link href="/team" className={getLinkClasses('/team')}>
          OUR TEAM
          <div className={getUnderlineClasses('/team')}></div>
        </Link>
        <Link href="/about-us" className={getLinkClasses('/about-us')}>
          ABOUT US
          <div className={getUnderlineClasses('/about-us')}></div>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMobileMenu}
          ></div>
          
          {/* Menu Panel */}
          <div className="absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/20">
            <div className="px-4 py-6 space-y-2">
              <Link href="/" className={getMobileLinkClasses('/')} onClick={closeMobileMenu}>
                HOME
              </Link>
              <Link href="/wpoty" className={getMobileLinkClasses('/wpoty')} onClick={closeMobileMenu}>
                WPOTY
              </Link>
              <Link href="/projects" className={getMobileLinkClasses('/projects')} onClick={closeMobileMenu}>
                PROJECTS
              </Link>
              <Link href="/news" className={getMobileLinkClasses('/news')} onClick={closeMobileMenu}>
                NEWS
              </Link>
              <Link href="/team" className={getMobileLinkClasses('/team')} onClick={closeMobileMenu}>
                OUR TEAM
              </Link>
              <Link href="/about-us" className={getMobileLinkClasses('/about-us')} onClick={closeMobileMenu}>
                ABOUT US
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}