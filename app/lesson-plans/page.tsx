import { PageHeader } from "@/components/page-header"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, Users, Download, Eye, FileText, Video, Headphones } from "lucide-react"

export default function LessonPlansPage() {
  const lessonPlans = [
    {
      id: 1,
      title: "Spanish Alphabet Through Hip-Hop",
      level: "Beginner",
      duration: "45 minutes",
      students: "15-30",
      category: "Fundamentals",
      description: "Complete lesson plan using Juli Slide alphabet song with activities, worksheets, and assessment.",
      objectives: [
        "Students will identify all 27 letters of the Spanish alphabet",
        "Students will pronounce Spanish letters correctly",
        "Students will recognize letter sounds in Spanish words",
      ],
      includes: [
        "Detailed lesson plan PDF",
        "Student worksheet",
        "Audio/Video content",
        "Assessment rubric",
        "Extension activities",
      ],
      materials: ["Computer/projector", "Printed worksheets", "Audio system"],
      standards: ["ACTFL World-Readiness Standards", "Common Core State Standards"],
    },
    {
      id: 2,
      title: "Colors and Emotions Unit",
      level: "Beginner",
      duration: "3 classes (45 min each)",
      students: "15-30",
      category: "Vocabulary",
      description: "Multi-day unit connecting Spanish colors with emotions through music and interactive activities.",
      objectives: [
        "Students will name 10+ colors in Spanish",
        "Students will express emotions using color vocabulary",
        "Students will create color-emotion connections",
      ],
      includes: ["3 detailed lesson plans", "Student worksheets", "Video content", "Project rubric", "Cultural notes"],
      materials: ["Art supplies", "Computer/projector", "Printed materials"],
      standards: ["ACTFL World-Readiness Standards", "National Arts Standards"],
    },
    {
      id: 3,
      title: "Family Members Through Music",
      level: "Beginner",
      duration: "50 minutes",
      students: "20-35",
      category: "Family & Relationships",
      description: "Engaging lesson teaching family vocabulary through hip-hop beats and cultural connections.",
      objectives: [
        "Students will identify immediate family members in Spanish",
        "Students will describe family relationships",
        "Students will understand cultural family concepts",
      ],
      includes: ["Lesson plan PDF", "Family tree worksheet", "Audio tracks", "Cultural comparison activity"],
      materials: ["Audio system", "Family photos", "Worksheets"],
      standards: ["ACTFL World-Readiness Standards", "C3 Framework"],
    },
  ]

  const categories = ["All", "Fundamentals", "Vocabulary", "Grammar", "Culture", "Family & Relationships"]

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Complete Lesson Plans"
        description="Ready-to-teach Spanish lesson plans with everything you need: objectives, activities, worksheets, videos, and assessments."
      />

      <div className="mb-8">
        <Tabs defaultValue="All" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="All" className="mt-8">
            <div className="grid gap-8">
              {lessonPlans.map((plan) => (
                <Card key={plan.id} className="overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 p-6">
                      <CardHeader className="p-0 mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">{plan.category}</Badge>
                          <Badge variant="secondary">{plan.level}</Badge>
                        </div>
                        <CardTitle className="text-2xl">{plan.title}</CardTitle>
                        <p className="text-muted-foreground">{plan.description}</p>
                      </CardHeader>

                      <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{plan.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{plan.students}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span>{plan.level}</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Learning Objectives:</h4>
                          <ul className="space-y-1">
                            {plan.objectives.map((objective, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                                {objective}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Materials Needed:</h4>
                          <div className="flex flex-wrap gap-2">
                            {plan.materials.map((material, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {material}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-6">
                      <h4 className="font-semibold mb-4">What's Included:</h4>
                      <ul className="space-y-3 mb-6">
                        {plan.includes.map((item, i) => (
                          <li key={i} className="text-sm flex items-center gap-3">
                            {item.includes("PDF") && <FileText className="h-4 w-4 text-blue-600" />}
                            {item.includes("Video") && <Video className="h-4 w-4 text-purple-600" />}
                            {item.includes("Audio") && <Headphones className="h-4 w-4 text-green-600" />}
                            {!item.includes("PDF") && !item.includes("Video") && !item.includes("Audio") && (
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            )}
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className="space-y-3">
                        <Button className="w-full" size="lg">
                          <Download className="h-4 w-4 mr-2" />
                          Download Lesson Plan
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview Content
                        </Button>
                      </div>

                      <div className="mt-6 pt-6 border-t">
                        <h5 className="font-semibold text-sm mb-2">Standards Alignment:</h5>
                        <div className="space-y-1">
                          {plan.standards.map((standard, i) => (
                            <div key={i} className="text-xs text-muted-foreground">
                              {standard}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Card className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Need Custom Lesson Plans?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Can't find exactly what you're looking for? Create your own lesson plans using our content creation tools,
            or request custom content from our education team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Create Custom Lesson</Button>
            <Button variant="outline" size="lg">
              Request Content
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
