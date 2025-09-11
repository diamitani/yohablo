"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { VocabularyAudio } from "@/components/vocabulary-audio"
import { generateGeminiResponse } from "@/app/api/ai/gemini-actions"
import { RotateCcw, CheckCircle, XCircle, Shuffle, Brain, Target, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

interface FlashcardItem {
  id: string
  spanish: string
  english: string
  audioSrc?: string
  category?: string
  difficulty?: "easy" | "medium" | "hard"
}

interface FlashcardSystemProps {
  items: FlashcardItem[]
  title: string
  category?: string
}

export function FlashcardSystem({ items, title, category }: FlashcardSystemProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [incorrectCount, setIncorrectCount] = useState(0)
  const [completedCards, setCompletedCards] = useState<Set<string>>(new Set())
  const [shuffledItems, setShuffledItems] = useState<FlashcardItem[]>(items)
  const [studyMode, setStudyMode] = useState<"flashcards" | "quiz">("flashcards")
  const [aiHint, setAiHint] = useState<string>("")
  const [isLoadingHint, setIsLoadingHint] = useState(false)

  const currentCard = shuffledItems[currentIndex]
  const progress = ((correctCount + incorrectCount) / shuffledItems.length) * 100
  const accuracy = correctCount + incorrectCount > 0 ? (correctCount / (correctCount + incorrectCount)) * 100 : 0

  useEffect(() => {
    setShuffledItems([...items])
  }, [items])

  const shuffleCards = () => {
    const shuffled = [...items].sort(() => Math.random() - 0.5)
    setShuffledItems(shuffled)
    setCurrentIndex(0)
    setIsFlipped(false)
    resetProgress()
  }

  const resetProgress = () => {
    setCorrectCount(0)
    setIncorrectCount(0)
    setCompletedCards(new Set())
    setAiHint("")
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleCorrect = () => {
    if (!completedCards.has(currentCard.id)) {
      setCorrectCount((prev) => prev + 1)
      setCompletedCards((prev) => new Set([...prev, currentCard.id]))
    }
    nextCard()
  }

  const handleIncorrect = () => {
    if (!completedCards.has(currentCard.id)) {
      setIncorrectCount((prev) => prev + 1)
      setCompletedCards((prev) => new Set([...prev, currentCard.id]))
    }
    nextCard()
  }

  const nextCard = () => {
    if (currentIndex < shuffledItems.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setIsFlipped(false)
      setAiHint("")
    }
  }

  const previousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
      setIsFlipped(false)
      setAiHint("")
    }
  }

  const getAiHint = async () => {
    if (!currentCard || isLoadingHint) return

    setIsLoadingHint(true)
    try {
      const messages = [
        {
          role: "user" as const,
          content: `Give me a helpful learning tip or memory trick for the Spanish word "${currentCard.spanish}" which means "${currentCard.english}". Keep it short, fun, and memorable. Focus on pronunciation, etymology, or association techniques.`,
        },
      ]

      const result = await generateGeminiResponse(
        messages,
        `Learning flashcard: ${currentCard.spanish} = ${currentCard.english}`,
      )

      if (result.success) {
        setAiHint(result.text)
      }
    } catch (error) {
      console.error("Error getting AI hint:", error)
      setAiHint("Try breaking the word into syllables and repeating it several times!")
    } finally {
      setIsLoadingHint(false)
    }
  }

  if (!currentCard) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <Trophy className="h-16 w-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-2xl font-bold mb-2">¡Felicidades!</h3>
          <p className="text-muted-foreground mb-4">You've completed all flashcards!</p>
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-6">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{correctCount}</div>
              <div className="text-sm text-green-700">Correct</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{incorrectCount}</div>
              <div className="text-sm text-red-700">Incorrect</div>
            </div>
          </div>
          <div className="text-center mb-4">
            <div className="text-lg font-semibold">Accuracy: {Math.round(accuracy)}%</div>
          </div>
          <Button
            onClick={() => {
              setCurrentIndex(0)
              resetProgress()
            }}
          >
            Study Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">{title}</h2>
        {category && <Badge variant="secondary">{category}</Badge>}
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            Progress: {correctCount + incorrectCount} / {shuffledItems.length}
          </span>
          <span>Accuracy: {Math.round(accuracy)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-lg font-bold text-blue-600">{currentIndex + 1}</div>
          <div className="text-xs text-blue-700">Current</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-lg font-bold text-green-600">{correctCount}</div>
          <div className="text-xs text-green-700">Correct</div>
        </div>
        <div className="text-center p-3 bg-red-50 rounded-lg">
          <div className="text-lg font-bold text-red-600">{incorrectCount}</div>
          <div className="text-xs text-red-700">Incorrect</div>
        </div>
      </div>

      {/* Flashcard */}
      <div className="relative">
        <Card
          className={cn(
            "w-full h-64 cursor-pointer transition-all duration-300 transform hover:scale-105",
            isFlipped && "bg-blue-50",
          )}
          onClick={handleFlip}
        >
          <CardContent className="h-full flex flex-col items-center justify-center p-8 text-center">
            {!isFlipped ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <VocabularyAudio word={currentCard.spanish} audioSrc={currentCard.audioSrc} />
                  <h3 className="text-3xl font-bold">{currentCard.spanish}</h3>
                </div>
                <p className="text-muted-foreground">Click to reveal meaning</p>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-blue-700">{currentCard.english}</h3>
                <div className="flex items-center justify-center gap-3">
                  <VocabularyAudio word={currentCard.spanish} audioSrc={currentCard.audioSrc} />
                  <p className="text-lg text-muted-foreground">{currentCard.spanish}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Card indicator */}
        <div className="absolute top-4 right-4">
          <Badge variant="outline">
            {currentIndex + 1} / {shuffledItems.length}
          </Badge>
        </div>
      </div>

      {/* AI Hint */}
      {aiHint && (
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Brain className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-purple-800 mb-1">AI Learning Tip</h4>
                <p className="text-sm text-purple-700">{aiHint}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Controls */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button variant="outline" onClick={previousCard} disabled={currentIndex === 0}>
          Previous
        </Button>

        <Button variant="outline" onClick={handleFlip}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Flip Card
        </Button>

        <Button variant="outline" onClick={getAiHint} disabled={isLoadingHint}>
          <Brain className="h-4 w-4 mr-2" />
          {isLoadingHint ? "Getting Hint..." : "AI Hint"}
        </Button>

        <Button variant="outline" onClick={nextCard} disabled={currentIndex === shuffledItems.length - 1}>
          Next
        </Button>
      </div>

      {/* Answer Buttons (only show when flipped) */}
      {isFlipped && (
        <div className="flex gap-4 justify-center">
          <Button
            onClick={handleIncorrect}
            variant="outline"
            className="border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
          >
            <XCircle className="h-4 w-4 mr-2" />
            Incorrect
          </Button>
          <Button
            onClick={handleCorrect}
            variant="outline"
            className="border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Correct
          </Button>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center pt-4 border-t">
        <Button variant="outline" onClick={shuffleCards}>
          <Shuffle className="h-4 w-4 mr-2" />
          Shuffle
        </Button>

        <Button variant="outline" onClick={resetProgress}>
          <Target className="h-4 w-4 mr-2" />
          Reset Progress
        </Button>
      </div>
    </div>
  )
}
