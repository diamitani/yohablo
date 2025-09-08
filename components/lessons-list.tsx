"use client"

import { useMode } from "@/components/mode-provider"
import { lessons } from "@/lib/data"
import { LessonCard } from "@/components/lesson-card"
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Video, Music, BookOpen, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function LessonsList() {
  const { mode } = useMode()
  const [filterType, setFilterType] = useState<"category" | "content">("content")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedContentType, setSelectedContentType] = useState<string>("all")

  // Get unique categories
  const categories = ["all", ...new Set(lessons.map((lesson) => lesson.category || "Uncategorized"))]

  // Define content types with improved filtering logic
  const contentTypes = [
    { id: "all", label: "All Content", icon: <BookOpen className="h-4 w-4 mr-2" /> },
    { id: "video", label: "Videos", icon: <Video className="h-4 w-4 mr-2" /> },
    { id: "audio", label: "Audio", icon: <Music className="h-4 w-4 mr-2" /> },
    { id: "worksheet", label: "Worksheets", icon: <FileText className="h-4 w-4 mr-2" /> },
  ]

  // Improved filtering logic with strict content type separation
  const getFilteredLessons = () => {
    let filtered = lessons

    if (filterType === "category") {
      filtered = selectedCategory === "all" ? lessons : lessons.filter((lesson) => lesson.category === selectedCategory)
    } else {
      // Content type filtering with strict separation
      if (selectedContentType === "video") {
        // Only lessons with video content (and optionally other content)
        filtered = lessons.filter((lesson) => lesson.videoUrl && lesson.videoUrl.trim() !== "")
      } else if (selectedContentType === "audio") {
        // Only lessons with audio content (can be audio-only or with other content)
        filtered = lessons.filter((lesson) => lesson.audioUrl && lesson.audioUrl.trim() !== "")
      } else if (selectedContentType === "worksheet") {
        // Only lessons with worksheet content
        filtered = lessons.filter(
          (lesson) => lesson.worksheetUrl && lesson.worksheetUrl.trim() !== "" && lesson.worksheetUrl !== "#",
        )
      }
      // "all" shows everything
    }

    return filtered
  }

  const filteredLessons = getFilteredLessons()

  // Get content type counts for display
  const getContentTypeCounts = () => {
    const videoCount = lessons.filter((lesson) => lesson.videoUrl && lesson.videoUrl.trim() !== "").length
    const audioCount = lessons.filter((lesson) => lesson.audioUrl && lesson.audioUrl.trim() !== "").length
    const worksheetCount = lessons.filter(
      (lesson) => lesson.worksheetUrl && lesson.worksheetUrl.trim() !== "" && lesson.worksheetUrl !== "#",
    ).length

    return { videoCount, audioCount, worksheetCount, total: lessons.length }
  }

  const counts = getContentTypeCounts()

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Mobile-optimized Filter Section */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Filter Lessons</h3>
        </div>

        <Tabs
          defaultValue="content"
          value={filterType}
          onValueChange={(value) => setFilterType(value as "category" | "content")}
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="content" className="text-sm">
              By Content
            </TabsTrigger>
            <TabsTrigger value="category" className="text-sm">
              By Category
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Content Type Filter - Mobile Optimized */}
        {filterType === "content" && (
          <div className="mt-4">
            <Tabs
              defaultValue="all"
              value={selectedContentType}
              onValueChange={setSelectedContentType}
              className="w-full"
            >
              <TabsList className="w-full grid grid-cols-2 sm:grid-cols-4 gap-1">
                {contentTypes.map((type) => (
                  <TabsTrigger
                    key={type.id}
                    value={type.id}
                    className="flex flex-col items-center p-2 text-xs sm:text-sm min-h-[60px] sm:min-h-[40px]"
                  >
                    <div className="flex items-center justify-center mb-1 sm:mb-0 sm:mr-2">{type.icon}</div>
                    <span className="hidden sm:inline">{type.label}</span>
                    <span className="sm:hidden text-xs">{type.label.split(" ")[0]}</span>
                    <Badge variant="secondary" className="mt-1 sm:mt-0 sm:ml-2 text-xs">
                      {type.id === "all"
                        ? counts.total
                        : type.id === "video"
                          ? counts.videoCount
                          : type.id === "audio"
                            ? counts.audioCount
                            : type.id === "worksheet"
                              ? counts.worksheetCount
                              : 0}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        )}

        {/* Category Filter - Mobile Optimized */}
        {filterType === "category" && (
          <div className="mt-4">
            <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="w-full flex flex-wrap gap-1 h-auto p-1">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="text-xs sm:text-sm px-2 py-1 min-w-max">
                    {category === "all" ? "All" : category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        )}
      </div>

      {/* Results Summary - Mobile Optimized */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">
            {filterType === "content" && selectedContentType !== "all"
              ? `${contentTypes.find((t) => t.id === selectedContentType)?.label} Lessons`
              : filterType === "category" && selectedCategory !== "all"
                ? `${selectedCategory} Lessons`
                : "All Lessons"}
          </h2>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            Showing {filteredLessons.length} of {lessons.length} lessons
          </p>
        </div>

        {filterType === "content" && selectedContentType !== "all" && (
          <Badge variant="outline" className="text-xs sm:text-sm self-start sm:self-center">
            {selectedContentType === "video" && "Video Content Only"}
            {selectedContentType === "audio" && "Audio Content Only"}
            {selectedContentType === "worksheet" && "Worksheet Content Only"}
          </Badge>
        )}
      </div>

      {/* Lessons Grid - Mobile Optimized */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredLessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            showProgress={mode === "ai"}
            contentTypeFilter={selectedContentType}
          />
        ))}
      </div>

      {/* No Results State - Mobile Optimized */}
      {filteredLessons.length === 0 && (
        <div className="text-center py-12 sm:py-16">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sm:p-8 max-w-md mx-auto">
            <div className="text-gray-400 mb-4">
              {filterType === "content" && selectedContentType === "video" && (
                <Video className="h-10 w-10 sm:h-12 sm:w-12 mx-auto" />
              )}
              {filterType === "content" && selectedContentType === "audio" && (
                <Music className="h-10 w-10 sm:h-12 sm:w-12 mx-auto" />
              )}
              {filterType === "content" && selectedContentType === "worksheet" && (
                <FileText className="h-10 w-10 sm:h-12 sm:w-12 mx-auto" />
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">No lessons found</h3>
            <p className="text-muted-foreground mb-4 text-sm sm:text-base">
              {filterType === "content" &&
                selectedContentType === "video" &&
                "No video lessons are currently available."}
              {filterType === "content" &&
                selectedContentType === "audio" &&
                "No audio lessons are currently available."}
              {filterType === "content" &&
                selectedContentType === "worksheet" &&
                "No worksheet lessons are currently available."}
              {filterType === "category" && "No lessons found in this category."}
            </p>
            <button
              onClick={() => {
                setSelectedContentType("all")
                setSelectedCategory("all")
              }}
              className="text-primary hover:underline text-sm sm:text-base"
            >
              View all lessons
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
