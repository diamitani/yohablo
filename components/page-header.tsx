"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ChevronRight, Home } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

interface PageHeaderProps {
  title: string
  description?: string
  badge?: string
  children?: React.ReactNode
}

export function PageHeader({ title, description, badge, children }: PageHeaderProps) {
  const pathname = usePathname()

  const generateBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean)
    const breadcrumbs = [{ label: "Home", href: "/" }]

    let currentPath = ""
    paths.forEach((path, index) => {
      currentPath += `/${path}`
      const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ")

      if (index === paths.length - 1) {
        breadcrumbs.push({ label: title, href: currentPath, isCurrentPage: true })
      } else {
        breadcrumbs.push({ label, href: currentPath })
      }
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <div className="border-b bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-gray-900/50 dark:to-gray-800/50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Breadcrumbs */}
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.href} className="flex items-center">
                  {index > 0 && (
                    <BreadcrumbSeparator>
                      <ChevronRight className="h-4 w-4" />
                    </BreadcrumbSeparator>
                  )}
                  <BreadcrumbItem>
                    {crumb.isCurrentPage ? (
                      <BreadcrumbPage className="font-medium">{crumb.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link
                          href={crumb.href}
                          className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                        >
                          {index === 0 && <Home className="h-3 w-3" />}
                          {crumb.label}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>

          {/* Header Content */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
              {badge && (
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">{badge}</Badge>
              )}
            </div>

            {description && (
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">{description}</p>
            )}

            {children && <div className="pt-2">{children}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
