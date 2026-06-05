import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useState } from 'react'
import SpaceScene from './3D/SpaceScene'
import HolographicGrid from './animations/HolographicGrid'
import HudCard from './ui/HudCard'
import TypewriterText from './ui/TypewriterText'
import { useInViewPause } from '../hooks/useInViewPause'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const stats = [
  { value: '6.7+', label: 'Years Experience' },
  { value: '10+', label: 'Enterprise Clients' },
  { value: '3', label: 'Compliance Certifications' },
  { value: '83%', label: 'ML Model Accuracy' },
]

const badgeStrings = [
  'Generative AI · RAG Systems · Cloud & Compliance',
  'LangChain · ChromaDB · Production ML',
  'SOC 2 Type II · Azure · Multi-Cloud',
]

const HeroSection = () => {
  const [sectionRef, sceneActive] = useInViewPause<HTMLElement>()
  const reducedMotion = usePrefersReducedMotion()
  const [headlineDone, setHeadlineDone] = useState(reducedMotion)

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      <div className="absolute inset-0 z-0 bg-black">
        <SpaceScene variant="hero" className="opacity-90" active={sceneActive} />
        <div className="absolute inset-0 bg-gradient-to-b from-nexus-950/40 via-nexus-950/70 to-nexus-950 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,rgba(34,211,238,0.12),transparent_60%)] pointer-events-none" />
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/5 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.12) 0%, transparent 70%)',
          }}
          animate={reducedMotion ? undefined : { x: [0, 40, 0], y: [0, 24, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/5 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(45, 212, 191, 0.08) 0%, transparent 70%)',
          }}
          animate={reducedMotion ? undefined : { x: [0, -30, 0], y: [0, -16, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <HolographicGrid spacing={56} color="#22d3ee" opacity={0.05} className="z-[2]" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-cyan-500/30 bg-slate-900/60 backdrop-blur-md text-cyan-300 text-sm font-medium mb-8 min-h-[2.5rem]"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            <TypewriterText
              strings={badgeStrings}
              speed={35}
              pauseBetween={2800}
              className="font-mono text-xs sm:text-sm tracking-wide text-left"
              showCursor={false}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 px-2 min-h-[4.5rem] sm:min-h-[5rem] md:min-h-[6rem]"
          >
            <span className="block text-slate-300 text-lg sm:text-xl md:text-2xl font-normal mb-3 tracking-wide">
              Manish Ukirade
            </span>
            <span
              className="bg-gradient-to-r from-cyan-300 via-teal-200 to-cyan-400 bg-clip-text text-transparent"
              style={{ filter: 'drop-shadow(0 0 40px rgba(34, 211, 238, 0.35))' }}
            >
              <TypewriterText
                text="Building Production AI Systems"
                speed={40}
                delay={400}
                onComplete={() => setHeadlineDone(true)}
                as="span"
                className="bg-gradient-to-r from-cyan-300 via-teal-200 to-cyan-400 bg-clip-text text-transparent"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light drop-shadow-lg px-4"
          >
            Senior ML &amp; AI Engineer with 6.7 years shipping Generative AI platforms, RAG pipelines, and
            enterprise cloud infrastructure. SOC 2 Type II. CyberCube certified. Multi-cloud — Azure, GCP, AWS.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-semibold text-sm sm:text-base shadow-lg shadow-cyan-900/50 border border-cyan-400/40 backdrop-blur-sm"
            >
              View Work
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-slate-900/70 backdrop-blur-md border border-slate-600/80 text-slate-200 font-semibold text-sm sm:text-base hover:border-cyan-500/50 hover:text-white transition-colors"
            >
              Get in Touch
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={headlineDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={headlineDone ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 }}
              >
                <HudCard className="px-4 py-5 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300 font-mono">
                    {headlineDone ? (
                      <TypewriterText text={stat.value} speed={60} delay={i * 120} showCursor={false} />
                    ) : (
                      <span className="opacity-0">{stat.value}</span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-mono">
                    {stat.label}
                  </div>
                </HudCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={reducedMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-9 border border-cyan-500/40 rounded-full flex justify-center p-1 backdrop-blur-sm"
        >
          <motion.div
            animate={reducedMotion ? undefined : { y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-cyan-400 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
