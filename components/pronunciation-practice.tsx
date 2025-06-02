"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PronunciationRecorder } from "@/components/pronunciation-recorder"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, RotateCw, ChevronRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PracticeWord {
  id: string
  word: string
  translation?: string
  audioUrl?: string
  category?: string
  difficulty?: "easy" | "medium" | "hard"
}

interface PronunciationPracticeProps {
  title?: string
  description?: string
  words: PracticeWord[]
}

interface WordResult {
  wordId: string
  word: string
  attempts: number
  bestScore: number
  passed: boolean
}

interface PracticeResults {
  totalWords: number
  correctWords: number
  incorrectWords: number
  skippedWords: number
  averageScore: number
  wordResults: WordResult[]
  completedAt: Date
}

export function PronunciationPractice({
  title = "Pronunciation Practice",
  description = "Practice your Spanish pronunciation with these words",
  words,
}: PronunciationPracticeProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [results, setResults] = useState<WordResult[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [practiceAgainWords, setPracticeAgainWords] = useState<PracticeWord[]>([])
  const [isPracticeAgainMode, setIsPracticeAgainMode] = useState(false)
  const [sessionResults, setSessionResults] = useState<PracticeResults | null>(null)

  const { toast } = useToast()

  // Get current word based on mode
  const currentWords = isPracticeAgainMode ? practiceAgainWords : words
  const currentWord = currentWords[currentWordIndex]

  // Calculate progress
  const progress = Math.round((currentWordIndex / currentWords.length) * 100)

  // Handle pronunciation result
  const handlePronunciationResult = (result: { score: number; passed: boolean }) => {
    const wordResult: WordResult = {
      wordId: currentWord.id,
      word: currentWord.word,
      attempts: 1,
      bestScore: result.score,
      passed: result.passed,
    }

    // Check if we already have a result for this word
    const existingResultIndex = results.findIndex((r) => r.wordId === currentWord.id)

    if (existingResultIndex >= 0) {
      // Update existing result
      const existingResult = results[existingResultIndex]
      const updatedResult = {
        ...existingResult,
        attempts: existingResult.attempts + 1,
        bestScore: Math.max(existingResult.bestScore, result.score),
        passed: existingResult.passed || result.passed,
      }

      const newResults = [...results]
      newResults[existingResultIndex] = updatedResult
      setResults(newResults)
    } else {
      // Add new result
      setResults([...results, wordResult])
    }

    // Show feedback toast
    toast({
      title: result.passed ? "Great job!" : "Keep practicing",
      description: result.passed
        ? `Your pronunciation scored ${result.score}%`
        : `Your pronunciation scored ${result.score}%. Try again or skip to continue.`,
      variant: result.passed ? "default" : "destructive",
    })

    // If passed, move to next word
    if (result.passed) {
      moveToNextWord()
    }
  }

  // Skip current word
  const skipWord = () => {
    // Add skipped word result if not already in results
    if (!results.some((r) => r.wordId === currentWord.id)) {
      setResults([
        ...results,
        {
          wordId: currentWord.id,
          word: currentWord.word,
          attempts: 0,
          bestScore: 0,
          passed: false,
        },
      ])
    }

    moveToNextWord()
  }

  // Move to next word
  const moveToNextWord = () => {
    if (currentWordIndex < currentWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1)
    } else {
      // Practice session complete
      finishPractice()
    }
  }

  // Finish practice session
  const finishPractice = () => {
    setIsComplete(true)

    // Calculate final results
    const correctWords = results.filter((r) => r.passed).length
    const skippedWords = results.filter((r) => r.attempts === 0).length
    const incorrectWords = results.length - correctWords - skippedWords

    const totalScore = results.reduce((sum, r) => sum + r.bestScore, 0)
    const averageScore = results.length > 0 ? Math.round(totalScore / results.length) : 0

    // Identify words to practice again
    const wordsToRepeat = results
      .filter((r) => !r.passed)
      .map((r) => words.find((w) => w.id === r.wordId))
      .filter((w): w is PracticeWord => w !== undefined)

    setPracticeAgainWords(wordsToRepeat)

    // Save session results
    const practiceResults: PracticeResults = {
      totalWords: results.length,
      correctWords,
      incorrectWords,
      skippedWords,
      averageScore,
      wordResults: results,
      completedAt: new Date(),
    }

    setSessionResults(practiceResults)
  }

  // Start practice again with missed words
  const startPracticeAgain = () => {
    if (practiceAgainWords.length > 0) {
      setCurrentWordIndex(0)
      setIsPracticeAgainMode(true)
      setIsComplete(false)
    }
  }

  // Reset practice session
  const resetPractice = () => {
    setCurrentWordIndex(0)
    setResults([])
    setIsComplete(false)
    setIsPracticeAgainMode(false)
    setSessionResults(null)
  }

  // If no words provided, show message
  if (words.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p>No words available for practice.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        {!isComplete ? (
          <div className="space-y-4">
            {/* Progress bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>
                  {currentWordIndex} of {currentWords.length}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Current word */}
            {currentWord && (
              <PronunciationRecorder
                word={currentWord.word}
                referenceAudioUrl={currentWord.audioUrl}
                onResult={handlePronunciationResult}
                onSkip={skipWord}
              />
            )}

            {/* Word translation hint */}
            {currentWord?.translation && (
              <div className="text-sm text-muted-foreground text-center">
                Translation: <span className="font-medium">{currentWord.translation}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Results summary */}
            {sessionResults && (
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{sessionResults.correctWords}</div>
                  <div className="text-sm text-muted-foreground">Correct</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{sessionResults.incorrectWords}</div>
                  <div className="text-sm text-muted-foreground">Incorrect</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{sessionResults.skippedWords}</div>
                  <div className="text-sm text-muted-foreground">Skipped</div>
                </div>
              </div>
            )}

            {/* Word results */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Words</h3>
              <div className="space-y-2">
                {results.map((result) => (
                  <div key={result.wordId} className="flex items-center justify-between p-2 bg-muted rounded-md">
                    <div className="flex items-center gap-2">
                      {result.passed ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : result.attempts > 0 ? (
                        <XCircle className="h-4 w-4 text-red-500" />
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          Skipped
                        </Badge>
                      )}
                      <span>{result.word}</span>
                    </div>
                    {result.attempts > 0 && (
                      <div className="text-sm">
                        <span className="font-medium">{result.bestScore}%</span>
                        <span className="text-muted-foreground ml-2">
                          ({result.attempts} {result.attempts === 1 ? "attempt" : "attempts"})
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Practice again section */}
            {practiceAgainWords.length > 0 && (
              <div className="p-4 border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30 rounded-lg">
                <h3 className="font-medium mb-2">Need more practice</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You have {practiceAgainWords.length} words that need more practice.
                </p>
                <Button onClick={startPracticeAgain} className="w-full">
                  Practice Again
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={resetPractice}>
          <RotateCw className="mr-2 h-4 w-4" />
          Start Over
        </Button>
      </CardFooter>
    </Card>
  )
}
