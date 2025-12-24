import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import EarthGlobe from './3D/EarthGlobe'
import { useState } from 'react'
import { 
  Code2, 
  Cloud, 
  Brain, 
  Database, 
  Zap,
  TrendingUp,
  CheckCircle2
} from 'lucide-react'
import NeuralNetwork from './animations/NeuralNetwork'
import DataStream from './animations/DataStream'
import ScanningLine from './animations/ScanningLine'
import HolographicGlitch from './animations/HolographicGlitch'
import ParticleSystem from './animations/ParticleSystem'

interface Skill {
  name: string
  level: number
  color: string
  icon?: string
}

interface SkillCategory {
  title: string
  icon: React.ReactNode
  skills: Skill[]
  gradient: string
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    icon: <Code2 className="w-6 h-6" />,
    gradient: 'from-blue-600 to-cyan-500',
    skills: [
      { name: 'Node.js', level: 92, color: '#339933' },
      { name: 'Python', level: 88, color: '#3776ab' },
      { name: 'TypeScript', level: 90, color: '#3178c6' },
      { name: 'JavaScript', level: 90, color: '#f7df1e' },
    ],
  },
  {
    title: 'Frontend & Frameworks',
    icon: <Zap className="w-6 h-6" />,
    gradient: 'from-purple-600 to-pink-500',
    skills: [
      { name: 'React.js', level: 90, color: '#61dafb' },
      { name: 'Vue.js', level: 85, color: '#4fc08d' },
      { name: 'AngularJS', level: 80, color: '#dd0031' },
    ],
  },
  {
    title: 'Cloud Platforms',
    icon: <Cloud className="w-6 h-6" />,
    gradient: 'from-orange-600 to-amber-500',
    skills: [
      { name: 'AWS', level: 85, color: '#ff9900' },
      { name: 'Azure', level: 88, color: '#0078d4' },
      { name: 'GCP', level: 85, color: '#4285f4' },
    ],
  },
  {
    title: 'AI/ML & NLP',
    icon: <Brain className="w-6 h-6" />,
    gradient: 'from-pink-600 to-rose-500',
    skills: [
      { name: 'AI/ML', level: 85, color: '#ff6b6b' },
      { name: 'NLP/LLM', level: 88, color: '#9b59b6' },
      { name: 'TensorFlow', level: 82, color: '#ff6f00' },
      { name: 'RASA', level: 80, color: '#5a17ee' },
    ],
  },
  {
    title: 'DevOps & Containers',
    icon: <TrendingUp className="w-6 h-6" />,
    gradient: 'from-cyan-600 to-blue-500',
    skills: [
      { name: 'Docker', level: 90, color: '#2496ed' },
      { name: 'Kubernetes', level: 80, color: '#326ce5' },
      { name: 'CI/CD', level: 88, color: '#2088ff' },
      { name: 'Jenkins', level: 85, color: '#d24939' },
    ],
  },
  {
    title: 'Databases',
    icon: <Database className="w-6 h-6" />,
    gradient: 'from-emerald-600 to-teal-500',
    skills: [
      { name: 'PostgreSQL', level: 88, color: '#336791' },
      { name: 'MySQL', level: 85, color: '#4479a1' },
      { name: 'Redis', level: 82, color: '#dc382d' },
      { name: 'Firebase', level: 80, color: '#ffca28' },
    ],
  },
]

const SkillsSection = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

  return (
    <section id="skills" className="relative py-12 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      
      {/* Neural Network Visualization */}
      <div className="absolute inset-0 opacity-30">
        <NeuralNetwork nodeCount={25} connectionDistance={200} color="#8b5cf6" />
      </div>

      {/* Particle System */}
      <ParticleSystem count={30} speed={0.3} size={{ min: 1, max: 2 }} colors={['#8b5cf6', '#ec4899', '#60a5fa']} />
      
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
            className="inline-block text-purple-400 text-sm font-semibold uppercase tracking-wider mb-4"
          >
            Technical Expertise
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Fullstack web development and AI/ML expertise - Building end-to-end web applications and intelligent solutions
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              onClick={() => setSelectedCategory(selectedCategory === categoryIndex ? null : categoryIndex)}
              className={`group relative cursor-pointer transition-all duration-500 ${
                selectedCategory === categoryIndex ? 'scale-105 z-10' : 'hover:scale-[1.02]'
              }`}
            >
              {/* Category Card */}
              <div className={`relative h-full rounded-2xl overflow-hidden border-2 transition-all duration-500 ${
                selectedCategory === categoryIndex
                  ? 'border-purple-400 shadow-2xl shadow-purple-500/20'
                  : 'border-slate-800 hover:border-slate-700'
              }`}>
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500 ${
                  selectedCategory === categoryIndex ? 'opacity-20' : ''
                }`} />
                
                {/* Content */}
                <div className="relative z-10 p-4 bg-slate-900/80 backdrop-blur-md h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`p-2 rounded-xl bg-gradient-to-br ${category.gradient} opacity-20`}>
                      <div className="text-purple-400">
                        {category.icon}
                      </div>
                    </div>
                    {selectedCategory === categoryIndex ? (
                      <HolographicGlitch intensity={0.05} frequency={3}>
                        <h3 className="text-base font-bold text-purple-400">
                          {category.title}
                        </h3>
                      </HolographicGlitch>
                    ) : (
                      <h3 className={`text-base font-bold transition-colors duration-300 ${
                        'text-white group-hover:text-purple-300'
                      }`}>
                        {category.title}
                      </h3>
                    )}
                  </div>
                  
                  {/* Skills List */}
                  <div className="space-y-2 flex-1">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className="space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-medium transition-colors duration-300 ${
                            hoveredSkill === skill.name ? 'text-white' : 'text-slate-300'
                          }`}>
                            {skill.name}
                          </span>
                          <span className="text-xs text-slate-500">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden relative">
                          {/* Data Stream Background */}
                          {hoveredSkill === skill.name && (
                            <div className="absolute inset-0 pointer-events-none">
                              <DataStream direction="right" speed={1.5} count={5} color={skill.color} />
                            </div>
                          )}
                          
                          {/* Scanning Line */}
                          {hoveredSkill === skill.name && (
                            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                              <ScanningLine direction="horizontal" speed={2} color={skill.color} />
                            </div>
                          )}
                          
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: (categoryIndex * 0.1) + (skillIndex * 0.1) }}
                            className="h-full rounded-full relative overflow-hidden"
                            style={{
                              background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)`,
                            }}
                            animate={{
                              boxShadow: hoveredSkill === skill.name
                                ? `0 0 15px ${skill.color}80, 0 0 30px ${skill.color}40`
                                : 'none',
                            }}
                          >
                            {/* Holographic scan effect */}
                            {hoveredSkill === skill.name && (
                              <motion.div
                                className="absolute inset-0"
                                style={{
                                  background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)`,
                                }}
                                animate={{
                                  x: ['-100%', '200%'],
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: 'linear',
                                }}
                              />
                            )}
                            
                            {/* Shimmer effect */}
                            <motion.div
                              className="absolute inset-0 bg-white"
                              initial={{ opacity: 0 }}
                              animate={{
                                opacity: hoveredSkill === skill.name ? [0, 0.6, 0] : 0,
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: hoveredSkill === skill.name ? Infinity : 0,
                              }}
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Footer */}
                  <div className={`mt-3 pt-3 border-t transition-colors duration-300 ${
                    selectedCategory === categoryIndex ? 'border-purple-400/30' : 'border-slate-800 group-hover:border-slate-700'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        {category.skills.length} skills
                      </span>
                      <CheckCircle2 className={`w-4 h-4 transition-colors duration-300 ${
                        selectedCategory === categoryIndex ? 'text-purple-400' : 'text-slate-600 group-hover:text-purple-400'
                      }`} />
                    </div>
                  </div>
                </div>
                
                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                    selectedCategory === categoryIndex ? 'opacity-100' : ''
                  }`}
                  style={{
                    background: `radial-gradient(circle at center, rgba(139, 92, 246, 0.2), transparent 70%)`,
                    filter: 'blur(20px)',
                  } as React.CSSProperties}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3D Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[350px] md:h-[400px] rounded-2xl border border-slate-800/50 bg-gradient-to-b from-slate-900/50 to-slate-950/50 backdrop-blur-sm overflow-hidden mb-8"
        >
          {/* Scanning overlay */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <ScanningLine direction="horizontal" speed={3} />
          </div>
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <ScanningLine direction="vertical" speed={4} />
          </div>
          
          {/* Particle nodes around globe */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 360) / 12
            const radius = 180
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-purple-400 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transformOrigin: 'center',
                }}
                animate={{
                  x: [0, Math.cos(angle * Math.PI / 180) * radius, 0],
                  y: [0, Math.sin(angle * Math.PI / 180) * radius, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            )
          })}
          
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
            <pointLight position={[-10, 10, 10]} intensity={1} color="#93c5fd" />
            <pointLight position={[0, -10, 5]} intensity={0.8} color="#60a5fa" />
            <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
            <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#8b5cf6" />
            <EarthGlobe />
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
          </Canvas>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Total Skills', value: skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0) },
            { label: 'Categories', value: skillCategories.length },
            { label: 'Years Experience', value: '6+' },
            { label: 'Expertise Level', value: '85%+' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50"
            >
              <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default SkillsSection
