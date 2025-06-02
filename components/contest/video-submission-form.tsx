"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Upload, X, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { submitVideoEntry } from "@/app/api/contest/actions"

const MAX_FILE_SIZE = 200 * 1024 * 1024 // 200MB for individual entries
const MAX_CLASS_FILE_SIZE = 500 * 1024 * 1024 // 500MB for class entries
const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/quicktime", "video/avi", "video/webm"]

const videoSubmissionSchema = z.object({
  entryType: z.enum(["individual", "class"], {
    required_error: "Please select an entry type",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  grade: z.string().min(1, {
    message: "Please enter your grade level",
  }),
  school: z.string().min(2, {
    message: "Please enter your school name",
  }),
  title: z.string().min(2, {
    message: "Please enter a title for your video",
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters",
    })
    .max(500, {
      message: "Description cannot exceed 500 characters",
    }),
  teacherName: z.string().optional(),
  teacherEmail: z
    .string()
    .email({
      message: "Please enter a valid teacher email address",
    })
    .optional(),
  // Add a field for the video file
  videoFile: z.any().optional(),
})

export function VideoSubmissionForm() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof videoSubmissionSchema>>({
    resolver: zodResolver(videoSubmissionSchema),
    defaultValues: {
      entryType: "individual",
      name: "",
      email: "",
      grade: "",
      school: "",
      title: "",
      description: "",
      teacherName: "",
      teacherEmail: "",
      videoFile: undefined,
    },
  })

  const entryType = form.watch("entryType")

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: any) => void) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!ACCEPTED_VIDEO_TYPES.includes(file.type)) {
      setUploadError("Invalid file type. Please upload a video file (MP4, MOV, AVI, WebM).")
      return
    }

    // Validate file size
    const maxSize = entryType === "individual" ? MAX_FILE_SIZE : MAX_CLASS_FILE_SIZE
    if (file.size > maxSize) {
      setUploadError(`File size exceeds the maximum limit (${maxSize / (1024 * 1024)}MB).`)
      return
    }

    setVideoFile(file)
    setUploadError(null)

    // Create video preview URL
    const previewUrl = URL.createObjectURL(file)
    setVideoPreview(previewUrl)

    // Update form value
    onChange(file)
  }

  const removeVideo = (onChange: (value: any) => void) => {
    setVideoFile(null)
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview)
      setVideoPreview(null)
    }
    onChange(undefined)
  }

  const onSubmit = async (data: z.infer<typeof videoSubmissionSchema>) => {
    if (!videoFile) {
      setUploadError("Please upload a video file.")
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 5
        })
      }, 300)

      // Create form data
      const formData = new FormData()
      formData.append("video", videoFile)
      Object.entries(data).forEach(([key, value]) => {
        if (value && key !== "videoFile") formData.append(key, value.toString())
      })

      // Submit the form
      await submitVideoEntry(formData)

      clearInterval(progressInterval)
      setUploadProgress(100)
      setUploadSuccess(true)

      // Reset form after successful submission
      setTimeout(() => {
        form.reset()
        setVideoFile(null)
        if (videoPreview) {
          URL.revokeObjectURL(videoPreview)
          setVideoPreview(null)
        }
        setUploadSuccess(false)
        setIsUploading(false)
        setUploadProgress(0)
      }, 3000)
    } catch (error) {
      console.error("Error submitting video:", error)
      setUploadError("Failed to upload video. Please try again.")
      setIsUploading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Your Video Entry</CardTitle>
        <CardDescription>Share your Spanish language skills through a creative video performance</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="entryType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Entry Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="individual" />
                        </FormControl>
                        <FormLabel className="font-normal">Individual Entry (15-30 seconds)</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="class" />
                        </FormControl>
                        <FormLabel className="font-normal">Class Entry (1-2 minutes)</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{entryType === "individual" ? "Your Name" : "Teacher Name"}</FormLabel>
                    <FormControl>
                      <Input placeholder={entryType === "individual" ? "John Doe" : "Ms. Smith"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{entryType === "individual" ? "Your Email" : "Teacher Email"}</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{entryType === "individual" ? "Your Grade" : "Class Grade"}</FormLabel>
                    <FormControl>
                      <Input placeholder={entryType === "individual" ? "9th" : "9th Grade Spanish"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="school"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Lincoln High School" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {entryType === "class" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="teacherName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Spanish 101" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="teacherEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Students</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="25" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Title</FormLabel>
                  <FormControl>
                    <Input placeholder="My Spanish Rap" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Briefly describe your video and what Spanish concepts it demonstrates..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Limit: 500 characters</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Properly wrap the video upload in a FormField */}
            <FormField
              control={form.control}
              name="videoFile"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Upload Video</FormLabel>
                  <FormControl>
                    <div>
                      {!videoFile ? (
                        <div
                          className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => document.getElementById("video-upload")?.click()}
                        >
                          <Upload className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
                          <p className="text-xs text-muted-foreground mb-3">
                            MP4, MOV, AVI, or WebM (max {entryType === "individual" ? "200MB" : "500MB"})
                          </p>
                          <Button type="button" variant="secondary" size="sm">
                            Select Video
                          </Button>
                          <input
                            id="video-upload"
                            type="file"
                            accept="video/mp4,video/quicktime,video/avi,video/webm"
                            className="hidden"
                            onChange={(e) => handleVideoChange(e, field.onChange)}
                          />
                        </div>
                      ) : (
                        <div className="border rounded-lg p-4">
                          <div className="flex justify-between items-center mb-3">
                            <div>
                              <p className="font-medium truncate">{videoFile.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                              </p>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeVideo(field.onChange)}
                              disabled={isUploading}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          {videoPreview && (
                            <div className="relative aspect-video mb-3 bg-black rounded-md overflow-hidden">
                              <video src={videoPreview} className="w-full h-full object-contain" controls />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Upload your song as a video file. Make sure your video clearly shows the performance.
                  </FormDescription>
                  {uploadError && <p className="text-sm text-destructive">{uploadError}</p>}
                  <FormMessage />
                </FormItem>
              )}
            />

            <CardFooter className="px-0 pb-0">
              <Button type="submit" className="w-full" disabled={isUploading || uploadSuccess || !videoFile}>
                {isUploading ? "Uploading..." : uploadSuccess ? "Submitted Successfully!" : "Submit Video Entry"}
              </Button>
            </CardFooter>

            {isUploading && (
              <div className="space-y-2">
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-xs text-center text-muted-foreground">Uploading: {uploadProgress}%</p>
              </div>
            )}

            {uploadSuccess && (
              <div className="flex items-center justify-center text-green-600 gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span>Video submitted successfully!</span>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
