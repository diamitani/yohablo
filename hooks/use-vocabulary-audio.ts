"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { generateVocabularyAudio } from "@/app/api/tts/actions"

interface UseVocabularyAudioProps {
  word: string
  providedAudioSrc?: string
}

// Pre-recorded audio mapping for common words
const AUDIO_FILES: Record<string, string> = {
  // Colors
  rojo: "/audio/colors/rojo.mp3",
  azul: "/audio/colors/azul.mp3",
  verde: "/audio/colors/verde.mp3",
  amarillo: "/audio/colors/amarillo.mp3",
  negro: "/audio/colors/negro.mp3",
  blanco: "/audio/colors/blanco.mp3",
  morado: "/audio/colors/morado.mp3",
  rosa: "/audio/colors/rosa.mp3",
  rosado: "/audio/colors/rosado.mp3",
  gris: "/audio/colors/gris.mp3",
  marrón: "/audio/colors/marron.mp3",
  anaranjado: "/audio/colors/anaranjado.mp3",

  // Numbers
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

  // Basic vocabulary
  hola: "/audio/basic/hola.mp3",
  adiós: "/audio/basic/adios.mp3",
  gracias: "/audio/basic/gracias.mp3",
  "por favor": "/audio/basic/por-favor.mp3",
  sí: "/audio/basic/si.mp3",
  no: "/audio/basic/no.mp3",
}

export function useVocabularyAudio({ word, providedAudioSrc }: UseVocabularyAudioProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(providedAudioSrc || null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
        audioRef.current = null
      }
    }
  }, [])

  const play = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }

      let urlToPlay = audioUrl

      // Check if we have a pre-recorded file for this word
      const normalizedWord = word.toLowerCase().trim()
      if (AUDIO_FILES[normalizedWord]) {
        urlToPlay = AUDIO_FILES[normalizedWord]
        console.log(`[VocabularyAudio] Using pre-recorded audio for "${normalizedWord}": ${urlToPlay}`)
      }
      // If no pre-recorded audio and no provided URL, generate one
      else if (!urlToPlay) {
        console.log(`[VocabularyAudio] Generating audio for word: ${word}`)

        try {
          const result = await generateVocabularyAudio(word, "es-US", "es-US-Neural2-A")

          if (result.success && result.audioUrl) {
            urlToPlay = result.audioUrl
            setAudioUrl(urlToPlay)
            console.log(`[VocabularyAudio] Generated audio successfully`)
          } else {
            throw new Error(result.error || "Failed to generate audio")
          }
        } catch (genError) {
          console.warn(`[VocabularyAudio] TTS generation failed for "${word}":`, genError)
          // Use a fallback beep sound
          await playBeepSound()
          return
        }
      }

      if (urlToPlay) {
        // Create new audio element
        const audio = new Audio()
        audioRef.current = audio

        // Set up event listeners
        audio.addEventListener("loadstart", () => {
          console.log(`[VocabularyAudio] Loading audio for "${word}"`)
        })

        audio.addEventListener("canplaythrough", () => {
          console.log(`[VocabularyAudio] Audio ready for "${word}"`)
        })

        audio.addEventListener("play", () => {
          setIsPlaying(true)
          console.log(`[VocabularyAudio] Playing audio for "${word}"`)
        })

        audio.addEventListener("ended", () => {
          setIsPlaying(false)
          console.log(`[VocabularyAudio] Audio ended for "${word}"`)
        })

        audio.addEventListener("pause", () => {
          setIsPlaying(false)
        })

        audio.addEventListener("error", (e) => {
          console.error(`[VocabularyAudio] Audio error for "${word}":`, e)
          setIsPlaying(false)
          setError("Failed to play audio")
        })

        // Set source and play
        audio.src = urlToPlay
        audio.load()

        // Wait a bit for the audio to load, then play
        setTimeout(async () => {
          try {
            await audio.play()
          } catch (playError) {
            console.error(`[VocabularyAudio] Play error for "${word}":`, playError)
            setError("Failed to play audio")
            setIsPlaying(false)
          }
        }, 100)
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

  // Fallback beep sound using Web Audio API
  const playBeepSound = useCallback(async () => {
    try {
      setIsPlaying(true)

      // Create audio context
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

      // Create oscillator for beep sound
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      // Connect nodes
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      // Configure beep sound
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime) // 800Hz tone
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime) // Volume

      // Play for 200ms
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.2)

      // Clean up after beep
      setTimeout(() => {
        setIsPlaying(false)
        audioContext.close()
      }, 250)

      console.log(`[VocabularyAudio] Played fallback beep for "${word}"`)
    } catch (beepError) {
      console.error(`[VocabularyAudio] Beep fallback failed:`, beepError)
      setIsPlaying(false)
    }
  }, [word])

  return {
    isPlaying,
    isLoading,
    error,
    play,
  }
}
