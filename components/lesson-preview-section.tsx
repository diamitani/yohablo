"use client"

import { useState } from "react"
import { lessons } from "@/lib/data"
import { LessonCard } from "@/components/lesson-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { worksheetData } from "@/lib/worksheet-data"

export function LessonPreviewSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Get unique categories
  const categories = ["all", ...new Set(lessons.map((lesson) => lesson.category || "Uncategorized"))]

  // Filter lessons based on selected category
  const filteredLessons = lessons.filter((lesson) => {
    return selectedCategory === "all" ? true : lesson.category === selectedCategory
  })

  // Get practice-oriented lessons (those with worksheets or interactive elements)
  const practiceOrientedLessons = filteredLessons.filter(
    (lesson) => lesson.slug in worksheetData || lesson.hasInteractiveElements || lesson.audioUrl,
  )

  // Prioritize practice lessons, then take the first 3
  const featuredLessons = [
    ...practiceOrientedLessons,
    ...filteredLessons.filter(
      (lesson) => !(lesson.slug in worksheetData) && !lesson.hasInteractiveElements && !lesson.audioUrl,
    ),
  ].slice(0, 3)

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              Featured Practice Lessons
            </h2>
            <p className="text-xl text-muted-foreground">
              Explore our interactive Spanish practice lessons with worksheets and audio
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="w-full overflow-auto border-2 border-slate-200 dark:border-slate-700 rounded-lg p-1">
                {categories.slice(0, 5).map((category) => (
                  <TabsTrigger key={category} value={category} className="min-w-max text-sm h-9 px-4">
                    {category === "all" ? "All Categories" : category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/lessons">
            <Button size="lg" className="gap-2">
              View All Lessons
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
