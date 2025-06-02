"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AudioPlayer } from "@/components/audio-player"
import { Play, Pause, Download, Search, Volume2, Mic } from "lucide-react"

// Mock audio data
const audioLibrary = [
  {
    id: "1",
    title: "Spanish Alphabet Song",
    category: "Alphabet",
    duration: "2:34",
    url: "/audio/Juli-Slide-Alphabet.mp3",
    description: "Learn the Spanish alphabet with this catchy song",
    level: "Beginner",
  },
  {
    id: "2",
    title: "Numbers 1-20",
    category: "Numbers",
    duration: "3:12",
    url: "/audio/sample-word.mp3",
    description: "Practice counting from 1 to 20 in Spanish",
    level: "Beginner",
  },
  {
    id: "3",
    title: "Family Members",
    category: "Family",
    duration: "2:45",
    url: "/audio/Puff-Lah.mp3",
    description: "Learn vocabulary for family relationships",
    level: "Beginner",
  },
  {
    id: "4",
    title: "Colors and Emotions",
    category: "Vocabulary",
    duration: "3:28",
    url: "/audio/I-Look-Good-Me-Parece-Guapo.mp3",
    description: "Express colors and feelings in Spanish",
    level: "Intermediate",
  },
  {
    id: "5",
    title: "Travel Vocabulary",
    category: "Travel",
    duration: "4:15",
    url: "/audio/Spa-Nish-Travel.mp3",
    description: "Essential phrases for traveling in Spanish-speaking countries",
    level: "Intermediate",
  },
  {
    id: "6",
    title: "Health and Body Parts",
    category: "Health",
    duration: "3:42",
    url: "/audio/The-Docs-Health.mp3",
    description: "Medical vocabulary and body parts",
    level: "Intermediate",
  },
]

const categories = ["All", "Alphabet", "Numbers", "Family", "Vocabulary", "Travel", "Health", "Grammar", "Culture"]
const levels = ["All", "Beginner", "Intermediate", "Advanced"]

export default function AudioLibraryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All")
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)

  const filteredAudio = audioLibrary.filter((audio) => {
    const matchesSearch =
      audio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      audio.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || audio.category === selectedCategory
    const matchesLevel = selectedLevel === "All" || audio.level === selectedLevel

    return matchesSearch && matchesCategory && matchesLevel
  })

  const handlePlay = (audioId: string) => {
    setCurrentlyPlaying(currentlyPlaying === audioId ? null : audioId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audio Library</h1>
          <p className="text-muted-foreground">Browse and manage your Spanish audio content</p>
        </div>
        <Button>
          <Mic className="mr-2 h-4 w-4" />
          Record New Audio
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search audio files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAudio.map((audio) => (
          <Card key={audio.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{audio.title}</CardTitle>
                  <CardDescription className="mt-1">{audio.description}</CardDescription>
                </div>
                <Volume2 className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">{audio.category}</Badge>
                <Badge variant="outline">{audio.level}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Duration: {audio.duration}</span>
              </div>

              {/* Audio Player */}
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <AudioPlayer
                  src={audio.url}
                  title={audio.title}
                  isPlaying={currentlyPlaying === audio.id}
                  onPlayPause={() => handlePlay(audio.id)}
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handlePlay(audio.id)} className="flex-1">
                  {currentlyPlaying === audio.id ? (
                    <>
                      <Pause className="mr-2 h-4 w-4" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Play
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAudio.length === 0 && (
        <Card>
          <CardContent className="flex items-center justify-center h-32">
            <p className="text-muted-foreground">No audio files found matching your criteria.</p>
          </CardContent>
        </Card>
      )}

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Audio Library Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{audioLibrary.length}</div>
              <div className="text-sm text-muted-foreground">Total Audio Files</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{categories.length - 1}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{audioLibrary.filter((a) => a.level === "Beginner").length}</div>
              <div className="text-sm text-muted-foreground">Beginner Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{audioLibrary.filter((a) => a.level === "Intermediate").length}</div>
              <div className="text-sm text-muted-foreground">Intermediate Level</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
