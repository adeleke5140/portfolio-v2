import { Mastra } from '@mastra/core'
import { LibSQLStore } from '@mastra/libsql'
import { alfredAgent } from './agents/alfred'

export const mastra = new Mastra({
  agents: { alfredAgent },
  storage: new LibSQLStore({
    url: ':memory:',
  }),
})
