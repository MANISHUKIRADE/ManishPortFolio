import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Group, Mesh } from 'three'
import { Building2, Calendar, TrendingUp, Award, Zap, ArrowRight, MapPin, X } from 'lucide-react'

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

function CareerNode3D({ node, index, isHovered, isSelected, onHover, onClick }: { 
  node: CareerNode
  index: number
  isHovered: boolean
  isSelected: boolean
  onHover: (hovered: boolean) => void
  onClick: () => void
}) {
  const meshRef = useRef<Mesh>(null)
  const groupRef = useRef<Group>(null)
  const ringRef = useRef<Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003
      meshRef.current.position.y = node.position[1] + Math.sin(state.clock.elapsedTime * 0.4 + index) * 0.1
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.01
    }
    if (groupRef.current) {
      const scale = (isHovered || isSelected) ? 1.15 : 1
      groupRef.current.scale.lerp({ x: scale, y: scale, z: scale } as any, 0.1)
    }
  })

  return (
    <group ref={groupRef} position={node.position}>
      {/* Outer Glow Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.1, 0.04, 16, 100]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={(isHovered || isSelected) ? 0.6 : 0.2}
          transparent
          opacity={0.5}
        />
      </mesh>
      
      {/* Main Company Sphere */}
      <mesh
        ref={meshRef}
        onPointerEnter={() => onHover(true)}
        onPointerLeave={() => onHover(false)}
        onClick={onClick}
      >
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={(isHovered || isSelected) ? 0.5 : 0.25}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Company Name */}
      <Text
        position={[0, 1.4, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.5}
        textAlign="center"
        font="/fonts/inter-bold.woff"
      >
        {node.company}
      </Text>
      
      {/* Role */}
      <Text
        position={[0, 1.05, 0]}
        fontSize={0.2}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
      >
        {node.role}
      </Text>
    </group>
  )
}

function TimelineConnections({ nodes }: { nodes: CareerNode[] }) {
  return (
    <>
      {nodes.slice(0, -1).map((node, index) => {
        const nextNode = nodes[index + 1]
        return (
          <line key={`connection-${index}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([
                  ...node.position,
                  ...nextNode.position,
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial 
              color="#475569" 
              opacity={0.2}
              transparent
            />
          </line>
        )
      })}
    </>
  )
}

const CareerJourneySection = () => {
  const [selectedNode, setSelectedNode] = useState<number | null>(null)
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)

  return (
    <section id="career" className="relative py-12 px-4 overflow-hidden">
      {/* Elegant Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      
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
              key={selectedNode}
              initial={{ opacity: 0, y: -50, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -50, height: 0 }}
              transition={{ duration: 0.5 }}
              className={`relative mb-8 p-6 rounded-2xl border-2 ${careerData[selectedNode].gradient} bg-slate-900/80 backdrop-blur-md shadow-2xl shadow-blue-500/20 overflow-hidden`}
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
                  <h3 className={`text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${careerData[selectedNode].gradient}`}>
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

        {/* 3D Timeline Visualization */}
   

        {/* Elegant Career Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
          {careerData.map((node, index) => {
            const isSelected = selectedNode === index
            return (
              <motion.div
                key={node.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  setSelectedNode(isSelected ? null : index)
                  setHoveredNode(index)
                }}
                onMouseEnter={() => setHoveredNode(index)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`group relative cursor-pointer transition-all duration-500 h-full ${
                  isSelected ? 'scale-105 z-10' : 'hover:scale-[1.02]'
                }`}
              >
                {/* Card Container */}
                <div className={`relative h-full min-h-[320px] rounded-2xl overflow-hidden border-2 transition-all duration-500 ${
                  isSelected 
                    ? 'border-blue-400 shadow-2xl shadow-blue-500/20' 
                    : 'border-slate-800 hover:border-slate-700'
                }`}>
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${node.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500 ${
                    isSelected ? 'opacity-20' : ''
                  }`} />
                  
                  {/* Content Overlay */}
                  <div className="relative z-10 p-4 bg-slate-900/80 backdrop-blur-md h-full flex flex-col">
                    {/* Header */}
                    <div className="mb-3">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className={`text-xl font-bold mb-1 transition-colors duration-300 ${
                            isSelected ? 'text-blue-400' : 'text-white group-hover:text-blue-300'
                          }`}>
                            {node.company}
                          </h3>
                          <p className="text-slate-400 text-sm mb-2">{node.role}</p>
                        </div>
                        <motion.div
                          animate={{ rotate: isSelected ? 90 : 0 }}
                          transition={{ duration: 0.3 }}
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
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: isSelected ? idx * 0.05 : 0 }}
                            className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed"
                          >
                            <TrendingUp className={`w-3 h-3 mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                              isSelected ? 'text-blue-400' : 'text-slate-600'
                            }`} />
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Bottom Accent */}
                    <div className={`mt-3 pt-3 border-t transition-colors duration-300 ${
                      isSelected ? 'border-blue-400/30' : 'border-slate-800 group-hover:border-slate-700'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">Click to explore</span>
                        <ArrowRight className={`w-4 h-4 transition-all duration-300 ${
                          isSelected ? 'text-blue-400 translate-x-1' : 'text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1'
                        }`} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Glow Effect */}
                  <div 
                    className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                      isSelected ? 'opacity-100' : ''
                    }`}
                    style={{
                      background: `radial-gradient(circle at center, ${node.color}20, transparent 70%)`,
                      filter: 'blur(20px)',
                    } as React.CSSProperties}
                  />
                </div>
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
