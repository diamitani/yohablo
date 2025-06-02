"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LessonGenerator } from "@/components/lesson-generator"
import { MusicalLessonGenerator } from "@/components/musical-lesson-generator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { createCustomLesson } from "@/app/api/lessons/actions"
import { BookOpen, Music, Wand2, Plus, Sparkles } from "lucide-react"

export default function CreateLessonPage() {
  const { toast } = useToast()
  const [isCreating, setIsCreating] = useState(false)
  const [customLesson, setCustomLesson] = useState({
    title: "",
    description: "",
    category: "",
    vocabularyWords: [] as string[],
    learningPoints: [] as string[],
  })

  const handleCreateCustomLesson = async () => {
    if (!customLesson.title.trim() || !customLesson.description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide at least a title and description.",
        variant: "destructive",
      })
      return
    }

    setIsCreating(true)

    try {
      const result = await createCustomLesson(customLesson)

      if (result.success) {
        toast({
          title: "Lesson Created",
          description: "Your custom lesson has been created successfully.",
        })

        // Reset form
        setCustomLesson({
          title: "",
          description: "",
          category: "",
          vocabularyWords: [],
          learningPoints: [],
        })
      } else {
        toast({
          title: "Creation Failed",
          description: result.error || "Failed to create lesson. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error creating lesson:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCreating(false)
    }
  }

  const addVocabularyWord = () => {
    setCustomLesson((prev) => ({
      ...prev,
      vocabularyWords: [...prev.vocabularyWords, ""],
    }))
  }

  const updateVocabularyWord = (index: number, value: string) => {
    setCustomLesson((prev) => ({
      ...prev,
      vocabularyWords: prev.vocabularyWords.map((word, i) => (i === index ? value : word)),
    }))
  }

  const removeVocabularyWord = (index: number) => {
    setCustomLesson((prev) => ({
      ...prev,
      vocabularyWords: prev.vocabularyWords.filter((_, i) => i !== index),
    }))
  }

  const addLearningPoint = () => {
    setCustomLesson((prev) => ({
      ...prev,
      learningPoints: [...prev.learningPoints, ""],
    }))
  }

  const updateLearningPoint = (index: number, value: string) => {
    setCustomLesson((prev) => ({
      ...prev,
      learningPoints: prev.learningPoints.map((point, i) => (i === index ? value : point)),
    }))
  }

  const removeLearningPoint = (index: number) => {
    setCustomLesson((prev) => ({
      ...prev,
      learningPoints: prev.learningPoints.filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Lesson</h1>
          <p className="text-muted-foreground">Create engaging Spanish lessons for your students</p>
        </div>
      </div>

      <Tabs defaultValue="ai-lesson" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ai-lesson" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI Lesson Generator
          </TabsTrigger>
          <TabsTrigger value="musical-lesson" className="flex items-center gap-2">
            <Music className="h-4 w-4" />
            Musical Lesson
          </TabsTrigger>
          <TabsTrigger value="custom-lesson" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Custom Lesson
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai-lesson" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-purple-500" />
                AI-Powered Lesson Generator
              </CardTitle>
              <CardDescription>Use Gemini AI to create comprehensive Spanish lessons automatically</CardDescription>
            </CardHeader>
            <CardContent>
              <LessonGenerator />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="musical-lesson" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="h-5 w-5 text-pink-500" />
                Musical Lesson Generator
              </CardTitle>
              <CardDescription>Create engaging rap and music-based Spanish lessons with AI</CardDescription>
            </CardHeader>
            <CardContent>
              <MusicalLessonGenerator />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom-lesson" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                Custom Lesson Builder
              </CardTitle>
              <CardDescription>Create a lesson manually with your own content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Lesson Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Spanish Colors and Emotions"
                    value={customLesson.title}
                    onChange={(e) => setCustomLesson((prev) => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={customLesson.category}
                    onValueChange={(value) => setCustomLesson((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vocabulary">Vocabulary</SelectItem>
                      <SelectItem value="grammar">Grammar</SelectItem>
                      <SelectItem value="conversation">Conversation</SelectItem>
                      <SelectItem value="culture">Culture</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="family">Family</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what students will learn in this lesson..."
                  value={customLesson.description}
                  onChange={(e) => setCustomLesson((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Vocabulary Words</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addVocabularyWord}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Word
                  </Button>
                </div>
                <div className="space-y-2">
                  {customLesson.vocabularyWords.map((word, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Spanish word - English translation"
                        value={word}
                        onChange={(e) => updateVocabularyWord(index, e.target.value)}
                      />
                      <Button type="button" variant="outline" size="sm" onClick={() => removeVocabularyWord(index)}>
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Learning Points</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addLearningPoint}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Point
                  </Button>
                </div>
                <div className="space-y-2">
                  {customLesson.learningPoints.map((point, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Learning objective or key point"
                        value={point}
                        onChange={(e) => updateLearningPoint(index, e.target.value)}
                      />
                      <Button type="button" variant="outline" size="sm" onClick={() => removeLearningPoint(index)}>
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={handleCreateCustomLesson} disabled={isCreating} className="w-full">
                {isCreating ? "Creating..." : "Create Custom Lesson"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
