import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { FlashcardProgress } from "../types/flashcard"

interface FlashcardState {
  // Progress data
  progress: Record<string, FlashcardProgress>

  // Filter state
  filterMode: "all" | "category" | "level"
  selectedCategory: string
  selectedSubcategory: string
  selectedLevel: string

  // Actions
  updateProgress: (flashcardId: string, correct: boolean) => void
  resetProgress: (flashcardIds?: string[]) => void
  setFilterMode: (mode: "all" | "category" | "level") => void
  setSelectedCategory: (category: string) => void
  setSelectedSubcategory: (subcategory: string) => void
  setSelectedLevel: (level: string) => void
}

export const useFlashcardStore = create<FlashcardState>()(
  persist(
    (set, get) => ({
      // Initial state
      progress: {},
      filterMode: "all",
      selectedCategory: "all",
      selectedSubcategory: "all",
      selectedLevel: "all",

      // Update progress for a flashcard
      updateProgress: (flashcardId, correct) => {
        const { progress } = get()
        const now = new Date().toISOString()

        // Get current progress or create new entry
        const currentProgress = progress[flashcardId] || {
          id: crypto.randomUUID(),
          flashcardId,
          level: 0,
          nextReview: now,
        }

        // Calculate new level based on correctness
        let newLevel = currentProgress.level
        if (correct) {
          newLevel = Math.min(5, newLevel + 1)
        } else {
          newLevel = Math.max(0, newLevel - 1)
        }

        // Calculate next review time based on level
        let nextReview = new Date()
        switch (newLevel) {
          case 1:
            nextReview = new Date(Date.now() + 1 * 60 * 60 * 1000) // 1 hour
            break
          case 2:
            nextReview = new Date(Date.now() + 6 * 60 * 60 * 1000) // 6 hours
            break
          case 3:
            nextReview = new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day
            break
          case 4:
            nextReview = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days
            break
          case 5:
            nextReview = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 1 week
            break
          default:
            nextReview = new Date() // Now
        }

        // Update progress
        set({
          progress: {
            ...progress,
            [flashcardId]: {
              ...currentProgress,
              level: newLevel,
              nextReview: nextReview.toISOString(),
              lastReviewed: now,
            },
          },
        })
      },

      // Reset progress for specific flashcards or all
      resetProgress: (flashcardIds) => {
        const { progress } = get()

        if (!flashcardIds) {
          // Reset all progress
          set({ progress: {} })
          return
        }

        // Reset specific flashcards
        const newProgress = { ...progress }
        flashcardIds.forEach((id) => {
          delete newProgress[id]
        })

        set({ progress: newProgress })
      },

      // Set filter mode
      setFilterMode: (mode) => set({ filterMode: mode }),

      // Set selected category
      setSelectedCategory: (category) =>
        set({
          selectedCategory: category,
          // Reset subcategory when changing category
          selectedSubcategory: "all",
        }),

      // Set selected subcategory
      setSelectedSubcategory: (subcategory) => set({ selectedSubcategory: subcategory }),

      // Set selected level
      setSelectedLevel: (level) => set({ selectedLevel: level }),
    }),
    {
      name: "yo-hablo-flashcard-storage",
    },
  ),
)
