"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, RotateCcw, Trophy, Star, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface WorksheetQuestion {
  id: string
  question: string
  answer: string
  type: "fill-blank" | "multiple-choice"
  options?: string[]
}

interface WorksheetContentProps {
  title: string
  content: WorksheetQuestion[]
  type: string
  lessonSlug: string
}

export function WorksheetContent({ title, content, type, lessonSlug }: WorksheetContentProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer.toLowerCase().trim(),
    }))
  }

  const checkAnswers = () => {
    let correctCount = 0
    content.forEach((question) => {
      const userAnswer = answers[question.id] || ""
      const correctAnswer = question.answer.toLowerCase().trim()
      if (userAnswer === correctAnswer) {
        correctCount++
      }
    })
    setScore(correctCount)
    setSubmitted(true)
    setShowResults(true)
  }

  const resetWorksheet = () => {
    setAnswers({})
    setSubmitted(false)
    setScore(0)
    setShowResults(false)
  }

  const getScoreColor = () => {
    const percentage = (score / content.length) * 100
    if (percentage >= 90) return "text-green-600"
    if (percentage >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreMessage = () => {
    const percentage = (score / content.length) * 100
    if (percentage >= 90) return "¡Excelente! Excellent work!"
    if (percentage >= 70) return "¡Bien! Good job!"
    return "Keep practicing! ¡Sigue practicando!"
  }

  if (showResults) {
    return (
      <div className="space-y-6">
        {/* Back Button */}
        <Button asChild variant="outline" className="mb-4 bg-transparent">
          <Link href="/worksheets">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Worksheets
          </Link>
        </Button>

        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Worksheet Complete!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className={`text-4xl font-bold ${getScoreColor()}`}>
              {score}/{content.length}
            </div>
            <div className="text-lg text-gray-600 dark:text-gray-400">
              {Math.round((score / content.length) * 100)}% Correct
            </div>
            <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">{getScoreMessage()}</div>
            <div className="flex gap-3 justify-center pt-4">
              <Button onClick={resetWorksheet} variant="outline" className="gap-2 bg-transparent">
                <RotateCcw className="h-4 w-4" />
                Try Again
              </Button>
              <Button
                asChild
                className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Link href="/worksheets">
                  <Star className="h-4 w-4" />
                  More Worksheets
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Review Answers */}
        <Card>
          <CardHeader>
            <CardTitle>Review Your Answers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {content.map((question, index) => {
              const userAnswer = answers[question.id] || ""
              const isCorrect = userAnswer === question.answer.toLowerCase().trim()

              return (
                <div
                  key={question.id}
                  className={`p-4 rounded-lg border-2 ${isCorrect ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20" : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20"}`}
                >
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 mt-1" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium mb-2" dangerouslySetInnerHTML={{ __html: question.question }} />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Your answer:</span>
                          <span className={`font-medium ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                            {userAnswer || "(no answer)"}
                          </span>
                        </div>
                        {!isCorrect && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Correct answer:</span>
                            <span className="font-medium text-green-600">{question.answer}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button asChild variant="outline" className="mb-4 bg-transparent">
        <Link href="/worksheets">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Worksheets
        </Link>
      </Button>

      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400">Complete the exercises below to practice your Spanish</p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <Badge variant="outline">{content.length} Questions</Badge>
          <Badge variant="secondary">{type}</Badge>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(Object.keys(answers).length / content.length) * 100}%` }}
        />
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {content.map((question, index) => {
          const userAnswer = answers[question.id] || ""
          const isAnswered = userAnswer.length > 0

          return (
            <Card
              key={question.id}
              className={`transition-all duration-200 ${isAnswered ? "border-blue-200 dark:border-blue-800" : "border-gray-200 dark:border-gray-700"}`}
            >
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${isAnswered ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"}`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p
                      className="text-lg leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: question.question
                          .replace(/\$\$(\d+)\$\$/g, '<span class="font-bold text-blue-600">($1)</span>')
                          .replace(
                            /_+/g,
                            '<span class="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded mx-1">_____</span>',
                          ),
                      }}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {question.type === "multiple-choice" && question.options ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {question.options.map((option, optionIndex) => (
                      <Button
                        key={optionIndex}
                        variant={userAnswer === option.toLowerCase() ? "default" : "outline"}
                        className="justify-start h-auto p-4 text-left"
                        onClick={() => handleAnswerChange(question.id, option)}
                        disabled={submitted}
                      >
                        <span className="font-medium mr-2">{String.fromCharCode(65 + optionIndex)}.</span>
                        {option}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <Input
                    placeholder="Type your answer here..."
                    value={answers[question.id] || ""}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    disabled={submitted}
                    className="text-lg p-4"
                  />
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Submit Button */}
      <div className="text-center pt-6">
        <Button
          onClick={checkAnswers}
          disabled={Object.keys(answers).length === 0 || submitted}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
        >
          {submitted ? "Submitted" : "Check Answers"}
        </Button>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          {Object.keys(answers).length}/{content.length} questions answered
        </p>
      </div>
    </div>
  )
}
