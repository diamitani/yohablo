"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"
import { revalidatePath } from "next/cache"

// Initialize Google Generative AI with the API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "")

// Define the system prompt that instructs the AI on its role
const SYSTEM_PROMPT = `You are Yo Hablo AI, a Spanish language tutor specialized in teaching through music and songs.

CONTEXT:
- You teach Spanish vocabulary, grammar, and pronunciation through hip hop and music
- You have access to lesson plans for: Numbers, Time, Prepositions, Places, Weather, Colors, Family, Animals, Rooms/Furniture, and Food
- Each lesson has specific vocabulary words and learning objectives
- You can create simple songs to help students remember vocabulary
- You should be encouraging, patient, and adapt to the student's level

CAPABILITIES:
1. Explain Spanish vocabulary and grammar concepts
2. Create short, catchy songs to help memorize vocabulary
3. Provide pronunciation guidance
4. Quiz students on vocabulary and concepts
5. Give feedback on student responses
6. Personalize learning based on student progress

TONE:
- Friendly and encouraging
- Clear and concise explanations
- Culturally relevant examples
- Age-appropriate content

Always respond in a way that's helpful for language learning. When creating songs, keep them simple, catchy, and focused on the vocabulary being taught.`

// Function to get OpenAI client (only when needed)
async function getOpenAIClient() {
  // Only import and initialize OpenAI when actually needed
  const { default: OpenAI } = await import("openai")

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
  })
}

// Function to generate response with Gemini (primary)
async function generateResponseWithGemini(
  messages: { role: "user" | "assistant" | "system"; content: string }[],
  lessonContext?: string,
): Promise<{ success: boolean; text: string }> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    let systemContent = SYSTEM_PROMPT
    if (lessonContext) {
      systemContent += `\n\nCURRENT LESSON CONTEXT: ${lessonContext}`
    }

    const chatMessages = messages.filter((msg) => msg.role !== "system")
    const history = []

    for (let i = 0; i < chatMessages.length - 1; i++) {
      const message = chatMessages[i]
      history.push({
        role: message.role === "assistant" ? "model" : "user",
        parts: [{ text: message.content }],
      })
    }

    const currentMessage = chatMessages[chatMessages.length - 1]
    let userPrompt = currentMessage.content

    if (history.length === 0) {
      userPrompt = `${systemContent}\n\nUser message: ${currentMessage.content}`
    }

    const chat = model.startChat({
      history: history,
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 1024,
      },
    })

    const result = await chat.sendMessage(userPrompt)
    const response = result.response.text()

    return { success: true, text: response }
  } catch (error) {
    console.error("Error generating response with Gemini:", error)
    return { success: false, text: "" }
  }
}

// Function to generate response with OpenAI (backup)
async function generateResponseWithOpenAI(
  messages: { role: "user" | "assistant" | "system"; content: string }[],
  lessonContext?: string,
): Promise<{ success: boolean; text: string }> {
  try {
    // Check if we're in a server environment
    if (typeof window !== "undefined") {
      console.error("OpenAI cannot be used in browser environment")
      return { success: false, text: "" }
    }

    // Only initialize OpenAI when we need it
    const openai = await getOpenAIClient()

    let systemContent = SYSTEM_PROMPT
    if (lessonContext) {
      systemContent += `\n\nCURRENT LESSON CONTEXT: ${lessonContext}`
    }

    const openaiMessages = [
      { role: "system" as const, content: systemContent },
      ...messages
        .filter((msg) => msg.role !== "system")
        .map((msg) => ({
          role: msg.role as "user" | "assistant",
          content: msg.content,
        })),
    ]

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: openaiMessages,
      max_tokens: 1024,
      temperature: 0.7,
    })

    const response = completion.choices[0]?.message?.content || ""
    return { success: true, text: response }
  } catch (error) {
    console.error("Error generating response with OpenAI:", error)
    return { success: false, text: "" }
  }
}

// Main function with fallback logic
export async function generateGeminiResponse(
  messages: { role: "user" | "assistant" | "system"; content: string }[],
  lessonContext?: string,
): Promise<{ success: boolean; text: string; provider?: string }> {
  // Try Gemini first
  console.log("Attempting response generation with Gemini...")
  const geminiResult = await generateResponseWithGemini(messages, lessonContext)

  if (geminiResult.success && geminiResult.text.trim()) {
    console.log("Response generated successfully with Gemini")
    return {
      success: true,
      text: geminiResult.text,
      provider: "gemini",
    }
  }

  // Fallback to OpenAI only if we have the API key and we're on server
  if (process.env.OPENAI_API_KEY && typeof window === "undefined") {
    console.log("Gemini failed, trying OpenAI as backup...")
    const openaiResult = await generateResponseWithOpenAI(messages, lessonContext)

    if (openaiResult.success && openaiResult.text.trim()) {
      console.log("Response generated successfully with OpenAI")
      return {
        success: true,
        text: openaiResult.text,
        provider: "openai",
      }
    }
  }

  // Both failed or OpenAI not available
  console.error("AI response generation failed")
  return {
    success: false,
    text: "I'm sorry, I encountered an error. Please try again in a moment.",
  }
}

// Function to generate a song based on vocabulary words
export async function generateGeminiSong(
  topic: string,
  vocabularyWords: string[],
  difficulty: "beginner" | "intermediate" | "advanced" = "beginner",
) {
  // Use the new song actions for consistency
  const { generateSongWithFallback } = await import("./song-actions")
  return await generateSongWithFallback(topic, vocabularyWords, difficulty)
}

// Function to generate a personalized learning plan
export async function generateGeminiLearningPlan(
  userId: string,
  completedLessons: string[],
  strugglingWith: string[] = [],
  interests: string[] = [],
) {
  const messages = [
    {
      role: "user" as const,
      content: `Create a personalized Spanish learning plan for a student with the following profile:
- Completed lessons: ${completedLessons.join(", ") || "None yet"}
- Struggling with: ${strugglingWith.join(", ") || "No specific struggles identified"}
- Interests: ${interests.join(", ") || "General Spanish learning"}

Recommend 3-5 specific lessons they should focus on next, explain why these would be beneficial, and suggest a study schedule for the next week. Keep it motivating and achievable.`,
    },
  ]

  const result = await generateGeminiResponse(messages)

  return {
    success: result.success,
    plan: result.text,
  }
}

// Function to save user progress (unchanged from original)
export async function saveUserProgress(
  userId: string,
  lessonId: string,
  progress: number,
  completedVocabulary: string[] = [],
) {
  try {
    console.log(`Saving progress for user ${userId} on lesson ${lessonId}: ${progress}%`)
    console.log(`Completed vocabulary: ${completedVocabulary.join(", ")}`)

    revalidatePath("/dashboard")
    revalidatePath(`/lessons/${lessonId}`)

    return { success: true }
  } catch (error) {
    console.error("Error saving progress:", error)
    return { success: false }
  }
}
