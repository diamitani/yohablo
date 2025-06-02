"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"

interface CategoryProgressProps {
  categories: {
    name: string
    total: number
    mastered: number
    reviewing: number
    learning: number
  }[]
}

export function CategoryProgress({ categories }: CategoryProgressProps) {
  const [view, setView] = useState<"list" | "chart">("list")

  // Calculate total stats
  const totalWords = categories.reduce((sum, cat) => sum + cat.total, 0)
  const totalMastered = categories.reduce((sum, cat) => sum + cat.mastered, 0)
  const totalProgress = totalWords > 0 ? Math.round((totalMastered / totalWords) * 100) : 0

  // Prepare chart data
  const chartData = categories.map((cat) => ({
    name: cat.name,
    value: cat.total,
    mastered: cat.mastered,
    reviewing: cat.reviewing,
    learning: cat.learning,
  }))

  // Colors for the chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#ffc658"]

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Vocabulary Progress</CardTitle>
            <CardDescription>Track your progress across categories</CardDescription>
          </div>
          <Tabs value={view} onValueChange={(v) => setView(v as "list" | "chart")}>
            <TabsList>
              <TabsTrigger value="list">List</TabsTrigger>
              <TabsTrigger value="chart">Chart</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="space-y-2 mt-2">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span>
              {totalProgress}% ({totalMastered}/{totalWords})
            </span>
          </div>
          <Progress value={totalProgress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent>
        {view === "list" ? (
          <div className="space-y-4">
            {categories.map((category) => {
              const progress = category.total > 0 ? Math.round((category.mastered / category.total) * 100) : 0
              return (
                <div key={category.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{category.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {category.total} words
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">{progress}% complete</span>
                  </div>
                  <Progress value={progress} className="h-1.5" />
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    <span>{category.mastered} mastered</span>
                    <span>•</span>
                    <span>{category.reviewing} reviewing</span>
                    <span>•</span>
                    <span>{category.learning} learning</span>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
