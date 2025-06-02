"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

// In a real implementation, this would connect to a database or cloud storage
// For now, we'll simulate storage with an in-memory array
const videoStorage: any[] = []

const videoMetadataSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  author: z.string(),
  school: z.string(),
  grade: z.string(),
  entryType: z.enum(["individual", "class"]),
  fileSize: z.number(),
  fileType: z.string(),
  duration: z.number().optional(),
  thumbnailUrl: z.string().optional(),
  dateSubmitted: z.string(),
  votes: z.number().default(0),
  views: z.number().default(0),
  rating: z.number().default(0),
  isWinner: z.boolean().default(false),
})

export type VideoMetadata = z.infer<typeof videoMetadataSchema>

export async function storeVideo(
  videoFile: File,
  metadata: Omit<
    VideoMetadata,
    "id" | "fileSize" | "fileType" | "dateSubmitted" | "votes" | "views" | "rating" | "isWinner"
  >,
) {
  try {
    // Generate a unique ID
    const id = Math.random().toString(36).substring(2, 15)

    // In a real implementation, this would upload the file to cloud storage
    // and generate a thumbnail

    // Create metadata record
    const videoMetadata: VideoMetadata = {
      id,
      ...metadata,
      fileSize: videoFile.size,
      fileType: videoFile.type,
      dateSubmitted: new Date().toISOString(),
      votes: 0,
      views: 0,
      rating: 0,
      isWinner: false,
      thumbnailUrl: `/placeholder.svg?height=720&width=1280&query=${encodeURIComponent(metadata.title)}`,
    }

    // Validate metadata
    videoMetadataSchema.parse(videoMetadata)

    // Store metadata
    videoStorage.push(videoMetadata)

    // Revalidate the contest page
    revalidatePath("/contest")

    return { success: true, videoId: id }
  } catch (error) {
    console.error("Error storing video:", error)
    return { success: false, error: "Failed to store video" }
  }
}

export async function getVideos(filter?: string) {
  // In a real implementation, this would query the database

  if (filter === "individual") {
    return videoStorage.filter((video) => video.entryType === "individual")
  }

  if (filter === "class") {
    return videoStorage.filter((video) => video.entryType === "class")
  }

  if (filter === "winners") {
    return videoStorage.filter((video) => video.isWinner)
  }

  return videoStorage
}

export async function voteForVideo(videoId: string) {
  // In a real implementation, this would update the database

  const videoIndex = videoStorage.findIndex((video) => video.id === videoId)

  if (videoIndex === -1) {
    return { success: false, error: "Video not found" }
  }

  videoStorage[videoIndex].votes += 1

  // Revalidate the contest page
  revalidatePath("/contest")

  return { success: true }
}

export async function markAsWinner(videoId: string) {
  // In a real implementation, this would update the database

  const videoIndex = videoStorage.findIndex((video) => video.id === videoId)

  if (videoIndex === -1) {
    return { success: false, error: "Video not found" }
  }

  videoStorage[videoIndex].isWinner = true

  // Revalidate the contest page
  revalidatePath("/contest")

  return { success: true }
}
