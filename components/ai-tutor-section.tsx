"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Bot, Send, Sparkles } from "lucide-react"

interface AiTutorSectionProps {
  lessonId: string
}

interface Message {
  id: string
  type: "user" | "ai"
  content: string
}

export function AiTutorSection({ lessonId }: AiTutorSectionProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "¡Hola! I'm your AI Spanish tutor. I can help you with pronunciation, grammar, and vocabulary. What would you like to practice?",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const quickQuestions = [
    "How do I pronounce this word?",
    "Explain the grammar rule",
    "Give me practice sentences",
    "Cultural context help",
  ]

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "Great question! I'd be happy to help you with that. Spanish has many interesting aspects to explore.",
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-600" />
          AI Spanish Tutor
          <Badge className="bg-green-100 text-green-800">
            <Sparkles className="h-3 w-3 mr-1" />
            Online
          </Badge>
        </CardTitle>
        <CardDescription>Get personalized help with your Spanish learning</CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        {/* Messages */}
        <div className="h-64 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 text-sm ${
                  message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Questions */}
        <div className="border-t p-3 bg-gray-50">
          <div className="flex flex-wrap gap-2 mb-3">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setInputMessage(question)}
                className="text-xs"
              >
                {question}
              </Button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="border-t p-3">
          <div className="flex gap-2">
            <Textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about Spanish..."
              className="flex-1 min-h-[40px] resize-none"
              disabled={isLoading}
            />
            <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isLoading} size="sm">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
