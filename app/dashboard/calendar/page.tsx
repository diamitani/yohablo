"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Clock, MapPin, Users, Video } from "lucide-react"
import { calendarEvents, courses } from "@/lib/mock-education-data"
import { format, isSameDay, startOfMonth, endOfMonth } from "date-fns"

export default function CalendarPage() {
  const { user, isTeacher, getTeacherData } = useAuth()
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    location: "",
    courseId: "",
    type: "class",
  })

  const teacherData = getTeacherData()
  const teacherCourses = isTeacher() ? courses.filter((course) => teacherData?.courses.includes(course.id)) : []

  // Get events for the selected month
  const monthStart = startOfMonth(selectedDate)
  const monthEnd = endOfMonth(selectedDate)
  const monthEvents = calendarEvents.filter((event) => {
    const eventDate = new Date(event.startTime)
    return eventDate >= monthStart && eventDate <= monthEnd
  })

  // Get events for selected date
  const selectedDateEvents = calendarEvents.filter((event) => isSameDay(new Date(event.startTime), selectedDate))

  const handleCreateEvent = () => {
    // In a real app, this would make an API call
    console.log("Creating event:", newEvent)
    setIsCreateEventOpen(false)
    setNewEvent({
      title: "",
      description: "",
      startTime: "",
      endTime: "",
      location: "",
      courseId: "",
      type: "class",
    })
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "class":
        return "bg-blue-500"
      case "assignment":
        return "bg-orange-500"
      case "exam":
        return "bg-red-500"
      case "meeting":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getEventTypeBadge = (type: string) => {
    switch (type) {
      case "class":
        return "default"
      case "assignment":
        return "secondary"
      case "exam":
        return "destructive"
      case "meeting":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">Manage your schedule and upcoming events</p>
        </div>

        {isTeacher() && (
          <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
                <DialogDescription>Schedule a new class, meeting, or event.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Spanish Grammar Class"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Event details..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="datetime-local"
                      value={newEvent.startTime}
                      onChange={(e) => setNewEvent((prev) => ({ ...prev, startTime: e.target.value }))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="datetime-local"
                      value={newEvent.endTime}
                      onChange={(e) => setNewEvent((prev) => ({ ...prev, endTime: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="Room 101 or Zoom link"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="course">Course</Label>
                    <Select
                      value={newEvent.courseId}
                      onValueChange={(value) => setNewEvent((prev) => ({ ...prev, courseId: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        {teacherCourses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Event Type</Label>
                    <Select
                      value={newEvent.type}
                      onValueChange={(value) => setNewEvent((prev) => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="class">Class</SelectItem>
                        <SelectItem value="assignment">Assignment Due</SelectItem>
                        <SelectItem value="exam">Exam</SelectItem>
                        <SelectItem value="meeting">Meeting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateEventOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateEvent}>Create Event</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Calendar */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{format(selectedDate, "MMMM yyyy")}</CardTitle>
            <CardDescription>Click on a date to view events</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
              modifiers={{
                hasEvents: (date) => monthEvents.some((event) => isSameDay(new Date(event.startTime), date)),
              }}
              modifiersStyles={{
                hasEvents: {
                  backgroundColor: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                  fontWeight: "bold",
                },
              }}
            />
          </CardContent>
        </Card>

        {/* Selected Date Events */}
        <Card>
          <CardHeader>
            <CardTitle>{format(selectedDate, "EEEE, MMMM d")}</CardTitle>
            <CardDescription>
              {selectedDateEvents.length} event{selectedDateEvents.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedDateEvents.length > 0 ? (
              selectedDateEvents.map((event) => {
                const course = courses.find((c) => c.id === event.courseId)
                return (
                  <div key={event.id} className="space-y-2 p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{event.title}</h4>
                      <Badge variant={getEventTypeBadge(event.type)} className="capitalize">
                        {event.type}
                      </Badge>
                    </div>

                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        {format(new Date(event.startTime), "h:mm a")} -{format(new Date(event.endTime), "h:mm a")}
                      </div>

                      {event.location && (
                        <div className="flex items-center gap-2">
                          {event.location.includes("zoom") || event.location.includes("meet") ? (
                            <Video className="h-3 w-3" />
                          ) : (
                            <MapPin className="h-3 w-3" />
                          )}
                          {event.location}
                        </div>
                      )}

                      {course && (
                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3" />
                          {course.title}
                        </div>
                      )}
                    </div>

                    {event.description && <p className="text-sm text-muted-foreground">{event.description}</p>}
                  </div>
                )
              })
            ) : (
              <div className="text-center py-8 text-muted-foreground">No events scheduled for this date</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Your schedule for the next 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {calendarEvents
              .filter((event) => {
                const eventDate = new Date(event.startTime)
                const now = new Date()
                const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
                return eventDate >= now && eventDate <= weekFromNow
              })
              .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
              .slice(0, 5)
              .map((event) => {
                const course = courses.find((c) => c.id === event.courseId)
                return (
                  <div key={event.id} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${getEventTypeColor(event.type)}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{event.title}</h4>
                        <Badge variant={getEventTypeBadge(event.type)} className="capitalize">
                          {event.type}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(event.startTime), "MMM d, h:mm a")}
                        {course && ` • ${course.title}`}
                        {event.location && ` • ${event.location}`}
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
