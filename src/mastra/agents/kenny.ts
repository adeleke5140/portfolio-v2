import { Agent } from '@mastra/core/agent'
import { Memory } from '@mastra/memory'
import { readAllBlogs, readSingleBlog } from '../tools/markdown-tool'
import { getKennyInstructions } from './instructions'

export const kennyAgent = new Agent({
  name: 'kennyAgent',
  description:
    "An AI agent that embodies Kenny's persona as a design engineer, capable of discussing his work, interests, and blog content.",
  instructions: ({ runtimeContext }) => {
    const context = (runtimeContext?.get('context') as string) || 'blog'
    const pathname = (runtimeContext?.get('pathname') as string) || '/blog'
    return getKennyInstructions(context, pathname)
  },
  model: 'openai/gpt-5-mini',
  tools: ({ runtimeContext }) => {
    const pathname = (runtimeContext?.get('pathname') as string) || ''
    if (pathname.includes('blog')) {
      return {
        readSingleBlog,
        readAllBlogs,
      }
    }
    return {
      readAllBlogs,
    }
  },
  memory: new Memory(),
})
