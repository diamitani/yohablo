"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { getContestEntries, voteForEntry } from "@/app/api/contest/actions"
import { ThumbsUp, Calendar, User, Users, Play, Award } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface ContestEntry {
  id: string
  name: string
  schoolName: string
  entryType: "individual" | "class"
  songTitle: string
  description: string
  spanishWords: string
  mediaFileUrl: string
  isVideo: boolean
  votes: number
  dateSubmitted: string
  status: "pending" | "approved" | "rejected" | "winner"
}

export function ContestSubmissions() {
  const [entries, setEntries] = useState<ContestEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<"all" | "individual" | "class" | "winners">("all")
  const [votingInProgress, setVotingInProgress] = useState<Record<string, boolean>>({})

  useEffect(() => {
    fetchEntries()
  }, [filter])

  const fetchEntries = async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await getContestEntries(filter)

      if (result.success) {
        setEntries(result.entries)
      } else {
        setError(result.error || "Failed to load contest entries")
        toast({
          title: "Error",
          description: result.error || "Failed to load contest entries",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching contest entries:", error)
      setError("An unexpected error occurred. Please try again.")
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleVote = async (entryId: string) => {
    setVotingInProgress((prev) => ({ ...prev, [entryId]: true }))

    try {
      const result = await voteForEntry(entryId)

      if (result.success) {
        // Update the entry in the local state
        setEntries((prevEntries) =>
          prevEntries.map((entry) => (entry.id === entryId ? { ...entry, votes: result.votes } : entry)),
        )

        toast({
          title: "Vote recorded",
          description: "Your vote has been recorded. Thank you!",
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to record vote",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error voting for entry:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setVotingInProgress((prev) => ({ ...prev, [entryId]: false }))
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="py-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Contest Submissions</h2>
        <p className="mt-2 text-lg text-muted-foreground">View and vote for your favorite contest entries</p>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setFilter(value as any)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Entries</TabsTrigger>
          <TabsTrigger value="individual">Individual</TabsTrigger>
          <TabsTrigger value="class">Class</TabsTrigger>
          <TabsTrigger value="winners">Winners</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <EntriesGrid
            entries={entries}
            loading={loading}
            error={error}
            handleVote={handleVote}
            votingInProgress={votingInProgress}
            formatDate={formatDate}
          />
        </TabsContent>

        <TabsContent value="individual" className="mt-6">
          <EntriesGrid
            entries={entries}
            loading={loading}
            error={error}
            handleVote={handleVote}
            votingInProgress={votingInProgress}
            formatDate={formatDate}
          />
        </TabsContent>

        <TabsContent value="class" className="mt-6">
          <EntriesGrid
            entries={entries}
            loading={loading}
            error={error}
            handleVote={handleVote}
            votingInProgress={votingInProgress}
            formatDate={formatDate}
          />
        </TabsContent>

        <TabsContent value="winners" className="mt-6">
          <EntriesGrid
            entries={entries}
            loading={loading}
            error={error}
            handleVote={handleVote}
            votingInProgress={votingInProgress}
            formatDate={formatDate}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface EntriesGridProps {
  entries: ContestEntry[]
  loading: boolean
  error: string | null
  handleVote: (entryId: string) => void
  votingInProgress: Record<string, boolean>
  formatDate: (dateString: string) => string
}

function EntriesGrid({ entries, loading, error, handleVote, votingInProgress, formatDate }: EntriesGridProps) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="p-4">
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <Skeleton className="h-[150px] w-full rounded-md mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-20" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8 border rounded-lg bg-red-50">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    )
  }

  if (entries.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg">
        <p className="text-muted-foreground mb-4">No entries found in this category.</p>
        <p className="text-sm text-muted-foreground">Be the first to submit your entry!</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {entries.map((entry) => (
        <Card key={entry.id} className="overflow-hidden">
          <CardHeader className="p-4 pb-0">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{entry.songTitle}</CardTitle>
              {entry.status === "winner" && (
                <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">
                  <Award className="h-3 w-3 mr-1" /> Winner
                </Badge>
              )}
            </div>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Badge variant="outline" className="mr-2">
                {entry.entryType === "individual" ? (
                  <User className="h-3 w-3 mr-1" />
                ) : (
                  <Users className="h-3 w-3 mr-1" />
                )}
                {entry.entryType === "individual" ? "Individual" : "Class"}
              </Badge>
              <span className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(entry.dateSubmitted)}
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            {entry.isVideo ? (
              <div className="rounded-md overflow-hidden bg-black mb-3 aspect-video">
                <video src={entry.mediaFileUrl} controls className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="flex items-center justify-center bg-muted rounded-md mb-3 h-[150px]">
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full">
                  <Play className="h-6 w-6" />
                </Button>
              </div>
            )}
            <h3 className="font-medium mb-1">
              {entry.name} - {entry.schoolName}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-3 mb-2">{entry.description}</p>
            <div className="text-xs text-muted-foreground">
              <span className="font-medium">Spanish words: </span>
              {entry.spanishWords
                .split(/[,\s]+/)
                .slice(0, 5)
                .join(", ")}
              {entry.spanishWords.split(/[,\s]+/).length > 5 && "..."}
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleVote(entry.id)}
              disabled={votingInProgress[entry.id]}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              {entry.votes} {entry.votes === 1 ? "Vote" : "Votes"}
            </Button>
            <Button variant="default" size="sm">
              <Play className="h-4 w-4 mr-1" />
              Play Full
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
