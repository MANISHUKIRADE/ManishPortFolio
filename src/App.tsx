import { lazy, Suspense, useState } from 'react'
import HeroSection from './components/HeroSection'
import CapabilitiesSection from './components/CapabilitiesSection'
import ProjectsSection from './components/ProjectsSection'
import ContactSection from './components/ContactSection'
import ChatbotWidget from './components/ChatbotWidget'
import Navbar from './components/Navbar'
import InteractiveBackground from './components/InteractiveBackground'
import SEO from './components/SEO'

const SkillsSection = lazy(() => import('./components/SkillsSection'))
const CareerJourneySection = lazy(() => import('./components/CareerJourneySection'))
const BlogSection = lazy(() => import('./components/BlogSection'))

const SectionFallback = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
  </div>
)

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
          <Suspense fallback={<SectionFallback />}>
            <SkillsSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <CareerJourneySection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <BlogSection />
          </Suspense>
          <ContactSection />
        </main>
        <ChatbotWidget isOpen={isChatbotOpen} onToggle={() => setIsChatbotOpen(!isChatbotOpen)} />
      </div>
    </>
  )
}

export default App
