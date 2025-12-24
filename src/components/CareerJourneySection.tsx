import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Building2, Calendar, TrendingUp, Award, Zap, ArrowRight, MapPin, X } from 'lucide-react'
import ScanningLine from './animations/ScanningLine'
import HolographicGlitch from './animations/HolographicGlitch'
import ParticleSystem from './animations/ParticleSystem'
import EnergyConnection from './animations/EnergyConnection'

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
      'Built KYARA - AI HR Consultant',
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
    <section id="career" ref={sectionRef} className="relative py-12 px-4 overflow-hidden">
      {/* Elegant Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      
      {/* Particle System */}
      <ParticleSystem count={25} speed={0.3} size={{ min: 1, max: 2 }} colors={['#3b82f6', '#8b5cf6', '#ec4899']} />
      
      {/* Scanning Lines */}
      <ScanningLine direction="horizontal" speed={4} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block text-blue-400 text-sm font-semibold uppercase tracking-wider mb-4"
          >
            Professional Journey
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            Career Timeline
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            6+ years of innovation, leadership, and technical excellence
          </p>
        </motion.div>

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
              className={`relative mb-8 p-6 rounded-2xl border-2 ${careerData[selectedNode].gradient} bg-slate-900/80 backdrop-blur-md shadow-2xl shadow-blue-500/20 overflow-hidden scroll-mt-20`}
            >
              {/* Scanning effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <ScanningLine direction="horizontal" speed={2} />
              </div>
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <ScanningLine direction="vertical" speed={3} />
              </div>
              
              <button
                onClick={() => setSelectedNode(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
              >
                <X size={24} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column: Company Info */}
                <div>
                  <HolographicGlitch intensity={0.05} frequency={3}>
                    <h3 className={`text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${careerData[selectedNode].gradient}`}>
                      {careerData[selectedNode].company}
                    </h3>
                  </HolographicGlitch>
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
                {/* Card Container */}
                <motion.div
                  animate={{
                    borderColor: isSelected ? node.color : undefined,
                    boxShadow: isSelected 
                      ? `0 0 40px ${node.color}40, 0 0 80px ${node.color}20`
                      : undefined,
                  }}
                  transition={{ duration: 0.5 }}
                  className={`relative h-full min-h-[320px] rounded-2xl overflow-hidden border-2 transition-all duration-500 ${
                    isSelected 
                      ? 'border-blue-400 shadow-2xl shadow-blue-500/20' 
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Holographic projection effect */}
                  {isSelected && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <ScanningLine direction="horizontal" speed={2} />
                    </div>
                  )}
                  
                  {/* Gradient Background */}
                  <motion.div
                    animate={{
                      opacity: isSelected ? 0.3 : 0.1,
                      scale: isSelected ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                    className={`absolute inset-0 bg-gradient-to-br ${node.gradient} group-hover:opacity-20 transition-opacity duration-500`}
                  />
                  
                  {/* Space Particles Effect */}
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 overflow-hidden pointer-events-none"
                    >
                      {[...Array(20)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-blue-400 rounded-full"
                          initial={{
                            x: Math.random() * 100 + '%',
                            y: Math.random() * 100 + '%',
                            opacity: 0,
                          }}
                          animate={{
                            y: [null, Math.random() * 100 + '%'],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                  
                  {/* Content Overlay */}
                  <div className="relative z-10 p-4 bg-slate-900/80 backdrop-blur-md h-full flex flex-col">
                    {/* Header */}
                    <div className="mb-3">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          {isSelected ? (
                            <HolographicGlitch intensity={0.05} frequency={3}>
                              <h3 className="text-xl font-bold mb-1 text-blue-400">
                                {node.company}
                              </h3>
                            </HolographicGlitch>
                          ) : (
                            <h3 className="text-xl font-bold mb-1 transition-colors duration-300 text-white group-hover:text-blue-300">
                              {node.company}
                            </h3>
                          )}
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
                            isSelected ? 'text-blue-400' : 'text-slate-600 group-hover:text-blue-400'
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
                          isSelected ? 'text-blue-400' : 'text-slate-600'
                        }`} />
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                          Key Achievements
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
                                isSelected ? 'text-blue-400' : 'text-slate-600'
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
                      isSelected ? 'border-blue-400/30' : 'border-slate-800 group-hover:border-slate-700'
                    }`}>
                      <div className="flex items-center justify-between">
                        <motion.span
                          animate={{
                            color: isSelected ? '#60a5fa' : '#64748b',
                          }}
                          className="text-xs"
                        >
                          Click to explore
                        </motion.span>
                        <motion.div
                          animate={{
                            x: isSelected ? [0, 5, 0] : 0,
                            rotate: isSelected ? [0, 15, 0] : 0,
                          }}
                          transition={{
                            duration: 1,
                            repeat: isSelected ? Infinity : 0,
                            repeatDelay: 0.5,
                          }}
                        >
                          <ArrowRight className={`w-4 h-4 transition-colors duration-300 ${
                            isSelected ? 'text-blue-400' : 'text-slate-600 group-hover:text-blue-400'
                          }`} />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Glow Effect */}
                  <motion.div
                    animate={{
                      opacity: isSelected ? 1 : 0,
                      scale: isSelected ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                      duration: 2,
                      repeat: isSelected ? Infinity : 0,
                    }}
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `radial-gradient(circle at center, ${node.color}40, transparent 70%)`,
                      filter: 'blur(20px)',
                    } as React.CSSProperties}
                  />
                </motion.div>
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
          <div className="inline-flex items-center gap-2 bg-slate-900/50 backdrop-blur-sm rounded-full px-6 py-3 border border-slate-800">
            <Zap className="w-4 h-4 text-blue-400" />
            <p className="text-slate-400 text-sm">
              Click cards to explore • Drag to rotate 3D view • Scroll to zoom
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CareerJourneySection
