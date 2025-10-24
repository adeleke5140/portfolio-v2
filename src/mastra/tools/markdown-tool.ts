import { createTool } from '@mastra/core/tools'
import { z } from 'zod'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Handle both regular execution and Mastra playground execution
const getProjectRoot = () => {
  const cwd = process.cwd()
  // If we're in .mastra/output, navigate up to project root
  if (cwd.includes('.mastra/output')) {
    return cwd.split('.mastra/output')[0]
  }
  return cwd
}

const POSTS_DIRECTORY = path.join(getProjectRoot(), 'src/app/blog/posts')

export const readBlogPostTool = createTool({
  id: 'read-blog-post',
  description:
    "Reads blog post content from Kenny's portfolio. If no slug is provided, returns a list of all available posts. If a slug is provided, returns the full content and metadata of that specific post.",
  inputSchema: z.object({
    slug: z
      .string()
      .optional()
      .describe(
        'The slug of the blog post to read (e.g., "what-i-know-so-far-about-typography"). If not provided, returns list of all posts.'
      )
      .default('all'),
  }),
  outputSchema: z.object({
    posts: z
      .array(
        z.object({
          slug: z.string(),
          title: z.string(),
          description: z.string().optional(),
          date: z.string(),
          status: z.string(),
        })
      )
      .optional(),
    content: z.string().optional(),
    metadata: z
      .object({
        title: z.string(),
        description: z.string().optional(),
        date: z.string(),
        status: z.string(),
        tag: z.string().optional(),
        language: z.string().optional(),
      })
      .optional(),
  }),
  execute: async ({ context }) => {
    const slug = context?.slug

    // If slug === all, list all posts
    if (slug === 'all') {
      const files = fs.readdirSync(POSTS_DIRECTORY)
      const posts = files
        .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
        .map((file) => {
          const filePath = path.join(POSTS_DIRECTORY, file)
          const fileContents = fs.readFileSync(filePath, 'utf8')
          const { data } = matter(fileContents)
          const slug = file.replace(/\.(md|mdx)$/, '')

          return {
            slug,
            title: data.title || slug,
            description: data.description,
            date: data.date,
            status: data.status || 'unknown',
          }
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

      return { posts }
    }

    // Read specific post
    try {
      const mdPath = path.join(POSTS_DIRECTORY, `${slug}.md`)
      const mdxPath = path.join(POSTS_DIRECTORY, `${slug}.mdx`)

      let filePath: string
      if (fs.existsSync(mdPath)) {
        filePath = mdPath
      } else if (fs.existsSync(mdxPath)) {
        filePath = mdxPath
      } else {
        throw new Error(`Post not found: ${slug}`)
      }

      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        content,
        metadata: {
          title: data.title,
          description: data.description,
          date: data.date,
          status: data.status,
          tag: data.tag,
          language: data.language,
        },
      }
    } catch (error) {
      throw new Error(
        `Failed to read post: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  },
})
