"use client"

import { useMode } from "@/components/mode-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, MessageSquare, Music, RefreshCw } from "lucide-react"

export function HowItWorksSection() {
  const { mode } = useMode()

  // Only show in AI mode
  if (mode === "classic") return null

  return (
    <section className="section-container bg-secondary/50 rounded-xl">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Lesson Plan</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Yo Hablo AI combines music-based learning with artificial intelligence to create a personalized language
              learning experience.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-var(--content-spacing) md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Step 1</CardTitle>
              <RefreshCw className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <h3 className="font-bold">Review</h3>
              <p className="text-sm text-muted-foreground">
                Reinforce your learning by singing along and practicing pronunciation with our music.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Step 2</CardTitle>
              <Music className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <h3 className="font-bold">Watch the Lesson</h3>
              <p className="text-sm text-muted-foreground">
                Start with our music videos that teach Spanish vocabulary and grammar through hip hop.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Step 3</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <h3 className="font-bold">Complete the Worksheet</h3>
              <p className="text-sm text-muted-foreground">
                Reinforce your learning with our downloadable worksheets and exercises.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Step 4</CardTitle>
              <MessageSquare className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <h3 className="font-bold">Chat with AI Tutor</h3>
              <p className="text-sm text-muted-foreground">
                Get personalized help and practice with our AI language tutor that adapts to your learning style.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
