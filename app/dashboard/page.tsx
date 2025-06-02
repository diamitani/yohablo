"use client"

import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, FileText, Users, BookOpen, Music } from "lucide-react"
import Link from "next/link"
import { courses, assignments, calendarEvents } from "@/lib/mock-education-data"

export default function DashboardPage() {
  const { user, isStudent, isTeacher, isAdmin, getStudentData, getTeacherData } = useAuth()

  const studentData = getStudentData()
  const teacherData = getTeacherData()

  // Get upcoming events (next 7 days)
  const now = new Date()
  const nextWeek = new Date(now)
  nextWeek.setDate(now.getDate() + 7)

  const upcomingEvents = calendarEvents
    .filter((event) => {
      const eventDate = new Date(event.startTime)
      return eventDate >= now && eventDate <= nextWeek
    })
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    .slice(0, 5)

  // Get student's enrolled courses or teacher's courses
  const userCourses = isStudent()
    ? courses.filter((course) => studentData?.enrolledCourses.includes(course.id))
    : isTeacher()
      ? courses.filter((course) => teacherData?.courses.includes(course.id))
      : []

  // Get pending assignments for students or assignments to grade for teachers
  const pendingAssignments = isStudent()
    ? assignments.filter((assignment) => {
        const dueDate = new Date(assignment.dueDate)
        const hasSubmitted = assignment.submissions.some((sub) => sub.studentId === user?.id && sub.status !== "draft")
        return dueDate >= now && !hasSubmitted
      })
    : isTeacher()
      ? assignments.filter(
          (assignment) =>
            teacherData?.courses.includes(assignment.courseId) &&
            assignment.submissions.some((sub) => sub.status === "submitted"),
        )
      : []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isStudent() ? "Courses Enrolled" : isTeacher() ? "Courses Teaching" : "Total Courses"}
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCourses.length}</div>
            <p className="text-xs text-muted-foreground">
              {isStudent() && studentData
                ? `${Math.round(
                    Object.values(studentData.progress).reduce((a, b) => a + b, 0) /
                      Object.values(studentData.progress).length,
                  )}% average completion`
                : isTeacher()
                  ? `${userCourses.reduce((acc, course) => acc + course.students.length, 0)} total students`
                  : `${courses.length} total in system`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isStudent() ? "Assignments Due" : isTeacher() ? "Needs Grading" : "Active Users"}
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingAssignments.length}</div>
            <p className="text-xs text-muted-foreground">
              {isStudent() ? "Upcoming assignments" : isTeacher() ? "Awaiting feedback" : "Currently active in system"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isStudent() ? "Average Grade" : isTeacher() ? "Students" : "Total Students"}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isStudent() && studentData
                ? `${Math.round(
                    Object.values(studentData.grades).reduce((a, b) => a + b, 0) /
                      Object.values(studentData.grades).length,
                  )}%`
                : isTeacher()
                  ? userCourses.reduce((acc, course) => acc + course.students.length, 0)
                  : "42"}
            </div>
            <p className="text-xs text-muted-foreground">
              {isStudent() ? "Across all assignments" : isTeacher() ? "Across all courses" : "Enrolled in courses"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingEvents.length}</div>
            <p className="text-xs text-muted-foreground">In the next 7 days</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">
            {isStudent() ? "My Courses" : isTeacher() ? "Teaching" : "All Courses"}
          </TabsTrigger>
          <TabsTrigger value="workshops">Workshops & Lessons</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Recent Activity */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest actions and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 rounded-lg border p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {isStudent()
                          ? "Submitted assignment"
                          : isTeacher()
                            ? "Graded assignment"
                            : "Updated system settings"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Your schedule for the next 7 days</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center gap-4 rounded-lg border p-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        {event.type === "class" ? (
                          <Users className="h-5 w-5 text-primary" />
                        ) : event.type === "assignment" ? (
                          <FileText className="h-5 w-5 text-primary" />
                        ) : (
                          <Calendar className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{event.title}</p>
                        <p className="text-sm text-muted-foreground">{new Date(event.startTime).toLocaleString()}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-32 text-muted-foreground">No upcoming events</div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Pending Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>
                {isStudent() ? "Pending Assignments" : isTeacher() ? "Needs Grading" : "System Overview"}
              </CardTitle>
              <CardDescription>
                {isStudent()
                  ? "Assignments due soon"
                  : isTeacher()
                    ? "Submissions awaiting feedback"
                    : "Key system metrics"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isStudent() || isTeacher() ? (
                <div className="space-y-4">
                  {pendingAssignments.length > 0 ? (
                    pendingAssignments.map((assignment) => {
                      const course = courses.find((c) => c.id === assignment.courseId)
                      return (
                        <div key={assignment.id} className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{assignment.title}</span>
                              <span className="text-xs text-muted-foreground">{course?.title}</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Due: {new Date(assignment.dueDate).toLocaleDateString()}
                            </div>
                          </div>
                          <Button size="sm" asChild>
                            <Link href={`/dashboard/assignments/${assignment.id}`}>
                              {isStudent() ? "View" : "Grade"}
                            </Link>
                          </Button>
                        </div>
                      )
                    })
                  ) : (
                    <div className="flex items-center justify-center h-32 text-muted-foreground">No pending tasks</div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">System Load</span>
                      <span className="text-sm text-muted-foreground">65%</span>
                    </div>
                    <Progress value={65} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Storage Usage</span>
                      <span className="text-sm text-muted-foreground">42%</span>
                    </div>
                    <Progress value={42} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Active Users</span>
                      <span className="text-sm text-muted-foreground">78%</span>
                    </div>
                    <Progress value={78} />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {userCourses.length > 0 ? (
              userCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="aspect-video w-full bg-muted">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <span>
                        {course.students.length} student{course.students.length !== 1 && "s"}
                      </span>
                      <span className="capitalize">{course.level}</span>
                    </div>
                    {isStudent() && studentData && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Progress</span>
                          <span className="text-sm">{studentData.progress[course.id] || 0}%</span>
                        </div>
                        <Progress value={studentData.progress[course.id] || 0} />
                      </div>
                    )}
                  </CardContent>
                  <div className="p-4 pt-0">
                    <Button asChild className="w-full">
                      <Link href={`/dashboard/courses/${course.id}`}>
                        {isStudent() ? "Continue Learning" : "Manage Course"}
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex items-center justify-center h-32 text-muted-foreground">
                No courses found
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Your upcoming schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event) => {
                    const course = courses.find((c) => c.id === event.courseId)
                    return (
                      <div key={event.id} className="flex items-center gap-4 rounded-lg border p-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          {event.type === "class" ? (
                            <Users className="h-6 w-6 text-primary" />
                          ) : event.type === "assignment" ? (
                            <FileText className="h-6 w-6 text-primary" />
                          ) : (
                            <Calendar className="h-6 w-6 text-primary" />
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {course ? `${course.title} • ` : ""}
                            {new Date(event.startTime).toLocaleString()}
                          </p>
                          {event.location && (
                            <p className="text-sm text-muted-foreground">Location: {event.location}</p>
                          )}
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="flex items-center justify-center h-32 text-muted-foreground">No upcoming events</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workshops" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Workshops</CardTitle>
                <CardDescription>Your latest workshop activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: "Spanish Pronunciation Workshop", date: "2024-01-15", students: 12 },
                  { title: "Grammar Fundamentals", date: "2024-01-10", students: 8 },
                  { title: "Conversation Practice", date: "2024-01-08", students: 15 },
                ].map((workshop, i) => (
                  <div key={i} className="flex items-center gap-4 rounded-lg border p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{workshop.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {workshop.students} students • {new Date(workshop.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/dashboard/workshops/${i + 1}`}>View</Link>
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Lessons</CardTitle>
                <CardDescription>Lessons created with Gemini AI</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: "Colors and Emotions", type: "Musical", date: "2024-01-14" },
                  { title: "Family Members", type: "Traditional", date: "2024-01-12" },
                  { title: "Food Vocabulary Rap", type: "Musical", date: "2024-01-10" },
                ].map((lesson, i) => (
                  <div key={i} className="flex items-center gap-4 rounded-lg border p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple/10">
                      {lesson.type === "Musical" ? (
                        <Music className="h-5 w-5 text-purple-500" />
                      ) : (
                        <BookOpen className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{lesson.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {lesson.type} • {new Date(lesson.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/dashboard/lessons/${i + 1}`}>Edit</Link>
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
