import { PageHeader } from "@/components/page-header"
import { AIProviderSetup } from "@/components/ai-provider-setup"

export default function SettingsPage() {
  return (
    <div className="container py-8">
      <PageHeader heading="Settings" text="Configure your Yo Hablo AI experience" />

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">AI Provider</h2>
        <AIProviderSetup />
      </div>
    </div>
  )
}
