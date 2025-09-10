"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AudioPlayer } from "@/components/audio-player"
import { VocabularyAudio } from "@/components/vocabulary-audio"
import { Play, BookOpen, Volume2, Clock, Target, CheckCircle, Star, Heart } from "lucide-react"
import Link from "next/link"
import type { Lesson } from "@/lib/types"

interface LessonDetailProps {
  lesson: Lesson
}

export function LessonDetail({ lesson }: LessonDetailProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [completedPoints, setCompletedPoints] = useState<number[]>([])

  const toggleLearningPoint = (index: number) => {
    setCompletedPoints((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const progressPercentage = lesson.learningPoints
    ? (completedPoints.length / lesson.learningPoints.length) * 100
    : lesson.progress || 0

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={getDifficultyColor(lesson.difficulty)}>{lesson.difficulty || "Beginner"}</Badge>
              <Badge variant="outline">
                <Clock className="h-3 w-3 mr-1" />
                {lesson.duration || "10 min"}
              </Badge>
              <Badge variant="outline">{lesson.category}</Badge>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{lesson.title}</h1>
            <p className="text-gray-600 leading-relaxed">{lesson.description}</p>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Play className="h-4 w-4 mr-2" />
                Start Lesson
              </Button>
              <Button variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                Practice
              </Button>
              <Button variant="ghost" onClick={() => setIsFavorited(!isFavorited)}>
                <Heart className={`h-4 w-4 mr-2 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
                {isFavorited ? "Favorited" : "Favorite"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audio Section */}
      {lesson.audioUrl && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-green-600" />
              Lesson Audio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AudioPlayer src={lesson.audioUrl} title={lesson.title} />
          </CardContent>
        </Card>
      )}

      {/* Learning Objectives & Vocabulary */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Learning Points */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              Learning Objectives
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {lesson.learningPoints?.map((point, index) => (
              <div
                key={index}
                className="flex items-start gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer"
                onClick={() => toggleLearningPoint(index)}
              >
                <CheckCircle
                  className={`h-4 w-4 mt-0.5 ${completedPoints.includes(index) ? "text-green-600" : "text-gray-400"}`}
                />
                <span className={`text-sm ${completedPoints.includes(index) ? "line-through text-gray-500" : ""}`}>
                  {point}
                </span>
              </div>
            )) || <p className="text-gray-500 text-sm">No objectives specified.</p>}
          </CardContent>
        </Card>

        {/* Vocabulary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-600" />
              Vocabulary ({lesson.vocabularyWords?.length || 0})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {lesson.vocabularyWords?.slice(0, 6).map((word, index) => {
              const [spanish, english] = word.includes(" - ") ? word.split(" - ") : [word, ""]
              return (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-2">
                    <VocabularyAudio word={spanish} size="sm" />
                    <div>
                      <div className="font-medium">{spanish}</div>
                      {english && <div className="text-xs text-gray-500">{english}</div>}
                    </div>
                  </div>
                </div>
              )
            }) || <p className="text-gray-500 text-sm">No vocabulary available.</p>}

            {(lesson.vocabularyWords?.length || 0) > 6 && (
              <Button variant="outline" size="sm" className="w-full mt-2 bg-transparent">
                View All {lesson.vocabularyWords?.length} Words
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Practice Options */}
      <Card>
        <CardHeader>
          <CardTitle>Practice Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href={`/pronunciation-practice/${lesson.slug}`}>
              <Button variant="outline" className="w-full bg-transparent">
                <Volume2 className="h-4 w-4 mr-2" />
                Pronunciation Practice
              </Button>
            </Link>
            <Link href={`/flashcards/${lesson.slug}`}>
              <Button variant="outline" className="w-full bg-transparent">
                <Star className="h-4 w-4 mr-2" />
                Flashcards
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
