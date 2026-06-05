import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Building2, Calendar, TrendingUp, Award, Zap, ArrowRight, MapPin, X } from 'lucide-react'
import EnergyConnection from './animations/EnergyConnection'
import SectionHeader from './ui/SectionHeader'
import SectionShell from './ui/SectionShell'
import HudCard from './ui/HudCard'

interface CareerNode {
  company: string
  role: string
  period: string
  location: string
  position: [number, number, number]
  achievements: string[]
  color: string
  gradient: string
}

const careerData: CareerNode[] = [
  {
    company: 'W.E. Matter',
    role: 'Tech Lead + Engineering Lead',
    period: 'Apr 2023 – Present',
    location: 'Mumbai',
    position: [-4, 2.5, 0],
    achievements: [
      'Drove 2X revenue growth year-over-year',
      'Built KYARA — production RAG & Generative AI HR platform',
      'Led SOC 2 Type II certification',
      'Migrated AWS to Azure in 15 days',
    ],
    color: '#3b82f6',
    gradient: 'from-blue-600 via-blue-500 to-cyan-500',
  },
  {
    company: 'Bizpilot.in',
    role: 'Software Engineer',
    period: 'Feb 2022 – Mar 2023',
    location: 'Delhi',
    position: [-1.3, 0.8, 0],
    achievements: [
      'Redesigned V2 platform from scratch',
      'Built robust CI/CD pipeline',
      'Financial automation engine (200% efficiency)',
      'Managed DevOps infrastructure',
    ],
    color: '#8b5cf6',
    gradient: 'from-purple-600 via-purple-500 to-pink-500',
  },
  {
    company: 'Raykor Technologies',
    role: 'Software Engineer',
    period: 'Sep 2021 – Feb 2022',
    location: 'Remote',
    position: [1.3, -0.8, 0],
    achievements: [
      'Azure to GCP migration (zero downtime)',
      'REST APIs with Hapi.js',
      'Firebase authentication integration',
      'Automated deployment pipelines',
    ],
    color: '#ec4899',
    gradient: 'from-pink-600 via-pink-500 to-rose-500',
  },
  {
    company: 'Nexsales Corporation',
    role: 'Software Engineer',
    period: 'Aug 2019 – Aug 2021',
    location: 'Remote',
    position: [4, -2.5, 0],
    achievements: [
      'Vue.js microservices dialer app',
      'ML pipeline (Python/TensorFlow)',
      'GCP pub/sub systems',
      'Legacy system modernization',
    ],
    color: '#f59e0b',
    gradient: 'from-amber-600 via-amber-500 to-orange-500',
  },
]

const CareerJourneySection = () => {
  const [selectedNode, setSelectedNode] = useState<number | null>(null)
  const expandedViewRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  // Auto-scroll to expanded view on mobile when opened
  useEffect(() => {
    if (selectedNode !== null && expandedViewRef.current && window.innerWidth < 768) {
      // Small delay to ensure animation has started
      setTimeout(() => {
        expandedViewRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        })
      }, 100)
    }
  }, [selectedNode])

  return (
    <SectionShell id="career" ref={sectionRef} contentClassName="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Professional Journey"
          title="Career Timeline"
          description="6.7+ years of innovation, leadership, and technical excellence"
          sysId="SYS.CAREER"
          typeTitle
          className="mb-10"
        />

        {/* Expanded Experience View */}
        <AnimatePresence mode="wait">
          {selectedNode !== null && (
            <motion.div
              ref={expandedViewRef}
              key={selectedNode}
              initial={{ opacity: 0, y: -50, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -50, height: 0 }}
              transition={{ duration: 0.5 }}
              className="relative mb-8 p-6 rounded-xl border border-cyan-400/40 bg-slate-900/80 backdrop-blur-md shadow-[0_0_30px_rgba(34,211,238,0.12)] overflow-hidden scroll-mt-20"
            >
              <button
                onClick={() => setSelectedNode(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
              >
                <X size={24} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column: Company Info */}
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400/70 mb-1">
                    // Active Role
                  </p>
                  <h3 className="text-3xl font-bold mb-2 text-cyan-300">
                    {careerData[selectedNode].company}
                  </h3>
                  <p className="text-lg text-slate-300 mb-3">{careerData[selectedNode].role}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{careerData[selectedNode].period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{careerData[selectedNode].location}</span>
                    </div>
                  </div>
                  <p className="text-slate-400 text-base leading-relaxed">
                    Manish's tenure at {careerData[selectedNode].company} involved leading key initiatives and driving significant impact in areas such as AI/ML, cloud architecture, and product development.
                  </p>
                </div>

                {/* Right Column: Achievements */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-5 h-5 text-blue-400" />
                    <span className="text-base font-semibold text-slate-300 uppercase tracking-wide">
                      Key Achievements
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {careerData[selectedNode].achievements.map((achievement, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-3 text-sm text-slate-200 leading-relaxed"
                      >
                        <TrendingUp className="w-4 h-4 mt-1 flex-shrink-0 text-blue-400" />
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Timeline Energy Beam */}
        <div className="relative h-[2px] mb-8 mx-auto max-w-5xl">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
            style={{
              boxShadow: '0 0 20px rgba(96, 165, 250, 0.5)',
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
          {/* Energy pulse */}
          <motion.div
            className="absolute top-1/2 left-0 w-4 h-4 bg-blue-400 rounded-full"
            style={{
              boxShadow: '0 0 20px #60a5fa',
              transform: 'translateY(-50%)',
            }}
            animate={{
              x: ['0%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>

        {/* Elegant Career Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr relative">
          {/* Energy connections between cards */}
          {careerData.map((node, index) => {
            if (index === careerData.length - 1) return null
            return (
              <EnergyConnection
                key={`connection-${index}`}
                from={{ x: (index % 4) * 25 + 12.5, y: 50 }}
                to={{ x: ((index + 1) % 4) * 25 + 12.5, y: 50 }}
                color={node.color}
                className="hidden lg:block"
              />
            )
          })}
          {careerData.map((node, index) => {
            const isSelected = selectedNode === index
            return (
              <motion.div
                key={node.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  const newSelectedNode = isSelected ? null : index
                  setSelectedNode(newSelectedNode)
                  
                  // On mobile only, scroll to top of section when opening
                  if (newSelectedNode !== null && window.innerWidth < 768 && sectionRef.current) {
                    setTimeout(() => {
                      sectionRef.current?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      })
                    }, 50)
                  }
                }}
                animate={{
                  scale: isSelected ? 1.08 : 1,
                  y: isSelected ? -8 : 0,
                  rotateY: isSelected ? 0 : 0,
                }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={`group relative cursor-pointer h-full ${
                  isSelected ? 'z-10' : ''
                }`}
              >
                <HudCard selected={isSelected} className="h-full min-h-[320px] overflow-hidden">
                  <div className="relative z-10 p-4 h-full flex flex-col">
                    {/* Header */}
                    <div className="mb-3">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className={`text-xl font-bold mb-1 transition-colors duration-300 ${
                            isSelected ? 'text-cyan-300' : 'text-white group-hover:text-cyan-200'
                          }`}>
                            {node.company}
                          </h3>
                          <p className="text-slate-400 text-sm mb-2">{node.role}</p>
                        </div>
                        <motion.div
                          animate={{ 
                            rotate: isSelected ? [0, 10, -10, 0] : 0,
                            scale: isSelected ? [1, 1.2, 1] : 1,
                          }}
                          transition={{ 
                            duration: 0.6,
                            repeat: isSelected ? Infinity : 0,
                            repeatDelay: 1,
                          }}
                        >
                          <Building2 className={`w-6 h-6 transition-colors duration-300 ${
                            isSelected ? 'text-cyan-400' : 'text-slate-600 group-hover:text-cyan-400'
                          }`} />
                        </motion.div>
                      </div>
                      
                      {/* Period & Location */}
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{node.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{node.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Achievements */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className={`w-4 h-4 transition-colors duration-300 ${
                          isSelected ? 'text-cyan-400' : 'text-slate-600'
                        }`} />
                        <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                          // Key Achievements
                        </span>
                      </div>
                      <ul className="space-y-1.5">
                        {node.achievements.map((achievement, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ 
                              opacity: isSelected ? 1 : 0.8,
                              x: isSelected ? 0 : -10,
                            }}
                            transition={{ 
                              delay: isSelected ? idx * 0.1 : 0,
                              type: "spring",
                              stiffness: 200,
                            }}
                            className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed"
                          >
                            <motion.div
                              animate={{
                                rotate: isSelected ? [0, 15, -15, 0] : 0,
                                scale: isSelected ? [1, 1.2, 1] : 1,
                              }}
                              transition={{
                                duration: 0.5,
                                delay: idx * 0.1,
                                repeat: isSelected ? Infinity : 0,
                                repeatDelay: 2,
                              }}
                            >
                              <TrendingUp className={`w-3 h-3 mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                                isSelected ? 'text-cyan-400' : 'text-slate-600'
                              }`} />
                            </motion.div>
                            <motion.span
                              animate={{
                                color: isSelected ? '#ffffff' : '#cbd5e1',
                              }}
                            >
                              {achievement}
                            </motion.span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Bottom Accent */}
                    <div className={`mt-3 pt-3 border-t transition-colors duration-300 ${
                      isSelected ? 'border-cyan-400/30' : 'border-slate-800 group-hover:border-slate-700'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-mono ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`}>
                          Select to explore
                        </span>
                        <ArrowRight className={`w-4 h-4 transition-colors duration-300 ${
                          isSelected ? 'text-cyan-400' : 'text-slate-600 group-hover:text-cyan-400'
                        }`} />
                      </div>
                    </div>
                  </div>
                </HudCard>
              </motion.div>
            )
          })}
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <div className="inline-flex items-center gap-2 bg-slate-900/60 backdrop-blur-sm rounded-md px-6 py-3 border border-cyan-500/20">
            <Zap className="w-4 h-4 text-cyan-400" />
            <p className="text-slate-400 text-sm font-mono">
              Click cards to explore career milestones
            </p>
          </div>
        </motion.div>
    </SectionShell>
  )
}

export default CareerJourneySection
