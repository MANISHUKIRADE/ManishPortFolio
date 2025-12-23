import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import Satellite from './3D/Satellite'
import Planet from './3D/Planet'
import Asteroid from './3D/Asteroid'
import StarField from './3D/StarField'
import { useEffect, useRef } from 'react'

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const scrolled = window.scrollY
        const parallax = scrolled * 0.5
        sectionRef.current.style.transform = `translateY(${parallax}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Space Theme 3D Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#60a5fa" />
          <pointLight position={[-10, 5, 5]} intensity={0.5} color="#8b5cf6" />
          <pointLight position={[0, -10, 0]} intensity={0.3} color="#ec4899" />
          
          {/* Star Field */}
          <StarField count={8000} speed={0.05} />
          
          {/* Central Planet (Sirius-inspired) */}
          <Planet position={[-4, 2, -5]} size={1.2} color="#fbbf24" speed={0.3} rings={true} />
          
          {/* Smaller Planets */}
          <Planet position={[5, -1, -6]} size={0.8} color="#3b82f6" speed={0.4} />
          <Planet position={[-6, -2, -4]} size={0.6} color="#8b5cf6" speed={0.5} />
          
          {/* Satellites */}
          <Satellite position={[0, 3, -3]} speed={0.8} />
          <Satellite position={[3, -2, -4]} speed={1.2} />
          <Satellite position={[-3, 1, -5]} speed={0.6} />
          
          {/* Asteroids */}
          <Asteroid position={[2, 2, -2]} size={0.2} speed={1.5} />
          <Asteroid position={[-2, -1, -3]} size={0.15} speed={1.8} />
          <Asteroid position={[4, 0, -4]} size={0.25} speed={1.2} />
          <Asteroid position={[-4, 1, -2]} size={0.18} speed={1.6} />
          
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center justify-center"
        >
          {/* Main Title - Clean Space Theme */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-6"
          >
            <motion.h1
              className="text-7xl md:text-9xl font-extrabold mb-4 tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #60a5fa 0%, #8b5cf6 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 80px rgba(96, 165, 250, 0.5)',
                filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.6))',
              }}
              animate={{
                filter: [
                  'drop-shadow(0 0 30px rgba(139, 92, 246, 0.6))',
                  'drop-shadow(0 0 50px rgba(236, 72, 153, 0.8))',
                  'drop-shadow(0 0 30px rgba(139, 92, 246, 0.6))',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              MANISH UKIRADE
            </motion.h1>
            
            {/* Subtitle with space theme */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-3 mb-2"
            >
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ boxShadow: '0 0 10px #fbbf24' }} />
              <span className="text-yellow-400 font-semibold text-sm tracking-widest">SIRIUS</span>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ boxShadow: '0 0 10px #fbbf24' }} />
            </motion.div>
          </motion.div>

          {/* Clean Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="text-xl md:text-3xl text-slate-200 mb-4 font-light tracking-wide"
            style={{
              textShadow: '0 0 20px rgba(148, 163, 184, 0.5)',
            }}
          >
            Tech Lead | AI/ML Engineer | Cloud Architect
          </motion.p>
          
          {/* Clean Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-sm md:text-base text-slate-400 mb-12 max-w-2xl px-4 font-light"
          >
            Exploring the cosmos of technology, building scalable platforms and AI-powered solutions
          </motion.p>

          {/* Clean CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="flex gap-6 justify-center flex-wrap"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold text-lg shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 border border-blue-400/30"
              style={{
                boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)',
              }}
            >
              Explore Projects
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-slate-900/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-full text-white font-semibold text-lg hover:border-purple-400 transition-all duration-300"
              style={{
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
              }}
            >
              Connect
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-slate-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
