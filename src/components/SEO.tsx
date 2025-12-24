import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
}

const SEO = ({ 
  title = 'Manish Ukirade - Fullstack Web Developer | AI/ML Engineer | Tech Lead',
  description = 'Fullstack Web Developer and AI/ML Engineer with 6+ years of experience building scalable web applications and AI-powered solutions. Expert in Node.js, React, Python, AI/ML, NLP, LLM, cloud architecture (AWS, Azure, GCP), and modern web technologies.',
  keywords = 'Manish Ukirade, Fullstack Web Developer, Full Stack Developer, AI/ML Engineer, Machine Learning, Artificial Intelligence, Web Development, Node.js, React, Python, TypeScript, JavaScript, AI HR Consultant, NLP, LLM, AWS, Azure, GCP, Docker, Kubernetes, Fullstack Development, MERN Stack, MEAN Stack',
  image = 'https://manish-port-folio.vercel.app/og-image.jpg',
  url = 'https://manish-port-folio.vercel.app'
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = title

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.appendChild(element)
      }
      element.content = content
    }

    // Update meta tags
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)
    updateMetaTag('og:title', title, 'property')
    updateMetaTag('og:description', description, 'property')
    updateMetaTag('og:image', image, 'property')
    updateMetaTag('og:url', url, 'property')
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', image)

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
  }, [title, description, keywords, image, url])

  return null
}

export default SEO

