import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'

const projects = [
  {
    id: 1,
    title: 'KYARA - AI-Enabled HR Consultant',
    description: 'Developed and launched an AI-enabled HR consultant leveraging NLP and LLM capabilities. Autonomously runs surveys, provides analytics-driven insights, generates strategic recommendations, and acts as a conversational advisor for HR and leadership.',
    tech: ['NLP', 'LLM', 'Python', 'Conversational AI', 'RASA'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 2,
    title: 'Enterprise Employee Engagement Platform',
    description: 'Architected and launched an enterprise-grade employee engagement platform, successfully delivering robust functionality to diverse enterprise clients across various industries. Drove sustained revenue growth of nearly 2X year-over-year.',
    tech: ['Node.js', 'React', 'MySQL', 'Redis', 'Docker'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 3,
    title: 'Performance Management System (PMS)',
    description: 'Spearheaded the end-to-end design and development of a comprehensive Performance Management System platform, delivering critical HR functionality and streamlining performance evaluation processes for NBFC customers.',
    tech: ['Node.js', 'React', 'PostgreSQL', 'TypeScript'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 4,
    title: 'Financial Automation Engine',
    description: 'Built a financial automation engine that reduced compliance processing time by approximately 200%, significantly enhancing operational efficiency and reducing manual effort in financial compliance workflows.',
    tech: ['Node.js', 'Python', 'Automation', 'CI/CD'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 5,
    title: 'ML Pipeline for Text Categorization',
    description: 'Designed and implemented a scalable ML pipeline using Python & TensorFlow for text categorization and classification tasks, enabling advanced data analysis and automated text processing.',
    tech: ['Python', 'TensorFlow', 'MLOps', 'NLP'],
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 6,
    title: 'Cloud Migration - AWS to Azure',
    description: 'Orchestrated and executed a complete application migration from AWS to Azure within 15 days, ensuring zero downtime and maintaining stringent security standards, resulting in significant cost efficiencies.',
    tech: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    github: 'https://github.com',
    live: 'https://example.com',
  },
]

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 px-4 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            A collection of my recent work showcasing AI/ML solutions, enterprise platforms, and cloud architecture expertise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
