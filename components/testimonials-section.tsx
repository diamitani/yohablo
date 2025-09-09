"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Maria Rodriguez",
    role: "Spanish Teacher",
    school: "Lincoln Middle School",
    location: "Chicago, IL",
    image: "/education-doctorate-teacher-portrait.png",
    rating: 5,
    quote:
      "My students are absolutely obsessed with these songs! I've seen a 40% improvement in vocabulary retention since we started using Yo Hablo. The hip-hop format makes learning Spanish feel like fun rather than work.",
    highlight: "40% improvement in vocabulary retention",
    subject: "Spanish Language Arts",
  },
  {
    id: 2,
    name: "Dr. James Thompson",
    role: "Curriculum Director",
    school: "Roosevelt High School",
    location: "Brooklyn, NY",
    image: "/hip-hop-educator.png",
    rating: 5,
    quote:
      "The cultural relevance and musical approach of Yo Hablo has transformed our Spanish program. Students who previously struggled are now leading class discussions. Test scores have increased by 35% across all grade levels.",
    highlight: "35% increase in test scores",
    subject: "World Languages Department",
  },
  {
    id: 3,
    name: "Carmen Delgado",
    role: "ESL Coordinator",
    school: "Washington Elementary",
    location: "Los Angeles, CA",
    image: "/educator-strategist-brooklyn.png",
    rating: 5,
    quote:
      "What sets Yo Hablo apart is how it connects with students' lived experiences. The songs incorporate social justice themes that resonate deeply. My students ask to practice Spanish at home now - that never happened before!",
    highlight: "Students practicing at home voluntarily",
    subject: "English as Second Language",
  },
  {
    id: 4,
    name: "Michael Chen",
    role: "Language Arts Teacher",
    school: "Jefferson Academy",
    location: "Houston, TX",
    image: "/portrait-tv-writer-teacher.png",
    rating: 5,
    quote:
      "The worksheets and lesson plans are incredibly well-designed. Everything aligns perfectly with state standards while keeping students engaged. I've never seen kids so excited about conjugating verbs!",
    highlight: "Perfect alignment with state standards",
    subject: "Dual Language Program",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            ⭐ Educator Testimonials
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted by Educators Nationwide</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real results from real teachers using Yo Hablo in their classrooms
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="relative overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={`${testimonial.name} - ${testimonial.role}`}
                      width={64}
                      height={64}
                      className="rounded-full object-cover"
                    />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Quote className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-gray-500">{testimonial.school}</p>
                    <p className="text-xs text-gray-400">{testimonial.location}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                <blockquote className="text-gray-700 mb-4 leading-relaxed">"{testimonial.quote}"</blockquote>

                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    ✓ {testimonial.highlight}
                  </Badge>
                  <span className="text-xs text-gray-500">{testimonial.subject}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Join These Successful Educators</h3>
            <p className="text-gray-600 mb-6">
              Start transforming your Spanish classroom with our proven hip-hop methodology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Request Demo
              </button>
              <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors">
                View Lesson Plans
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
