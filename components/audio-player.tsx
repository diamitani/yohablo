"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface AudioPlayerProps {
  src: string
  title?: string
  className?: string
  size?: "sm" | "md" | "lg"
  showTitle?: boolean
  autoPlay?: boolean
}

export function AudioPlayer({
  src,
  title,
  className,
  size = "md",
  showTitle = true,
  autoPlay = false,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadStart = () => setIsLoading(true)
    const handleCanPlay = () => setIsLoading(false)
    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
      setIsLoading(false)
    }
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleEnded = () => setIsPlaying(false)
    const handleError = () => {
      setError("Failed to load audio")
      setIsLoading(false)
    }

    audio.addEventListener("loadstart", handleLoadStart)
    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)

    return () => {
      audio.removeEventListener("loadstart", handleLoadStart)
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
    }
  }, [src])

  const togglePlayPause = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        await audio.play()
        setIsPlaying(true)
      }
    } catch (err) {
      setError("Failed to play audio")
      setIsPlaying(false)
    }
  }

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current
    if (!audio || !duration) return

    const newTime = (value[0] / 100) * duration
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const restart = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = 0
    setCurrentTime(0)
  }

  const formatTime = (time: number) => {
    if (!time || !isFinite(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  const sizeClasses = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  }

  if (error) {
    return (
      <div className={cn("bg-red-50 border border-red-200 rounded-lg p-4", className)}>
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    )
  }

  return (
    <div className={cn("bg-white border rounded-lg shadow-sm", sizeClasses[size], className)}>
      <audio ref={audioRef} src={src} preload="metadata" />

      {showTitle && title && (
        <div className="mb-3">
          <h4 className="font-medium text-gray-900 truncate">{title}</h4>
        </div>
      )}

      <div className="space-y-3">
        {/* Progress */}
        <div className="space-y-1">
          <Slider
            value={[progress]}
            onValueChange={handleSeek}
            max={100}
            step={0.1}
            className="w-full"
            disabled={isLoading || !duration}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" onClick={restart} disabled={isLoading}>
            <RotateCcw className="h-4 w-4" />
          </Button>

          <Button onClick={togglePlayPause} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            ) : isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
