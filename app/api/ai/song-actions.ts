"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"

interface SongGenerationParams {
  topic: string
  vocabularyWords: string[]
}

interface SongResponse {
  success: boolean
  song?: string
  error?: string
  provider?: string
}

// Function to get available Gemini model
async function getAvailableModel() {
  const apiKey = "AIzaSyDqIWTCN6fPJHUg4KPsxxE5iknKRve4hfA"
  const genAI = new GoogleGenerativeAI(apiKey)

  // Try models in order of preference
  const modelNames = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"]

  for (const modelName of modelNames) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName })
      // Test if model is available with a simple request
      await model.generateContent("test")
      console.log(`Using Gemini model: ${modelName}`)
      return { genAI, model, modelName }
    } catch (error) {
      console.log(`Model ${modelName} not available, trying next...`)
    }
  }

  throw new Error("No Gemini models available")
}

export async function generateSongWithFallback({
  topic,
  vocabularyWords,
}: SongGenerationParams): Promise<SongResponse> {
  try {
    console.log(`Generating song for topic: "${topic}" with vocabulary:`, vocabularyWords)

    // Get available model
    const { model } = await getAvailableModel()

    const prompt = `Create a catchy Spanish hip-hop song about "${topic}" that teaches these vocabulary words: ${vocabularyWords.join(", ")}.

    The song should:
    1. Be 12-16 lines long
    2. Include all the vocabulary words naturally
    3. Have a clear rhythm and rhyme scheme
    4. Be educational and memorable
    5. Include both Spanish lyrics and English translation
    6. Be appropriate for language learners

    Format your response with:
    - Spanish lyrics first
    - Then "--- English Translation ---"
    - Then the English translation

    Make it fun, educational, and easy to remember!`

    // Generate content with safety settings
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    })

    const songText = result.response.text()

    console.log("Song generated successfully with Gemini")

    return {
      success: true,
      song: songText,
      provider: "Gemini AI",
    }
  } catch (error) {
    console.error("Error generating song with Gemini:", error)
    return {
      success: false,
      error: `Failed to generate song: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

export async function validateSongInputs({
  topic,
  vocabularyWords,
}: SongGenerationParams): Promise<{ valid: boolean; error?: string }> {
  try {
    // Validate topic
    if (!topic || topic.trim().length === 0) {
      return { valid: false, error: "Topic is required" }
    }

    if (topic.length > 100) {
      return { valid: false, error: "Topic is too long (max 100 characters)" }
    }

    // Validate vocabulary words
    if (!vocabularyWords || vocabularyWords.length === 0) {
      return { valid: false, error: "At least one vocabulary word is required" }
    }

    if (vocabularyWords.length > 20) {
      return { valid: false, error: "Too many vocabulary words (max 20)" }
    }

    // Check each vocabulary word
    for (const word of vocabularyWords) {
      if (!word || word.trim().length === 0) {
        return { valid: false, error: "Empty vocabulary words are not allowed" }
      }
      if (word.length > 50) {
        return { valid: false, error: "Vocabulary words are too long (max 50 characters each)" }
      }
    }

    return { valid: true }
  } catch (error) {
    console.error("Error validating song inputs:", error)
    return { valid: false, error: "Validation error occurred" }
  }
}
