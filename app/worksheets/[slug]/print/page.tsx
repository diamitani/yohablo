import { notFound } from "next/navigation"
import { PrintableWorksheet } from "@/components/printable-worksheet"
import { worksheetData } from "@/lib/worksheet-data"
import { lessons } from "@/lib/data"

interface PrintableWorksheetPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PrintableWorksheetPageProps) {
  const worksheet = worksheetData[params.slug]
  const lesson = lessons.find((l) => l.slug === params.slug)

  if (!worksheet || !lesson) {
    return {
      title: "Worksheet Not Found | Yo Hablo",
    }
  }

  return {
    title: `Print ${worksheet.title} | Yo Hablo`,
    description: `Printable version of ${worksheet.title} worksheet`,
  }
}

export default function PrintableWorksheetPage({ params }: PrintableWorksheetPageProps) {
  const worksheet = worksheetData[params.slug]
  const lesson = lessons.find((l) => l.slug === params.slug)

  if (!worksheet || !lesson) {
    notFound()
  }

  return <PrintableWorksheet title={worksheet.title} content={worksheet.content} category={lesson.category} />
}

export async function generateStaticParams() {
  return Object.keys(worksheetData).map((slug) => ({
    slug,
  }))
}
