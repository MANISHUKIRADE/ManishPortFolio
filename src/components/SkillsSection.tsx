import { motion } from 'framer-motion'
import {
  Code2,
  Cloud,
  Brain,
  Database,
  Zap,
  TrendingUp,
} from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import SectionShell from './ui/SectionShell'
import HudPanel from './ui/HudPanel'
import HudCard from './ui/HudCard'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface SkillCategory {
  id: string
  label: string
  title: string
  icon: React.ReactNode
  accent: string
  skills: string[]
}

const skillCategories: SkillCategory[] = [
  {
    id: 'ai-rag',
    label: 'AI / RAG',
    title: 'Generative AI & RAG',
    icon: <Brain className="w-4 h-4" />,
    accent: '#22d3ee',
    skills: [
      'Generative AI',
      'LangChain',
      'RAG Systems',
      'Prompt Engineering',
      'ChromaDB',
      'Vector Databases',
      'Pinecone',
      'FastAPI',
      'MLflow',
      'Hugging Face',
      'Agentic AI',
      'OpenAI API',
      'Groq',
    ],
  },
  {
    id: 'languages',
    label: 'Languages',
    title: 'Programming Languages',
    icon: <Code2 className="w-4 h-4" />,
    accent: '#38bdf8',
    skills: ['Python', 'TypeScript', 'Node.js', 'JavaScript'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    title: 'Frontend & Frameworks',
    icon: <Zap className="w-4 h-4" />,
    accent: '#a78bfa',
    skills: ['React.js', 'Next.js', 'Vue.js'],
  },
  {
    id: 'cloud',
    label: 'Cloud',
    title: 'Cloud Platforms',
    icon: <Cloud className="w-4 h-4" />,
    accent: '#f59e0b',
    skills: ['Azure', 'AWS', 'GCP'],
  },
  {
    id: 'ml',
    label: 'AI / ML',
    title: 'AI/ML & NLP',
    icon: <Brain className="w-4 h-4" />,
    accent: '#f472b6',
    skills: ['AI/ML', 'NLP/LLM', 'TensorFlow', 'CatBoost'],
  },
  {
    id: 'devops',
    label: 'DevOps',
    title: 'DevOps & Containers',
    icon: <TrendingUp className="w-4 h-4" />,
    accent: '#22d3ee',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'Jenkins'],
  },
  {
    id: 'databases',
    label: 'Data',
    title: 'Databases',
    icon: <Database className="w-4 h-4" />,
    accent: '#34d399',
    skills: ['PostgreSQL', 'MySQL', 'Redis', 'Firebase'],
  },
]

const totalSkills = skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0)

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

const SkillsSection = () => {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <SectionShell id="skills" contentClassName="max-w-5xl mx-auto">
      <SectionHeader
        eyebrow="Technical Expertise"
        title="Skills & Technologies"
        description="Production stack across AI, cloud, and full-stack engineering — all modules loaded."
        sysId="SYS.TECH_STACK"
        typeTitle
      />

      <HudPanel
        moduleLabel="// Skills Module"
        sysId="SYS.TECH_STACK v2.0"
        badge={`${skillCategories.length} modules`}
        footer={
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] text-slate-600 uppercase tracking-widest">
              Status: Online
            </span>
            <span className="font-mono text-[10px] text-cyan-400/50">
              {totalSkills} capabilities loaded
            </span>
          </div>
        }
      >
        <motion.div
          className="px-4 sm:px-5 py-5 sm:py-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {skillCategories.map((category, index) => (
            <motion.div key={category.id} variants={cardVariants}>
              <motion.div
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        y: [0, -5, 0],
                      }
                }
                transition={
                  reducedMotion
                    ? undefined
                    : {
                        y: {
                          duration: 4.5 + index * 0.35,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: index * 0.25,
                        },
                      }
                }
              >
                <HudCard className="p-4 sm:p-5 h-full overflow-hidden group">
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 30% 20%, ${category.accent}18, transparent 55%)`,
                    }}
                  />

                  <div className="relative flex items-center gap-3 mb-3 pb-2 border-b border-slate-800/60">
                    <motion.div
                      className="p-2 rounded-lg border border-cyan-500/20 bg-cyan-500/5 text-cyan-400"
                      style={{ boxShadow: `0 0 16px ${category.accent}22` }}
                      whileHover={reducedMotion ? undefined : { scale: 1.08, rotate: 3 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    >
                      {category.icon}
                    </motion.div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400/70 mb-0.5">
                        {category.label}
                      </p>
                      <h3 className="text-sm sm:text-base font-semibold text-white">{category.title}</h3>
                    </div>
                    <span className="ml-auto font-mono text-xs text-slate-500 hidden sm:block">
                      {category.skills.length} nodes
                    </span>
                  </div>

                  <div className="relative flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: index * 0.08 + skillIndex * 0.04,
                          duration: 0.35,
                        }}
                        whileHover={
                          reducedMotion
                            ? undefined
                            : {
                                y: -3,
                                scale: 1.04,
                                boxShadow: `0 0 18px ${category.accent}44`,
                              }
                        }
                        className="px-3 py-1.5 rounded-md font-mono text-xs sm:text-sm text-slate-200 bg-slate-800/80 border border-slate-700/80 cursor-default"
                        style={{
                          borderColor: `${category.accent}33`,
                          boxShadow: `inset 0 0 12px ${category.accent}08`,
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </HudCard>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </HudPanel>
    </SectionShell>
  )
}

export default SkillsSection
