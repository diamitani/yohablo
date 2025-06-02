"use server"

import { revalidatePath } from "next/cache"
import { v4 as uuidv4 } from "uuid"
import { xai } from "@ai-sdk/xai"
import { generateText } from "ai"

// Add these imports for Gemini
import { GoogleGenerativeAI } from "@google/generative-ai"

interface CustomLessonData {
  title: string
  description: string
  category?: string
  vocabularyWords?: string[]
  learningPoints?: string[]
}

interface LessonGenerationParams {
  topic: string
  category: string
  difficulty: string
}

interface MusicalLessonParams {
  topic: string
  category: string
  difficulty: string
  musicStyle: string
  tempo: string
}

interface GeneratedLesson {
  title: string
  description: string
  category: string
  difficulty: string
  vocabularyWords: string[]
  learningObjectives: string[]
  lessonContent: string
  practiceExercises: string[]
  culturalNotes?: string
}

interface MusicalLesson {
  title: string
  description: string
  category: string
  difficulty: string
  vocabularyWords: string[]
  learningObjectives: string[]
  rapLyrics: string
  englishTranslation: string
  beatDescription: string
  practiceExercises: string[]
  culturalNotes?: string
  rhymeScheme: string
  tempo: string
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

export async function generateMusicalLessonWithGemini({
  topic,
  category,
  difficulty,
  musicStyle,
  tempo,
}: MusicalLessonParams) {
  try {
    // Get available model
    const { model } = await getAvailableModel()

    const prompt = `Create an engaging Spanish language rap lesson about "${topic}" in the category "${category}" for ${difficulty} level students in ${musicStyle} style with ${tempo} tempo.

    You are creating a musical educational experience inspired by Spanish hip-hop culture and educational rap. The lesson should be memorable, catchy, and educational.

    Please provide the following in a structured format:
    1. A catchy title for the musical lesson
    2. A brief description (2-3 sentences)
    3. 5-8 learning objectives
    4. 10-15 vocabulary words related to the topic (Spanish words with English translations)
    5. Spanish rap lyrics (16-24 lines) that teach the vocabulary and concepts
    6. English translation of the rap lyrics
    7. Description of the beat/rhythm style
    8. Rhyme scheme used (e.g., AABB, ABAB, etc.)
    9. 3-5 practice exercises based on the rap
    10. Cultural notes about Spanish-speaking music culture (optional)

    The rap should:
    - Be educational and memorable
    - Include the vocabulary words naturally
    - Have a clear rhythm and rhyme scheme
    - Be appropriate for the difficulty level
    - Reflect ${musicStyle} style characteristics
    - Match the ${tempo} tempo feel

    Format your response as JSON with the following structure:
    {
      "title": "Musical Lesson Title",
      "description": "Brief description here...",
      "category": "${category}",
      "difficulty": "${difficulty}",
      "vocabularyWords": ["word1 - translation", "word2 - translation", ...],
      "learningObjectives": ["objective1", "objective2", ...],
      "rapLyrics": "Spanish rap lyrics here with line breaks...",
      "englishTranslation": "English translation of the rap...",
      "beatDescription": "Description of the beat style and rhythm...",
      "rhymeScheme": "AABB or ABAB etc.",
      "tempo": "${tempo}",
      "practiceExercises": ["exercise1", "exercise2", ...],
      "culturalNotes": "Cultural notes about Spanish music..." (optional)
    }`

    // Generate content with safety settings
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.8, // Higher creativity for musical content
        maxOutputTokens: 3048, // More tokens for lyrics
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

    const responseText = result.response.text()

    // Extract JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("Could not extract JSON from response")
    }

    const jsonResponse = JSON.parse(jsonMatch[0])

    return {
      success: true,
      lesson: jsonResponse as MusicalLesson,
    }
  } catch (error) {
    console.error("Error generating musical lesson with Gemini:", error)
    return {
      success: false,
      error: `Failed to generate musical lesson: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

export async function saveMusicalLessonContent(lessonData: MusicalLesson) {
  try {
    // In a real app, this would save to a database
    // For now, we'll just log it and revalidate the path

    const newLesson = {
      id: `musical-${uuidv4()}`,
      slug: lessonData.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, ""),
      title: lessonData.title,
      description: lessonData.description,
      videoUrl: null,
      audioUrl: null,
      progress: 0,
      category: lessonData.category,
      difficulty: lessonData.difficulty,
      learningPoints: lessonData.learningObjectives,
      vocabularyWords: lessonData.vocabularyWords,
      rapLyrics: lessonData.rapLyrics,
      englishTranslation: lessonData.englishTranslation,
      beatDescription: lessonData.beatDescription,
      rhymeScheme: lessonData.rhymeScheme,
      tempo: lessonData.tempo,
      exercises: lessonData.practiceExercises,
      culturalNotes: lessonData.culturalNotes || null,
      type: "musical",
    }

    console.log("Saved new musical lesson:", newLesson)

    // In a real app, you would add this to your database
    // For now, we'll just revalidate the paths
    revalidatePath("/lessons")
    revalidatePath("/dashboard")

    return { success: true, lessonId: newLesson.id }
  } catch (error) {
    console.error("Error saving musical lesson content:", error)
    return {
      success: false,
      error: `Failed to save musical lesson: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

export async function generateLessonWithGemini({ topic, category, difficulty }: LessonGenerationParams) {
  try {
    // Get available model
    const { model } = await getAvailableModel()

    const prompt = `Create a comprehensive Spanish language lesson about "${topic}" in the category "${category}" for ${difficulty} level students.
    
    Please provide the following in a structured format:
    1. A catchy title for the lesson
    2. A brief description (2-3 sentences)
    3. 5-8 learning objectives
    4. 10-15 vocabulary words related to the topic (Spanish words with English translations)
    5. Detailed lesson content with explanations and examples
    6. 3-5 practice exercises
    7. Cultural notes related to the topic (optional)
    
    Format your response as JSON with the following structure:
    {
      "title": "Lesson Title",
      "description": "Brief description here...",
      "category": "${category}",
      "difficulty": "${difficulty}",
      "vocabularyWords": ["word1 - translation", "word2 - translation", ...],
      "learningObjectives": ["objective1", "objective2", ...],
      "lessonContent": "Detailed lesson content here...",
      "practiceExercises": ["exercise1", "exercise2", ...],
      "culturalNotes": "Cultural notes here..." (optional)
    }`

    // Generate content with safety settings
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
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

    const responseText = result.response.text()

    // Extract JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("Could not extract JSON from response")
    }

    const jsonResponse = JSON.parse(jsonMatch[0])

    return {
      success: true,
      lesson: jsonResponse as GeneratedLesson,
    }
  } catch (error) {
    console.error("Error generating lesson with Gemini:", error)
    return {
      success: false,
      error: `Failed to generate lesson: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

export async function saveLessonContent(lessonData: GeneratedLesson) {
  try {
    // In a real app, this would save to a database
    // For now, we'll just log it and revalidate the path

    const newLesson = {
      id: `gemini-${uuidv4()}`,
      slug: lessonData.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, ""),
      title: lessonData.title,
      description: lessonData.description,
      videoUrl: null,
      audioUrl: null,
      progress: 0,
      category: lessonData.category,
      difficulty: lessonData.difficulty,
      learningPoints: lessonData.learningObjectives,
      vocabularyWords: lessonData.vocabularyWords,
      content: lessonData.lessonContent,
      exercises: lessonData.practiceExercises,
      culturalNotes: lessonData.culturalNotes || null,
    }

    console.log("Saved new AI-generated lesson:", newLesson)

    // In a real app, you would add this to your database
    // For now, we'll just revalidate the paths
    revalidatePath("/lessons")
    revalidatePath("/dashboard")

    return { success: true, lessonId: newLesson.id }
  } catch (error) {
    console.error("Error saving lesson content:", error)
    return {
      success: false,
      error: `Failed to save lesson: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

export async function createCustomLesson(lessonData: CustomLessonData) {
  try {
    // In a real app, this would save to a database
    // For now, we'll just log it and revalidate the path

    const newLesson = {
      id: `custom-${uuidv4()}`,
      slug: lessonData.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, ""),
      title: lessonData.title,
      description: lessonData.description,
      videoUrl: null,
      audioUrl: null,
      progress: 0,
      category: lessonData.category || "Custom",
      learningPoints: lessonData.learningPoints || [],
      vocabularyWords: lessonData.vocabularyWords || [],
    }

    console.log("Created new custom lesson:", newLesson)

    // In a real app, you would add this to your database
    // For now, we'll just revalidate the paths
    revalidatePath("/lessons")
    revalidatePath("/dashboard")

    return { success: true, lessonId: newLesson.id }
  } catch (error) {
    console.error("Error creating custom lesson:", error)
    return { success: false, error: "Failed to create lesson" }
  }
}

export async function generateLessonContent(title: string, category: string) {
  try {
    const prompt = `Create a Spanish language lesson about "${title}" in the category "${category}".
    
    Please provide:
    1. A brief description of the lesson (2-3 sentences)
    2. A list of 8-12 vocabulary words related to the topic (just the Spanish words)
    3. 3-5 learning points/objectives for the lesson
    
    Format your response as JSON with the following structure:
    {
      "description": "Description here...",
      "vocabularyWords": ["word1", "word2", "word3", ...],
      "learningPoints": ["point1", "point2", "point3", ...]
    }`

    const response = await generateText({
      model: xai("grok-1"),
      messages: [{ role: "user", content: prompt }],
    })

    // Parse the JSON response
    try {
      const jsonResponse = JSON.parse(response.text)
      return {
        success: true,
        description: jsonResponse.description,
        vocabularyWords: jsonResponse.vocabularyWords,
        learningPoints: jsonResponse.learningPoints,
      }
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError)
      return { success: false, error: "Failed to parse generated content" }
    }
  } catch (error) {
    console.error("Error generating lesson content:", error)
    return { success: false, error: "Failed to generate lesson content" }
  }
}

export async function generateSongLyrics(topic: string, vocabularyWords: string[]) {
  try {
    const prompt = `Create a short, catchy song in Spanish to help students learn vocabulary about "${topic}". 
    
    Include these vocabulary words: ${vocabularyWords.join(", ")}
    
    The song should:
    1. Be 8-12 lines long
    2. Have a simple, repeating chorus
    3. Include both Spanish and English translations
    4. Be set to a hip-hop rhythm
    5. Be easy to remember
    
    Format your response with Spanish lyrics first, followed by English translation.`

    const response = await generateText({
      model: xai("grok-1"),
      messages: [{ role: "user", content: prompt }],
    })

    return { success: true, lyrics: response.text }
  } catch (error) {
    console.error("Error generating song lyrics:", error)
    return { success: false, error: "Failed to generate song lyrics" }
  }
}
