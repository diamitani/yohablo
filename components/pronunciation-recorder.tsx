"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, Square, Play, Volume2, RotateCw, Check, X, AlertCircle, Zap } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { AudioManager } from "@/lib/utils/audio-manager"

interface PronunciationRecorderProps {
  word: string
  referenceAudioUrl?: string
  provider?: string
  onResult?: (result: { score: number; passed: boolean }) => void
  onSkip?: () => void
}

export function PronunciationRecorder({
  word,
  referenceAudioUrl,
  provider = "elevenlabs",
  onResult,
  onSkip,
}: PronunciationRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPlayingReference, setIsPlayingReference] = useState(false)
  const [feedbackState, setFeedbackState] = useState<"none" | "checking" | "good" | "retry">("none")
  const [audioAvailable, setAudioAvailable] = useState<boolean | null>(null)
  const [audioLoading, setAudioLoading] = useState(false)
  const [audioError, setAudioError] = useState<string | null>(null)
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState<string | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const userAudioManagerRef = useRef<AudioManager | null>(null)
  const referenceAudioManagerRef = useRef<AudioManager | null>(null)

  const { toast } = useToast()

  // Initialize audio managers
  useEffect(() => {
    console.log(`[PronunciationRecorder] Initializing for word: ${word}`)

    // Create user audio manager
    userAudioManagerRef.current = new AudioManager({
      onEnded: () => setIsPlaying(false),
      onError: (error) => {
        console.error("[PronunciationRecorder] User audio error:", error)
        setIsPlaying(false)
        toast({
          title: "Playback Error",
          description: "Could not play your recording.",
          variant: "destructive",
        })
      },
    })

    // Create reference audio manager
    referenceAudioManagerRef.current = new AudioManager({
      onLoad: () => {
        console.log("[PronunciationRecorder] Reference audio loaded")
        setAudioAvailable(true)
        setAudioLoading(false)
        setAudioError(null)
      },
      onEnded: () => setIsPlayingReference(false),
      onError: (error) => {
        console.error("[PronunciationRecorder] Reference audio error:", error)
        setAudioAvailable(false)
        setAudioLoading(false)
        setAudioError(error)
      },
    })

    // Cleanup on unmount
    return () => {
      userAudioManagerRef.current?.destroy()
      referenceAudioManagerRef.current?.destroy()
    }
  }, [word])

  // Load reference audio when URL changes
  useEffect(() => {
    if (!referenceAudioManagerRef.current) return

    const loadReferenceAudio = async () => {
      // Use generated audio URL if available, otherwise use provided URL
      const audioUrlToUse = generatedAudioUrl || referenceAudioUrl

      if (audioUrlToUse) {
        setAudioLoading(true)
        setAudioError(null)
        console.log(`[PronunciationRecorder] Loading reference audio: ${audioUrlToUse}`)

        const success = await referenceAudioManagerRef.current!.setSrc(audioUrlToUse)

        if (!success) {
          console.warn("[PronunciationRecorder] Failed to load reference audio")
          setAudioAvailable(false)
          setAudioLoading(false)
          setAudioError("Audio format not supported")
        }
      } else {
        setAudioAvailable(null)
        setAudioLoading(false)
      }
    }

    loadReferenceAudio()
  }, [referenceAudioUrl, generatedAudioUrl])

  // Generate TTS audio for the word
  const generateTTSAudio = async () => {
    try {
      setAudioLoading(true)
      setAudioError(null)
      console.log(`[PronunciationRecorder] Generating TTS for word: ${word}`)

      const response = await fetch("/api/vocabulary-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word }),
      })

      const data = await response.json()

      if (data.success && data.audioUrl) {
        console.log(`[PronunciationRecorder] TTS generated: ${data.audioUrl}`)
        setGeneratedAudioUrl(data.audioUrl)

        toast({
          title: "Audio Generated",
          description: "Custom pronunciation generated successfully.",
          variant: "default",
        })
      } else {
        throw new Error(data.error || "Failed to generate audio")
      }
    } catch (error) {
      console.error("[PronunciationRecorder] TTS generation failed:", error)
      setAudioLoading(false)
      setAudioError("Failed to generate audio")
      toast({
        title: "Generation Failed",
        description: "Could not generate audio. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" })
        const audioUrl = URL.createObjectURL(audioBlob)

        setAudioBlob(audioBlob)
        setAudioUrl(audioUrl)

        // Load into user audio manager
        if (userAudioManagerRef.current) {
          await userAudioManagerRef.current.setSrc(audioUrl)
        }

        // Clean up stream tracks
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setFeedbackState("none")
      setAudioBlob(null)
      setAudioUrl(null)

      // Start timer
      let time = 0
      timerRef.current = setInterval(() => {
        time += 0.1
        setRecordingTime(time)

        // Auto-stop after 5 seconds
        if (time >= 5) {
          stopRecording()
        }
      }, 100)
    } catch (error) {
      console.error("[PronunciationRecorder] Recording error:", error)
      toast({
        title: "Microphone Access Error",
        description: "Please allow microphone access to record your pronunciation.",
        variant: "destructive",
      })
    }
  }

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }

  // Play recorded audio
  const playRecording = async () => {
    if (!userAudioManagerRef.current) return

    if (isPlaying) {
      userAudioManagerRef.current.pause()
      setIsPlaying(false)
    } else {
      // Stop reference audio if playing
      if (isPlayingReference && referenceAudioManagerRef.current) {
        referenceAudioManagerRef.current.pause()
        setIsPlayingReference(false)
      }

      const success = await userAudioManagerRef.current.play()
      if (success) {
        setIsPlaying(true)
      }
    }
  }

  // Play reference audio
  const playReference = async () => {
    if (!referenceAudioManagerRef.current || !audioAvailable) {
      toast({
        title: "No Audio Available",
        description: "Please generate audio first by clicking 'Generate Audio'.",
        variant: "warning",
      })
      return
    }

    if (isPlayingReference) {
      referenceAudioManagerRef.current.pause()
      setIsPlayingReference(false)
    } else {
      // Stop user recording if playing
      if (isPlaying && userAudioManagerRef.current) {
        userAudioManagerRef.current.pause()
        setIsPlaying(false)
      }

      const success = await referenceAudioManagerRef.current.play()
      if (success) {
        setIsPlayingReference(true)
      }
    }
  }

  // Check pronunciation (simulated)
  const checkPronunciation = () => {
    if (!audioBlob) return

    setFeedbackState("checking")

    // Simulate pronunciation checking with a delay
    setTimeout(() => {
      // Generate a score between 60-100 for demo purposes
      const score = Math.floor(Math.random() * 41) + 60
      const passed = score >= 75

      setFeedbackState(passed ? "good" : "retry")

      if (onResult) {
        onResult({ score, passed })
      }
    }, 1500)
  }

  // Reset recorder
  const resetRecorder = () => {
    setAudioBlob(null)
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
    }
    setAudioUrl(null)
    setFeedbackState("none")
    setRecordingTime(0)
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-card">
      <div className="flex items-center justify-between">
        <div className="text-lg font-medium">{word}</div>
        <div className="flex items-center gap-2">
          <span className="text-xs flex items-center gap-1 text-purple-500">
            <Zap className="h-3 w-3" />
            ElevenLabs AI
          </span>
          {audioAvailable === false && (
            <span className="text-xs text-amber-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Audio needed
            </span>
          )}
          {audioLoading && <span className="text-xs text-blue-500">Loading...</span>}
          <Button
            variant="ghost"
            size="icon"
            onClick={playReference}
            disabled={isRecording || audioLoading || !audioAvailable}
            aria-label="Play pronunciation"
          >
            <Volume2 className={cn("h-4 w-4", isPlayingReference && "text-primary")} />
          </Button>
          <Button variant="ghost" size="sm" onClick={generateTTSAudio} disabled={audioLoading} className="text-xs">
            {audioLoading ? "Generating..." : "Generate Audio"}
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        {/* Recording visualization */}
        <div className="w-full h-16 bg-muted rounded-md flex items-center justify-center overflow-hidden">
          {isRecording ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="recording-visualization">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="recording-bar bg-primary"
                    style={{
                      height: `${Math.random() * 70 + 30}%`,
                      animationDelay: `${i * 0.05}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          ) : audioUrl ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="waveform bg-primary/20 w-full h-12 rounded-md"></div>
            </div>
          ) : (
            <div className="text-muted-foreground">Record your pronunciation</div>
          )}
        </div>

        {/* Recording progress */}
        {isRecording && (
          <div className="w-full space-y-1">
            <Progress value={(recordingTime / 5) * 100} className="h-1" />
            <div className="text-xs text-right text-muted-foreground">{recordingTime.toFixed(1)}s / 5.0s</div>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center gap-2">
          {!audioUrl ? (
            <Button
              onClick={isRecording ? stopRecording : startRecording}
              variant={isRecording ? "destructive" : "default"}
              className="w-32"
              aria-label={isRecording ? "Stop recording" : "Start recording"}
            >
              {isRecording ? (
                <>
                  <Square className="mr-2 h-4 w-4" />
                  Stop
                </>
              ) : (
                <>
                  <Mic className="mr-2 h-4 w-4" />
                  Record
                </>
              )}
            </Button>
          ) : (
            <>
              <Button
                onClick={playRecording}
                variant="outline"
                size="icon"
                aria-label={isPlaying ? "Pause playback" : "Play recording"}
              >
                <Play className={cn("h-4 w-4", isPlaying && "text-primary")} />
              </Button>
              <Button onClick={resetRecorder} variant="outline" size="icon" aria-label="Reset recording">
                <RotateCw className="h-4 w-4" />
              </Button>
              <Button
                onClick={checkPronunciation}
                disabled={feedbackState === "checking"}
                className="w-32"
                aria-label="Check pronunciation"
              >
                {feedbackState === "checking" ? (
                  <span className="flex items-center">
                    <span className="loading-dots mr-2"></span>
                    Checking
                  </span>
                ) : (
                  "Check"
                )}
              </Button>
            </>
          )}

          <Button variant="ghost" onClick={onSkip} aria-label="Skip this word">
            Skip
          </Button>
        </div>

        {/* Feedback */}
        {feedbackState === "good" && (
          <div className="flex items-center gap-2 text-green-600 dark:text-green-500">
            <Check className="h-5 w-5" />
            <span>Great pronunciation!</span>
          </div>
        )}

        {feedbackState === "retry" && (
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500">
            <X className="h-5 w-5" />
            <span>Try again - listen to the correct pronunciation</span>
          </div>
        )}

        {audioError && <div className="text-xs text-red-500 text-center">{audioError}</div>}
      </div>
    </div>
  )
}
