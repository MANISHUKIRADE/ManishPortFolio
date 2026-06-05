import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Rocket, BookOpen, Shield } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import SectionShell from './ui/SectionShell'
import HudPanel from './ui/HudPanel'
import HudCard from './ui/HudCard'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { fadeInItem, panelEnter, staggerContainer } from '../lib/motionPresets'

interface Project {
  id: string
  label: string
  category: string
  title: string
  description: string
  tech: string[]
  image: string
  github?: string
  live?: string
  blogSlug?: string
}

const PLACEHOLDER_URLS = new Set(['https://github.com', 'https://example.com'])

const isPublicUrl = (url?: string) => Boolean(url && !PLACEHOLDER_URLS.has(url))

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
    blogSlug: 'production-rag-pipeline-kyara-lessons',
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
    blogSlug: 'employee-attrition-prediction-ml-models',
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
    blogSlug: 'zero-downtime-cloud-migration-aws-azure',
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
  },
]

const ProjectLinks = ({ project }: { project: Project }) => {
  const hasCode = isPublicUrl(project.github)
  const hasLive = isPublicUrl(project.live)
  const hasBlog = Boolean(project.blogSlug)
  const hasAnyLink = hasCode || hasLive || hasBlog

  if (!hasAnyLink) {
    return (
      <div className="flex items-center gap-2 pt-3 border-t border-slate-800/80 text-slate-500 text-sm font-mono">
        <Shield size={16} className="text-cyan-400/60 shrink-0" />
        <span>Enterprise deployment · NDA protected</span>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-4 pt-3 border-t border-slate-800/80">
      {hasBlog && (
        <a
          href={`#blog-${project.blogSlug}`}
          className="flex items-center gap-2 text-slate-400 hover:text-cyan-300 transition-colors text-sm font-mono"
        >
          <BookOpen size={16} />
          <span>Case Study</span>
        </a>
      )}
      {hasCode && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-slate-400 hover:text-cyan-300 transition-colors text-sm font-mono"
        >
          <Github size={16} />
          <span>Code</span>
        </a>
      )}
      {hasLive && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-slate-400 hover:text-cyan-300 transition-colors text-sm font-mono"
        >
          <ExternalLink size={16} />
          <span>Live</span>
        </a>
      )}
    </div>
  )
}

const ProjectDetail = ({
  project,
  index,
  compact = false,
}: {
  project: Project
  index: number
  compact?: boolean
}) => (
  <div>
    <div
      className={`relative overflow-hidden border-b border-slate-800/80 ${
        compact ? 'h-36 sm:h-40' : 'h-44 sm:h-52 lg:h-56'
      }`}
    >
      <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
      <span className="absolute top-3 left-3 font-mono text-[10px] text-cyan-400 bg-slate-900/80 px-2 py-0.5 rounded border border-cyan-500/25">
        {project.category}
      </span>
      <span className="absolute top-3 right-3 font-mono text-[10px] text-slate-500">
        DEPLOY_{String(index + 1).padStart(2, '0')}
      </span>
    </div>

    <div className={compact ? 'p-4' : 'p-4 sm:p-5 lg:p-6'}>
      <div className="flex items-start gap-3 mb-4 pb-4 border-b border-slate-800/60">
        <div className="p-2 rounded-lg border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 shrink-0">
          <Rocket className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400/70 mb-1">
            // {compact ? project.label : 'Active Deployment'}
          </p>
          <h3
            className={`font-bold text-cyan-300 leading-snug ${
              compact ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
            }`}
          >
            {project.title}
          </h3>
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

      <ProjectLinks project={project} />
    </div>
  </div>
)

const ProjectsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = projects[activeIndex]
  const reducedMotion = usePrefersReducedMotion()

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
        badge={`${projects.length} deployments`}
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
        {/* Mobile: stacked cards */}
        <motion.div
          className="lg:hidden px-4 sm:px-5 py-5 space-y-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {projects.map((project, index) => (
            <motion.div key={project.id} variants={fadeInItem}>
              <motion.div whileHover={reducedMotion ? undefined : { y: -3 }}>
                <HudCard className="overflow-hidden">
                  <ProjectDetail project={project} index={index} compact />
                </HudCard>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

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

          <div className="bg-slate-950/20 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={reducedMotion ? false : panelEnter.initial}
                animate={panelEnter.animate}
                exit={reducedMotion ? undefined : panelEnter.exit}
                transition={panelEnter.transition}
              >
                <ProjectDetail project={active} index={activeIndex} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </HudPanel>
    </SectionShell>
  )
}

export default ProjectsSection
