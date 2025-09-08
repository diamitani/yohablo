"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"

interface GeminiTTSProps {
  text: string
  languageCode?: string
  voice?: string
  speed?: number
}

let genAI: GoogleGenerativeAI | null = null

function initializeGeminiClient() {
  if (genAI) {
    return genAI
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.error("GEMINI_API_KEY environment variable is not set.")
    throw new Error("Gemini TTS service is not configured.")
  }

  try {
    genAI = new GoogleGenerativeAI(apiKey)
    return genAI
  } catch (error) {
    console.error("Failed to initialize Gemini client:", error)
    throw new Error("Gemini TTS service initialization failed.")
  }
}

export async function synthesizeSpeechWithGemini({
  text,
  languageCode = "es-US",
  voice = "female",
  speed = 1.0,
}: GeminiTTSProps): Promise<{ success: boolean; audioUrl?: string; error?: string }> {
  try {
    const client = initializeGeminiClient()

    // Use Gemini to generate SSML for better pronunciation
    const model = client.getGenerativeModel({ model: "gemini-pro" })

    const prompt = `Convert the following Spanish text to SSML format for text-to-speech synthesis. 
    Ensure proper Spanish pronunciation, emphasis, and natural pauses:
    
    Text: "${text}"
    Language: ${languageCode}
    Voice: ${voice}
    
    Return only the SSML markup without explanation.`

    const result = await model.generateContent(prompt)
    const ssmlText = result.response.text()

    console.log(`Generated SSML for text: "${text}"`)
    console.log(`SSML: ${ssmlText}`)

    // For MVP, we'll use Web Speech API on the client side
    // In production, you would use the SSML with a proper TTS service
    return {
      success: true,
      audioUrl: `/api/tts/generate?text=${encodeURIComponent(text)}&lang=${languageCode}&voice=${voice}`,
    }
  } catch (error) {
    console.error("Error in Gemini TTS synthesis:", error)
    return {
      success: false,
      error: `Failed to synthesize speech with Gemini: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

export async function generateSpanishPronunciation(
  word: string,
  context?: string,
): Promise<{ success: boolean; pronunciation?: string; tips?: string; error?: string }> {
  try {
    const client = initializeGeminiClient()
    const model = client.getGenerativeModel({ model: "gemini-pro" })

    const prompt = `As a Spanish pronunciation expert, provide:
    1. Phonetic pronunciation guide for: "${word}"
    2. Pronunciation tips for English speakers
    3. Common mistakes to avoid
    ${context ? `4. Context: ${context}` : ""}
    
    Format as JSON with keys: pronunciation, tips, mistakes`

    const result = await model.generateContent(prompt)
    const response = result.response.text()

    try {
      const parsed = JSON.parse(response)
      return {
        success: true,
        pronunciation: parsed.pronunciation,
        tips: parsed.tips,
      }
    } catch {
      return {
        success: true,
        pronunciation: response,
        tips: "Practice slowly and focus on rolling your R's",
      }
    }
  } catch (error) {
    console.error("Error generating pronunciation guide:", error)
    return {
      success: false,
      error: `Failed to generate pronunciation: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

export const spanishVoices = [
  { id: "es-female-1", name: "María (Female - Spain)", region: "Spain", gender: "female" },
  { id: "es-male-1", name: "Carlos (Male - Spain)", region: "Spain", gender: "male" },
  { id: "es-female-2", name: "Sofia (Female - Mexico)", region: "Mexico", gender: "female" },
  { id: "es-male-2", name: "Diego (Male - Mexico)", region: "Mexico", gender: "male" },
  { id: "es-female-3", name: "Isabella (Female - Argentina)", region: "Argentina", gender: "female" },
  { id: "es-male-3", name: "Alejandro (Male - Colombia)", region: "Colombia", gender: "male" },
]
