import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { EventsProvider } from './components/events-context'
import HomePage from './app/page'
import AboutUsPage from './app/about-us/page'
import TeamPage from './app/team/page'
import TeamMemberProfile from './app/team/[id]/page'
import NewsPage from './app/news/page'
import NewsDetailWrapper from './components/NewsDetailWrapper'
import WpotyPage from './app/wpoty/page'
import ProjectsPage from './app/projects/page'

function App() {
  return (
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
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </Router>
    </EventsProvider>
  )
}

export default App 