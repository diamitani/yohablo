import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Elementary & Middle School Teacher",
      role: "Spanish Educator",
      content:
        "I am an Elementary and Middle School Spanish teacher. Last school year, my middle schoolers were obsessed with this song, memorized it, and performed it. Thank you for making my Spanish class so memorable.",
      avatar: "ET",
    },
    {
      name: "Fellow Educator",
      role: "Spanish Teacher",
      content:
        "I love this!!!! I am going to share with my students. Thank you for doing this - great idea and execution A+++",
      avatar: "FE",
    },
    {
      name: "Homeschool Parent",
      role: "Home Educator",
      content:
        "I'm helping homeschool a friend's kiddo and because I've had Spanish in school I am her Spanish \"teacher\". This song was so fun for her to learn the parts of the body, thank you! I subscribed immediately, I love it!",
      avatar: "HP",
    },
  ]

  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground">
              Hear from educators and parents who have experienced the power of our Spanish learning approach.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full bg-slate-50 dark:bg-slate-900 border-0 shadow-md overflow-hidden">
              <CardContent className="p-8">
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <p className="text-lg italic mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary">{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
