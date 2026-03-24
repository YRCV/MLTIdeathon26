"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Search, Shield, Zap, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryCard } from "@/components/category-card"
import { ListingCard } from "@/components/listing-card"
import { ListingModal, type ListingDetails } from "@/components/listing-modal"
import { categories, listings } from "@/lib/sample-data"

export default function HomePage() {
  const [selectedListing, setSelectedListing] = useState<ListingDetails | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleListingClick = (listing: ListingDetails) => {
    setSelectedListing(listing)
    setIsModalOpen(true)
  }

  const featuredListings = listings.slice(0, 8)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary py-20 md:py-28">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-balance text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl md:text-6xl">
                Skip the price tag, just swap.
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                The trusted marketplace for college students. Find textbooks, furniture, electronics, and more from fellow students at your school.
              </p>
              
              {/* Search Bar */}
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="What are you looking for?"
                    className="h-14 w-full pl-12 text-base bg-card border-0 shadow-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button size="lg" variant="secondary" className="h-14 px-8 text-base">
                  Search
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="mt-12 flex flex-wrap justify-center gap-8 text-primary-foreground/90">
                <div className="text-center">
                  <p className="text-3xl font-bold">5,000+</p>
                  <p className="text-sm">Active Listings</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold">12,000+</p>
                  <p className="text-sm">Students</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold">50+</p>
                  <p className="text-sm">Universities</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  Browse Categories
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Find exactly what you need
                </p>
              </div>
              <Button variant="ghost" asChild className="hidden sm:flex">
                <Link href="/browse">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
              {categories.map((category) => (
                <CategoryCard
                  key={category.name}
                  name={category.name}
                  count={category.count}
                  icon={category.icon}
                />
              ))}
            </div>

            <Button variant="ghost" asChild className="mt-6 w-full sm:hidden">
              <Link href="/browse">
                View All Categories <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Featured Listings */}
        <section className="bg-secondary/50 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  Recently Listed
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Fresh finds from students near you
                </p>
              </div>
              <Button variant="ghost" asChild className="hidden sm:flex">
                <Link href="/browse">
                  See All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredListings.map((listing) => (
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

            <Button variant="ghost" asChild className="mt-6 w-full sm:hidden">
              <Link href="/browse">
                See All Listings <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Why CampusSwap */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                Why CampusSwap?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Built by students, for students. Here&apos;s what makes us different.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  Verified Students
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every user is verified with a .edu email address. Trade with confidence knowing you&apos;re dealing with real students.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  Quick & Easy
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  List items in under 2 minutes. Message buyers directly and meet up on campus for fast exchanges.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-8 sm:col-span-2 lg:col-span-1">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  Local Community
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  No shipping needed. Find items from students at your school and arrange convenient campus meetups.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-foreground py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold text-background sm:text-3xl">
                Ready to declutter your dorm?
              </h2>
              <p className="mt-4 text-background/80">
                List your first item in minutes. It&apos;s completely free to use.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" variant="secondary" className="px-8">
                  Start Selling
                </Button>
                <Button size="lg" variant="outline" className="border-background/20 text-background hover:bg-background/10 px-8">
                  Browse Items
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Listing Modal */}
      <ListingModal
        listing={selectedListing}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  )
}
