import { useState } from "react"
import { Grid, List, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageTransition } from "@/src/components/PageTransition"
import { ListingCard } from "@/components/listing-card"
import { ListingModal, type ListingDetails } from "@/components/listing-modal"
import { FilterSidebar } from "@/components/filter-sidebar"
import { listings } from "@/lib/sample-data"

export default function BrowsePage() {
  const [selectedListing, setSelectedListing] = useState<ListingDetails | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("recent")

  const handleListingClick = (listing: ListingDetails) => {
    setSelectedListing(listing)
    setIsModalOpen(true)
  }

  return (
    <PageTransition>
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Browse Listings</h1>
          <p className="mt-2 text-muted-foreground">
            Discover {listings.length}+ items from students near you
          </p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <FilterSidebar />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild className="lg:hidden">
                    <Button variant="outline" size="sm" className="gap-2">
                      <SlidersHorizontal className="h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 p-6">
                    <div className="mt-6">
                      <FilterSidebar />
                    </div>
                  </SheetContent>
                </Sheet>

                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{listings.length}</span> results
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Toggle */}
                <div className="hidden items-center rounded-lg border border-border p-1 sm:flex">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                    <span className="sr-only">Grid view</span>
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                    <span className="sr-only">List view</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Listings Grid */}
            <div
              className={
                viewMode === "grid"
                  ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                  : "flex flex-col gap-4"
              }
            >
              {listings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  id={listing.id}
                  title={listing.title}
                  price={listing.price}
                  image={listing.images[0]}
                  location={listing.location}
                  timeAgo={listing.timeAgo}
                  condition={listing.condition}
                  isFree={listing.isFree}
                  onClick={() => handleListingClick(listing)}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex items-center justify-center gap-2">
              <Button variant="outline" disabled>
                Previous
              </Button>
              <Button variant="secondary" size="icon">
                1
              </Button>
              <Button variant="ghost" size="icon">
                2
              </Button>
              <Button variant="ghost" size="icon">
                3
              </Button>
              <span className="px-2 text-muted-foreground">...</span>
              <Button variant="ghost" size="icon">
                12
              </Button>
              <Button variant="outline">
                Next
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Listing Modal */}
      <ListingModal
        listing={selectedListing}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
    </PageTransition>
  )
}
