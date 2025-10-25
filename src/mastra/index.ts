import { Mastra } from '@mastra/core'
import { kennyAgent } from './agents/kenny'

export const mastra = new Mastra({
  agents: { kennyAgent },
})
