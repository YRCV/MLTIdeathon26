"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Menu, X, User, Plus, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">C</span>
          </div>
          <span className="hidden text-xl font-semibold tracking-tight text-foreground sm:inline-block">
            CampusSwap
          </span>
        </Link>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden flex-1 max-w-md md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search textbooks, furniture, electronics..."
              className="w-full pl-10 bg-secondary border-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/browse">Browse</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/how-it-works">How It Works</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/messages" className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>Messages</span>
            </Link>
          </Button>
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            <span>List Item</span>
          </Button>
          <Button variant="outline" size="icon" className="ml-2">
            <User className="h-4 w-4" />
            <span className="sr-only">Account</span>
          </Button>
        </nav>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col gap-6 pt-6">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search items..."
                  className="w-full pl-10 bg-secondary border-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Mobile Nav Links */}
              <nav className="flex flex-col gap-2">
                <Button variant="ghost" className="justify-start" asChild>
                  <Link href="/browse">Browse All</Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <Link href="/how-it-works">How It Works</Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <Link href="/messages">Messages</Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <Link href="/account">My Account</Link>
                </Button>
              </nav>

              <Button className="w-full gap-2">
                <Plus className="h-4 w-4" />
                List an Item
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
