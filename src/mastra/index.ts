import { Mastra } from '@mastra/core'
import { LangfuseExporter } from '@mastra/langfuse'
import { LibSQLStore } from '@mastra/libsql'
import { kennyAgent } from './agents/kenny'
import { kennyVoiceAgent } from './agents/kenny-voice'

type MastraInstance = ReturnType<typeof createMastraInstance>

const isProd = process.env.NODE_ENV === 'production'
const globalForMastra = globalThis as typeof globalThis & {
  mastra: MastraInstance | undefined
}

function createMastraInstance() {
  const dbUrl = isProd ? process.env.TURSO_DB_URL : 'file:agent-memory.db'
  const token = isProd ? process.env.TURSO_TOKEN : undefined
  // if (!dbUrl || !token) {
  //   throw new Error('TURSO_DB_URL or TURSO_TOKEN is not set')
  // }
  return new Mastra({
    agents: { kennyAgent, kennyVoiceAgent },
    storage: new LibSQLStore({
      url: dbUrl!,
      authToken: token,
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
