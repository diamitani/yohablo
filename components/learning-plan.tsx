"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { generateLearningPlan } from "@/app/api/ai/actions"
import { useToast } from "@/hooks/use-toast"
import { Loader2, RefreshCw } from "lucide-react"
import { lessons } from "@/lib/data"

export function LearningPlan() {
  const { toast } = useToast()
  const [plan, setPlan] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  // In a real app, this would come from a user profile
  const mockUserId = "user-123"
  const completedLessons = lessons.filter((lesson) => (lesson.progress || 0) === 100).map((lesson) => lesson.title)

  const inProgressLessons = lessons
    .filter((lesson) => (lesson.progress || 0) > 0 && (lesson.progress || 0) < 100)
    .map((lesson) => lesson.title)

  // Generate a learning plan on initial load
  useEffect(() => {
    if (isInitialLoad) {
      generatePlan()
      setIsInitialLoad(false)
    }
  }, [isInitialLoad])

  const generatePlan = async () => {
    setIsLoading(true)
    setPlan("")

    try {
      // Mock data for struggling topics and interests
      // In a real app, this would come from user data
      const strugglingWith = ["Verb conjugation", "Numbers above 20"]
      const interests = ["Music", "Travel", "Food"]

      const result = await generateLearningPlan(mockUserId, completedLessons, strugglingWith, interests)

      if (result.success) {
        setPlan(result.plan)
      } else {
        toast({
          title: "Error",
          description: "Failed to generate a learning plan. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error generating learning plan:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Your Personalized Learning Plan</CardTitle>
        <Button variant="outline" size="sm" onClick={generatePlan} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Plan
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-center text-muted-foreground">Creating your personalized learning plan...</p>
          </div>
        ) : plan ? (
          <div className="whitespace-pre-line">{plan}</div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 space-y-4 text-muted-foreground">
            <p className="text-center">Click "Refresh Plan" to generate a personalized learning plan</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Based on {completedLessons.length} completed and {inProgressLessons.length} in-progress lessons
        </p>
      </CardFooter>
    </Card>
  )
}
