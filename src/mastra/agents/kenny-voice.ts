import { Agent } from '@mastra/core/agent'
import { ElevenLabsVoice } from '@mastra/voice-elevenlabs'

const voice = new ElevenLabsVoice({
  speechModel: {
    name: 'eleven_multilingual_v2',
    apiKey: process.env.ELEVENLABS_API_KEY,
  },
  speaker: 'nOzWTVhTcBOEYDDSHTQw', // Kenny voice (default)
})

export const kennyVoiceAgent = new Agent({
  name: 'kennyVoiceAgent',
  description: 'High-quality voice synthesis for Ken assistant responses',
  instructions:
    'Convert text to natural, conversational speech with clear pronunciation and appropriate pacing.',
  model: 'openai/gpt-4.1-mini',
  voice,
})
