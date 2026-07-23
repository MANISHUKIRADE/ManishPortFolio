import { lazy, Suspense, useState, useCallback } from 'react'
import HeroSection from './components/HeroSection'
import CapabilitiesSection from './components/CapabilitiesSection'
import ProjectsSection from './components/ProjectsSection'
import ContactSection from './components/ContactSection'
import ChatbotWidget from './components/ChatbotWidget'
import Navbar from './components/Navbar'
import SiteBackground from './components/SiteBackground'
import CommandPalette from './components/CommandPalette'
import SystemStatusTicker from './components/SystemStatusTicker'
import SEO from './components/SEO'
import { ThemeProvider } from './providers/ThemeProvider'

const SkillsSection = lazy(() => import('./components/SkillsSection'))
const CareerJourneySection = lazy(() => import('./components/CareerJourneySection'))
const BlogSection = lazy(() => import('./components/BlogSection'))

const SectionFallback = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
  </div>
)

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)
  const openCommand = useCallback(() => setCommandOpen(true), [])

  return (
    <ThemeProvider>
      <SEO />
      <a href="#main" className="skip-to-main">
        Skip to main content
      </a>
      <div className="min-h-screen bg-bg relative overflow-x-clip text-text">
        <SiteBackground />
        <Navbar onOpenCommandPalette={openCommand} />
        <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
        <main id="main">
          <HeroSection />
          <SystemStatusTicker />
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
    </ThemeProvider>
  )
}

export default App
