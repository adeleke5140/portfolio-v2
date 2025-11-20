import { ElevenLabsVoice } from '@mastra/voice-elevenlabs'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

// Initialize ElevenLabs voice
const voice = new ElevenLabsVoice({
  speechModel: {
    name: 'eleven_multilingual_v2',
    apiKey: process.env.ELEVENLABS_API_KEY,
  },
  speaker: 'nOzWTVhTcBOEYDDSHTQw', // Kenny voice
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { text } = body

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid text parameter' },
        { status: 400 }
      )
    }

    // Generate speech audio using ElevenLabs
    const audioStream = await voice.speak(text)

    if (!audioStream) {
      return NextResponse.json(
        { error: 'Failed to generate audio' },
        { status: 500 }
      )
    }

    // Convert stream to array of chunks
    const chunks: Uint8Array[] = []
    for await (const chunk of audioStream) {
      chunks.push(chunk as unknown as Uint8Array)
    }

    // Concatenate all chunks
    const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0)
    const audioData = new Uint8Array(totalLength)
    let position = 0
    for (const chunk of chunks) {
      audioData.set(chunk, position)
      position += chunk.length
    }

    // Return audio as response
    return new NextResponse(audioData, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioData.length.toString(),
      },
    })
  } catch (error) {
    console.error('Voice generation error:', error)
    return NextResponse.json(
      {
        error: 'Failed to generate audio',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
