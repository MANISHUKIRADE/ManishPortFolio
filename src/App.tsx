import { useEffect, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  BrainCircuit,
  Briefcase,
  CalendarDays,
  Check,
  Cloud,
  Code2,
  Database,
  Download,
  Github,
  Layers3,
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

const metrics = [
  { value: '7+', label: 'Years in production engineering' },
  { value: '10+', label: 'Enterprise client deployments' },
  { value: '20', label: 'Active codebases, May-Aug 2026' },
  { value: '492', label: 'Substantive commits in 3 months' },
]

const impactAreas: { icon: Icon; kicker: string; title: string; description: string; proof: string }[] = [
  {
    icon: BrainCircuit,
    kicker: 'Generative AI',
    title: 'Made KYARA more capable and more reliable',
    description:
      'Expanded intent recognition, scoped conversational routing, multi-turn FAQ orchestration, chart insights, heatmaps, and retry-aware chat experiences.',
    proof: 'RAG + LLM orchestration + evaluation',
  },
  {
    icon: BarChart3,
    kicker: 'Insight systems',
    title: 'Turned survey data into decisions',
    description:
      'Built qualitative comment summaries, comparative sentiment views, scorecards, theme matrices, action-plan APIs, and production export workflows.',
    proof: 'Frontend + backend + AI pipeline',
  },
  {
    icon: Network,
    kicker: 'Enterprise integration',
    title: 'Connected the systems around the product',
    description:
      'Shipped HRMS attendance connectors, Microsoft Teams Adaptive Cards and bot security, and stronger WhatsApp delivery and queue processing.',
    proof: 'Teams + HRMS + messaging reliability',
  },
  {
    icon: Layers3,
    kicker: 'Delivery breadth',
    title: 'Worked across the full engineering surface',
    description:
      'Delivered across frontend, backend, traditional machine learning, Generative AI, infrastructure, product UX, and client-facing operations.',
    proof: '20 active codebases across 4 functions',
  },
]

const caseStudies = [
  {
    number: '01',
    label: 'Flagship platform',
    title: 'KYARA Intelligence Platform',
    description:
      'A production HR intelligence system combining RAG policy search, conversational analytics, intent routing, adaptive experiences, and enterprise deployment requirements.',
    outcomes: ['Deployed across 10+ enterprise clients', 'Policy Q&A, employee intelligence, and analytics', 'Production-grade error handling and evaluation'],
    stack: ['Python', 'FastAPI', 'LangChain', 'ChromaDB', 'React', 'Azure'],
    featured: true,
  },
  {
    number: '02',
    label: 'Data product',
    title: 'Survey & Qualitative Intelligence',
    description:
      'A connected reporting layer for scorecards, comparison dashboards, comment summarization, theme matrices, response integrity, and stakeholder-ready exports.',
    outcomes: ['LLM concurrency controls', 'Comparative sentiment analysis', 'Action-plan and export workflows'],
    stack: ['Node.js', 'Fastify', 'Python', 'React', 'MySQL'],
  },
  {
    number: '03',
    label: 'Platform engineering',
    title: 'Enterprise Reliability & Integrations',
    description:
      'Cloud, identity, messaging, and compliance work that made product adoption possible inside complex enterprise environments.',
    outcomes: ['AWS to Azure in 15 days, zero downtime', 'SSO/SAML for 5+ clients', 'SOC 2 Type II, CyberCube, and VPAT'],
    stack: ['Azure', 'Docker', 'Nginx', 'SAML', 'Teams', 'CI/CD'],
  },
  {
    number: '04',
    label: 'Production ML',
    title: 'Employee Attrition Prediction',
    description:
      'An early-warning model for employee retention using engineered survey signals and production-ready model evaluation.',
    outcomes: ['122 engineered features', '83.48% accuracy', '82% recall for at-risk employees'],
    stack: ['Python', 'CatBoost', 'Feature Engineering', 'MLOps'],
  },
]

const career = [
  {
    period: 'Apr 2023 - Present',
    role: 'Senior AI & Full-Stack Engineer / Tech Lead',
    company: 'W.E. Matter',
    summary:
      'Leading production AI, enterprise SaaS, cloud infrastructure, integrations, and compliance delivery across a multi-product engineering surface.',
  },
  {
    period: 'Feb 2022 - Mar 2023',
    role: 'Software Engineer - Full Stack & DevOps',
    company: 'BizPilot.in',
    summary:
      'Led the V2 platform rebuild, financial automation, deployment pipelines, and production infrastructure on AWS.',
  },
  {
    period: 'Sep 2021 - Feb 2022',
    role: 'Software Engineer - Cloud Migration',
    company: 'Raykor Technologies',
    summary:
      'Migrated systems serving 50,000+ users from Azure to GCP with zero downtime and built secure Hapi.js APIs.',
  },
  {
    period: 'Aug 2019 - Aug 2021',
    role: 'Software Engineer - Platform & ML',
    company: 'Nexsales Corporation',
    summary:
      'Built a Vue.js dialer platform, TensorFlow text-classification pipelines, and the underlying GCP infrastructure.',
  },
]

const skillGroups: { icon: Icon; title: string; items: string[] }[] = [
  {
    icon: Sparkles,
    title: 'Generative AI',
    items: ['RAG', 'LangChain', 'ChromaDB', 'Embeddings', 'Prompt Engineering', 'OpenAI API', 'Groq', 'Hugging Face'],
  },
  {
    icon: BrainCircuit,
    title: 'ML & Data',
    items: ['TensorFlow', 'CatBoost', 'NLP', 'Sentiment Analysis', 'Feature Engineering', 'MLflow', 'Model Evaluation'],
  },
  {
    icon: Code2,
    title: 'Product Engineering',
    items: ['Python', 'FastAPI', 'Node.js', 'TypeScript', 'Fastify', 'React', 'Vue.js', 'REST APIs'],
  },
  {
    icon: Cloud,
    title: 'Cloud & Platform',
    items: ['Azure', 'AWS', 'GCP', 'Docker', 'Kubernetes', 'Docker Swarm', 'CI/CD', 'Nginx', 'Linux'],
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise Delivery',
    items: ['SOC 2 Type II', 'VAPT', 'VPAT', 'Azure AD', 'ADFS', 'SSO', 'SAML', 'OAuth 2.0', 'Microsoft Teams'],
  },
  {
    icon: Database,
    title: 'Data & Infrastructure',
    items: ['MySQL', 'PostgreSQL', 'Redis', 'Firebase', 'Jenkins', 'GitHub Actions', 'WebSockets', 'Microservices'],
  },
]

const navItems = [
  { label: 'Impact', href: '#impact' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
]

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="nav-shell">
        <a className="brand" href="#top" aria-label="Manish Ukirade - back to top">
          <span className="brand-mark" aria-hidden="true">MU</span>
          <span className="brand-copy">
            <strong>Manish Ukirade</strong>
            <small>AI & Full-Stack Engineer</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>

        <div className="nav-actions">
          <a className="button button--compact button--light" href={RESUME_PATH} download={RESUME_FILENAME}>
            <Download size={15} aria-hidden /> Resume
          </a>
          <button
            className="menu-button"
            type="button"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
          ))}
          <a href={RESUME_PATH} download={RESUME_FILENAME} onClick={() => setOpen(false)}>Download resume</a>
        </nav>
      )}
    </header>
  )
}

function SectionIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="section-intro">
      <p className="eyebrow"><span />{eyebrow}</p>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  )
}

function SystemMap() {
  return (
    <div className="system-card" aria-label="Production AI delivery system overview">
      <div className="system-card__topline">
        <span><i /> In production</span>
        <span>W.E. MATTER / TECH LEAD</span>
      </div>
      <div className="system-map">
        <span className="map-line map-line--one" aria-hidden />
        <span className="map-line map-line--two" aria-hidden />
        <span className="map-line map-line--three" aria-hidden />
        <div className="map-node map-node--core">
          <Bot size={28} aria-hidden />
          <strong>Production AI</strong>
          <small>Architecture to delivery</small>
        </div>
        <div className="map-node map-node--rag"><Sparkles size={18} aria-hidden /><span>RAG + LLM</span></div>
        <div className="map-node map-node--ml"><BarChart3 size={18} aria-hidden /><span>ML + Insights</span></div>
        <div className="map-node map-node--cloud"><Cloud size={18} aria-hidden /><span>Cloud + Security</span></div>
      </div>
      <div className="system-card__footer">
        <div><strong>10+</strong><span>enterprise clients</span></div>
        <div><strong>8+</strong><span>production apps</span></div>
        <div><strong>3</strong><span>cloud platforms</span></div>
      </div>
    </div>
  )
}

function App() {
  return (
    <>
      <SEO />
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-glow" aria-hidden />
          <div className="page-shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span />Senior AI & Full-Stack Engineer · Thane, India</p>
              <h1>Production AI.<br /><em>Built to hold up.</em></h1>
              <p className="hero-lede">
                I build Generative AI, RAG, machine-learning, and enterprise platforms from first architecture to secure production delivery.
              </p>
              <div className="hero-actions">
                <a className="button button--primary" href="#work">Explore selected work <ArrowRight size={17} aria-hidden /></a>
                <a className="button button--ghost" href={RESUME_PATH} download={RESUME_FILENAME}><Download size={17} aria-hidden /> Download resume</a>
              </div>
              <div className="hero-note">
                <span className="status-dot" aria-hidden />
                <span>Currently leading production AI and platform engineering at W.E. Matter</span>
              </div>
            </div>
            <SystemMap />
          </div>
        </section>

        <section className="metrics" aria-label="Career highlights">
          <div className="page-shell metrics-grid">
            {metrics.map((metric) => (
              <div className="metric" key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="impact">
          <div className="page-shell">
            <div className="section-heading-row">
              <SectionIntro
                eyebrow="Latest engineering impact"
                title="Three months. Four engineering surfaces. One connected platform."
                copy="A practical snapshot of recent W.E. Matter delivery, based on repository activity from May 14 to August 14, 2026."
              />
              <div className="evidence-pill"><CalendarDays size={16} aria-hidden /> 492 substantive commits · 20 codebases</div>
            </div>

            <div className="impact-grid">
              {impactAreas.map((item) => (
                <article className="impact-card" key={item.title}>
                  <div className="icon-tile"><item.icon size={22} aria-hidden /></div>
                  <p className="card-kicker">{item.kicker}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className="proof-line">{item.proof}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--tinted" id="work">
          <div className="page-shell">
            <SectionIntro
              eyebrow="Selected work"
              title="Systems with a reason to exist."
              copy="The strongest work combines product usefulness, technical depth, and the operational details required to survive real enterprise environments."
            />

            <div className="case-grid">
              {caseStudies.map((project) => (
                <article className={`case-card ${project.featured ? 'case-card--featured' : ''}`} key={project.title}>
                  <div className="case-card__header">
                    <span className="case-number">{project.number}</span>
                    <span className="case-label">{project.label}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul>
                    {project.outcomes.map((outcome) => <li key={outcome}><Check size={15} aria-hidden />{outcome}</li>)}
                  </ul>
                  <div className="tag-list">
                    {project.stack.map((item) => <span key={item}>{item}</span>)}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="experience">
          <div className="page-shell experience-layout">
            <div className="experience-copy">
              <SectionIntro
                eyebrow="Career"
                title="A builder's path into engineering leadership."
                copy="Seven years of increasing scope: platform engineering, production ML, cloud migrations, DevOps ownership, enterprise delivery, and AI product leadership."
              />
              <div className="experience-callout">
                <Briefcase size={20} aria-hidden />
                <p><strong>Current scope</strong> Architecture, product delivery, infrastructure, security, compliance, and client integrations.</p>
              </div>
            </div>

            <div className="timeline">
              {career.map((role, index) => (
                <article className="timeline-item" key={role.company}>
                  <div className="timeline-marker"><span>{String(index + 1).padStart(2, '0')}</span></div>
                  <div>
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

        <section className="section section--tinted" id="stack">
          <div className="page-shell">
            <SectionIntro
              eyebrow="Technical stack"
              title="Deep enough to build it. Broad enough to ship it."
              copy="My work spans the AI layer, the product surface, the platform underneath it, and the enterprise controls around it."
            />
            <div className="skills-grid">
              {skillGroups.map((group) => (
                <article className="skill-card" key={group.title}>
                  <div className="skill-card__heading"><group.icon size={20} aria-hidden /><h3>{group.title}</h3></div>
                  <div className="skill-list">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="page-shell contact-card">
            <div>
              <p className="eyebrow"><span />Let’s build something useful</p>
              <h2>Need an engineer who can connect AI ambition to production reality?</h2>
              <p>Let’s talk about AI platforms, full-stack product delivery, cloud modernization, or enterprise engineering leadership.</p>
            </div>
            <div className="contact-actions">
              <a className="button button--primary" href={`mailto:${SITE_EMAIL}`}><Mail size={17} aria-hidden /> Email me</a>
              <a className="button button--ghost" href={RESUME_PATH} download={RESUME_FILENAME}><Download size={17} aria-hidden /> Resume</a>
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
          <p><MapPin size={14} aria-hidden /> Thane, India · Built for clarity, speed, and accessibility.</p>
        </div>
      </footer>
    </>
  )
}

export default App
