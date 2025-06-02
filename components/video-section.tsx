"use client"

import { useMode } from "@/components/mode-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function VideoSection() {
  const { mode } = useMode()

  // Only show in Classic mode
  if (mode === "ai") return null

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Lessons</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Check out our most popular Spanish lessons taught through hip hop and music.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <Card>
            <CardContent className="p-6">
              <div className="aspect-video overflow-hidden rounded-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/0KbRb6Qt34s"
                  title="Cuerpo (Body Parts)"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="aspect-video"
                ></iframe>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold">Cuerpo (Body Parts)</h3>
                <p className="mt-2 text-muted-foreground">Learn Spanish vocabulary for body parts through music</p>
                <div className="mt-4">
                  <Link href="/lessons/cuerpo">
                    <Button>View Lesson</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8 text-center">
          <Link href="/lessons">
            <Button variant="outline" size="lg">
              View All Lessons
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
