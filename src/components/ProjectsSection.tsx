import ProjectCard from './ProjectCard'
import SectionHeader from './ui/SectionHeader'
import SectionShell from './ui/SectionShell'

const projects = [
  {
    id: 1,
    title: 'KYARA — Production Generative AI HR Platform',
    description:
      'Built an end-to-end Generative AI platform for HR intelligence. Features: RAG-based HR Policy Q&A using LangChain and ChromaDB, Conversational Employee Intelligence with sliding window memory, and Adaptive Survey Intelligence with LLM-driven dynamic branching. Deployed across 10+ enterprise clients on Azure.',
    tech: ['Python', 'LangChain', 'ChromaDB', 'LLMs', 'RAG', 'FastAPI', 'NLP', 'Prompt Engineering', 'Azure'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 2,
    title: 'Enterprise Employee Engagement SaaS Platform',
    description:
      'Architected and shipped a multi-tenant enterprise engagement platform from scratch. Served enterprise clients across India and Middle East. Drove 2× YoY revenue growth over 2.5 years. SOC 2 Type II, CyberCube, and VPAT certified on this infrastructure.',
    tech: ['Node.js', 'React', 'MySQL', 'Redis', 'Docker Swarm', 'Azure'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 3,
    title: 'Employee Attrition Prediction — Production ML',
    description:
      'Built a CatBoost model predicting employee attrition with 83.48% accuracy. Engineered 122 features from survey data. Achieved 82% recall identifying employees at risk of leaving. Deployed as early warning system for proactive HR retention strategy.',
    tech: ['Python', 'CatBoost', 'Feature Engineering', 'MLOps', 'HR Analytics'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 4,
    title: 'AWS to Azure Migration — Zero Downtime',
    description:
      'Orchestrated complete production migration from AWS to Azure in 15 days with zero downtime. Maintained 99.9% uptime throughout. Achieved 30% infrastructure cost reduction post-migration. Full containerisation with Docker and Kubernetes.',
    tech: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Nginx'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 5,
    title: 'SOC 2 Type II + CyberCube + VPAT — Compliance Engineering',
    description:
      'Led three enterprise compliance certifications independently — SOC 2 Type II, CyberCube cyber risk, and VPAT accessibility. Policy drafting, VAPT execution, vendor assessments, audit coordination. Single low-severity Nginx finding on full scan.',
    tech: ['Azure', 'Nginx', 'VAPT', 'Security Hardening', 'Documentation'],
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
    github: 'https://github.com',
    live: 'https://example.com',
  },
]

const ProjectsSection = () => {
  return (
    <SectionShell id="projects" py="py-16 md:py-20" contentClassName="max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="Selected Work"
        title="Featured Projects"
        description="Production Generative AI, enterprise SaaS, ML systems, cloud migrations, and compliance engineering."
        sysId="SYS.PROJECTS"
        typeTitle
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </SectionShell>
  )
}

export default ProjectsSection
