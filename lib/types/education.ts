export interface Course {
  id: string
  title: string
  description: string
  teacherId: string
  students: string[]
  lessons: string[]
  assignments: string[]
  startDate: Date
  endDate?: Date
  isActive: boolean
  thumbnail?: string
  category: string
  level: "beginner" | "intermediate" | "advanced"
  createdAt: Date
  updatedAt: Date
}

export interface Lesson {
  id: string
  courseId: string
  title: string
  description: string
  content: string
  resources: Resource[]
  duration: number // in minutes
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface Resource {
  id: string
  title: string
  type: "pdf" | "video" | "audio" | "link" | "worksheet"
  url: string
  description?: string
  createdAt: Date
  updatedAt: Date
}

export interface Assignment {
  id: string
  courseId: string
  title: string
  description: string
  dueDate: Date
  points: number
  submissions: Submission[]
  createdAt: Date
  updatedAt: Date
}

export interface Submission {
  id: string
  assignmentId: string
  studentId: string
  content: string
  attachments: string[]
  submittedAt: Date
  grade?: number
  feedback?: string
  gradedAt?: Date
  status: "draft" | "submitted" | "graded" | "returned"
}

export interface Announcement {
  id: string
  courseId?: string
  authorId: string
  title: string
  content: string
  isPinned: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Message {
  id: string
  senderId: string
  recipientId: string
  content: string
  isRead: boolean
  createdAt: Date
}

export interface CalendarEvent {
  id: string
  title: string
  description?: string
  startTime: Date
  endTime: Date
  location?: string
  courseId?: string
  createdBy: string
  attendees: string[]
  type: "class" | "assignment" | "exam" | "other"
  createdAt: Date
  updatedAt: Date
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  isRead: boolean
  link?: string
  createdAt: Date
}
