"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, Users, Star, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const featuredLessons = [
  {
    id: "colors-colores",
    title: "Colors (Colores)",
    description:
      "Master Spanish color vocabulary with catchy hip-hop beats. Students learn all 11 basic colors through memorable rhymes and rhythm.",
    image: "/spanish-colors-rainbow-lesson.png",
    duration: "15 min",
    level: "Beginner",
    students: "2,847",
    rating: 4.9,
    category: "Vocabulary",
    highlights: ["11 color words", "Hip-hop beats", "Visual learning"],
    slug: "colors-colores",
  },
  {
    id: "numbers-0-100",
    title: "Numbers (0 to 100)",
    description:
      "Count from zero to one hundred in Spanish with our viral hip-hop song. Students memorize number patterns effortlessly.",
    image: "/spanish-numbers-lesson.png",
    duration: "18 min",
    level: "Beginner",
    students: "3,521",
    rating: 4.8,
    category: "Fundamentals",
    highlights: ["0-100 counting", "Pattern recognition", "Memory techniques"],
    slug: "numeros",
  },
  {
    id: "neighborhood-places",
    title: "Neighborhood Places",
    description:
      "Learn vocabulary for places in your neighborhood through 'The Corner' - a hip-hop journey through city locations.",
    image: "/spanish-city-neighborhood-lesson.png",
    duration: "20 min",
    level: "Intermediate",
    students: "1,923",
    rating: 4.7,
    category: "Vocabulary",
    highlights: ["City vocabulary", "Direction giving", "Real-world usage"],
    slug: "lugares",
  },
]

export function LessonPlansPreview() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium mb-4">
            <BookOpen className="h-4 w-4" />
            <span>Featured Lessons</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Hip-Hop Spanish Lessons That Work</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our most popular lessons that have helped thousands of students master Spanish vocabulary through
            music.
          </p>
        </div>

        {/* Featured Lessons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredLessons.map((lesson) => (
            <Card key={lesson.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative">
                <Image
                  src={lesson.image || "/placeholder.svg"}
                  alt={lesson.title}
                  width={400}
                  height={240}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-900">
                    {lesson.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 rounded-full p-2">
                    <Play className="h-4 w-4 text-gray-900" />
                  </div>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {lesson.level}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{lesson.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{lesson.title}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">{lesson.description}</p>

                {/* Lesson Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{lesson.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{lesson.students}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-2">
                  <div className="text-sm font-medium">What you'll learn:</div>
                  <div className="flex flex-wrap gap-2">
                    {lesson.highlights.map((highlight, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  asChild
                >
                  <Link href={`/lessons/${lesson.slug}`}>
                    <Play className="mr-2 h-4 w-4" />
                    Start Lesson
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 to-purple-100 dark:from-primary/20 dark:to-purple-900/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Spanish Teaching?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of educators using our hip-hop method to make Spanish learning engaging and effective.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/lessons">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Browse All Lessons
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/register/teacher">Start Free Trial</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
