import { useEffect, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  Briefcase,
  Check,
  Cloud,
  Code2,
  Database,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Network,
  Phone,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
  X,
} from 'lucide-react'
import SEO from './components/SEO'
import { RESUME_FILENAME, RESUME_PATH, SITE_EMAIL } from './config/site'

type Icon = LucideIcon

const recentWork: {
  date: string
  category: string
  title: string
  description: string
  detail: string
  icon: Icon
}[] = [
  {
    date: 'Nov 3—10',
    category: 'AI Chief of Staff & safeguards',
    title: 'Governed Kyara as a safe AI Chief of Staff.',
    description:
      'Evolved Kyara into 16 versioned specialist agents that connect engagement, goals, workload, policy, coaching, and rehearsal while enforcing scope, privacy thresholds, human approval, and evidence-grounded replies.',
    detail: 'Agent contracts · privacy gates · approval-bound writes · safety evals',
    icon: BrainCircuit,
  },
  {
    date: 'Nov 10',
    category: 'Multilingual AI safety',
    title: 'Kept manager guidance safe across languages.',
    description:
      'Added Azure Translator and a versioned translation-agent fallback for Indian-language guidance, preserving names, contacts, links, numbers, and approved content with automatic English fallback when integrity checks fail.',
    detail: 'Protected entities · glossary control · integrity checks · safe fallback',
    icon: ShieldCheck,
  },
  {
    date: 'Aug 17—18',
    category: 'Voice-first AI',
    title: 'Made Kyara easier to talk to.',
    description:
      'Added browser speech, voice commands, visible input feedback, helpfulness signals, and guided onboarding to the conversational experience.',
    detail: 'Speech UX · commands · feedback · product tours',
    icon: Sparkles,
  },
  {
    date: 'Aug 18—19',
    category: 'Decision intelligence',
    title: 'Made insight routing more dependable.',
    description:
      'Improved business-impact ranking, eNPS demographic routing, sticky filters, and evaluation coverage around intent and management insight workflows.',
    detail: 'Ranking · routing · evaluation · regression tests',
    icon: BrainCircuit,
  },
  {
    date: 'Aug 17—19',
    category: 'Enterprise administration',
    title: 'Put more control in the hands of admins.',
    description:
      'Shipped company administration, organisation reporting, tenant and SSO management, brand controls, and more resilient HRMS integration behaviour.',
    detail: 'Identity · tenancy · branding · HRMS reliability',
    icon: ShieldCheck,
  },
  {
    date: 'Aug 17—19',
    category: 'Reporting at scale',
    title: 'Expanded how leaders compare and share insight.',
    description:
      'Strengthened heatmap validation and PowerPoint generation, increased comparison breadth, and refined responsive qualitative and scorecard views.',
    detail: 'PPT reports · heatmaps · scorecards · comparison UX',
    icon: BarChart3,
  },
  {
    date: 'Aug 18',
    category: 'Autonomous growth tooling',
    title: 'Put routine SEO delivery on rails.',
    description:
      'Built an unattended workflow for code-draft pull requests and production promotion, alongside hreflang, heading, and contact-delivery fixes.',
    detail: 'Automation · pull requests · SEO · SendGrid',
    icon: Network,
  },
  {
    date: 'Aug 21',
    category: 'ML data integrity',
    title: 'Made prediction inputs safer to evolve.',
    description:
      'Added employee-key hashing and pair-level overrides to strengthen traceability and control inside the attrition prediction workflow.',
    detail: 'Key hashing · overrides · configuration · documentation',
    icon: Database,
  },
]

const selectedSystems = [
  {
    number: '01',
    category: 'AI Chief of Staff',
    title: 'Kyara Chief of Staff',
    description:
      'A governed AI Chief of Staff for managers that explains team signals, prepares coaching and 1:1 actions, and turns approved decisions into reliable goal and task workflows.',
    outcomes: [
      '16 versioned specialist agents with evidence and tool allowlists',
      'Code-enforced tenant, role, team, privacy, and sensitive-HR safeguards',
      'Exact-draft approval, idempotent writes, reviewer fallback, and a 177-case safety evaluation',
    ],
    stack: ['Python', 'LangGraph', 'MCP', 'FastAPI', 'Redis', 'Promptfoo', 'Azure OpenAI'],
    featured: true,
  },
  {
    number: '02',
    category: 'Conversational intelligence',
    title: 'Kyara AI Platform',
    description:
      'A production AI assistant that connects policy knowledge, employee intelligence, and analytics through evaluated conversational routing—not just a chat box.',
    outcomes: [
      'RAG policy search and multi-turn FAQ orchestration',
      'Voice interaction, intent recognition, and feedback loops',
      'Production retries, observability, and evaluation coverage',
    ],
    stack: ['Python', 'FastAPI', 'LangChain', 'ChromaDB', 'React', 'Azure'],
  },
  {
    number: '03',
    category: 'Personal AI product',
    title: 'Tiknod — Safe SEO Delivery',
    description:
      'A local-first AI-assisted delivery platform that moves SEO and accessibility changes from evidence to client approval, deployment, public verification, reporting, and safe rollback across multiple web stacks.',
    outcomes: [
      'The AI drafts and checks; only authorised people can send, approve, publish, or roll back',
      'Version hashes, conflict checks, idempotency, read-back verification, receipts, and append-only audit history',
      'Tenant isolation and SSRF, DNS-rebinding, redirect, credential, and emergency stop controls',
    ],
    stack: ['Python', 'FastAPI', 'Ollama', 'PostgreSQL', 'WordPress', 'Next.js', 'React', 'Git'],
  },
  {
    number: '04',
    category: 'Enterprise data product',
    title: 'Survey Intelligence',
    description:
      'A connected insight layer for qualitative themes, scorecards, heatmaps, demographic comparison, action planning, and stakeholder-ready exports.',
    outcomes: ['LLM concurrency controls', 'Comparative sentiment views', 'Heatmap and PowerPoint delivery'],
    stack: ['Node.js', 'Fastify', 'Python', 'React', 'MySQL'],
  },
  {
    number: '05',
    category: 'Platform engineering',
    title: 'Enterprise Access & Operations',
    description:
      'Identity, cloud, messaging, administration, and compliance systems that let AI products work inside real enterprise boundaries.',
    outcomes: ['SSO and SAML across client tenants', 'Zero-downtime cloud migration', 'SOC 2, CyberCube, and VPAT readiness'],
    stack: ['Azure', 'Docker', 'SAML', 'Teams', 'CI/CD', 'Nginx'],
  },
  {
    number: '06',
    category: 'Production machine learning',
    title: 'Attrition Prediction',
    description:
      'An early-warning model that turns engineered employee signals into explainable retention risk, supported by disciplined data controls.',
    outcomes: ['122 engineered features', '83.48% model accuracy', '82% recall for at-risk employees'],
    stack: ['Python', 'CatBoost', 'Feature Engineering', 'MLOps'],
  },
]

const career = [
  {
    period: 'Mar 2026—Present',
    role: 'AI/ML Engineer',
    company: 'W.E. Matter',
    summary:
      'Building Kyara Chief of Staff, governed multi-agent workflows, production RAG, AI safeguards, evaluations, and enterprise integrations.',
  },
  {
    period: 'Apr 2023—Feb 2026',
    role: 'Tech Lead',
    company: 'W.E. Matter',
    summary:
      'Led enterprise SaaS, cloud infrastructure, client integrations, security, compliance, and engineering delivery across a multi-product platform.',
  },
  {
    period: 'Feb 2022—Mar 2023',
    role: 'Software Engineer — Full Stack & DevOps',
    company: 'BizPilot.in',
    summary:
      'Led the V2 platform rebuild, financial automation, deployment pipelines, and production infrastructure on AWS.',
  },
  {
    period: 'Sep 2021—Feb 2022',
    role: 'Software Engineer — Cloud Migration',
    company: 'Raykor Technologies',
    summary:
      'Migrated systems serving 50,000+ users from Azure to GCP with zero downtime and built secure Hapi.js APIs.',
  },
  {
    period: 'Aug 2019—Aug 2021',
    role: 'Software Engineer — Platform & ML',
    company: 'Nexsales Corporation',
    summary:
      'Built a Vue.js dialer platform, TensorFlow text-classification pipelines, and the underlying GCP infrastructure.',
  },
]

const skillGroups: { icon: Icon; title: string; description: string; items: string[] }[] = [
  {
    icon: Sparkles,
    title: 'AI systems',
    description: 'Retrieval, orchestration, evaluation, and applied machine learning.',
    items: ['RAG', 'LangGraph', 'MCP', 'LangChain', 'Promptfoo', 'ChromaDB', 'NLP', 'MLflow'],
  },
  {
    icon: Code2,
    title: 'Product engineering',
    description: 'End-to-end application delivery across APIs and interfaces.',
    items: ['Python', 'FastAPI', 'Node.js', 'TypeScript', 'Fastify', 'React', 'Vue.js', 'WebSockets'],
  },
  {
    icon: Cloud,
    title: 'Cloud & platform',
    description: 'Reliable delivery across the infrastructure underneath the product.',
    items: ['Azure', 'AWS', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Nginx', 'Linux'],
  },
  {
    icon: ShieldCheck,
    title: 'AI security & enterprise delivery',
    description: 'The safeguards, identity, security, and governance details real adoption depends on.',
    items: ['AI Safety', 'Human Approval', 'RBAC', 'Tenant Isolation', 'Audit Trails', 'SSRF Defence', 'SSO', 'SAML', 'SOC 2', 'VAPT'],
  },
]

const navItems = [
  { label: 'Recent work', href: '#impact' },
  { label: 'Systems', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
]

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="page-shell nav-shell">
        <a className="brand" href="#top" aria-label="Manish Ukirade — back to top">
          <span className="brand-mark" aria-hidden="true">MU</span>
          <span className="brand-copy"><strong>Manish Ukirade</strong><small>AI systems, built for production.</small></span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>

        <div className="nav-actions">
          <a className="resume-link" href={RESUME_PATH} download={RESUME_FILENAME}><Download size={15} aria-hidden /> Resume</a>
          <button
            className="menu-button"
            type="button"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
          {navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
          <a href={RESUME_PATH} download={RESUME_FILENAME} onClick={() => setOpen(false)}>Download resume</a>
        </nav>
      )}
    </header>
  )
}

function SectionIntro({ index, eyebrow, title, copy }: { index: string; eyebrow: string; title: string; copy: string }) {
  return (
    <div className="section-intro">
      <p className="eyebrow"><span>{index}</span>{eyebrow}</p>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  )
}

function TechnologyCore() {
  return (
    <aside className="technology-core" aria-label="Technology evolution from signal to production system">
      <div className="technology-core__topline">
        <span><i /> System online</span>
        <span>Evolution engine / 2026</span>
      </div>
      <div className="core-scene" aria-hidden="true">
        <div className="core-grid" />
        <div className="core-halo core-halo--outer"><i /><i /><i /></div>
        <div className="core-halo core-halo--middle"><i /><i /></div>
        <div className="core-halo core-halo--inner" />
        <div className="core-sphere"><span>MU</span></div>
        <div className="core-node core-node--signal"><span>01</span>Signal</div>
        <div className="core-node core-node--intelligence"><span>02</span>Intelligence</div>
        <div className="core-node core-node--scale"><span>03</span>Scale</div>
      </div>
      <div className="technology-core__footer">
        <div><span>Current</span><strong>W.E. Matter</strong></div>
        <div><span>Focus</span><strong>Production AI</strong></div>
        <div><span>Mode</span><strong>Build → Scale</strong></div>
      </div>
    </aside>
  )
}

function App() {
  return (
    <>
      <SEO />
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />

      <main id="main">
        <section className="hero hero--future" id="top">
          <div className="hero-orbit" aria-hidden="true" />
          <div className="page-shell hero-grid">
            <div className="hero-copy">
              <p className="hero-kicker"><span>Manish Ukirade</span><span>AI / Full-stack / Cloud</span></p>
              <h1>Engineering the next evolution of <em>intelligent systems.</em></h1>
              <p className="hero-lede">
                From raw signal to governed agentic decisions to enterprise scale—I build AI products that move beyond prototypes and operate in the real world.
              </p>
              <div className="hero-actions">
                <a className="button button--solid" href="#work">Explore selected systems <ArrowRight size={17} aria-hidden /></a>
                <a className="button button--outline" href={RESUME_PATH} download={RESUME_FILENAME}><Download size={17} aria-hidden /> Download resume</a>
              </div>
              <p className="hero-proof"><strong>7 years</strong> evolving ideas across the intelligence layer, product surface, and platform underneath.</p>
            </div>
            <TechnologyCore />
          </div>
        </section>

        <section className="chapter-section" id="impact">
          <div className="page-shell">
            <div className="section-heading-layout">
              <SectionIntro
                index="01"
                eyebrow="Evolution log"
                title="From interaction to intelligence to enterprise scale."
                copy="A focused view of how the W.E. Matter platform evolved across voice UX, decision systems, administration, reporting, automation, and ML integrity."
              />
            </div>

            <div className="evolution-rail" aria-label="Technology evolution path">
              <div><span>01</span><strong>Signal</strong><small>Voice + data</small></div>
              <i aria-hidden="true" />
              <div><span>02</span><strong>Intelligence</strong><small>Routing + models</small></div>
              <i aria-hidden="true" />
              <div><span>03</span><strong>Experience</strong><small>Useful interfaces</small></div>
              <i aria-hidden="true" />
              <div><span>04</span><strong>Scale</strong><small>Enterprise systems</small></div>
            </div>

            <div className="recent-work-grid">
              {recentWork.map((item, index) => (
                <article className="recent-card" key={item.title}>
                  <div className="recent-card__meta"><span>{String(index + 1).padStart(2, '0')}</span><time>{item.date}</time></div>
                  <item.icon className="recent-card__icon" size={23} aria-hidden />
                  <p className="recent-card__category">{item.category}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className="recent-card__detail">{item.detail}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="chapter-section chapter-section--green" id="work">
          <div className="page-shell">
            <SectionIntro
              index="02"
              eyebrow="Selected systems"
              title="Systems with a reason to exist."
              copy="The best engineering combines product usefulness, technical depth, and the operational detail required to survive real enterprise environments."
            />

            <div className="systems-grid">
              {selectedSystems.map((project) => (
                <article className={`system-card ${project.featured ? 'system-card--featured' : ''}`} key={project.title}>
                  <div className="system-card__top"><span>{project.number}</span><span>{project.category}</span></div>
                  <div className="system-card__body">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <ul>
                      {project.outcomes.map((outcome) => <li key={outcome}><Check size={15} aria-hidden />{outcome}</li>)}
                    </ul>
                  </div>
                  <div className="system-card__stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="chapter-section" id="experience">
          <div className="page-shell experience-layout">
            <div className="experience-intro">
              <SectionIntro
                index="03"
                eyebrow="Career evolution"
                title="Technology evolves. So does the engineer."
                copy="Seven years of increasing scope across product engineering, ML, cloud migration, DevOps, enterprise delivery, and AI leadership."
              />
              <div className="scope-note"><Briefcase size={21} aria-hidden /><p><strong>Current scope</strong>Architecture, product delivery, infrastructure, security, compliance, and client integrations.</p></div>
            </div>

            <div className="timeline">
              {career.map((role, index) => (
                <article className="timeline-item" key={role.company}>
                  <div className="timeline-index">{String(index + 1).padStart(2, '0')}</div>
                  <div className="timeline-body">
                    <p className="timeline-period">{role.period}</p>
                    <h3>{role.role}</h3>
                    <p className="timeline-company">{role.company}</p>
                    <p>{role.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="chapter-section chapter-section--paper" id="stack">
          <div className="page-shell">
            <SectionIntro
              index="04"
              eyebrow="System layers"
              title="A stack built across layers—not silos."
              copy="I work across the intelligence layer, product experience, platform, and enterprise controls—because production problems rarely stay inside one box."
            />
            <div className="skills-grid">
              {skillGroups.map((group) => (
                <article className="skill-card" key={group.title}>
                  <div className="skill-card__heading"><group.icon size={21} aria-hidden /><h3>{group.title}</h3></div>
                  <p>{group.description}</p>
                  <div className="skill-list">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="page-shell contact-grid">
            <div>
              <p className="contact-kicker">05 / Initiate the next system</p>
              <h2>Ready to move an intelligent product into production?</h2>
              <p>Let’s talk about AI platforms, full-stack product delivery, cloud modernisation, or enterprise engineering leadership.</p>
            </div>
            <div className="contact-actions">
              <a className="button button--cream" href={`mailto:${SITE_EMAIL}`}><Mail size={17} aria-hidden /> Email Manish</a>
              <a className="button button--contact-outline" href={RESUME_PATH} download={RESUME_FILENAME}><Download size={17} aria-hidden /> Resume</a>
              <div className="social-links" aria-label="Professional profiles">
                <a href="https://www.linkedin.com/in/manish-ukirade-13b866124/" target="_blank" rel="noreferrer"><Linkedin size={18} aria-hidden /><span>LinkedIn</span><ArrowUpRight size={14} aria-hidden /></a>
                <a href="https://github.com/manishukirade" target="_blank" rel="noreferrer"><Github size={18} aria-hidden /><span>GitHub</span><ArrowUpRight size={14} aria-hidden /></a>
                <a href="tel:+918691983106"><Phone size={18} aria-hidden /><span>+91 86919 83106</span></a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-shell footer-inner">
          <div><strong>Manish Ukirade</strong><span>Senior AI & Full-Stack Engineer</span></div>
          <p><MapPin size={14} aria-hidden /> Thane, India</p>
          <a href="#top">Back to top <ArrowUpRight size={14} aria-hidden /></a>
        </div>
      </footer>
    </>
  )
}

export default App
