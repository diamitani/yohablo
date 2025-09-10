"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, User, LogOut } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()

  const navigation = [
    { name: "Lessons", href: "/lessons" },
    { name: "Worksheets", href: "/worksheets" },
    { name: "Contest", href: "/contest" },
    { name: "About", href: "/about" },
  ]

  const handleLogout = () => {
    logout()
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/yo-hablo-logo.png" alt="Yo Hablo" width={40} height={40} className="rounded-lg" />
            <span className="text-xl font-bold">Yo Hablo</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/dashboard">
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/register/student">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 mt-6">
                <div className="flex items-center space-x-2">
                  <Image src="/yo-hablo-logo.png" alt="Yo Hablo" width={32} height={32} className="rounded-lg" />
                  <span className="text-lg font-bold">Yo Hablo</span>
                </div>

                <nav className="flex flex-col space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-sm font-medium transition-colors hover:text-primary py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                <div className="border-t pt-6">
                  {user ? (
                    <div className="flex flex-col space-y-3">
                      <Button asChild variant="ghost" className="justify-start">
                        <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                          <User className="h-4 w-4 mr-2" />
                          Dashboard
                        </Link>
                      </Button>
                      <Button variant="outline" className="justify-start bg-transparent" onClick={handleLogout}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-3">
                      <Button asChild variant="ghost" className="justify-start">
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                          Login
                        </Link>
                      </Button>
                      <Button asChild className="justify-start">
                        <Link href="/register/student" onClick={() => setIsOpen(false)}>
                          Sign Up Free
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
