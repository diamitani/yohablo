"use client"
import { Button } from "@/components/ui/button"
import { Download, FileText, Music, Video, Volume2, BookOpen, Play, Clock, Star } from "lucide-react"
import type { Lesson } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { AudioPlayer } from "@/components/audio-player"
import { WorksheetContent } from "@/components/worksheet-content"
import { worksheetData } from "@/lib/worksheet-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VocabularyAudio } from "@/components/vocabulary-audio"
import Link from "next/link"

interface LessonDetailProps {
  lesson: Lesson
}

export function LessonDetail({ lesson }: LessonDetailProps) {
  // Check if we have worksheet data for this lesson
  const hasWorksheetData = lesson.slug in worksheetData

  // Determine which tabs should be available
  const hasVideo = !!lesson.videoUrl
  const hasAudio = !!lesson.audioUrl
  const hasVocabulary = !!lesson.vocabularyWords && lesson.vocabularyWords.length > 0

  // Determine default tab
  let defaultTab = "overview"
  if (hasVideo) defaultTab = "video"
  else if (hasAudio) defaultTab = "audio"
  else if (hasWorksheetData) defaultTab = "worksheet"

  return (
    <div className="saas-container">
      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        {/* Main Content */}
        <div className="space-y-8">
          {/* Lesson Header */}
          <div className="saas-card p-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="saas-heading-2 mb-2">{lesson.title}</h1>
                <p className="saas-body text-muted-foreground">{lesson.description}</p>
              </div>
              <div className="flex items-center gap-2">
                {lesson.category && (
                  <Badge variant="secondary" className="px-3 py-1">
                    {lesson.category}
                  </Badge>
                )}
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>15-20 min</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{lesson.vocabularyWords?.length || 0}</div>
                <div className="text-xs text-muted-foreground">Vocabulary</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{lesson.learningPoints?.length || 0}</div>
                <div className="text-xs text-muted-foreground">Learning Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {hasVideo && hasAudio ? "2" : hasVideo || hasAudio ? "1" : "0"}
                </div>
                <div className="text-xs text-muted-foreground">Media Types</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{hasWorksheetData ? "1" : "0"}</div>
                <div className="text-xs text-muted-foreground">Worksheets</div>
              </div>
            </div>
          </div>

          {/* Lesson Content Tabs */}
          <div className="saas-card animate-slide-up">
            <Tabs defaultValue={defaultTab} className="w-full">
              <div className="border-b px-6 pt-6">
                <TabsList className="grid w-full grid-cols-5 bg-muted/50">
                  <TabsTrigger value="overview" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline">Overview</span>
                  </TabsTrigger>
                  <TabsTrigger value="video" disabled={!hasVideo} className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    <span className="hidden sm:inline">Video</span>
                  </TabsTrigger>
                  <TabsTrigger value="audio" disabled={!hasAudio} className="flex items-center gap-2">
                    <Music className="h-4 w-4" />
                    <span className="hidden sm:inline">Audio</span>
                  </TabsTrigger>
                  <TabsTrigger value="worksheet" disabled={!hasWorksheetData} className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline">Practice</span>
                  </TabsTrigger>
                  <TabsTrigger value="vocabulary" disabled={!hasVocabulary} className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Vocab</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="p-6 space-y-6">
                <div>
                  <h3 className="saas-heading-3 mb-4">What You'll Learn</h3>
                  <div className="grid gap-3">
                    {lesson.learningPoints?.map((point, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                          <span className="text-xs font-semibold text-primary">{index + 1}</span>
                        </div>
                        <p className="saas-body">{point}</p>
                      </div>
                    )) || (
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                          <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                            <span className="text-xs font-semibold text-primary">1</span>
                          </div>
                          <p className="saas-body">Master key vocabulary related to {lesson.title}</p>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                          <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                            <span className="text-xs font-semibold text-primary">2</span>
                          </div>
                          <p className="saas-body">Practice proper pronunciation and usage</p>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                          <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                            <span className="text-xs font-semibold text-primary">3</span>
                          </div>
                          <p className="saas-body">Understand cultural context and applications</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {lesson.vocabularyWords && lesson.vocabularyWords.length > 0 && (
                  <div>
                    <h3 className="saas-heading-3 mb-4 flex items-center gap-2">
                      Vocabulary Preview
                      {hasWorksheetData && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Volume2 className="h-3 w-3" />
                          Audio Available
                        </Badge>
                      )}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {lesson.vocabularyWords.slice(0, 8).map((word, index) => (
                        <div
                          key={index}
                          className="p-3 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors"
                        >
                          <div className="font-medium text-sm">{word}</div>
                        </div>
                      ))}
                      {lesson.vocabularyWords.length > 8 && (
                        <div className="p-3 bg-muted/50 rounded-lg border border-dashed border-muted-foreground/30 flex items-center justify-center">
                          <span className="text-sm text-muted-foreground">
                            +{lesson.vocabularyWords.length - 8} more
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="video" className="p-6">
                {hasVideo ? (
                  <div className="space-y-4">
                    <div className="aspect-video overflow-hidden rounded-xl border border-border shadow-lg">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${getYouTubeId(lesson.videoUrl!)}`}
                        title={lesson.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="aspect-video"
                      ></iframe>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Play className="h-4 w-4" />
                      <span>Interactive video lesson with Spanish hip-hop music</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-12 bg-muted/30 rounded-xl">
                    <Video className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="saas-heading-4 mb-2">No Video Available</h3>
                    <p className="saas-body text-muted-foreground">This lesson doesn't include a video component.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="audio" className="p-6">
                {hasAudio ? (
                  <div className="space-y-4">
                    <AudioPlayer src={lesson.audioUrl!} title={`${lesson.title} - Audio Lesson`} />
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Music className="h-4 w-4" />
                      <span>High-quality audio lesson for pronunciation practice</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-12 bg-muted/30 rounded-xl">
                    <Music className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="saas-heading-4 mb-2">No Audio Available</h3>
                    <p className="saas-body text-muted-foreground">This lesson doesn't include an audio component.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="worksheet" className="p-6">
                {hasWorksheetData ? (
                  <WorksheetContent
                    title={worksheetData[lesson.slug].title}
                    content={worksheetData[lesson.slug].content}
                    type={worksheetData[lesson.slug].type}
                  />
                ) : (
                  <div className="text-center p-12 bg-muted/30 rounded-xl">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="saas-heading-4 mb-2">Practice Worksheet Coming Soon</h3>
                    <p className="saas-body text-muted-foreground">
                      Interactive worksheets for this lesson are being prepared.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="vocabulary" className="p-6">
                {hasVocabulary ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="saas-heading-3 mb-4">Vocabulary Audio Practice</h3>
                      <p className="saas-body text-muted-foreground mb-6">
                        Practice your pronunciation with audio for each vocabulary word. Click the speaker icon to hear
                        correct pronunciation.
                      </p>
                    </div>

                    <div className="grid gap-4">
                      {lesson.vocabularyWords?.map((word, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-200"
                        >
                          <VocabularyAudio word={word} />
                          <div className="flex-1">
                            <div className="font-semibold text-lg">{word}</div>
                            <div className="text-sm text-muted-foreground">Click to hear pronunciation</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-muted-foreground">Word {index + 1}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl border border-blue-200 dark:border-blue-800">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Star className="h-5 w-5 text-blue-600" />
                        Pronunciation Tips
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Listen carefully to the audio and try to mimic the exact sounds</li>
                        <li>• Pay attention to the stress patterns in multi-syllable words</li>
                        <li>• Practice saying each word aloud multiple times</li>
                        <li>• Record yourself and compare with the original pronunciation</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-12 bg-muted/30 rounded-xl">
                    <Volume2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="saas-heading-4 mb-2">Vocabulary Audio Coming Soon</h3>
                    <p className="saas-body text-muted-foreground">
                      Audio pronunciation guides for this lesson are being prepared.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="saas-card p-6 animate-scale-in">
            <h3 className="saas-heading-4 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {lesson.worksheetUrl && lesson.worksheetUrl !== "#" && (
                <Button className="w-full justify-start saas-button-primary" asChild>
                  <a href={lesson.worksheetUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    Download Worksheet
                  </a>
                </Button>
              )}
              {hasWorksheetData && (
                <Button className="w-full justify-start saas-button-secondary">
                  <FileText className="mr-2 h-4 w-4" />
                  Interactive Practice
                </Button>
              )}
              {hasVocabulary && (
                <Button className="w-full justify-start saas-button-secondary" asChild>
                  <Link href={`/flashcards/${lesson.slug}`}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Flashcard Practice
                  </Link>
                </Button>
              )}
              {hasVocabulary && (
                <Button className="w-full justify-start saas-button-secondary" asChild>
                  <Link href={`/pronunciation-practice/${lesson.slug}`}>
                    <Volume2 className="mr-2 h-4 w-4" />
                    Pronunciation Practice
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Lesson Info */}
          <div className="saas-card p-6">
            <h3 className="saas-heading-4 mb-4">Lesson Information</h3>
            <div className="space-y-4">
              {lesson.category && (
                <div className="flex items-center justify-between">
                  <span className="saas-body-small">Category:</span>
                  <Badge variant="outline">{lesson.category}</Badge>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="saas-body-small">Duration:</span>
                <span className="saas-body-small font-medium">15-20 minutes</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="saas-body-small">Difficulty:</span>
                <Badge variant="secondary">Beginner</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="saas-body-small">Format:</span>
                <div className="flex gap-1">
                  {hasVideo && (
                    <Badge variant="outline" className="text-xs">
                      Video
                    </Badge>
                  )}
                  {hasAudio && (
                    <Badge variant="outline" className="text-xs">
                      Audio
                    </Badge>
                  )}
                  {hasWorksheetData && (
                    <Badge variant="outline" className="text-xs">
                      Practice
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Progress Tracking */}
          <div className="saas-card p-6">
            <h3 className="saas-heading-4 mb-4">Your Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Lesson Progress</span>
                  <span>{lesson.progress || 0}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${lesson.progress || 0}%` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <div className="text-lg font-bold text-primary">0</div>
                  <div className="text-xs text-muted-foreground">Times Completed</div>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <div className="text-lg font-bold text-primary">0</div>
                  <div className="text-xs text-muted-foreground">Practice Sessions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getYouTubeId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : url
}
