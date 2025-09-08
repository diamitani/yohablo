"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Volume2, Loader2, Sparkles, BookOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { spanishVoices } from "@/lib/services/gemini-tts-service"

interface TextToSpeechProps {
  defaultText?: string
  defaultVoice?: string
}

export function TextToSpeech({ defaultText = "", defaultVoice = "es-female-1" }: TextToSpeechProps) {
  const { toast } = useToast()
  const [text, setText] = useState(defaultText)
  const [voice, setVoice] = useState(defaultVoice)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [pronunciation, setPronunciation] = useState<string>("")
  const [tips, setTips] = useState<string>("")

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast({
        title: "Missing text",
        description: "Please enter some Spanish text to convert to speech.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setAudioUrl(null)

    try {
      const response = await fetch("/api/tts/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          voice,
          languageCode: "es-US",
        }),
      })

      const result = await response.json()

      if (result.success && result.audioUrl) {
        setAudioUrl(result.audioUrl)
        toast({
          title: "Speech Generated Successfully",
          description: "Your Spanish audio has been generated using Gemini AI.",
          duration: 3000,
        })
      } else {
        console.error("Gemini TTS generation failed:", result.error)
        toast({
          title: "Error Generating Speech",
          description: result.error || "Failed to generate speech with Gemini AI. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      console.error("Error generating speech with Gemini:", errorMessage)
      toast({
        title: "Error",
        description: `Gemini TTS error: ${errorMessage}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGetPronunciation = async () => {
    if (!text.trim()) return

    try {
      const response = await fetch("/api/tts/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          action: "pronunciation",
        }),
      })

      const result = await response.json()

      if (result.success) {
        setPronunciation(result.pronunciation || "")
        setTips(result.tips || "")
      }
    } catch (error) {
      console.error("Error getting pronunciation:", error)
    }
  }

  useEffect(() => {
    if (text.trim()) {
      const timer = setTimeout(() => {
        handleGetPronunciation()
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [text])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          Text to Speech
          <span className="text-sm font-normal text-muted-foreground">(Powered by Gemini AI)</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="text">Spanish Text</Label>
          <Textarea
            id="text"
            placeholder="Enter Spanish text to convert to speech..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="voice">Voice</Label>
          <Select value={voice} onValueChange={setVoice}>
            <SelectTrigger id="voice">
              <SelectValue placeholder="Select a voice" />
            </SelectTrigger>
            <SelectContent>
              {spanishVoices.map((v) => (
                <SelectItem key={v.id} value={v.id}>
                  {v.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {pronunciation && (
          <div className="space-y-2 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-600" />
              <Label className="text-blue-800 dark:text-blue-200">Pronunciation Guide</Label>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300 font-mono">{pronunciation}</p>
            {tips && <p className="text-xs text-blue-600 dark:text-blue-400">{tips}</p>}
          </div>
        )}

        {audioUrl && (
          <div className="pt-4">
            <audio controls className="w-full" src={audioUrl}>
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating with Gemini AI...
            </>
          ) : (
            <>
              <Volume2 className="mr-2 h-4 w-4" />
              Generate Speech
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
