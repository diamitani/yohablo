import { PronunciationPractice } from "@/components/pronunciation-practice"
import { PageHeader } from "@/components/page-header"
import { notFound } from "next/navigation"
import { lessons } from "@/lib/data"

// This is a Server Component
export default function PronunciationPracticePage({ params }: { params: { slug: string } }) {
  const { slug } = params

  // Get lesson vocabulary
  const lesson = lessons.find((lesson) => lesson.slug === slug)

  // If lesson not found, return 404
  if (!lesson || !lesson.vocabularyWords || lesson.vocabularyWords.length === 0) {
    notFound()
  }

  // Create practice words from vocabulary words
  const practiceWords = lesson.vocabularyWords.map((word, index) => {
    // Use a more reliable audio source - no audio URL initially
    // This will trigger TTS generation via the "Generate Audio" button
    return {
      id: `${lesson.slug}-${index}`,
      word,
      translation: getTranslation(word),
      audioUrl: undefined, // Let the system generate TTS audio
      category: lesson.category || "Vocabulary",
      difficulty: getDifficulty(word),
    }
  })

  return (
    <div className="container py-8">
      <PageHeader
        title={`Practice: ${lesson.title}`}
        description="Practice your pronunciation with these vocabulary words. Click 'Generate Audio' to hear the correct pronunciation."
      />

      <div className="mt-8">
        <PronunciationPractice
          title={`${lesson.title} - Pronunciation Practice`}
          description="Listen to the correct pronunciation, then record yourself saying each word"
          words={practiceWords}
        />
      </div>
    </div>
  )
}

// Helper function to determine difficulty
function getDifficulty(word: string): "easy" | "medium" | "hard" {
  // Simple algorithm based on word length and complexity
  if (word.length <= 4) return "easy"
  if (word.length <= 7) return "medium"
  return "hard"
}

// Helper function to simulate translations
function getTranslation(word: string): string {
  const translations: Record<string, string> = {
    // Numbers
    Cero: "Zero",
    Uno: "One",
    Dos: "Two",
    Tres: "Three",
    Cuatro: "Four",
    Cinco: "Five",
    Seis: "Six",
    Siete: "Seven",
    Ocho: "Eight",
    Nueve: "Nine",
    Diez: "Ten",
    Once: "Eleven",
    Doce: "Twelve",
    Trece: "Thirteen",
    Catorce: "Fourteen",
    Quince: "Fifteen",
    Dieciséis: "Sixteen",
    Diecisiete: "Seventeen",
    Dieciocho: "Eighteen",
    Diecinueve: "Nineteen",
    Veinte: "Twenty",
    // Colors
    Rojo: "Red",
    Azul: "Blue",
    Verde: "Green",
    Amarillo: "Yellow",
    Negro: "Black",
    Blanco: "White",
    Naranja: "Orange",
    Morado: "Purple",
    Rosa: "Pink",
    Gris: "Gray",
    // Family
    Madre: "Mother",
    Padre: "Father",
    Hermano: "Brother",
    Hermana: "Sister",
    Abuelo: "Grandfather",
    Abuela: "Grandmother",
    Tío: "Uncle",
    Tía: "Aunt",
    Primo: "Cousin (male)",
    Prima: "Cousin (female)",
    // Default
    default: "Translation not available",
  }

  return translations[word] || translations["default"]
}

// Generate static paths for all lessons with vocabulary words
export function generateStaticParams() {
  return lessons
    .filter((lesson) => lesson.vocabularyWords && lesson.vocabularyWords.length > 0)
    .map((lesson) => ({
      slug: lesson.slug,
    }))
}
