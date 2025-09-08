import { type NextRequest, NextResponse } from "next/server"
import { geminiTTS } from "@/lib/services/gemini-tts-service"

export async function POST(request: NextRequest) {
  try {
    const { text, language = "es", voice = "es-ES-Standard-A", speed = 1.0 } = await request.json()

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    const result = await geminiTTS.generateSpeech({
      text,
      language,
      voice,
      speed,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("TTS API Error:", error)
    return NextResponse.json({ error: "Failed to generate speech" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const word = searchParams.get("word")

    if (!word) {
      return NextResponse.json({ error: "Word parameter is required" }, { status: 400 })
    }

    const help = await geminiTTS.getPronunciationHelp(word)
    return NextResponse.json(help)
  } catch (error) {
    console.error("Pronunciation Help API Error:", error)
    return NextResponse.json({ error: "Failed to get pronunciation help" }, { status: 500 })
  }
}
