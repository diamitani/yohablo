import { type NextRequest, NextResponse } from "next/server"
import { synthesizeSpeechWithGemini, generateSpanishPronunciation } from "@/lib/services/gemini-tts-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text, languageCode, voice, action } = body

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    if (action === "pronunciation") {
      const result = await generateSpanishPronunciation(text, body.context)
      return NextResponse.json(result)
    }

    const result = await synthesizeSpeechWithGemini({
      text,
      languageCode: languageCode || "es-US",
      voice: voice || "female",
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Gemini TTS API error:", error)
    return NextResponse.json({ error: "Failed to process TTS request" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const text = searchParams.get("text")
  const lang = searchParams.get("lang") || "es-US"
  const voice = searchParams.get("voice") || "female"

  if (!text) {
    return NextResponse.json({ error: "Text parameter is required" }, { status: 400 })
  }

  try {
    const result = await synthesizeSpeechWithGemini({
      text,
      languageCode: lang,
      voice,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Gemini TTS GET error:", error)
    return NextResponse.json({ error: "Failed to generate speech" }, { status: 500 })
  }
}
