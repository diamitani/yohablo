import type { User, Student, Teacher, Admin } from "./types/auth"
import type { Course, Lesson, Assignment, Announcement, Message, CalendarEvent, Notification } from "./types/education"

// Mock Users
export const users: User[] = [
  {
    id: "user1",
    name: "John Student",
    email: "john@example.com",
    role: "student",
    avatar: "/javascript-code.png",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-01-15"),
  },
  {
    id: "user2",
    name: "Maria Student",
    email: "maria@example.com",
    role: "student",
    avatar: "/abstract-ms-artwork.png",
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-02-10"),
  },
  {
    id: "user3",
    name: "Prof. Rodriguez",
    email: "rodriguez@example.com",
    role: "teacher",
    avatar: "/public-relations-meeting.png",
    createdAt: new Date("2022-11-05"),
    updatedAt: new Date("2022-11-05"),
  },
  {
    id: "user4",
    name: "Dr. Smith",
    email: "smith@example.com",
    role: "teacher",
    avatar: "/abstract-ds.png",
    createdAt: new Date("2022-10-20"),
    updatedAt: new Date("2022-10-20"),
  },
  {
    id: "user5",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    avatar: "/australian-outback-landscape.png",
    createdAt: new Date("2022-01-01"),
    updatedAt: new Date("2022-01-01"),
  },
]

// Mock Students
export const students: Student[] = [
  {
    id: "user1",
    name: "John Student",
    email: "john@example.com",
    role: "student",
    avatar: "/javascript-code.png",
    enrolledCourses: ["course1", "course2"],
    completedAssignments: ["assignment1", "assignment3"],
    grades: {
      assignment1: 85,
      assignment3: 92,
    },
    progress: {
      course1: 75,
      course2: 30,
    },
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-01-15"),
  },
  {
    id: "user2",
    name: "Maria Student",
    email: "maria@example.com",
    role: "student",
    avatar: "/abstract-ms-artwork.png",
    enrolledCourses: ["course1", "course3"],
    completedAssignments: ["assignment1", "assignment5"],
    grades: {
      assignment1: 78,
      assignment5: 88,
    },
    progress: {
      course1: 60,
      course3: 45,
    },
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-02-10"),
  },
]

// Mock Teachers
export const teachers: Teacher[] = [
  {
    id: "user3",
    name: "Prof. Rodriguez",
    email: "rodriguez@example.com",
    role: "teacher",
    avatar: "/public-relations-meeting.png",
    courses: ["course1", "course3"],
    specializations: ["Spanish Grammar", "Conversational Spanish"],
    bio: "Professor Rodriguez has been teaching Spanish for over 15 years with a focus on practical conversation skills.",
    createdAt: new Date("2022-11-05"),
    updatedAt: new Date("2022-11-05"),
  },
  {
    id: "user4",
    name: "Dr. Smith",
    email: "smith@example.com",
    role: "teacher",
    avatar: "/abstract-ds.png",
    courses: ["course2"],
    specializations: ["Spanish Literature", "Cultural Studies"],
    bio: "Dr. Smith specializes in Spanish literature and cultural studies with a PhD from Universidad de Barcelona.",
    createdAt: new Date("2022-10-20"),
    updatedAt: new Date("2022-10-20"),
  },
]

// Mock Admins
export const admins: Admin[] = [
  {
    id: "user5",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    avatar: "/australian-outback-landscape.png",
    permissions: ["user_management", "course_management", "system_settings", "reports"],
    createdAt: new Date("2022-01-01"),
    updatedAt: new Date("2022-01-01"),
  },
]

// Mock Courses
export const courses: Course[] = [
  {
    id: "course1",
    title: "Spanish 101: Beginners",
    description: "An introduction to Spanish language basics including grammar, vocabulary, and simple conversations.",
    teacherId: "user3",
    students: ["user1", "user2"],
    lessons: ["lesson1", "lesson2", "lesson3"],
    assignments: ["assignment1", "assignment2"],
    startDate: new Date("2023-01-10"),
    endDate: new Date("2023-05-15"),
    isActive: true,
    thumbnail: "/spanish-101.png",
    category: "Language",
    level: "beginner",
    createdAt: new Date("2022-12-15"),
    updatedAt: new Date("2022-12-15"),
  },
  {
    id: "course2",
    title: "Spanish Literature",
    description:
      "Explore classic and contemporary Spanish literature while improving reading comprehension and vocabulary.",
    teacherId: "user4",
    students: ["user1"],
    lessons: ["lesson4", "lesson5"],
    assignments: ["assignment3", "assignment4"],
    startDate: new Date("2023-02-01"),
    endDate: new Date("2023-06-10"),
    isActive: true,
    thumbnail: "/placeholder.svg?height=200&width=300&query=Spanish+Literature",
    category: "Literature",
    level: "intermediate",
    createdAt: new Date("2023-01-20"),
    updatedAt: new Date("2023-01-20"),
  },
  {
    id: "course3",
    title: "Conversational Spanish",
    description: "Practice everyday conversations and improve your speaking fluency in Spanish.",
    teacherId: "user3",
    students: ["user2"],
    lessons: ["lesson6", "lesson7"],
    assignments: ["assignment5"],
    startDate: new Date("2023-03-05"),
    isActive: true,
    thumbnail: "/placeholder.svg?height=200&width=300&query=Conversational+Spanish",
    category: "Language",
    level: "intermediate",
    createdAt: new Date("2023-02-20"),
    updatedAt: new Date("2023-02-20"),
  },
]

// Mock Lessons
export const lessons: Lesson[] = [
  {
    id: "lesson1",
    courseId: "course1",
    title: "Introduction to Spanish Alphabet",
    description: "Learn the Spanish alphabet and pronunciation basics.",
    content: "The Spanish alphabet consists of 27 letters...",
    resources: [
      {
        id: "resource1",
        title: "Spanish Alphabet Chart",
        type: "pdf",
        url: "/resources/spanish-alphabet.pdf",
        description: "Printable chart of the Spanish alphabet with pronunciation guide",
        createdAt: new Date("2022-12-20"),
        updatedAt: new Date("2022-12-20"),
      },
      {
        id: "resource2",
        title: "Pronunciation Guide Video",
        type: "video",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        description: "Video guide to pronouncing Spanish letters",
        createdAt: new Date("2022-12-21"),
        updatedAt: new Date("2022-12-21"),
      },
    ],
    duration: 45,
    order: 1,
    createdAt: new Date("2022-12-20"),
    updatedAt: new Date("2022-12-20"),
  },
  {
    id: "lesson2",
    courseId: "course1",
    title: "Basic Greetings and Introductions",
    description: "Learn common Spanish greetings and how to introduce yourself.",
    content: "In this lesson, we will cover common greetings such as 'Hola' (Hello)...",
    resources: [
      {
        id: "resource3",
        title: "Greetings Vocabulary List",
        type: "pdf",
        url: "/resources/greetings-vocab.pdf",
        description: "List of common Spanish greetings and phrases",
        createdAt: new Date("2022-12-22"),
        updatedAt: new Date("2022-12-22"),
      },
    ],
    duration: 60,
    order: 2,
    createdAt: new Date("2022-12-22"),
    updatedAt: new Date("2022-12-22"),
  },
  // More lessons...
]

// Mock Assignments
export const assignments: Assignment[] = [
  {
    id: "assignment1",
    courseId: "course1",
    title: "Alphabet Practice",
    description: "Complete the worksheet practicing the Spanish alphabet and pronunciation.",
    dueDate: new Date("2023-01-20"),
    points: 10,
    submissions: [
      {
        id: "submission1",
        assignmentId: "assignment1",
        studentId: "user1",
        content: "Completed alphabet worksheet with pronunciation notes.",
        attachments: ["/submissions/user1-alphabet.pdf"],
        submittedAt: new Date("2023-01-18"),
        grade: 85,
        feedback: "Good work on the pronunciation notes. Practice the 'r' sound more.",
        gradedAt: new Date("2023-01-21"),
        status: "graded",
      },
      {
        id: "submission2",
        assignmentId: "assignment1",
        studentId: "user2",
        content: "My completed alphabet worksheet.",
        attachments: ["/submissions/user2-alphabet.pdf"],
        submittedAt: new Date("2023-01-19"),
        grade: 78,
        feedback: "Good effort. Work on distinguishing between 'b' and 'v' sounds.",
        gradedAt: new Date("2023-01-21"),
        status: "graded",
      },
    ],
    createdAt: new Date("2023-01-10"),
    updatedAt: new Date("2023-01-10"),
  },
  // More assignments...
]

// Mock Announcements
export const announcements: Announcement[] = [
  {
    id: "announcement1",
    courseId: "course1",
    authorId: "user3",
    title: "Welcome to Spanish 101",
    content: "Welcome to our Spanish 101 course! Please review the syllabus and prepare for our first class on Monday.",
    isPinned: true,
    createdAt: new Date("2023-01-08"),
    updatedAt: new Date("2023-01-08"),
  },
  // More announcements...
]

// Mock Messages
export const messages: Message[] = [
  {
    id: "message1",
    senderId: "user1",
    recipientId: "user3",
    content: "Hello Professor, I have a question about the homework assignment.",
    isRead: true,
    createdAt: new Date("2023-01-16"),
  },
  {
    id: "message2",
    senderId: "user3",
    recipientId: "user1",
    content: "Hi John, what's your question about the assignment?",
    isRead: false,
    createdAt: new Date("2023-01-16"),
  },
  // More messages...
]

// Mock Calendar Events
export const calendarEvents: CalendarEvent[] = [
  {
    id: "event1",
    title: "Spanish 101 Class",
    description: "Regular class session - Introduction to verb conjugation",
    startTime: new Date("2023-01-17T10:00:00"),
    endTime: new Date("2023-01-17T11:30:00"),
    location: "Room 302",
    courseId: "course1",
    createdBy: "user3",
    attendees: ["user1", "user2", "user3"],
    type: "class",
    createdAt: new Date("2023-01-10"),
    updatedAt: new Date("2023-01-10"),
  },
  {
    id: "event2",
    title: "Assignment Due: Alphabet Practice",
    description: "Submit your completed alphabet practice worksheet",
    startTime: new Date("2023-01-20T23:59:00"),
    endTime: new Date("2023-01-20T23:59:00"),
    courseId: "course1",
    createdBy: "user3",
    attendees: ["user1", "user2"],
    type: "assignment",
    createdAt: new Date("2023-01-10"),
    updatedAt: new Date("2023-01-10"),
  },
  // More events...
]

// Mock Notifications
export const notifications: Notification[] = [
  {
    id: "notification1",
    userId: "user1",
    title: "New Assignment",
    message: "A new assignment 'Alphabet Practice' has been posted in Spanish 101.",
    type: "info",
    isRead: false,
    link: "/courses/course1/assignments/assignment1",
    createdAt: new Date("2023-01-10"),
  },
  {
    id: "notification2",
    userId: "user1",
    title: "Assignment Graded",
    message: "Your 'Alphabet Practice' assignment has been graded.",
    type: "success",
    isRead: false,
    link: "/courses/course1/assignments/assignment1/submission",
    createdAt: new Date("2023-01-21"),
  },
  // More notifications...
]
