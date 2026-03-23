import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Repeat, MapPin, Clock, CheckCircle2, Circle, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageTransition, fadeUp, stagger } from "@/src/components/PageTransition"
import { TradeOfferModal } from "@/components/trade-offer-modal"
import { listings } from "@/lib/sample-data"
import type { ListingDetails } from "@/components/listing-modal"

// ── Matching logic ──────────────────────────────────────────────────────────

const CONDITIONS = { New: 4, "Like New": 3, Good: 2, Fair: 1 } as const

function matchScore(target: ListingDetails, candidate: ListingDetails): number {
  let score = 0

  // Same category → strongest signal
  if (candidate.category === target.category) score += 3

  // Price proximity
  const targetPrice = target.isFree ? 0 : target.price
  const candidatePrice = candidate.isFree ? 0 : candidate.price
  if (targetPrice > 0) {
    const diff = Math.abs(targetPrice - candidatePrice) / targetPrice
    if (diff <= 0.2) score += 3
    else if (diff <= 0.5) score += 2
    else if (diff <= 1.0) score += 1
  } else {
    // target is free — low-price items score better
    if (candidatePrice <= 20) score += 2
    else if (candidatePrice <= 60) score += 1
  }

  // Condition proximity
  const tCond = CONDITIONS[target.condition] ?? 2
  const cCond = CONDITIONS[candidate.condition] ?? 2
  const condDiff = Math.abs(tCond - cCond)
  if (condDiff === 0) score += 2
  else if (condDiff === 1) score += 1

  return score
}

type MatchLevel = "high" | "medium" | "low"

function getMatchLevel(score: number): MatchLevel {
  if (score >= 6) return "high"
  if (score >= 3) return "medium"
  return "low"
}

// ── Sub-components ──────────────────────────────────────────────────────────

function MatchBadge({ level }: { level: MatchLevel }) {
  if (level === "high")
    return (
      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
        <CheckCircle2 className="h-3.5 w-3.5" /> High Match
      </span>
    )
  if (level === "medium")
    return (
      <span className="flex items-center gap-1 text-xs font-semibold text-amber-500">
        <Circle className="h-3.5 w-3.5" /> Medium Match
      </span>
    )
  return (
    <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
      <Minus className="h-3.5 w-3.5" /> Low Match
    </span>
  )
}

function TradeItemCard({
  listing,
  level,
  onPropose,
}: {
  listing: ListingDetails
  level: MatchLevel
  onPropose: (listing: ListingDetails) => void
}) {
  const levelBorder =
    level === "high"
      ? "border-emerald-200 bg-emerald-50/30"
      : level === "medium"
      ? "border-amber-200 bg-amber-50/20"
      : "border-border"

  return (
    <div
      className={`flex gap-4 rounded-xl border p-4 transition-shadow hover:shadow-md ${levelBorder}`}
    >
      {/* Thumbnail */}
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-secondary">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between gap-1 min-w-0">
        <div>
          <div className="mb-1 flex items-center justify-between gap-2">
            <MatchBadge level={level} />
            <Badge variant="secondary" className="text-xs">
              {listing.condition}
            </Badge>
          </div>
          <h4 className="line-clamp-1 font-medium text-foreground">
            {listing.title}
          </h4>
          {listing.isFree && (
            <p className="text-sm font-semibold text-primary">Free</p>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {listing.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {listing.timeAgo}
          </span>
        </div>
      </div>

      {/* Action */}
      <div className="flex items-center">
        <Button size="sm" className="gap-1.5 shrink-0" onClick={() => onPropose(listing)}>
          <Repeat className="h-3.5 w-3.5" />
          Propose
        </Button>
      </div>
    </div>
  )
}

function Section({
  title,
  subtitle,
  icon,
  items,
  level,
  onPropose,
}: {
  title: string
  subtitle: string
  icon: React.ReactNode
  items: ListingDetails[]
  level: MatchLevel
  onPropose: (listing: ListingDetails) => void
}) {
  if (items.length === 0) return null
  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        {icon}
        <div>
          <h2 className="font-semibold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <span className="ml-auto rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          {items.length}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <TradeItemCard key={item.id} listing={item} level={level} onPropose={onPropose} />
        ))}
      </div>
    </section>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function TradePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [offerTarget, setOfferTarget] = useState<ListingDetails | null>(null)
  const [offerOpen, setOfferOpen] = useState(false)

  const target = listings.find((l) => l.id === id)

  const handlePropose = (listing: ListingDetails) => {
    setOfferTarget(listing)
    setOfferOpen(true)
  }

  if (!target) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-2xl px-4 py-20 text-center">
          <p className="text-muted-foreground">Listing not found.</p>
          <Button className="mt-4" onClick={() => navigate("/browse")}>
            Back to Browse
          </Button>
        </main>
        <Footer />
      </div>
    )
  }

  // Score & group all other listings
  const scored = listings
    .filter((l) => l.id !== target.id)
    .map((l) => ({ listing: l, score: matchScore(target, l) }))
    .sort((a, b) => b.score - a.score)

  const high = scored.filter((x) => getMatchLevel(x.score) === "high").map((x) => x.listing)
  const medium = scored.filter((x) => getMatchLevel(x.score) === "medium").map((x) => x.listing)
  const low = scored.filter((x) => getMatchLevel(x.score) === "low").map((x) => x.listing)

  return (
    <>
    <PageTransition>
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back */}
        <Button
          variant="ghost"
          size="sm"
          className="mb-6 gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {/* Target item summary */}
        <div className="mb-8 rounded-2xl border border-border bg-card p-5">
          <p className="mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wide">
            You want to trade for
          </p>
          <div className="flex gap-4">
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-secondary">
              <img
                src={target.images[0]}
                alt={target.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center gap-1">
              <Badge variant="secondary" className="w-fit">
                {target.category}
              </Badge>
              <h1 className="text-lg font-semibold text-foreground">
                {target.title}
              </h1>
              <div className="flex items-center gap-3 text-sm">
                {target.isFree && (
                  <span className="font-semibold text-primary">Free</span>
                )}
                <span className="text-muted-foreground">{target.condition}</span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {target.location}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Offer heading */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground">
            What could you offer in return?
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Items are ranked by how well they match based on category, value, and condition.
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-10">
          <Section
            title="High Match"
            subtitle="Same category or very similar value"
            icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />}
            items={high}
            level="high"
            onPropose={handlePropose}
          />
          <Section
            title="Medium Match"
            subtitle="Related value or similar condition"
            icon={<Circle className="h-5 w-5 text-amber-500" />}
            items={medium}
            level="medium"
            onPropose={handlePropose}
          />
          <Section
            title="Low Match"
            subtitle="Different category or value range"
            icon={<Minus className="h-5 w-5 text-muted-foreground" />}
            items={low}
            level="low"
            onPropose={handlePropose}
          />
        </div>
      </main>

      <Footer />
    </div>
    </PageTransition>

    <TradeOfferModal
      targetListing={offerTarget}
      allListings={listings}
      open={offerOpen}
      onOpenChange={setOfferOpen}
    />
    </>
  )
}
