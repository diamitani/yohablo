"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AI_PROVIDER_CONFIGS, DEFAULT_AI_PROVIDER } from "@/lib/ai-config"
import { useToast } from "@/hooks/use-toast"

export function AIProviderSetup() {
  const [apiKey, setApiKey] = useState("")
  const [provider, setProvider] = useState(DEFAULT_AI_PROVIDER)
  const [isConfigured, setIsConfigured] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Check if API key is already set in localStorage
    const storedProvider = localStorage.getItem("aiProvider") || DEFAULT_AI_PROVIDER
    setProvider(storedProvider)

    const storedApiKey = localStorage.getItem(`${storedProvider}ApiKey`)
    if (storedApiKey) {
      setApiKey("********")
      setIsConfigured(true)
    }
  }, [])

  const handleSaveApiKey = () => {
    if (!apiKey || apiKey === "********") {
      toast({
        title: "API Key Required",
        description: "Please enter a valid API key.",
        variant: "destructive",
      })
      return
    }

    // Save API key to localStorage
    localStorage.setItem(`${provider}ApiKey`, apiKey)
    localStorage.setItem("aiProvider", provider)

    setIsConfigured(true)

    toast({
      title: "API Key Saved",
      description: `${AI_PROVIDER_CONFIGS[provider].name} API key has been saved.`,
    })
  }

  const handleChangeProvider = () => {
    setIsConfigured(false)
    setApiKey("")
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>AI Provider Setup</CardTitle>
        <CardDescription>Configure your AI provider for the Spanish tutor.</CardDescription>
      </CardHeader>
      <CardContent>
        {isConfigured ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Current Provider:</p>
                <p>{AI_PROVIDER_CONFIGS[provider].name}</p>
              </div>
              <Button variant="outline" onClick={handleChangeProvider}>
                Change Provider
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="provider">AI Provider</Label>
              <select
                id="provider"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
              >
                {Object.entries(AI_PROVIDER_CONFIGS).map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder={`Enter your ${AI_PROVIDER_CONFIGS[provider].name} API key`}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Your API key is stored locally in your browser and is never sent to our servers.
              </p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!isConfigured && (
          <Button className="w-full" onClick={handleSaveApiKey}>
            Save API Key
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
