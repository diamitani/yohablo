"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Volume2, Loader2, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { generateTTS, getAvailableVoices } from "@/app/api/tts/actions"

interface TextToSpeechProps {
  defaultText?: string
  defaultVoice?: string
}

export function TextToSpeech({ defaultText = "", defaultVoice = "es-US-Neural2-B" }: TextToSpeechProps) {
  const { toast } = useToast()
  const [text, setText] = useState(defaultText)
  const [voice, setVoice] = useState(defaultVoice)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [voices, setVoices] = useState<{ id: string; name: string; provider: string }[]>([])

  useEffect(() => {
    // Fetch available Google voices ONLY
    const loadVoices = async () => {
      try {
        const availableVoices = await getAvailableVoices()
        setVoices(availableVoices)
      } catch (error) {
        console.error("Failed to load Google voices:", error)
        // Fallback to default Google voices
        setVoices([
          { id: "es-US-Neural2-B", name: "Diego (Male - US)", provider: "google" },
          { id: "es-US-Neural2-A", name: "María (Female - US)", provider: "google" },
          { id: "es-ES-Neural2-B", name: "Alejandro (Male - Spain)", provider: "google" },
          { id: "es-ES-Neural2-A", name: "Carmen (Female - Spain)", provider: "google" },
        ])
      }
    }

    loadVoices()
  }, [])

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast({
        title: "Missing text",
        description: "Please enter some text to convert to speech.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setAudioUrl(null)

    try {
      // Generate using ONLY Google TTS
      const result = await generateTTS(text, { voice })

      if (result.success && result.audioUrl) {
        setAudioUrl(result.audioUrl)
        toast({
          title: "Speech Generated Successfully",
          description: "Your Spanish audio has been generated using Google Text-to-Speech.",
          duration: 3000,
        })
      } else {
        console.error("Google TTS generation failed:", result.error)
        toast({
          title: "Error Generating Speech",
          description: result.error || "Failed to generate speech with Google TTS. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      console.error("Error generating speech with Google TTS:", errorMessage)
      toast({
        title: "Error",
        description: `Google TTS error: ${errorMessage}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-blue-500" />
          Text to Speech
          <span className="text-sm font-normal text-muted-foreground">(Powered by Google TTS)</span>
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
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="voice">Google Voice</Label>
          <Select value={voice} onValueChange={setVoice}>
            <SelectTrigger id="voice">
              <SelectValue placeholder="Select a Google voice" />
            </SelectTrigger>
            <SelectContent>
              {voices.map((v) => (
                <SelectItem key={v.id} value={v.id}>
                  {v.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
              Generating with Google TTS...
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
