"use client"

import { Button } from "@/components/ui/button"
import { Play, Users, BookOpen, Award, Star, Music } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-red-400 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-green-400 rounded-full opacity-20 animate-bounce delay-1000"></div>
      <div className="absolute bottom-20 right-40 w-24 h-24 bg-purple-400 rounded-full opacity-20 animate-pulse delay-500"></div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium">
              <Music className="h-4 w-4" />
              <span>Revolutionary Spanish Learning</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Learn Spanish Through
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Hip-Hop Music
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Transform your Spanish learning experience with our innovative hip-hop based curriculum. Engage students
                with catchy beats while mastering vocabulary, grammar, and pronunciation.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Teachers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link href="/register/student">
                  <Play className="mr-2 h-5 w-5" />
                  Start Learning Free
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent" asChild>
                <Link href="/lessons">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Browse Lessons
                </Link>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 justify-center lg:justify-start pt-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-400 border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-red-400 border-2 border-white"></div>
              </div>
              <div className="text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-2 font-medium">4.9/5 from 2,000+ reviews</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="/hero-spanish-learning.jpg"
                alt="Students learning Spanish through hip-hop music"
                width={600}
                height={600}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-6 -left-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold">40% Faster</div>
                  <div className="text-sm text-muted-foreground">Learning Speed</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg animate-float delay-1000">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold">10,000+</div>
                  <div className="text-sm text-muted-foreground">Happy Students</div>
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 -right-12 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg animate-float delay-500">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <Music className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold">50+ Songs</div>
                  <div className="text-sm text-muted-foreground">Hip-Hop Lessons</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .bg-grid-pattern {
          background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </section>
  )
}
