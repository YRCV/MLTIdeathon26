import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Send, Repeat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { PageTransition } from "@/src/components/PageTransition"
import { cn } from "@/lib/utils"

// ── Mock data ────────────────────────────────────────────────────────────────

interface Message {
  id: string
  from: "me" | "them"
  text: string
  time: string
}

interface Conversation {
  id: string
  name: string
  initials: string
  itemTitle: string
  itemImage: string
  lastMessage: string
  lastTime: string
  unread: number
  messages: Message[]
}

const conversations: Conversation[] = [
  {
    id: "1",
    name: "Sarah M.",
    initials: "SM",
    itemTitle: "Calculus: Early Transcendentals",
    itemImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=80&h=80&fit=crop",
    lastMessage: "Yeah that works for me! See you at the library.",
    lastTime: "2m ago",
    unread: 2,
    messages: [
      { id: "1", from: "me", text: "Hey! I'm interested in trading my Organic Chemistry textbook for your Calculus one.", time: "10:14 AM" },
      { id: "2", from: "them", text: "Oh that sounds perfect! I actually need Orgo for next semester.", time: "10:16 AM" },
      { id: "3", from: "me", text: "Great! Both are in Good condition. Want to meet up on campus?", time: "10:17 AM" },
      { id: "4", from: "them", text: "Yeah that works for me! See you at the library.", time: "10:20 AM" },
    ],
  },
  {
    id: "2",
    name: "Alex K.",
    initials: "AK",
    itemTitle: "MacBook Pro 14\" M3",
    itemImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=80&h=80&fit=crop",
    lastMessage: "Can you send more photos of the iPad?",
    lastTime: "1h ago",
    unread: 1,
    messages: [
      { id: "1", from: "them", text: "Hi, I saw you're interested in trading for the MacBook?", time: "9:00 AM" },
      { id: "2", from: "me", text: "Yes! I have an iPad Air 5th Gen + Apple Pencil I could offer.", time: "9:05 AM" },
      { id: "3", from: "them", text: "Interesting... the MacBook is worth more though. What else could you add?", time: "9:08 AM" },
      { id: "4", from: "me", text: "I could also throw in my Sony headphones.", time: "9:12 AM" },
      { id: "5", from: "them", text: "Can you send more photos of the iPad?", time: "9:30 AM" },
    ],
  },
  {
    id: "3",
    name: "Jordan P.",
    initials: "JP",
    itemTitle: "Schwinn Vintage Bike",
    itemImage: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=80&h=80&fit=crop",
    lastMessage: "Deal! Let's meet at the bike racks by the gym.",
    lastTime: "3h ago",
    unread: 0,
    messages: [
      { id: "1", from: "me", text: "Love the bike! Would you trade for my North Face jacket + cooking set?", time: "7:00 AM" },
      { id: "2", from: "them", text: "Hmm, the bike is worth more. What size is the jacket?", time: "7:15 AM" },
      { id: "3", from: "me", text: "It's a Medium, barely worn. Only used one winter.", time: "7:20 AM" },
      { id: "4", from: "them", text: "Deal! Let's meet at the bike racks by the gym.", time: "7:45 AM" },
    ],
  },
  {
    id: "4",
    name: "Taylor S.",
    initials: "TS",
    itemTitle: "North Face Puffer Jacket",
    itemImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=80&h=80&fit=crop",
    lastMessage: "Still available! When can you meet?",
    lastTime: "Yesterday",
    unread: 0,
    messages: [
      { id: "1", from: "me", text: "Is the jacket still available?", time: "Yesterday 4:00 PM" },
      { id: "2", from: "them", text: "Still available! When can you meet?", time: "Yesterday 4:30 PM" },
    ],
  },
]

// ── Components ───────────────────────────────────────────────────────────────

function ConversationItem({
  conv,
  active,
  onClick,
}: {
  conv: Conversation
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary/60",
        active && "bg-secondary"
      )}
    >
      <Avatar className="h-11 w-11 shrink-0">
        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
          {conv.initials}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <span className="font-medium text-foreground text-sm">{conv.name}</span>
          <span className="text-xs text-muted-foreground shrink-0">{conv.lastTime}</span>
        </div>
        <p className="text-xs text-muted-foreground truncate mb-0.5">{conv.itemTitle}</p>
        <p className={cn("text-sm truncate", conv.unread > 0 ? "font-medium text-foreground" : "text-muted-foreground")}>
          {conv.lastMessage}
        </p>
      </div>

      {conv.unread > 0 && (
        <span className="shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          {conv.unread}
        </span>
      )}
    </button>
  )
}

function ChatBubble({ msg }: { msg: Message }) {
  const isMe = msg.from === "me"
  return (
    <motion.div
      className={cn("flex gap-2", isMe ? "flex-row-reverse" : "flex-row")}
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div
        className={cn(
          "max-w-[70%] rounded-2xl px-4 py-2.5",
          isMe
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-secondary text-foreground rounded-tl-sm"
        )}
      >
        <p className="text-sm leading-relaxed">{msg.text}</p>
        <p className={cn("mt-1 text-xs", isMe ? "text-primary-foreground/60 text-right" : "text-muted-foreground")}>
          {msg.time}
        </p>
      </div>
    </motion.div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function MessagesPage() {
  const [activeId, setActiveId] = useState<string | null>(conversations[0].id)
  const [showChat, setShowChat] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [localMessages, setLocalMessages] = useState<Record<string, Message[]>>(
    Object.fromEntries(conversations.map((c) => [c.id, c.messages]))
  )

  const active = conversations.find((c) => c.id === activeId) ?? null

  const handleSelect = (id: string) => {
    setActiveId(id)
    setShowChat(true)
    setInputValue("")
  }

  const handleSend = () => {
    if (!inputValue.trim() || !activeId) return
    const newMsg: Message = {
      id: Date.now().toString(),
      from: "me",
      text: inputValue.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setLocalMessages((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] ?? []), newMsg],
    }))
    setInputValue("")
  }

  const messages = activeId ? (localMessages[activeId] ?? []) : []

  return (
    <PageTransition>
    <div className="flex h-screen flex-col bg-background">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* ── Sidebar ── */}
        <aside
          className={cn(
            "flex w-full flex-col border-r border-border bg-card md:w-80 md:flex",
            showChat ? "hidden md:flex" : "flex"
          )}
        >
          <div className="border-b border-border px-4 py-4">
            <h1 className="text-lg font-semibold text-foreground">Messages</h1>
            <p className="text-sm text-muted-foreground">{conversations.length} conversations</p>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-border/50">
            {conversations.map((conv) => (
              <ConversationItem
                key={conv.id}
                conv={conv}
                active={conv.id === activeId}
                onClick={() => handleSelect(conv.id)}
              />
            ))}
          </div>
        </aside>

        {/* ── Chat pane ── */}
        {active ? (
          <main
            className={cn(
              "flex flex-1 flex-col",
              showChat ? "flex" : "hidden md:flex"
            )}
          >
            {/* Chat header */}
            <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-3">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setShowChat(false)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>

              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                  {active.initials}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm">{active.name}</p>
                <p className="text-xs text-muted-foreground truncate">{active.itemTitle}</p>
              </div>

              {/* Item thumbnail */}
              <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-1.5">
                <img
                  src={active.itemImage}
                  alt={active.itemTitle}
                  className="h-7 w-7 rounded object-cover"
                />
                <div className="hidden sm:block">
                  <p className="text-xs text-muted-foreground">Trading for</p>
                  <p className="text-xs font-medium text-foreground line-clamp-1 max-w-[120px]">
                    {active.itemTitle}
                  </p>
                </div>
                <Badge variant="secondary" className="gap-1 text-xs">
                  <Repeat className="h-3 w-3" />
                  Trade
                </Badge>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <ChatBubble key={msg.id} msg={msg} />
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-border bg-card p-4">
              <form
                className="flex items-center gap-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
              >
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-secondary border-0"
                />
                <Button type="submit" size="icon" disabled={!inputValue.trim()}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </div>
          </main>
        ) : (
          <main className="hidden md:flex flex-1 items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Repeat className="mx-auto mb-3 h-10 w-10 opacity-20" />
              <p className="text-sm">Select a conversation to start chatting</p>
            </div>
          </main>
        )}
      </div>
    </div>
    </PageTransition>
  )
}
