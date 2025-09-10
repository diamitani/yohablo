import { LessonDetail } from "@/components/lesson-detail"
import { AiTutorSection } from "@/components/ai-tutor-section"
import { getLessonBySlug } from "@/lib/data"
import { notFound } from "next/navigation"
import type { Metadata } from "next/metadata"

interface LessonPageProps {
  params: {
    slug: string
  }
}

export default function LessonPage({ params }: LessonPageProps) {
  const lesson = getLessonBySlug(params.slug)

  if (!lesson) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <LessonDetail lesson={lesson} />
          <AiTutorSection lessonId={lesson.id} />
        </div>
      </div>
    </div>
  )
}

export function generateStaticParams() {
  return [
    { slug: "juli-slide-alphabet" },
    { slug: "numbers-0-101" },
    { slug: "colors-colores" },
    { slug: "family-familia" },
    { slug: "body-parts-cuerpo" },
    { slug: "weather-tiempo" },
    { slug: "places-lugares" },
    { slug: "food-comida" },
  ]
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const lesson = getLessonBySlug(params.slug)

  if (!lesson) {
    return {
      title: "Lesson Not Found | Yo Hablo",
      description: "The requested Spanish lesson could not be found.",
    }
  }

  return {
    title: `${lesson.title} | Yo Hablo`,
    description: lesson.description,
    openGraph: {
      title: lesson.title,
      description: lesson.description,
      images: lesson.thumbnail ? [lesson.thumbnail] : [],
    },
  }
}
