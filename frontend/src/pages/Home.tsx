import { useState, type ElementType } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, Search, Shield, Zap, Users, BookOpen, Sofa, Laptop, Bike, Shirt, Utensils, Home as HomeIcon, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ListingCard } from "@/components/listing-card"
import { ListingModal, type ListingDetails } from "@/components/listing-modal"
import { categories, listings } from "@/lib/sample-data"
import { type Variants } from "framer-motion"
import { PageTransition, fadeUp, stagger } from "@/src/components/PageTransition"

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number]

const categoryIconMap: Record<string, ElementType> = {
  textbooks: BookOpen,
  furniture: Sofa,
  electronics: Laptop,
  bikes: Bike,
  clothing: Shirt,
  kitchen: Utensils,
  housing: HomeIcon,
  other: MoreHorizontal,
}

const heroStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}
const heroItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
}

export default function HomePage() {
  const navigate = useNavigate()
  const [selectedListing, setSelectedListing] = useState<ListingDetails | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleListingClick = (listing: ListingDetails) => {
    setSelectedListing(listing)
    setIsModalOpen(true)
  }

  const featuredListings = listings.slice(0, 8)

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-primary py-20 md:py-28">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.div
                className="mx-auto max-w-3xl text-center"
                variants={heroStagger}
                initial="hidden"
                animate="show"
              >
                <motion.h1
                  variants={heroItem}
                  className="text-balance text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl md:text-6xl"
                >
                  Buy, Sell & Exchange on Campus
                </motion.h1>
                <motion.p variants={heroItem} className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                  The trusted marketplace for college students. Find textbooks, furniture, electronics, and more from fellow students at your school.
                </motion.p>

                {/* Search Bar */}
                <motion.div variants={heroItem} className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
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
                </motion.div>

                {/* Quick Stats */}
                <motion.div variants={heroItem} className="mt-12 flex flex-wrap justify-center gap-8 text-primary-foreground/90">
                  {[
                    { value: "5,000+", label: "Active Listings" },
                    { value: "12,000+", label: "Students" },
                    { value: "50+", label: "Universities" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="text-sm">{stat.label}</p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Categories Section */}
          <section className="py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.div
                className="mb-10 flex items-end justify-between"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
              >
                <div>
                  <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Browse Categories</h2>
                  <p className="mt-2 text-muted-foreground">Find exactly what you need</p>
                </div>
                <Button variant="ghost" asChild className="hidden sm:flex">
                  <Link to="/browse">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </motion.div>

              <motion.div
                className="grid grid-cols-4 gap-3 md:grid-cols-8"
                variants={stagger(0.06)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
              >
                {categories.map((category) => {
                  const Icon = categoryIconMap[category.icon]
                  return (
                    <motion.button
                      key={category.name}
                      variants={fadeUp}
                      onClick={() => navigate(`/browse?category=${encodeURIComponent(category.name)}`)}
                      className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card px-3 py-6 text-center transition-all hover:border-primary hover:shadow-md"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-7 w-7" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground leading-tight">{category.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{category.count} items</p>
                      </div>
                    </motion.button>
                  )
                })}
              </motion.div>

              <Button variant="ghost" asChild className="mt-6 w-full sm:hidden">
                <Link to="/browse">View All Categories <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </section>

          {/* Featured Listings */}
          <section className="bg-secondary/50 py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.div
                className="mb-10 flex items-end justify-between"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
              >
                <div>
                  <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Recently Listed</h2>
                  <p className="mt-2 text-muted-foreground">Fresh finds from students near you</p>
                </div>
                <Button variant="ghost" asChild className="hidden sm:flex">
                  <Link to="/browse">See All <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </motion.div>

              <motion.div
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                variants={stagger(0.07)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
              >
                {featuredListings.map((listing) => (
                  <motion.div key={listing.id} variants={fadeUp} className="h-full">
                    <ListingCard
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
                  </motion.div>
                ))}
              </motion.div>

              <Button variant="ghost" asChild className="mt-6 w-full sm:hidden">
                <Link to="/browse">See All Listings <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </section>

          {/* Why CampusSwap */}
          <section className="py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.div
                className="mx-auto mb-12 max-w-2xl text-center"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
              >
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Why CampusSwap?</h2>
                <p className="mt-4 text-muted-foreground">
                  Built by students, for students. Here&apos;s what makes us different.
                </p>
              </motion.div>

              <motion.div
                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                variants={stagger(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
              >
                {[
                  {
                    icon: Shield,
                    title: "Verified Students",
                    body: "Every user is verified with a .edu email address. Trade with confidence knowing you're dealing with real students.",
                    extra: "",
                  },
                  {
                    icon: Zap,
                    title: "Quick & Easy",
                    body: "List items in under 2 minutes. Message buyers directly and meet up on campus for fast exchanges.",
                    extra: "",
                  },
                  {
                    icon: Users,
                    title: "Local Community",
                    body: "No shipping needed. Find items from students at your school and arrange convenient campus meetups.",
                    extra: "sm:col-span-2 lg:col-span-1",
                  },
                ].map(({ icon: Icon, title, body, extra }) => (
                  <motion.div
                    key={title}
                    variants={fadeUp}
                    className={`rounded-xl border border-border bg-card p-8 ${extra}`}
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-foreground">{title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{body}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <motion.section
            className="bg-foreground py-16 md:py-24"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-2xl font-bold text-background sm:text-3xl">
                  Ready to declutter your dorm?
                </h2>
                <p className="mt-4 text-background/80">List your first item in minutes. It&apos;s completely free to use.</p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Button size="lg" variant="secondary" className="px-8">Start Trading</Button>
                  <Button size="lg" variant="outline" className="border-background/20 text-background hover:bg-background/10 px-8">
                    Browse Items
                  </Button>
                </div>
              </div>
            </div>
          </motion.section>
        </main>

        <Footer />

        <ListingModal listing={selectedListing} open={isModalOpen} onOpenChange={setIsModalOpen} />
      </div>
    </PageTransition>
  )
}
