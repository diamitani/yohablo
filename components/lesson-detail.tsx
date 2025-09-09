"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Clock, Star, Volume2, BookOpen, Music } from "lucide-react"
import { VocabularyAudio } from "@/components/vocabulary-audio"
import { FlashcardSystem } from "@/components/flashcard-system"
import Image from "next/image"

interface LessonDetailProps {
  lesson: {
    id: string
    title: string
    description: string
    content: string
    image: string
    category: string
    level: string
    duration: string
    vocabulary: Array<{
      word: string
      translation: string
      pronunciation: string
    }>
  }
}

export function LessonDetail({ lesson }: LessonDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Convert vocabulary to flashcard format
  const flashcards = lesson.vocabulary.map((item, index) => ({
    id: `${lesson.id}-${index}`,
    word: item.word,
    pronunciation: item.pronunciation,
    category: lesson.category,
  }))

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Lesson Header */}
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative h-64 md:h-auto">
            <Image src={lesson.image || "/placeholder.svg"} alt={lesson.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button size="lg" className="bg-white/90 text-gray-900 hover:bg-white">
                <Play className="mr-2 h-5 w-5" />
                Play Lesson
              </Button>
            </div>
          </div>

          <CardHeader className="p-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{lesson.category}</Badge>
              <Badge variant="outline">{lesson.level}</Badge>
            </div>

            <CardTitle className="text-2xl mb-4">{lesson.title}</CardTitle>
            <CardDescription className="text-base mb-6">{lesson.description}</CardDescription>

            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {lesson.duration}
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                {lesson.vocabulary.length} words
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                4.8
              </div>
            </div>
          </CardHeader>
        </div>
      </Card>

      {/* Lesson Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
          <TabsTrigger value="song">Song</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Lesson Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: lesson.content.replace(/\n/g, "<br>") }} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vocabulary" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="w-5 h-5" />
                Vocabulary ({lesson.vocabulary.length} words)
              </CardTitle>
              <CardDescription>Click the audio button to hear the pronunciation of each word</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {lesson.vocabulary.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <VocabularyAudio word={item.word} />
                      <div>
                        <div className="font-semibold text-lg text-gray-900">{item.word}</div>
                        <div className="text-sm text-gray-600">{item.pronunciation}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">{item.translation}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="song" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="w-5 h-5" />
                Song Lyrics
              </CardTitle>
              <CardDescription>Spanish words are highlighted in the lyrics below</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="prose max-w-none">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: lesson.content
                        .replace(/\n/g, "<br>")
                        .replace(
                          /(Verde|Negro|Azul|Blanco|Morado|Anaranjado|Rojo|Marrón|Amarillo|Gris|Rosado|Colores)/g,
                          '<span class="bg-yellow-200 px-1 rounded font-semibold">$1</span>',
                        )
                        .replace(
                          /(Cero|Uno|Dos|Tres|Cuatro|Cinco|Seis|Siete|Ocho|Nueve|Diez)/g,
                          '<span class="bg-blue-200 px-1 rounded font-semibold">$1</span>',
                        ),
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice" className="space-y-6">
          <FlashcardSystem lessonTitle={lesson.title} flashcards={flashcards} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
