import { useState } from 'react'
import { ExternalLink, Github, Rocket } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import SectionShell from './ui/SectionShell'
import HudPanel from './ui/HudPanel'

interface Project {
  id: string
  label: string
  category: string
  title: string
  description: string
  tech: string[]
  image: string
  github: string
  live: string
}

const projects: Project[] = [
  {
    id: 'kyara',
    label: 'KYARA',
    category: 'AI / RAG',
    title: 'KYARA — Production Generative AI HR Platform',
    description:
      'Built an end-to-end Generative AI platform for HR intelligence. Features: RAG-based HR Policy Q&A using LangChain and ChromaDB, Conversational Employee Intelligence with sliding window memory, and Adaptive Survey Intelligence with LLM-driven dynamic branching. Deployed across 10+ enterprise clients on Azure.',
    tech: ['Python', 'LangChain', 'ChromaDB', 'LLMs', 'RAG', 'FastAPI', 'NLP', 'Prompt Engineering', 'Azure'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 'saas',
    label: 'SaaS',
    category: 'Enterprise',
    title: 'Enterprise Employee Engagement SaaS Platform',
    description:
      'Architected and shipped a multi-tenant enterprise engagement platform from scratch. Served enterprise clients across India and Middle East. Drove 2× YoY revenue growth over 2.5 years. SOC 2 Type II, CyberCube, and VPAT certified on this infrastructure.',
    tech: ['Node.js', 'React', 'MySQL', 'Redis', 'Docker Swarm', 'Azure'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 'ml',
    label: 'ML',
    category: 'Production ML',
    title: 'Employee Attrition Prediction — Production ML',
    description:
      'Built a CatBoost model predicting employee attrition with 83.48% accuracy. Engineered 122 features from survey data. Achieved 82% recall identifying employees at risk of leaving. Deployed as early warning system for proactive HR retention strategy.',
    tech: ['Python', 'CatBoost', 'Feature Engineering', 'MLOps', 'HR Analytics'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 'migration',
    label: 'Cloud',
    category: 'Infrastructure',
    title: 'AWS to Azure Migration — Zero Downtime',
    description:
      'Orchestrated complete production migration from AWS to Azure in 15 days with zero downtime. Maintained 99.9% uptime throughout. Achieved 30% infrastructure cost reduction post-migration. Full containerisation with Docker and Kubernetes.',
    tech: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Nginx'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 'compliance',
    label: 'SOC 2',
    category: 'Compliance',
    title: 'SOC 2 Type II + CyberCube + VPAT — Compliance Engineering',
    description:
      'Led three enterprise compliance certifications independently — SOC 2 Type II, CyberCube cyber risk, and VPAT accessibility. Policy drafting, VAPT execution, vendor assessments, audit coordination. Single low-severity Nginx finding on full scan.',
    tech: ['Azure', 'Nginx', 'VAPT', 'Security Hardening', 'Documentation'],
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
    github: 'https://github.com',
    live: 'https://example.com',
  },
]

const ProjectDetail = ({ project, index }: { project: Project; index: number }) => (
  <div>
    <div className="relative h-44 sm:h-52 lg:h-56 overflow-hidden border-b border-slate-800/80">
      <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
      <span className="absolute top-3 left-3 font-mono text-[10px] text-cyan-400 bg-slate-900/80 px-2 py-0.5 rounded border border-cyan-500/25">
        {project.category}
      </span>
      <span className="absolute top-3 right-3 font-mono text-[10px] text-slate-500">
        DEPLOY_{String(index + 1).padStart(2, '0')}
      </span>
    </div>

    <div className="p-4 sm:p-5 lg:p-6">
      <div className="flex items-start gap-3 mb-4 pb-4 border-b border-slate-800/60">
        <div className="p-2 rounded-lg border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 shrink-0">
          <Rocket className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400/70 mb-1">
            // Active Deployment
          </p>
          <h3 className="text-lg sm:text-xl font-bold text-cyan-300 leading-snug">{project.title}</h3>
        </div>
      </div>

      <p className="text-sm text-slate-400 leading-relaxed mb-5">{project.description}</p>

      <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-400/70 mb-2">
        // Tech Stack
      </p>
      <div className="flex flex-wrap gap-1.5 mb-5">
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
  </div>
)

const ProjectsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = projects[activeIndex]

  return (
    <SectionShell id="projects" py="py-16 md:py-20" contentClassName="max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="Selected Work"
        title="Featured Projects"
        description="Production Generative AI, enterprise SaaS, ML systems, cloud migrations, and compliance engineering."
        sysId="SYS.PROJECTS"
        typeTitle
        className="mb-8 md:mb-10"
      />

      <HudPanel
        moduleLabel="// Projects Module"
        sysId="SYS.DEPLOYMENTS v1.0"
        badge={`${String(activeIndex + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`}
        footer={
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] text-slate-600 uppercase tracking-widest">
              Status: Production
            </span>
            <span className="font-mono text-[10px] text-cyan-400/50">
              {projects.length} deployments loaded
            </span>
          </div>
        }
      >
        {/* Mobile: HUD tabs */}
        <div
          className="lg:hidden flex gap-1.5 px-3 sm:px-4 py-3 border-b border-slate-800/80 overflow-x-auto"
          role="tablist"
          aria-label="Featured projects"
        >
          {projects.map((project, index) => {
            const isActive = activeIndex === index
            return (
              <button
                key={project.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`project-panel-${project.id}`}
                id={`project-tab-${project.id}`}
                onClick={() => setActiveIndex(index)}
                className={`px-3 py-1.5 rounded-md font-mono text-xs uppercase tracking-wider whitespace-nowrap border transition-colors ${
                  isActive
                    ? 'bg-cyan-500/15 border-cyan-400/50 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                    : 'bg-slate-900/50 border-slate-700/80 text-slate-400 hover:text-slate-200 hover:border-slate-600'
                }`}
              >
                {project.label}
              </button>
            )
          })}
        </div>

        {/* Desktop: split panel */}
        <div className="hidden lg:grid lg:grid-cols-[minmax(240px,34%)_1fr] min-h-[480px]">
          <nav className="border-r border-slate-800/80 p-4" aria-label="Project navigation">
            <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-400/60 mb-4 px-2">
              // Deployment Log
            </p>
            <ul className="space-y-2">
              {projects.map((project, index) => {
                const isActive = activeIndex === index
                return (
                  <li key={project.id}>
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-current={isActive ? 'true' : undefined}
                      className={`w-full text-left px-3 py-3 rounded-lg border transition-colors ${
                        isActive
                          ? 'bg-cyan-500/10 border-cyan-400/40 text-cyan-100'
                          : 'border-transparent text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                      }`}
                    >
                      <span className="block font-mono text-[10px] text-slate-500 mb-0.5">
                        {String(index + 1).padStart(2, '0')} · {project.category}
                      </span>
                      <span className="block font-semibold text-sm leading-snug">{project.label}</span>
                      <span className="block text-xs text-slate-500 mt-1 line-clamp-2">{project.title}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div
            role="tabpanel"
            id={`project-panel-${active.id}`}
            aria-labelledby={`project-tab-${active.id}`}
            className="bg-slate-950/20"
          >
            <ProjectDetail project={active} index={activeIndex} />
          </div>
        </div>

        {/* Mobile: detail */}
        <div
          className="lg:hidden"
          role="tabpanel"
          id={`project-panel-${active.id}`}
          aria-labelledby={`project-tab-${active.id}`}
        >
          <ProjectDetail project={active} index={activeIndex} />
        </div>
      </HudPanel>
    </SectionShell>
  )
}

export default ProjectsSection
