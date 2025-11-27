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

export const readSingleBlog = createTool({
  id: 'read-single-blog',
  description:
    'Reads a single blog post by its file path. If no path is provided, automatically reads the current blog post the user is viewing (from runtime context). Use this for contextual queries like "summarize this post".',
  inputSchema: z.object({
    path: z
      .string()
      .optional()
      .describe(
        'The file path to the blog post (e.g., "precise-types.mdx"). If not provided, uses the current blog post from runtime context.'
      ),
  }),
  outputSchema: z.object({
    content: z.string(),
    metadata: z.object({
      title: z.string(),
      description: z.string().optional(),
      date: z.string(),
      status: z.string(),
      tag: z.string().optional(),
      language: z.string().optional(),
    }),
    slug: z.string(),
  }),
  execute: async ({ context, runtimeContext }) => {
    let filePath: string | undefined = context?.path

    // If no path provided, try to get it from runtime context
    if (!filePath) {
      const blogSlug = runtimeContext?.get('blogSlug')
      if (blogSlug && typeof blogSlug === 'string') {
        filePath = blogSlug
      } else {
        throw new Error(
          'No blog post specified and user is not currently viewing a blog post'
        )
      }
    }

    // At this point filePath should be defined, but let's be extra safe
    if (!filePath) {
      throw new Error('Unable to determine which blog post to read')
    }

    try {
      // Handle both just filename and full path
      let fullPath: string
      if (filePath.includes('/')) {
        // If it's already a full path, use it
        fullPath = filePath
      } else {
        // If it's just a filename, construct the full path
        fullPath = path.join(POSTS_DIRECTORY, filePath)
      }

      // Check if file exists
      if (!fs.existsSync(fullPath)) {
        // Try with different extensions if the file doesn't exist
        const baseName = path.basename(filePath, path.extname(filePath))
        const mdPath = path.join(POSTS_DIRECTORY, `${baseName}.md`)
        const mdxPath = path.join(POSTS_DIRECTORY, `${baseName}.mdx`)

        if (fs.existsSync(mdPath)) {
          fullPath = mdPath
        } else if (fs.existsSync(mdxPath)) {
          fullPath = mdxPath
        } else {
          throw new Error(`Blog post not found: ${filePath}`)
        }
      }

      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      // Extract slug from filename
      const fileName = path.basename(fullPath)
      const slug = fileName.replace(/\.(md|mdx)$/, '')

      return {
        content,
        metadata: {
          title: data.title || slug,
          description: data.description,
          date: data.date,
          status: data.status || 'unknown',
          tag: data.tag,
          language: data.language,
        },
        slug,
      }
    } catch (error) {
      throw new Error(
        `Failed to read blog post: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      )
    }
  },
})

export const readAllBlogs = createTool({
  id: 'read-all-blogs',
  description: "Reads all blog posts from Kenny's portfolio.",
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
  execute: async () => {
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
  },
})
