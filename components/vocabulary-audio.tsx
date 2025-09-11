"use client"

import { Volume2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useVocabularyAudio } from "@/hooks/use-vocabulary-audio"
import { ErrorBoundary } from "react-error-boundary"

interface VocabularyAudioProps {
  word: string
  audioSrc?: string
}

function AudioFallback({ error }: { error: Error }) {
  return (
    <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full text-destructive" disabled>
      <Volume2 className="h-3 w-3" />
      <span className="sr-only">Audio error</span>
    </Button>
  )
}

export function VocabularyAudio({ word, audioSrc }: VocabularyAudioProps) {
  const { isPlaying, isLoading, play, error } = useVocabularyAudio({
    word,
    providedAudioSrc: audioSrc,
  })

  return (
    <ErrorBoundary FallbackComponent={AudioFallback}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full"
              onClick={play}
              disabled={isLoading}
              aria-label={`Hear pronunciation for ${word}`}
            >
              {isLoading ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Volume2 className={`h-3 w-3 ${isPlaying ? "text-primary" : ""}`} />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{error ? "Error playing audio" : "Hear pronunciation"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </ErrorBoundary>
  )
}
