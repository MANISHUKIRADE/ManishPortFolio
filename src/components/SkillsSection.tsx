import { useState } from 'react'
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

const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState(0)
  const active = skillCategories[activeTab]

  return (
    <SectionShell id="skills" contentClassName="max-w-5xl mx-auto">
      <SectionHeader
        eyebrow="Technical Expertise"
        title="Skills & Technologies"
        description="Production stack across AI, cloud, and full-stack engineering — organized by mission module."
        sysId="SYS.TECH_STACK"
        typeTitle
      />

      <HudPanel
        moduleLabel="// Skills Module"
        sysId="SYS.TECH_STACK v2.0"
        badge={`${String(activeTab + 1).padStart(2, '0')} / ${String(skillCategories.length).padStart(2, '0')}`}
        footer={
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] text-slate-600 uppercase tracking-widest">
              Status: Online
            </span>
            <span className="font-mono text-[10px] text-cyan-400/50">
              {skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0)} capabilities loaded
            </span>
          </div>
        }
      >
        <div
          className="flex gap-1.5 px-3 sm:px-4 py-3 border-b border-slate-800/80 overflow-x-auto"
          role="tablist"
          aria-label="Skill categories"
        >
          {skillCategories.map((category, index) => {
            const isActive = activeTab === index
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`skills-panel-${category.id}`}
                id={`skills-tab-${category.id}`}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-xs uppercase tracking-wider whitespace-nowrap border transition-colors ${
                  isActive
                    ? 'bg-cyan-500/15 border-cyan-400/50 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                    : 'bg-slate-900/50 border-slate-700/80 text-slate-400 hover:text-slate-200 hover:border-slate-600'
                }`}
              >
                <span className={isActive ? 'text-cyan-400' : 'text-slate-500'}>{category.icon}</span>
                {category.label}
              </button>
            )
          })}
        </div>

        <div
          id={`skills-panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`skills-tab-${active.id}`}
          className="px-4 sm:px-5 py-5 sm:py-6"
        >
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800/60">
            <div
              className="p-2 rounded-lg border border-cyan-500/20 bg-cyan-500/5 text-cyan-400"
              style={{ boxShadow: `0 0 16px ${active.accent}22` }}
            >
              {active.icon}
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400/70 mb-0.5">
                Active Module
              </p>
              <h3 className="text-base sm:text-lg font-semibold text-white">{active.title}</h3>
            </div>
            <span className="ml-auto font-mono text-xs text-slate-500 hidden sm:block">
              {active.skills.length} nodes
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {active.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-md font-mono text-xs sm:text-sm text-slate-200 bg-slate-800/80 border border-slate-700/80"
                style={{
                  borderColor: `${active.accent}33`,
                  boxShadow: `inset 0 0 12px ${active.accent}08`,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </HudPanel>
    </SectionShell>
  )
}

export default SkillsSection
