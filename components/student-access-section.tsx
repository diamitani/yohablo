import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Video, Headphones, CreditCard, User } from "lucide-react"
import Link from "next/link"

export function StudentAccessSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            For Students
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Student Learning Portal</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Students can access videos, practice with flashcards, and complete assignments from their teachers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Video className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Watch Learning Videos</h3>
                <p className="text-muted-foreground">
                  Access hip-hop music videos and educational content assigned by teachers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Practice with Flashcards</h3>
                <p className="text-muted-foreground">
                  Interactive flashcards for vocabulary practice and self-assessment.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                <Headphones className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Audio Content</h3>
                <p className="text-muted-foreground">Listen to pronunciation guides and audio lessons on any device.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Teacher Assignments</h3>
                <p className="text-muted-foreground">
                  Access content and assignments specifically shared by your teacher.
                </p>
              </div>
            </div>
          </div>

          <Card className="p-8 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl">Student Login</CardTitle>
              <p className="text-muted-foreground">Access your learning materials and assignments</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">25+</div>
                  <div className="text-sm text-muted-foreground">Video Lessons</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Flashcards</div>
                </div>
              </div>
              <Link href="/login" className="block">
                <Button className="w-full" size="lg">
                  <User className="mr-2 h-5 w-5" />
                  Student Login
                </Button>
              </Link>
              <p className="text-xs text-center text-muted-foreground">Need an account? Ask your teacher for access.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
