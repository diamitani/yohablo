"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, ThumbsUp, Trophy, Loader2 } from "lucide-react"
import { getContestEntries, voteForEntry } from "@/app/api/contest/actions"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ContestEntry {
  id: string
  name: string
  email: string
  schoolName: string
  entryType: "individual" | "class"
  songTitle: string
  description: string
  spanishWords: string
  audioFileUrl: string
  fileName?: string
  fileSize?: number
  fileType?: string
  votes: number
  dateSubmitted: string
  status: "pending" | "approved" | "rejected" | "winner"
}

export function ContestEntries() {
  const [entries, setEntries] = useState<ContestEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [votingId, setVotingId] = useState<string | null>(null)

  // Fetch entries on mount and when tab changes
  useEffect(() => {
    fetchEntries(activeTab as "all" | "individual" | "class" | "winners")
  }, [activeTab])

  // Fetch entries from the server
  const fetchEntries = async (filter: "all" | "individual" | "class" | "winners") => {
    setLoading(true)
    setError(null)

    try {
      const result = await getContestEntries(filter)

      if (result.success) {
        setEntries(result.entries)
      } else {
        setError(result.error || "Failed to load entries")
        toast({
          title: "Error",
          description: result.error || "Failed to load entries",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching entries:", error)
      setError("An unexpected error occurred. Please try again.")
      toast({
        title: "Error",
        description: "Failed to load entries. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Handle audio playback
  const togglePlayback = (entryId: string, audioUrl: string) => {
    const audioElements = document.querySelectorAll("audio")

    // Pause all audio elements
    audioElements.forEach((audio) => {
      audio.pause()
    })

    if (playingId === entryId) {
      // If clicking the currently playing entry, stop it
      setPlayingId(null)
    } else {
      // Otherwise, play the new entry
      const audioElement = document.getElementById(`audio-${entryId}`) as HTMLAudioElement
      if (audioElement) {
        audioElement.play().catch((error) => {
          console.error("Audio playback error:", error)
          toast({
            title: "Playback error",
            description: "There was a problem playing the audio file.",
            variant: "destructive",
          })
        })
        setPlayingId(entryId)
      }
    }
  }

  // Handle audio ended event
  const handleAudioEnded = () => {
    setPlayingId(null)
  }

  // Handle voting
  const handleVote = async (entryId: string) => {
    setVotingId(entryId)

    try {
      const result = await voteForEntry(entryId)

      if (result.success) {
        // Update the entry in the local state
        setEntries(entries.map((entry) => (entry.id === entryId ? { ...entry, votes: result.votes } : entry)))

        toast({
          title: "Vote recorded",
          description: "Your vote has been recorded. Thank you!",
        })
      } else {
        toast({
          title: "Voting failed",
          description: result.error || "Failed to record your vote. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error voting:", error)
      toast({
        title: "Voting error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setVotingId(null)
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <section className="py-8" id="entries">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Contest Entries</h2>
        <p className="mt-2 text-lg text-muted-foreground">Listen to and vote for your favorite entries</p>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-center mb-6">
          <TabsList>
            <TabsTrigger value="all">All Entries</TabsTrigger>
            <TabsTrigger value="individual">Individual</TabsTrigger>
            <TabsTrigger value="class">Class</TabsTrigger>
            <TabsTrigger value="winners">Winners</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          {renderEntries()}
        </TabsContent>

        <TabsContent value="individual" className="mt-0">
          {renderEntries()}
        </TabsContent>

        <TabsContent value="class" className="mt-0">
          {renderEntries()}
        </TabsContent>

        <TabsContent value="winners" className="mt-0">
          {renderEntries()}
        </TabsContent>
      </Tabs>
    </section>
  )

  // Helper function to render entries
  function renderEntries() {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-lg">Loading entries...</span>
        </div>
      )
    }

    if (error) {
      return (
        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )
    }

    if (entries.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No entries found. Be the first to submit your song!</p>
          <Button
            className="mt-4"
            onClick={() => document.getElementById("submit")?.scrollIntoView({ behavior: "smooth" })}
          >
            Submit Your Entry
          </Button>
        </div>
      )
    }

    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <Card key={entry.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{entry.songTitle}</CardTitle>
                <Badge variant={entry.entryType === "individual" ? "default" : "secondary"}>
                  {entry.entryType === "individual" ? "Individual" : "Class"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                By {entry.name} from {entry.schoolName}
              </p>
            </CardHeader>

            <CardContent className="pb-3">
              <p className="text-sm line-clamp-3 mb-3">{entry.description}</p>

              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => togglePlayback(entry.id, entry.audioFileUrl)}
                >
                  {playingId === entry.id ? (
                    <>
                      <Pause className="h-4 w-4" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" /> Play
                    </>
                  )}
                </Button>

                <audio
                  id={`audio-${entry.id}`}
                  src={entry.audioFileUrl}
                  onEnded={handleAudioEnded}
                  className="hidden"
                />

                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">{entry.votes}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleVote(entry.id)}
                    disabled={votingId === entry.id}
                  >
                    {votingId === entry.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <ThumbsUp className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between pt-1">
              <span className="text-xs text-muted-foreground">Submitted on {formatDate(entry.dateSubmitted)}</span>

              {entry.status === "winner" && (
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  <Trophy className="h-3 w-3 mr-1 text-yellow-500" /> Winner
                </Badge>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }
}
