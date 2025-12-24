import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, Phone } from 'lucide-react'

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-4 bg-slate-900">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
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
                className="p-4 bg-slate-800 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors group flex flex-col items-center gap-2 min-w-[140px]"
              >
                <social.icon className="w-8 h-8 text-slate-300 group-hover:text-blue-400 transition-colors" />
                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{social.text}</span>
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
