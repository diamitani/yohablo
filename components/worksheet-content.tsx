"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, RefreshCw, Volume2, Trophy, Target, BookOpen, Printer } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { VocabularyAudio } from "@/components/vocabulary-audio"
import { Badge } from "@/components/ui/badge"

interface WorksheetContentProps {
  title: string
  content: WorksheetItem[]
  type: "fill-in-blank" | "multiple-choice" | "matching"
  lessonSlug?: string
}

export interface WorksheetItem {
  id: string
  question: string
  answer: string
  userAnswer?: string
}

export function WorksheetContent({ title, content, type, lessonSlug }: WorksheetContentProps) {
  const { toast } = useToast()
  const [worksheetItems, setWorksheetItems] = useState<WorksheetItem[]>(content)
  const [isChecked, setIsChecked] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<"worksheet" | "vocabulary">("worksheet")
  const [showAnswers, setShowAnswers] = useState(false)

  // Extract vocabulary words from the worksheet content
  const vocabularyWords = extractVocabularyWords(worksheetItems)

  const handleInputChange = (id: string, value: string) => {
    setWorksheetItems((prev) => prev.map((item) => (item.id === id ? { ...item, userAnswer: value } : item)))
  }

  const checkAnswers = () => {
    const correctCount = worksheetItems.filter(
      (item) => item.userAnswer?.trim().toLowerCase() === item.answer.trim().toLowerCase(),
    ).length

    setScore((correctCount / worksheetItems.length) * 100)
    setIsChecked(true)

    toast({
      title: "Worksheet Complete!",
      description: `You scored ${correctCount} out of ${worksheetItems.length} correct (${Math.round(
        (correctCount / worksheetItems.length) * 100,
      )}%)`,
    })
  }

  const resetWorksheet = () => {
    setWorksheetItems((prev) => prev.map((item) => ({ ...item, userAnswer: "" })))
    setIsChecked(false)
    setScore(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="saas-heading-3">{title}</h2>
          <p className="saas-body text-muted-foreground">Complete the exercises to test your knowledge</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(`/worksheets/${lessonSlug}/print`, "_blank")}
            className="flex items-center gap-2"
          >
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button
            variant={showAnswers ? "default" : "outline"}
            size="sm"
            onClick={() => setShowAnswers(!showAnswers)}
            className="flex items-center gap-2"
          >
            <Check className="h-4 w-4" />
            {showAnswers ? "Hide" : "Show"} Answers
          </Button>
          <Button
            variant={activeTab === "worksheet" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("worksheet")}
            className="flex items-center gap-2"
          >
            <BookOpen className="h-4 w-4" />
            Practice
          </Button>
          <Button
            variant={activeTab === "vocabulary" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("vocabulary")}
            className="flex items-center gap-2"
          >
            <Volume2 className="h-4 w-4" />
            Audio
          </Button>
        </div>
      </div>

      {activeTab === "worksheet" ? (
        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="saas-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="saas-body-small">Progress</span>
              <span className="saas-body-small">
                {worksheetItems.filter((item) => item.userAnswer?.trim()).length} / {worksheetItems.length}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(worksheetItems.filter((item) => item.userAnswer?.trim()).length / worksheetItems.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-4">
            {worksheetItems.map((item, index) => (
              <div
                key={item.id}
                className="saas-card p-6 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">{index + 1}</span>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div
                      className="saas-body"
                      dangerouslySetInnerHTML={{
                        __html: item.question
                          .replace(/\$\$(\d+)\$\$/g, '<span class="font-bold text-primary">($1)</span>')
                          .replace(/_+/g, '<span class="bg-secondary px-2 py-1 rounded">_____</span>'),
                      }}
                    />
                    <div className="flex items-center gap-3">
                      <Input
                        value={item.userAnswer || ""}
                        onChange={(e) => handleInputChange(item.id, e.target.value)}
                        placeholder="Type your answer..."
                        disabled={isChecked}
                        className={
                          isChecked
                            ? item.userAnswer?.trim().toLowerCase() === item.answer.trim().toLowerCase()
                              ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                              : "border-red-500 bg-red-50 dark:bg-red-950/20"
                            : ""
                        }
                      />
                      {(isChecked || showAnswers) && (
                        <div className="flex items-center gap-2">
                          {isChecked && item.userAnswer?.trim().toLowerCase() === item.answer.trim().toLowerCase() ? (
                            <Badge className="saas-status-success">Correct!</Badge>
                          ) : (
                            <div className="flex items-center gap-2">
                              {isChecked && <Badge className="saas-status-error">Incorrect</Badge>}
                              <span className="saas-body-small">
                                Answer: <span className="font-semibold text-green-600">{item.answer}</span>
                              </span>
                            </div>
                          )}
                          <VocabularyAudio word={item.answer} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={resetWorksheet} className="flex items-center gap-2 bg-transparent">
              <RefreshCw className="h-4 w-4" />
              Reset
            </Button>
            <Button onClick={checkAnswers} disabled={isChecked} className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              Check Answers
            </Button>
          </div>

          {/* Results */}
          {score !== null && (
            <div className="saas-card p-6 animate-scale-in">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <Trophy className="h-8 w-8 text-yellow-500" />
                  <h3 className="saas-heading-3">Worksheet Complete!</h3>
                </div>
                <div className="text-4xl font-bold text-primary">{Math.round(score)}%</div>
                <p className="saas-body text-muted-foreground">
                  {score >= 80 ? "¡Excelente! Great work!" : score >= 60 ? "¡Bien! Good job!" : "Keep practicing!"}
                </p>
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-lg font-bold text-green-600">
                      {
                        worksheetItems.filter(
                          (item) => item.userAnswer?.trim().toLowerCase() === item.answer.trim().toLowerCase(),
                        ).length
                      }
                    </div>
                    <div className="text-xs text-muted-foreground">Correct</div>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-lg font-bold text-red-600">
                      {
                        worksheetItems.filter(
                          (item) => item.userAnswer?.trim().toLowerCase() !== item.answer.trim().toLowerCase(),
                        ).length
                      }
                    </div>
                    <div className="text-xs text-muted-foreground">Incorrect</div>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-lg font-bold text-primary">{worksheetItems.length}</div>
                    <div className="text-xs text-muted-foreground">Total</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Vocabulary Practice */}
          <div className="saas-card p-6">
            <h3 className="saas-heading-4 mb-4 flex items-center gap-2">
              <Target className="h-5 w-5" />
              Vocabulary Practice
            </h3>
            <p className="saas-body text-muted-foreground mb-6">
              Click on the speaker icon to hear the pronunciation of each word from the worksheet.
            </p>
            <div className="grid gap-3">
              {vocabularyWords.map((word, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-lg border border-primary/20 hover:border-primary/40 transition-colors"
                >
                  <VocabularyAudio word={word} />
                  <div className="flex-1">
                    <div className="font-semibold">{word}</div>
                    <div className="text-sm text-muted-foreground">Practice pronunciation</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pronunciation Tips */}
          <div className="saas-card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
            <h3 className="saas-heading-4 mb-4 flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-blue-600" />
              Pronunciation Tips
            </h3>
            <ul className="space-y-2 saas-body-small text-muted-foreground">
              <li>• Listen to each word carefully and repeat it several times</li>
              <li>• Pay attention to accent marks and stress patterns</li>
              <li>• Practice in front of a mirror to observe mouth movements</li>
              <li>• Record yourself and compare with the audio</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

// Helper function to extract vocabulary words from worksheet items
function extractVocabularyWords(items: WorksheetItem[]): string[] {
  const words = new Set<string>()

  // Add all answers as vocabulary words
  items.forEach((item) => {
    if (item.answer) {
      words.add(item.answer.trim())
    }
  })

  // Also try to extract words from questions that are in parentheses or after "that's"
  items.forEach((item) => {
    // Match words in parentheses
    const parenthesesMatches = item.question.match(/\$$$([^)]+)$$\$/g)
    if (parenthesesMatches) {
      parenthesesMatches.forEach((match) => {
        const word = match.replace(/[()$]/g, "").trim()
        if (word && !word.match(/^\d+$/)) words.add(word)
      })
    }

    // Match words after "that's"
    const thatsMatches = item.question.match(/that's ([^,.]+)/gi)
    if (thatsMatches) {
      thatsMatches.forEach((match) => {
        const word = match.replace(/that's /i, "").trim()
        if (word) words.add(word)
      })
    }
  })

  return Array.from(words)
}
