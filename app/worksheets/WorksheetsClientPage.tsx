"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { worksheetData } from "@/lib/worksheet-data"
import { Search, FileText, Clock, Users, Download, Play } from "lucide-react"
import Link from "next/link"

const categories = [
  { name: "All", color: "bg-blue-500" },
  { name: "Numbers", color: "bg-green-500" },
  { name: "Colors", color: "bg-red-500" },
  { name: "Food", color: "bg-yellow-500" },
  { name: "Family", color: "bg-purple-500" },
  { name: "Places", color: "bg-indigo-500" },
  { name: "Time", color: "bg-pink-500" },
  { name: "Weather", color: "bg-teal-500" },
  { name: "Animals", color: "bg-orange-500" },
  { name: "House", color: "bg-cyan-500" },
  { name: "Grammar", color: "bg-emerald-500" },
]

const worksheetInfo = {
  numeros: {
    category: "Numbers",
    difficulty: "Beginner",
    duration: "15 min",
    description: "Learn Spanish numbers 0-101 through hip-hop lyrics",
  },
  colores: {
    category: "Colors",
    difficulty: "Beginner",
    duration: "12 min",
    description: "Master Spanish color vocabulary with engaging music",
  },
  food: {
    category: "Food",
    difficulty: "Beginner",
    duration: "18 min",
    description: "Food and meal vocabulary through Ya Comí song",
  },
  prepositions: {
    category: "Grammar",
    difficulty: "Intermediate",
    duration: "14 min",
    description: "Learn Spanish prepositions with We in There Tho",
  },
  house: {
    category: "House",
    difficulty: "Beginner",
    duration: "16 min",
    description: "Rooms and furniture vocabulary from Chill en Mi Casa",
  },
  family: {
    category: "Family",
    difficulty: "Beginner",
    duration: "17 min",
    description: "Family member vocabulary with Meet the Fam Bam",
  },
  weather: {
    category: "Weather",
    difficulty: "Beginner",
    duration: "13 min",
    description: "Weather and seasons with ¿Qué Qué Qué?",
  },
  animals: {
    category: "Animals",
    difficulty: "Beginner",
    duration: "15 min",
    description: "Animal vocabulary from Bienvenido a la Selva",
  },
  places: {
    category: "Places",
    difficulty: "Beginner",
    duration: "14 min",
    description: "Places and locations with The Corner song",
  },
  time: {
    category: "Time",
    difficulty: "Intermediate",
    duration: "16 min",
    description: "Telling time in Spanish with Time Ain't Hard to Tell",
  },
}

export function WorksheetsClientPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredWorksheets = Object.entries(worksheetData).filter(([slug, worksheet]) => {
    const info = worksheetInfo[slug as keyof typeof worksheetInfo]
    const matchesCategory = selectedCategory === "All" || info?.category === selectedCategory
    const matchesSearch =
      worksheet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      info?.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const totalWorksheets = Object.keys(worksheetData).length
  const totalQuestions = Object.values(worksheetData).reduce((sum, worksheet) => sum + worksheet.content.length, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container px-4 md:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Interactive Spanish Worksheets
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Practice Spanish with interactive fill-in-the-blank worksheets based on our hip-hop lessons. Get instant
            feedback and track your progress!
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm">
              <FileText className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">{totalWorksheets} Worksheets</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm">
              <Users className="h-5 w-5 text-green-600" />
              <span className="font-semibold">{totalQuestions} Questions</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm">
              <Clock className="h-5 w-5 text-purple-600" />
              <span className="font-semibold">Interactive Practice</span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search worksheets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.name)}
                className={selectedCategory === category.name ? `${category.color} text-white` : ""}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Worksheets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorksheets.map(([slug, worksheet]) => {
            const info = worksheetInfo[slug as keyof typeof worksheetInfo]
            const categoryColor = categories.find((cat) => cat.name === info?.category)?.color || "bg-gray-500"

            return (
              <Card
                key={slug}
                className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white dark:bg-slate-800"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={`${categoryColor} text-white`}>{info?.category}</Badge>
                    <Badge variant="outline">{worksheet.content.length} questions</Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                    {worksheet.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{info?.description}</p>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {info?.duration}
                    </span>
                    <span className="capitalize">{info?.difficulty}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      asChild
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Link href={`/worksheets/${slug}`}>
                        <Play className="h-4 w-4 mr-2" />
                        Start Practice
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredWorksheets.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No worksheets found</h3>
            <p className="text-gray-500 dark:text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
