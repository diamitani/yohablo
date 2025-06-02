"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface SafeEthereumProviderProps {
  children: React.ReactNode
}

export function SafeEthereumProvider({ children }: SafeEthereumProviderProps) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Create a mock ethereum provider if it doesn't exist
    if (typeof window !== "undefined" && !window.ethereum) {
      // Create a simple mock that doesn't throw errors
      window.ethereum = {
        isMetaMask: false,
        request: async () => {
          console.log("Mock ethereum provider: No MetaMask installed")
          return null
        },
        on: () => {},
        removeListener: () => {},
      } as any
    }

    setIsReady(true)
  }, [])

  if (!isReady) {
    return null
  }

  return <>{children}</>
}
