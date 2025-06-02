"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Mode = "classic" | "ai"

interface ModeContextType {
  mode: Mode
  setMode: (mode: Mode) => void
}

const ModeContext = createContext<ModeContextType | undefined>(undefined)

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>("classic")

  // Load mode from localStorage on client side
  useEffect(() => {
    const savedMode = localStorage.getItem("yo-hablo-mode") as Mode | null
    if (savedMode) {
      setMode(savedMode)
    }
  }, [])

  // Save mode to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("yo-hablo-mode", mode)
  }, [mode])

  return <ModeContext.Provider value={{ mode, setMode }}>{children}</ModeContext.Provider>
}

export function useMode() {
  const context = useContext(ModeContext)
  if (context === undefined) {
    throw new Error("useMode must be used within a ModeProvider")
  }
  return context
}
