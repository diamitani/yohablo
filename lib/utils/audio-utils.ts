// Audio utilities for caching and playback
export const AUDIO_CACHE_PREFIX = "yo-hablo-audio-cache:"

// Save audio to IndexedDB
export async function cacheAudio(word: string, audioBlob: Blob): Promise<void> {
  try {
    // Check if IndexedDB is available
    if (!("indexedDB" in window)) {
      console.warn("IndexedDB not available for audio caching")
      return
    }

    const cacheKey = `${AUDIO_CACHE_PREFIX}${word.toLowerCase()}`

    // Open a connection to IndexedDB
    const db = await new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open("YoHabloAudioCache", 1)

      request.onerror = () => reject(request.error)

      request.onupgradeneeded = () => {
        const db = request.result
        if (!db.objectStoreNames.contains("audioFiles")) {
          db.createObjectStore("audioFiles")
        }
      }

      request.onsuccess = () => resolve(request.result)
    })

    // Store the audio blob
    const transaction = db.transaction(["audioFiles"], "readwrite")
    const store = transaction.objectStore("audioFiles")
    await new Promise<void>((resolve, reject) => {
      const request = store.put(audioBlob, cacheKey)
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })

    console.log(`Audio cached for: ${word}`)
  } catch (error) {
    console.error("Error caching audio:", error)
  }
}

// Get cached audio from IndexedDB
export async function getCachedAudio(word: string): Promise<Blob | null> {
  try {
    // Check if IndexedDB is available
    if (!("indexedDB" in window)) {
      console.warn("IndexedDB not available for audio retrieval")
      return null
    }

    const cacheKey = `${AUDIO_CACHE_PREFIX}${word.toLowerCase()}`

    // Open a connection to IndexedDB
    const db = await new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open("YoHabloAudioCache", 1)
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })

    // Retrieve the audio blob
    const transaction = db.transaction(["audioFiles"], "readonly")
    const store = transaction.objectStore("audioFiles")

    const audioBlob = await new Promise<Blob | null>((resolve, reject) => {
      const request = store.get(cacheKey)
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result || null)
    })

    return audioBlob
  } catch (error) {
    console.error("Error retrieving cached audio:", error)
    return null
  }
}

// Create an object URL from a blob
export function createAudioUrl(blob: Blob): string {
  return URL.createObjectURL(blob)
}

// Check if audio file exists
export async function checkAudioExists(url: string): Promise<boolean> {
  if (!url) return false

  try {
    const response = await fetch(url, { method: "HEAD" })
    return response.ok
  } catch (error) {
    console.error(`Error checking if audio exists at ${url}:`, error)
    return false
  }
}
