"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface VocabularyAudioProps {
  word: string
  audioSrc?: string
  size?: "sm" | "md" | "lg"
  className?: string
  showWord?: boolean
}

export function VocabularyAudio({ word, audioSrc, size = "sm", className, showWord = false }: VocabularyAudioProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const playAudio = async () => {
    if (isPlaying || isLoading) return

    setIsLoading(true)
    setError(false)

    try {
      let audio: HTMLAudioElement

      if (audioSrc) {
        // Try provided audio file first
        audio = new Audio(audioSrc)
        await new Promise((resolve, reject) => {
          audio.onloadeddata = resolve
          audio.onerror = reject
          audio.load()
        })
      } else {
        // Try TTS as fallback
        const response = await fetch("/api/vocabulary-audio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ word }),
        })

        if (!response.ok) throw new Error("TTS failed")

        const audioBlob = await response.blob()
        const audioUrl = URL.createObjectURL(audioBlob)
        audio = new Audio(audioUrl)
      }

      setIsPlaying(true)
      await audio.play()

      audio.onended = () => {
        setIsPlaying(false)
        if (!audioSrc) URL.revokeObjectURL(audio.src)
      }
    } catch (err) {
      console.warn("Audio failed:", err)
      setError(true)

      // Fallback beep
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)

        oscillator.start()
        oscillator.stop(audioContext.currentTime + 0.2)

        setIsPlaying(true)
        setTimeout(() => setIsPlaying(false), 200)
      } catch {
        // Silent fail
      }
    } finally {
      setIsLoading(false)
    }
  }

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  }

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={playAudio}
        disabled={isLoading}
        className={cn(
          sizeClasses[size],
          "rounded-full border-2",
          isPlaying && "bg-blue-100 border-blue-400",
          error && "border-red-300",
        )}
        title={`Play pronunciation of "${word}"`}
      >
        {isLoading ? (
          <Loader2 className={cn(iconSizes[size], "animate-spin")} />
        ) : error ? (
          <VolumeX className={cn(iconSizes[size], "text-red-500")} />
        ) : (
          <Volume2 className={cn(iconSizes[size], isPlaying ? "text-blue-600" : "text-gray-600")} />
        )}
      </Button>

      {showWord && <span className="text-sm font-medium text-gray-700">{word}</span>}
    </div>
  )
}
