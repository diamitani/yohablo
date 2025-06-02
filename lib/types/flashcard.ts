export interface Flashcard {
  id: string
  front: string
  back: string
  audioSrc?: string
  category: string
  subcategory?: string
  difficulty: "easy" | "medium" | "hard"
}

export interface FlashcardProgress {
  id: string
  flashcardId: string
  level: number // 0-5, where 0 is new, 5 is mastered
  nextReview: string // ISO date string
  lastReviewed?: string // ISO date string
}

export interface CategoryStats {
  name: string
  total: number
  mastered: number
  reviewing: number
  learning: number
  progress: number
}

export interface PracticeSessionResult {
  date: string
  totalCards: number
  correctCards: number
  incorrectCards: number
  skippedCards: number
  averageScore: number
}
