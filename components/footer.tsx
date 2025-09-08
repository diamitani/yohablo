"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/yo-hablo-logo.png"
                alt="Yo Hablo"
                width={120}
                height={32}
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">
              Revolutionary Spanish learning through hip-hop music. Making language learning engaging and effective.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Learning */}
          <div>
            <h3 className="font-semibold text-white mb-4">Learning</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/lessons" className="hover:text-white transition-colors">
                  Browse Lessons
                </Link>
              </li>
              <li>
                <Link href="/worksheets" className="hover:text-white transition-colors">
                  Worksheets
                </Link>
              </li>
              <li>
                <Link href="/flashcards" className="hover:text-white transition-colors">
                  Flashcards
                </Link>
              </li>
              <li>
                <Link href="/contest" className="hover:text-white transition-colors">
                  Song Contest
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-white mb-4">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/register/teacher" className="hover:text-white transition-colors">
                  For Teachers
                </Link>
              </li>
              <li>
                <Link href="/register/student" className="hover:text-white transition-colors">
                  For Students
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:support@yohablo.com"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Contact Us
                </a>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {currentYear} Yo Hablo. All rights reserved. Made with ❤️ for Spanish learners.
          </p>
        </div>
      </div>
    </footer>
  )
}
