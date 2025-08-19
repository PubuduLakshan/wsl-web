import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Event {
  id: number
  title: string
  description: string
  image: string
  dates: string[]
  location: string
  category: string
  spots?: number
  price?: string
  participants?: number
  winners?: number
  reach?: number
  schools?: number
  duration?: string
  animals?: number
  publications?: number
  traps?: number
  species?: number
  students?: number
  equipment?: number
  recipients?: number
  flights?: number
  coverage?: string
  villages?: number
}

interface EventsContextType {
  hasEventsToday: boolean
  setHasEventsToday: (value: boolean) => void
  checkEventsToday: () => void
}

const EventsContext = createContext<EventsContextType | undefined>(undefined)

export function EventsProvider({ children }: { children: ReactNode }) {
  const [hasEventsToday, setHasEventsToday] = useState(false)

  const isEventToday = (eventDates: string[]) => {
    const today = new Date()
    return eventDates.some(eventDate => {
      const event = new Date(eventDate)
      return today.getFullYear() === event.getFullYear() &&
             today.getMonth() === event.getMonth() &&
             today.getDate() === event.getDate()
    })
  }

  const checkEventsToday = async () => {
    try {
      const response = await fetch('/projects.json')
      if (response.ok) {
        const data = await response.json()
        const hasToday = data.events.some((event: Event) => isEventToday(event.dates))
        setHasEventsToday(hasToday)
      }
    } catch (error) {
      console.error('Error checking events today:', error)
      setHasEventsToday(false)
    }
  }

  useEffect(() => {
    checkEventsToday()
    
    // Check every hour for updates
    const interval = setInterval(checkEventsToday, 60 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <EventsContext.Provider value={{ hasEventsToday, setHasEventsToday, checkEventsToday }}>
      {children}
    </EventsContext.Provider>
  )
}

export function useEvents() {
  const context = useContext(EventsContext)
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventsProvider')
  }
  return context
}
