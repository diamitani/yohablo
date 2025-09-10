"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Sarah Martinez",
    role: "High School Spanish Teacher",
    school: "Lincoln High School",
    image: "/diverse-portrait.png",
    rating: 5,
    quote:
      "My students are absolutely obsessed with these hip-hop Spanish lessons! They're memorizing vocabulary faster than ever before. The '0 to 100' song has them counting in Spanish without even realizing they're learning.",
    results: "40% improvement in vocabulary retention",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Middle School Educator",
    school: "Roosevelt Middle School",
    image: "/education-doctorate-teacher-portrait.png",
    rating: 5,
    quote:
      "The 'Colors' lesson is a game-changer! Students who struggled with basic Spanish vocabulary are now confidently using 'rojo, azul, verde' in conversations. The music makes it stick in their minds.",
    results: "60% better test scores on color vocabulary",
  },
  {
    id: 3,
    name: "Jennifer Thompson",
    role: "Homeschool Parent",
    school: "Homeschool Network",
    image: "/diverse-students-studying.png",
    rating: 5,
    quote:
      "My 8-year-old daughter learned all the body parts in Spanish in just one week using the hip-hop worksheets. She walks around the house singing 'cabeza, hombros, rodillas' - it's amazing!",
    results: "Complete vocabulary mastery in 1 week",
  },
  {
    id: 4,
    name: "Carlos Mendez",
    role: "ESL Coordinator",
    school: "Washington Elementary",
    image: "/hip-hop-educator.png",
    rating: 5,
    quote:
      "The 'Neighborhood Places' lesson transformed how my students learn location vocabulary. They're using 'la escuela, el parque, la tienda' naturally in their speech. The hip-hop format breaks down barriers.",
    results: "85% student engagement increase",
  },
  {
    id: 5,
    name: "Dr. Maria Gonzalez",
    role: "Language Department Head",
    school: "Central University",
    image: "/educator-strategist-brooklyn.png",
    rating: 5,
    quote:
      "These materials revolutionize Spanish education. The combination of music, visual worksheets, and interactive content addresses multiple learning styles. Our retention rates have never been higher.",
    results: "92% course completion rate",
  },
  {
    id: 6,
    name: "David Kim",
    role: "Elementary Teacher",
    school: "Oakwood Elementary",
    image: "/portrait-tv-writer-teacher.png",
    rating: 5,
    quote:
      "The prepositions lesson with 'We in There Tho' is brilliant! Students who couldn't grasp 'encima, debajo, al lado' are now using them correctly. The rhythm makes grammar memorable.",
    results: "70% improvement in grammar usage",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Educators Are Saying</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real results from teachers and students using our hip-hop Spanish learning method
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.school}</p>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <div className="relative mb-4">
                  <Quote className="h-6 w-6 text-muted-foreground/30 absolute -top-2 -left-1" />
                  <p className="text-sm leading-relaxed pl-5 italic">{testimonial.quote}</p>
                </div>

                <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                  <p className="text-xs font-semibold text-green-800 dark:text-green-200">
                    📈 Result: {testimonial.results}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>10,000+ Students Taught</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>500+ Schools Using</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>95% Success Rate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
