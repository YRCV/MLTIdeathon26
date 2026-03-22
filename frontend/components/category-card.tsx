"use client"

import { cn } from "@/lib/utils"
import { BookOpen, Sofa, Laptop, Bike, Shirt, Utensils, Home, MoreHorizontal } from "lucide-react"

const categoryIcons = {
  textbooks: BookOpen,
  furniture: Sofa,
  electronics: Laptop,
  bikes: Bike,
  clothing: Shirt,
  kitchen: Utensils,
  housing: Home,
  other: MoreHorizontal,
}

interface CategoryCardProps {
  name: string
  count: number
  icon: keyof typeof categoryIcons
  isSelected?: boolean
  onClick?: () => void
}

export function CategoryCard({ name, count, icon, isSelected, onClick }: CategoryCardProps) {
  const Icon = categoryIcons[icon]

  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex flex-col items-center gap-3 rounded-xl border p-6 transition-all hover:border-primary hover:shadow-md",
        isSelected
          ? "border-primary bg-primary/5 shadow-md"
          : "border-border bg-card"
      )}
    >
      <div
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full transition-colors",
          isSelected
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-foreground group-hover:bg-primary group-hover:text-primary-foreground"
        )}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div className="text-center">
        <p className="font-medium text-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">{count} items</p>
      </div>
    </button>
  )
}
