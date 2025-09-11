import { notFound } from "next/navigation"
import { WorksheetContent } from "@/components/worksheet-content"
import { worksheetData } from "@/lib/worksheet-data"

interface WorksheetPageProps {
  params: {
    slug: string
  }
}

export default function WorksheetPage({ params }: WorksheetPageProps) {
  const worksheet = worksheetData[params.slug as keyof typeof worksheetData]

  if (!worksheet) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container px-4 md:px-6 py-12">
        <WorksheetContent
          title={worksheet.title}
          content={worksheet.content}
          type="Interactive Worksheet"
          lessonSlug={params.slug}
        />
      </div>
    </div>
  )
}
