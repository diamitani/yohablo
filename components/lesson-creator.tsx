"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TextToSpeech } from "@/components/text-to-speech"
import { useToast } from "@/hooks/use-toast"
import { createCustomLesson, generateLessonContent } from "@/app/api/lessons/actions"
import { Loader2, Save, Wand2 } from "lucide-react"

export function LessonCreator() {
  const { toast } = useToast()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [vocabularyWords, setVocabularyWords] = useState("")
  const [learningPoints, setLearningPoints] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("details")

  const handleGenerateContent = async () => {
    if (!title.trim()) {
      toast({
        title: "Missing title",
        description: "Please enter a title for your lesson.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      const result = await generateLessonContent(title, category || "Vocabulary")

      if (result.success) {
        setDescription(result.description || "")
        setVocabularyWords(result.vocabularyWords?.join(", ") || "")
        setLearningPoints(result.learningPoints?.join("\n") || "")

        toast({
          title: "Content generated",
          description: "Lesson content has been generated successfully.",
        })

        // Switch to the content tab
        setActiveTab("content")
      } else {
        toast({
          title: "Error",
          description: "Failed to generate lesson content. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error generating lesson content:", error)
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
    if (!title.trim()) {
      toast({
        title: "Missing title",
        description: "Please enter a title for your lesson.",
        variant: "destructive",
      })
      return
    }

    if (!description.trim()) {
      toast({
        title: "Missing description",
        description: "Please enter a description for your lesson.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      // Parse vocabulary words and learning points
      const vocabArray = vocabularyWords
        .split(",")
        .map((word) => word.trim())
        .filter((word) => word.length > 0)

      const learningPointsArray = learningPoints
        .split("\n")
        .map((point) => point.trim())
        .filter((point) => point.length > 0)

      const result = await createCustomLesson({
        title,
        description,
        category: category || "Custom",
        vocabularyWords: vocabArray,
        learningPoints: learningPointsArray,
      })

      if (result.success) {
        toast({
          title: "Lesson saved",
          description: "Your custom lesson has been saved successfully.",
        })

        // Reset form
        setTitle("")
        setDescription("")
        setCategory("")
        setVocabularyWords("")
        setLearningPoints("")
        setActiveTab("details")
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to save lesson. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error saving lesson:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create Custom Lesson</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Lesson Details</TabsTrigger>
            <TabsTrigger value="content">Lesson Content</TabsTrigger>
            <TabsTrigger value="audio">Audio Generation</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="title">Lesson Title</Label>
              <Input
                id="title"
                placeholder="e.g., Colors in Spanish"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="e.g., Vocabulary, Grammar, Conversation"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <Button onClick={handleGenerateContent} disabled={isGenerating || !title.trim()} variant="outline">
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Content
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what students will learn in this lesson..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vocabulary">Vocabulary Words (comma separated)</Label>
              <Textarea
                id="vocabulary"
                placeholder="e.g., rojo, azul, verde, amarillo"
                value={vocabularyWords}
                onChange={(e) => setVocabularyWords(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="learningPoints">Learning Points (one per line)</Label>
              <Textarea
                id="learningPoints"
                placeholder="e.g., Identify basic colors in Spanish"
                value={learningPoints}
                onChange={(e) => setLearningPoints(e.target.value)}
                rows={3}
              />
            </div>
          </TabsContent>

          <TabsContent value="audio" className="pt-4">
            <TextToSpeech defaultText={vocabularyWords || "Hola, bienvenidos a la lección de español."} />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveLesson} disabled={isSaving} className="w-full">
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
      </CardFooter>
    </Card>
  )
}
