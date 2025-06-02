"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { Upload, Loader2, Play, Pause, AlertCircle, CheckCircle2 } from "lucide-react"
import { submitContestEntry } from "@/app/api/contest/actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20MB
const ALLOWED_FILE_TYPES = ["audio/mpeg", "audio/mp4", "video/mp4"]

// Define the form schema with detailed validation
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  schoolName: z.string().min(2, {
    message: "School name must be at least 2 characters.",
  }),
  entryType: z.enum(["individual", "class"], {
    required_error: "Please select an entry type.",
  }),
  songTitle: z.string().min(2, {
    message: "Song title must be at least 2 characters.",
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(500, {
      message: "Description must not exceed 500 characters.",
    }),
  spanishWords: z.string().min(5, {
    message: "Please list at least 5 Spanish words used in your song.",
  }),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
})

// Type for form values
type FormValues = z.infer<typeof formSchema>

export function ContestSubmissionForm() {
  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<string[]>([])
  const [formSuccess, setFormSuccess] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  // File state
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string | null>(null)

  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Form initialization
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      schoolName: "",
      songTitle: "",
      description: "",
      spanishWords: "",
      agreeTerms: false,
    },
    mode: "onChange", // Validate on change for immediate feedback
  })

  // Clean up audio preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (audioPreviewUrl) {
        URL.revokeObjectURL(audioPreviewUrl)
      }
    }
  }, [audioPreviewUrl])

  // Handle form submission
  async function onSubmit(values: FormValues) {
    // Reset previous errors and success messages
    setFormErrors([])
    setFormSuccess(null)

    // Validate file is selected
    if (!selectedFile) {
      setFileError("Please upload an audio file for your song entry.")
      setFormErrors(["Audio file is required"])
      return
    }

    setIsSubmitting(true)
    setUploadProgress(0)

    try {
      // Simulate file upload with progress
      await simulateFileUpload((progress) => {
        setUploadProgress(progress)
      })

      // Submit the entry
      const result = await submitContestEntry({
        ...values,
        audioFileUrl: URL.createObjectURL(selectedFile), // In a real app, this would be the URL from your storage service
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        fileType: selectedFile.type,
      })

      if (result.success) {
        // Show success message
        setFormSuccess("Your song has been successfully submitted to the contest!")
        toast({
          title: "Entry submitted successfully!",
          description: "Your song has been submitted to the contest.",
        })

        // Reset form and state
        form.reset()
        setSelectedFile(null)
        setAudioPreviewUrl(null)

        if (audioRef.current) {
          audioRef.current.pause()
          setIsPlaying(false)
        }
      } else {
        // Handle server-side errors
        setFormErrors([result.error || "Failed to submit entry. Please try again."])
        toast({
          title: "Submission failed",
          description: result.error || "There was a problem submitting your entry. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Submission error:", error)
      setFormErrors(["An unexpected error occurred. Please try again."])
      toast({
        title: "Error submitting entry",
        description: "There was a problem submitting your entry. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
      setUploadProgress(0)
    }
  }

  // Simulate file upload with progress
  const simulateFileUpload = async (progressCallback: (progress: number) => void) => {
    const totalSteps = 10
    for (let i = 1; i <= totalSteps; i++) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      progressCallback((i / totalSteps) * 100)
    }
  }

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null)

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Validate file type
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setFileError("Invalid file type. Please upload an MP3 or MP4 file.")
        return
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        setFileError(`File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.`)
        return
      }

      // Clean up previous preview URL
      if (audioPreviewUrl) {
        URL.revokeObjectURL(audioPreviewUrl)
      }

      // Create a new preview URL
      const previewUrl = URL.createObjectURL(file)
      setAudioPreviewUrl(previewUrl)
      setSelectedFile(file)

      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause()
        setIsPlaying(false)
      }
    }
  }

  // Handle audio playback
  const togglePlayPause = () => {
    if (!audioRef.current || !audioPreviewUrl) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Audio playback error:", error)
        toast({
          title: "Playback error",
          description: "There was a problem playing the audio file.",
          variant: "destructive",
        })
      })
    }

    setIsPlaying(!isPlaying)
  }

  // Handle audio playback end
  const handleAudioEnded = () => {
    setIsPlaying(false)
  }

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()

    setFileError(null)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]

      // Validate file type
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setFileError("Invalid file type. Please upload an MP3 or MP4 file.")
        return
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        setFileError(`File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.`)
        return
      }

      // Clean up previous preview URL
      if (audioPreviewUrl) {
        URL.revokeObjectURL(audioPreviewUrl)
      }

      // Create a new preview URL
      const previewUrl = URL.createObjectURL(file)
      setAudioPreviewUrl(previewUrl)
      setSelectedFile(file)

      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause()
        setIsPlaying(false)
      }
    }
  }

  // Custom file upload component that works with FormField
  const FileUpload = ({ className }: { className?: string }) => (
    <div className={className}>
      <div className="grid w-full items-center gap-1.5">
        <label
          htmlFor="audio-upload"
          className="group flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-primary/50 px-6 py-10 transition-colors hover:border-primary"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <Upload className="h-10 w-10 text-muted-foreground group-hover:text-primary" />
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
                {selectedFile ? selectedFile.name : "Click to upload or drag and drop"}
              </p>
              <p className="text-xs text-muted-foreground">MP3 or MP4 (max 20MB)</p>
            </div>
          </div>
        </label>
        <Input
          id="audio-upload"
          type="file"
          accept="audio/mpeg,audio/mp4,video/mp4"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* File error message */}
      {fileError && <p className="text-sm text-red-500 mt-1">{fileError}</p>}

      {/* Audio preview */}
      {selectedFile && audioPreviewUrl && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="icon" onClick={togglePlayPause} className="h-8 w-8">
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <span className="text-sm">
              {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
            </span>
            <audio ref={audioRef} src={audioPreviewUrl} onEnded={handleAudioEnded} className="hidden" />
          </div>
        </div>
      )}

      {/* File requirement reminder */}
      {!selectedFile && !fileError && (
        <p className="text-sm text-amber-600 mt-1">Please upload an audio file for your entry.</p>
      )}
    </div>
  )

  return (
    <section className="py-8" id="submit">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Submit Your Entry</h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Fill out the form below to submit your song to the contest
          </p>
        </div>

        {/* Display form errors */}
        {formErrors.length > 0 && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-5">
                {formErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Display success message */}
        {formSuccess && (
          <Alert variant="default" className="mb-6 bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Success</AlertTitle>
            <AlertDescription className="text-green-700">{formSuccess}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="schoolName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your school name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                            <FormLabel className="font-normal">Individual Student Entry (15 seconds)</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="class" />
                            </FormControl>
                            <FormLabel className="font-normal">Class Entry (2 minutes)</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="songTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Song Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Title of your song" {...field} />
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
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your song and what inspired you"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Briefly describe your song and the Spanish concepts you incorporated.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="spanishWords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Spanish Words Used</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List the Spanish words or phrases used in your song"
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Individual entries should include at least 5 Spanish words, class entries at least 20.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* File upload field - now properly wrapped in FormItem */}
                <FormItem>
                  <FormLabel>Upload Your Song</FormLabel>
                  <FormControl>
                    <FileUpload />
                  </FormControl>
                  <FormDescription>Upload your song in MP3 format or MP4 if including video.</FormDescription>
                </FormItem>

                <FormField
                  control={form.control}
                  name="agreeTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} id="agreeTerms" />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel htmlFor="agreeTerms" className="text-sm font-medium">
                          I agree to the contest terms and conditions
                        </FormLabel>
                        <FormDescription>
                          By submitting, you grant Yo Hablo permission to use your entry for promotional purposes.
                        </FormDescription>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Upload progress indicator */}
                {isSubmitting && uploadProgress > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{Math.round(uploadProgress)}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Entry"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
