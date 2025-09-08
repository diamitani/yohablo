"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const featuredLessons = [
  {
    id: "colors",
    title: "Spanish Colors (Colores)",
    description:
      "Learn colors through hip-hop beats with 'Verde' for green, 'Rojo' for red, and more vibrant vocabulary.",
    image: "/spanish-colors-rainbow-lesson.png",
    duration: "25 min",
    level: "Beginner",
    students: "2.3k",
    rating: 4.9,
    category: "Vocabulary",
    highlights: ["Interactive worksheets", "Hip-hop audio", "Color recognition games"],
    slug: "colors-colores",
  },
  {
    id: "numbers",
    title: "Numbers 0-100 (Números)",
    description: "Master Spanish numbers with the viral '0 to 100' hip-hop track that students can't stop singing.",
    image: "/spanish-numbers-lesson.png",
    duration: "30 min",
    level: "Beginner",
    students: "3.1k",
    rating: 4.8,
    category: "Numbers",
    highlights: ["Counting songs", "Fill-in worksheets", "Number games"],
    slug: "numbers-0-to-100",
  },
  {
    id: "neighborhood",
    title: "Neighborhood Places (El Barrio)",
    description:
      "Explore your neighborhood in Spanish with 'The Corner' - learn places like 'la escuela', 'el parque', and more.",
    image: "/spanish-city-neighborhood-lesson.png",
    duration: "35 min",
    level: "Intermediate",
    students: "1.8k",
    rating: 4.7,
    category: "Places",
    highlights: ["Location vocabulary", "Interactive maps", "Real-world practice"],
    slug: "neighborhood-places",
  },
]

export function LessonPlansPreview() {
  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Spanish Lessons</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hip-hop powered lessons that make Spanish vocabulary stick in students' minds
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredLessons.map((lesson) => (
            <Card key={lesson.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative">
                <Image
                  src={lesson.image || "/placeholder.svg"}
                  alt={lesson.title}
                  width={400}
                  height={240}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-black">
                    {lesson.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">{lesson.level}</div>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg line-clamp-2">{lesson.title}</CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2">{lesson.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{lesson.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{lesson.students}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{lesson.rating}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">What you'll learn:</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {lesson.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button asChild className="w-full">
                  <Link href={`/lessons/${lesson.slug}`}>
                    <Play className="h-4 w-4 mr-2" />
                    Start Lesson
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link href="/lessons">View All Lessons</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
