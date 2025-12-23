import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
}

const SEO = ({ 
  title = 'Manish Ukirade - Tech Lead | AI/ML Engineer | Cloud Architect',
  description = 'Senior Product Manager and Tech Lead with 6+ years of experience in building scalable, cloud-native enterprise platforms. Expert in AI/ML, NLP, LLM solutions, cloud architecture (AWS, Azure, GCP), and DevOps.',
  keywords = 'Manish Ukirade, Tech Lead, AI/ML Engineer, Cloud Architect, Node.js, Python, React, AWS, Azure, GCP, Docker, Kubernetes',
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

