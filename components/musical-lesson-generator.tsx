"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { generateMusicalLessonWithGemini, saveMusicalLessonContent } from "@/app/api/lessons/actions"
import { Loader2, Music, Mic, Save, BookOpen, Target, List, Volume2 } from "lucide-react"

interface MusicalLesson {
  title: string
  description: string
  category: string
  difficulty: string
  vocabularyWords: string[]
  learningObjectives: string[]
  rapLyrics: string
  englishTranslation: string
  beatDescription: string
  practiceExercises: string[]
  culturalNotes?: string
  rhymeScheme: string
  tempo: string
}

export function MusicalLessonGenerator() {
  const { toast } = useToast()
  const [topic, setTopic] = useState("")
  const [category, setCategory] = useState("")
  const [difficulty, setDifficulty] = useState("beginner")
  const [musicStyle, setMusicStyle] = useState("hip-hop")
  const [tempo, setTempo] = useState("medium")
  const [isPending, startTransition] = useTransition()
  const [isSaving, setIsSaving] = useState(false)
  const [generatedLesson, setGeneratedLesson] = useState<MusicalLesson | null>(null)

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

  const musicStyles = [
    { value: "hip-hop", label: "Hip-Hop", description: "Urban beats with strong rhythm" },
    { value: "reggaeton", label: "Reggaeton", description: "Latin urban music with dembow rhythm" },
    { value: "salsa", label: "Salsa", description: "Traditional Latin dance music" },
    { value: "bachata", label: "Bachata", description: "Romantic Dominican rhythm" },
    { value: "trap", label: "Trap Latino", description: "Modern Latin trap beats" },
    { value: "cumbia", label: "Cumbia", description: "Colombian folk rhythm" },
  ]

  const tempos = [
    { value: "slow", label: "Slow (60-80 BPM)", description: "Perfect for beginners" },
    { value: "medium", label: "Medium (80-120 BPM)", description: "Standard learning pace" },
    { value: "fast", label: "Fast (120+ BPM)", description: "Advanced, energetic" },
  ]

  const handleGenerateLesson = () => {
    if (!topic.trim()) {
      toast({
        title: "Missing topic",
        description: "Please enter a topic for your musical lesson.",
        variant: "destructive",
      })
      return
    }

    startTransition(async () => {
      try {
        const result = await generateMusicalLessonWithGemini({
          topic: topic.trim(),
          category: category || "Vocabulary",
          difficulty,
          musicStyle,
          tempo,
        })

        if (result.success && result.lesson) {
          setGeneratedLesson(result.lesson)
          toast({
            title: "🎵 Musical Lesson Generated!",
            description: "Your Spanish rap lesson has been created with Gemini AI.",
            duration: 3000,
          })
        } else {
          toast({
            title: "Generation Failed",
            description: result.error || "Failed to generate musical lesson. Please try again.",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error generating musical lesson:", error)
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        })
      }
    })
  }

  const handleSaveLesson = async () => {
    if (!generatedLesson) return

    setIsSaving(true)

    try {
      const result = await saveMusicalLessonContent(generatedLesson)

      if (result.success) {
        toast({
          title: "🎤 Musical Lesson Saved!",
          description: "Your rap lesson has been saved to the lesson library.",
        })

        // Reset form
        setTopic("")
        setCategory("")
        setDifficulty("beginner")
        setMusicStyle("hip-hop")
        setTempo("medium")
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
    setMusicStyle("hip-hop")
    setTempo("medium")
  }

  return (
    <div className="space-y-8">
      {/* Generation Form */}
      <Card className="w-full bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="h-6 w-6 text-purple-500" />🎤 Musical Lesson Generator
            <Badge variant="secondary" className="ml-2 bg-purple-100 text-purple-700">
              Powered by Gemini AI
            </Badge>
          </CardTitle>
          <p className="text-gray-600">Create engaging Spanish lessons through rap and music!</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="topic">🎯 Lesson Topic</Label>
              <Input
                id="topic"
                placeholder="e.g., Colors, Family, Food, Numbers"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                disabled={isPending}
                className="border-purple-200 focus:border-purple-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">📚 Category</Label>
              <Select value={category} onValueChange={setCategory} disabled={isPending}>
                <SelectTrigger id="category" className="border-purple-200">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="difficulty">🎓 Difficulty Level</Label>
              <Select value={difficulty} onValueChange={setDifficulty} disabled={isPending}>
                <SelectTrigger id="difficulty" className="border-purple-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">🌱 Beginner (A1-A2)</SelectItem>
                  <SelectItem value="intermediate">🌿 Intermediate (B1-B2)</SelectItem>
                  <SelectItem value="advanced">🌳 Advanced (C1-C2)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="musicStyle">🎵 Music Style</Label>
              <Select value={musicStyle} onValueChange={setMusicStyle} disabled={isPending}>
                <SelectTrigger id="musicStyle" className="border-purple-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {musicStyles.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      {style.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tempo">⏱️ Tempo</Label>
              <Select value={tempo} onValueChange={setTempo} disabled={isPending}>
                <SelectTrigger id="tempo" className="border-purple-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tempos.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Music Style Description */}
          {musicStyle && (
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="text-sm text-purple-700">
                <strong>{musicStyles.find((s) => s.value === musicStyle)?.label}:</strong>{" "}
                {musicStyles.find((s) => s.value === musicStyle)?.description}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleGenerateLesson}
            disabled={isPending || !topic.trim()}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />🎵 Creating Your Musical Lesson...
              </>
            ) : (
              <>
                <Mic className="mr-2 h-4 w-4" />🎤 Generate Musical Lesson
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Generated Musical Lesson Display */}
      {generatedLesson && (
        <Card className="w-full bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-6 w-6 text-blue-500" />🎵 Your Musical Lesson
              </CardTitle>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-blue-100">
                  {generatedLesson.category}
                </Badge>
                <Badge variant="outline" className="bg-purple-100">
                  {generatedLesson.difficulty}
                </Badge>
                <Badge variant="outline" className="bg-pink-100">
                  {generatedLesson.tempo} tempo
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue="rap" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="rap">🎤 Rap Lyrics</TabsTrigger>
                <TabsTrigger value="translation">📝 Translation</TabsTrigger>
                <TabsTrigger value="practice">🎯 Practice</TabsTrigger>
                <TabsTrigger value="details">📚 Details</TabsTrigger>
              </TabsList>

              <TabsContent value="rap" className="space-y-4">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg border-2 border-purple-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Music className="h-6 w-6 text-purple-500" />
                    {generatedLesson.title}
                  </h3>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-purple-700 mb-2">🎵 Spanish Rap Lyrics:</h4>
                    <div className="whitespace-pre-wrap text-gray-800 leading-relaxed font-mono text-lg">
                      {generatedLesson.rapLyrics}
                    </div>
                  </div>
                  <div className="mt-4 bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>🎼 Beat Style:</strong> {generatedLesson.beatDescription}
                    </p>
                    <p className="text-sm text-blue-700">
                      <strong>🎵 Rhyme Scheme:</strong> {generatedLesson.rhymeScheme}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="translation" className="space-y-4">
                <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                  <h4 className="font-semibold text-green-700 mb-4 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />📖 English Translation:
                  </h4>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                      {generatedLesson.englishTranslation}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="practice" className="space-y-4">
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                    <Target className="h-5 w-5 text-orange-500" />🎯 Practice Exercises
                  </h4>
                  {generatedLesson.practiceExercises.map((exercise, index) => (
                    <div key={index} className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                      <div className="flex items-start gap-2">
                        <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <p className="text-gray-700 flex-1">{exercise}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <div className="space-y-4">
                  {/* Description */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-2">📝 Lesson Description:</h4>
                    <p className="text-gray-700">{generatedLesson.description}</p>
                  </div>

                  {/* Learning Objectives */}
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                      <Target className="h-5 w-5" />🎯 Learning Objectives:
                    </h4>
                    <ul className="space-y-2">
                      {generatedLesson.learningObjectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span className="text-gray-700">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Vocabulary */}
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-700 mb-3 flex items-center gap-2">
                      <List className="h-5 w-5" />📚 Vocabulary Words:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {generatedLesson.vocabularyWords.map((word, index) => (
                        <Badge key={index} variant="secondary" className="text-sm bg-purple-100 text-purple-700">
                          {word}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Cultural Notes */}
                  {generatedLesson.culturalNotes && (
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-700 mb-2">🌎 Cultural Notes:</h4>
                      <p className="text-gray-700">{generatedLesson.culturalNotes}</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex gap-3">
            <Button onClick={handleSaveLesson} disabled={isSaving} className="flex-1 bg-green-500 hover:bg-green-600">
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />💾 Save Musical Lesson
                </>
              )}
            </Button>
            <Button onClick={handleNewLesson} variant="outline" className="border-purple-200 hover:bg-purple-50">
              🎵 Create New Song
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
