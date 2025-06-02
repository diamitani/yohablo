import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Share2, Folder, Star } from "lucide-react"
import Link from "next/link"

export function ContentCreationSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            For Advanced Users
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Create and Share Your Own Content</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Build custom lesson plans, worksheets, and activities. Organize your content and share with colleagues.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                <Plus className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">Create Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Build custom lesson plans with our easy-to-use templates and tools.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-4">
                <Folder className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">Organize Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Categorize and organize your lessons by topic, level, or class.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-4">
                <Share2 className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">Share & Collaborate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Share your content with colleagues and collaborate on lesson development.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">Get Featured</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Outstanding content may be featured in our community showcase.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Create?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join our community of educators creating innovative Spanish learning content. Start building your first
            lesson plan today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create-lesson">
              <Button size="lg" className="w-full sm:w-auto">
                <Plus className="mr-2 h-5 w-5" />
                Create Your First Lesson
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Sign Up as Teacher
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
