"use server"

import { revalidatePath } from "next/cache"

interface ContestSubmission {
  studentName: string
  email: string
  songTitle: string
  lyrics: string
  videoFile?: File
}

interface SubmissionResponse {
  success: boolean
  submissionId?: string
  error?: string
}

interface ContestEntry {
  id: string
  studentName: string
  songTitle: string
  lyrics: string
  videoUrl?: string
  submittedAt: string
  status: string
  votes: number
  isWinner?: boolean
}

export async function submitContestEntry(formData: FormData): Promise<SubmissionResponse> {
  try {
    const studentName = formData.get("studentName") as string
    const email = formData.get("email") as string
    const songTitle = formData.get("songTitle") as string
    const lyrics = formData.get("lyrics") as string
    const videoFile = formData.get("videoFile") as File

    // Validate required fields
    if (!studentName || !email || !songTitle || !lyrics) {
      return {
        success: false,
        error: "All fields are required",
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      }
    }

    // Generate submission ID
    const submissionId = `contest-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    console.log("Contest submission received:", {
      submissionId,
      studentName,
      email,
      songTitle,
      lyricsLength: lyrics.length,
      hasVideo: !!videoFile,
    })

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Revalidate contest page to show new submission
    revalidatePath("/contest")

    return {
      success: true,
      submissionId,
    }
  } catch (error) {
    console.error("Error submitting contest entry:", error)
    return {
      success: false,
      error: `Failed to submit entry: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

export async function submitVideoEntry(formData: FormData): Promise<SubmissionResponse> {
  try {
    const studentName = formData.get("studentName") as string
    const email = formData.get("email") as string
    const songTitle = formData.get("songTitle") as string
    const videoFile = formData.get("videoFile") as File

    // Validate required fields
    if (!studentName || !email || !songTitle || !videoFile) {
      return {
        success: false,
        error: "All fields including video are required",
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      }
    }

    // Validate video file
    if (!videoFile.type.startsWith("video/")) {
      return {
        success: false,
        error: "Please upload a valid video file",
      }
    }

    // Generate submission ID
    const submissionId = `video-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    console.log("Video submission received:", {
      submissionId,
      studentName,
      email,
      songTitle,
      videoSize: videoFile.size,
      videoType: videoFile.type,
    })

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Revalidate contest page
    revalidatePath("/contest")

    return {
      success: true,
      submissionId,
    }
  } catch (error) {
    console.error("Error submitting video entry:", error)
    return {
      success: false,
      error: `Failed to submit video: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

export async function getContestSubmissions(): Promise<{ success: boolean; submissions?: any[]; error?: string }> {
  try {
    // In a real app, this would fetch from a database
    const submissions = [
      {
        id: "1",
        studentName: "María González",
        songTitle: "Los Colores del Mundo",
        submittedAt: "2024-01-15",
        status: "approved",
        votes: 45,
      },
      {
        id: "2",
        studentName: "Carlos Rodríguez",
        songTitle: "Mi Familia Española",
        submittedAt: "2024-01-14",
        status: "pending",
        votes: 32,
      },
      {
        id: "3",
        studentName: "Ana López",
        songTitle: "Números en Español",
        submittedAt: "2024-01-13",
        status: "approved",
        votes: 67,
      },
    ]

    return {
      success: true,
      submissions,
    }
  } catch (error) {
    console.error("Error getting contest submissions:", error)
    return {
      success: false,
      error: `Failed to get submissions: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

export async function getContestEntries(): Promise<{ success: boolean; entries?: ContestEntry[]; error?: string }> {
  try {
    // Mock contest entries data
    const entries: ContestEntry[] = [
      {
        id: "entry-1",
        studentName: "María González",
        songTitle: "Los Colores del Mundo",
        lyrics: "Rojo como el fuego, azul como el mar...",
        videoUrl: "/videos/music-background.mp4",
        submittedAt: "2024-01-15",
        status: "approved",
        votes: 45,
        isWinner: false,
      },
      {
        id: "entry-2",
        studentName: "Carlos Rodríguez",
        songTitle: "Mi Familia Española",
        lyrics: "Mi papá es alto, mi mamá es bella...",
        submittedAt: "2024-01-14",
        status: "approved",
        votes: 32,
        isWinner: false,
      },
      {
        id: "entry-3",
        studentName: "Ana López",
        songTitle: "Números en Español",
        lyrics: "Uno, dos, tres, vamos a contar...",
        submittedAt: "2024-01-13",
        status: "approved",
        votes: 67,
        isWinner: true,
      },
    ]

    return {
      success: true,
      entries,
    }
  } catch (error) {
    console.error("Error getting contest entries:", error)
    return {
      success: false,
      error: `Failed to get entries: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

export async function voteForEntry(entryId: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (!entryId) {
      return {
        success: false,
        error: "Entry ID is required",
      }
    }

    console.log(`Voting for entry: ${entryId}`)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 500))

    // In a real app, this would update the database
    // For now, just log the vote

    // Revalidate contest pages
    revalidatePath("/contest")
    revalidatePath("/admin/contest")

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error voting for entry:", error)
    return {
      success: false,
      error: `Failed to vote: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

export async function selectWinner(entryId: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (!entryId) {
      return {
        success: false,
        error: "Entry ID is required",
      }
    }

    console.log(`Selecting winner: ${entryId}`)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, this would update the database to mark the winner
    // For now, just log the selection

    // Revalidate contest pages
    revalidatePath("/contest")
    revalidatePath("/admin/contest")

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error selecting winner:", error)
    return {
      success: false,
      error: `Failed to select winner: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

export async function updateSubmissionStatus(
  submissionId: string,
  status: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate inputs
    if (!submissionId || !status) {
      return {
        success: false,
        error: "Submission ID and status are required",
      }
    }

    const validStatuses = ["pending", "approved", "rejected"]
    if (!validStatuses.includes(status)) {
      return {
        success: false,
        error: "Invalid status",
      }
    }

    console.log(`Updating submission ${submissionId} to status: ${status}`)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Revalidate admin pages
    revalidatePath("/admin/contest")
    revalidatePath("/contest")

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error updating submission status:", error)
    return {
      success: false,
      error: `Failed to update status: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}
