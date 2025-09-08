"use client"

import { Button } from "@/components/ui/button"
import { Play, Users, BookOpen, Trophy } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-[url('/abstract-colors.png')] bg-cover bg-center opacity-10" />

      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Learn Spanish Through{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  Hip Hop
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                Revolutionary Spanish education that makes learning memorable through music, rhythm, and culture.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-yellow-400">10K+</div>
                <div className="text-sm text-blue-200">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-yellow-400">50+</div>
                <div className="text-sm text-blue-200">Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-yellow-400">95%</div>
                <div className="text-sm text-blue-200">Success Rate</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                <Link href="/register/student">
                  <Play className="mr-2 h-5 w-5" />
                  Start Learning Free
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-black bg-transparent"
              >
                <Link href="/lessons">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Browse Lessons
                </Link>
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
              <div className="flex items-center space-x-3">
                <Users className="h-6 w-6 text-yellow-400" />
                <span className="text-sm">Interactive Learning</span>
              </div>
              <div className="flex items-center space-x-3">
                <BookOpen className="h-6 w-6 text-yellow-400" />
                <span className="text-sm">Proven Methods</span>
              </div>
              <div className="flex items-center space-x-3">
                <Trophy className="h-6 w-6 text-yellow-400" />
                <span className="text-sm">Track Progress</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/hero-spanish-learning.jpg"
                alt="Students learning Spanish through Hip Hop music"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
              🎵 Learn with Music!
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white text-black px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
              🏆 Award Winning
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
