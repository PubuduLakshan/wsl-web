import React from 'react'
import { Router, Route } from 'wouter'
import HomePage from './app/page'
import AboutUsPage from './app/about-us/page'
import TeamPage from './app/team/page'
import NewsPage from './app/news/page'
import NewsDetailWrapper from './components/NewsDetailWrapper'
import WpotyPage from './app/wpoty/page'
import ProjectsPage from './app/projects/page'

function App() {
  return (
    <Router>
      <Route path="/" component={HomePage} />
      <Route path="/about-us" component={AboutUsPage} />
      <Route path="/team" component={TeamPage} />
      <Route path="/news" component={NewsPage} />
      <Route path="/news/:id" component={NewsDetailWrapper} />
      <Route path="/wpoty" component={WpotyPage} />
      <Route path="/projects" component={ProjectsPage} />
    </Router>
  )
}

export default App 