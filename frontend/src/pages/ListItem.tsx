import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ImagePlus, X, CheckCircle2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageTransition, fadeUp, stagger } from "@/src/components/PageTransition"

const CONDITIONS = ["New", "Like New", "Good", "Fair"] as const
const CATEGORIES = [
  "Textbooks", "Furniture", "Electronics", "Bikes",
  "Clothing", "Kitchen", "Housing", "Other",
] as const

export interface UserListing {
  id: string
  title: string
  description: string
  condition: string
  category: string
  images: string[]
  isFree: boolean
  price: number
  location: string
  timeAgo: string
  seller: { name: string; rating: number; responseTime: string; memberSince: string }
}

export function getMyListings(): UserListing[] {
  try {
    return JSON.parse(localStorage.getItem("my_listings") || "[]")
  } catch {
    return []
  }
}

function saveMyListings(items: UserListing[]) {
  localStorage.setItem("my_listings", JSON.stringify(items))
}

export default function ListItemPage() {
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)

  const [photos, setPhotos] = useState<string[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [condition, setCondition] = useState("")
  const [category, setCategory] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handlePhotoAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setPhotos((prev) => [...prev, ev.target!.result as string].slice(0, 4))
        }
      }
      reader.readAsDataURL(file)
    })
    e.target.value = ""
  }

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const canSubmit = title.trim() && description.trim() && condition && category && photos.length > 0

  const handleSubmit = () => {
    if (!canSubmit) return

    const newItem: UserListing = {
      id: `user_${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      condition,
      category,
      images: photos,
      isFree: false,
      price: 0,
      location: "My Campus",
      timeAgo: "Just now",
      seller: {
        name: "You",
        rating: 5.0,
        responseTime: "immediately",
        memberSince: new Date().getFullYear().toString(),
      },
    }

    saveMyListings([...getMyListings(), newItem])
    setSubmitted(true)
    setTimeout(() => navigate("/browse"), 2000)
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            className="mb-6 gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          {submitted ? (
            <motion.div
              className="flex flex-col items-center gap-4 py-20 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                <CheckCircle2 className="h-10 w-10 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Item Listed!</h2>
              <p className="text-muted-foreground">
                Your item is now available for trading. Redirecting to browse…
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="flex flex-col gap-8"
              variants={stagger(0.08)}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={fadeUp}>
                <h1 className="text-2xl font-bold text-foreground">List an Item</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Add what you want to trade with other students.
                </p>
              </motion.div>

              {/* Photos */}
              <motion.div variants={fadeUp} className="space-y-3">
                <Label className="text-sm font-medium">Photos</Label>
                <div className="grid grid-cols-4 gap-3">
                  {photos.map((src, i) => (
                    <div key={i} className="relative aspect-square overflow-hidden rounded-xl border border-border bg-secondary">
                      <img src={src} alt={`photo ${i + 1}`} className="h-full w-full object-cover" />
                      <button
                        onClick={() => removePhoto(i)}
                        className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-foreground/70 text-background hover:bg-foreground transition-colors"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                  {photos.length < 4 && (
                    <button
                      onClick={() => fileRef.current?.click()}
                      className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-border bg-secondary/40 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-secondary"
                    >
                      <ImagePlus className="h-6 w-6" />
                      <span className="text-xs">Add photo</span>
                    </button>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handlePhotoAdd}
                />
                <p className="text-xs text-muted-foreground">Up to 4 photos. First photo is the cover.</p>
              </motion.div>

              {/* Item name */}
              <motion.div variants={fadeUp} className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">Item Name</Label>
                <Input
                  id="title"
                  placeholder="e.g. Calculus Textbook 8th Edition"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-secondary border-0"
                />
              </motion.div>

              {/* Description */}
              <motion.div variants={fadeUp} className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the item — what's included, any wear, why you're trading it…"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="resize-none bg-secondary border-0"
                  rows={4}
                />
              </motion.div>

              {/* Condition + Category in a row */}
              <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Condition</Label>
                  <Select value={condition} onValueChange={setCondition}>
                    <SelectTrigger className="bg-secondary border-0">
                      <SelectValue placeholder="Select…" />
                    </SelectTrigger>
                    <SelectContent>
                      {CONDITIONS.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="bg-secondary border-0">
                      <SelectValue placeholder="Select…" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>

              {/* Submit */}
              <motion.div variants={fadeUp}>
                <Button
                  size="lg"
                  className="w-full"
                  disabled={!canSubmit}
                  onClick={handleSubmit}
                >
                  List Item for Trade
                </Button>
              </motion.div>
            </motion.div>
          )}
        </main>

        <Footer />
      </div>
    </PageTransition>
  )
}
