import { PageHeader } from "@/components/page-header"
import { lessons } from "@/lib/data"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Music, Play, Volume2, Clock, Headphones, BookOpen } from "lucide-react"
import Link from "next/link"
import { AudioPlayer } from "@/components/audio-player"

export default function AudioPage() {
  // Filter lessons to only show those with audio content
  const audioLessons = lessons.filter(
    (lesson) => lesson.audioUrl && lesson.audioUrl.trim() !== "" && lesson.audioUrl !== "#",
  )

  const getCategoryColor = (category: string) => {
    const colors = {
      Fundamentals: "from-blue-500 to-blue-600",
      Vocabulary: "from-green-500 to-green-600",
      Grammar: "from-purple-500 to-purple-600",
      Descriptions: "from-pink-500 to-pink-600",
      Health: "from-red-500 to-red-600",
      Travel: "from-orange-500 to-orange-600",
      Home: "from-indigo-500 to-indigo-600",
      Places: "from-teal-500 to-teal-600",
      Education: "from-yellow-500 to-yellow-600",
      "Un Día en La Vida": "from-cyan-500 to-cyan-600",
    }
    return colors[category as keyof typeof colors] || "from-gray-500 to-gray-600"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <PageHeader
        title="Audio Lessons"
        description="Listen to Spanish hip hop songs and audio lessons to improve your pronunciation and listening skills"
      />

      <div className="container px-4 md:px-6 py-12">
        {/* Audio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 border-purple-200 dark:border-purple-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center">
                  <Music className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{audioLessons.length}</p>
                  <p className="text-sm text-purple-600 dark:text-purple-400">Audio Lessons</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{audioLessons.length * 3}+</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Minutes of Audio</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                    {audioLessons.reduce((total, lesson) => total + (lesson.vocabularyWords?.length || 0), 0)}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400">Vocabulary Words</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Audio Lessons Grid */}
        {audioLessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {audioLessons.map((lesson) => (
              <Card
                key={lesson.id}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <CardHeader className="p-0">
                  {/* Audio Visual Header */}
                  <div className="relative">
                    <div
                      className={`h-48 w-full bg-gradient-to-br ${getCategoryColor(lesson.category || "Vocabulary")} relative group-hover:scale-105 transition-transform duration-300`}
                    >
                      {/* Background pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div
                          className="h-full w-full"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            backgroundSize: "30px 30px",
                          }}
                        />
                      </div>

                      {/* Content overlay */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mb-3 group-hover:scale-110 transition-transform duration-300">
                          <Headphones className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex items-center gap-2 text-sm opacity-90">
                          <Play className="h-4 w-4" />
                          <span>Audio Lesson</span>
                        </div>
                        {lesson.vocabularyWords && lesson.vocabularyWords.length > 0 && (
                          <div className="mt-2 text-xs opacity-80 text-center">
                            {lesson.vocabularyWords.length} vocabulary words
                          </div>
                        )}
                      </div>

                      {/* Audio indicator */}
                      <div className="absolute top-3 right-3">
                        <div className="bg-black/30 backdrop-blur-sm text-white p-1.5 rounded-md">
                          <Music className="h-4 w-4" />
                        </div>
                      </div>

                      {/* Category badge */}
                      {lesson.category && (
                        <div className="absolute top-3 left-3">
                          <Badge
                            variant="secondary"
                            className="bg-white/20 backdrop-blur-sm text-white border-white/30"
                          >
                            {lesson.category}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {lesson.title}
                  </CardTitle>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{lesson.description}</p>

                  {/* Audio Player */}
                  {lesson.audioUrl && (
                    <div className="mb-4">
                      <AudioPlayer src={lesson.audioUrl} title={lesson.title} className="w-full" />
                    </div>
                  )}

                  {/* Vocabulary Preview */}
                  {lesson.vocabularyWords && lesson.vocabularyWords.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        Vocabulary:
                        <Volume2 className="h-3 w-3 text-primary" title="Audio available" />
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {lesson.vocabularyWords.slice(0, 3).map((word, index) => (
                          <Badge key={index} variant="secondary" className="text-xs py-1 px-2">
                            {word}
                          </Badge>
                        ))}
                        {lesson.vocabularyWords.length > 3 && (
                          <Badge variant="outline" className="text-xs py-1 px-2">
                            +{lesson.vocabularyWords.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="px-4 pb-4 pt-0">
                  <Link href={`/lessons/${lesson.slug}`} className="w-full">
                    <Button className="w-full group-hover:shadow-md transition-all duration-300">
                      <Headphones className="h-4 w-4 mr-2" />
                      Listen & Learn
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Audio Lessons Available</h3>
            <p className="text-muted-foreground mb-6">
              Audio lessons are coming soon. Check back later for new content!
            </p>
            <Link href="/lessons">
              <Button variant="outline">Browse All Lessons</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
