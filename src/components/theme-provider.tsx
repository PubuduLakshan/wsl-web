"use client"

import React, { createContext, useContext, ReactNode } from 'react'
import { theme, getThemeColor, getThemeSpacing, getThemeBorderRadius } from '../lib/theme'

interface ThemeContextType {
  theme: typeof theme
  getColor: (color: string, shade?: number) => string
  getSpacing: (size: string) => string
  getBorderRadius: (size: string) => string
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const getColor = (color: string, shade: number = 500) => {
    return getThemeColor(color, shade)
  }

  const getSpacing = (size: string) => {
    return getThemeSpacing(size)
  }

  const getBorderRadius = (size: string) => {
    return getThemeBorderRadius(size)
  }

  const value = {
    theme,
    getColor,
    getSpacing,
    getBorderRadius,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Theme-aware component examples
export function ThemedButton({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}: {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  [key: string]: any
}) {
  const { getColor, getSpacing, getBorderRadius } = useTheme()
  
  const baseClasses = 'font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variantClasses = {
    primary: `bg-primary text-white hover:bg-primary-dark`,
    secondary: `bg-secondary text-white hover:bg-secondary-dark`,
    accent: `bg-accent-500 text-white hover:bg-accent-600`,
  }
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
  
  return (
    <button 
      className={classes}
      style={{
        borderRadius: getBorderRadius('md'),
        boxShadow: theme.shadows.md,
      }}
      {...props}
    >
      {children}
    </button>
  )
}

export function ThemedCard({ 
  children, 
  variant = 'default',
  className = '',
  ...props 
}: {
  children: ReactNode
  variant?: 'default' | 'primary' | 'secondary'
  className?: string
  [key: string]: any
}) {
  const { getColor, getBorderRadius } = useTheme()
  
  const baseClasses = 'rounded-lg shadow-lg transition-all duration-300'
  
  const variantClasses = {
    default: 'bg-white text-gray-900',
    primary: 'bg-primary-light text-primary-900',
    secondary: 'bg-secondary-light text-secondary-900',
  }
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`
  
  return (
    <div 
      className={classes}
      style={{
        borderRadius: getBorderRadius('lg'),
        boxShadow: theme.shadows.lg,
      }}
      {...props}
    >
      {children}
    </div>
  )
}