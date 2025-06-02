"use server"

import { writeFile } from "fs/promises"
import { existsSync, mkdirSync } from "fs"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"
import { readdirSync } from "fs"

// ElevenLabs configuration
const ELEVENLABS_API_BASE = "https://api.elevenlabs.io/v1"

// High-quality Spanish voices from ElevenLabs
const SPANISH_VOICES = {
  maria: "pNInz6obpgDQGcFmaJgB", // Spanish female voice - Maria
  diego: "ErXwobaYiN019PkySvjV", // Spanish male voice - Diego
  sofia: "EXAVITQu4vr4xnSDxMaL", // Alternative Spanish female voice - Sofia
  carlos: "VR6AewLTigWG4xSOukaG", // Alternative Spanish male voice - Carlos
} as const

type VoiceName = keyof typeof SPANISH_VOICES

interface TTSOptions {
  voice?: VoiceName
  stability?: number
  similarityBoost?: number
  style?: number
  useSpeakerBoost?: boolean
}

interface TTSResult {
  success: boolean
  audioUrl?: string
  error?: string
  provider: string
  cached?: boolean
}

/**
 * Get available Spanish voices
 */
export async function getSpanishVoices(): Promise<Record<string, string>> {
  return SPANISH_VOICES
}

/**
 * Get voice names
 */
export async function getVoiceNames(): Promise<string[]> {
  return Object.keys(SPANISH_VOICES)
}

/**
 * Generate TTS audio using ElevenLabs API
 */
export async function generateElevenLabsTTS(text: string, options: TTSOptions = {}): Promise<TTSResult> {
  const { voice = "maria", stability = 0.7, similarityBoost = 0.8, style = 0.2, useSpeakerBoost = true } = options

  try {
    console.log(`[ElevenLabs] Generating TTS for: "${text}" with voice: ${voice}`)

    // Check API key
    const apiKey = process.env.ELEVENLABS_API_KEY
    if (!apiKey) {
      console.error("[ElevenLabs] API key not found")
      throw new Error("ElevenLabs API key not configured")
    }

    // Get voice ID
    const voiceId = SPANISH_VOICES[voice as VoiceName]
    if (!voiceId) {
      console.error(`[ElevenLabs] Invalid voice: ${voice}`)
      throw new Error(`Invalid voice: ${voice}`)
    }

    // Create output directory
    const outputDir = join(process.cwd(), "public", "generated-audio")
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true })
      console.log(`[ElevenLabs] Created output directory: ${outputDir}`)
    }

    // Generate filename
    const sanitizedText = text
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .substring(0, 20)
    const filename = `el-${voice}-${sanitizedText}-${uuidv4().substring(0, 8)}.mp3`
    const filePath = join(outputDir, filename)

    // Check if file already exists (simple caching)
    const existingFile = `el-${voice}-${sanitizedText}`
    if (existsSync(outputDir)) {
      // Use the native fs module with import.meta.require
      // This is a safer approach in Next.js App Router
      try {
        // Use readdirSync from fs directly since we already imported it
        const files = readdirSync(outputDir)
        const cachedFile = files.find((file: string) => file.startsWith(existingFile) && file.endsWith(".mp3"))

        if (cachedFile) {
          console.log(`[ElevenLabs] Using cached file: ${cachedFile}`)
          return {
            success: true,
            audioUrl: `/generated-audio/${cachedFile}`,
            provider: "elevenlabs",
            cached: true,
          }
        }
      } catch (fsError) {
        console.error("[ElevenLabs] Error reading cache directory:", fsError)
        // Continue with generation if cache check fails
      }
    }

    // Make API request
    console.log(`[ElevenLabs] Making API request to voice ID: ${voiceId}`)
    const response = await fetch(`${ELEVENLABS_API_BASE}/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        Accept: "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability,
          similarity_boost: similarityBoost,
          style,
          use_speaker_boost: useSpeakerBoost,
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`[ElevenLabs] API error: ${response.status} ${response.statusText}`, errorText)
      throw new Error(`ElevenLabs API error: ${response.status} - ${errorText}`)
    }

    // Save audio file
    const audioBuffer = await response.arrayBuffer()
    await writeFile(filePath, Buffer.from(audioBuffer))

    console.log(`[ElevenLabs] Audio saved successfully: ${filename}`)

    return {
      success: true,
      audioUrl: `/generated-audio/${filename}`,
      provider: "elevenlabs",
    }
  } catch (error) {
    console.error("[ElevenLabs] TTS generation failed:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      provider: "elevenlabs",
    }
  }
}

/**
 * Generate vocabulary-specific TTS with optimized settings
 */
export async function generateVocabularyTTS(word: string, voice = "maria"): Promise<TTSResult> {
  return generateElevenLabsTTS(word, {
    voice: voice as VoiceName,
    stability: 0.8, // Higher stability for vocabulary words
    similarityBoost: 0.9, // Higher similarity for consistency
    style: 0.1, // Lower style variation for clarity
    useSpeakerBoost: true,
  })
}

/**
 * Test ElevenLabs API connection
 */
export async function testElevenLabsConnection(): Promise<{ success: boolean; error?: string }> {
  try {
    const apiKey = process.env.ELEVENLABS_API_KEY
    if (!apiKey) {
      return { success: false, error: "API key not configured" }
    }

    const response = await fetch(`${ELEVENLABS_API_BASE}/voices`, {
      headers: {
        "xi-api-key": apiKey,
      },
    })

    if (!response.ok) {
      return { success: false, error: `API error: ${response.status}` }
    }

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

/**
 * Get voice ID for a given voice name
 */
export async function getVoiceId(voiceName: string): Promise<string | null> {
  const voices = await getSpanishVoices()
  return voices[voiceName] || null
}

/**
 * Validate if a voice name is supported
 */
export async function isValidVoice(voiceName: string): Promise<boolean> {
  const voices = await getVoiceNames()
  return voices.includes(voiceName)
}
