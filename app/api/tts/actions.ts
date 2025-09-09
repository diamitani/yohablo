"use server"

import { TextToSpeechClient } from "@google-cloud/text-to-speech"

// Mock TTS service for development
const mockTTS = {
  generateAudio: async (text: string, voice: string) => {
    console.log(`[Mock TTS] Generating audio for: "${text}" with voice: ${voice}`)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Return a mock audio URL based on the text
    const mockUrl = `/audio/mock-${text.toLowerCase().replace(/[^a-z0-9]/g, "-")}.mp3`

    return {
      success: true,
      audioUrl: mockUrl,
    }
  },
}

export async function generateVocabularyAudio(
  text: string,
  voice = "es-US-Neural2-B",
): Promise<{ success: boolean; audioUrl?: string; error?: string }> {
  try {
    console.log(`[TTS] Generating audio for: "${text}" with voice: ${voice}`)

    // Check if we have Google TTS credentials
    const hasCredentials = process.env.GOOGLE_TTS_CREDENTIALS ? true : false

    if (!hasCredentials) {
      console.log("[TTS] No Google TTS credentials found, using mock TTS service")
      return mockTTS.generateAudio(text, voice)
    }

    // Initialize the TTS client
    const client = new TextToSpeechClient({
      credentials: JSON.parse(process.env.GOOGLE_TTS_CREDENTIALS || "{}"),
    })

    // Configure the request
    const request = {
      input: { text },
      voice: {
        languageCode: voice.split("-").slice(0, 2).join("-"), // Extract language code (e.g., "es-US")
        name: voice,
      },
      audioConfig: { audioEncoding: "MP3" },
    }

    // Generate the audio
    const [response] = await client.synthesizeSpeech(request)

    if (!response.audioContent) {
      throw new Error("No audio content received from Google TTS")
    }

    // Convert audio content to base64
    const audioBase64 = Buffer.from(response.audioContent as Uint8Array).toString("base64")

    // Create a data URL for the audio
    const audioUrl = `data:audio/mp3;base64,${audioBase64}`

    return {
      success: true,
      audioUrl,
    }
  } catch (error) {
    console.error("[TTS] Error generating audio:", error)

    // Fallback to mock TTS service if Google TTS fails
    console.log("[TTS] Falling back to mock TTS service")
    return mockTTS.generateAudio(text, voice)
  }
}

export async function getAvailableVoices(): Promise<{ id: string; name: string; gender: string }[]> {
  // Return a list of available voices for Spanish
  return [
    { id: "es-US-Neural2-A", name: "Spanish (US) - Female", gender: "female" },
    { id: "es-US-Neural2-B", name: "Spanish (US) - Male", gender: "male" },
    { id: "es-US-Neural2-C", name: "Spanish (US) - Female 2", gender: "female" },
    { id: "es-ES-Neural2-A", name: "Spanish (Spain) - Female", gender: "female" },
    { id: "es-ES-Neural2-B", name: "Spanish (Spain) - Male", gender: "male" },
    { id: "es-ES-Neural2-C", name: "Spanish (Spain) - Female 2", gender: "female" },
  ]
}
