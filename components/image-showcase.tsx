"use client"

import { useMode } from "@/components/mode-provider"
import { Card, CardContent } from "@/components/ui/card"

export function ImageShowcase() {
  const { mode } = useMode()

  // Only show in Classic mode
  if (mode === "ai") return null

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Teaching Spanish Through Hip Hop
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our innovative approach makes language learning engaging, culturally relevant, and effective
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <img
                src="/spanish-classroom-learning.png"
                alt="Students learning Spanish through hip hop in classroom"
                className="w-full h-auto aspect-[4/3] object-cover"
              />
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <img
                src="/spanish-music-performance.png"
                alt="Students performing Spanish hip hop songs"
                className="w-full h-auto aspect-[4/3] object-cover"
              />
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <img
                src="/spanish-collaborative-learning.png"
                alt="Collaborative Spanish learning with Yo Hablo"
                className="w-full h-auto aspect-[4/3] object-cover"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
