import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Download, Volume2, Printer } from "lucide-react"
import Link from "next/link"
import { worksheetData } from "@/lib/worksheet-data"
import { lessons } from "@/lib/data"

export const metadata = {
  title: "Spanish Worksheets | Yo Hablo",
  description: "Practice Spanish with our interactive worksheets",
}

export default function WorksheetsPage() {
  // Filter lessons that have worksheets
  const worksheetLessons = lessons.filter(
    (lesson) => lesson.worksheetUrl && lesson.worksheetUrl !== "#" && lesson.slug in worksheetData,
  )

  return (
    <div className="container py-8 max-w-7xl">
      <PageHeader
        heading="Spanish Worksheets"
        text="Practice your Spanish skills with our interactive worksheets. Complete exercises, test your knowledge, and track your progress."
      />

      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">{worksheetLessons.length}</span> worksheets available
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Printer className="h-3 w-3" />
            Printer-friendly versions available
          </Badge>
        </div>
      </div>

      {worksheetLessons.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
          <h3 className="mt-4 text-lg font-medium">No worksheets available</h3>
          <p className="mt-2 text-muted-foreground">Check back later for new worksheet content.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {worksheetLessons.map((lesson) => (
            <Card key={lesson.slug} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] overflow-hidden relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 border-b">
                <div className="h-full flex flex-col">
                  <div className="text-center border-b border-blue-200 dark:border-blue-700 pb-2 mb-3">
                    <Badge variant="outline" className="mb-2">
                      {lesson.category || "Vocabulary"}
                    </Badge>
                    <h3 className="font-bold text-lg leading-tight text-blue-900 dark:text-blue-100">
                      {worksheetData[lesson.slug].title}
                    </h3>
                  </div>
                  <div className="flex-1 flex flex-col space-y-3 overflow-hidden">
                    {worksheetData[lesson.slug].content.slice(0, 3).map((item, i) => (
                      <div key={i} className="text-sm">
                        <div className="flex items-center gap-2">
                          <div className="min-w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                            {i + 1}
                          </div>
                          <div className="overflow-hidden">
                            <p
                              className="line-clamp-2 text-sm leading-tight text-gray-700 dark:text-gray-300"
                              dangerouslySetInnerHTML={{
                                __html: item.question
                                  .replace(/\$\$(\d+)\$\$/g, '<span class="font-bold text-blue-600">($1)</span>')
                                  .replace(
                                    /_+/g,
                                    '<span class="bg-blue-100 dark:bg-blue-800 px-1 rounded">_____</span>',
                                  ),
                              }}
                            ></p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {worksheetData[lesson.slug].content.length > 3 && (
                      <div className="text-center text-sm text-muted-foreground">
                        +{worksheetData[lesson.slug].content.length - 3} more questions
                      </div>
                    )}
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    <span>Worksheet</span>
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Volume2 className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Audio Available</span>
                  </div>
                  <Badge variant="outline">{worksheetData[lesson.slug].content.length} Questions</Badge>
                </div>

                <div className="space-y-2">
                  <Link href={`/lessons/${lesson.slug}`}>
                    <Button className="w-full">Practice Interactive</Button>
                  </Link>

                  <Link href={`/worksheets/${lesson.slug}/print`} target="_blank">
                    <Button variant="outline" className="w-full flex items-center gap-2">
                      <Printer className="h-4 w-4" />
                      <span>Print Worksheet</span>
                    </Button>
                  </Link>

                  {lesson.worksheetUrl && lesson.worksheetUrl !== "#" && (
                    <Link href={lesson.worksheetUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        <span>Download PDF</span>
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
