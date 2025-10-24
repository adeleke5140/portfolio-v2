import { Mastra } from '@mastra/core'
import { LibSQLStore } from '@mastra/libsql'
import { kennyAgent } from './agents/kenny'

export const mastra = new Mastra({
  agents: { kennyAgent },
  storage: new LibSQLStore({
    url: ':memory:',
  }),
})
