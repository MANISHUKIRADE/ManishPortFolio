import { motion } from 'framer-motion'
import { Bot, Brain, Cloud, Code2, Link2, Shield } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import HolographicGrid from './animations/HolographicGrid'
import CssStarfield from './ui/CssStarfield'

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
    <section id="capabilities" className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-nexus-950" />
      <CssStarfield />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,211,238,0.12),transparent)] pointer-events-none" />
      <HolographicGrid spacing={48} color="#22d3ee" opacity={0.04} />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          eyebrow="Production Systems"
          title="Production AI & Engineering Capabilities"
          description="Generative AI, RAG, cloud infrastructure, and enterprise compliance — shipped for 10+ clients in production."
          typeTitle
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-md p-6 hover:border-cyan-500/40 transition-colors duration-300"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-cyan-500/5 to-transparent" />
              <div className="relative z-10">
                <div className="mb-4 inline-flex p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CapabilitiesSection
