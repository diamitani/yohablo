"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

interface Lesson {
  id: string
  slug: string
  title: string
  description: string
  category?: string
  vocabularyWords?: string[]
}

interface HorizontalFlashcardRowProps {
  category: string
  lessons: Lesson[]
}

export function HorizontalFlashcardRow({ category, lessons }: HorizontalFlashcardRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const handleScroll = () => {
    if (!scrollContainerRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10) // 10px buffer
  }

  const scrollLeft = () => {
    if (!scrollContainerRef.current) return
    scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
  }

  const scrollRight = () => {
    if (!scrollContainerRef.current) return
    scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">{category}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full ${!showLeftArrow ? "opacity-50" : ""}`}
            onClick={scrollLeft}
            disabled={!showLeftArrow}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full ${!showRightArrow ? "opacity-50" : ""}`}
            onClick={scrollRight}
            disabled={!showRightArrow}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex flex-nowrap gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide"
        onScroll={handleScroll}
      >
        {lessons.map((lesson) => (
          <Card
            key={lesson.id}
            className="flex-shrink-0 w-[300px] snap-start border-2 border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden"
          >
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg line-clamp-1">{lesson.title}</CardTitle>
                <Badge variant="outline" className="whitespace-nowrap">
                  {lesson.vocabularyWords?.length || 0} words
                </Badge>
              </div>
              <CardDescription className="line-clamp-2">{lesson.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              {lesson.vocabularyWords && lesson.vocabularyWords.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {lesson.vocabularyWords.slice(0, 5).map((word, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {word}
                    </Badge>
                  ))}
                  {lesson.vocabularyWords.length > 5 && (
                    <Badge variant="outline" className="text-xs">
                      +{lesson.vocabularyWords.length - 5} more
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Link href={`/flashcards/${lesson.slug}`} className="w-full">
                <Button className="w-full">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Study Flashcards
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
