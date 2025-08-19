import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { EventsProvider } from './components/events-context'
import { WPOYProvider } from './components/wpoty-context'
import HomePage from './app/page'
import AboutUsPage from './app/about-us/page'
import TeamPage from './app/team/page'
import TeamMemberProfile from './app/team/[id]/page'
import NewsPage from './app/news/page'
import NewsDetailWrapper from './components/NewsDetailWrapper'
import WpotyPage from './app/wpoty/page'
import EventsPage from './app/events/page'
import ProjectsPage from './app/projects/page'
import ProjectDetailPage from './app/projects/[id]/page'

function App() {
  return (
    <WPOYProvider>
      <EventsProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/team/:id" element={<TeamMemberProfile />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:id" element={<NewsDetailWrapper />} />
            <Route path="/wpoty" element={<WpotyPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
          </Routes>
        </Router>
      </EventsProvider>
    </WPOYProvider>
  )
}

export default App 