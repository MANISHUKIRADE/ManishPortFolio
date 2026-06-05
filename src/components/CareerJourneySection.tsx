import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Calendar, MapPin, Award, TrendingUp } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import SectionShell from './ui/SectionShell'
import HudPanel from './ui/HudPanel'
import HudCard from './ui/HudCard'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { fadeUpItem, panelEnter, staggerContainer } from '../lib/motionPresets'

interface CareerRole {
  id: string
  label: string
  company: string
  role: string
  period: string
  location: string
  summary: string
  achievements: string[]
}

const careerData: CareerRole[] = [
  {
    id: 'we-matter',
    label: 'W.E. Matter',
    company: 'W.E. Matter',
    role: 'Tech Lead + Engineering Lead',
    period: 'Apr 2023 – Present',
    location: 'Mumbai',
    summary:
      'Leading engineering and AI platform delivery — production RAG, enterprise SaaS, compliance, and multi-cloud infrastructure for 10+ clients.',
    achievements: [
      'Drove 2X revenue growth year-over-year',
      'Built KYARA — production RAG & Generative AI HR platform',
      'Led SOC 2 Type II certification',
      'Migrated AWS to Azure in 15 days',
    ],
  },
  {
    id: 'bizpilot',
    label: 'Bizpilot',
    company: 'Bizpilot.in',
    role: 'Software Engineer',
    period: 'Feb 2022 – Mar 2023',
    location: 'Delhi',
    summary:
      'Owned full-stack delivery of the V2 platform rebuild, CI/CD, and DevOps for a financial automation product.',
    achievements: [
      'Redesigned V2 platform from scratch',
      'Built robust CI/CD pipeline',
      'Financial automation engine (200% efficiency)',
      'Managed DevOps infrastructure',
    ],
  },
  {
    id: 'raykor',
    label: 'Raykor',
    company: 'Raykor Technologies',
    role: 'Software Engineer',
    period: 'Sep 2021 – Feb 2022',
    location: 'Remote',
    summary:
      'Delivered cloud migration and backend APIs with zero-downtime deployment practices.',
    achievements: [
      'Azure to GCP migration (zero downtime)',
      'REST APIs with Hapi.js',
      'Firebase authentication integration',
      'Automated deployment pipelines',
    ],
  },
  {
    id: 'nexsales',
    label: 'Nexsales',
    company: 'Nexsales Corporation',
    role: 'Software Engineer',
    period: 'Aug 2019 – Aug 2021',
    location: 'Remote',
    summary:
      'Built microservices, ML pipelines, and messaging systems while modernizing legacy applications.',
    achievements: [
      'Vue.js microservices dialer app',
      'ML pipeline (Python/TensorFlow)',
      'GCP pub/sub systems',
      'Legacy system modernization',
    ],
  },
]

const CareerRoleDetail = ({ role }: { role: CareerRole }) => (
  <div className="p-4 sm:p-5 lg:p-6">
    <div className="flex items-start gap-3 mb-4 pb-4 border-b border-slate-800/60">
      <div className="p-2 rounded-lg border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 shrink-0">
        <Building2 className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400/70 mb-1">
          // Active Role
        </p>
        <h3 className="text-xl sm:text-2xl font-bold text-cyan-300">{role.company}</h3>
        <p className="text-slate-300 text-sm sm:text-base mt-1">{role.role}</p>
        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500 font-mono">
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {role.period}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {role.location}
          </span>
        </div>
      </div>
    </div>

    <p className="text-sm text-slate-400 leading-relaxed mb-5">{role.summary}</p>

    <div className="flex items-center gap-2 mb-3">
      <Award className="w-4 h-4 text-cyan-400" />
      <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400/70">
        // Key Achievements
      </span>
    </div>
    <motion.ul
      className="space-y-2.5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06 } },
      }}
    >
      {role.achievements.map((achievement) => (
        <motion.li
          key={achievement}
          variants={{
            hidden: { opacity: 0, x: -10 },
            visible: { opacity: 1, x: 0 },
          }}
          className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed"
        >
          <TrendingUp className="w-4 h-4 mt-0.5 shrink-0 text-cyan-400/80" />
          <span>{achievement}</span>
        </motion.li>
      ))}
    </motion.ul>
  </div>
)

const CareerJourneySection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = careerData[activeIndex]
  const reducedMotion = usePrefersReducedMotion()

  return (
    <SectionShell id="career" contentClassName="max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="Professional Journey"
        title="Career Timeline"
        description="6.7+ years of innovation, leadership, and technical excellence"
        sysId="SYS.CAREER"
        typeTitle
        className="mb-8 md:mb-10"
      />

      <HudPanel
        moduleLabel="// Career Module"
        sysId="SYS.CAREER_LOG v1.0"
        badge={`${careerData.length} roles`}
        footer={
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] text-slate-600 uppercase tracking-widest">
              Timeline: 2019 → Present
            </span>
            <span className="font-mono text-[10px] text-cyan-400/50">
              {careerData.length} mission nodes
            </span>
          </div>
        }
      >
        {/* Mobile: stacked timeline cards */}
        <motion.div
          className="lg:hidden px-4 sm:px-5 py-5 space-y-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {careerData.map((role) => (
            <motion.div key={role.id} variants={fadeUpItem}>
              <HudCard className="overflow-hidden">
                <div className="px-4 pt-3 pb-1 border-b border-slate-800/60">
                  <span className="font-mono text-[10px] text-cyan-400/70 uppercase tracking-widest">
                    {role.period}
                  </span>
                </div>
                <CareerRoleDetail role={role} />
              </HudCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Desktop: split panel */}
        <div className="hidden lg:grid lg:grid-cols-[minmax(240px,34%)_1fr] min-h-[420px]">
          {/* Timeline nav */}
          <nav
            className="border-r border-slate-800/80 p-4 flex flex-col"
            aria-label="Career timeline navigation"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-400/60 mb-4 px-2">
              // Mission Log
            </p>
            <div className="relative flex-1">
              <div
                className="absolute left-[1.125rem] top-2 bottom-2 w-px bg-gradient-to-b from-cyan-500/40 via-cyan-400/20 to-transparent"
                aria-hidden
              />
              <ul className="space-y-2 relative">
                {careerData.map((role, index) => {
                  const isActive = activeIndex === index
                  return (
                    <li key={role.id}>
                      <button
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-current={isActive ? 'true' : undefined}
                        className={`relative w-full text-left pl-10 pr-3 py-3 rounded-lg border transition-colors ${
                          isActive
                            ? 'bg-cyan-500/10 border-cyan-400/40 text-cyan-100'
                            : 'border-transparent text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                        }`}
                      >
                        <span
                          className={`absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 ${
                            isActive
                              ? 'bg-cyan-400 border-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.6)]'
                              : 'bg-slate-900 border-slate-600'
                          }`}
                          aria-hidden
                        />
                        <span className="block font-mono text-[10px] text-slate-500 mb-0.5">
                          {role.period}
                        </span>
                        <span className="block font-semibold text-sm">{role.company}</span>
                        <span className="block text-xs text-slate-500 mt-0.5 truncate">{role.role}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </nav>

          {/* Detail panel */}
          <div className="bg-slate-950/20 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={reducedMotion ? false : panelEnter.initial}
                animate={panelEnter.animate}
                exit={reducedMotion ? undefined : panelEnter.exit}
                transition={panelEnter.transition}
              >
                <CareerRoleDetail role={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </HudPanel>
    </SectionShell>
  )
}

export default CareerJourneySection
