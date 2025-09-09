"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, Users, Star, Download } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const featuredLessons = [
  {
    id: "colors-colores",
    title: "Colors (Colores)",
    description: "Learn Spanish color vocabulary through catchy hip-hop beats and memorable lyrics.",
    image: "/spanish-colors-rainbow-lesson.png",
    duration: "30 min",
    students: "2.3k",
    rating: 4.9,
    level: "Beginner",
    category: "Vocabulary",
    highlights: [
      "11 essential color words",
      "Cultural context and usage",
      "Interactive pronunciation guide",
      "Printable worksheet included",
    ],
    songPreview: "Verde my money is green, Negro - black is what they call me...",
    worksheetUrl: "/worksheets/Colors-Colores-Worksheet.pdf",
  },
  {
    id: "numbers-numeros",
    title: "Numbers 0-100 (Números)",
    description: "Master Spanish numbers from zero to one hundred with rhythm and flow.",
    image: "/spanish-numbers-lesson.png",
    duration: "45 min",
    students: "1.8k",
    rating: 4.8,
    level: "Beginner",
    category: "Fundamentals",
    highlights: [
      "Count 0-100 in Spanish",
      "Number patterns and formation",
      "Practical usage examples",
      "Fill-in-the-blank worksheet",
    ],
    songPreview: "Cero, that's zero or nothing, Número uno in Spanish, no bluffin'...",
    worksheetUrl: "/worksheets/Numbers-0-to-101-Worksheet.pdf",
  },
  {
    id: "neighborhood-places",
    title: "Neighborhood Places (El Barrio)",
    description: "Explore places in your neighborhood while learning essential Spanish vocabulary.",
    image: "/spanish-city-neighborhood-lesson.png",
    duration: "35 min",
    students: "1.5k",
    rating: 4.7,
    level: "Beginner",
    category: "Vocabulary",
    highlights: [
      "Essential location vocabulary",
      "Giving and asking directions",
      "Cultural neighborhood context",
      "Interactive practice activities",
    ],
    songPreview: "The corner, teaching places students can see around my corner...",
    worksheetUrl: "/worksheets/Neighborhood-The-Corner-Worksheet.pdf",
  },
]

export function LessonPlansPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            🎵 Featured Lessons
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Engaging Spanish Lessons Through Hip-Hop
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our most popular lessons that combine authentic hip-hop music with comprehensive Spanish learning
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {featuredLessons.map((lesson) => (
            <Card key={lesson.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative">
                <Image
                  src={lesson.image || "/placeholder.svg"}
                  alt={lesson.title}
                  width={400}
                  height={240}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-gray-900">{lesson.category}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-900">
                    {lesson.level}
                  </Badge>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="lg" className="bg-white/90 text-gray-900 hover:bg-white">
                    <Play className="mr-2 h-5 w-5" />
                    Start Lesson
                  </Button>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{lesson.title}</CardTitle>
                    <CardDescription className="text-gray-600">{lesson.description}</CardDescription>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500 mt-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {lesson.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {lesson.students}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {lesson.rating}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">What You'll Learn:</h4>
                  <ul className="space-y-1">
                    {lesson.highlights.map((highlight, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm">Song Preview:</h4>
                  <p className="text-sm text-gray-600 italic">"{lesson.songPreview}"</p>
                </div>

                <div className="flex gap-2">
                  <Button asChild className="flex-1">
                    <Link href={`/lessons/${lesson.id}`}>
                      <Play className="mr-2 h-4 w-4" />
                      Start Lesson
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <Link href={lesson.worksheetUrl}>
                      <Download className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
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
