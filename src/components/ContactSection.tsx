import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, Phone, Download, MapPin } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import SectionShell from './ui/SectionShell'
import HudPanel from './ui/HudPanel'
import { SITE_EMAIL } from '../config/site'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { fadeUpItem, staggerContainer } from '../lib/motionPresets'

const contacts = [
  {
    icon: Mail,
    label: 'Email',
    href: `mailto:${SITE_EMAIL}`,
    text: SITE_EMAIL,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/manish-ukirade-13b866124/',
    text: 'LinkedIn Profile',
  },
  {
    icon: Phone,
    label: 'Phone',
    href: 'tel:+918691983106',
    text: '+91 869 198 3106',
  },
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/MANISHUKIRADE',
    text: 'GitHub Profile',
  },
]

const ContactSection = () => {
  const reducedMotion = usePrefersReducedMotion()

  const handleResumeDownload = () => {
    const link = document.createElement('a')
    link.href = '/Manish_Ukirde_Resume_v2.pdf'
    link.download = 'Manish_Ukirde_Resume_v2.pdf'
    link.click()
  }

  return (
    <SectionShell id="contact" py="py-16 md:py-20" contentClassName="max-w-3xl mx-auto">
      <SectionHeader
        eyebrow="Contact"
        title="Get In Touch"
        description="Open to discussing new projects, creative ideas, or opportunities to be part of your vision."
        sysId="SYS.COMMS"
        typeTitle
        className="mb-8"
      />

      <HudPanel
        moduleLabel="// Comms Module"
        sysId="SYS.CONTACT v1.0"
        badge="Channel Open"
        footer={
          <div className="flex items-center justify-center gap-2 text-slate-500">
            <MapPin className="w-3 h-3 text-cyan-400/60" />
            <span className="font-mono text-[10px]">Thane, India 400605</span>
          </div>
        }
      >
        <div className="p-5 sm:p-6">
          <motion.div
            className="grid grid-cols-2 gap-3 mb-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {contacts.map((social) => (
              <motion.a
                key={social.label}
                variants={fadeUpItem}
                href={social.href}
                target={social.label === 'Email' || social.label === 'Phone' ? undefined : '_blank'}
                rel={social.label === 'Email' || social.label === 'Phone' ? undefined : 'noopener noreferrer'}
                whileHover={reducedMotion ? undefined : { y: -3, scale: 1.02 }}
                whileTap={reducedMotion ? undefined : { scale: 0.98 }}
                className="flex flex-col items-center gap-2 p-4 rounded-lg border border-cyan-500/20 bg-slate-800/50 hover:border-cyan-400/40 hover:bg-slate-800/80 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-colors touch-manipulation"
              >
                <social.icon className="w-5 h-5 text-cyan-400" />
                <span className="text-xs font-mono text-slate-300 text-center">{social.text}</span>
                <span className="sr-only">{social.label}</span>
              </motion.a>
            ))}
          </motion.div>

          <motion.button
            type="button"
            onClick={handleResumeDownload}
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: reducedMotion ? 0 : 0.35, duration: 0.45 }}
            whileHover={reducedMotion ? undefined : { y: -2, scale: 1.01 }}
            whileTap={reducedMotion ? undefined : { scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 p-4 rounded-lg border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/15 hover:border-cyan-400/50 hover:shadow-[0_0_24px_rgba(34,211,238,0.12)] transition-colors touch-manipulation"
          >
            <Download className="w-5 h-5 text-cyan-400" />
            <div className="text-left">
              <p className="font-mono text-sm text-white">Download Resume</p>
              <p className="font-mono text-[10px] text-slate-500">PDF · Full profile</p>
            </div>
          </motion.button>
        </div>
      </HudPanel>
    </SectionShell>
  )
}

export default ContactSection
