"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Users, Clock, MapPin, Plus } from "lucide-react"
import Link from "next/link"

// Mock workshop data
const workshops = [
  {
    id: "1",
    title: "Spanish Pronunciation Masterclass",
    description: "Intensive workshop focusing on Spanish pronunciation and accent reduction",
    date: "2024-01-20",
    time: "10:00 AM - 12:00 PM",
    location: "Room 101",
    capacity: 20,
    enrolled: 15,
    status: "upcoming",
    level: "Intermediate",
    category: "Pronunciation",
  },
  {
    id: "2",
    title: "Grammar Fundamentals Workshop",
    description: "Essential Spanish grammar concepts for beginners",
    date: "2024-01-18",
    time: "2:00 PM - 4:00 PM",
    location: "Room 203",
    capacity: 15,
    enrolled: 12,
    status: "upcoming",
    level: "Beginner",
    category: "Grammar",
  },
  {
    id: "3",
    title: "Conversation Practice Session",
    description: "Interactive conversation practice with native speakers",
    date: "2024-01-15",
    time: "3:00 PM - 5:00 PM",
    location: "Room 105",
    capacity: 12,
    enrolled: 12,
    status: "completed",
    level: "Advanced",
    category: "Conversation",
  },
  {
    id: "4",
    title: "Cultural Immersion Workshop",
    description: "Explore Spanish-speaking cultures through interactive activities",
    date: "2024-01-25",
    time: "1:00 PM - 3:00 PM",
    location: "Main Hall",
    capacity: 25,
    enrolled: 8,
    status: "upcoming",
    level: "All Levels",
    category: "Culture",
  },
]

const lessons = [
  {
    id: "1",
    title: "Colors and Emotions Rap",
    type: "Musical",
    category: "Vocabulary",
    level: "Beginner",
    duration: "45 min",
    createdDate: "2024-01-14",
    status: "published",
    students: 24,
  },
  {
    id: "2",
    title: "Family Members",
    type: "Traditional",
    category: "Vocabulary",
    level: "Beginner",
    duration: "30 min",
    createdDate: "2024-01-12",
    status: "draft",
    students: 0,
  },
  {
    id: "3",
    title: "Food Vocabulary Hip-Hop",
    type: "Musical",
    category: "Vocabulary",
    level: "Intermediate",
    duration: "50 min",
    createdDate: "2024-01-10",
    status: "published",
    students: 18,
  },
]

export default function WorkshopsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredWorkshops = workshops.filter((workshop) => {
    const matchesSearch =
      workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workshop.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || workshop.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || lesson.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workshops & Lessons</h1>
          <p className="text-muted-foreground">Manage your workshops and AI-generated lessons</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/dashboard/create-lesson">
              <Plus className="mr-2 h-4 w-4" />
              Create Lesson
            </Link>
          </Button>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            New Workshop
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search workshops and lessons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="workshops" className="space-y-6">
        <TabsList>
          <TabsTrigger value="workshops">Workshops</TabsTrigger>
          <TabsTrigger value="lessons">AI Lessons</TabsTrigger>
        </TabsList>

        <TabsContent value="workshops" className="space-y-6">
          <div className="grid gap-6">
            {filteredWorkshops.map((workshop) => (
              <Card key={workshop.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        {workshop.title}
                        <Badge variant={workshop.status === "upcoming" ? "default" : "secondary"}>
                          {workshop.status}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{workshop.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">{workshop.level}</Badge>
                      <Badge variant="outline">{workshop.category}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{new Date(workshop.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{workshop.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{workshop.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {workshop.enrolled}/{workshop.capacity} enrolled
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" asChild>
                      <Link href={`/dashboard/workshops/${workshop.id}`}>View Details</Link>
                    </Button>
                    <Button size="sm" variant="outline">
                      Edit Workshop
                    </Button>
                    {workshop.status === "upcoming" && (
                      <Button size="sm" variant="outline">
                        Cancel Workshop
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="lessons" className="space-y-6">
          <div className="grid gap-6">
            {filteredLessons.map((lesson) => (
              <Card key={lesson.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        {lesson.title}
                        <Badge variant={lesson.status === "published" ? "default" : "secondary"}>{lesson.status}</Badge>
                      </CardTitle>
                      <CardDescription>
                        {lesson.type} lesson • {lesson.duration} • Created{" "}
                        {new Date(lesson.createdDate).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">{lesson.level}</Badge>
                      <Badge variant="outline">{lesson.category}</Badge>
                      <Badge variant="outline">{lesson.type}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{lesson.students} students</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{lesson.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" asChild>
                      <Link href={`/dashboard/lessons/${lesson.id}`}>Edit Lesson</Link>
                    </Button>
                    <Button size="sm" variant="outline">
                      Preview
                    </Button>
                    {lesson.status === "draft" && (
                      <Button size="sm" variant="outline">
                        Publish
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      Duplicate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
