# Ken Agents

This directory contains the AI agents for the Ken assistant.

## Agents

### `kenny.ts` - Base Ken Agent

The original text-based Ken assistant with blog reading capabilities.

**Features:**

- Text-based chat interface
- Context-aware responses (knows what blog post user is viewing)
- Blog post reading tools
- Memory across conversations
- Model switching (GPT-4 vs local models)

### `kenny-voice.ts` - Voice-Enabled Ken Agent

Extended version with voice capabilities powered by ElevenLabs.

**Features:**

- All features from base agent
- Text-to-Speech (TTS) - Ken can speak his responses
- Speech-to-Text (STT) - Users can speak their queries
- Natural voice personality matching Ken's character
- Multiple voice configuration options

## Setup

### Base Agent (Already Working)

No additional setup needed. The base agent is already configured.

### Voice Agent

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Get ElevenLabs API Key:**

   - Sign up at [ElevenLabs](https://elevenlabs.io/)
   - Get your API key from the dashboard
   - ElevenLabs offers a free tier to get started

3. **Add to `.env`:**

   ```env
   ELEVENLABS_API_KEY=your_api_key_here
   ```

4. **Test the voice agent:**

   ```bash
   # Start dev server
   pnpm dev

   # Test TTS endpoint
   curl -X POST http://localhost:3000/api/voice \
     -H "Content-Type: application/json" \
     -d '{"voiceAction":"speak","text":"Hello from Ken!"}' \
     --output test.mp3
   ```

## Usage

### Using the Base Agent

```typescript
import { mastra } from '@/mastra'

const kennyAgent = mastra.getAgent('kennyAgent')

// Generate text response
const response = await kennyAgent.generate('Tell me about TypeScript')
console.log(response.text)
```

### Using the Voice Agent

```typescript
import { mastra } from '@/mastra'
import { createWriteStream } from 'fs'

const kennyVoiceAgent = mastra.getAgent('kennyVoiceAgent')

// Generate and speak
const response = await kennyVoiceAgent.generate('Tell me about TypeScript')
const audioStream = await kennyVoiceAgent.voice.speak(response.text)

// Save to file
const writer = createWriteStream('response.mp3')
audioStream.pipe(writer)

// Or transcribe user audio
import { createReadStream } from 'fs'
const userAudio = createReadStream('user-question.m4a')
const transcription = await kennyVoiceAgent.voice.listen(userAudio, {
  filetype: 'm4a',
})
```

### Frontend Integration

See the example components:

- `src/components/blog/voice-controls.tsx` - Voice UI components
- `src/components/blog/assistant-voice-example.tsx` - Full integration example
- `src/lib/voice-utils.ts` - Helper utilities

## Voice Configuration

You can customize the voice in `kenny-voice.ts`:

```typescript
// Change the voice speaker
const voice = new ElevenLabsVoice({
  speechModel: {
    name: 'eleven_multilingual_v2',
  },
  speaker: 'your-voice-id-here',
})

// Get available voices
const voices = await voice.getSpeakers()
console.log(voices)
```

### Pre-configured Voice Options

The file exports `VOICE_CONFIGS` with preset options:

- `default` - Natural, conversational (Aria voice)
- `expressive` - More dynamic (Adam voice)
- `turbo` - Faster generation (turbo model)

## API Endpoints

### Text Chat: `/api/agent`

- Standard text-based chat
- Uses base `kennyAgent`

### Voice Chat: `/api/voice`

- Voice-enabled chat
- Uses `kennyVoiceAgent`
- Supports TTS, STT, and regular chat

## Why Two Agents?

We maintain separate agents for:

1. **Performance**: Voice agent has additional overhead for TTS/STT
2. **Cost**: ElevenLabs charges per character - only use when needed
3. **Flexibility**: Users can choose text-only or voice-enabled
4. **Development**: Easier to test and develop features independently

## Resources

- [Mastra Voice Docs](https://mastra.ai/docs/agents/adding-voice)
- [ElevenLabs API](https://elevenlabs.io/docs/api-reference)
- [Voice Integration Guide](../../../VOICE_INTEGRATION.md)
