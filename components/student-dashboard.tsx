"use client"

import { useMode } from "@/components/mode-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { lessons } from "@/lib/data"
import { LessonCard } from "@/components/lesson-card"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LearningPlan } from "@/components/learning-plan"

export function StudentDashboard() {
  const { mode } = useMode()
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Get unique categories
  const categories = ["all", ...new Set(lessons.map((lesson) => lesson.category || "Uncategorized"))]

  // Redirect if not in AI mode
  useEffect(() => {
    if (mode === "classic") {
      redirect("/")
    }
  }, [mode])

  // Calculate overall progress
  const overallProgress = lessons.reduce((acc, lesson) => acc + (lesson.progress || 0), 0) / lessons.length

  // Get in-progress lessons
  const inProgressLessons = lessons.filter((lesson) => (lesson.progress || 0) > 0 && (lesson.progress || 0) < 100)

  // Get recommended next lessons
  const recommendedLessons = lessons.filter((lesson) => (lesson.progress || 0) === 0).slice(0, 3)

  // Filter lessons by category for the "Browse All Lessons" section
  const filteredLessons =
    selectedCategory === "all" ? lessons : lessons.filter((lesson) => lesson.category === selectedCategory)

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(overallProgress)}%</div>
            <Progress value={overallProgress} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {lessons.filter((lesson) => (lesson.progress || 0) === 100).length}/{lessons.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vocabulary Words</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {lessons.reduce((total, lesson) => total + (lesson.vocabularyWords?.length || 0), 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 days</div>
          </CardContent>
        </Card>
      </div>

      {/* Personalized Learning Plan */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Learning Plan</h2>
        <LearningPlan />
      </div>

      {inProgressLessons.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Continue Learning</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {inProgressLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} showProgress={true} />
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold mb-4">Recommended Next Lessons</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recommendedLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} showProgress={true} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Browse All Lessons</h2>
        <Tabs defaultValue="all" onValueChange={setSelectedCategory} className="w-full mb-6">
          <TabsList className="w-full overflow-auto">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="min-w-max">
                {category === "all" ? "All Lessons" : category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredLessons.slice(0, 6).map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} showProgress={true} />
          ))}
        </div>
        {filteredLessons.length > 6 && (
          <div className="mt-4 text-center">
            <Link href="/lessons">
              <Button variant="outline">View All {filteredLessons.length} Lessons</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
