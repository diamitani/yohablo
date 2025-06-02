"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, ThumbsUp, Award } from "lucide-react"

// Mock data for video entries
const mockEntries = [
  {
    id: "1",
    title: "Mi Familia en Español",
    description: "A song about family members in Spanish",
    videoUrl: "/videos/music-background.mp4",
    thumbnailUrl: "/colorful-music-thumbnail-spanish.png",
    author: "John Smith",
    school: "Lincoln High School",
    entryType: "individual",
    votes: 24,
    isWinner: false,
  },
  {
    id: "2",
    title: "Los Colores del Arco Iris",
    description: "Our class singing about colors in Spanish",
    videoUrl: "/videos/music-background.mp4",
    thumbnailUrl: "/colorful-music-thumbnail-spanish.png",
    author: "Ms. Johnson's Class",
    school: "Washington Elementary",
    entryType: "class",
    votes: 42,
    isWinner: true,
  },
  {
    id: "3",
    title: "Números en Español",
    description: "Learning numbers through music",
    videoUrl: "/videos/music-background.mp4",
    thumbnailUrl: "/colorful-music-thumbnail-spanish.png",
    author: "Maria Garcia",
    school: "Jefferson Middle School",
    entryType: "individual",
    votes: 18,
    isWinner: false,
  },
  {
    id: "4",
    title: "El Tiempo y Las Estaciones",
    description: "A song about weather and seasons in Spanish",
    videoUrl: "/videos/music-background.mp4",
    thumbnailUrl: "/colorful-music-thumbnail-spanish.png",
    author: "Mr. Rodriguez's Spanish Class",
    school: "Central High School",
    entryType: "class",
    votes: 36,
    isWinner: false,
  },
]

export function VideoGallery() {
  const [activeTab, setActiveTab] = useState("all")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  // Filter entries based on active tab
  const filteredEntries = mockEntries.filter((entry) => {
    if (activeTab === "all") return true
    if (activeTab === "individual") return entry.entryType === "individual"
    if (activeTab === "class") return entry.entryType === "class"
    if (activeTab === "winners") return entry.isWinner
    return true
  })

  const currentEntry = filteredEntries[currentIndex]

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredEntries.length - 1 : prev - 1))
    setIsPlaying(false)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === filteredEntries.length - 1 ? 0 : prev + 1))
    setIsPlaying(false)
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    const videoElement = document.getElementById("current-video") as HTMLVideoElement
    if (videoElement) {
      if (isPlaying) {
        videoElement.pause()
      } else {
        videoElement.play()
      }
    }
  }

  const handleVideoEnded = () => {
    setIsPlaying(false)
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Entries</TabsTrigger>
          <TabsTrigger value="individual">Individual</TabsTrigger>
          <TabsTrigger value="class">Class</TabsTrigger>
          <TabsTrigger value="winners">Winners</TabsTrigger>
        </TabsList>
      </Tabs>

      {filteredEntries.length > 0 ? (
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-video bg-black">
                <video
                  id="current-video"
                  src={currentEntry.videoUrl}
                  poster={currentEntry.thumbnailUrl}
                  className="w-full h-full object-contain"
                  controls
                  onEnded={handleVideoEnded}
                />
                {!isPlaying && (
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                    onClick={handlePlayPause}
                  >
                    <div className="rounded-full bg-white/80 p-4">
                      <Play className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold flex items-center">
                      {currentEntry.title}
                      {currentEntry.isWinner && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                          <Award className="mr-1 h-3 w-3" />
                          Winner
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      By {currentEntry.author} • {currentEntry.school}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{currentEntry.votes}</span>
                    <Button variant="outline" size="icon">
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="mt-4">{currentEntry.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Entry Type:{" "}
                    <span className="font-medium">
                      {currentEntry.entryType === "individual" ? "Individual" : "Class"}
                    </span>
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={handlePrevious}>
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleNext}>
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredEntries.map((entry, index) => (
              <div
                key={entry.id}
                className={`relative aspect-video rounded-md overflow-hidden cursor-pointer border-2 ${
                  index === currentIndex ? "border-primary" : "border-transparent"
                }`}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsPlaying(false)
                }}
              >
                <img
                  src={entry.thumbnailUrl || "/placeholder.svg"}
                  alt={entry.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Play className="h-8 w-8 text-white" />
                </div>
                {entry.isWinner && (
                  <div className="absolute top-2 right-2">
                    <Award className="h-5 w-5 text-yellow-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium">No entries found</h3>
          <p className="text-muted-foreground mt-2">
            There are no entries in this category yet. Be the first to submit!
          </p>
        </div>
      )}
    </div>
  )
}
