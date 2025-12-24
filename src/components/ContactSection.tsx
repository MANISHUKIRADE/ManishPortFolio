import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, Phone } from 'lucide-react'
import ScanningLine from './animations/ScanningLine'
import HolographicGlitch from './animations/HolographicGlitch'
import ParticleSystem from './animations/ParticleSystem'
import { useState } from 'react'

const ContactSection = () => {
  const [hoveredContact, setHoveredContact] = useState<string | null>(null)

  return (
    <section id="contact" className="py-20 px-4 bg-slate-900 relative overflow-hidden">
      {/* Particle System */}
      <ParticleSystem count={30} speed={0.3} size={{ min: 1, max: 2 }} colors={['#60a5fa', '#8b5cf6', '#ec4899']} />
      
      {/* Scanning Lines */}
      <ScanningLine direction="horizontal" speed={4} />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <HolographicGlitch intensity={0.05} frequency={4}>
            <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
          </HolographicGlitch>
          <p className="text-xl text-slate-300 mb-12">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>

          <div className="flex justify-center gap-6 flex-wrap">
            {[
              { 
                icon: Mail, 
                label: 'Email', 
                href: 'mailto:ukirademanish9797@gmail.com',
                text: 'ukirademanish9797@gmail.com'
              },
              { 
                icon: Linkedin, 
                label: 'LinkedIn', 
                href: 'https://www.linkedin.com/in/manish-ukirade-13b866124/',
                text: 'LinkedIn Profile'
              },
              { 
                icon: Phone, 
                label: 'Phone', 
                href: 'tel:+918691983106',
                text: '+91 869 198 3106'
              },
              { 
                icon: Github, 
                label: 'GitHub', 
                href: 'https://github.com/MANISHUKIRADE',
                text: 'GitHub Profile'
              },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.label === 'Email' || social.label === 'Phone' ? undefined : '_blank'}
                rel={social.label === 'Email' || social.label === 'Phone' ? undefined : 'noopener noreferrer'}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                onHoverStart={() => setHoveredContact(social.label)}
                onHoverEnd={() => setHoveredContact(null)}
                className="relative p-4 bg-slate-800 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors group flex flex-col items-center gap-2 min-w-[140px] overflow-hidden"
              >
                {/* Holographic projection effect */}
                {hoveredContact === social.label && (
                  <>
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <ScanningLine direction="horizontal" speed={2} />
                    </div>
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(96, 165, 250, 0.2), transparent 70%)',
                        filter: 'blur(20px)',
                      }}
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </>
                )}
                
                {/* Energy waves */}
                {hoveredContact === social.label && (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute inset-0 rounded-lg border-2 border-blue-400 pointer-events-none"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                        style={{
                          boxShadow: '0 0 20px rgba(96, 165, 250, 0.5)',
                        }}
                      />
                    ))}
                  </>
                )}
                
                <social.icon className="w-8 h-8 text-slate-300 group-hover:text-blue-400 transition-colors relative z-10" />
                <span className="text-sm text-slate-300 group-hover:text-white transition-colors relative z-10">{social.text}</span>
                <span className="sr-only">{social.label}</span>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 text-slate-400"
          >
            <p>📍 Thane, India 400605</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactSection
