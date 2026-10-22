import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

// 'YYYY-MM-DD'. Kept as a string and parsed with date-fns' parseISO (see
// src/helpers/formatDate.ts) so dates render in local time, not shifted by UTC.
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/)

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: isoDate,
    description: z.string().optional(),
    status: z.enum(['draft', 'editing', 'in-progress', 'completed', 'archived']),
    draft: z.boolean().optional(),
    tag: z.union([z.string(), z.array(z.string())]).optional(),
    language: z.string().optional(),
    updatedAt: isoDate.optional(),
    // Personal notes on when work started/progressed; DD-MM-YYYY, never rendered.
    started: z.string().optional(),
    working: z.string().optional(),
  }),
})

const craft = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/craft' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tag: z.string().optional(),
    status: z.enum(['draft', 'ready-to-go', 'archived']).optional(),
    date: isoDate.optional(),
  }),
})

export const collections = { blog, craft }
