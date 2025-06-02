import { PageHeader } from "@/components/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Video, Clock, Play } from "lucide-react"
import Link from "next/link"

export default function VideosPage() {
  // Only the video lessons with actual working video URLs
  const videoLessons = [
    {
      id: "1",
      slug: "alfabeto",
      title: "Juli Slide (Alphabet in Spanish)",
      description: "Learn the Spanish alphabet through hip hop music with this catchy educational song.",
      videoUrl: "https://www.youtube.com/embed/uOQMDaWSn6c",
      thumbnail: "/spanish-alphabet-lesson.png",
      category: "Fundamentals",
      duration: "3:45",
      vocabularyCount: 26,
    },
    {
      id: "2",
      slug: "colores",
      title: "Colores (Colors in Spanish)",
      description: "Master Spanish color vocabulary through engaging hip hop beats and memorable lyrics.",
      videoUrl: "https://www.youtube.com/embed/l0W4vdQKYbI",
      thumbnail: "/spanish-colors-rainbow-lesson.png",
      category: "Vocabulary",
      duration: "4:12",
      vocabularyCount: 11,
    },
    {
      id: "3",
      slug: "numeros",
      title: "Numbers in Spanish",
      description: "Count and learn numbers in Spanish with rhythm and rhyme that makes learning fun.",
      videoUrl: "https://www.youtube.com/embed/iVkolTR98ew",
      thumbnail: "/spanish-numbers-lesson.png",
      category: "Fundamentals",
      duration: "5:23",
      vocabularyCount: 15,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Video Lessons"
        description="Learn Spanish through engaging hip hop music videos that make vocabulary and grammar memorable."
      />

      <div className="container px-4 md:px-6 py-12">
        {/* Stats Section */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Video className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold">{videoLessons.length}</div>
              <div className="text-sm text-muted-foreground">Video Lessons</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold">13+</div>
              <div className="text-sm text-muted-foreground">Minutes of Content</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Play className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold">52+</div>
              <div className="text-sm text-muted-foreground">Vocabulary Words</div>
            </Card>
          </div>
        </div>

        {/* Video Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoLessons.map((lesson) => (
            <Card
              key={lesson.id}
              className="overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-video relative">
                <iframe
                  src={lesson.videoUrl}
                  title={lesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>

                {/* Overlay with lesson info */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge variant="secondary" className="bg-black/70 text-white border-0">
                    <Video className="h-3 w-3 mr-1" />
                    Video
                  </Badge>
                  <Badge variant="secondary" className="bg-black/70 text-white border-0">
                    <Clock className="h-3 w-3 mr-1" />
                    {lesson.duration}
                  </Badge>
                </div>

                <div className="absolute top-3 right-3">
                  <Badge variant="outline" className="bg-white/90 text-gray-900 border-0">
                    {lesson.category}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {lesson.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{lesson.description}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span>{lesson.vocabularyCount} words</span>
                      <span>{lesson.duration}</span>
                    </div>
                    <Badge variant="secondary">{lesson.category}</Badge>
                  </div>

                  <Link href={`/lessons/${lesson.slug}`} className="block">
                    <Button className="w-full group-hover:shadow-md transition-all duration-300">
                      <Play className="h-4 w-4 mr-2" />
                      Watch Lesson
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <h3 className="text-2xl font-bold mb-4">Ready to Learn More?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Explore our complete collection of Spanish lessons including audio content, interactive worksheets, and
              flashcards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/lessons">
                <Button size="lg" className="gap-2">
                  Browse All Lessons
                </Button>
              </Link>
              <Link href="/flashcards">
                <Button size="lg" variant="outline" className="gap-2">
                  Try Flashcards
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
