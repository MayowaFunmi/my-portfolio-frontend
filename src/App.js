import React from 'react'
import Header from './components/Header'
import MyResume from './components/MyResume'
import Particle from './components/Particle'
import Projects from './components/Projects'
import Skills from './components/Skills'

function App() {
  return (
    <div>
      {/**/}
      <Particle />
      <Header />
      <MyResume />
      <Skills />
      <br />
      <Projects />
    </div>
  )
}

export default App
