import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { useState } from 'react'
import { useCanHover } from '../hooks/useCanHover'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface Project {
  id: number
  title: string
  description: string
  tech: string[]
  image: string
  github: string
  live: string
}

interface ProjectCardProps {
  project: Project
  index: number
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const canHover = useCanHover()
  const reducedMotion = usePrefersReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : index * 0.08 }}
      onHoverStart={() => canHover && setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-slate-900/60 rounded-xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-colors duration-300 backdrop-blur-sm"
    >
      {canHover && isHovered && (
        <>
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none z-20"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              background: 'linear-gradient(90deg, #22d3ee, #2dd4bf, #0891b2, #22d3ee)',
              backgroundSize: '200% 100%',
              padding: '2px',
              WebkitMask:
                'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none z-[19]"
            style={{
              boxShadow:
                '0 0 20px rgba(34, 211, 238, 0.5), inset 0 0 20px rgba(34, 211, 238, 0.15)',
            }}
          />
        </>
      )}

      <motion.div
        animate={{ scale: canHover && isHovered ? 1.02 : 1 }}
        transition={{ duration: 0.3 }}
        className="relative h-64 overflow-hidden"
      >
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
      </motion.div>

      <div className="p-6 relative z-10">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-slate-300 mb-4 line-clamp-4 text-sm leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-cyan-500/10 text-cyan-300 rounded-full text-xs border border-cyan-500/25 font-mono"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors py-1"
          >
            <Github size={20} />
            <span>Code</span>
          </motion.a>
          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors py-1"
          >
            <ExternalLink size={20} />
            <span>Live Demo</span>
          </motion.a>
        </div>
      </div>

      {canHover && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 blur-xl" />
        </div>
      )}
    </motion.div>
  )
}

export default ProjectCard
