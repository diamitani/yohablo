export type UserRole = "student" | "teacher" | "admin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface Student extends User {
  role: "student"
  enrolledCourses: string[]
  completedAssignments: string[]
  grades: Record<string, number>
  progress: Record<string, number>
}

export interface Teacher extends User {
  role: "teacher"
  courses: string[]
  specializations: string[]
  bio?: string
}

export interface Admin extends User {
  role: "admin"
  permissions: string[]
}
