interface AudioManagerOptions {
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
  onError?: (error: string) => void
}

export class AudioManager {
  private audio: HTMLAudioElement | null = null
  private options: AudioManagerOptions

  constructor(options: AudioManagerOptions = {}) {
    this.options = options
  }

  async setSrc(src: string): Promise<boolean> {
    try {
      // Stop current audio if playing
      if (this.audio) {
        this.audio.pause()
        this.audio.currentTime = 0
      }

      // Create new audio element
      this.audio = new Audio(src)

      // Set up event listeners
      this.audio.addEventListener("play", () => {
        this.options.onPlay?.()
      })

      this.audio.addEventListener("pause", () => {
        this.options.onPause?.()
      })

      this.audio.addEventListener("ended", () => {
        this.options.onEnded?.()
      })

      this.audio.addEventListener("error", (e) => {
        const error = `Audio error: ${this.audio?.error?.message || "Unknown error"}`
        console.error(error, e)
        this.options.onError?.(error)
      })

      // Wait for audio to be ready
      return new Promise((resolve) => {
        if (!this.audio) {
          resolve(false)
          return
        }

        this.audio.addEventListener("canplaythrough", () => resolve(true), { once: true })
        this.audio.addEventListener("error", () => resolve(false), { once: true })

        // Load the audio
        this.audio.load()
      })
    } catch (error) {
      console.error("Error setting audio source:", error)
      this.options.onError?.(`Failed to set audio source: ${error}`)
      return false
    }
  }

  async play(): Promise<void> {
    if (!this.audio) {
      throw new Error("No audio source set")
    }

    try {
      await this.audio.play()
    } catch (error) {
      console.error("Error playing audio:", error)
      this.options.onError?.(`Failed to play audio: ${error}`)
      throw error
    }
  }

  pause(): void {
    if (this.audio) {
      this.audio.pause()
    }
  }

  stop(): void {
    if (this.audio) {
      this.audio.pause()
      this.audio.currentTime = 0
    }
  }

  setVolume(volume: number): void {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, volume))
    }
  }

  destroy(): void {
    if (this.audio) {
      this.audio.pause()
      this.audio.src = ""
      this.audio = null
    }
  }
}
