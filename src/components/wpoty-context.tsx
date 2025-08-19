import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface WPOYConfig {
  isAnnounced: boolean;
  currentYear: number;
  googleSheetLink: string;
  announcementDate: string;
  submissionDeadline: string;
  resultsDate: string;
}

interface WPOYContextType {
  wpotyConfig: WPOYConfig | null;
  isWPOYAnnounced: boolean;
  isSubmissionClosed: boolean;
  checkWPOYStatus: () => Promise<void>;
}

const WPOYContext = createContext<WPOYContextType | undefined>(undefined)

export function WPOYProvider({ children }: { children: ReactNode }) {
  const [wpotyConfig, setWpotyConfig] = useState<WPOYConfig | null>(null)
  const [isWPOYAnnounced, setIsWPOYAnnounced] = useState(false)
  const [isSubmissionClosed, setIsSubmissionClosed] = useState(false)

  const checkWPOYStatus = async () => {
    try {
      const response = await fetch('/wpoty-config.json')
      if (response.ok) {
        const data = await response.json()
        setWpotyConfig(data)
        setIsWPOYAnnounced(data.isAnnounced)
        
        // Check if submission deadline has passed
        if (data.isAnnounced && data.submissionDeadline) {
          const today = new Date()
          const deadline = new Date(data.submissionDeadline)
          setIsSubmissionClosed(today > deadline)
        } else {
          setIsSubmissionClosed(false)
        }
      }
    } catch (error) {
      console.error('Error loading WPOY config:', error)
      setWpotyConfig(null)
      setIsWPOYAnnounced(false)
      setIsSubmissionClosed(false)
    }
  }

  useEffect(() => {
    checkWPOYStatus()
    
    // Check WPOY status every hour
    const interval = setInterval(checkWPOYStatus, 60 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <WPOYContext.Provider value={{ wpotyConfig, isWPOYAnnounced, isSubmissionClosed, checkWPOYStatus }}>
      {children}
    </WPOYContext.Provider>
  )
}

export function useWPOY() {
  const context = useContext(WPOYContext)
  if (context === undefined) {
    throw new Error('useWPOY must be used within a WPOYProvider')
  }
  return context
}
