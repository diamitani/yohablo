export const AI_PROVIDERS = {
  GEMINI: "gemini",
  GROK: "grok",
}

export const DEFAULT_AI_PROVIDER = AI_PROVIDERS.GEMINI

export interface AIProviderConfig {
  name: string
  apiKeyEnvVar: string
  modelId: string
  maxTokens: number
}

export const AI_PROVIDER_CONFIGS: Record<string, AIProviderConfig> = {
  [AI_PROVIDERS.GEMINI]: {
    name: "Google Gemini",
    apiKeyEnvVar: "GOOGLE_API_KEY",
    modelId: "gemini-pro",
    maxTokens: 8192,
  },
  [AI_PROVIDERS.GROK]: {
    name: "Grok",
    apiKeyEnvVar: "XAI_API_KEY",
    modelId: "grok-1",
    maxTokens: 4096,
  },
}

export function getAIProviderConfig(provider = DEFAULT_AI_PROVIDER): AIProviderConfig {
  return AI_PROVIDER_CONFIGS[provider] || AI_PROVIDER_CONFIGS[DEFAULT_AI_PROVIDER]
}
