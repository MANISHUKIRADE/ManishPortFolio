import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import ThemeToggle from './ui/ThemeToggle'

type NavbarProps = {
  onOpenCommandPalette?: () => void
}

const Navbar = ({ onOpenCommandPalette }: NavbarProps) => {
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

  const isMac =
    typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={`fixed top-0 w-full z-50 transition-colors duration-150 ${
        scrolled
          ? 'bg-bg/90 backdrop-blur-xl border-b border-border'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('#home')
            }}
            className="flex items-center gap-2"
          >
            <span className="font-mono text-sm text-accent">{'<'}</span>
            <span className="text-lg font-bold text-text tracking-tight">Manish</span>
            <span className="font-mono text-sm text-accent">{'/>'}</span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollTo(item.href)
                  }}
                  className={`relative px-3 py-2 text-sm font-mono transition-colors duration-150 ${
                    isActive ? 'text-accent' : 'text-muted hover:text-accent'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent rounded-full" />
                  )}
                </a>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            {onOpenCommandPalette && (
              <button
                type="button"
                onClick={onOpenCommandPalette}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border font-mono text-[10px] text-muted hover:text-accent hover:border-accent transition-colors duration-150"
                aria-label="Open command palette"
              >
                <kbd>{isMac ? '⌘' : 'Ctrl'}K</kbd>
              </button>
            )}
            <ThemeToggle />
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                scrollTo('#contact')
              }}
              className="hidden sm:inline-flex px-4 py-2 font-mono text-xs rounded-md bg-accent hover:bg-accent-hover text-bg transition-colors duration-150 uppercase tracking-wider"
            >
              Contact
            </a>
            <button
              className="lg:hidden text-muted p-2 hover:text-accent"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="lg:hidden bg-bg/98 backdrop-blur-xl border-t border-border overflow-hidden"
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
                      ? 'text-accent bg-accent-muted/30'
                      : 'text-muted hover:text-text hover:bg-surface-2'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
