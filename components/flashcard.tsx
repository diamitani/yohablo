"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface FlashcardProps {
  frontText: string
  backText: string
  onCorrect?: () => void
  onIncorrect?: () => void
  className?: string
}

export function Flashcard({ frontText, backText, onCorrect, onIncorrect, className }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleCorrect = () => {
    if (onCorrect) onCorrect()
    setIsFlipped(false) // Reset for next card
  }

  const handleIncorrect = () => {
    if (onIncorrect) onIncorrect()
    setIsFlipped(false) // Reset for next card
  }

  const handleReset = () => {
    setIsFlipped(false)
  }

  return (
    <div className={cn("w-full h-full min-h-[300px]", className)}>
      <Card
        className="relative w-full h-full cursor-pointer transition-all duration-300 hover:shadow-lg"
        onClick={handleFlip}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          {!isFlipped ? (
            // Front of card - Spanish word
            <div className="space-y-4">
              <div className="text-3xl font-bold text-primary">{frontText}</div>
              <div className="text-sm text-muted-foreground">Click to see pronunciation</div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4"
                onClick={(e) => {
                  e.stopPropagation()
                  handleReset()
                }}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            // Back of card - Pronunciation
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-lg text-muted-foreground">Pronunciation:</div>
                <div className="text-2xl font-semibold">{backText}</div>
              </div>

              <div className="text-sm text-muted-foreground mb-4">How well did you know this?</div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="bg-red-50 hover:bg-red-100 border-red-200 text-red-700"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleIncorrect()
                  }}
                >
                  <X className="mr-2 h-4 w-4" />
                  Didn't Know
                </Button>
                <Button
                  variant="outline"
                  className="bg-green-50 hover:bg-green-100 border-green-200 text-green-700"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleCorrect()
                  }}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Knew It
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
