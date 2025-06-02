import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Users, Download } from "lucide-react"
import Link from "next/link"

export function LessonPlansPreview() {
  const lessonPlans = [
    {
      title: "Spanish Alphabet Through Hip-Hop",
      level: "Beginner",
      duration: "45 minutes",
      students: "15-30",
      description: "Complete lesson plan using Juli Slide alphabet song with activities, worksheets, and assessment.",
      includes: ["Lesson plan PDF", "Student worksheet", "Audio/Video", "Assessment rubric"],
      category: "Fundamentals",
    },
    {
      title: "Colors and Emotions Unit",
      level: "Beginner",
      duration: "3 classes",
      students: "15-30",
      description: "Multi-day unit connecting Spanish colors with emotions through music and interactive activities.",
      includes: ["3 lesson plans", "Worksheets", "Video content", "Project rubric"],
      category: "Vocabulary",
    },
    {
      title: "Family Members Through Music",
      level: "Beginner",
      duration: "50 minutes",
      students: "20-35",
      description: "Engaging lesson teaching family vocabulary through hip-hop beats and cultural connections.",
      includes: ["Lesson plan", "Family tree worksheet", "Audio tracks", "Cultural notes"],
      category: "Family & Relationships",
    },
  ]

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Plug-and-Play Lesson Plans</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete lesson plans with everything you need: objectives, activities, worksheets, videos, and assessments.
            Just download and teach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {lessonPlans.map((plan, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{plan.category}</Badge>
                  <Badge variant="secondary">{plan.level}</Badge>
                </div>
                <CardTitle className="text-xl">{plan.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{plan.description}</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{plan.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{plan.students}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Includes:</h4>
                  <ul className="space-y-1">
                    {plan.includes.map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/lesson-plans">
            <Button size="lg" className="gap-2">
              <BookOpen className="h-5 w-5" />
              View All Lesson Plans
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
