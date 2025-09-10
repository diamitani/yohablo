export interface Lesson {
  id: string
  slug: string
  title: string
  description: string
  videoUrl: string | null
  worksheetUrl?: string
  audioUrl?: string | null
  thumbnail?: string
  progress?: number
  category?: string
  learningPoints?: string[]
  vocabularyWords?: string[]
  difficulty?: "beginner" | "intermediate" | "advanced"
  duration?: string
  isNew?: boolean
  isFeatured?: boolean
}

export interface VocabularyWord {
  spanish: string
  english: string
  audioUrl?: string
  pronunciation?: string
  example?: string
}

export interface FlashcardSet {
  id: string
  title: string
  description: string
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  cards: FlashCard[]
  thumbnail?: string
}

export interface FlashCard {
  id: string
  front: string
  back: string
  audioUrl?: string
  image?: string
  hint?: string
}

export interface User {
  id: string
  name: string
  email: string
  role: "student" | "teacher" | "admin"
  avatar?: string
  progress?: Record<string, number>
  preferences?: {
    language: string
    theme: "light" | "dark"
    audioEnabled: boolean
  }
}
