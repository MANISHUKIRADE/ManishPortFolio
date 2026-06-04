import { useState } from 'react'
import HeroSection from './components/HeroSection'
import CapabilitiesSection from './components/CapabilitiesSection'
import ProjectsSection from './components/ProjectsSection'
import SkillsSection from './components/SkillsSection'
import CareerJourneySection from './components/CareerJourneySection'
import BlogSection from './components/BlogSection'
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
      <div className="min-h-screen bg-nexus-950 relative overflow-x-hidden">
        <InteractiveBackground />
        <Navbar />
        <main>
          <HeroSection />
          <CapabilitiesSection />
          <ProjectsSection />
          <SkillsSection />
          <CareerJourneySection />
          <BlogSection />
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

