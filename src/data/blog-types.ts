export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  author: string
  date: string
  readTime: string
  tags: string[]
  category: string
  seo: {
    metaDescription: string
    keywords: string
  }
}
