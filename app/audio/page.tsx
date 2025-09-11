"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Play, Pause, Clock, BookOpen, Search, Volume2, Download } from "lucide-react"
import Link from "next/link"

const audioLessons = [
  {
    id: "1",
    title: "Subject & Object Pronouns (We Nosotros)",
    description: "Master Spanish pronouns with the catchy 'We Nosotros' song and comprehensive grammar explanations.",
    audioSrc: "/audio/lessons/pronouns-lesson.mp3",
    duration: "18 min",
    difficulty: "Intermediate",
    category: "Grammar",
    vocabularyCount: 16,
    lessonSlug: "pronouns",
    color: "bg-purple-500",
  },
  {
    id: "2",
    title: "Kankakee (Places in the City)",
    description: "Explore vocabulary for places in a city or town with this engaging musical lesson.",
    audioSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kankakee%20%28Places%29-GbMu0ElI9zdspOrxgMY2rbZtw8m98u.mp3",
    duration: "13 min",
    difficulty: "Beginner",
    category: "Places",
    vocabularyCount: 12,
    lessonSlug: "kankakee-places",
    color: "bg-indigo-500",
  },
  {
    id: "3",
    title: "Puff Lah (Essential Vocabulary)",
    description: "A fun hip-hop song to help you learn essential Spanish vocabulary with perfect rhythm and flow.",
    audioSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Puff%20Lah-I26hPJz9k2Yr7VGXt8khddYzxxXmkZ.mp3",
    duration: "10 min",
    difficulty: "Beginner",
    category: "Vocabulary",
    vocabularyCount: 10,
    lessonSlug: "puff-lah",
    color: "bg-green-500",
  },
  {
    id: "4",
    title: "Spa Nish (Travel Vocabulary)",
    description: "Essential Spanish vocabulary for travelers through catchy hip-hop beats and memorable phrases.",
    audioSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Spa%20Nish%20%28Travel%29-MneSoE1IMEWKgfDJRGlHq7Hm5hfeCm.mp3",
    duration: "13 min",
    difficulty: "Beginner",
    category: "Travel",
    vocabularyCount: 12,
    lessonSlug: "spa-nish-travel",
    color: "bg-teal-500",
  },
  {
    id: "5",
    title: "The Docs (Health & Medical)",
    description: "Learn health and medical vocabulary in Spanish through engaging music and practical scenarios.",
    audioSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Docs%20%28Health%29-5glsdi4N7kU8cqrwmI0CkUkMqWJyNk.mp3",
    duration: "16 min",
    difficulty: "Intermediate",
    category: "Health",
    vocabularyCount: 12,
    lessonSlug: "the-docs-health",
    color: "bg-red-500",
  },
  {
    id: "6",
    title: "I Look Good (Me Parece Guapo)",
    description: "Learn appearance and description vocabulary in Spanish through upbeat music and self-expression.",
    audioSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/I%20Look%20Good%20%28Me%20Parece%20Guapo%29-UXYICdXPrOKgDFGV5dCe7dYinVmkoL.mp3",
    duration: "12 min",
    difficulty: "Beginner",
    category: "Descriptions",
    vocabularyCount: 12,
    lessonSlug: "i-look-good",
    color: "bg-pink-500",
  },
  {
    id: "7",
    title: "Bored in the House (House & Home)",
    description: "Learn vocabulary for rooms and items in a house through relatable music about home life.",
    audioSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bored%20in%20the%20House%20%28House%29-Lb20Mso2SfpwvUicWAXkwL711bUwbw.mp3",
    duration: "11 min",
    difficulty: "Beginner",
    category: "Home",
    vocabularyCount: 13,
    lessonSlug: "bored-in-the-house",
    color: "bg-cyan-500",
  },
  {
    id: "8",
    title: "Españoletry (Spanish Adjectives)",
    description: "Master Spanish adjectives through music and rhythm, learning agreement and placement rules.",
    audioSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Espan%CC%83oletry%20%28Adjectives%29-rlBulUTAaAq2fvPnX9XslgoeZQ3uDq.mp3",
    duration: "14 min",
    difficulty: "Beginner",
    category: "Grammar",
    vocabularyCount: 12,
    lessonSlug: "espanoletry-adjectives",
    color: "bg-emerald-500",
  },
  {
    id: "9",
    title: "Book Dun (Classroom & Education)",
    description: "Learn vocabulary for classroom objects and activities through educational hip-hop music.",
    audioSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Book%20Dun%20%28Classroom%29-mGAq4h8MoWDTCpbjcBDghagS2V1iYH.mp3",
    duration: "15 min",
    difficulty: "Beginner",
    category: "Education",
    vocabularyCount: 13,
    lessonSlug: "book-dun-classroom",
    color: "bg-blue-500",
  },
  {
    id: "10",
    title: "And Teach (Clothing & Jobs)",
    description: "Learn vocabulary for clothing items and professions through engaging musical instruction.",
    audioSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/And%20Teach%20%28Clothing_Jobs%29-uPy5rlMhaRU6zUVs0jeKn87NTNrNjn.mp3",
    duration: "12 min",
    difficulty: "Beginner",
    category: "Vocabulary",
    vocabularyCount: 16,
    lessonSlug: "and-teach-clothing-jobs",
    color: "bg-orange-500",
  },
]

const categories = [
  { name: "All", color: "bg-gray-500" },
  { name: "Grammar", color: "bg-purple-500" },
  { name: "Places", color: "bg-indigo-500" },
  { name: "Vocabulary", color: "bg-green-500" },
  { name: "Travel", color: "bg-teal-500" },
  { name: "Health", color: "bg-red-500" },
  { name: "Descriptions", color: "bg-pink-500" },
  { name: "Home", color: "bg-cyan-500" },
  { name: "Education", color: "bg-blue-500" },
]

export default function AudioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)

  const filteredLessons = audioLessons.filter((lesson) => {
    const matchesCategory = selectedCategory === "All" || lesson.category === selectedCategory
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const totalDuration = audioLessons.reduce((sum, lesson) => {
    const minutes = Number.parseInt(lesson.duration.split(" ")[0])
    return sum + minutes
  }, 0)

  const totalVocabulary = audioLessons.reduce((sum, lesson) => sum + lesson.vocabularyCount, 0)

  const handlePlayPause = async (lessonId: string, audioSrc: string) => {
    try {
      const response = await fetch("/api/audio/play", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ audioSrc, lessonId }),
      })

      if (response.ok) {
        setCurrentlyPlaying(currentlyPlaying === lessonId ? null : lessonId)
      }
    } catch (error) {
      console.error("Error playing audio:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container px-4 md:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Spanish Audio Lessons
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Listen and learn Spanish through our collection of hip-hop audio lessons. Perfect for on-the-go learning and
            pronunciation practice.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm">
              <Volume2 className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">{audioLessons.length} Audio Lessons</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm">
              <Clock className="h-5 w-5 text-green-600" />
              <span className="font-semibold">{totalDuration} Minutes</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm">
              <BookOpen className="h-5 w-5 text-purple-600" />
              <span className="font-semibold">{totalVocabulary} Vocabulary Words</span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search audio lessons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.name)}
                className={selectedCategory === category.name ? `${category.color} text-white` : ""}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Audio Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <Card
              key={lesson.id}
              className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white dark:bg-slate-800"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge className={`${lesson.color} text-white`}>{lesson.category}</Badge>
                  <Badge variant="outline">{lesson.vocabularyCount} words</Badge>
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
                  <span className="capitalize">{lesson.difficulty}</span>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handlePlayPause(lesson.id, lesson.audioSrc)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {currentlyPlaying === lesson.id ? (
                      <Pause className="h-4 w-4 mr-2" />
                    ) : (
                      <Play className="h-4 w-4 mr-2" />
                    )}
                    {currentlyPlaying === lesson.id ? "Pause" : "Play"}
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/lessons/${lesson.lessonSlug}`}>
                      <BookOpen className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <Volume2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No audio lessons found</h3>
            <p className="text-gray-500 dark:text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Practice?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Test your listening skills with interactive worksheets based on these audio lessons.
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
