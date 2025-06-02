"use server"

import { TextToSpeechClient } from "@google-cloud/text-to-speech"
import { put } from "@vercel/blob"
import { v4 as uuidv4 } from "uuid"

interface SynthesizeSpeechProps {
  text: string
  languageCode?: string
  voiceName?: string
  ssmlGender?: "SSML_VOICE_GENDER_UNSPECIFIED" | "MALE" | "FEMALE" | "NEUTRAL"
  audioEncoding?: "AUDIO_ENCODING_UNSPECIFIED" | "LINEAR16" | "MP3" | "OGG_OPUS"
}

let ttsClient: TextToSpeechClient | null = null

function initializeTtsClient() {
  if (ttsClient) {
    return ttsClient
  }

  const credentialsJson = process.env.GOOGLE_TTS_CREDENTIALS
  if (!credentialsJson) {
    console.error("GOOGLE_TTS_CREDENTIALS environment variable is not set.")
    throw new Error("TTS service is not configured.")
  }

  try {
    const credentials = JSON.parse(credentialsJson)
    ttsClient = new TextToSpeechClient({ credentials })
    return ttsClient
  } catch (error) {
    console.error("Failed to parse GOOGLE_TTS_CREDENTIALS or initialize TTS client:", error)
    throw new Error("TTS service initialization failed.")
  }
}

export async function synthesizeSpeech({
  text,
  languageCode = "es-US",
  voiceName = "es-US-Neural2-A", // A good quality US Spanish voice
  ssmlGender = "FEMALE",
  audioEncoding = "MP3",
}: SynthesizeSpeechProps): Promise<{ success: boolean; audioUrl?: string; error?: string }> {
  try {
    const client = initializeTtsClient()

    const request = {
      input: { text: text },
      voice: { languageCode: languageCode, name: voiceName, ssmlGender: ssmlGender },
      audioConfig: { audioEncoding: audioEncoding as any }, // Cast because type definitions might be too strict
    }

    console.log(`Synthesizing speech for text: "${text}" with voice: ${voiceName}`)
    const [response] = await client.synthesizeSpeech(request)

    if (!response.audioContent) {
      console.error("TTS synthesis failed, no audio content received.")
      return { success: false, error: "TTS synthesis failed, no audio content." }
    }

    const audioBuffer = response.audioContent as Buffer
    const filename = `tts-audio/${uuidv4()}.mp3`

    console.log(`Uploading synthesized audio to Vercel Blob: ${filename}`)
    const blob = await put(filename, audioBuffer, {
      access: "public",
      contentType: "audio/mpeg",
    })

    console.log(`Audio uploaded successfully: ${blob.url}`)
    return { success: true, audioUrl: blob.url }
  } catch (error) {
    console.error("Error in synthesizeSpeech:", error)
    return {
      success: false,
      error: `Failed to synthesize speech: ${error instanceof Error ? error.message : "Unknown TTS error"}`,
    }
  }
}

export async function getAvailableGoogleTTSVoices(
  languageCode?: string,
): Promise<{ success: boolean; voices?: any[]; error?: string }> {
  try {
    const client = initializeTtsClient()
    const [response] = await client.listVoices({ languageCode })
    return { success: true, voices: response.voices || [] }
  } catch (error) {
    console.error("Error fetching available voices:", error)
    return {
      success: false,
      error: `Failed to fetch voices: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

// Example Spanish voices (subset, can be fetched dynamically using getAvailableGoogleTTSVoices)
export const commonSpanishVoices = [
  { name: "es-ES-Neural2-A", gender: "FEMALE", region: "Spain" },
  { name: "es-ES-Neural2-B", gender: "MALE", region: "Spain" },
  { name: "es-ES-Neural2-F", gender: "MALE", region: "Spain" },
  { name: "es-US-Neural2-A", gender: "FEMALE", region: "US" },
  { name: "es-US-Neural2-B", gender: "MALE", region: "US" },
  { name: "es-MX-Neural2-A", gender: "FEMALE", region: "Mexico" }, // Wavenet, not Neural2, but good
  { name: "es-MX-Wavenet-B", gender: "MALE", region: "Mexico" },
]
