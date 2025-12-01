import { Agent } from '@mastra/core/agent'
import { Memory } from '@mastra/memory'
import { readAllBlogs, readSingleBlog } from '../tools/markdown-tool'
import { NORMAL_KENNY_PROMPT } from './instructions'

export const kennyAgent = new Agent({
  name: 'kennyAgent',
  description:
    "An AI agent that embodies Kenny's persona as a design engineer, capable of discussing his work, interests, and blog content.",
  instructions: NORMAL_KENNY_PROMPT,
  model: 'openai/gpt-4.1-mini',
  tools: ({ runtimeContext }: { runtimeContext: any }) => {
    const context = runtimeContext.get('context')
    if (context === 'blog') {
      return {
        readAllBlogs,
        readSingleBlog,
      }
    }
    if (context != 'blog') {
      return {
        readSingleBlog,
      }
    }
    return {
      readAllBlogs,
      readSingleBlog,
    }
  },
  memory: new Memory(),
})
