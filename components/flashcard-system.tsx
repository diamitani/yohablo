"use client"

import { useState, useEffect } from "react"
import { Flashcard } from "@/components/flashcard"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, RotateCw, Shuffle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface FlashcardItem {
  id: string
  word: string
  pronunciation: string
  category?: string
}

interface FlashcardSystemProps {
  lessonTitle: string
  flashcards: FlashcardItem[]
}

export function FlashcardSystem({ lessonTitle, flashcards }: FlashcardSystemProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [incorrectCount, setIncorrectCount] = useState(0)
  const [reviewedCards, setReviewedCards] = useState<Set<number>>(new Set())
  const [shuffledCards, setShuffledCards] = useState<FlashcardItem[]>([])

  // Initialize shuffled cards on component mount
  useEffect(() => {
    if (flashcards && flashcards.length > 0) {
      setShuffledCards([...flashcards])
    }
  }, [flashcards])

  const currentCard = shuffledCards[currentIndex]
  const totalReviewed = reviewedCards.size
  const progress = flashcards.length > 0 ? (totalReviewed / flashcards.length) * 100 : 0

  const handleCorrect = () => {
    setCorrectCount((prev) => prev + 1)
    setReviewedCards((prev) => new Set([...prev, currentIndex]))
    handleNext()
  }

  const handleIncorrect = () => {
    setIncorrectCount((prev) => prev + 1)
    setReviewedCards((prev) => new Set([...prev, currentIndex]))
    handleNext()
  }

  const handleNext = () => {
    if (currentIndex < shuffledCards.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0) // Loop back to start
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      setCurrentIndex(shuffledCards.length - 1) // Loop to end
    }
  }

  const handleShuffle = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5)
    setShuffledCards(shuffled)
    setCurrentIndex(0)
  }

  const handleReset = () => {
    setCurrentIndex(0)
    setCorrectCount(0)
    setIncorrectCount(0)
    setReviewedCards(new Set())
    setShuffledCards([...flashcards])
  }

  if (!flashcards || flashcards.length === 0 || !currentCard) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-muted-foreground">No flashcards available for this lesson.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <CardTitle>{lessonTitle} Flashcards</CardTitle>
              <CardDescription>Practice vocabulary with these flashcards</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700">
                ✓ {correctCount}
              </Badge>
              <Badge variant="outline" className="bg-red-50 text-red-700">
                ✗ {incorrectCount}
              </Badge>
              <Badge variant="outline">
                {totalReviewed}/{flashcards.length}
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            {/* Current Card Display */}
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <Flashcard
                  frontText={currentCard.word}
                  backText={currentCard.pronunciation}
                  onCorrect={handleCorrect}
                  onIncorrect={handleIncorrect}
                />
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center">
              <Button variant="outline" onClick={handlePrevious}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {currentIndex + 1} of {shuffledCards.length}
                </span>
                {currentCard.category && <Badge variant="secondary">{currentCard.category}</Badge>}
              </div>

              <Button variant="outline" onClick={handleNext}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-2">
              <Button variant="outline" onClick={handleShuffle}>
                <Shuffle className="mr-2 h-4 w-4" />
                Shuffle
              </Button>
              <Button variant="outline" onClick={handleReset}>
                <RotateCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
