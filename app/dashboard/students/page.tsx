"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Mail, MessageSquare, UserPlus } from "lucide-react"
import { students, courses } from "@/lib/mock-education-data"
import Link from "next/link"

export default function StudentsPage() {
  const { user, isTeacher, getTeacherData } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCourse, setSelectedCourse] = useState<string>("all")

  const teacherData = getTeacherData()

  // Get students enrolled in teacher's courses
  const teacherCourses = isTeacher() ? courses.filter((course) => teacherData?.courses.includes(course.id)) : []

  const enrolledStudentIds = new Set(teacherCourses.flatMap((course) => course.students))

  const teacherStudents = students.filter((student) => enrolledStudentIds.has(student.id))

  // Filter students based on search and course
  const filteredStudents = teacherStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())

    if (selectedCourse === "all") return matchesSearch

    return matchesSearch && student.enrolledCourses.includes(selectedCourse)
  })

  const getStudentProgress = (studentId: string) => {
    const student = students.find((s) => s.id === studentId)
    if (!student || !student.progress) return 0

    const progressValues = Object.values(student.progress)
    return progressValues.length > 0 ? Math.round(progressValues.reduce((a, b) => a + b, 0) / progressValues.length) : 0
  }

  const getStudentGrade = (studentId: string) => {
    const student = students.find((s) => s.id === studentId)
    if (!student || !student.grades) return 0

    const gradeValues = Object.values(student.grades)
    return gradeValues.length > 0 ? Math.round(gradeValues.reduce((a, b) => a + b, 0) / gradeValues.length) : 0
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">Manage your students and track their progress</p>
        </div>

        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Students
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 max-w-sm"
          />
        </div>

        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="all">All Courses</option>
          {teacherCourses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teacherStudents.length}</div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.floor(teacherStudents.length * 0.8)}</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                teacherStudents.reduce((acc, student) => acc + getStudentProgress(student.id), 0) /
                  teacherStudents.length || 0,
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                teacherStudents.reduce((acc, student) => acc + getStudentGrade(student.id), 0) /
                  teacherStudents.length || 0,
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">Class average</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Student List</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => {
                  const progress = getStudentProgress(student.id)
                  const grade = getStudentGrade(student.id)
                  const studentCourses = courses.filter((course) => student.enrolledCourses.includes(course.id))

                  return (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={student.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-muted-foreground">{student.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {studentCourses.slice(0, 2).map((course) => (
                            <Badge key={course.id} variant="secondary" className="text-xs">
                              {course.title}
                            </Badge>
                          ))}
                          {studentCourses.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{studentCourses.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={progress} className="w-16" />
                          <span className="text-sm text-muted-foreground">{progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={grade >= 80 ? "default" : grade >= 60 ? "secondary" : "destructive"}>
                          {grade}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">2 hours ago</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Link href={`/dashboard/students/${student.id}`} className="flex items-center">
                                View Profile
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Send Message
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Performance analytics will be displayed here.</p>
          </div>
        </TabsContent>

        <TabsContent value="engagement">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Engagement metrics will be displayed here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
