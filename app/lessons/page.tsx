import { LessonsList } from "@/components/lessons-list"
import { PageHeader } from "@/components/page-header"

export default function LessonsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Spanish Lessons"
        description="Browse our collection of Spanish lessons taught through hip hop and music"
      />
      <LessonsList />
    </div>
  )
}
