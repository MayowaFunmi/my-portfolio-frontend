import React from 'react'
import Header from './components/Header'
import MyResume from './components/MyResume'
import NavBar from './components/NavBar'
import Projects from './components/Projects'
import Skills from './components/Skills'

function App() {
  return (
    <div>
      <Header />
      <MyResume />
      <Skills />
      <br />
      <Projects />
    </div>
  )
}

export default App
