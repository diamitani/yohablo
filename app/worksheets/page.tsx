import type { Metadata } from "next"
import { WorksheetsClientPage } from "./WorksheetsClientPage"

export const metadata: Metadata = {
  title: "Interactive Spanish Worksheets | Yo Hablo",
  description:
    "Practice Spanish with interactive worksheets covering numbers, colors, family, food, and more. Fill-in-the-blank exercises with instant feedback.",
}

export default function WorksheetsPage() {
  return <WorksheetsClientPage />
}
