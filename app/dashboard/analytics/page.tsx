"use client"

import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown, Users, BookOpen, Clock, Award } from "lucide-react"
import { courses, students, assignments } from "@/lib/mock-education-data"

const studentEngagementData = [
  { month: "Jan", active: 45, total: 50 },
  { month: "Feb", active: 48, total: 52 },
  { month: "Mar", active: 52, total: 55 },
  { month: "Apr", active: 49, total: 58 },
  { month: "May", active: 55, total: 60 },
  { month: "Jun", active: 58, total: 62 },
]

const coursePerformanceData = [
  { course: "Vocabulary", average: 85, students: 25 },
  { course: "Grammar", average: 78, students: 22 },
  { course: "Conversation", average: 92, students: 18 },
  { course: "Culture", average: 88, students: 15 },
]

const gradeDistributionData = [
  { grade: "A", count: 15, color: "#22c55e" },
  { grade: "B", count: 25, color: "#3b82f6" },
  { grade: "C", count: 12, color: "#f59e0b" },
  { grade: "D", count: 5, color: "#ef4444" },
  { grade: "F", count: 3, color: "#6b7280" },
]

export default function AnalyticsPage() {
  const { user, isTeacher, getTeacherData } = useAuth()

  const teacherData = getTeacherData()
  const teacherCourses = isTeacher() ? courses.filter((course) => teacherData?.courses.includes(course.id)) : []

  const totalStudents = teacherCourses.reduce((acc, course) => acc + course.students.length, 0)
  const totalAssignments = assignments.filter((assignment) => teacherData?.courses.includes(assignment.courseId)).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Track student performance and course effectiveness</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teacherCourses.length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2 new this semester
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Completion</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Grade</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600 flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" />
                -2% from last month
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="courses">Course Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Student Engagement Trend</CardTitle>
                <CardDescription>Active students over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={studentEngagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="active" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="total" stroke="#e5e7eb" strokeWidth={2} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Current semester grades</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={gradeDistributionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ grade, count }) => `${grade}: ${count}`}
                    >
                      {gradeDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Course Performance</CardTitle>
              <CardDescription>Average grades by course</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={coursePerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="course" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="average" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Students</CardTitle>
                <CardDescription>Students with highest grades</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {students.slice(0, 5).map((student, index) => (
                  <div key={student.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {Object.keys(student.grades).length} assignments
                        </div>
                      </div>
                    </div>
                    <Badge variant="default">
                      {Math.round(
                        Object.values(student.grades).reduce((a, b) => a + b, 0) /
                          Object.values(student.grades).length || 0,
                      )}
                      %
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Assignment Performance</CardTitle>
                <CardDescription>Recent assignment averages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {assignments.slice(0, 5).map((assignment) => {
                  const course = courses.find((c) => c.id === assignment.courseId)
                  const avgGrade = Math.floor(Math.random() * 30) + 70 // Mock data

                  return (
                    <div key={assignment.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{assignment.title}</div>
                          <div className="text-sm text-muted-foreground">{course?.title}</div>
                        </div>
                        <Badge variant={avgGrade >= 80 ? "default" : avgGrade >= 70 ? "secondary" : "destructive"}>
                          {avgGrade}%
                        </Badge>
                      </div>
                      <Progress value={avgGrade} className="h-2" />
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Engagement analytics will be displayed here.</p>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-4">
            {teacherCourses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="capitalize">
                      {course.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Students Enrolled</div>
                      <div className="text-2xl font-bold">{course.students.length}</div>
                      <div className="text-xs text-muted-foreground">+3 this month</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Completion Rate</div>
                      <div className="text-2xl font-bold">{Math.floor(Math.random() * 20) + 75}%</div>
                      <div className="text-xs text-muted-foreground">Above average</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Average Grade</div>
                      <div className="text-2xl font-bold">{Math.floor(Math.random() * 15) + 80}%</div>
                      <div className="text-xs text-muted-foreground">Class average</div>
                    </div>
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
