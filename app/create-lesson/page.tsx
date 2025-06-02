import { PageHeader } from "@/components/page-header"
import { MusicalLessonGenerator } from "@/components/musical-lesson-generator"

export default function MusicalLessonGeneratorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="🎵 Musical Lesson Generator"
        description="Create engaging Spanish lessons through rap and music with Gemini AI"
      />
      <div className="mt-8">
        <MusicalLessonGenerator />
      </div>
    </div>
  )
}
