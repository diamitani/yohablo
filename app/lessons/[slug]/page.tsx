import { LessonDetail } from "@/components/lesson-detail"
import { AiTutorSection } from "@/components/ai-tutor-section"
import { PageHeader } from "@/components/page-header"
import { lessons } from "@/lib/data"
import { notFound } from "next/navigation"

export default function LessonPage({ params }: { params: { slug: string } }) {
  const lesson = lessons.find((lesson) => lesson.slug === params.slug)

  if (!lesson) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title={lesson.title} description={lesson.description} />
      <LessonDetail lesson={lesson} />
      <AiTutorSection lessonId={lesson.id} />
    </div>
  )
}

export function generateStaticParams() {
  return lessons.map((lesson) => ({
    slug: lesson.slug,
  }))
}
