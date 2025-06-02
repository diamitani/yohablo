"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Play, Pause, ThumbsUp, Award, Clock, Download, Mail } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockContestEntries } from "@/lib/mock-contest-data"
import { selectWinner } from "@/app/api/contest/actions"
import { toast } from "@/components/ui/use-toast"

export function ContestAdminPanel() {
  const [entries, setEntries] = useState(mockContestEntries)
  const [selectedEntry, setSelectedEntry] = useState<(typeof mockContestEntries)[0] | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    // In a real implementation, this would play/pause the audio
  }

  const handleSelectWinner = async (entryId: string) => {
    try {
      await selectWinner(entryId)

      // Update local state
      setEntries(entries.map((entry) => (entry.id === entryId ? { ...entry, isWinner: true } : entry)))

      toast({
        title: "Winner selected",
        description: "The entry has been marked as a winner and will be featured on the next mixtape.",
      })
    } catch (error) {
      toast({
        title: "Error selecting winner",
        description: "There was a problem selecting the winner. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-8">
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Entries ({entries.length})</TabsTrigger>
          <TabsTrigger value="individual">
            Individual ({entries.filter((e) => e.entryType === "individual").length})
          </TabsTrigger>
          <TabsTrigger value="class">Class ({entries.filter((e) => e.entryType === "class").length})</TabsTrigger>
          <TabsTrigger value="winners">Winners ({entries.filter((e) => e.isWinner).length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>All Contest Entries</CardTitle>
              <CardDescription>Review and manage all submissions to the Yo Hablo Song Creation Contest</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entry</TableHead>
                    <TableHead>Submitter</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Votes</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>
                        <div className="font-medium">{entry.songTitle}</div>
                        <div className="text-sm text-muted-foreground">{entry.description.substring(0, 40)}...</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={`/diverse-group-avatars.png?height=32&width=32&query=avatar ${entry.id}`}
                              alt={entry.name}
                            />
                            <AvatarFallback>{entry.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{entry.name}</div>
                            <div className="text-xs text-muted-foreground">{entry.schoolName}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={entry.entryType === "individual" ? "outline" : "secondary"}>
                          {entry.entryType === "individual" ? "Individual" : "Class"}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(entry.submittedAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                          <span>{entry.votes}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {entry.isWinner ? (
                          <Badge className="bg-yellow-500 hover:bg-yellow-600">
                            <Award className="mr-1 h-3 w-3" />
                            Winner
                          </Badge>
                        ) : (
                          <Badge variant="outline">Pending</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" onClick={() => setSelectedEntry(entry)}>
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              // In a real implementation, this would download the audio file
                              toast({
                                title: "Download started",
                                description: "The audio file is being downloaded.",
                              })
                            }}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              // In a real implementation, this would open an email client
                              toast({
                                title: "Email action",
                                description: "Opening email to " + entry.email,
                              })
                            }}
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                          {!entry.isWinner && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="ml-2"
                              onClick={() => handleSelectWinner(entry.id)}
                            >
                              <Award className="mr-1 h-4 w-4" />
                              Select as Winner
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="individual" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Individual Entries</CardTitle>
              <CardDescription>Review and manage individual student submissions (15-second entries)</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entry</TableHead>
                    <TableHead>Submitter</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Votes</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entries
                    .filter((entry) => entry.entryType === "individual")
                    .map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>
                          <div className="font-medium">{entry.songTitle}</div>
                          <div className="text-sm text-muted-foreground">{entry.description.substring(0, 40)}...</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={`/diverse-group-avatars.png?height=32&width=32&query=avatar ${entry.id}`}
                                alt={entry.name}
                              />
                              <AvatarFallback>{entry.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{entry.name}</div>
                              <div className="text-xs text-muted-foreground">{entry.schoolName}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(entry.submittedAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                            <span>{entry.votes}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {entry.isWinner ? (
                            <Badge className="bg-yellow-500 hover:bg-yellow-600">
                              <Award className="mr-1 h-3 w-3" />
                              Winner
                            </Badge>
                          ) : (
                            <Badge variant="outline">Pending</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" onClick={() => setSelectedEntry(entry)}>
                              <Play className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                // In a real implementation, this would download the audio file
                                toast({
                                  title: "Download started",
                                  description: "The audio file is being downloaded.",
                                })
                              }}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            {!entry.isWinner && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="ml-2"
                                onClick={() => handleSelectWinner(entry.id)}
                              >
                                <Award className="mr-1 h-4 w-4" />
                                Select as Winner
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="class" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Class Entries</CardTitle>
              <CardDescription>Review and manage class submissions (2-minute entries)</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entry</TableHead>
                    <TableHead>Submitter</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Votes</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entries
                    .filter((entry) => entry.entryType === "class")
                    .map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>
                          <div className="font-medium">{entry.songTitle}</div>
                          <div className="text-sm text-muted-foreground">{entry.description.substring(0, 40)}...</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={`/diverse-group-avatars.png?height=32&width=32&query=avatar ${entry.id}`}
                                alt={entry.name}
                              />
                              <AvatarFallback>{entry.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{entry.name}</div>
                              <div className="text-xs text-muted-foreground">{entry.schoolName}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(entry.submittedAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                            <span>{entry.votes}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {entry.isWinner ? (
                            <Badge className="bg-yellow-500 hover:bg-yellow-600">
                              <Award className="mr-1 h-3 w-3" />
                              Winner
                            </Badge>
                          ) : (
                            <Badge variant="outline">Pending</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" onClick={() => setSelectedEntry(entry)}>
                              <Play className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                // In a real implementation, this would download the audio file
                                toast({
                                  title: "Download started",
                                  description: "The audio file is being downloaded.",
                                })
                              }}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            {!entry.isWinner && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="ml-2"
                                onClick={() => handleSelectWinner(entry.id)}
                              >
                                <Award className="mr-1 h-4 w-4" />
                                Select as Winner
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="winners" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Contest Winners</CardTitle>
              <CardDescription>Manage entries selected as winners for the next Yo Hablo mixtape</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entry</TableHead>
                    <TableHead>Submitter</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Votes</TableHead>
                    <TableHead>Selected On</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entries
                    .filter((entry) => entry.isWinner)
                    .map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>
                          <div className="font-medium">{entry.songTitle}</div>
                          <div className="text-sm text-muted-foreground">{entry.description.substring(0, 40)}...</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={`/diverse-group-avatars.png?height=32&width=32&query=avatar ${entry.id}`}
                                alt={entry.name}
                              />
                              <AvatarFallback>{entry.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{entry.name}</div>
                              <div className="text-xs text-muted-foreground">{entry.schoolName}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={entry.entryType === "individual" ? "outline" : "secondary"}>
                            {entry.entryType === "individual" ? "Individual" : "Class"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                            <span>{entry.votes}</span>
                          </div>
                        </TableCell>
                        <TableCell>{new Date().toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" onClick={() => setSelectedEntry(entry)}>
                              <Play className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                // In a real implementation, this would download the audio file
                                toast({
                                  title: "Download started",
                                  description: "The audio file is being downloaded.",
                                })
                              }}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="ml-2"
                              onClick={() => {
                                // In a real implementation, this would send a notification to the winner
                                toast({
                                  title: "Notification sent",
                                  description: "The winner has been notified of their selection.",
                                })
                              }}
                            >
                              <Mail className="mr-1 h-4 w-4" />
                              Notify Winner
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedEntry && (
        <Card className="mt-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{selectedEntry.songTitle}</CardTitle>
                <CardDescription>
                  Submitted by {selectedEntry.name} from {selectedEntry.schoolName}
                </CardDescription>
              </div>
              <Badge variant={selectedEntry.entryType === "individual" ? "outline" : "secondary"}>
                {selectedEntry.entryType === "individual" ? "Individual (15s)" : "Class (2m)"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md">
              <div className="absolute inset-0 flex items-center justify-center">
                <Button variant="secondary" size="icon" className="h-12 w-12 rounded-full" onClick={togglePlay}>
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                </Button>
              </div>

              <div className="absolute bottom-2 right-2 flex items-center gap-1">
                <Clock className="h-4 w-4 text-white" />
                <span className="text-xs font-medium text-white">
                  {selectedEntry.entryType === "individual" ? "0:15" : "2:00"}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{selectedEntry.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Spanish Words Used</h3>
              <div className="flex flex-wrap gap-2">
                {selectedEntry.spanishWords.split(",").map((word, index) => (
                  <Badge key={index} variant="outline">
                    {word.trim()}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Submitted On</h3>
                <p className="text-muted-foreground">{new Date(selectedEntry.submittedAt).toLocaleString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Votes</h3>
                <p className="text-muted-foreground">{selectedEntry.votes}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Status</h3>
                <div>
                  {selectedEntry.isWinner ? (
                    <Badge className="bg-yellow-500 hover:bg-yellow-600">
                      <Award className="mr-1 h-3 w-3" />
                      Winner
                    </Badge>
                  ) : (
                    <Badge variant="outline">Pending Review</Badge>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Contact</h3>
                <p className="text-muted-foreground">{selectedEntry.email}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  // In a real implementation, this would download the audio file
                  toast({
                    title: "Download started",
                    description: "The audio file is being downloaded.",
                  })
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Audio
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  // In a real implementation, this would open an email client
                  toast({
                    title: "Email action",
                    description: "Opening email to " + selectedEntry.email,
                  })
                }}
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact Submitter
              </Button>
            </div>

            <div className="flex gap-2">
              {!selectedEntry.isWinner ? (
                <Button onClick={() => handleSelectWinner(selectedEntry.id)}>
                  <Award className="mr-2 h-4 w-4" />
                  Select as Winner
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => {
                    // In a real implementation, this would send a notification to the winner
                    toast({
                      title: "Notification sent",
                      description: "The winner has been notified of their selection.",
                    })
                  }}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Notify Winner
                </Button>
              )}
              <Button variant="ghost" onClick={() => setSelectedEntry(null)}>
                Close
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
