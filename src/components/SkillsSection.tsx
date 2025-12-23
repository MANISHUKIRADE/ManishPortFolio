import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import AnimatedGlobe from './3D/AnimatedGlobe'
import FloatingGeometry from './3D/FloatingGeometry'
import { useState } from 'react'

const skills = [
  { name: 'Node.js', level: 92, color: '#339933' },
  { name: 'Python', level: 88, color: '#3776ab' },
  { name: 'React.js', level: 90, color: '#61dafb' },
  { name: 'TypeScript', level: 90, color: '#3178c6' },
  { name: 'AWS', level: 85, color: '#ff9900' },
  { name: 'Azure', level: 88, color: '#0078d4' },
  { name: 'GCP', level: 85, color: '#4285f4' },
  { name: 'Docker', level: 90, color: '#2496ed' },
  { name: 'Kubernetes', level: 80, color: '#326ce5' },
  { name: 'PostgreSQL', level: 88, color: '#336791' },
  { name: 'AI/ML', level: 85, color: '#ff6b6b' },
  { name: 'NLP/LLM', level: 88, color: '#9b59b6' },
]

const SkillsSection = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <section id="skills" className="py-20 px-4 bg-gradient-to-b from-slate-900/50 to-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Technologies I work with to build scalable enterprise platforms and AI-powered solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Skills List */}
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredSkill(skill.name)}
                onHoverEnd={() => setHoveredSkill(null)}
                className="cursor-pointer"
              >
                <div className="flex justify-between mb-2">
                  <motion.span 
                    className="text-white font-semibold"
                    animate={{
                      scale: hoveredSkill === skill.name ? 1.1 : 1,
                      color: hoveredSkill === skill.name ? skill.color : '#ffffff',
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {skill.name}
                  </motion.span>
                  <span className="text-slate-400">{skill.level}%</span>
                </div>
                <div className="h-3 bg-slate-800 rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full rounded-full relative"
                    style={{
                      background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)`,
                    }}
                    animate={{
                      boxShadow: hoveredSkill === skill.name 
                        ? `0 0 20px ${skill.color}` 
                        : 'none',
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: hoveredSkill === skill.name ? [0, 0.5, 0] : 0,
                      }}
                      transition={{
                        duration: 1,
                        repeat: hoveredSkill === skill.name ? Infinity : 0,
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 3D Globe with Floating Elements */}
          <div className="h-96 lg:h-[500px] relative">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <pointLight position={[-10, -10, -10]} intensity={0.3} />
              <AnimatedGlobe />
              <FloatingGeometry type="torus" position={[-2, 1, -1]} color="#3b82f6" speed={0.8} />
              <FloatingGeometry type="sphere" position={[2, -1, -1]} color="#8b5cf6" speed={1.2} />
              <FloatingGeometry type="octahedron" position={[0, 2, -2]} color="#ec4899" speed={1.0} />
              <OrbitControls enableZoom={false} />
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
