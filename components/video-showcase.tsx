import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export function VideoShowcase() {
  // Define the specific videos to feature
  const videoLessons = [
    {
      id: "1",
      slug: "alfabeto",
      title: "Juli Slide (Alphabet in Spanish)",
      description: "Learn the Spanish alphabet through hip hop music with this catchy educational song.",
      videoUrl: "https://www.youtube.com/embed/uOQMDaWSn6c",
      thumbnail: "/spanish-alphabet-lesson.png",
    },
    {
      id: "2",
      slug: "colores",
      title: "Colores (Colors in Spanish)",
      description: "Master Spanish color vocabulary through engaging hip hop beats and memorable lyrics.",
      videoUrl: "https://www.youtube.com/embed/l0W4vdQKYbI",
      thumbnail: "/spanish-colors-rainbow-lesson.png",
    },
    {
      id: "3",
      slug: "numeros",
      title: "Numbers in Spanish",
      description: "Count and learn numbers in Spanish with rhythm and rhyme that makes learning fun.",
      videoUrl: "https://www.youtube.com/embed/iVkolTR98ew",
      thumbnail: "/spanish-numbers-lesson.png",
    },
  ]

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Featured Video Lessons</h2>
            <p className="text-xl text-muted-foreground">
              Our video lessons combine hip hop music with Spanish language instruction for an engaging learning
              experience.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoLessons.map((lesson) => (
            <Link key={lesson.id} href={`/lessons/${lesson.slug}`} className="group">
              <div className="rounded-xl overflow-hidden border bg-white dark:bg-slate-800 shadow-md transition-all duration-200 hover:shadow-lg hover:translate-y-[-4px]">
                <div className="aspect-video relative">
                  <iframe
                    src={lesson.videoUrl}
                    title={lesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  ></iframe>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{lesson.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{lesson.description}</p>
                  <div className="flex justify-end">
                    <span className="text-primary font-medium flex items-center text-sm">
                      Watch Lesson
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link href="/videos">
            <Button size="lg" className="gap-2">
              Explore All Videos
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
