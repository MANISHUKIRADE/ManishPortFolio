import { Bot, Brain, Cloud, Code2, Link2, Shield } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import SectionShell from './ui/SectionShell'
import HudCard from './ui/HudCard'

const capabilities = [
  {
    icon: Brain,
    title: 'Generative AI & RAG',
    description:
      'Production RAG pipelines using LangChain, ChromaDB, and LLMs. Built Kyara — a conversational AI HR platform serving 10+ enterprise clients with policy Q&A, adaptive surveys, and employee intelligence.',
  },
  {
    icon: Bot,
    title: 'Agentic AI Systems',
    description:
      'Multi-agent architectures with tool calling, reflection patterns, and orchestration. LLMs that decide, act, and self-correct — not just respond.',
  },
  {
    icon: Code2,
    title: 'Full-Stack Engineering',
    description:
      'End-to-end platforms with React, Node.js, TypeScript, and Python. From architecture to production deployment with real enterprise clients.',
  },
  {
    icon: Cloud,
    title: 'Cloud & Infrastructure',
    description:
      'Multi-cloud — Azure (deep), GCP, AWS. Zero-downtime migrations, Docker Swarm, Kubernetes, CI/CD. Full DevOps ownership across 8+ production applications.',
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description:
      'SOC 2 Type II, CyberCube certified, VPAT compliance — led independently. Single low-severity finding on full infrastructure audit.',
  },
  {
    icon: Link2,
    title: 'Enterprise Integrations',
    description:
      'Azure AD, ADFS, SSO, SAML for 5+ enterprise clients. Microsoft Teams marketplace publishing, OAuth 2.0, enterprise identity federation.',
  },
]

const CapabilitiesSection = () => {
  return (
    <SectionShell id="capabilities" py="py-16 md:py-20" contentClassName="max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="Production Systems"
        title="Production AI & Engineering Capabilities"
        description="Generative AI, RAG, cloud infrastructure, and enterprise compliance — shipped for 10+ clients in production."
        sysId="SYS.CAPABILITIES"
        typeTitle
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {capabilities.map((item) => (
          <HudCard key={item.title} className="p-5 h-full">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400/60 mb-3">
              // Module
            </p>
            <div className="mb-4 inline-flex p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <item.icon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
          </HudCard>
        ))}
      </div>
    </SectionShell>
  )
}

export default CapabilitiesSection
