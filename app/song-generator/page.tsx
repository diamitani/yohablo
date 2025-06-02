import { PageHeader } from "@/components/page-header"
import { SongGenerator } from "@/components/song-generator"

export default function SongGeneratorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Spanish Learning Song Generator"
        description="Create custom songs to help you learn Spanish vocabulary"
      />
      <div className="mt-8">
        <SongGenerator />
      </div>
    </div>
  )
}
