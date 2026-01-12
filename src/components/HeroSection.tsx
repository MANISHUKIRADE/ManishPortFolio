import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import Satellite from './3D/Satellite'
import Planet from './3D/Planet'
import Asteroid from './3D/Asteroid'
import StarField from './3D/StarField'
import { useEffect, useRef, useState } from 'react'
import HolographicGlitch from './animations/HolographicGlitch'
import ParticleSystem from './animations/ParticleSystem'

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isHoveringCTA, setIsHoveringCTA] = useState(false)

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
      {/* Realistic Space Background */}
      <div className="absolute inset-0 z-0 bg-black">
        {/* Deep space gradient with subtle color */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black opacity-90" />
        
        {/* Distant nebula clouds */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
            }}
            animate={{
              x: [0, -40, 0],
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          {/* Realistic starlight */}
          <ambientLight intensity={0.1} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
          <pointLight position={[-10, 5, 5]} intensity={0.4} color="#ffffff" />
          <pointLight position={[0, -10, 0]} intensity={0.2} color="#ffffff" />
          
          {/* Enhanced Star Field - More stars for realism */}
          <StarField count={15000} speed={0.02} />
          
          {/* Distant star layer */}
          <StarField count={5000} speed={0.01} />
          
          {/* Central Planet (Gas Giant with rings - like Saturn) */}
          <Planet position={[-4, 2, -5]} size={1.2} color="#d4a574" speed={0.3} rings={true} />
          
          {/* Smaller Planets - Realistic colors */}
          {/* Earth-like planet */}
          <Planet position={[5, -1, -6]} size={0.8} color="#4a7c59" speed={0.4} />
          {/* Mars-like planet */}
          <Planet position={[-6, -2, -4]} size={0.6} color="#cd5c5c" speed={0.5} />
          
          {/* Satellites */}
          <Satellite position={[0, 3, -3]} speed={0.8} />
          <Satellite position={[3, -2, -4]} speed={1.2} />
          <Satellite position={[-3, 1, -5]} speed={0.6} />
          
          {/* Asteroids */}
          <Asteroid position={[2, 2, -2]} size={0.2} speed={1.5} />
          <Asteroid position={[-2, -1, -3]} size={0.15} speed={1.8} />
          <Asteroid position={[4, 0, -4]} size={0.25} speed={1.2} />
          <Asteroid position={[-4, 1, -2]} size={0.18} speed={1.6} />
          
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
        </Canvas>
      </div>

      {/* Subtle cosmic dust particles */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-30">
        <ParticleSystem count={50} speed={0.2} size={{ min: 0.5, max: 1.5 }} colors={['#ffffff', '#e0e0e0', '#c0c0c0']} />
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
            className="mb-6 relative"
          >
            <HolographicGlitch intensity={0.08} frequency={4}>
              <motion.h1
                className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-extrabold mb-3 sm:mb-4 tracking-tight relative px-2"
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
            </HolographicGlitch>
            
            {/* Subtle starlight rays */}
            {[...Array(6)].map((_, i) => {
              const angle = (i * 360) / 6
              return (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-[1px] h-32 bg-white/20"
                  style={{
                    transformOrigin: 'top center',
                    transform: `rotate(${angle}deg) translateY(-80px)`,
                  }}
                  animate={{
                    opacity: [0, 0.3, 0],
                    scaleY: [0, 1, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: 'easeInOut',
                  }}
                />
              )
            })}
            
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="relative"
          >
            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-3xl text-slate-200 mb-3 sm:mb-4 font-light tracking-wide relative px-4"
              style={{
                textShadow: '0 0 30px rgba(255, 255, 255, 0.3), 0 0 60px rgba(255, 255, 255, 0.1)',
              }}
            >
              Fullstack Web Developer | AI/ML Engineer | Tech Lead
            </motion.p>
          </motion.div>
          
          {/* Clean Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-xs sm:text-sm md:text-base text-slate-400 mb-8 sm:mb-10 md:mb-12 max-w-2xl px-4 font-light"
          >
            Building scalable fullstack web applications and AI-powered solutions. Expert in modern web technologies and machine learning.
          </motion.p>

          {/* Clean CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="flex gap-6 justify-center flex-wrap relative"
          >
            <motion.a
              href="#projects"
              onHoverStart={() => setIsHoveringCTA(true)}
              onHoverEnd={() => setIsHoveringCTA(false)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold text-sm sm:text-base md:text-lg shadow-2xl hover:shadow-blue-500/50 active:shadow-blue-500/50 transition-all duration-300 border border-blue-400/30 overflow-hidden touch-manipulation"
              style={{
                boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)',
              }}
            >
              Explore Projects
              {/* Particle explosion on hover */}
              {isHoveringCTA && (
                <>
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-400 rounded-full"
                      initial={{
                        x: 0,
                        y: 0,
                        opacity: 1,
                        scale: 0,
                      }}
                      animate={{
                        x: Math.cos((i * 360) / 20 * Math.PI / 180) * 100,
                        y: Math.sin((i * 360) / 20 * Math.PI / 180) * 100,
                        opacity: [1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 0.8,
                        ease: 'easeOut',
                      }}
                      style={{
                        boxShadow: '0 0 10px #60a5fa',
                      }}
                    />
                  ))}
                </>
              )}
            </motion.a>
            <motion.a
              href="#contact"
              onHoverStart={() => setIsHoveringCTA(true)}
              onHoverEnd={() => setIsHoveringCTA(false)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-10 py-4 bg-slate-900/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-full text-white font-semibold text-lg hover:border-purple-400 transition-all duration-300 overflow-hidden"
              style={{
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
              }}
            >
              Connect
              {/* Particle explosion on hover */}
              {isHoveringCTA && (
                <>
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-2 h-2 bg-purple-400 rounded-full"
                      initial={{
                        x: 0,
                        y: 0,
                        opacity: 1,
                        scale: 0,
                      }}
                      animate={{
                        x: Math.cos((i * 360) / 20 * Math.PI / 180) * 100,
                        y: Math.sin((i * 360) / 20 * Math.PI / 180) * 100,
                        opacity: [1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 0.8,
                        ease: 'easeOut',
                      }}
                      style={{
                        boxShadow: '0 0 10px #8b5cf6',
                      }}
                    />
                  ))}
                </>
              )}
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
