"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Music, Video, FileText, Sparkles } from "lucide-react"
import Link from "next/link"
import { getFeaturedLessons } from "@/lib/data"
import { YouTubePlayer } from "@/components/youtube-player"

export function Hero() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const featuredLessons = getFeaturedLessons()
  const videoLessons = featuredLessons.filter((lesson) => lesson.videoUrl)

  // Auto-rotate featured video every 10 seconds
  useEffect(() => {
    if (videoLessons.length > 1) {
      const interval = setInterval(() => {
        setCurrentVideoIndex((prev) => (prev + 1) % videoLessons.length)
      }, 10000)
      return () => clearInterval(interval)
    }
  }, [videoLessons.length])

  const currentLesson = videoLessons[currentVideoIndex]

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                <Sparkles className="h-3 w-3 mr-1" />
                AI-Powered Learning
              </Badge>
              <Badge
                variant="outline"
                className="border-purple-200 text-purple-700 dark:border-purple-700 dark:text-purple-300"
              >
                <Music className="h-3 w-3 mr-1" />
                Hip-Hop Education
              </Badge>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Learn Spanish Through
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                  Hip-Hop Music
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                Master Spanish vocabulary, grammar, and pronunciation with our revolutionary hip-hop teaching method.
                From alphabet to advanced conversations, make learning memorable with rhythm and rhyme.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">18+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">4</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Video Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Vocabulary Words</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/lessons">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Start Learning Now
                </Button>
              </Link>
              <Link href="/videos">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent"
                >
                  <Video className="mr-2 h-5 w-5" />
                  Watch Videos
                </Button>
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
              <div className="flex items-center gap-3 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <Video className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Video Lessons</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Interactive content</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <Music className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Audio Practice</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Perfect pronunciation</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Worksheets</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Practice exercises</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Featured Video */}
          <div className="space-y-6 animate-slide-up">
            {currentLesson && (
              <div className="relative">
                <YouTubePlayer
                  videoId={currentLesson.videoUrl!.split("/").pop()!.split("?")[0]}
                  title={currentLesson.title}
                  className="w-full shadow-2xl"
                  thumbnail={currentLesson.imageUrl}
                />

                {/* Video Info Overlay */}
                <div className="absolute -bottom-6 left-6 right-6 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{currentLesson.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{currentLesson.description}</p>
                    </div>
                    <Badge variant="secondary">{currentLesson.category}</Badge>
                  </div>
                </div>
              </div>
            )}

            {/* Video Navigation Dots */}
            {videoLessons.length > 1 && (
              <div className="flex justify-center gap-2 pt-8">
                {videoLessons.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentVideoIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentVideoIndex ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Quick Access Cards */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <Link href="/audio" className="group">
                <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200 dark:border-orange-800 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Music className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <div className="font-semibold">Audio Lessons</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">14 songs available</div>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/worksheets" className="group">
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="font-semibold">Worksheets</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Interactive practice</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-white dark:fill-gray-900">
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
          ></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </section>
  )
}
