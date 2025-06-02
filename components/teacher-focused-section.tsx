import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Clock, Target, Zap, Award } from "lucide-react"
import Link from "next/link"

export function TeacherFocusedSection() {
  const features = [
    {
      icon: Clock,
      title: "5-Minute Prep",
      description: "Grab a lesson plan and go. Everything you need is included and organized.",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Target,
      title: "Standards Aligned",
      description: "All content aligns with national world language learning standards.",
      color: "bg-green-50 text-green-600",
    },
    {
      icon: Zap,
      title: "Student Engagement",
      description: "Hip-hop and music make vocabulary memorable and fun for students.",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Used by educators nationwide with measurable learning outcomes.",
      color: "bg-orange-50 text-orange-600",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            For Educators
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Built by Teachers, for Teachers</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We understand the challenges of teaching Spanish. That's why we've created a comprehensive toolkit that
            saves you time while delivering exceptional learning experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Spanish Classroom?</h3>
              <p className="text-muted-foreground mb-6">
                Join hundreds of educators who are already using Yo Hablo to create engaging, effective Spanish learning
                experiences. Get started with our ready-to-use lesson plans today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/lesson-plans">
                  <Button size="lg" className="w-full sm:w-auto">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Explore Lesson Plans
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <Users className="mr-2 h-5 w-5" />
                    Create Teacher Account
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Lesson Plans</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100+</div>
                <div className="text-sm text-muted-foreground">Worksheets</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">25+</div>
                <div className="text-sm text-muted-foreground">Video Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Vocabulary Words</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
