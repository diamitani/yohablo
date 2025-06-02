import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, FileText, Video, Users, CheckCircle } from "lucide-react"

export function Hero() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-blue-950 dark:via-gray-900 dark:to-indigo-950">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Ready-to-Use Spanish Lessons for <span className="text-primary">Educators</span>
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Plug-and-play lesson plans, worksheets, and hip-hop videos that make Spanish learning engaging and
                effective. Built by educators, for educators.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/lesson-plans">
                <Button size="lg" className="w-full sm:w-auto">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Browse Lesson Plans
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Users className="mr-2 h-5 w-5" />
                  Teacher Login
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">Curriculum Aligned</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">Easy Prep</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">Engaging Content</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">Student Tracking</span>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Complete Lesson Plans</h3>
                    <p className="text-sm text-gray-600">Ready-to-teach with objectives, activities, and assessments</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Interactive Worksheets</h3>
                    <p className="text-sm text-gray-600">Printable and digital worksheets for practice</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Video className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Hip-Hop Learning Videos</h3>
                    <p className="text-sm text-gray-600">Engaging music videos that make vocabulary stick</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
