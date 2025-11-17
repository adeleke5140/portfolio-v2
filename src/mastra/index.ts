import { Mastra } from '@mastra/core'
import { kennyAgent } from './agents/kenny'
import { LibSQLStore } from '@mastra/libsql'
import { LangfuseExporter } from '@mastra/langfuse'

type MastraInstance = ReturnType<typeof createMastraInstance>

const globalForMastra = globalThis as typeof globalThis & {
  mastra: MastraInstance | undefined
}

function createMastraInstance() {
  return new Mastra({
    agents: { kennyAgent },
    storage: new LibSQLStore({
      url: ':memory:',
    }),
    observability: {
      configs: {
        langfuse: {
          serviceName: 'ken-assistant',
          exporters: [
            new LangfuseExporter({
              publicKey: process.env.LANGFUSE_PUBLIC_KEY!,
              secretKey: process.env.LANGFUSE_SECRET_KEY!,
              baseUrl: process.env.LANGFUSE_BASE_URL,
              options: {
                environment: process.env.NODE_ENV,
              },
            }),
          ],
        },
      },
    },
  })
}

export const mastra = globalForMastra.mastra ?? createMastraInstance()

if (process.env.NODE_ENV !== 'production') {
  globalForMastra.mastra = mastra
}
