import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Image src="/yo-hablo-logo.png" alt="Yo Hablo Logo" width={140} height={40} className="h-10 w-auto" />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Learn Spanish through hip hop and music. An educational platform for students, youth, and schools.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-2 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-medium">Navigation</h3>
              <nav className="mt-4 flex flex-col space-y-2">
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Home
                </Link>
                <Link href="/lessons" className="text-sm text-muted-foreground hover:text-foreground">
                  Lessons
                </Link>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About
                </Link>
                <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
                  Dashboard
                </Link>
              </nav>
            </div>
            <div>
              <h3 className="text-lg font-medium">Resources</h3>
              <nav className="mt-4 flex flex-col space-y-2">
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Worksheets
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Videos
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </nav>
            </div>
            <div>
              <h3 className="text-lg font-medium">Contact</h3>
              <nav className="mt-4 flex flex-col space-y-2">
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Email Us
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Social Media
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Support
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Yo Hablo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
