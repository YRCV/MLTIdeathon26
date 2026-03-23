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

const stepVisuals = [
  // 01 — Profile card
  <div className="w-full max-w-xs mx-auto">
    <div className="rounded-2xl bg-card border border-border p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <span className="text-lg font-bold text-primary-foreground">A</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground">Alex Chen</p>
          <p className="text-xs text-muted-foreground truncate">alex.chen@university.edu</p>
        </div>
        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium flex-shrink-0">Verified</span>
      </div>
      <div className="space-y-2.5 text-sm">
        {[
          { label: "Campus", value: "State University" },
          { label: "Major", value: "Computer Science" },
          { label: "Year", value: "Junior" },
          { label: "Trades", value: "0 completed" },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between items-center">
            <span className="text-muted-foreground">{label}</span>
            <span className="text-foreground font-medium">{value}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex justify-between mb-1.5">
          <p className="text-xs text-muted-foreground">Profile completion</p>
          <p className="text-xs font-medium text-foreground">75%</p>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div className="h-full w-3/4 bg-primary rounded-full" />
        </div>
      </div>
    </div>
  </div>,

  // 02 — Listings grid
  <div className="w-full max-w-xs mx-auto space-y-2.5">
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
      <div className="h-9 bg-card border border-border rounded-lg pl-9 flex items-center">
        <span className="text-sm text-muted-foreground">textbooks, furniture…</span>
      </div>
    </div>
    {[
      { name: "Calculus Textbook 8e", condition: "Good", bg: "bg-blue-100" },
      { name: "Adjustable Desk Lamp", condition: "Like New", bg: "bg-yellow-100" },
      { name: "Compact Mini Fridge", condition: "Fair", bg: "bg-green-100" },
      { name: "Laptop Stand + Hub", condition: "New", bg: "bg-purple-100" },
    ].map((item) => (
      <div key={item.name} className="flex items-center gap-3 bg-card border border-border rounded-xl p-2.5">
        <div className={`h-11 w-11 rounded-lg ${item.bg} flex-shrink-0`} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
          <p className="text-xs text-muted-foreground">My Campus · Just now</p>
        </div>
        <span className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full flex-shrink-0">{item.condition}</span>
      </div>
    ))}
  </div>,

  // 03 — Trade offer
  <div className="w-full max-w-xs mx-auto space-y-3">
    <p className="text-xs font-semibold text-muted-foreground text-center uppercase tracking-widest">Trade Offer</p>
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-card border border-border rounded-xl p-3 text-center">
        <div className="h-14 w-14 rounded-lg bg-blue-100 mx-auto mb-2" />
        <p className="text-xs font-semibold text-foreground">Your Item</p>
        <p className="text-xs text-muted-foreground">Calc Textbook</p>
        <span className="mt-1 inline-block text-xs bg-secondary px-2 py-0.5 rounded-full">Good</span>
      </div>
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary shadow-md">
        <Repeat className="h-4 w-4 text-primary-foreground" />
      </div>
      <div className="flex-1 bg-card border border-border rounded-xl p-3 text-center">
        <div className="h-14 w-14 rounded-lg bg-yellow-100 mx-auto mb-2" />
        <p className="text-xs font-semibold text-foreground">Their Item</p>
        <p className="text-xs text-muted-foreground">Desk Lamp</p>
        <span className="mt-1 inline-block text-xs bg-secondary px-2 py-0.5 rounded-full">Like New</span>
      </div>
    </div>
    <div className="bg-secondary rounded-xl p-3">
      <p className="text-xs text-muted-foreground mb-1">Your message</p>
      <p className="text-sm text-foreground">"Hey! Would you trade your lamp for my calc textbook? It's barely used!"</p>
    </div>
    <div className="h-9 bg-primary rounded-xl flex items-center justify-center gap-2 cursor-pointer">
      <ArrowRight className="h-4 w-4 text-primary-foreground" />
      <span className="text-sm font-semibold text-primary-foreground">Send Offer</span>
    </div>
  </div>,

  // 04 — Chat
  <div className="w-full max-w-xs mx-auto space-y-2">
    <div className="flex items-center gap-2 bg-card border border-border rounded-xl p-3 mb-1">
      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
        <span className="text-xs font-bold text-primary-foreground">J</span>
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-foreground">Jordan</p>
        <p className="text-xs text-emerald-600 font-medium">Active now</p>
      </div>
      <MessageSquare className="h-4 w-4 text-muted-foreground" />
    </div>
    {[
      { text: "Hey! I accepted your offer 🎉", me: false, time: "2:14 PM" },
      { text: "Awesome! When can we meet?", me: true, time: "2:15 PM" },
      { text: "Library tomorrow at 3pm?", me: false, time: "2:16 PM" },
      { text: "Sounds perfect! See you there 👋", me: true, time: "2:17 PM" },
    ].map((msg, i) => (
      <div key={i} className={`flex ${msg.me ? "justify-end" : "justify-start"}`}>
        <div className={`max-w-[82%] rounded-2xl px-3 py-2 ${msg.me ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground"}`}>
          <p className="text-xs leading-snug">{msg.text}</p>
          <p className={`text-[10px] mt-0.5 ${msg.me ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{msg.time}</p>
        </div>
      </div>
    ))}
  </div>,

  // 05 — Swap complete + rating
  <div className="w-full max-w-xs mx-auto text-center space-y-4">
    <div className="mx-auto h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center">
      <Check className="h-8 w-8 text-emerald-600 stroke-[2.5]" />
    </div>
    <div>
      <p className="font-bold text-foreground text-lg">Trade Complete!</p>
      <p className="text-sm text-muted-foreground">Calculus Textbook ↔ Desk Lamp</p>
    </div>
    <div className="bg-card border border-border rounded-2xl p-4 text-left">
      <p className="text-sm font-semibold text-foreground mb-1">Rate your experience</p>
      <p className="text-xs text-muted-foreground mb-3">How was trading with Jordan?</p>
      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-xs text-muted-foreground italic border-l-2 border-primary/30 pl-2">"Great trader — item exactly as described. Super fast and friendly!"</p>
    </div>
    <div className="flex items-center justify-center gap-2 text-sm text-emerald-600 font-medium">
      <Check className="h-4 w-4" />
      <span>2 trades completed</span>
    </div>
  </div>,
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
                    <div key={step.number} className={`flex flex-col gap-8 lg:flex-row lg:gap-16 lg:items-center ${isReversed ? "lg:flex-row-reverse" : ""}`}>
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
                              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
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
                        <div className={`rounded-2xl ${index % 2 === 0 ? "bg-secondary" : "bg-muted"} p-6 sm:p-8 flex items-center justify-center min-h-[320px]`}>
                          {stepVisuals[index]}
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
