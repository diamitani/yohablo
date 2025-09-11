"use client"

import { Button } from "@/components/ui/button"
import { Printer, Download } from "lucide-react"
import { useRef } from "react"

interface PrintableWorksheetProps {
  title: string
  content: any[]
  category: string
}

export function PrintableWorksheet({ title, content, category }: PrintableWorksheetProps) {
  const printRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = async () => {
    try {
      // Dynamic import to avoid SSR issues
      const html2pdf = (await import("html2pdf.js")).default

      const element = printRef.current
      if (!element) return

      const opt = {
        margin: 1,
        filename: `${title.replace(/\s+/g, "-").toLowerCase()}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      }

      html2pdf().set(opt).from(element).save()
    } catch (error) {
      console.error("Error generating PDF:", error)
      // Fallback to print
      handlePrint()
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Print Controls - Hidden when printing */}
      <div className="no-print fixed top-4 right-4 z-10 flex gap-2">
        <Button onClick={handlePrint} className="flex items-center gap-2">
          <Printer className="h-4 w-4" />
          Print
        </Button>
        <Button onClick={handleDownloadPDF} variant="outline" className="flex items-center gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>

      {/* Printable Content */}
      <div ref={printRef} className="max-w-4xl mx-auto p-8 bg-white">
        {/* Header */}
        <div className="text-center mb-8 border-b-2 border-gray-300 pb-4">
          <h1 className="text-2xl font-bold mb-2">Yo Hablo - Spanish Learning</h1>
          <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
          <p className="text-sm text-gray-500 mt-2">Category: {category}</p>
        </div>

        {/* Student Info */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="border-b border-gray-300 pb-1">
            <span className="text-sm font-medium">Name: </span>
            <span className="inline-block w-48 border-b border-gray-400"></span>
          </div>
          <div className="border-b border-gray-300 pb-1">
            <span className="text-sm font-medium">Date: </span>
            <span className="inline-block w-32 border-b border-gray-400"></span>
          </div>
          <div className="border-b border-gray-300 pb-1">
            <span className="text-sm font-medium">Teacher: </span>
            <span className="inline-block w-48 border-b border-gray-400"></span>
          </div>
          <div className="border-b border-gray-300 pb-1">
            <span className="text-sm font-medium">Period: </span>
            <span className="inline-block w-32 border-b border-gray-400"></span>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Instructions:</h3>
          <p className="text-sm">
            Fill in the blanks with the correct Spanish words. Listen to the audio if available, or use your knowledge
            from the lesson.
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {content.map((item, index) => (
            <div key={item.id} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold">{index + 1}</span>
              </div>
              <div className="flex-1">
                <div
                  className="mb-3 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: item.question
                      .replace(/\$\$(\d+)\$\$/g, '<span class="font-bold">($1)</span>')
                      .replace(/_+/g, '<span class="inline-block w-24 border-b-2 border-gray-400 mx-1"></span>'),
                  }}
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Answer:</span>
                  <span className="inline-block w-32 border-b-2 border-gray-400"></span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Answer Key (on separate page when printing) */}
        <div className="mt-12 page-break-before">
          <h3 className="text-lg font-bold mb-4 text-center border-b-2 border-gray-300 pb-2">Answer Key</h3>
          <div className="grid grid-cols-2 gap-4">
            {content.map((item, index) => (
              <div key={`answer-${item.id}`} className="flex items-center gap-2 text-sm">
                <span className="font-semibold w-6">{index + 1}.</span>
                <span className="font-medium">{item.answer}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-gray-300 text-center text-xs text-gray-500">
          <p>© Yo Hablo - Spanish Learning Platform | www.yohablo.com</p>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .page-break-before {
            page-break-before: always;
          }
          body {
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  )
}
