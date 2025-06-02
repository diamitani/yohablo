import { NextResponse } from "next/server"
import { generateVocabularyTTS } from "@/lib/services/elevenlabs-service"

export async function POST(request: Request) {
  try {
    const { word, voice = "maria" } = await request.json()

    if (!word) {
      console.error("[VocabularyAudio] No word provided")
      return NextResponse.json({ success: false, error: "Word is required" }, { status: 400 })
    }

    console.log(`[VocabularyAudio] Generating audio for word: "${word}"`)

    // Generate TTS using ElevenLabs
    const result = await generateVocabularyTTS(word, voice)

    if (result.success) {
      console.log(`[VocabularyAudio] Success for "${word}": ${result.audioUrl}`)
      return NextResponse.json(result)
    } else {
      console.error(`[VocabularyAudio] Failed for "${word}":`, result.error)

      // Return fallback
      return NextResponse.json({
        success: false,
        audioUrl: "/audio/sample-word.mp3",
        fallback: true,
        error: result.error,
        provider: "fallback",
      })
    }
  } catch (error) {
    console.error("[VocabularyAudio] API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process request",
        fallback: true,
        audioUrl: "/audio/sample-word.mp3",
        provider: "fallback",
      },
      { status: 500 },
    )
  }
}
