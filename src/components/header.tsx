"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const pathname = usePathname()

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
    </nav>
  )
}