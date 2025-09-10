"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Music, BookOpen, Users, Star, ArrowRight, Volume2 } from "lucide-react"
import Link from "next/link"
import { AudioPlayer } from "@/components/audio-player"

export function Hero() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      text: "My students love learning Spanish with hip-hop! Engagement has increased 300%.",
      author: "Maria Rodriguez",
      role: "Spanish Teacher",
      rating: 5,
    },
    {
      text: "Finally, a fun way to learn Spanish that actually works. My pronunciation improved dramatically!",
      author: "James Wilson",
      role: "Student",
      rating: 5,
    },
    {
      text: "The cultural vocabulary in these songs is incredible. It's not just language, it's education.",
      author: "Dr. Carmen Silva",
      role: "Education Director",
      rating: 5,
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                <Star className="h-3 w-3 mr-1" />
                #1 Spanish Learning Platform
              </Badge>
              <Badge
                variant="outline"
                className="border-green-200 text-green-700 dark:border-green-800 dark:text-green-300"
              >
                <Users className="h-3 w-3 mr-1" />
                50K+ Students
              </Badge>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Learn Spanish
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Through Hip-Hop
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                Revolutionary Spanish education that combines music, culture, and language learning. Perfect for
                teachers and students who want engaging, effective lessons.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">50+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Audio Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">1000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Vocabulary Words</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">98%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/lessons">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Learning Free
                </Button>
              </Link>
              <Link href="/register/teacher">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  For Teachers
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Testimonial Carousel */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex mb-2">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 italic mb-3">
                      "{testimonials[currentTestimonial].text}"
                    </p>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        {testimonials[currentTestimonial].author}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonials[currentTestimonial].role}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial Indicators */}
                <div className="flex justify-center mt-4 gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentTestimonial ? "bg-blue-600 w-6" : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Interactive Demo */}
          <div className="space-y-6">
            {/* Featured Lesson Preview */}
            <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0 shadow-2xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Music className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Featured Lesson</h3>
                    <p className="text-blue-100">Juli Slide - Spanish Alphabet</p>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4 mb-4">
                  <AudioPlayer
                    src="/audio/Juli-Slide-Alphabet.mp3"
                    title="Juli Slide - Spanish Alphabet"
                    className="text-white"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Volume2 className="h-4 w-4" />
                    <span>8 min lesson</span>
                  </div>
                  <Link href="/lessons/juli-slide-alphabet">
                    <Button variant="secondary" size="sm">
                      Try Now
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Quick Features */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Play className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="font-semibold mb-2">Interactive Audio</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Listen, repeat, and master pronunciation</p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h4 className="font-semibold mb-2">Cultural Context</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Learn language with social awareness</p>
                </CardContent>
              </Card>
            </div>

            {/* Trust Indicators */}
            <div className="text-center space-y-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Trusted by educators worldwide</p>
              <div className="flex justify-center items-center gap-6 opacity-60">
                <div className="text-xs font-semibold">HARVARD</div>
                <div className="text-xs font-semibold">MIT</div>
                <div className="text-xs font-semibold">STANFORD</div>
                <div className="text-xs font-semibold">UCLA</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-green-200 dark:bg-green-800 rounded-full opacity-20 animate-pulse delay-2000"></div>
    </section>
  )
}
