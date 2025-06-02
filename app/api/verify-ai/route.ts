import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "")

// Function to get OpenAI client
async function getOpenAIClient() {
  const { default: OpenAI } = await import("openai")
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
  })
}

// Test Gemini
async function testGemini() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const result = await model.generateContent("Say 'Gemini is working!' in Spanish")
    return {
      success: true,
      message: result.response.text(),
      provider: "gemini",
    }
  } catch (error) {
    console.error("Gemini test failed:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
      provider: "gemini",
    }
  }
}

// Test OpenAI
async function testOpenAI() {
  try {
    const openai = await getOpenAIClient()
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "Say 'OpenAI is working!' in Spanish",
        },
      ],
      max_tokens: 50,
    })
    return {
      success: true,
      message: completion.choices[0]?.message?.content || "",
      provider: "openai",
    }
  } catch (error) {
    console.error("OpenAI test failed:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
      provider: "openai",
    }
  }
}

// Test the fallback system
async function testFallbackSystem() {
  // First try Gemini
  const geminiResult = await testGemini()

  // If Gemini succeeds, return its result
  if (geminiResult.success) {
    return {
      primarySuccess: true,
      fallbackTested: false,
      primaryResponse: geminiResult.message,
      fallbackResponse: null,
    }
  }

  // If Gemini fails, try OpenAI
  const openaiResult = await testOpenAI()

  return {
    primarySuccess: false,
    fallbackTested: true,
    fallbackSuccess: openaiResult.success,
    primaryResponse: geminiResult.message,
    fallbackResponse: openaiResult.message,
  }
}

export async function GET() {
  try {
    // Test both providers individually
    const [geminiResult, openaiResult] = await Promise.all([testGemini(), testOpenAI()])

    // Test the fallback system
    const fallbackTest = await testFallbackSystem()

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      providers: {
        gemini: geminiResult,
        openai: openaiResult,
      },
      fallbackSystem: fallbackTest,
      environment: {
        hasGeminiKey: !!process.env.GOOGLE_API_KEY,
        hasOpenAIKey: !!process.env.OPENAI_API_KEY,
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
