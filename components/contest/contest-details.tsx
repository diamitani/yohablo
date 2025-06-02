import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Clock, Music, Trophy, Users, Video, User } from "lucide-react"

export function ContestDetails() {
  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 p-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Yo Hablo Song Creation Contest</h1>
            <p className="text-lg opacity-90">
              Showcase your Spanish language skills through music and get featured on our next official mixtape!
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur-sm">
                <CalendarDays className="mr-1 h-4 w-4" />
                Deadline: June 30, 2025
              </span>
              <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur-sm">
                <Trophy className="mr-1 h-4 w-4" />
                Win prizes & recognition
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/yohablo%20song%20creation.jpg-dKQIS14CvazqzakFQZJqAW8jScuhgl.jpeg"
              alt="Yo Hablo Song Creation Contest"
              width={300}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Contest Description */}
      <div className="prose prose-lg max-w-none">
        <h2>About the Contest</h2>
        <p>
          The Yo Hablo Song Creation Contest invites students to create original Spanish hip hop songs that showcase
          their language skills and creativity. This contest is designed to make learning Spanish fun and engaging
          through music, while providing an opportunity for students to be featured on our official mixtape.
        </p>
        <p>
          Whether you're an individual student or participating as a class, we want to hear your creative Spanish hip
          hop songs that incorporate vocabulary and concepts from our lessons. This is your chance to shine and
          demonstrate your Spanish language proficiency in a creative and memorable way!
        </p>
      </div>

      {/* Entry Categories */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Entry Categories</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Individual Student Entry</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-primary" />
                      15-second maximum length
                    </li>
                    <li className="flex items-center">
                      <Music className="mr-2 h-4 w-4 text-primary" />
                      Must include at least 5 Spanish words or phrases
                    </li>
                    <li className="flex items-center">
                      <Video className="mr-2 h-4 w-4 text-primary" />
                      Video submission encouraged but not required
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Class Entry</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-primary" />
                      2-minute maximum length
                    </li>
                    <li className="flex items-center">
                      <Music className="mr-2 h-4 w-4 text-primary" />
                      Must include at least 20 Spanish words or phrases
                    </li>
                    <li className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-primary" />
                      All students must participate in some way
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contest Rules */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Contest Rules</h2>
        <Tabs defaultValue="individual" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="individual">Individual Rules</TabsTrigger>
            <TabsTrigger value="class">Class Rules</TabsTrigger>
          </TabsList>

          <TabsContent value="individual">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Duration</h3>
                    <p className="text-sm text-muted-foreground">15-second maximum length</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Music className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Content Requirements</h3>
                    <p className="text-sm text-muted-foreground">
                      Must include at least 5 Spanish words or phrases from Yo Hablo lessons
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Content must be appropriate for all ages and school settings
                    </p>
                    <p className="text-sm text-muted-foreground">Audio must be clear and audible</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Video className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Video Submission</h3>
                    <p className="text-sm text-muted-foreground">Video submissions are encouraged but not required</p>
                    <p className="text-sm text-muted-foreground">
                      Videos should be in landscape orientation when possible
                    </p>
                    <p className="text-sm text-muted-foreground">Maximum file size: 500MB</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Trophy className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Prizes</h3>
                    <p className="text-sm text-muted-foreground">
                      Winner will be featured on the next Yo Hablo mixtape
                    </p>
                    <p className="text-sm text-muted-foreground">Winner will receive a Yo Hablo merchandise package</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="class">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Duration</h3>
                    <p className="text-sm text-muted-foreground">2-minute maximum length</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Music className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Content Requirements</h3>
                    <p className="text-sm text-muted-foreground">
                      Must include at least 20 Spanish words or phrases from Yo Hablo lessons
                    </p>
                    <p className="text-sm text-muted-foreground">
                      All students in the class must participate in some way
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Content must be appropriate for all ages and school settings
                    </p>
                    <p className="text-sm text-muted-foreground">Audio must be clear and audible</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Video className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Video Submission</h3>
                    <p className="text-sm text-muted-foreground">
                      Video submissions are strongly encouraged for class entries
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Videos should be in landscape orientation when possible
                    </p>
                    <p className="text-sm text-muted-foreground">Maximum file size: 1GB</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Trophy className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Prizes</h3>
                    <p className="text-sm text-muted-foreground">
                      Winning class will be featured on the next Yo Hablo mixtape
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Winning class will receive a virtual celebration with Yo Hablo creators
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Winning class will receive Yo Hablo merchandise for all students
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* FAQ Section */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <details className="group rounded-lg border p-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium">
              What file formats are accepted for submissions?
              <span className="transition group-open:rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </summary>
            <p className="mt-4 text-sm text-muted-foreground">
              We accept MP3, MP4, MOV, and WAV files. For video submissions, we recommend MP4 format for best
              compatibility.
            </p>
          </details>

          <details className="group rounded-lg border p-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium">
              Can I submit more than one entry?
              <span className="transition group-open:rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </summary>
            <p className="mt-4 text-sm text-muted-foreground">
              Individual students may submit one entry. Teachers may submit multiple class entries if they teach
              multiple classes.
            </p>
          </details>

          <details className="group rounded-lg border p-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium">
              How are winners selected?
              <span className="transition group-open:rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </summary>
            <p className="mt-4 text-sm text-muted-foreground">
              Entries will be judged by a panel of Yo Hablo educators and music professionals. Judging criteria include
              creativity, Spanish language usage, musical quality, and adherence to contest rules.
            </p>
          </details>

          <details className="group rounded-lg border p-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium">
              When will winners be announced?
              <span className="transition group-open:rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </summary>
            <p className="mt-4 text-sm text-muted-foreground">
              Winners will be announced on July 15, 2025, on the Yo Hablo website and social media channels. Winners
              will also be notified by email.
            </p>
          </details>
        </div>
      </div>

      {/* Call to Action */}
      <div className="flex justify-center">
        <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
          <a href="#submit">Submit Your Entry Now</a>
        </Button>
      </div>
    </div>
  )
}
