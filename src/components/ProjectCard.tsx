import { ExternalLink, Github } from 'lucide-react'
import HudCard from './ui/HudCard'

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
  return (
    <HudCard className="overflow-hidden flex flex-col h-full">
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        <span className="absolute top-3 left-3 font-mono text-[10px] text-cyan-400/80 bg-slate-900/80 px-2 py-0.5 rounded border border-cyan-500/20">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400/60 mb-2">
          // Deployment
        </p>
        <h3 className="text-lg font-bold text-white mb-2 leading-snug">{project.title}</h3>
        <p className="text-slate-400 mb-4 line-clamp-4 text-sm leading-relaxed flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 bg-cyan-500/10 text-cyan-300 rounded-md text-xs border border-cyan-500/20 font-mono"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4 pt-3 border-t border-slate-800/80">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-400 hover:text-cyan-300 transition-colors text-sm font-mono"
          >
            <Github size={16} />
            <span>Code</span>
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-400 hover:text-cyan-300 transition-colors text-sm font-mono"
          >
            <ExternalLink size={16} />
            <span>Live</span>
          </a>
        </div>
      </div>
    </HudCard>
  )
}

export default ProjectCard
