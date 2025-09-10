"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AudioPlayer } from "@/components/audio-player"
import { VocabularyAudio } from "@/components/vocabulary-audio"
import { Search, Volume2, Clock, BookOpen, Filter } from "lucide-react"
import { lessons } from "@/lib/data"

export default function AudioLessonsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")

  const categories = ["all", ...Array.from(new Set(lessons.map((lesson) => lesson.category)))]
  const difficulties = ["all", "beginner", "intermediate", "advanced"]

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || lesson.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "all" || lesson.difficulty === selectedDifficulty

    return matchesSearch && matchesCategory && matchesDifficulty && lesson.audioSrc
  })

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Audio Lessons</h1>
        <p className="text-muted-foreground">
          Listen and learn with our comprehensive audio lessons. Each lesson includes full audio content and individual
          vocabulary pronunciation.
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Lessons
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search lessons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty === "all" ? "All Levels" : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audio Lessons Grid */}
      <div className="grid gap-6">
        {filteredLessons.map((lesson) => (
          <Card key={lesson.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-xl">{lesson.title}</CardTitle>
                  <CardDescription>{lesson.description}</CardDescription>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {lesson.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {lesson.category}
                    </div>
                    <Badge
                      variant={
                        lesson.difficulty === "beginner"
                          ? "default"
                          : lesson.difficulty === "intermediate"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {lesson.difficulty}
                    </Badge>
                  </div>
                </div>
                {lesson.imageUrl && (
                  <img
                    src={lesson.imageUrl || "/placeholder.svg"}
                    alt={lesson.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Main Lesson Audio */}
              {lesson.audioSrc && (
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    Complete Lesson Audio
                  </h3>
                  <AudioPlayer src={lesson.audioSrc} title={lesson.title} />
                </div>
              )}

              {/* Vocabulary Preview */}
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Vocabulary Preview</TabsTrigger>
                  <TabsTrigger value="all">All Vocabulary ({lesson.vocabulary.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="preview" className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {lesson.vocabulary.slice(0, 6).map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded border bg-muted/30">
                        <VocabularyAudio word={item.spanish} audioSrc={item.audioSrc} />
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-sm truncate">{item.spanish}</div>
                          <div className="text-xs text-muted-foreground truncate">{item.english}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {lesson.vocabulary.length > 6 && (
                    <p className="text-sm text-muted-foreground text-center">
                      +{lesson.vocabulary.length - 6} more words available
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="all" className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                    {lesson.vocabulary.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded border bg-muted/30">
                        <VocabularyAudio word={item.spanish} audioSrc={item.audioSrc} />
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-sm">{item.spanish}</div>
                          <div className="text-xs text-muted-foreground">{item.english}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button asChild>
                  <a href={`/lessons/${lesson.slug}`}>View Full Lesson</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href={`/flashcards/${lesson.category.toLowerCase()}`}>Practice Flashcards</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLessons.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Volume2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No audio lessons found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms or filters to find more lessons.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
