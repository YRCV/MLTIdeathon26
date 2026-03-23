import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"

interface FilterSidebarProps {
  onFiltersChange?: (filters: FilterState) => void
}

export interface FilterState {
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
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const activeFiltersCount = selectedConditions.length + selectedCategories.length

  const clearAllFilters = () => {
    setSelectedConditions([])
    setSelectedCategories([])
    onFiltersChange?.({ conditions: [], categories: [], sortBy: "recent" })
  }

  const toggleCondition = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition) ? prev.filter((c) => c !== condition) : [...prev, condition]
    )
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
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
