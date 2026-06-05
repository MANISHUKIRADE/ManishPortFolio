import { motion } from 'framer-motion'
import {
  Code2,
  Cloud,
  Brain,
  Database,
  Zap,
  TrendingUp,
  Cpu,
} from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import SectionShell from './ui/SectionShell'
import HudPanel from './ui/HudPanel'
import HudCard from './ui/HudCard'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { fadeInItem, hoverLift, staggerContainer } from '../lib/motionPresets'

interface SkillCategory {
  id: string
  label: string
  title: string
  icon: React.ReactNode
  skills: string[]
  wide?: boolean
}

const skillCategories: SkillCategory[] = [
  {
    id: 'ai-rag',
    label: 'AI / RAG',
    title: 'Generative AI & RAG',
    icon: <Brain className="w-4 h-4" />,
    wide: true,
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
    skills: ['Python', 'TypeScript', 'Node.js', 'JavaScript'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    title: 'Frontend & Frameworks',
    icon: <Zap className="w-4 h-4" />,
    skills: ['React.js', 'Next.js', 'Vue.js'],
  },
  {
    id: 'cloud',
    label: 'Cloud',
    title: 'Cloud Platforms',
    icon: <Cloud className="w-4 h-4" />,
    skills: ['Azure', 'AWS', 'GCP'],
  },
  {
    id: 'ml',
    label: 'AI / ML',
    title: 'AI/ML & NLP',
    icon: <Cpu className="w-4 h-4" />,
    skills: ['AI/ML', 'NLP/LLM', 'TensorFlow', 'CatBoost'],
  },
  {
    id: 'devops',
    label: 'DevOps',
    title: 'DevOps & Containers',
    icon: <TrendingUp className="w-4 h-4" />,
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'Jenkins'],
  },
  {
    id: 'databases',
    label: 'Data',
    title: 'Databases',
    icon: <Database className="w-4 h-4" />,
    skills: ['PostgreSQL', 'MySQL', 'Redis', 'Firebase'],
  },
]

const totalSkills = skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0)

const SkillCard = ({ category }: { category: SkillCategory }) => (
  <HudCard className="p-4 sm:p-5 h-full flex flex-col group">
    <div className="flex items-start gap-3 mb-4 pb-3 border-b border-slate-800/60 min-h-[4.5rem]">
      <div className="p-2 rounded-lg border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 shrink-0">
        {category.icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400/70 mb-0.5">
          // {category.label}
        </p>
        <h3 className="text-sm sm:text-base font-semibold text-white leading-snug">{category.title}</h3>
      </div>
      <span className="font-mono text-[10px] text-slate-500 shrink-0 pt-1">
        {String(category.skills.length).padStart(2, '0')} nodes
      </span>
    </div>

    <div className="flex flex-wrap gap-1.5 mt-auto">
      {category.skills.map((skill) => (
        <span
          key={skill}
          className="px-2.5 py-1 bg-cyan-500/10 text-cyan-300 rounded-md text-xs border border-cyan-500/20 font-mono"
        >
          {skill}
        </span>
      ))}
    </div>
  </HudCard>
)

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
          className="px-4 sm:px-5 py-5 sm:py-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 items-stretch"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.id}
              variants={fadeInItem}
              className={`h-full ${category.wide ? 'sm:col-span-2' : ''}`}
            >
              <motion.div
                className="h-full"
                whileHover={reducedMotion ? undefined : hoverLift}
              >
                <SkillCard category={category} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </HudPanel>
    </SectionShell>
  )
}

export default SkillsSection
