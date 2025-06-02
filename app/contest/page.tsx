import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoSubmissionForm } from "@/components/contest/video-submission-form"
import { VideoGallery } from "@/components/contest/video-gallery"
import { ContestHero } from "@/components/contest/contest-hero"
import { ContestRules } from "@/components/contest/contest-rules"
import { PageHeader } from "@/components/page-header"

export const metadata = {
  title: "Spanish Song Contest | Yo Hablo",
  description: "Submit your Spanish song video and compete for prizes in our Spanish language song contest.",
}

export default function ContestPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Spanish Song Contest"
        description="Show off your Spanish skills through music and win prizes!"
      />

      <div className="container px-4 py-8">
        <ContestHero />

        <Tabs defaultValue="rules" className="mt-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rules">Contest Rules</TabsTrigger>
            <TabsTrigger value="submit">Submit Entry</TabsTrigger>
            <TabsTrigger value="gallery">View Entries</TabsTrigger>
          </TabsList>
          <TabsContent value="rules" className="mt-6">
            <ContestRules />
          </TabsContent>
          <TabsContent value="submit" className="mt-6">
            <VideoSubmissionForm />
          </TabsContent>
          <TabsContent value="gallery" className="mt-6">
            <VideoGallery />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
