"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { generateLessonWithGemini, saveLessonContent } from "@/app/api/lessons/actions"
import { Loader2, Wand2, Save, Sparkles, BookOpen, Target, List } from "lucide-react"

interface GeneratedLesson {
  title: string
  description: string
  category: string
  difficulty: string
  vocabularyWords: string[]
  learningObjectives: string[]
  lessonContent: string
  practiceExercises: string[]
  culturalNotes?: string
}

export function LessonGenerator() {
  const { toast } = useToast()
  const [topic, setTopic] = useState("")
  const [category, setCategory] = useState("")
  const [difficulty, setDifficulty] = useState("beginner")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [generatedLesson, setGeneratedLesson] = useState<GeneratedLesson | null>(null)

  const categories = [
    "Vocabulary",
    "Grammar",
    "Conversation",
    "Culture",
    "Music",
    "Food",
    "Travel",
    "Family",
    "Work",
    "Health",
    "Sports",
    "Technology",
  ]

  const handleGenerateLesson = async () => {
    if (!topic.trim()) {
      toast({
        title: "Missing topic",
        description: "Please enter a topic for your lesson.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      const result = await generateLessonWithGemini({
        topic: topic.trim(),
        category: category || "Vocabulary",
        difficulty,
      })

      if (result.success && result.lesson) {
        setGeneratedLesson(result.lesson)
        toast({
          title: "Lesson Generated Successfully",
          description: "Your Spanish lesson has been created using Gemini AI.",
          duration: 3000,
        })
      } else {
        toast({
          title: "Generation Failed",
          description: result.error || "Failed to generate lesson. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error generating lesson:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSaveLesson = async () => {
    if (!generatedLesson) return

    setIsSaving(true)

    try {
      const result = await saveLessonContent(generatedLesson)

      if (result.success) {
        toast({
          title: "Lesson Saved",
          description: "Your generated lesson has been saved successfully.",
        })

        // Reset form
        setTopic("")
        setCategory("")
        setDifficulty("beginner")
        setGeneratedLesson(null)
      } else {
        toast({
          title: "Save Failed",
          description: result.error || "Failed to save lesson. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error saving lesson:", error)
      toast({
        title: "Error",
        description: "Something went wrong while saving. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleNewLesson = () => {
    setGeneratedLesson(null)
    setTopic("")
    setCategory("")
    setDifficulty("beginner")
  }

  return (
    <div className="space-y-8">
      {/* Generation Form */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            AI Lesson Generator
            <Badge variant="secondary" className="ml-2">
              Powered by Gemini
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Lesson Topic</Label>
              <Input
                id="topic"
                placeholder="e.g., Colors in Spanish, Family Members, Food Vocabulary"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                disabled={isGenerating}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} disabled={isGenerating}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty Level</Label>
            <Select value={difficulty} onValueChange={setDifficulty} disabled={isGenerating}>
              <SelectTrigger id="difficulty">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner (A1-A2)</SelectItem>
                <SelectItem value="intermediate">Intermediate (B1-B2)</SelectItem>
                <SelectItem value="advanced">Advanced (C1-C2)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleGenerateLesson} disabled={isGenerating || !topic.trim()} className="w-full">
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating with Gemini AI...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Lesson
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Generated Lesson Display */}
      {generatedLesson && (
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                Generated Lesson
              </CardTitle>
              <div className="flex gap-2">
                <Badge variant="outline">{generatedLesson.category}</Badge>
                <Badge variant="outline">{generatedLesson.difficulty}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Lesson Title and Description */}
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-gray-900">{generatedLesson.title}</h3>
              <p className="text-gray-600 leading-relaxed">{generatedLesson.description}</p>
            </div>

            {/* Learning Objectives */}
            <div className="space-y-3">
              <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                <Target className="h-5 w-5 text-green-500" />
                Learning Objectives
              </h4>
              <ul className="space-y-2">
                {generatedLesson.learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span className="text-gray-700">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vocabulary Words */}
            <div className="space-y-3">
              <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                <List className="h-5 w-5 text-blue-500" />
                Vocabulary Words
              </h4>
              <div className="flex flex-wrap gap-2">
                {generatedLesson.vocabularyWords.map((word, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {word}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Lesson Content */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-800">Lesson Content</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">{generatedLesson.lessonContent}</div>
              </div>
            </div>

            {/* Practice Exercises */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-800">Practice Exercises</h4>
              <div className="space-y-3">
                {generatedLesson.practiceExercises.map((exercise, index) => (
                  <div key={index} className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-gray-700">{exercise}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cultural Notes */}
            {generatedLesson.culturalNotes && (
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-gray-800">Cultural Notes</h4>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">{generatedLesson.culturalNotes}</p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex gap-3">
            <Button onClick={handleSaveLesson} disabled={isSaving} className="flex-1">
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Lesson
                </>
              )}
            </Button>
            <Button onClick={handleNewLesson} variant="outline">
              Generate New Lesson
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
