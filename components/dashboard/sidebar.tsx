"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import {
  BookOpen,
  Calendar,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  Bell,
  BarChart,
  LogOut,
  Volume2,
  Wand2,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const { user, isStudent, isTeacher, isAdmin, logout } = useAuth()

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  return (
    <div className={cn("pb-12 border-r h-full", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">{user?.name}</h2>
          <div className="flex items-center gap-2 px-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              {user?.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium">{user?.role}</p>
            </div>
          </div>
        </div>
        <div className="px-3">
          <div className="space-y-1">
            <Link href="/dashboard">
              <Button variant={isActive("/dashboard") ? "secondary" : "ghost"} className="w-full justify-start">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>

            {/* Common links for all users */}
            <Link href="/dashboard/calendar">
              <Button
                variant={isActive("/dashboard/calendar") ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Calendar
              </Button>
            </Link>

            <Link href="/dashboard/audio">
              <Button variant={isActive("/dashboard/audio") ? "secondary" : "ghost"} className="w-full justify-start">
                <Volume2 className="mr-2 h-4 w-4" />
                Audio Library
              </Button>
            </Link>

            <Link href="/dashboard/messages">
              <Button
                variant={isActive("/dashboard/messages") ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Messages
              </Button>
            </Link>

            <Link href="/dashboard/notifications">
              <Button
                variant={isActive("/dashboard/notifications") ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
            </Link>

            {/* Student specific links */}
            {isStudent() && (
              <>
                <Link href="/dashboard/courses">
                  <Button
                    variant={isActive("/dashboard/courses") ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    My Courses
                  </Button>
                </Link>

                <Link href="/dashboard/assignments">
                  <Button
                    variant={isActive("/dashboard/assignments") ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Assignments
                  </Button>
                </Link>

                <Link href="/dashboard/grades">
                  <Button
                    variant={isActive("/dashboard/grades") ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <BarChart className="mr-2 h-4 w-4" />
                    Grades
                  </Button>
                </Link>
              </>
            )}

            {/* Teacher specific links */}
            {isTeacher() && (
              <>
                <Link href="/dashboard/courses">
                  <Button
                    variant={isActive("/dashboard/courses") ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    My Courses
                  </Button>
                </Link>

                <Link href="/dashboard/create-lesson">
                  <Button
                    variant={isActive("/dashboard/create-lesson") ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Wand2 className="mr-2 h-4 w-4" />
                    Create Lesson
                  </Button>
                </Link>

                <Link href="/dashboard/assignments">
                  <Button
                    variant={isActive("/dashboard/assignments") ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Assignments
                  </Button>
                </Link>

                <Link href="/dashboard/students">
                  <Button
                    variant={isActive("/dashboard/students") ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Students
                  </Button>
                </Link>

                <Link href="/dashboard/analytics">
                  <Button
                    variant={isActive("/dashboard/analytics") ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <BarChart className="mr-2 h-4 w-4" />
                    Analytics
                  </Button>
                </Link>
              </>
            )}

            {/* Admin specific links */}
            {isAdmin() && (
              <>
                <Link href="/dashboard/users">
                  <Button
                    variant={isActive("/dashboard/users") ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    User Management
                  </Button>
                </Link>

                <Link href="/dashboard/courses">
                  <Button
                    variant={isActive("/dashboard/courses") ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Course Management
                  </Button>
                </Link>

                <Link href="/dashboard/analytics">
                  <Button
                    variant={isActive("/dashboard/analytics") ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <BarChart className="mr-2 h-4 w-4" />
                    Analytics
                  </Button>
                </Link>
              </>
            )}

            <Link href="/dashboard/settings">
              <Button
                variant={isActive("/dashboard/settings") ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>

            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
