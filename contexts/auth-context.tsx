"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User, Student, Teacher, Admin } from "@/lib/types/auth"
import { users, students, teachers, admins } from "@/lib/mock-education-data"

type UserRole = "student" | "teacher" | "admin"

interface AuthSession {
  user: User
  token: string
  refreshToken: string
  expiresAt: number
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>
  logout: () => void
  refreshSession: () => Promise<void>
  isStudent: () => boolean
  isTeacher: () => boolean
  isAdmin: () => boolean
  getStudentData: () => Student | null
  getTeacherData: () => Teacher | null
  getAdminData: () => Admin | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const SESSION_KEY = "yo_hablo_session"
const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours
const REFRESH_THRESHOLD = 60 * 60 * 1000 // 1 hour before expiry

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Generate secure tokens (in production, these would come from your backend)
  const generateToken = () => {
    return btoa(Math.random().toString(36).substring(2) + Date.now().toString(36))
  }

  const generateRefreshToken = () => {
    return btoa(Math.random().toString(36).substring(2) + Date.now().toString(36) + "refresh")
  }

  // Save session securely
  const saveSession = (user: User) => {
    const session: AuthSession = {
      user,
      token: generateToken(),
      refreshToken: generateRefreshToken(),
      expiresAt: Date.now() + SESSION_DURATION,
    }

    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session))
      setUser(user)
    } catch (error) {
      console.error("Failed to save session:", error)
    }
  }

  // Load session from storage
  const loadSession = (): AuthSession | null => {
    try {
      const sessionData = localStorage.getItem(SESSION_KEY)
      if (!sessionData) return null

      const session: AuthSession = JSON.parse(sessionData)

      // Check if session is expired
      if (Date.now() > session.expiresAt) {
        clearSession()
        return null
      }

      return session
    } catch (error) {
      console.error("Failed to load session:", error)
      clearSession()
      return null
    }
  }

  // Clear session
  const clearSession = () => {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  // Refresh session if needed
  const refreshSession = async () => {
    const session = loadSession()
    if (!session) return

    // Check if refresh is needed
    const timeUntilExpiry = session.expiresAt - Date.now()
    if (timeUntilExpiry > REFRESH_THRESHOLD) return

    try {
      // In production, this would be an API call to refresh the token
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Update session with new expiry
      const updatedSession: AuthSession = {
        ...session,
        token: generateToken(),
        expiresAt: Date.now() + SESSION_DURATION,
      }

      localStorage.setItem(SESSION_KEY, JSON.stringify(updatedSession))
    } catch (error) {
      console.error("Failed to refresh session:", error)
      logout()
    }
  }

  // Check for existing session on mount
  useEffect(() => {
    const session = loadSession()
    if (session) {
      setUser(session.user)
      // Auto-refresh if needed
      refreshSession()
    }
    setIsLoading(false)
  }, [])

  // Auto-refresh session periodically
  useEffect(() => {
    if (!user) return

    const interval = setInterval(
      () => {
        refreshSession()
      },
      5 * 60 * 1000,
    ) // Check every 5 minutes

    return () => clearInterval(interval)
  }, [user])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Find user by email (in a real app, this would be a server call)
      const foundUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase())

      if (!foundUser) {
        throw new Error("Invalid email or password")
      }

      // In a real app, we would verify the password here
      // For demo purposes, we'll just accept any password

      saveSession(foundUser)
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unknown error occurred")
      throw e
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if email already exists
      const existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
      if (existingUser) {
        throw new Error("An account with this email already exists")
      }

      // Validate password strength
      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long")
      }
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        throw new Error("Password must contain at least one uppercase letter, one lowercase letter, and one number")
      }

      // Create new user
      const newUser: User = {
        id: `user_${Date.now()}`,
        name,
        email,
        role,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      // Add to users array (in a real app, this would be a server call)
      users.push(newUser)

      // Create role-specific data
      if (role === "teacher") {
        const newTeacher: Teacher = {
          ...newUser,
          role: "teacher",
          courses: [],
          specializations: ["Spanish Language", "Hip-Hop Education"],
          bio: "New educator passionate about innovative Spanish teaching methods.",
        }
        teachers.push(newTeacher)
      } else if (role === "student") {
        const newStudent: Student = {
          ...newUser,
          role: "student",
          enrolledCourses: [],
          completedAssignments: [],
          grades: {},
          progress: {},
        }
        students.push(newStudent)
      }

      // Auto-login the new user
      saveSession(newUser)
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unknown error occurred")
      throw e
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    clearSession()
    setError(null)
  }

  const isAuthenticated = !!user
  const isStudent = () => user?.role === "student"
  const isTeacher = () => user?.role === "teacher"
  const isAdmin = () => user?.role === "admin"

  const getStudentData = (): Student | null => {
    if (!user || user.role !== "student") return null
    return students.find((s) => s.id === user.id) || null
  }

  const getTeacherData = (): Teacher | null => {
    if (!user || user.role !== "teacher") return null
    return teachers.find((t) => t.id === user.id) || null
  }

  const getAdminData = (): Admin | null => {
    if (!user || user.role !== "admin") return null
    return admins.find((a) => a.id === user.id) || null
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        isAuthenticated,
        login,
        register,
        logout,
        refreshSession,
        isStudent,
        isTeacher,
        isAdmin,
        getStudentData,
        getTeacherData,
        getAdminData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
