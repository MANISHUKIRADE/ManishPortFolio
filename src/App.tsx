import { useState } from 'react'
import HeroSection from './components/HeroSection'
import ProjectsSection from './components/ProjectsSection'
import SkillsSection from './components/SkillsSection'
import ContactSection from './components/ContactSection'
import ChatbotWidget from './components/ChatbotWidget'
import Navbar from './components/Navbar'
import InteractiveBackground from './components/InteractiveBackground'
import SEO from './components/SEO'

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)

  return (
    <>
      <SEO />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-x-hidden">
        <InteractiveBackground />
        <Navbar />
        <main>
          <HeroSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
        </main>
        <ChatbotWidget 
          isOpen={isChatbotOpen} 
          onToggle={() => setIsChatbotOpen(!isChatbotOpen)} 
        />
      </div>
    </>
  )
}

export default App

