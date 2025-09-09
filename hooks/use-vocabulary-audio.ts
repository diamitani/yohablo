"use client"

import { useState, useCallback, useEffect } from "react"
import { generateVocabularyAudio } from "@/app/api/tts/actions"
import { AudioManager } from "@/lib/utils/audio-manager"

interface UseVocabularyAudioProps {
  word: string
  providedAudioSrc?: string
}

// Create a mapping of common Spanish words to their audio files
const COMMON_WORDS_AUDIO: Record<string, string> = {
  rojo: "/audio/colors/rojo.mp3",
  azul: "/audio/colors/azul.mp3",
  verde: "/audio/colors/verde.mp3",
  amarillo: "/audio/colors/amarillo.mp3",
  negro: "/audio/colors/negro.mp3",
  blanco: "/audio/colors/blanco.mp3",
  morado: "/audio/colors/morado.mp3",
  rosa: "/audio/colors/rosa.mp3",
  gris: "/audio/colors/gris.mp3",
  marrón: "/audio/colors/marron.mp3",

  cero: "/audio/numbers/cero.mp3",
  uno: "/audio/numbers/uno.mp3",
  dos: "/audio/numbers/dos.mp3",
  tres: "/audio/numbers/tres.mp3",
  cuatro: "/audio/numbers/cuatro.mp3",
  cinco: "/audio/numbers/cinco.mp3",
  seis: "/audio/numbers/seis.mp3",
  siete: "/audio/numbers/siete.mp3",
  ocho: "/audio/numbers/ocho.mp3",
  nueve: "/audio/numbers/nueve.mp3",
  diez: "/audio/numbers/diez.mp3",
}

// Singleton audio manager to prevent multiple audio instances
let audioManager: AudioManager | null = null

export function useVocabularyAudio({ word, providedAudioSrc }: UseVocabularyAudioProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(providedAudioSrc || null)

  // Initialize audio manager
  useEffect(() => {
    if (!audioManager) {
      audioManager = new AudioManager({
        onPlay: () => setIsPlaying(true),
        onEnded: () => setIsPlaying(false),
        onError: (err) => {
          setError(err)
          setIsPlaying(false)
          setIsLoading(false)
        },
      })
    }

    return () => {
      // Don't destroy the audio manager on unmount as it's shared
    }
  }, [])

  const play = useCallback(async () => {
    try {
      if (!audioManager) {
        throw new Error("Audio manager not initialized")
      }

      setIsLoading(true)
      setError(null)

      let urlToPlay = audioUrl

      // First check if we have a pre-recorded audio file for this word
      const normalizedWord = word.toLowerCase().trim()
      if (COMMON_WORDS_AUDIO[normalizedWord]) {
        urlToPlay = COMMON_WORDS_AUDIO[normalizedWord]
        console.log(`[VocabularyAudio] Using pre-recorded audio for "${normalizedWord}": ${urlToPlay}`)
      }
      // If no pre-recorded audio and no provided URL, generate one
      else if (!urlToPlay) {
        console.log(`[VocabularyAudio] Generating audio for word: ${word}`)

        // For development, use a mock audio URL if TTS generation fails
        try {
          const result = await generateVocabularyAudio(word, "es-US-Neural2-B")

          if (result.success && result.audioUrl) {
            urlToPlay = result.audioUrl
            setAudioUrl(urlToPlay)
            console.log(`[VocabularyAudio] Generated audio URL: ${urlToPlay}`)
          } else {
            throw new Error(result.error || "Failed to generate audio")
          }
        } catch (err) {
          console.warn(`[VocabularyAudio] TTS generation failed, using fallback audio for "${word}"`)
          // Use a fallback audio file
          urlToPlay = "/audio/sample-word.mp3"
        }
      }

      if (urlToPlay) {
        // Set the audio source and play
        const loaded = await audioManager.setSrc(urlToPlay)
        if (loaded) {
          await audioManager.play()
        } else {
          throw new Error("Failed to load audio")
        }
      } else {
        throw new Error("No audio URL available")
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
