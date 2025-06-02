import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Music, Video, FileText, Volume2, Play, Headphones, Clock, BookOpen, CheckCircle } from "lucide-react"
import type { Lesson } from "@/lib/types"
import { worksheetData } from "@/lib/worksheet-data"

interface LessonCardProps {
  lesson: Lesson
  showProgress?: boolean
  contentTypeFilter?: string
}

export function LessonCard({ lesson, showProgress = false, contentTypeFilter }: LessonCardProps) {
  // Check if we have actual worksheet data for this lesson
  const hasWorksheetData = lesson.slug in worksheetData

  // Determine if we should show a worksheet preview
  const showWorksheetPreview = lesson.worksheetUrl && lesson.worksheetUrl !== "#"

  // Check content types
  const hasVideo = lesson.videoUrl && lesson.videoUrl.trim() !== ""
  const hasAudio = lesson.audioUrl && lesson.audioUrl.trim() !== ""
  const hasWorksheet = lesson.worksheetUrl && lesson.worksheetUrl.trim() !== "" && lesson.worksheetUrl !== "#"

  // Determine primary content type
  const getPrimaryContentType = () => {
    if (contentTypeFilter && contentTypeFilter !== "all") {
      return contentTypeFilter
    }
    if (hasVideo) return "video"
    if (hasAudio) return "audio"
    if (hasWorksheet) return "worksheet"
    return "mixed"
  }

  const primaryContentType = getPrimaryContentType()

  // Get category color for audio lessons
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
    <Card className="saas-card h-full flex flex-col group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="p-4 pb-3 space-y-0">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-start gap-2">
            <CardTitle className="saas-heading-4 line-clamp-2 group-hover:text-primary transition-colors">
              {lesson.title}
            </CardTitle>
            {lesson.category && (
              <Badge variant="secondary" className="shrink-0 text-xs">
                {lesson.category}
              </Badge>
            )}
          </div>

          {/* Content Type Indicators - Enhanced for filtering */}
          <div className="flex justify-between items-center">
            <div className="flex gap-1">
              {hasVideo && (
                <Badge
                  variant={primaryContentType === "video" ? "default" : "outline"}
                  className="flex items-center gap-1 text-xs h-6"
                >
                  <Video className="h-3 w-3" />
                  <span>Video</span>
                  {primaryContentType === "video" && <CheckCircle className="h-3 w-3" />}
                </Badge>
              )}
              {hasAudio && (
                <Badge
                  variant={primaryContentType === "audio" ? "default" : "outline"}
                  className="flex items-center gap-1 text-xs h-6"
                >
                  <Music className="h-3 w-3" />
                  <span>Audio</span>
                  {primaryContentType === "audio" && <CheckCircle className="h-3 w-3" />}
                </Badge>
              )}
              {hasWorksheet && (
                <Badge
                  variant={primaryContentType === "worksheet" ? "default" : "outline"}
                  className="flex items-center gap-1 text-xs h-6"
                >
                  <FileText className="h-3 w-3" />
                  <span>Worksheet</span>
                  {primaryContentType === "worksheet" && <CheckCircle className="h-3 w-3" />}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>15 min</span>
            </div>
          </div>

          {/* Primary Content Type Indicator */}
          {contentTypeFilter && contentTypeFilter !== "all" && (
            <div className="flex items-center gap-2 text-xs text-primary bg-primary/10 rounded-md px-2 py-1">
              {contentTypeFilter === "video" && <Video className="h-3 w-3" />}
              {contentTypeFilter === "audio" && <Music className="h-3 w-3" />}
              {contentTypeFilter === "worksheet" && <FileText className="h-3 w-3" />}
              <span className="font-medium">
                {contentTypeFilter === "video" && "Video Lesson"}
                {contentTypeFilter === "audio" && "Audio Lesson"}
                {contentTypeFilter === "worksheet" && "Worksheet Practice"}
              </span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 px-4 pb-3 pt-0">
        {/* Content-specific display based on primary type */}
        {primaryContentType === "audio" || (!hasVideo && hasAudio) ? (
          <div className="aspect-[16/9] overflow-hidden rounded-lg mb-4 relative">
            <div
              className={`h-full w-full bg-gradient-to-br ${getCategoryColor(lesson.category || "Vocabulary")} relative group-hover:scale-105 transition-transform duration-300`}
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
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Headphones className="h-6 w-6 text-white" />
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
                  <Music className="h-3 w-3" />
                </div>
              </div>
            </div>
          </div>
        ) : primaryContentType === "worksheet" && hasWorksheetData ? (
          <div className="aspect-[4/3] overflow-hidden rounded-lg mb-4 relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-3 border border-blue-200 dark:border-blue-700">
            <div className="h-full flex flex-col">
              <div className="text-center border-b border-blue-200 dark:border-blue-700 pb-2 mb-2">
                <h3 className="font-bold text-sm leading-tight text-blue-900 dark:text-blue-100">
                  {worksheetData[lesson.slug].title}
                </h3>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <FileText className="h-3 w-3 text-blue-600" />
                  <span className="text-xs text-blue-600">Interactive Worksheet</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col space-y-2 overflow-hidden">
                {worksheetData[lesson.slug].content.slice(0, 3).map((item, i) => (
                  <div key={i} className="text-xs">
                    <div className="flex items-center gap-2">
                      <div className="min-w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {i + 1}
                      </div>
                      <div className="overflow-hidden">
                        <p
                          className="line-clamp-2 text-xs leading-tight text-gray-700 dark:text-gray-300"
                          dangerouslySetInnerHTML={{
                            __html: item.question
                              .replace(/\$\$(\d+)\$\$/g, '<span class="font-bold text-blue-600">($1)</span>')
                              .replace(/_+/g, '<span class="bg-blue-100 dark:bg-blue-800 px-1 rounded">_____</span>'),
                          }}
                        ></p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="aspect-[16/9] overflow-hidden rounded-lg mb-4 relative">
            <img
              src={lesson.thumbnail || `/placeholder.svg?height=200&width=300&query=spanish+lesson+${lesson.title}`}
              alt={lesson.title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                // Fallback to a gradient background if image fails to load
                const target = e.target as HTMLImageElement
                target.style.display = "none"
                const parent = target.parentElement
                if (parent) {
                  parent.innerHTML = `
                    <div class="h-full w-full bg-gradient-to-br ${getCategoryColor(lesson.category || "Vocabulary")} flex items-center justify-center">
                      <div class="text-white text-center p-4">
                        <div class="bg-white/20 backdrop-blur-sm rounded-full p-3 mb-2 inline-block">
                          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                        </div>
                        <h3 class="font-bold text-sm">${lesson.title}</h3>
                      </div>
                    </div>
                  `
                }
              }}
            />
            <div className="absolute top-3 right-3 flex gap-1">
              {hasVideo && (
                <div className="bg-black/70 text-white p-1.5 rounded-md backdrop-blur-sm">
                  <Video className="h-3 w-3" />
                </div>
              )}
              {hasAudio && (
                <div className="bg-black/70 text-white p-1.5 rounded-md backdrop-blur-sm">
                  <Music className="h-3 w-3" />
                </div>
              )}
            </div>
          </div>
        )}

        <p className="saas-body-small text-muted-foreground mb-4 line-clamp-2">{lesson.description}</p>

        {showProgress && (
          <div className="mb-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span>Progress</span>
              <span>{lesson.progress || 0}%</span>
            </div>
            <Progress value={lesson.progress || 0} className="h-1.5" />
          </div>
        )}

        {lesson.vocabularyWords && lesson.vocabularyWords.length > 0 && (
          <div className="mb-4">
            <p className="saas-body-small text-muted-foreground mb-2 flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              Vocabulary:
              {hasWorksheetData && <Volume2 className="h-3 w-3 text-primary" title="Audio available" />}
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
          <Button className="w-full saas-button-primary group-hover:shadow-md transition-all duration-300">
            {primaryContentType === "audio"
              ? "Listen & Learn"
              : primaryContentType === "worksheet"
                ? "Practice Now"
                : primaryContentType === "video"
                  ? "Watch Lesson"
                  : "Start Lesson"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
