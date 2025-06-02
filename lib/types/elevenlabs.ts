export type VoiceName = "maria" | "diego" | "sofia" | "carlos"

export interface TTSOptions {
  voice?: VoiceName
  stability?: number
  similarityBoost?: number
  style?: number
  useSpeakerBoost?: boolean
}

export interface TTSResult {
  success: boolean
  audioUrl?: string
  error?: string
  provider: string
  cached?: boolean
}

export const VOICE_NAMES: VoiceName[] = ["maria", "diego", "sofia", "carlos"]
