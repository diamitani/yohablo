import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeProvider } from "@/components/mode-provider"
import { Toaster } from "@/components/ui/toaster"
import { SafeEthereumProvider } from "@/components/safe-ethereum-provider"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Yo Hablo - Learn Spanish through Hip Hop",
  description: "Learn Spanish through hip hop music and interactive lessons",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SafeEthereumProvider>
            <AuthProvider>
              <ModeProvider>
                <div className="flex min-h-screen flex-col">
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
                <Toaster />
              </ModeProvider>
            </AuthProvider>
          </SafeEthereumProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
