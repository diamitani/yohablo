"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Download, Eye, Clock, Users, BookOpen, Sparkles } from "lucide-react"
import Link from "next/link"

const lessonPlans = [
  {
    id: "1",
    title: "Spanish Numbers (0-101) Lesson Plan",
    description: "Complete lesson plan for teaching Spanish numbers through hip-hop music",
    duration: "45 minutes",
    level: "Beginner",
    students: "15-30",
    category: "Numbers",
    objectives: [
      "Students will learn to count from 0 to 101 in Spanish",
      "Students will understand number patterns and formation rules",
      "Students will practice pronunciation through music and rhythm",
      "Students will apply numbers in real-world contexts",
    ],
    materials: [
      "Audio: '0 to 101' hip-hop song",
      "Worksheet: Fill-in-the-blank lyrics",
      "Number cards (0-101)",
      "Whiteboard/projector",
      "Speakers for audio playback",
    ],
    activities: [
      {
        time: "5 min",
        activity: "Warm-up",
        description: "Review previously learned Spanish vocabulary and introduce today's topic",
      },
      {
        time: "10 min",
        activity: "Introduction to Numbers",
        description: "Introduce numbers 0-20 with visual aids and repetition practice",
      },
      {
        time: "15 min",
        activity: "Hip-Hop Song Activity",
        description: "Play '0 to 101' song, students follow along with lyrics worksheet",
      },
      {
        time: "10 min",
        activity: "Pattern Recognition",
        description: "Identify patterns in Spanish numbers (20s, 30s, etc.)",
      },
      {
        time: "5 min",
        activity: "Wrap-up & Assessment",
        description: "Quick oral assessment and preview of next lesson",
      },
    ],
    assessment: "Oral counting assessment, worksheet completion, participation in song activity",
    homework: "Practice counting 1-50 at home, complete additional worksheet exercises",
  },
  {
    id: "2",
    title: "Spanish Colors (Colores) Lesson Plan",
    description: "Interactive lesson plan for teaching Spanish color vocabulary through music",
    duration: "40 minutes",
    level: "Beginner",
    students: "15-25",
    category: "Colors",
    objectives: [
      "Students will identify and name 11 basic colors in Spanish",
      "Students will use color adjectives in simple sentences",
      "Students will understand color-noun agreement",
      "Students will demonstrate learning through creative activities",
    ],
    materials: [
      "Audio: 'Colores' hip-hop song",
      "Color flashcards and real objects",
      "Coloring worksheets",
      "Colored pencils/markers",
      "Interactive whiteboard",
    ],
    activities: [
      {
        time: "5 min",
        activity: "Color Review Game",
        description: "Quick review of any known colors, introduce new vocabulary",
      },
      {
        time: "12 min",
        activity: "Colores Song Activity",
        description: "Listen to hip-hop song, fill in color names on worksheet",
      },
      {
        time: "10 min",
        activity: "Color Identification",
        description: "Students identify colors of classroom objects in Spanish",
      },
      {
        time: "10 min",
        activity: "Creative Coloring",
        description: "Color pictures while saying color names in Spanish",
      },
      {
        time: "3 min",
        activity: "Closing Circle",
        description: "Students share their favorite color in Spanish",
      },
    ],
    assessment: "Color identification quiz, worksheet accuracy, oral participation",
    homework: "Find 5 objects at home and describe their colors in Spanish",
  },
  {
    id: "3",
    title: "Spanish Family Members Lesson Plan",
    description: "Comprehensive lesson plan for family vocabulary using 'Meet the Fam Bam' song",
    duration: "50 minutes",
    level: "Beginner-Intermediate",
    students: "20-30",
    category: "Family",
    objectives: [
      "Students will learn immediate and extended family vocabulary",
      "Students will describe their own family in Spanish",
      "Students will understand possessive adjectives with family terms",
      "Students will create a family tree project",
    ],
    materials: [
      "Audio: 'Meet the Fam Bam' song",
      "Family photo examples",
      "Family tree templates",
      "Vocabulary cards",
      "Art supplies for family tree project",
    ],
    activities: [
      {
        time: "8 min",
        activity: "Family Photo Sharing",
        description: "Students share family photos and identify members in English",
      },
      {
        time: "15 min",
        activity: "Family Song Learning",
        description: "Listen to 'Meet the Fam Bam', complete lyrics worksheet",
      },
      {
        time: "12 min",
        activity: "Vocabulary Practice",
        description: "Practice family terms with flashcards and repetition",
      },
      {
        time: "12 min",
        activity: "Family Tree Creation",
        description: "Students create their own family tree with Spanish labels",
      },
      {
        time: "3 min",
        activity: "Presentation Prep",
        description: "Prepare to present family trees to class",
      },
    ],
    assessment: "Family tree accuracy, vocabulary quiz, oral presentation",
    homework: "Interview a family member and write 5 sentences about them in Spanish",
  },
]

export default function LessonPlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<(typeof lessonPlans)[0] | null>(null)

  const downloadLessonPlan = (plan: (typeof lessonPlans)[0]) => {
    const content = `
LESSON PLAN: ${plan.title}

OVERVIEW:
Duration: ${plan.duration}
Level: ${plan.level}
Students: ${plan.students}
Category: ${plan.category}

DESCRIPTION:
${plan.description}

LEARNING OBJECTIVES:
${plan.objectives.map((obj, i) => `${i + 1}. ${obj}`).join("\n")}

MATERIALS NEEDED:
${plan.materials.map((material, i) => `• ${material}`).join("\n")}

LESSON ACTIVITIES:
${plan.activities
  .map(
    (activity, i) => `
${i + 1}. ${activity.activity} (${activity.time})
   ${activity.description}
`,
  )
  .join("")}

ASSESSMENT:
${plan.assessment}

HOMEWORK:
${plan.homework}

---
Generated by Yo Hablo Spanish Learning Platform
    `.trim()

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${plan.title.replace(/\s+/g, "_")}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container px-4 md:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Spanish Lesson Plans
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Ready-to-use lesson plans designed around our hip-hop Spanish songs. Perfect for teachers looking to bring
            music and engagement into their Spanish classroom.
          </p>

          {/* AI Generator CTA */}
          <div className="mb-8">
            <Card className="max-w-2xl mx-auto bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Sparkles className="h-8 w-8 text-purple-600" />
                  <h3 className="text-2xl font-bold">AI-Powered Lesson Generator</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Create custom lesson plans instantly with our AI-powered generator. Tailored to your specific needs
                  and curriculum.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Link href="/ai-lesson-generator">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Generate Custom Lesson Plan
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Lesson Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {lessonPlans.map((plan) => (
            <Card
              key={plan.id}
              className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white dark:bg-slate-800"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">{plan.category}</Badge>
                  <Badge variant="outline">{plan.level}</Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">{plan.title}</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{plan.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{plan.students} students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>{plan.activities.length} activities</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh]">
                      <DialogHeader>
                        <DialogTitle>{plan.title}</DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="h-[60vh] pr-4">
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold mb-2">Overview</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>Duration: {plan.duration}</div>
                              <div>Level: {plan.level}</div>
                              <div>Students: {plan.students}</div>
                              <div>Category: {plan.category}</div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Learning Objectives</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              {plan.objectives.map((obj, i) => (
                                <li key={i}>{obj}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Materials Needed</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              {plan.materials.map((material, i) => (
                                <li key={i}>{material}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Lesson Activities</h4>
                            <div className="space-y-3">
                              {plan.activities.map((activity, i) => (
                                <div key={i} className="border-l-4 border-blue-500 pl-4">
                                  <div className="font-medium text-sm">
                                    {activity.activity} ({activity.time})
                                  </div>
                                  <div className="text-sm text-gray-600 dark:text-gray-400">{activity.description}</div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Assessment</h4>
                            <p className="text-sm">{plan.assessment}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Homework</h4>
                            <p className="text-sm">{plan.homework}</p>
                          </div>
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>

                  <Button
                    onClick={() => downloadLessonPlan(plan)}
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">AI Flashcards Generator</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Create interactive flashcards for any Spanish topic using our AI-powered generator.
              </p>
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                <Link href="/ai-flashcards">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Flashcards
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Interactive Worksheets</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Access our collection of interactive worksheets based on our hip-hop lessons.
              </p>
              <Button
                asChild
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <Link href="/worksheets">
                  <BookOpen className="h-4 w-4 mr-2" />
                  View Worksheets
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
