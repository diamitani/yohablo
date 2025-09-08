"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Maria Rodriguez",
    role: "High School Spanish Teacher",
    school: "Lincoln High School",
    image: "/diverse-portrait.png",
    rating: 5,
    quote:
      "My students are absolutely obsessed with these songs! They memorize the vocabulary so much faster than traditional methods. I've seen a 40% improvement in test scores since implementing this curriculum.",
    highlight: "40% improvement in test scores",
  },
  {
    id: 2,
    name: "Jennifer Thompson",
    role: "Homeschool Parent",
    location: "Austin, Texas",
    image: "/diverse-group-avatars.png",
    rating: 5,
    quote:
      "My kids learned all the body parts in Spanish in just one week using the hip-hop songs. They're singing 'cabeza, hombros, rodillas' around the house constantly. It's amazing how music makes learning stick!",
    highlight: "Learned body parts in 1 week",
  },
  {
    id: 3,
    name: "Carlos Mendez",
    role: "Elementary Spanish Coordinator",
    school: "Roosevelt Elementary District",
    image: "/education-doctorate-teacher-portrait.png",
    rating: 5,
    quote:
      "The engagement level is through the roof! Students who were struggling with traditional methods are now leading the class in vocabulary retention. The hip-hop approach connects with kids in a way I've never seen before.",
    highlight: "Struggling students now leading class",
  },
  {
    id: 4,
    name: "Dr. Sarah Williams",
    role: "Language Learning Researcher",
    institution: "University of California",
    image: "/portrait-tv-writer-teacher.png",
    rating: 5,
    quote:
      "The research is clear - music-based language learning increases retention by 60%. This platform takes that concept and executes it brilliantly with culturally relevant hip-hop that students actually want to listen to.",
    highlight: "60% increase in retention",
  },
  {
    id: 5,
    name: "Miguel Santos",
    role: "Middle School Teacher",
    school: "Washington Middle School",
    image: "/hip-hop-educator.png",
    rating: 5,
    quote:
      "I was skeptical at first, but after seeing my students rap the numbers song perfectly after just two classes, I'm a complete convert. They're not just memorizing - they're understanding and using the language naturally.",
    highlight: "Perfect recall after 2 classes",
  },
  {
    id: 6,
    name: "Lisa Chen",
    role: "ESL Coordinator",
    school: "Metro School District",
    image: "/educator-strategist-brooklyn.png",
    rating: 5,
    quote:
      "This isn't just language learning - it's cultural bridge-building. The hip-hop format resonates with our diverse student body and creates an inclusive environment where everyone feels represented and engaged.",
    highlight: "Inclusive for diverse students",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium mb-4">
            <Star className="h-4 w-4" />
            <span>Trusted by Educators</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Teachers & Parents Are Saying</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real feedback from educators who have transformed their Spanish classrooms with our hip-hop learning method.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote className="h-8 w-8" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                {/* Highlight */}
                <div className="bg-primary/10 rounded-lg p-3 mb-6">
                  <div className="text-sm font-semibold text-primary">Key Result: {testimonial.highlight}</div>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.school || testimonial.institution || testimonial.location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Join 10,000+ Educators Transforming Spanish Education</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Start your free trial today and see why teachers and students love learning Spanish through hip-hop music.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Start Free Trial
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
