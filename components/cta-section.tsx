"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Users } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to Transform Your Spanish Learning?</h2>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
            Join thousands of students and teachers who are already learning Spanish through music. Start your journey
            today with our interactive lessons and engaging content.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/register/student">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <Users className="mr-2 h-5 w-5" />
                Join as Student
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/register/teacher">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Join as Teacher
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="pt-8 text-center">
            <p className="text-blue-100 text-sm">Free to get started • No credit card required • Cancel anytime</p>
          </div>
        </div>
      </div>
    </section>
  )
}
