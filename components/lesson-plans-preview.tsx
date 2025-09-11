"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Download, Eye, Clock, Users, Target, BookOpen, Music, FileText, Volume2, Globe } from "lucide-react"

interface LessonPlan {
  id: string
  title: string
  category: string
  duration: string
  level: string
  objectives: string[]
  materials: string[]
  activities: {
    name: string
    duration: string
    description: string
    type: "warmup" | "main" | "practice" | "wrap-up"
  }[]
  vocabulary: string[]
  assessment: string
  homework: string
  culturalNotes?: string
}

const lessonPlans: LessonPlan[] = [
  {
    id: "alfabeto-plan",
    title: "Spanish Alphabet Through Hip-Hop",
    category: "Fundamentals",
    duration: "45 minutes",
    level: "Beginner (A1)",
    objectives: [
      "Students will be able to recite the Spanish alphabet with correct pronunciation",
      "Students will identify and distinguish Spanish letters from English letters",
      "Students will demonstrate understanding of letter sounds through hip-hop rhythm",
      "Students will spell simple Spanish words using the alphabet they've learned",
    ],
    materials: [
      "Juli Slide (Alphabet) audio track",
      "Alphabet flashcards",
      "Whiteboard and markers",
      "Student worksheets",
      "Audio system for music playback",
    ],
    activities: [
      {
        name: "Hip-Hop Warm-up",
        duration: "5 minutes",
        description:
          "Play the Juli Slide track and have students listen to the rhythm. Introduce the concept of learning through music.",
        type: "warmup",
      },
      {
        name: "Alphabet Introduction",
        duration: "15 minutes",
        description:
          "Present each letter with correct pronunciation. Use flashcards and have students repeat. Emphasize the unique Spanish letters (Ñ, RR, LL).",
        type: "main",
      },
      {
        name: "Musical Practice",
        duration: "15 minutes",
        description:
          "Play the Juli Slide track again. Students follow along and practice pronunciation with the hip-hop beat. Break into small groups for practice.",
        type: "practice",
      },
      {
        name: "Spelling Challenge",
        duration: "8 minutes",
        description:
          "Students work in pairs to spell their names and simple Spanish words using the alphabet they've learned.",
        type: "practice",
      },
      {
        name: "Wrap-up Performance",
        duration: "2 minutes",
        description: "Class performs the alphabet song together. Quick review of challenging letters.",
        type: "wrap-up",
      },
    ],
    vocabulary: [
      "el alfabeto - the alphabet",
      "las letras - the letters",
      "la pronunciación - pronunciation",
      "A, B, C, D, E, F, G, H, I, J, K, L, M, N, Ñ, O, P, Q, R, S, T, U, V, W, X, Y, Z",
    ],
    assessment:
      "Students will be assessed on their ability to pronounce letters correctly during the group performance and their participation in spelling activities.",
    homework:
      "Practice the alphabet song at home using the audio track. Complete the alphabet worksheet with letter recognition exercises.",
    culturalNotes:
      "Discuss how hip-hop culture has influenced Spanish-speaking countries, particularly in urban areas of Mexico, Spain, and Latin America.",
  },
  {
    id: "colors-plan",
    title: "Colors in Spanish Through Music",
    category: "Vocabulary",
    duration: "40 minutes",
    level: "Beginner (A1)",
    objectives: [
      "Students will identify and name 11 basic colors in Spanish",
      "Students will use color adjectives to describe objects",
      "Students will understand color-noun agreement in Spanish",
      "Students will demonstrate vocabulary retention through musical repetition",
    ],
    materials: [
      "Colores audio track",
      "Colored objects and flashcards",
      "Color wheel poster",
      "Student coloring worksheets",
      "Crayons or colored pencils",
    ],
    activities: [
      {
        name: "Color Discovery",
        duration: "5 minutes",
        description:
          "Show various colored objects. Ask students to identify colors in English, then introduce the Spanish lesson.",
        type: "warmup",
      },
      {
        name: "Musical Color Introduction",
        duration: "12 minutes",
        description:
          "Play the Colores track. Introduce each color with visual aids. Students repeat pronunciation and associate with objects.",
        type: "main",
      },
      {
        name: "Interactive Color Practice",
        duration: "15 minutes",
        description:
          "Students participate in color identification games. Use 'Simon Says' with colors. Practice describing classroom objects using colors.",
        type: "practice",
      },
      {
        name: "Creative Color Art",
        duration: "6 minutes",
        description:
          "Students color a worksheet while naming colors in Spanish. Partner work to describe their artwork.",
        type: "practice",
      },
      {
        name: "Color Song Performance",
        duration: "2 minutes",
        description:
          "Class sings along with the Colores track, pointing to corresponding colored objects around the room.",
        type: "wrap-up",
      },
    ],
    vocabulary: [
      "rojo - red",
      "azul - blue",
      "verde - green",
      "amarillo - yellow",
      "negro - black",
      "blanco - white",
      "morado - purple",
      "rosa - pink",
      "gris - gray",
      "marrón - brown",
      "anaranjado - orange",
    ],
    assessment:
      "Students demonstrate color vocabulary through oral participation in games and accurate completion of coloring worksheet with Spanish labels.",
    homework:
      "Find 5 objects at home and describe their colors in Spanish. Practice the color song with family members.",
    culturalNotes:
      "Explore how colors have cultural significance in Spanish-speaking countries, such as the colors of various national flags and their meanings.",
  },
  {
    id: "numbers-plan",
    title: "Spanish Numbers 0-101 Hip-Hop Style",
    category: "Numbers",
    duration: "50 minutes",
    level: "Beginner (A1)",
    objectives: [
      "Students will count from 0 to 101 in Spanish with correct pronunciation",
      "Students will understand number patterns and formation rules",
      "Students will use numbers in practical contexts (age, phone numbers, addresses)",
      "Students will demonstrate number recognition through musical rhythm",
    ],
    materials: [
      "Numbers 0-101 audio track",
      "Number cards (0-101)",
      "Whiteboard for number patterns",
      "Practice worksheets",
      "Small prizes for number games",
    ],
    activities: [
      {
        name: "Number Rhythm Intro",
        duration: "5 minutes",
        description:
          "Play the numbers track. Students listen to the rhythm and try to identify any numbers they recognize.",
        type: "warmup",
      },
      {
        name: "Numbers 0-20 Foundation",
        duration: "12 minutes",
        description:
          "Teach numbers 0-20 with emphasis on pronunciation. Use number cards and repetition. Explain unique numbers (once, doce, etc.).",
        type: "main",
      },
      {
        name: "Pattern Recognition 20-100",
        duration: "15 minutes",
        description:
          "Demonstrate patterns for 20s, 30s, etc. Students practice with the hip-hop track. Focus on 'y' connector for compound numbers.",
        type: "main",
      },
      {
        name: "Number Games",
        duration: "12 minutes",
        description:
          "Play number bingo, counting games, and 'What's My Number?' Students practice saying their age, phone numbers.",
        type: "practice",
      },
      {
        name: "Musical Number Challenge",
        duration: "4 minutes",
        description: "Students count along with the track from 0-101. Celebrate successful completion!",
        type: "practice",
      },
      {
        name: "Number Wrap-up",
        duration: "2 minutes",
        description: "Quick review of challenging numbers. Preview next lesson connection.",
        type: "wrap-up",
      },
    ],
    vocabulary: [
      "cero - zero",
      "uno - one",
      "dos - two",
      "tres - three",
      "cuatro - four",
      "cinco - five",
      "seis - six",
      "siete - seven",
      "ocho - eight",
      "nueve - nine",
      "diez - ten",
      "veinte - twenty",
      "treinta - thirty",
      "cuarenta - forty",
      "cincuenta - fifty",
      "sesenta - sixty",
      "setenta - seventy",
      "ochenta - eighty",
      "noventa - ninety",
      "cien - one hundred",
      "ciento uno - one hundred one",
    ],
    assessment:
      "Students will be evaluated on their ability to count in sequence, recognize written numbers, and use numbers in practical contexts during games.",
    homework:
      "Practice counting with the audio track daily. Write out numbers 1-50 in Spanish. Ask family members their ages in Spanish.",
    culturalNotes:
      "Discuss how numbers are used differently in Spanish-speaking countries (24-hour time, different date formats, currency systems).",
  },
]

export function LessonPlansPreview() {
  const [selectedPlan, setSelectedPlan] = useState<LessonPlan | null>(null)

  const downloadLessonPlan = (plan: LessonPlan) => {
    const content = `
LESSON PLAN: ${plan.title}
Category: ${plan.category}
Duration: ${plan.duration}
Level: ${plan.level}

LEARNING OBJECTIVES:
${plan.objectives.map((obj) => `• ${obj}`).join("\n")}

MATERIALS NEEDED:
${plan.materials.map((material) => `• ${material}`).join("\n")}

LESSON ACTIVITIES:

${plan.activities
  .map(
    (activity) => `
${activity.name.toUpperCase()} (${activity.duration})
Type: ${activity.type}
Description: ${activity.description}
`,
  )
  .join("\n")}

VOCABULARY:
${plan.vocabulary.map((word) => `• ${word}`).join("\n")}

ASSESSMENT:
${plan.assessment}

HOMEWORK:
${plan.homework}

${plan.culturalNotes ? `CULTURAL NOTES:\n${plan.culturalNotes}` : ""}

---
Generated by Yo Hablo - Spanish Hip-Hop Education Platform
    `.trim()

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${plan.title.replace(/\s+/g, "-").toLowerCase()}-lesson-plan.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "warmup":
        return <Music className="h-4 w-4 text-orange-600" />
      case "main":
        return <BookOpen className="h-4 w-4 text-blue-600" />
      case "practice":
        return <Target className="h-4 w-4 text-green-600" />
      case "wrap-up":
        return <FileText className="h-4 w-4 text-purple-600" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "warmup":
        return "border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20"
      case "main":
        return "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20"
      case "practice":
        return "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20"
      case "wrap-up":
        return "border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/20"
      default:
        return "border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950/20"
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Complete Lesson Plans</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Professionally designed lesson plans for Spanish hip-hop education. Each plan includes detailed activities,
          learning objectives, materials lists, and assessment strategies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessonPlans.map((plan) => (
          <Card key={plan.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg mb-2">{plan.title}</CardTitle>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">{plan.category}</Badge>
                    <Badge variant="outline">{plan.level}</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{plan.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Class Activity</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  <span>{plan.objectives.length} Learning Objectives</span>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Key Activities:</h4>
                  <div className="space-y-1">
                    {plan.activities.slice(0, 3).map((activity, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        {getActivityIcon(activity.type)}
                        <span className="truncate">{activity.name}</span>
                        <span className="text-gray-500 text-xs">({activity.duration})</span>
                      </div>
                    ))}
                    {plan.activities.length > 3 && (
                      <div className="text-xs text-gray-500">+{plan.activities.length - 3} more activities</div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => setSelectedPlan(plan)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh]">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">{selectedPlan?.title}</DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="h-[60vh] pr-4">
                        {selectedPlan && (
                          <div className="space-y-6">
                            {/* Header Info */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Category</div>
                                <div className="font-semibold">{selectedPlan.category}</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Duration</div>
                                <div className="font-semibold">{selectedPlan.duration}</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Level</div>
                                <div className="font-semibold">{selectedPlan.level}</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Activities</div>
                                <div className="font-semibold">{selectedPlan.activities.length}</div>
                              </div>
                            </div>

                            {/* Learning Objectives */}
                            <div>
                              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                                <Target className="h-5 w-5 text-blue-600" />
                                Learning Objectives
                              </h3>
                              <ul className="space-y-2">
                                {selectedPlan.objectives.map((objective, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold mt-1">•</span>
                                    <span>{objective}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Materials */}
                            <div>
                              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-green-600" />
                                Materials Needed
                              </h3>
                              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {selectedPlan.materials.map((material, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <span className="text-green-600 font-bold mt-1">•</span>
                                    <span>{material}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Activities */}
                            <div>
                              <h3 className="text-lg font-bold mb-3">Lesson Activities</h3>
                              <div className="space-y-4">
                                {selectedPlan.activities.map((activity, index) => (
                                  <div
                                    key={index}
                                    className={`p-4 rounded-lg border-2 ${getActivityColor(activity.type)}`}
                                  >
                                    <div className="flex items-center gap-3 mb-2">
                                      {getActivityIcon(activity.type)}
                                      <h4 className="font-semibold">{activity.name}</h4>
                                      <Badge variant="outline" className="text-xs">
                                        {activity.duration}
                                      </Badge>
                                      <Badge variant="secondary" className="text-xs capitalize">
                                        {activity.type}
                                      </Badge>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">{activity.description}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Vocabulary */}
                            <div>
                              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                                <Volume2 className="h-5 w-5 text-purple-600" />
                                Key Vocabulary
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {selectedPlan.vocabulary.map((word, index) => (
                                  <div
                                    key={index}
                                    className="p-2 bg-purple-50 dark:bg-purple-950/20 rounded border border-purple-200 dark:border-purple-800"
                                  >
                                    <span className="font-medium">{word}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Assessment & Homework */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h3 className="text-lg font-bold mb-3">Assessment</h3>
                                <p className="text-gray-700 dark:text-gray-300 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded border border-yellow-200 dark:border-yellow-800">
                                  {selectedPlan.assessment}
                                </p>
                              </div>
                              <div>
                                <h3 className="text-lg font-bold mb-3">Homework</h3>
                                <p className="text-gray-700 dark:text-gray-300 p-3 bg-blue-50 dark:bg-blue-950/20 rounded border border-blue-200 dark:border-blue-800">
                                  {selectedPlan.homework}
                                </p>
                              </div>
                            </div>

                            {/* Cultural Notes */}
                            {selectedPlan.culturalNotes && (
                              <div>
                                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                                  <Globe className="h-5 w-5 text-orange-600" />
                                  Cultural Notes
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 p-4 bg-orange-50 dark:bg-orange-950/20 rounded border border-orange-200 dark:border-orange-800">
                                  {selectedPlan.culturalNotes}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>

                  <Button
                    size="sm"
                    onClick={() => downloadLessonPlan(plan)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl border border-blue-200 dark:border-blue-800">
        <h3 className="text-2xl font-bold mb-4">Need Custom Lesson Plans?</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          Use our AI-powered lesson generator to create personalized lesson plans tailored to your specific needs and
          curriculum requirements.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Target className="h-5 w-5 mr-2" />
            Generate AI Lesson Plan
          </Button>
          <Button size="lg" variant="outline">
            <Music className="h-5 w-5 mr-2" />
            Create Musical Lesson
          </Button>
        </div>
      </div>
    </div>
  )
}
