import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  UserPlus, Search, MessageSquare, Repeat, Star,
  Shield, Users, Leaf, ArrowRight, Check, Heart
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { type Variants } from "framer-motion"
import { PageTransition, fadeUp, stagger, slideLeft, slideRight } from "@/src/components/PageTransition"

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number]

const steps = [
  { number: "01", title: "Create Your Account", description: "Sign up with your .edu email to verify you're a student. Set up your profile with your campus, interests, and what you're looking to trade.", icon: UserPlus, details: ["Verify with your university email", "Add your campus location", "Set your trading preferences", "Upload a profile photo"], color: "bg-primary" },
  { number: "02", title: "Browse & List Items", description: "Explore what other students are offering or list your own items. No prices needed - just describe what you have and what you'd like in return.", icon: Search, details: ["Search by category or keyword", "Filter by campus proximity", "List items with photos", "Describe your ideal trade"], color: "bg-accent" },
  { number: "03", title: "Make an Offer", description: "Found something you want? Propose a trade by offering one of your items. The other student will receive your offer and can accept, decline, or counter.", icon: Repeat, details: ["Select items from your listings", "Add a personal message", "Propose multiple items if needed", "Negotiate until both are happy"], color: "bg-primary" },
  { number: "04", title: "Chat & Arrange", description: "Once an offer is accepted, use our secure messaging to coordinate the swap. Agree on a safe meeting spot on or near campus.", icon: MessageSquare, details: ["In-app secure messaging", "Share meeting location", "Confirm swap details", "Get notified in real-time"], color: "bg-accent" },
  { number: "05", title: "Swap & Rate", description: "Meet up, exchange items, and complete the trade. After the swap, rate your experience to help build trust in the community.", icon: Star, details: ["Meet at a safe location", "Verify item condition", "Complete the trade", "Leave an honest review"], color: "bg-primary" },
]

const benefits = [
  { icon: Leaf, title: "Sustainable", description: "Give items a second life instead of throwing them away. Reduce waste and help the environment." },
  { icon: Users, title: "Community", description: "Connect with fellow students on your campus. Build relationships through trading." },
  { icon: Shield, title: "Safe & Verified", description: "All users are verified students. Trade with confidence knowing who you're dealing with." },
  { icon: Heart, title: "No Money Needed", description: "Trade items directly without spending a dime. One person's unused textbook is another's treasure." },
]

const faqs = [
  { question: "Why trading instead of selling?", answer: "We believe in the power of exchange! Trading lets students get what they need without spending money. That textbook you finished? Trade it for a desk lamp. Your old bike? Swap it for a guitar. Everyone wins." },
  { question: "What if items aren't equal value?", answer: "Value is subjective! If both parties agree to a trade, that's all that matters. You might trade three small items for one bigger one, or just do a straight swap if both people are happy." },
  { question: "How do I know I can trust other traders?", answer: "Every user must verify with a .edu email. Plus, our rating system shows each person's trade history. Look for users with high ratings and read their reviews before trading." },
  { question: "Where should we meet for trades?", answer: "We recommend meeting in public areas on campus - student centers, libraries, or busy common areas. Many campuses have designated safe exchange zones. Never meet alone in private locations." },
  { question: "What happens if there's a problem?", answer: "If an item isn't as described or there's a dispute, our support team can help mediate. Leave an honest review to warn others, and report any serious issues to us immediately." },
]

const heroStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
}
const heroItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
}

export default function HowItWorksPage() {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          {/* Hero */}
          <section className="relative overflow-hidden bg-primary py-20 sm:py-28">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent" />
              <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-card" />
            </div>
            <motion.div
              className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"
              variants={heroStagger}
              initial="hidden"
              animate="show"
            >
              <motion.span variants={heroItem} className="mb-4 inline-block rounded-full bg-card/20 px-4 py-1.5 text-sm font-medium text-primary-foreground">
                The Student Exchange Platform
              </motion.span>
              <motion.h1 variants={heroItem} className="mb-6 text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl text-balance">
                Trade Items, Not Money
              </motion.h1>
              <motion.p variants={heroItem} className="mx-auto max-w-2xl text-lg text-primary-foreground/80 leading-relaxed text-pretty">
                CampusSwap is a marketplace where college students exchange items directly with each other.
                No cash, no hassle - just students helping students get what they need.
              </motion.p>
            </motion.div>
          </section>

          {/* Steps */}
          <section className="py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.div className="mb-16 text-center" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">How CampusSwap Works</h2>
                <p className="mx-auto max-w-2xl text-muted-foreground text-lg">From sign up to successful swap — here's your journey</p>
              </motion.div>

              <div className="space-y-12 lg:space-y-16">
                {steps.map((step, index) => {
                  const isReversed = index % 2 === 1
                  const contentVariant = isReversed ? slideRight : slideLeft
                  const visualVariant = isReversed ? slideLeft : slideRight
                  return (
                    <div key={step.number} className={`flex flex-col gap-8 lg:flex-row lg:gap-16 ${isReversed ? "lg:flex-row-reverse" : ""}`}>
                      <motion.div
                        className="flex-1 flex flex-col justify-center"
                        variants={contentVariant}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-5xl font-bold text-muted-foreground/30">{step.number}</span>
                          <div className={`p-3 rounded-xl ${step.color}`}>
                            <step.icon className="h-6 w-6 text-primary-foreground" />
                          </div>
                        </div>
                        <h3 className="mb-3 text-2xl font-bold text-foreground">{step.title}</h3>
                        <p className="mb-6 text-muted-foreground leading-relaxed">{step.description}</p>
                        <ul className="space-y-2">
                          {step.details.map((detail, i) => (
                            <motion.li
                              key={i}
                              className="flex items-center gap-3 text-sm text-foreground"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.08, duration: 0.35 }}
                              viewport={{ once: true }}
                            >
                              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                                <Check className="h-3 w-3 text-primary" />
                              </div>
                              {detail}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>

                      <motion.div
                        className="flex-1"
                        variants={visualVariant}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                      >
                        <div className={`relative aspect-[4/3] rounded-2xl ${index % 2 === 0 ? "bg-secondary" : "bg-muted"} overflow-hidden`}>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                              className={`p-8 rounded-2xl ${step.color}/10`}
                              whileInView={{ scale: [0.8, 1.05, 1] }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                              viewport={{ once: true }}
                            >
                              <step.icon className={`h-24 w-24 ${step.color === "bg-primary" ? "text-primary" : "text-accent"}`} />
                            </motion.div>
                          </div>
                          <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-primary/20" />
                          <div className="absolute bottom-8 left-8 h-12 w-12 rounded-full bg-accent/20" />
                        </div>
                      </motion.div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="bg-secondary py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.div className="mb-16 text-center" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Why Trade on CampusSwap?</h2>
                <p className="mx-auto max-w-2xl text-muted-foreground text-lg">Join thousands of students already swapping</p>
              </motion.div>

              <motion.div
                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
                variants={stagger(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
              >
                {benefits.map((b) => (
                  <motion.div key={b.title} variants={fadeUp} className="rounded-2xl bg-card p-6 text-center shadow-sm">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                      <b.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="mb-2 font-semibold text-foreground">{b.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Example Trade */}
          <section className="py-20 sm:py-28">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <motion.div className="mb-12 text-center" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">See a Trade in Action</h2>
                <p className="mx-auto max-w-2xl text-muted-foreground text-lg">Here's how a typical swap works</p>
              </motion.div>

              <motion.div
                className="rounded-2xl bg-card border border-border p-6 sm:p-10"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
              >
                <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
                  <motion.div className="flex-1 text-center" variants={slideLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
                    <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-secondary flex items-center justify-center">
                      <span className="text-2xl font-bold text-muted-foreground">A</span>
                    </div>
                    <h4 className="font-semibold text-foreground">Alex</h4>
                    <p className="text-sm text-muted-foreground mb-4">Junior, Biology Major</p>
                    <div className="rounded-xl bg-secondary p-4">
                      <p className="text-xs text-muted-foreground mb-1">Has</p>
                      <p className="font-medium text-foreground">Intro to Psychology Textbook</p>
                      <p className="text-xs text-muted-foreground mt-2 mb-1">Wants</p>
                      <p className="font-medium text-foreground">Desk Lamp</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center justify-center"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                      <Repeat className="h-8 w-8 text-primary-foreground" />
                    </div>
                  </motion.div>

                  <motion.div className="flex-1 text-center" variants={slideRight} initial="hidden" whileInView="show" viewport={{ once: true }}>
                    <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-secondary flex items-center justify-center">
                      <span className="text-2xl font-bold text-muted-foreground">J</span>
                    </div>
                    <h4 className="font-semibold text-foreground">Jordan</h4>
                    <p className="text-sm text-muted-foreground mb-4">Sophomore, Psych Major</p>
                    <div className="rounded-xl bg-secondary p-4">
                      <p className="text-xs text-muted-foreground mb-1">Has</p>
                      <p className="font-medium text-foreground">Desk Lamp (barely used)</p>
                      <p className="text-xs text-muted-foreground mt-2 mb-1">Wants</p>
                      <p className="font-medium text-foreground">Psychology Textbooks</p>
                    </div>
                  </motion.div>
                </div>

                <div className="mt-8 pt-6 border-t border-border text-center">
                  <p className="text-sm text-muted-foreground">Alex and Jordan connected, messaged to arrange a meetup at the library, made the swap, and both left 5-star reviews.</p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-muted py-20 sm:py-28">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <motion.div className="mb-12 text-center" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Frequently Asked Questions</h2>
              </motion.div>

              <motion.div
                className="space-y-4"
                variants={stagger(0.08)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
              >
                {faqs.map((faq, index) => (
                  <motion.div key={index} variants={fadeUp} className="rounded-xl bg-card p-6">
                    <h3 className="mb-2 font-semibold text-foreground">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* CTA */}
          <motion.section
            className="py-20 sm:py-28"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Ready to Start Trading?</h2>
              <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
                Join CampusSwap today and discover a new way to get what you need on campus — without spending a dime.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="gap-2" asChild>
                  <Link to="/signup">Create Your Account <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/browse">Browse Items First</Link>
                </Button>
              </div>
            </div>
          </motion.section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  )
}
