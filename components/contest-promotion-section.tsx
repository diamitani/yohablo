import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Trophy, Users, Clock } from "lucide-react"

export function ContestPromotionSection() {
  return (
    <section className="py-16 bg-white dark:bg-slate-950">
      <div className="container px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <div className="inline-block bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                Competition
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
                Yo Hablo Song Creation Contest
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Create your own Spanish hip hop song and get featured on our next mixtape! Two categories available:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg">Individual Entry</h3>
                  </div>
                  <p className="text-muted-foreground mb-3">15-second Spanish hip hop creation by a single student.</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">15 seconds</span>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg">Class Entry</h3>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    2-minute collaborative Spanish hip hop creation by a class.
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">2 minutes</span>
                  </div>
                </div>
              </div>

              <Link href="/contest">
                <Button size="lg" className="gap-2">
                  Enter the Contest
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl transform rotate-2"></div>
              <div className="relative bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-8 text-white text-center">
                <div className="flex justify-center mb-6">
                  <Trophy className="h-16 w-16 text-yellow-100" />
                </div>
                <h3 className="text-3xl font-bold mb-6">GET FEATURED ON THE NEXT YO HABLO MIXTAPE</h3>
                <p className="mb-8 text-lg">
                  Show off your Spanish skills and creativity by submitting your original song to our contest.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-black/20 p-4 rounded-xl">
                    <h4 className="font-semibold text-lg mb-1">Individual</h4>
                    <p className="text-yellow-100">15 seconds</p>
                  </div>
                  <div className="bg-black/20 p-4 rounded-xl">
                    <h4 className="font-semibold text-lg mb-1">Class</h4>
                    <p className="text-yellow-100">2 minutes</p>
                  </div>
                </div>
                <div className="inline-block bg-white/20 px-4 py-2 rounded-full">
                  <p className="text-sm font-medium">Submission deadline: June 30, 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
