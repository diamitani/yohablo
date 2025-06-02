"use client"

import { useMode } from "@/components/mode-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, Handshake } from "lucide-react"

export function CooperativeModelSection() {
  const { mode } = useMode()

  // Only show in Classic mode
  if (mode === "ai") return null

  return (
    <section className="py-32 bg-primary/5 dark:bg-primary/10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Cooperative Model</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We believe a cooperative model is the fairest way to organize work
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white dark:bg-slate-900 shadow-lg">
            <CardContent className="pt-8 pb-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Community-Driven</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our community of learners, teachers, and creatives collaborate to create effective learning materials.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-900 shadow-lg">
            <CardContent className="pt-8 pb-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Quality Education</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We prioritize high-quality, culturally relevant educational content that resonates with learners.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-900 shadow-lg">
            <CardContent className="pt-8 pb-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Handshake className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Shared Ownership</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our cooperative structure ensures that everyone has a voice in how we operate and grow.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
