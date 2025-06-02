"use server"

import { xai } from "@ai-sdk/xai"
import { generateText, streamText } from "ai"
import { revalidatePath } from "next/cache"

// Define the system prompt that instructs Grok on its role
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

// Function to generate a response from Grok
export async function generateAIResponse(
  messages: { role: "user" | "assistant" | "system"; content: string }[],
  lessonContext?: string,
) {
  try {
    // Add lesson context if provided
    const contextualizedMessages = lessonContext
      ? [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "system", content: `CURRENT LESSON CONTEXT: ${lessonContext}` },
          ...messages,
        ]
      : [{ role: "system", content: SYSTEM_PROMPT }, ...messages]

    const response = await generateText({
      model: xai("grok-1"),
      messages: contextualizedMessages,
    })

    return { success: true, text: response.text }
  } catch (error) {
    console.error("Error generating AI response:", error)
    return {
      success: false,
      text: "I'm sorry, I encountered an error. Please try again in a moment.",
    }
  }
}

// Function to stream a response from Grok
export async function streamAIResponse(
  messages: { role: "user" | "assistant" | "system"; content: string }[],
  lessonContext?: string,
) {
  try {
    // Add lesson context if provided
    const contextualizedMessages = lessonContext
      ? [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "system", content: `CURRENT LESSON CONTEXT: ${lessonContext}` },
          ...messages,
        ]
      : [{ role: "system", content: SYSTEM_PROMPT }, ...messages]

    const response = await streamText({
      model: xai("grok-1"),
      messages: contextualizedMessages,
    })

    return response
  } catch (error) {
    console.error("Error streaming AI response:", error)
    throw error
  }
}

// Function to generate a song based on vocabulary words
export async function generateSong(
  topic: string,
  vocabularyWords: string[],
  difficulty: "beginner" | "intermediate" | "advanced" = "beginner",
) {
  try {
    const prompt = `Create a short, catchy song in the style of hip hop to help students learn the following Spanish vocabulary words related to "${topic}": ${vocabularyWords.join(", ")}. 
    
    The song should be appropriate for ${difficulty} level students. Include both Spanish and English translations. Make it rhythmic and memorable. Keep it under 12 lines.`

    const response = await generateText({
      model: xai("grok-1"),
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
    })

    return { success: true, song: response.text }
  } catch (error) {
    console.error("Error generating song:", error)
    return {
      success: false,
      song: "I'm sorry, I couldn't create a song right now. Please try again later.",
    }
  }
}

// Function to save user progress
export async function saveUserProgress(
  userId: string,
  lessonId: string,
  progress: number,
  completedVocabulary: string[] = [],
) {
  try {
    // In a real app, this would save to a database
    // For now, we'll just log it and revalidate the path
    console.log(`Saving progress for user ${userId} on lesson ${lessonId}: ${progress}%`)
    console.log(`Completed vocabulary: ${completedVocabulary.join(", ")}`)

    // Revalidate the dashboard and lesson pages
    revalidatePath("/dashboard")
    revalidatePath(`/lessons/${lessonId}`)

    return { success: true }
  } catch (error) {
    console.error("Error saving progress:", error)
    return { success: false }
  }
}

// Function to generate a personalized learning plan
export async function generateLearningPlan(
  userId: string,
  completedLessons: string[],
  strugglingWith: string[] = [],
  interests: string[] = [],
) {
  try {
    const prompt = `Create a personalized Spanish learning plan for a student with the following profile:
    - Completed lessons: ${completedLessons.join(", ") || "None yet"}
    - Struggling with: ${strugglingWith.join(", ") || "No specific struggles identified"}
    - Interests: ${interests.join(", ") || "General Spanish learning"}
    
    Recommend 3-5 specific lessons they should focus on next, explain why these would be beneficial, and suggest a study schedule for the next week. Keep it motivating and achievable.`

    const response = await generateText({
      model: xai("grok-1"),
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
    })

    return { success: true, plan: response.text }
  } catch (error) {
    console.error("Error generating learning plan:", error)
    return {
      success: false,
      plan: "I'm sorry, I couldn't create a learning plan right now. Please try again later.",
    }
  }
}
