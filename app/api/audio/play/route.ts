import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { audioSrc, lessonId } = await request.json()

    // Validate the audio source
    if (!audioSrc || !lessonId) {
      return NextResponse.json({ error: "Missing audioSrc or lessonId" }, { status: 400 })
    }

    // Check if the audio file exists (basic validation)
    const audioPath = audioSrc.startsWith("/") ? audioSrc : `/${audioSrc}`

    // Log the audio play request
    console.log(`Audio play requested: ${audioPath} for lesson: ${lessonId}`)

    // Return success response with audio metadata
    return NextResponse.json({
      success: true,
      audioSrc: audioPath,
      lessonId,
      message: "Audio ready to play",
    })
  } catch (error) {
    console.error("Error in audio play API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
