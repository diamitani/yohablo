import { PageHeader } from "@/components/page-header"
import { ContestAdminPanel } from "@/components/contest/contest-admin-panel"

export const metadata = {
  title: "Contest Administration - Yo Hablo",
  description: "Manage song contest entries and select winners",
}

export default function ContestAdminPage() {
  return (
    <div className="container py-8">
      <PageHeader
        title="Contest Administration"
        description="Manage contest entries, review submissions, and select winners"
      />

      <div className="mt-8">
        <ContestAdminPanel />
      </div>
    </div>
  )
}
