import { PageHeader } from "@/components/page-header"
import { AboutContent } from "@/components/about-content"
import { TeamSection } from "@/components/team-section" // Add this import

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="About Yo Hablo" description="Our mission, vision, and values" />
      <AboutContent />
      <TeamSection /> {/* Add the TeamSection component here */}
    </div>
  )
}
