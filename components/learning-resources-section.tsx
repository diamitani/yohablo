import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, Video, FileText, Music, Trophy } from "lucide-react"

export function LearningResourcesSection() {
  return (
    <section className="py-12 bg-white dark:bg-slate-950">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Learning Resources</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our comprehensive Spanish learning materials designed to make language acquisition engaging and
            effective.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-0 shadow-md overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center mb-4">
                  <Video className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Video Lessons</h3>
                <p className="text-muted-foreground mb-4">
                  Learn Spanish through engaging hip hop videos that make vocabulary and grammar fun and memorable.
                </p>
                <Link href="/videos">
                  <Button variant="outline" className="w-full">
                    Explore Videos
                  </Button>
                </Link>
              </div>
              <div className="h-40 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center">
                <Video className="h-16 w-16 text-blue-200 dark:text-blue-800" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-0 shadow-md overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Worksheets</h3>
                <p className="text-muted-foreground mb-4">
                  Reinforce your learning with interactive worksheets that test your knowledge and build confidence.
                </p>
                <Link href="/worksheets">
                  <Button variant="outline" className="w-full">
                    Practice Now
                  </Button>
                </Link>
              </div>
              <div className="h-40 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 flex items-center justify-center">
                <FileText className="h-16 w-16 text-amber-200 dark:text-amber-800" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-0 shadow-md overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Flashcards</h3>
                <p className="text-muted-foreground mb-4">
                  Master vocabulary with our interactive flashcard system designed for effective memorization.
                </p>
                <Link href="/flashcards">
                  <Button variant="outline" className="w-full">
                    Study Flashcards
                  </Button>
                </Link>
              </div>
              <div className="h-40 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-green-200 dark:text-green-800" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 border-0 shadow-md overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center mb-4">
                  <Music className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Audio Lessons</h3>
                <p className="text-muted-foreground mb-4">
                  Listen to Spanish hip hop songs and audio lessons to improve your pronunciation and listening skills.
                </p>
                <Link href="/audio">
                  <Button variant="outline" className="w-full">
                    Listen Now
                  </Button>
                </Link>
              </div>
              <div className="h-40 bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20 flex items-center justify-center">
                <Music className="h-16 w-16 text-purple-200 dark:text-purple-800" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 border-0 shadow-md overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/50 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Song Competition</h3>
                <p className="text-muted-foreground mb-4">
                  Participate in our Spanish song creation contest and showcase your language skills and creativity.
                </p>
                <Link href="/contest">
                  <Button variant="outline" className="w-full">
                    Join Competition
                  </Button>
                </Link>
              </div>
              <div className="h-40 bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 flex items-center justify-center">
                <Trophy className="h-16 w-16 text-rose-200 dark:text-rose-800" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
