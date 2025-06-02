"use client"

import { useState, useCallback } from "react"
import { generateVocabularyAudio } from "@/app/api/tts/actions"

interface UseVocabularyAudioProps {
  word: string
  providedAudioSrc?: string
}

export function useVocabularyAudio({ word, providedAudioSrc }: UseVocabularyAudioProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(providedAudioSrc || null)

  const play = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      let urlToPlay = audioUrl

      // If no audio URL, generate one using Google TTS
      if (!urlToPlay) {
        console.log(`[VocabularyAudio] Generating audio for word: ${word}`)
        const result = await generateVocabularyAudio(word, "es-US-Neural2-B")

        if (result.success && result.audioUrl) {
          urlToPlay = result.audioUrl
          setAudioUrl(urlToPlay)
          console.log(`[VocabularyAudio] Generated audio URL: ${urlToPlay}`)
        } else {
          throw new Error(result.error || "Failed to generate audio with Google TTS")
        }
      }

      if (urlToPlay) {
        setIsPlaying(true)
        const audio = new Audio(urlToPlay)

        audio.onended = () => {
          setIsPlaying(false)
        }

        audio.onerror = () => {
          setIsPlaying(false)
          setError("Failed to play audio")
        }

        await audio.play()
      }
    } catch (err) {
      console.error("[VocabularyAudio] Error playing audio:", err)
      setError(err instanceof Error ? err.message : "Failed to play audio")
      setIsPlaying(false)
    } finally {
      setIsLoading(false)
    }
  }, [word, audioUrl])

  return {
    isPlaying,
    isLoading,
    error,
    play,
  }
}
