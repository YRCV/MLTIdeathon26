import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Heart, MapPin, Clock, Repeat } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ListingCardProps {
  id: string
  title: string
  price: number
  image: string
  location: string
  timeAgo: string
  condition: "New" | "Like New" | "Good" | "Fair"
  isFree?: boolean
  onClick?: () => void
}

export function ListingCard({
  id,
  title,
  price,
  image,
  location,
  timeAgo,
  condition,
  isFree,
  onClick,
}: ListingCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const navigate = useNavigate()

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Like Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-9 w-9 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card"
          onClick={(e) => {
            e.stopPropagation()
            setIsLiked(!isLiked)
          }}
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-colors",
              isLiked ? "fill-red-500 text-red-500" : "text-foreground"
            )}
          />
          <span className="sr-only">Add to favorites</span>
        </Button>

        {/* Condition Badge */}
        <Badge
          variant="secondary"
          className="absolute bottom-2 left-2 bg-card/90 backdrop-blur-sm"
        >
          {condition}
        </Badge>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 font-medium text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>

        {isFree && (
          <p className="mb-3 text-lg font-semibold text-primary">Free</p>
        )}

        <div className="mb-4 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {timeAgo}
          </span>
        </div>

        <Button
          size="sm"
          className="mt-auto w-full gap-2"
          onClick={(e) => {
            e.stopPropagation()
            navigate(`/trade/${id}`)
          }}
        >
          <Repeat className="h-4 w-4" />
          Trade
        </Button>
      </div>
    </article>
  )
}
