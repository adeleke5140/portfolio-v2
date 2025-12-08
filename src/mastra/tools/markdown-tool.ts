import { createTool } from '@mastra/core/tools'
import { z } from 'zod'
import { RuntimeContext } from '@mastra/core/runtime-context'

interface BlogPostContext {
  context: string
  pathname: string
}

const isDev = process.env.NODE_ENV === 'development'

const getApiBaseUrl = () => {
  if (isDev) {
    return 'http://localhost:3000'
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return `https://kehinde.xyz`
}

export const readSingleBlog = createTool({
  id: 'read-single-blog',
  description:
    'Reads a single blog post by its file path. If no path is provided, automatically reads the current blog post the user is viewing (from runtime context). Use this for contextual queries like "summarize this post" or "what is this post about?".',

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
  execute: async ({
    context,
    runtimeContext,
  }: {
    context: { path: string }
    runtimeContext: RuntimeContext<BlogPostContext>
  }) => {
    let slug: string | undefined = context.path

    // If no path provided, try to get it from runtime context
    if (!slug) {
      const pathname = runtimeContext.get('context')
      if (pathname && typeof pathname === 'string') {
        slug = pathname
      }
    }

    if (!slug) {
      throw new Error('Unable to determine which blog post to read')
    }

    try {
      // Extract slug from path if it includes extension or path separators
      // e.g., "precise-types.mdx" -> "precise-types" or "posts/precise-types" -> "precise-types"
      if (slug.includes('/')) {
        slug = slug.split('/').pop() || slug
      }
      if (slug.includes('.')) {
        slug = slug.replace(/\.(md|mdx)$/, '')
      }

      const baseUrl = getApiBaseUrl()
      const response = await fetch(`${baseUrl}/api/posts/${slug}`)

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Blog post not found: ${slug}`)
        }
        throw new Error(
          `Failed to fetch blog post: ${response.status} ${response.statusText}`
        )
      }

      const data = await response.json()

      return {
        content: data.content,
        metadata: {
          title: data.metadata.title || slug,
          description: data.metadata.description,
          date: data.metadata.date,
          status: data.metadata.status || 'unknown',
          tag: data.metadata.tag,
          language: data.metadata.language,
        },
        slug: data.slug,
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
  description:
    "Reads all blog posts from Kenny's portfolio. The slug returned is the title of the blog post and can be used to read a single blog post.",
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
    try {
      const baseUrl = getApiBaseUrl()
      const response = await fetch(`${baseUrl}/api/posts`)

      if (!response.ok) {
        throw new Error(
          `Failed to fetch blog posts: ${response.status} ${response.statusText}`
        )
      }

      const posts = await response.json()

      return { posts }
    } catch (error) {
      throw new Error(
        `Failed to read blog posts: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      )
    }
  },
})
