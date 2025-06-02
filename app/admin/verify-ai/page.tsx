"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, CheckCircle, XCircle, AlertCircle } from "lucide-react"

export default function VerifyAIPage() {
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const runTest = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/verify-ai")
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`)
      }
      const data = await response.json()
      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    runTest()
  }, [])

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">AI Provider Verification</h1>

      <div className="grid gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Environment Check</CardTitle>
            <CardDescription>Verifying API keys and environment configuration</CardDescription>
          </CardHeader>
          <CardContent>
            {loading && !results ? (
              <div className="flex items-center justify-center p-6">
                <RefreshCw className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="p-4 border border-red-200 rounded bg-red-50 text-red-700">{error}</div>
            ) : results ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded">
                  <span className="font-medium">Google Gemini API Key</span>
                  {results.environment.hasGeminiKey ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <CheckCircle className="h-3 w-3 mr-1" /> Available
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      <XCircle className="h-3 w-3 mr-1" /> Missing
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between p-3 border rounded">
                  <span className="font-medium">OpenAI API Key</span>
                  {results.environment.hasOpenAIKey ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <CheckCircle className="h-3 w-3 mr-1" /> Available
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      <XCircle className="h-3 w-3 mr-1" /> Missing
                    </Badge>
                  )}
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Primary Provider: Google Gemini</CardTitle>
              <CardDescription>Testing Gemini API connectivity and response</CardDescription>
            </CardHeader>
            <CardContent>
              {loading && !results ? (
                <div className="flex items-center justify-center p-6">
                  <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : results ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Status:</span>
                    {results.providers.gemini.success ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        <CheckCircle className="h-3 w-3 mr-1" /> Working
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <XCircle className="h-3 w-3 mr-1" /> Failed
                      </Badge>
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">Response:</p>
                    <div className="p-3 bg-muted rounded text-sm">{results.providers.gemini.message}</div>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Backup Provider: OpenAI</CardTitle>
              <CardDescription>Testing OpenAI API connectivity and response</CardDescription>
            </CardHeader>
            <CardContent>
              {loading && !results ? (
                <div className="flex items-center justify-center p-6">
                  <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : results ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Status:</span>
                    {results.providers.openai.success ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        <CheckCircle className="h-3 w-3 mr-1" /> Working
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <XCircle className="h-3 w-3 mr-1" /> Failed
                      </Badge>
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">Response:</p>
                    <div className="p-3 bg-muted rounded text-sm">{results.providers.openai.message}</div>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Fallback System Test</CardTitle>
            <CardDescription>Testing if the fallback system works correctly</CardDescription>
          </CardHeader>
          <CardContent>
            {loading && !results ? (
              <div className="flex items-center justify-center p-6">
                <RefreshCw className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : results ? (
              <div className="space-y-4">
                {results.fallbackSystem.primarySuccess ? (
                  <div className="p-4 border border-green-200 rounded bg-green-50">
                    <div className="flex items-center gap-2 text-green-700 font-medium mb-2">
                      <CheckCircle className="h-4 w-4" />
                      Primary provider (Gemini) working correctly
                    </div>
                    <p className="text-sm text-green-700">
                      The primary provider is working, so the fallback was not tested.
                    </p>
                  </div>
                ) : results.fallbackSystem.fallbackSuccess ? (
                  <div className="p-4 border border-amber-200 rounded bg-amber-50">
                    <div className="flex items-center gap-2 text-amber-700 font-medium mb-2">
                      <AlertCircle className="h-4 w-4" />
                      Fallback system working correctly
                    </div>
                    <p className="text-sm text-amber-700">
                      Primary provider failed but fallback to OpenAI worked successfully.
                    </p>
                  </div>
                ) : (
                  <div className="p-4 border border-red-200 rounded bg-red-50">
                    <div className="flex items-center gap-2 text-red-700 font-medium mb-2">
                      <XCircle className="h-4 w-4" />
                      Both providers failed
                    </div>
                    <p className="text-sm text-red-700">
                      Neither the primary nor backup provider is working correctly.
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium mb-1">Primary Response:</p>
                  <div className="p-3 bg-muted rounded text-sm mb-3">
                    {results.fallbackSystem.primaryResponse || "No response"}
                  </div>

                  {results.fallbackSystem.fallbackTested && (
                    <>
                      <p className="text-sm font-medium mb-1">Fallback Response:</p>
                      <div className="p-3 bg-muted rounded text-sm">
                        {results.fallbackSystem.fallbackResponse || "No response"}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : null}
          </CardContent>
          <CardFooter>
            <Button onClick={runTest} disabled={loading}>
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Testing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Run Tests Again
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
