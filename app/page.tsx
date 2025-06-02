import { Hero } from "@/components/hero"
import { TeacherFocusedSection } from "@/components/teacher-focused-section"
import { LessonPlansPreview } from "@/components/lesson-plans-preview"
import { ContentCreationSection } from "@/components/content-creation-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { StudentAccessSection } from "@/components/student-access-section"
import { ContestBanner } from "@/components/contest-banner"

export default function Home() {
  return (
    <main className="space-y-0">
      <ContestBanner />
      <Hero />
      <TeacherFocusedSection />
      <LessonPlansPreview />
      <ContentCreationSection />
      <StudentAccessSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  )
}
