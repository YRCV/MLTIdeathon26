import { useState } from "react"
import { Link } from "react-router-dom"
import { Repeat, Send, Check, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { getMyListings } from "@/src/pages/ListItem"
import type { ListingDetails } from "@/components/listing-modal"

interface TradeOfferModalProps {
  targetListing: ListingDetails | null
  allListings: ListingDetails[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TradeOfferModal({
  targetListing,
  allListings,
  open,
  onOpenChange,
}: TradeOfferModalProps) {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)

  const myItems = getMyListings()

  const handleSend = () => {
    if (!selectedItemId) return
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setSelectedItemId(null)
      setMessage("")
      onOpenChange(false)
    }, 1800)
  }

  if (!targetListing) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogTitle className="text-lg font-semibold">
          Propose a Trade
        </DialogTitle>

        {sent ? (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <Check className="h-8 w-8 text-emerald-600" />
            </div>
            <p className="font-semibold text-foreground">Trade request sent!</p>
            <p className="text-sm text-muted-foreground">
              {targetListing.seller.name} will be notified.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* They have */}
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                They have
              </p>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 p-3">
                <img
                  src={targetListing.images[0]}
                  alt={targetListing.title}
                  className="h-14 w-14 rounded-lg object-cover shrink-0"
                />
                <div className="min-w-0">
                  <p className="font-medium text-foreground line-clamp-1">
                    {targetListing.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant="secondary" className="text-xs">{targetListing.condition}</Badge>
                    <span className="text-xs text-muted-foreground">{targetListing.seller.name}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Swap icon */}
            <div className="flex items-center justify-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <Repeat className="h-4 w-4 text-primary" />
              </div>
            </div>

            {/* You offer */}
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                You offer — select one of your items
              </p>
              {myItems.length === 0 && (
                <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border py-8 text-center">
                  <p className="text-sm text-muted-foreground">You haven't listed any items yet.</p>
                  <Button size="sm" className="gap-2" asChild>
                    <Link to="/list">
                      <Plus className="h-4 w-4" />
                      List an Item
                    </Link>
                  </Button>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {myItems.map((item) => {
                  const selected = selectedItemId === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedItemId(item.id)}
                      className={cn(
                        "relative flex flex-col overflow-hidden rounded-xl border text-left transition-all",
                        selected
                          ? "border-primary ring-2 ring-primary/30"
                          : "border-border hover:border-primary/40"
                      )}
                    >
                      <div className="aspect-square w-full overflow-hidden bg-secondary">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-2">
                        <p className="line-clamp-1 text-xs font-medium text-foreground">
                          {item.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{item.condition}</p>
                      </div>
                      {selected && (
                        <div className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                          <Check className="h-3 w-3 text-primary-foreground" />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Message */}
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Add a message (optional)
              </p>
              <Textarea
                placeholder={`Hey ${targetListing.seller.name}, I'd love to trade...`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="resize-none bg-secondary border-0"
                rows={3}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 gap-2"
                disabled={!selectedItemId}
                onClick={handleSend}
              >
                <Send className="h-4 w-4" />
                Send Request
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
