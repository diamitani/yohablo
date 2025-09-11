"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Clock, Users, BookOpen, ExternalLink } from "lucide-react"
import { YoutubePlayer } from "@/components/youtube-player"
import Link from "next/link"

const videoLessons = [
  {
    id: "1",
    title: "Juli Slide (Spanish Alphabet)",
    description: "Learn the Spanish alphabet through hip hop music with proper pronunciation and letter recognition.",
    videoUrl: "https://youtu.be/uOQMDaWSn6c",
    videoId: "uOQMDaWSn6c",
    duration: "15 min",
    difficulty: "Beginner",
    category: "Fundamentals",
    imageUrl: "/spanish-alphabet-lesson.png",
    lessonSlug: "alfabeto",
    stats: {
      vocabulary: 29,
      exercises: 15,
      worksheets: 1,
    },
  },
  {
    id: "2",
    title: "Colores (Colors in Spanish)",
    description: "Master Spanish color vocabulary through engaging hip hop beats and memorable lyrics.",
    videoUrl: "https://www.youtube.com/watch?v=l0W4vdQKYbI",
    videoId: "l0W4vdQKYbI",
    duration: "12 min",
    difficulty: "Beginner",
    category: "Vocabulary",
    imageUrl: "/spanish-colors-rainbow-lesson.png",
    lessonSlug: "colores",
    stats: {
      vocabulary: 11,
      exercises: 12,
      worksheets: 1,
    },
  },
  {
    id: "3",
    title: "Numbers (0 to 101)",
    description: "Count and learn numbers in Spanish with rhythm and rhyme that makes learning fun and memorable.",
    videoUrl: "https://youtu.be/iVkolTR98ew",
    videoId: "iVkolTR98ew",
    duration: "18 min",
    difficulty: "Beginner",
    category: "Numbers",
    imageUrl: "/spanish-numbers-lesson.png",
    lessonSlug: "numeros",
    stats: {
      vocabulary: 21,
      exercises: 20,
      worksheets: 1,
    },
  },
  {
    id: "4",
    title: "Cuerpo (Body Parts)",
    description: "Learn Spanish vocabulary for body parts through engaging hip hop music and visual associations.",
    videoUrl: "https://youtu.be/0KbRb6Qt34s",
    videoId: "0KbRb6Qt34s",
    duration: "14 min",
    difficulty: "Beginner",
    category: "Vocabulary",
    imageUrl: "/spanish-body-parts.png",
    lessonSlug: "cuerpo",
    stats: {
      vocabulary: 14,
      exercises: 10,
      worksheets: 1,
    },
  },
]

export default function VideosPage() {
  const totalDuration = videoLessons.reduce((sum, lesson) => {
    const minutes = Number.parseInt(lesson.duration.split(" ")[0])
    return sum + minutes
  }, 0)

  const totalVocabulary = videoLessons.reduce((sum, lesson) => sum + lesson.stats.vocabulary, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container px-4 md:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Spanish Video Lessons
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Learn Spanish through engaging hip-hop music videos. Each lesson combines catchy beats with essential
            vocabulary and grammar concepts.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm">
              <Play className="h-5 w-5 text-red-600" />
              <span className="font-semibold">{videoLessons.length} Videos</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">{totalDuration} Minutes</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm">
              <BookOpen className="h-5 w-5 text-green-600" />
              <span className="font-semibold">{totalVocabulary} Vocabulary Words</span>
            </div>
          </div>
        </div>

        {/* Featured Video */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Featured Video</h2>
          <Card className="max-w-4xl mx-auto overflow-hidden shadow-xl">
            <div className="aspect-video">
              <YoutubePlayer videoId={videoLessons[0].videoId} title={videoLessons[0].title} />
            </div>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{videoLessons[0].title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{videoLessons[0].description}</p>
                </div>
                <Badge className="bg-blue-600 text-white">{videoLessons[0].category}</Badge>
              </div>

              <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {videoLessons[0].duration}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {videoLessons[0].difficulty}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {videoLessons[0].stats.vocabulary} words
                </span>
              </div>

              <div className="flex gap-3">
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Link href={`/lessons/${videoLessons[0].lessonSlug}`}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    View Full Lesson
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={`/worksheets/${videoLessons[0].lessonSlug}`}>Practice Worksheet</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* All Videos Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">All Video Lessons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {videoLessons.map((lesson) => (
              <Card key={lesson.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="aspect-video relative">
                  <YoutubePlayer videoId={lesson.videoId} title={lesson.title} />
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">{lesson.category}</Badge>
                    <Badge variant="outline">{lesson.difficulty}</Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">{lesson.title}</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{lesson.description}</p>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {lesson.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {lesson.stats.vocabulary} words
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      asChild
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Link href={`/lessons/${lesson.lessonSlug}`}>
                        <BookOpen className="h-4 w-4 mr-2" />
                        Full Lesson
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={lesson.videoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Practice?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Test your knowledge with interactive worksheets based on these video lessons.
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Link href="/worksheets">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Practice Worksheets
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/lessons">View All Lessons</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
