import { Mastra } from '@mastra/core'
import { LibSQLStore } from '@mastra/libsql'
import { kennyAgent } from './agents/kenny'
import { alfredAgent } from './agents/alfred'

export const mastra = new Mastra({
  agents: { kennyAgent, alfredAgent },
  storage: new LibSQLStore({
    url: ':memory:',
  }),
})
