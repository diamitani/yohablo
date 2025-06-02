"use client"

import type { WorksheetItem } from "@/components/worksheet-content"
import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"

interface PrintableWorksheetProps {
  title: string
  content: WorksheetItem[]
  category?: string
}

export function PrintableWorksheet({ title, content, category }: PrintableWorksheetProps) {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Print Button - Hidden when printing */}
      <div className="print:hidden sticky top-4 z-10 flex justify-end p-4">
        <Button onClick={handlePrint} className="flex items-center gap-2">
          <Printer className="h-4 w-4" />
          Print Worksheet
        </Button>
      </div>

      {/* Printable Content */}
      <div className="max-w-4xl mx-auto p-8 print:p-6">
        {/* Header */}
        <div className="text-center mb-8 print:mb-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded"></div>
            <h1 className="text-2xl font-bold text-gray-900">Yo Hablo</h1>
            <div className="w-8 h-8 bg-purple-500 rounded"></div>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
          {category && <p className="text-sm text-gray-600 uppercase tracking-wide font-medium">{category}</p>}
          <div className="border-b-2 border-gray-300 mt-4"></div>
        </div>

        {/* Student Information */}
        <div className="mb-8 print:mb-6 p-4 border border-gray-300 rounded-lg print:rounded-none">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <label className="font-medium text-gray-700">Student Name:</label>
              <div className="border-b border-gray-400 h-6 mt-1"></div>
            </div>
            <div>
              <label className="font-medium text-gray-700">Date:</label>
              <div className="border-b border-gray-400 h-6 mt-1"></div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-8 print:mb-6 p-4 bg-gray-50 print:bg-white print:border print:border-gray-300 rounded-lg print:rounded-none">
          <h3 className="font-bold text-gray-800 mb-2">Instructions:</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Complete each sentence by filling in the blank with the correct Spanish word or phrase. Write your answers
            clearly in the spaces provided. Use the context clues in each sentence to help you determine the correct
            answer.
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-6 print:space-y-4">
          {content.map((item, index) => (
            <div key={item.id} className="flex gap-4 print:break-inside-avoid">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 print:bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-blue-800 print:text-gray-800">{index + 1}</span>
              </div>
              <div className="flex-1 space-y-3">
                <div
                  className="text-base leading-relaxed text-gray-800 print:text-black"
                  dangerouslySetInnerHTML={{
                    __html: item.question
                      .replace(/\$\$(\d+)\$\$/g, "<strong>($1)</strong>")
                      .replace(
                        /_+/g,
                        '<span style="border-bottom: 2px solid #000; display: inline-block; min-width: 80px; margin: 0 4px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>',
                      ),
                  }}
                />
                {/* Answer space for longer responses */}
                <div className="mt-2">
                  <div className="border-b-2 border-gray-400 h-6"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Answer Key Section (on separate page when printed) */}
        <div className="mt-12 print:mt-8 print:break-before-page">
          <div className="border-t-2 border-gray-300 pt-8 print:pt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 print:mb-4 text-center">Answer Key</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-4 print:gap-2">
              {content.map((item, index) => (
                <div key={`answer-${item.id}`} className="flex items-center gap-3 text-sm">
                  <span className="font-bold text-blue-600 print:text-black w-6">{index + 1}.</span>
                  <span className="font-medium text-gray-800 print:text-black">{item.answer}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 print:mt-8 text-center text-xs text-gray-500 print:text-black border-t border-gray-200 pt-4">
          <p>© Yo Hablo - Spanish Learning Platform | www.yohablo.com</p>
          <p className="mt-1">For more interactive lessons and audio pronunciation, visit our website.</p>
        </div>
      </div>

      {/* Print-specific styles */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 0.75in;
            size: letter;
          }
          
          body {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
          }
          
          .print\\:break-before-page {
            page-break-before: always;
          }
          
          .print\\:break-inside-avoid {
            page-break-inside: avoid;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          .print\\:bg-white {
            background-color: white !important;
          }
          
          .print\\:bg-gray-100 {
            background-color: #f3f4f6 !important;
          }
          
          .print\\:border {
            border: 1px solid #d1d5db !important;
          }
          
          .print\\:border-gray-300 {
            border-color: #d1d5db !important;
          }
          
          .print\\:text-black {
            color: black !important;
          }
          
          .print\\:text-gray-800 {
            color: #1f2937 !important;
          }
          
          .print\\:rounded-none {
            border-radius: 0 !important;
          }
          
          .print\\:p-6 {
            padding: 1.5rem !important;
          }
          
          .print\\:mb-6 {
            margin-bottom: 1.5rem !important;
          }
          
          .print\\:mb-4 {
            margin-bottom: 1rem !important;
          }
          
          .print\\:mt-8 {
            margin-top: 2rem !important;
          }
          
          .print\\:pt-6 {
            padding-top: 1.5rem !important;
          }
          
          .print\\:space-y-4 > * + * {
            margin-top: 1rem !important;
          }
          
          .print\\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
          
          .print\\:gap-2 {
            gap: 0.5rem !important;
          }
        }
      `}</style>
    </div>
  )
}
