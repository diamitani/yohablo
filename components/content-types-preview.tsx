"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Video, Music, BookOpen, Volume2 } from "lucide-react"
import { lessons } from "@/lib/data"
import { worksheetData } from "@/lib/worksheet-data"

export function ContentTypesPreview() {
  // Count content types
  const videoCount = lessons.filter((lesson) => lesson.videoUrl).length
  const audioCount = lessons.filter((lesson) => lesson.audioUrl).length
  const worksheetCount = Object.keys(worksheetData).length
  const flashcardCount = lessons.filter((lesson) => lesson.vocabularyWords && lesson.vocabularyWords.length > 0).length
  const vocabularyCount = lessons.reduce((count, lesson) => count + (lesson.vocabularyWords?.length || 0), 0)

  const contentTypes = [
    {
      title: "Video Lessons",
      count: videoCount,
      icon: <Video className="h-10 w-10 text-primary" />,
      description: "Learn through engaging hip-hop music videos",
    },
    {
      title: "Audio Lessons",
      count: audioCount,
      icon: <Music className="h-10 w-10 text-primary" />,
      description: "Listen to Spanish lessons on the go",
    },
    {
      title: "Interactive Worksheets",
      count: worksheetCount,
      icon: <FileText className="h-10 w-10 text-primary" />,
      description: "Practice with fill-in-the-blank exercises",
    },
    {
      title: "Flashcard Sets",
      count: flashcardCount,
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      description: "Master vocabulary with spaced repetition",
    },
    {
      title: "Vocabulary Words",
      count: vocabularyCount,
      icon: <Volume2 className="h-10 w-10 text-primary" />,
      description: "Learn essential Spanish vocabulary with audio",
    },
  ]

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Content Library</h2>
          <p className="mt-2 text-muted-foreground max-w-[700px] mx-auto">
            Explore our growing collection of Spanish learning resources
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {contentTypes.map((type, index) => (
            <Card key={index} className="text-center">
              <CardHeader className="pb-2 pt-6 flex flex-col items-center">
                {type.icon}
                <CardTitle className="mt-4 text-xl">{type.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">{type.count}</div>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
