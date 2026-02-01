export interface BlogPost {
  slug: string
  title: string
  date: string
  tags: string[]
  preview: string
  ready: boolean
  content: string
}

// Simple frontmatter parser
function parseFrontmatter(markdown: string) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = markdown.match(frontmatterRegex)

  if (!match) {
    return { data: {}, content: markdown }
  }

  const frontmatter = match[1]
  const content = match[2]

  const data: Record<string, string> = {}
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length) {
      data[key.trim()] = valueParts.join(':').trim()
    }
  })

  return { data, content }
}

// Dynamically import all markdown files from content/blog
const markdownFiles = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
})

// Parse markdown files and extract metadata
export const blogPosts: BlogPost[] = Object.entries(markdownFiles)
  .map(([path, content]) => {
    const { data, content: markdownContent } = parseFrontmatter(content as string)
    const slug = path.split('/').pop()?.replace('.md', '') || ''

    if (data.ready === 'false') {
      return null
    }

    return {
      slug,
      title: data.title,
      date: data.date,
      tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
      preview: data.preview,
      ready: data.ready !== 'false',
      content: markdownContent
    }
  })
  .filter((post): post is BlogPost => post !== null)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug)
}
