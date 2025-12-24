import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import ScanningLine from './animations/ScanningLine'
import HolographicGlitch from './animations/HolographicGlitch'
import HolographicGrid from './animations/HolographicGrid'
import ParticleSystem from './animations/ParticleSystem'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Detect active section
      const sections = ['home', 'projects', 'skills', 'career', 'blog', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      setActiveSection(current || '')
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Career', href: '#career' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 relative overflow-hidden"
    >
      {/* Holographic Grid Background */}
      <HolographicGrid spacing={40} color="#60a5fa" opacity={0.05} />
      
      {/* Particle System */}
      <ParticleSystem count={20} speed={0.3} size={{ min: 1, max: 2 }} />
      
      {/* Scanning Line */}
      <ScanningLine direction="horizontal" speed={3} />
      
      {/* Energy Border */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        animate={{
          opacity: scrolled ? [0.5, 1, 0.5] : 0.3,
          boxShadow: scrolled
            ? ['0 0 10px #60a5fa', '0 0 20px #60a5fa', '0 0 10px #60a5fa']
            : '0 0 5px #60a5fa',
        }}
        transition={{
          duration: 2,
          repeat: scrolled ? Infinity : 0,
        }}
        style={{
          background: 'linear-gradient(90deg, transparent, #60a5fa, transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            <HolographicGlitch intensity={0.05} frequency={5}>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Manish
              </div>
            </HolographicGlitch>
            {/* Particle trail on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full"
                  style={{
                    left: `${20 + i * 10}%`,
                    top: '50%',
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.name.toLowerCase()
              const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault()
                const targetId = item.href.replace('#', '')
                const targetElement = document.getElementById(targetId)
                if (targetElement) {
                  const offsetTop = targetElement.offsetTop - 64 // Account for navbar height
                  window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth',
                  })
                }
              }
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={handleClick}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative text-slate-300 hover:text-white transition-colors"
                >
                  {isActive ? (
                    <HolographicGlitch intensity={0.1} frequency={2}>
                      <span className="text-white">{item.name}</span>
                    </HolographicGlitch>
                  ) : (
                    item.name
                  )}
                  {/* Energy indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-blue-400"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      style={{
                        boxShadow: '0 0 10px #60a5fa',
                      }}
                    />
                  )}
                </motion.a>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-slate-900/95 backdrop-blur-md relative overflow-hidden"
        >
          <ScanningLine direction="horizontal" speed={2} />
          <div className="px-4 py-4 space-y-4 relative z-10">
            {navItems.map((item) => {
              const isActive = activeSection === item.name.toLowerCase()
              const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault()
                setIsOpen(false)
                const targetId = item.href.replace('#', '')
                const targetElement = document.getElementById(targetId)
                if (targetElement) {
                  const offsetTop = targetElement.offsetTop - 64 // Account for navbar height
                  window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth',
                  })
                }
              }
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={handleClick}
                  className="block text-slate-300 hover:text-white transition-colors relative"
                  whileHover={{ x: 10 }}
                >
                  {isActive ? (
                    <HolographicGlitch intensity={0.1} frequency={2}>
                      <span className="text-white">{item.name}</span>
                    </HolographicGlitch>
                  ) : (
                    item.name
                  )}
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-[2px] bg-blue-400"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      style={{
                        boxShadow: '0 0 10px #60a5fa',
                      }}
                    />
                  )}
                </motion.a>
              )
            })}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar

