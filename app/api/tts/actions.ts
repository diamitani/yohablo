"use server"

import { synthesizeSpeech, commonSpanishVoices, getAvailableGoogleTTSVoices } from "@/lib/services/google-tts-service"

interface TTSRequest {
  text: string
  voice?: string // This will be the voiceName like "es-US-Neural2-A"
  languageCode?: string // e.g., "es-US"
  ssmlGender?: "FEMALE" | "MALE" | "NEUTRAL"
  provider?: string // Kept for potential future use, but defaults to Google
}

interface TTSResponse {
  success: boolean
  audioUrl?: string
  error?: string
  provider?: string
}

export async function generateTTS({
  text,
  voice = "es-US-Neural2-A", // Default voice
  languageCode = "es-US", // Default language code for the voice
  ssmlGender = "FEMALE", // Default gender for the voice
}: TTSRequest): Promise<TTSResponse> {
  try {
    console.log(`Generating TTS (via Google Cloud TTS) for text: "${text}" with voice: ${voice}`)

    const result = await synthesizeSpeech({
      text,
      voiceName: voice,
      languageCode,
      ssmlGender,
      audioEncoding: "MP3",
    })

    if (result.success) {
      return {
        success: true,
        audioUrl: result.audioUrl,
        provider: "google_cloud_tts",
      }
    } else {
      return {
        success: false,
        error: result.error || "TTS generation failed.",
        provider: "google_cloud_tts",
      }
    }
  } catch (error) {
    console.error("Error in generateTTS action:", error)
    return {
      success: false,
      error: `Failed to generate TTS: ${error instanceof Error ? error.message : "Unknown error"}`,
      provider: "google_cloud_tts",
    }
  }
}

export async function getAvailableVoices(
  languageCode?: string,
): Promise<{ success: boolean; voices?: any[]; error?: string; provider?: string }> {
  try {
    // Option 1: Use a static list of common voices
    // return { success: true, voices: commonSpanishVoices.map(v => `${v.name} (${v.gender}, ${v.region})`), provider: "google_cloud_tts" };

    // Option 2: Fetch dynamically (might be slower but more up-to-date)
    const result = await getAvailableGoogleTTSVoices(languageCode || "es") // Default to Spanish
    if (result.success) {
      return { success: true, voices: result.voices, provider: "google_cloud_tts" }
    }
    // Fallback to static list if dynamic fetch fails
    console.warn("Failed to fetch dynamic voices, falling back to static list:", result.error)
    return {
      success: true,
      voices: commonSpanishVoices.map((v) => ({
        name: v.name,
        ssmlGender: v.gender,
        naturalSampleRateHertz: 0 /*dummy*/,
      })),
      provider: "google_cloud_tts_static_fallback",
    }
  } catch (error) {
    console.error("Error getting available voices:", error)
    // Fallback to static list on any error
    return {
      success: true, // Still success as we provide a fallback
      voices: commonSpanishVoices.map((v) => ({
        name: v.name,
        ssmlGender: v.gender,
        naturalSampleRateHertz: 0 /*dummy*/,
      })),
      error: `Failed to get dynamic voices, using static list: ${error instanceof Error ? error.message : "Unknown error"}`,
      provider: "google_cloud_tts_static_fallback",
    }
  }
}

export async function generateVocabularyAudio(
  word: string,
  languageCode = "es-US",
  voiceName?: string,
): Promise<TTSResponse> {
  try {
    console.log(`Generating vocabulary audio for word: "${word}"`)
    // Determine voice based on language or use a default high-quality Spanish voice
    const selectedVoice = voiceName || (languageCode.startsWith("es-ES") ? "es-ES-Neural2-A" : "es-US-Neural2-A")
    const gender =
      (commonSpanishVoices.find((v) => v.name === selectedVoice)?.gender as "FEMALE" | "MALE" | "NEUTRAL") || "FEMALE"

    return await generateTTS({
      text: word,
      voice: selectedVoice,
      languageCode: languageCode,
      ssmlGender: gender,
    })
  } catch (error) {
    console.error("Error generating vocabulary audio:", error)
    return {
      success: false,
      error: `Failed to generate vocabulary audio: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

// Export alias for backward compatibility
export const generateVocabularyTTS = generateVocabularyAudio
