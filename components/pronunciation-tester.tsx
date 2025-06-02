"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { VocabularyAudio } from "./vocabulary-audio"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PronunciationTester() {
  const [word, setWord] = useState("")
  const [testWords, setTestWords] = useState<string[]>([])
  const [dialect, setDialect] = useState("es-US")

  const addWord = () => {
    if (word && !testWords.includes(word)) {
      setTestWords([...testWords, word])
      setWord("")
    }
  }

  const sampleWords = [
    "Hola",
    "Buenos días",
    "Gracias",
    "Por favor",
    "Uno",
    "Dos",
    "Tres",
    "Cuatro",
    "Cinco",
    "Casa",
    "Escuela",
    "Trabajo",
    "Familia",
  ]

  const addSampleWord = (sampleWord: string) => {
    if (!testWords.includes(sampleWord)) {
      setTestWords([...testWords, sampleWord])
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Spanish Pronunciation Tester</CardTitle>
        <CardDescription>Test the pronunciation of Spanish words</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <Label htmlFor="word-input">Enter a Spanish word</Label>
            <Input
              id="word-input"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addWord()}
              placeholder="Type a Spanish word"
            />
          </div>
          <Button onClick={addWord}>Add</Button>
        </div>

        <div className="space-y-2">
          <Label>Dialect</Label>
          <Select value={dialect} onValueChange={setDialect}>
            <SelectTrigger>
              <SelectValue placeholder="Select dialect" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="es-ES">Spain (Castilian)</SelectItem>
              <SelectItem value="es-US">Latin American</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Sample Words</Label>
          <div className="flex flex-wrap gap-2">
            {sampleWords.slice(0, 6).map((sampleWord) => (
              <Button key={sampleWord} variant="outline" size="sm" onClick={() => addSampleWord(sampleWord)}>
                {sampleWord}
              </Button>
            ))}
          </div>
        </div>

        {testWords.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Test Words</h3>
            <div className="space-y-2">
              {testWords.map((testWord) => (
                <div key={testWord} className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <span>{testWord}</span>
                  <VocabularyAudio word={testWord} language={dialect} />
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setTestWords([])}>
          Clear All
        </Button>
        <Button onClick={() => setTestWords([...testWords, ...sampleWords.filter((w) => !testWords.includes(w))])}>
          Add All Samples
        </Button>
      </CardFooter>
    </Card>
  )
}
