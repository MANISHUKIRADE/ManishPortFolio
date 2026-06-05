import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = ['home', 'capabilities', 'projects', 'skills', 'career', 'blog', 'contact']
      const current = sections.find((section) => {
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
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Capabilities', href: '#capabilities', id: 'capabilities' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Career', href: '#career', id: 'career' },
    { name: 'Blog', href: '#blog', id: 'blog' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ]

  const scrollTo = (href: string) => {
    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      window.scrollTo({ top: targetElement.offsetTop - 64, behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-nexus-950/90 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_4px_24px_rgba(34,211,238,0.06)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('#home')
            }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2"
          >
            <span className="font-mono text-sm text-cyan-400/90">{'<'}</span>
            <span className="text-lg font-bold text-white tracking-tight">Manish</span>
            <span className="font-mono text-sm text-cyan-400/90">{'/>'}</span>
          </motion.a>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollTo(item.href)
                  }}
                  whileHover={{ color: '#f8fafc' }}
                  className={`relative px-3 py-2 text-sm font-mono transition-colors ${
                    isActive ? 'text-cyan-300' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-cyan-400 rounded-full"
                      style={{ boxShadow: '0 0 8px rgba(34, 211, 238, 0.6)' }}
                    />
                  )}
                </motion.a>
              )
            })}
          </div>

          <div className="hidden md:flex lg:hidden items-center gap-4">
            {navItems.slice(0, 4).map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo(item.href)
                }}
                className="text-sm text-slate-400 hover:text-cyan-300 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('#contact')
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="hidden sm:inline-flex px-4 py-2 font-mono text-xs rounded-md bg-cyan-600/90 hover:bg-cyan-500 text-white border border-cyan-400/30 transition-colors uppercase tracking-wider"
          >
            Contact
          </motion.a>

          <button
            className="lg:hidden text-slate-300 p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="lg:hidden bg-nexus-950/98 backdrop-blur-xl border-t border-slate-800"
        >
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  setIsOpen(false)
                  scrollTo(item.href)
                }}
                className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  activeSection === item.id
                    ? 'text-cyan-300 bg-cyan-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar
