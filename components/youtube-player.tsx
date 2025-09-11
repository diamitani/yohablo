"use client"

import { useState, useRef, useEffect } from "react"
import { Play, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface YouTubePlayerProps {
  videoId: string
  title: string
  className?: string
  autoplay?: boolean
  thumbnail?: string
}

export function YouTubePlayer({ videoId, title, className, autoplay = false, thumbnail }: YouTubePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Auto-hide controls after 3 seconds of no mouse movement
  const handleMouseMove = () => {
    setShowControls(true)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (isPlaying) {
      timeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
  }

  const handlePlay = () => {
    setIsPlaying(true)
    setIsLoaded(true)
  }

  const getThumbnailUrl = () => {
    if (thumbnail) return thumbnail
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }

  const getEmbedUrl = () => {
    const params = new URLSearchParams({
      autoplay: autoplay ? "1" : "0",
      rel: "0",
      modestbranding: "1",
      fs: "1",
      cc_load_policy: "0",
      iv_load_policy: "3",
      autohide: "0",
    })
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  if (!isLoaded) {
    return (
      <div
        ref={containerRef}
        className={cn("relative aspect-video bg-black rounded-xl overflow-hidden group cursor-pointer", className)}
        onClick={handlePlay}
        onMouseMove={handleMouseMove}
      >
        {/* Thumbnail */}
        <img
          src={getThumbnailUrl() || "/placeholder.svg"}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            // Fallback to default thumbnail if maxres fails
            const target = e.target as HTMLImageElement
            target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-2xl transform transition-all duration-300 group-hover:scale-110">
            <Play className="h-8 w-8 ml-1" fill="currentColor" />
          </div>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
          <p className="text-white/80 text-sm">Click to play video lesson</p>
        </div>

        {/* YouTube logo */}
        <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">YouTube</div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative aspect-video bg-black rounded-xl overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      <iframe
        src={getEmbedUrl()}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
        onLoad={() => setIsLoaded(true)}
      />

      {/* Custom controls overlay (optional) */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300">
          <div className="flex items-center gap-4 text-white">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-white hover:bg-white/20"
              onClick={() => window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank")}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Watch on YouTube
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
