"use client"

import { useState } from "react"
import { ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"

interface FilterSidebarProps {
  onFiltersChange?: (filters: FilterState) => void
}

export interface FilterState {
  priceRange: [number, number]
  conditions: string[]
  categories: string[]
  sortBy: string
}

const conditions = ["New", "Like New", "Good", "Fair"]
const categories = [
  "Textbooks",
  "Furniture",
  "Electronics",
  "Bikes",
  "Clothing",
  "Kitchen",
  "Housing",
  "Other",
]

export function FilterSidebar({ onFiltersChange }: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const activeFiltersCount = selectedConditions.length + selectedCategories.length + (priceRange[0] > 0 || priceRange[1] < 500 ? 1 : 0)

  const clearAllFilters = () => {
    setPriceRange([0, 500])
    setSelectedConditions([])
    setSelectedCategories([])
    onFiltersChange?.({
      priceRange: [0, 500],
      conditions: [],
      categories: [],
      sortBy: "recent",
    })
  }

  const toggleCondition = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    )
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  return (
    <aside className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Filters</h2>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-8 text-sm">
            Clear all
            <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
              {activeFiltersCount}
            </Badge>
          </Button>
        )}
      </div>

      {/* Price Range */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <span className="font-medium text-foreground">Price Range</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <div className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              max={500}
              step={10}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm">
              <span className="rounded-md bg-secondary px-3 py-1 text-foreground">
                ${priceRange[0]}
              </span>
              <span className="text-muted-foreground">to</span>
              <span className="rounded-md bg-secondary px-3 py-1 text-foreground">
                ${priceRange[1]}+
              </span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Condition */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <span className="font-medium text-foreground">Condition</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <div className="space-y-3">
            {conditions.map((condition) => (
              <div key={condition} className="flex items-center gap-3">
                <Checkbox
                  id={condition}
                  checked={selectedConditions.includes(condition)}
                  onCheckedChange={() => toggleCondition(condition)}
                />
                <Label htmlFor={condition} className="text-sm font-normal cursor-pointer">
                  {condition}
                </Label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Categories */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <span className="font-medium text-foreground">Categories</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category} className="flex items-center gap-3">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                />
                <Label htmlFor={category} className="text-sm font-normal cursor-pointer">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Apply Button */}
      <Button className="w-full">Apply Filters</Button>
    </aside>
  )
}
