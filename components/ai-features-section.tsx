"use client"

import { useMode } from "@/components/mode-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Music, BookOpen } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function AiFeaturesSection() {
  const { mode } = useMode()

  return (
    <section className="section-container bg-slate-50 dark:bg-slate-900 rounded-xl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">AI-Powered Spanish Learning</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enhance your Spanish learning experience with our cutting-edge AI tools designed to make language
            acquisition more engaging and effective.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-var(--content-spacing)">
          <Card className="bg-white dark:bg-slate-800 border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl mt-2">AI Tutor</CardTitle>
              <CardDescription>Get personalized help with your Spanish lessons from our AI tutor.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                Practice conversations, get explanations, and test your knowledge with interactive quizzes tailored to
                your learning pace.
              </p>
              <Link href="/lessons">
                <Button className="w-full">Start Learning</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-800 border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Music className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl mt-2">Song Generator</CardTitle>
              <CardDescription>Create custom Spanish learning songs with our AI composer.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                Generate catchy tunes that incorporate vocabulary and grammar concepts you're learning to make
                memorization fun.
              </p>
              <Link href="/song-generator">
                <Button className="w-full">Create Songs</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-800 border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl mt-2">Lesson Creator</CardTitle>
              <CardDescription>Design custom Spanish lessons tailored to your interests.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                Our AI helps you create personalized lessons focused on topics you care about, with vocabulary and
                exercises at your level.
              </p>
              <Link href="/create-lesson">
                <Button className="w-full">Create Lessons</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-var(--content-spacing) bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">How Our AI Enhances Learning</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Personalized feedback on pronunciation and grammar</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Adaptive learning paths based on your progress</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Interactive conversations with contextual understanding</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Custom content generation for your specific interests</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Real-time translation and explanation of concepts</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/dashboard">
                  <Button>View Your Dashboard</Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-6 md:mt-0">
              <div className="relative h-64 w-full rounded-lg overflow-hidden">
                <Image
                  src="/ai-assistant-concept.png"
                  alt="AI Spanish Learning Assistant"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
