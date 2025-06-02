"use client"

import type React from "react"
import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateSongWithFallback } from "@/app/api/ai/song-actions"
import { AlertCircle, HelpCircle, Loader2, Music, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function SongGenerator() {
  const [topic, setTopic] = useState("")
  const [vocabularyWords, setVocabularyWords] = useState("")
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "advanced">("beginner")
  const [song, setSong] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [provider, setProvider] = useState<string | undefined>()
  const [showTips, setShowTips] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset state
    setError(null)
    setSong("")
    setProvider(undefined)
    setShowTips(false)

    // Basic client-side validation
    if (!topic.trim()) {
      setError("Please enter a topic for your song")
      setShowTips(true)
      return
    }

    if (!vocabularyWords.trim()) {
      setError("Please enter vocabulary words for your song")
      setShowTips(true)
      return
    }

    // Split vocabulary words by commas and trim whitespace
    const wordsList = vocabularyWords
      .split(",")
      .map((word) => word.trim())
      .filter((word) => word.length > 0)

    if (wordsList.length === 0) {
      setError("Please enter at least one valid vocabulary word")
      setShowTips(true)
      return
    }

    if (wordsList.length > 20) {
      setError("Too many vocabulary words. Please limit to 20 words maximum")
      setShowTips(true)
      return
    }

    // Use startTransition to handle the server action
    startTransition(async () => {
      try {
        console.log("Calling server action...")
        const result = await generateSongWithFallback(topic.trim(), wordsList, difficulty)

        if (result.success && result.song) {
          setSong(result.song)
          setProvider(result.provider)
          setShowTips(false)
          console.log("Song generated successfully!")
        } else {
          // Use the specific error message from the server if available
          const errorMessage = result.error || "Failed to generate song. Please try again."
          setError(errorMessage)
          setShowTips(true)
          console.error("Song generation failed:", errorMessage)
        }
      } catch (err) {
        console.error("Error in song generation:", err)
        const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
        setError(errorMessage)
        setShowTips(true)
      }
    })
  }

  const handleReset = () => {
    setTopic("")
    setVocabularyWords("")
    setDifficulty("beginner")
    setSong("")
    setProvider(undefined)
    setError(null)
    setShowTips(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl flex items-center gap-2">
            <Music className="h-6 w-6" />
            Spanish Song Generator
          </CardTitle>
          <CardDescription>
            Create a custom Spanish learning song based on your vocabulary words using AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="topic">Topic</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <HelpCircle className="h-4 w-4" />
                        <span className="sr-only">Topic help</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Choose a clear topic like "Colors", "Family Members", or "Food"</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="topic"
                placeholder="e.g., Colors, Numbers, Family Members"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                disabled={isPending}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="vocabularyWords">Vocabulary Words (comma separated)</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <HelpCircle className="h-4 w-4" />
                        <span className="sr-only">Vocabulary help</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Enter 5-10 Spanish words separated by commas</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Textarea
                id="vocabularyWords"
                placeholder="e.g., rojo, azul, verde, amarillo"
                value={vocabularyWords}
                onChange={(e) => setVocabularyWords(e.target.value)}
                disabled={isPending}
                required
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select
                value={difficulty}
                onValueChange={(value) => setDifficulty(value as "beginner" | "intermediate" | "advanced")}
                disabled={isPending}
              >
                <SelectTrigger id="difficulty">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {showTips && (
              <Alert>
                <HelpCircle className="h-4 w-4" />
                <AlertTitle>Troubleshooting Tips</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>Try using fewer vocabulary words (5-10 is ideal)</li>
                    <li>Make sure your topic is clear and specific</li>
                    <li>Try a different difficulty level</li>
                    <li>Wait a few minutes and try again</li>
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Button type="button" variant="outline" onClick={handleReset} disabled={isPending} className="flex-1">
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button type="submit" disabled={isPending} className="flex-1">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Song...
                  </>
                ) : (
                  <>
                    <Music className="mr-2 h-4 w-4" />
                    Generate Song
                  </>
                )}
              </Button>
            </div>
          </form>

          {song && (
            <div className="mt-8 space-y-4">
              <div className="p-6 bg-blue-50 dark:bg-blue-950 rounded-md">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <Music className="mr-2 h-5 w-5" />
                  Your Spanish Learning Song
                </h3>
                {provider && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Generated with Google Gemini AI</p>
                )}
                <div className="whitespace-pre-wrap bg-white dark:bg-gray-800 p-4 rounded border font-mono text-sm">
                  {song}
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <p className="text-sm text-gray-500">
            Songs are generated using Google Gemini AI and may require adjustments for perfect pronunciation.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
