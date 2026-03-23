import { useState } from "react"
import { Heart, MapPin, Clock, MessageCircle, Share2, ChevronLeft, ChevronRight, User } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

export interface ListingDetails {
  id: string
  title: string
  description: string
  price: number
  images: string[]
  location: string
  timeAgo: string
  condition: "New" | "Like New" | "Good" | "Fair"
  category: string
  isFree?: boolean
  seller: {
    name: string
    avatar?: string
    rating: number
    responseTime: string
    memberSince: string
  }
}

interface ListingModalProps {
  listing: ListingDetails | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ListingModal({ listing, open, onOpenChange }: ListingModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  if (!listing) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % listing.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <VisuallyHidden>
          <DialogTitle>{listing.title}</DialogTitle>
        </VisuallyHidden>
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Gallery */}
          <div className="relative aspect-square bg-secondary">
            <img
              src={listing.images[currentImageIndex]}
              alt={`${listing.title} - Image ${currentImageIndex + 1}`}
              className="h-full w-full object-cover"
            />
            
            {listing.images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
                
                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {listing.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        "h-2 w-2 rounded-full transition-colors",
                        index === currentImageIndex
                          ? "bg-card"
                          : "bg-card/50"
                      )}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col p-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {listing.category}
                </Badge>
                <h2 className="text-2xl font-semibold text-foreground">
                  {listing.title}
                </h2>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart
                    className={cn(
                      "h-5 w-5",
                      isLiked ? "fill-red-500 text-red-500" : "text-foreground"
                    )}
                  />
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Free badge */}
            {listing.isFree && (
              <p className="text-3xl font-bold text-primary mb-4">Free</p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {listing.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {listing.timeAgo}
              </span>
              <Badge variant="outline">{listing.condition}</Badge>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-medium text-foreground mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {listing.description}
              </p>
            </div>

            {/* Seller Info */}
            <div className="rounded-lg border border-border p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={listing.seller.avatar} />
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">{listing.seller.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Member since {listing.seller.memberSince}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>⭐ {listing.seller.rating} rating</span>
                <span>Responds {listing.seller.responseTime}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-auto flex gap-3">
              <Button className="flex-1 gap-2">
                <MessageCircle className="h-4 w-4" />
                Message Seller
              </Button>
              <Button variant="outline" className="flex-1">
                Make an Offer
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
