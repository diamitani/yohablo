"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Video, Music, BookOpen, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useMode } from "@/components/mode-provider"

export function LessonPlanPreview() {
  const { mode } = useMode()

  const lessonSteps = [
    {
      title: "Watch & Listen",
      description: "Learn through music and video lessons",
      icon: <Video className="h-5 w-5 text-primary" />,
    },
    {
      title: "Practice",
      description: "Complete interactive worksheets",
      icon: <FileText className="h-5 w-5 text-primary" />,
    },
    {
      title: "Memorize",
      description: "Use flashcards with audio",
      icon: <BookOpen className="h-5 w-5 text-primary" />,
    },
    {
      title: "Review",
      description: "Listen to songs and audio lessons",
      icon: <Music className="h-5 w-5 text-primary" />,
    },
    {
      title: "Master",
      description: mode === "ai" ? "Get help from AI tutor" : "Track your progress",
      icon: <CheckCircle className="h-5 w-5 text-primary" />,
    },
  ]

  return (
    <section className="py-12 bg-secondary/30 rounded-xl">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Lesson Plan</h2>
          <p className="mt-2 text-muted-foreground max-w-[700px] mx-auto">
            Yo Hablo uses a comprehensive approach to language learning that combines music, interactive content, and
            spaced repetition
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {lessonSteps.map((step, index) => (
            <Card key={index} className="h-full">
              <CardHeader className="pb-2">
                <Badge variant="outline" className="w-fit mb-2">
                  Step {index + 1}
                </Badge>
                <CardTitle className="flex items-center gap-2 text-lg">
                  {step.icon}
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/lessons">
            <Button size="lg">Start Learning Now</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
