"use client"

export interface AudioManagerOptions {
  onLoad?: () => void
  onError?: (error: string) => void
  onEnded?: () => void
  onPlay?: () => void
  onPause?: () => void
}

export class AudioManager {
  private audio: HTMLAudioElement
  private isInitialized = false
  private currentSrc: string | null = null
  private retryCount = 0
  private maxRetries = 3

  constructor(private options: AudioManagerOptions = {}) {
    this.audio = new Audio()
    this.setupEventListeners()
  }

  private setupEventListeners() {
    this.audio.addEventListener("loadeddata", () => {
      console.log("[AudioManager] Audio loaded successfully")
      this.isInitialized = true
      this.retryCount = 0
      this.options.onLoad?.()
    })

    this.audio.addEventListener("canplaythrough", () => {
      console.log("[AudioManager] Audio can play through")
      this.isInitialized = true
      this.options.onLoad?.()
    })

    this.audio.addEventListener("error", (e) => {
      const error = this.audio.error
      const errorMessage = error
        ? `Audio error: ${error.code} - ${this.getErrorMessage(error.code)}`
        : "Unknown audio error"

      console.error("[AudioManager] Audio error:", errorMessage, e)

      // Try to recover from the error
      this.handleAudioError(errorMessage)
    })

    this.audio.addEventListener("ended", () => {
      console.log("[AudioManager] Audio playback ended")
      this.options.onEnded?.()
    })

    this.audio.addEventListener("play", () => {
      console.log("[AudioManager] Audio playback started")
      this.options.onPlay?.()
    })

    this.audio.addEventListener("pause", () => {
      console.log("[AudioManager] Audio playback paused")
      this.options.onPause?.()
    })

    this.audio.addEventListener("loadstart", () => {
      console.log("[AudioManager] Audio load started")
    })

    this.audio.addEventListener("stalled", () => {
      console.warn("[AudioManager] Audio loading stalled")
    })

    this.audio.addEventListener("suspend", () => {
      console.warn("[AudioManager] Audio loading suspended")
    })
  }

  private getErrorMessage(errorCode: number): string {
    switch (errorCode) {
      case 1:
        return "MEDIA_ERR_ABORTED - The user aborted the audio"
      case 2:
        return "MEDIA_ERR_NETWORK - A network error occurred"
      case 3:
        return "MEDIA_ERR_DECODE - An error occurred while decoding the audio"
      case 4:
        return "MEDIA_ERR_SRC_NOT_SUPPORTED - The audio format is not supported"
      default:
        return "Unknown error"
    }
  }

  private async handleAudioError(errorMessage: string) {
    console.log(`[AudioManager] Handling audio error (attempt ${this.retryCount + 1}/${this.maxRetries})`)

    if (this.retryCount < this.maxRetries && this.currentSrc) {
      this.retryCount++

      // Try different approaches based on error type
      if (errorMessage.includes("MEDIA_ERR_SRC_NOT_SUPPORTED")) {
        // Try to convert the source or use fallback
        await this.tryFallbackSource()
      } else if (errorMessage.includes("MEDIA_ERR_NETWORK")) {
        // Retry after a short delay for network errors
        setTimeout(() => {
          this.reloadAudio()
        }, 1000)
      } else {
        // For other errors, try fallback immediately
        await this.tryFallbackSource()
      }
    } else {
      // Max retries reached, report error
      this.options.onError?.(errorMessage)
    }
  }

  private async tryFallbackSource() {
    console.log("[AudioManager] Trying fallback audio source")

    // Try the sample audio as fallback
    const fallbackUrl = "/audio/sample-word.mp3"

    try {
      // Check if fallback exists
      const response = await fetch(fallbackUrl, { method: "HEAD" })
      if (response.ok) {
        console.log("[AudioManager] Using fallback audio")
        this.audio.src = fallbackUrl
        this.audio.load()
        return
      }
    } catch (error) {
      console.error("[AudioManager] Fallback audio also failed:", error)
    }

    // If fallback also fails, report the original error
    this.options.onError?.("Audio format not supported and fallback unavailable")
  }

  private reloadAudio() {
    if (this.currentSrc) {
      console.log("[AudioManager] Reloading audio")
      this.audio.src = this.currentSrc
      this.audio.load()
    }
  }

  async setSrc(src: string): Promise<boolean> {
    try {
      console.log(`[AudioManager] Setting audio source: ${src}`)

      // Reset state
      this.isInitialized = false
      this.currentSrc = src
      this.retryCount = 0

      // Validate the source URL
      if (!src || typeof src !== "string") {
        console.error("[AudioManager] Invalid audio source provided")
        return false
      }

      // Check if the source is accessible
      try {
        const response = await fetch(src, { method: "HEAD" })
        if (!response.ok) {
          console.warn(`[AudioManager] Audio source returned ${response.status}`)
          // Don't fail immediately, let the audio element try
        }
      } catch (fetchError) {
        console.warn("[AudioManager] Could not verify audio source:", fetchError)
        // Continue anyway, the audio element might still be able to load it
      }

      // Set source and load
      this.audio.src = src
      this.audio.load()

      // Wait for audio to load with timeout
      return new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("[AudioManager] Audio load timeout")
          resolve(false)
        }, 10000) // Increased timeout to 10 seconds

        const onLoad = () => {
          clearTimeout(timeout)
          this.audio.removeEventListener("loadeddata", onLoad)
          this.audio.removeEventListener("canplaythrough", onLoadThrough)
          this.audio.removeEventListener("error", onError)
          resolve(true)
        }

        const onLoadThrough = () => {
          clearTimeout(timeout)
          this.audio.removeEventListener("loadeddata", onLoad)
          this.audio.removeEventListener("canplaythrough", onLoadThrough)
          this.audio.removeEventListener("error", onError)
          resolve(true)
        }

        const onError = () => {
          clearTimeout(timeout)
          this.audio.removeEventListener("loadeddata", onLoad)
          this.audio.removeEventListener("canplaythrough", onLoadThrough)
          this.audio.removeEventListener("error", onError)
          resolve(false)
        }

        this.audio.addEventListener("loadeddata", onLoad)
        this.audio.addEventListener("canplaythrough", onLoadThrough)
        this.audio.addEventListener("error", onError)
      })
    } catch (error) {
      console.error("[AudioManager] Error setting source:", error)
      return false
    }
  }

  async play(): Promise<boolean> {
    try {
      if (!this.isInitialized) {
        console.warn("[AudioManager] Audio not initialized, cannot play")
        return false
      }

      console.log("[AudioManager] Starting playback")

      // Reset audio position if it's ended
      if (this.audio.ended) {
        this.audio.currentTime = 0
      }

      await this.audio.play()
      return true
    } catch (error) {
      console.error("[AudioManager] Playback error:", error)
      this.options.onError?.(error instanceof Error ? error.message : "Playback failed")
      return false
    }
  }

  pause() {
    try {
      this.audio.pause()
    } catch (error) {
      console.error("[AudioManager] Pause error:", error)
    }
  }

  stop() {
    try {
      this.audio.pause()
      this.audio.currentTime = 0
    } catch (error) {
      console.error("[AudioManager] Stop error:", error)
    }
  }

  get isPlaying(): boolean {
    return !this.audio.paused && !this.audio.ended
  }

  get duration(): number {
    return this.audio.duration || 0
  }

  get currentTime(): number {
    return this.audio.currentTime || 0
  }

  destroy() {
    try {
      this.audio.pause()
      this.audio.src = ""
      this.audio.load() // Reset the audio element
      this.isInitialized = false
      this.currentSrc = null
      this.retryCount = 0
    } catch (error) {
      console.error("[AudioManager] Destroy error:", error)
    }
  }
}
