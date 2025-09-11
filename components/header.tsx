"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, User, LogIn, UserPlus } from "lucide-react" // Added Music2

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const pathname = usePathname()
  const { user, isStudent, isTeacher, logout, isAuthenticated } = useAuth() // Added isAuthenticated

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActive = (path: string) => {
    // Handle base path and specific paths
    if (path === "/") return pathname === path
    return pathname.startsWith(path)
  }

  const navLinks = [
    { href: "/lesson-plans", label: "Lesson Plans" },
    { href: "/lessons", label: "Browse Content" },
    { href: "/worksheets", label: "Worksheets" },
    { href: "/videos", label: "Videos" },
    { href: "/audio", label: "Audio" }, // Added Audio link
    { href: "/contest", label: "Song Contest" },
    { href: "/about", label: "About" },
  ]

  const teacherLinks = [{ href: "/create-lesson", label: "Create Content" }]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
          <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <Image
              src="/yo-hablo-logo.png"
              alt="Yo Hablo Logo"
              width={140}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>
          <nav className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive(link.href) ? "text-primary" : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated &&
              isTeacher() &&
              teacherLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive(link.href) ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {link.label}
                </Link>
              ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated && user ? ( // Check isAuthenticated as well
            <div className="hidden md:flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {user.name || user.email}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    <p className="text-xs leading-none text-muted-foreground capitalize">{user.role}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/login">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </Link>
              <Link href="/register/teacher">
                <Button size="sm" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Join as Teacher
                </Button>
              </Link>
            </div>
          )}

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background md:hidden">
          <div className="container py-4">
            <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={toggleMenu}>
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-primary",
                    isActive(link.href) ? "text-primary" : "text-muted-foreground",
                  )}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated &&
                isTeacher() &&
                teacherLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      isActive(link.href) ? "text-primary" : "text-muted-foreground",
                    )}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                ))}

              <div className="border-t pt-4 mt-4">
                {isAuthenticated && user ? (
                  <>
                    <div className="mb-4 p-2 bg-muted rounded">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      className={cn(
                        "block text-lg font-medium transition-colors hover:text-primary mb-4",
                        isActive("/dashboard") ? "text-primary" : "text-muted-foreground",
                      )}
                      onClick={closeMenu}
                    >
                      Dashboard
                    </Link>
                    <Button
                      variant="outline"
                      onClick={() => {
                        logout()
                        closeMenu()
                      }}
                      className="w-full justify-start"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Link href="/login" onClick={closeMenu}>
                      <Button variant="outline" className="w-full justify-start">
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                      </Button>
                    </Link>
                    <Link href="/register/teacher" onClick={closeMenu}>
                      <Button className="w-full justify-start">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Join as Teacher
                      </Button>
                    </Link>
                    <Link href="/register/student" onClick={closeMenu}>
                      <Button variant="outline" className="w-full justify-start">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Join as Student
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
