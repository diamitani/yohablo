"use client"
import { Button } from "@/components/ui/button"
import { Download, FileText, Music, Video, Volume2, BookOpen, Play, Clock, Star, ExternalLink } from "lucide-react"
import type { Lesson } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { AudioPlayer } from "@/components/audio-player"
import { YouTubePlayer } from "@/components/youtube-player"
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
  const hasAudio = !!lesson.audioSrc
  const hasVocabulary = !!lesson.vocabulary && lesson.vocabulary.length > 0

  // Determine default tab
  let defaultTab = "overview"
  if (hasVideo) defaultTab = "video"
  else if (hasAudio) defaultTab = "audio"
  else if (hasWorksheetData) defaultTab = "worksheet"

  // Helper function to extract YouTube video ID
  const getYouTubeId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : url
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Lesson Header */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {lesson.title}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{lesson.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  {lesson.category && (
                    <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                      {lesson.category}
                    </Badge>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg">
                    <Clock className="h-4 w-4" />
                    <span>{lesson.duration || "15-20 min"}</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {lesson.vocabulary?.length || 0}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Vocabulary Words</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {lesson.objectives?.length || 3}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Learning Goals</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {hasVideo && hasAudio ? "2" : hasVideo || hasAudio ? "1" : "0"}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Media Types</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {hasWorksheetData ? "1" : "0"}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Worksheets</div>
                </div>
              </div>
            </div>

            {/* Lesson Content Tabs */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 animate-slide-up">
              <Tabs defaultValue={defaultTab} className="w-full">
                <div className="border-b border-gray-200 dark:border-gray-700 px-6 pt-6">
                  <TabsList className="grid w-full grid-cols-5 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                    <TabsTrigger
                      value="overview"
                      className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                    >
                      <FileText className="h-4 w-4" />
                      <span className="hidden sm:inline">Overview</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="video"
                      disabled={!hasVideo}
                      className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                    >
                      <Video className="h-4 w-4" />
                      <span className="hidden sm:inline">Video</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="audio"
                      disabled={!hasAudio}
                      className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                    >
                      <Music className="h-4 w-4" />
                      <span className="hidden sm:inline">Audio</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="worksheet"
                      disabled={!hasWorksheetData}
                      className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                    >
                      <FileText className="h-4 w-4" />
                      <span className="hidden sm:inline">Practice</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="vocabulary"
                      disabled={!hasVocabulary}
                      className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                    >
                      <Volume2 className="h-4 w-4" />
                      <span className="hidden sm:inline">Vocab</span>
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="overview" className="p-8 space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <Star className="h-6 w-6 text-yellow-500" />
                      What You'll Learn
                    </h3>
                    <div className="grid gap-4">
                      {lesson.objectives?.map((point, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-950/20 dark:to-transparent rounded-lg border border-blue-200 dark:border-blue-800"
                        >
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {index + 1}
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{point}</p>
                        </div>
                      )) || (
                        <div className="space-y-4">
                          <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-950/20 dark:to-transparent rounded-lg border border-blue-200 dark:border-blue-800">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                              1
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              Master key vocabulary related to {lesson.title}
                            </p>
                          </div>
                          <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-transparent dark:from-purple-950/20 dark:to-transparent rounded-lg border border-purple-200 dark:border-purple-800">
                            <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                              2
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              Practice proper pronunciation and usage
                            </p>
                          </div>
                          <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-transparent dark:from-green-950/20 dark:to-transparent rounded-lg border border-green-200 dark:border-green-800">
                            <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                              3
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              Understand cultural context and applications
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {lesson.vocabulary && lesson.vocabulary.length > 0 && (
                    <div>
                      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        Vocabulary Preview
                        {hasWorksheetData && (
                          <Badge variant="outline" className="flex items-center gap-1 ml-3">
                            <Volume2 className="h-3 w-3" />
                            Audio Available
                          </Badge>
                        )}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {lesson.vocabulary.slice(0, 12).map((word, index) => (
                          <div
                            key={index}
                            className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-md"
                          >
                            <div className="font-semibold text-blue-600 dark:text-blue-400 mb-1">{word.spanish}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{word.english}</div>
                          </div>
                        ))}
                        {lesson.vocabulary.length > 12 && (
                          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-dashed border-blue-300 dark:border-blue-600 flex items-center justify-center">
                            <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                              +{lesson.vocabulary.length - 12} more words
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="video" className="p-8">
                  {hasVideo ? (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold mb-2">Video Lesson</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Learn Spanish through engaging hip-hop music videos
                        </p>
                      </div>
                      <YouTubePlayer
                        videoId={getYouTubeId(lesson.videoUrl!)}
                        title={lesson.title}
                        className="w-full shadow-2xl"
                        thumbnail={lesson.imageUrl}
                      />
                      <div className="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <Play className="h-4 w-4" />
                        <span>Interactive video lesson with Spanish hip-hop music</span>
                        <ExternalLink className="h-4 w-4" />
                        <span>Watch on YouTube for full experience</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-16 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <Video className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-xl font-semibold mb-2">No Video Available</h3>
                      <p className="text-gray-600 dark:text-gray-400">This lesson doesn't include a video component.</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="audio" className="p-8">
                  {hasAudio ? (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold mb-2">Audio Lesson</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          High-quality audio for pronunciation practice
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 p-8 rounded-xl border border-purple-200 dark:border-purple-800">
                        <AudioPlayer src={lesson.audioSrc!} title={`${lesson.title} - Audio Lesson`} />
                      </div>
                      <div className="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <Music className="h-4 w-4" />
                        <span>Professional audio recording with clear pronunciation</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-16 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <Music className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-xl font-semibold mb-2">No Audio Available</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        This lesson doesn't include an audio component.
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="worksheet" className="p-8">
                  {hasWorksheetData ? (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold mb-2">Interactive Practice</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Complete exercises to reinforce your learning
                        </p>
                      </div>
                      <WorksheetContent
                        title={worksheetData[lesson.slug].title}
                        content={worksheetData[lesson.slug].content}
                        type={worksheetData[lesson.slug].type}
                        lessonSlug={lesson.slug}
                      />
                    </div>
                  ) : (
                    <div className="text-center p-16 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-xl font-semibold mb-2">Practice Worksheet Coming Soon</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Interactive worksheets for this lesson are being prepared.
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="vocabulary" className="p-8">
                  {hasVocabulary ? (
                    <div className="space-y-8">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold mb-2">Vocabulary Audio Practice</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                          Practice your pronunciation with audio for each vocabulary word. Click the speaker icon to
                          hear correct pronunciation.
                        </p>
                      </div>

                      <div className="grid gap-4">
                        {lesson.vocabulary?.map((word, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-6 p-6 bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-950/20 dark:to-transparent rounded-xl border border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-md"
                          >
                            <VocabularyAudio word={word.spanish} />
                            <div className="flex-1">
                              <div className="font-bold text-xl text-blue-600 dark:text-blue-400">{word.spanish}</div>
                              <div className="text-gray-600 dark:text-gray-400">{word.english}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-500 dark:text-gray-400">Word {index + 1}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl border border-blue-200 dark:border-blue-800">
                        <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                          <Star className="h-6 w-6 text-yellow-500" />
                          Pronunciation Tips
                        </h4>
                        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                          <li className="flex items-start gap-3">
                            <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                            Listen carefully to the audio and try to mimic the exact sounds
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                            Pay attention to the stress patterns in multi-syllable words
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                            Practice saying each word aloud multiple times
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                            Record yourself and compare with the original pronunciation
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-16 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <Volume2 className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-xl font-semibold mb-2">Vocabulary Audio Coming Soon</h3>
                      <p className="text-gray-600 dark:text-gray-400">
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
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 animate-scale-in">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {lesson.worksheetUrl && lesson.worksheetUrl !== "#" && (
                  <Button
                    className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    asChild
                  >
                    <a href={lesson.worksheetUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      Download Worksheet
                    </a>
                  </Button>
                )}
                {hasWorksheetData && (
                  <Button
                    className="w-full justify-start border-2 border-blue-200 hover:bg-blue-50 dark:border-blue-700 dark:hover:bg-blue-950/20 bg-transparent"
                    variant="outline"
                    asChild
                  >
                    <Link href={`/worksheets/${lesson.slug}`}>
                      <FileText className="mr-2 h-4 w-4" />
                      Interactive Practice
                    </Link>
                  </Button>
                )}
                {hasVocabulary && (
                  <Button
                    className="w-full justify-start border-2 border-green-200 hover:bg-green-50 dark:border-green-700 dark:hover:bg-green-950/20 bg-transparent"
                    variant="outline"
                    asChild
                  >
                    <Link href={`/flashcards/${lesson.slug}`}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Flashcard Practice
                    </Link>
                  </Button>
                )}
                {hasVocabulary && (
                  <Button
                    className="w-full justify-start border-2 border-purple-200 hover:bg-purple-50 dark:border-purple-700 dark:hover:bg-purple-950/20 bg-transparent"
                    variant="outline"
                    asChild
                  >
                    <Link href={`/pronunciation-practice/${lesson.slug}`}>
                      <Volume2 className="mr-2 h-4 w-4" />
                      Pronunciation Practice
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            {/* Lesson Info */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4">Lesson Information</h3>
              <div className="space-y-4">
                {lesson.category && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Category:</span>
                    <Badge variant="outline" className="font-medium">
                      {lesson.category}
                    </Badge>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                  <span className="font-medium">{lesson.duration || "15-20 minutes"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Difficulty:</span>
                  <Badge variant="secondary" className="capitalize">
                    {lesson.difficulty || "Beginner"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Format:</span>
                  <div className="flex gap-1">
                    {hasVideo && (
                      <Badge variant="outline" className="text-xs">
                        <Video className="h-3 w-3 mr-1" />
                        Video
                      </Badge>
                    )}
                    {hasAudio && (
                      <Badge variant="outline" className="text-xs">
                        <Music className="h-3 w-3 mr-1" />
                        Audio
                      </Badge>
                    )}
                    {hasWorksheetData && (
                      <Badge variant="outline" className="text-xs">
                        <FileText className="h-3 w-3 mr-1" />
                        Practice
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Tracking */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Lesson Progress</span>
                    <span>0%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `0%` }}
                    ></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">0</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Times Completed</div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">0</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Practice Sessions</div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Content Creation */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-2xl p-6 shadow-lg border border-purple-200 dark:border-purple-800">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Star className="h-5 w-5 text-purple-600" />
                Create Custom Content
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Use AI to generate personalized lessons and practice materials
              </p>
              <div className="space-y-2">
                <Link href="/create-lesson">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                    Create AI Lesson
                  </Button>
                </Link>
                <Link href="/song-generator">
                  <Button
                    variant="outline"
                    className="w-full border-purple-200 hover:bg-purple-50 dark:border-purple-700 dark:hover:bg-purple-950/20 bg-transparent"
                  >
                    Generate Song
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
