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
}
