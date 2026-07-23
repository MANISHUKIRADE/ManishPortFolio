import { motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import { useState, lazy, Suspense } from 'react'
import TechGrid from './ui/TechGrid'
import TypewriterText from './ui/TypewriterText'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { RESUME_FILENAME, RESUME_PATH } from '../config/site'

const InteractiveTerminal = lazy(() => import('./InteractiveTerminal'))

const specialties = [
  'RAG Systems',
  'Multi-Agent Orchestration',
  'Production MLOps',
  'Enterprise SSO',
]

const HeroSection = () => {
  const reducedMotion = usePrefersReducedMotion()
  const [headlineDone, setHeadlineDone] = useState(reducedMotion)

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      <div className="absolute inset-0 z-0 bg-bg">
        <TechGrid />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/70 to-bg pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,color-mix(in_srgb,var(--accent)_8%,transparent),transparent_60%)] pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted mb-6">
              Senior ML &amp; AI Engineer · 6.7 YOE · SOC 2 Type II
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
              <span className="block text-muted text-lg sm:text-xl md:text-2xl font-normal mb-3 tracking-wide">
                Manish Ukirade
              </span>
              <span className="block text-text">Building Production AI Systems</span>
            </h1>

            <p className="text-base sm:text-lg text-muted max-w-xl mx-auto lg:mx-0 mb-4 leading-relaxed font-light min-h-[2rem]">
              Specializing in{' '}
              <span className="text-accent font-mono">
                <TypewriterText
                  strings={specialties}
                  speed={40}
                  pauseBetween={2200}
                  loop
                  onComplete={() => setHeadlineDone(true)}
                />
              </span>
            </p>

            <p className="text-sm sm:text-base text-muted/90 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              RAG pipelines, multi-agent architectures, and enterprise cloud infrastructure across
              Azure, GCP, and AWS.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center lg:justify-start items-center mb-6">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-accent text-bg font-semibold text-sm hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent w-full sm:w-auto justify-center transition-colors duration-150"
              >
                View Work
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={RESUME_PATH}
                download={RESUME_FILENAME}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-surface border border-border text-text font-semibold text-sm hover:border-accent hover:text-accent transition-colors duration-150 w-full sm:w-auto justify-center"
              >
                <Download className="w-4 h-4" />
                Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-lg border border-border text-muted font-semibold text-sm hover:border-accent hover:text-accent transition-colors duration-150 w-full sm:w-auto justify-center"
              >
                Contact
              </a>
            </div>

            {headlineDone && (
              <p className="font-mono text-[10px] text-muted tracking-widest uppercase opacity-70">
                ⌘K navigate · or type in the terminal →
              </p>
            )}
          </motion.div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut', delay: reducedMotion ? 0 : 0.05 }}
          >
            <Suspense
              fallback={
                <div className="h-72 rounded-lg border border-border bg-surface/50 animate-pulse" />
              }
            >
              <InteractiveTerminal />
            </Suspense>
            <p className="mt-2 font-mono text-[10px] text-muted text-center lg:text-left">
              Interactive shell · Tab autocomplete · ↑ history
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
