import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import {
  Sparkles,
  LayoutGrid,
  MessageSquare,
  Calendar,
  BookOpen,
  FolderOpen,
  TrendingUp,
  Settings,
  Bell,
  Clock,
  MapPin,
  Plus,
  LogOut,
  Send,
  Paperclip,
  Mic,
  MoreHorizontal,
  Share2,
  Search,
  Trash2,
  CalendarPlus,
  Mail,
  Phone,
  Users,
  CheckCircle2,
  Bookmark,
  GraduationCap,
  AlertCircle,
  Lightbulb,
  Brain,
  FileText,
  History,
} from "lucide-react";

/**
 * Chat — CampusMind AI conversation page.
 * Drop in as your /chat route component.
 * Reuses the same palette + design language as Dashboard.jsx and Landing.jsx.
 */

const COLORS = {
  bg: "#F0F7FA",
  bgSoft: "#E0EEF2",
  primary: "#093C5D",
  secondary: "#3B7597",
  accentSoft: "#6FD1D7",
  accent: "#5DF8D8",
  ink: "#082235",
  muted: "#5E7585",
  paper: "#FFFFFF",
  border: "#D0E1E8",
  success: "#22C55E",
  warn: "#F59E0B",
  danger: "#EF4444",
};

const STUDENT = {
  firstName: "Emmanuel",
  initials: "EA",
  level: "400L · CSDT",
};

/* ---------- Demo data ---------- */

const CHAT_HISTORY = [
  {
    section: "Today",
    items: [
      { id: "c1", title: "Tomorrow's schedule and quiz prep", time: "Just now", active: true },
      { id: "c2", title: "Library hours during finals week", time: "2h ago" },
    ],
  },
  {
    section: "Yesterday",
    items: [
      { id: "c3", title: "Career fair company list", time: "Yesterday" },
      { id: "c4", title: "Lab 4 booking process", time: "Yesterday" },
    ],
  },
  {
    section: "Last week",
    items: [
      { id: "c5", title: "How to drop a course safely", time: "5d ago" },
      { id: "c6", title: "Scholarship application essay help", time: "6d ago" },
      { id: "c7", title: "Group project coordination", time: "6d ago" },
    ],
  },
];

const SUGGESTED_PROMPTS = [
  {
    category: "Schedule",
    icon: Calendar,
    prompts: [
      "What's my schedule tomorrow?",
      "When is my next exam?",
      "Find a free 2-hour slot this week",
    ],
  },
  {
    category: "Study help",
    icon: Brain,
    prompts: [
      "Summarize today's CSC 423 lecture",
      "Generate practice questions for AI Fundamentals",
      "Explain backpropagation step by step",
    ],
  },
  {
    category: "Campus",
    icon: GraduationCap,
    prompts: [
      "When is the next NACOS meeting?",
      "Where is Dr. Adeyemi's office?",
      "What events are happening this weekend?",
    ],
  },
  {
    category: "Tasks",
    icon: FileText,
    prompts: [
      "Show my upcoming deadlines",
      "Help me draft an email to my lecturer",
      "Track my project milestones",
    ],
  },
];

const FOLLOWUP_SUGGESTIONS = [
  "Find study materials for CSC 423",
  "What's the syllabus this semester?",
  "Show events this weekend",
  "Help me draft an email to Dr. Adeyemi",
];

// Pre-loaded conversation showing different response types
const INITIAL_MESSAGES = [
  {
    id: 1,
    role: "user",
    text: "What's my schedule tomorrow?",
    time: "9:42 AM",
  },
  {
    id: 2,
    role: "ai",
    text: "You have 3 classes tomorrow, Emmanuel. Here's the breakdown:",
    time: "9:42 AM",
    card: {
      type: "schedule",
      classes: [
        { time: "9:00 AM", code: "CSC 423", name: "AI Fundamentals", room: "Hall A", quiz: true },
        { time: "11:00 AM", code: "CSC 415", name: "Distributed Systems", room: "Lab 4" },
        { time: "2:00 PM", code: "CSC 401", name: "Software Engineering", room: "Hall B" },
      ],
    },
    followup: "Heads up: CSC 423 has a quiz. Want me to set a study reminder?",
    actions: [
      { label: "Set reminder", icon: Bell, primary: true },
      { label: "View full week", icon: Calendar },
    ],
  },
  {
    id: 3,
    role: "user",
    text: "Yes, set a reminder for 8 PM tonight",
    time: "9:43 AM",
  },
  {
    id: 4,
    role: "ai",
    text: "Done. Reminder set for 8:00 PM tonight. I'll also queue up 12 practice questions from last year's CSC 423 paper for you.",
    time: "9:43 AM",
    card: {
      type: "confirmation",
      title: "Reminder created",
      rows: [
        { label: "When", value: "Tonight, 8:00 PM" },
        { label: "What", value: "CSC 423 quiz prep" },
        { label: "Resources", value: "12 practice questions" },
      ],
    },
  },
  {
    id: 5,
    role: "user",
    text: "How do I reach Dr. Adeyemi?",
    time: "9:45 AM",
  },
  {
    id: 6,
    role: "ai",
    text: "Here's Dr. Adeyemi's contact info:",
    time: "9:45 AM",
    card: {
      type: "contact",
      name: "Dr. Folake Adeyemi",
      title: "HOD · Computer Science & Digital Technology",
      initials: "FA",
      rows: [
        { icon: MapPin, label: "Office", value: "Block C, Room 204" },
        { icon: Clock, label: "Office hours", value: "Tue & Thu, 10:00 AM – 12:00 PM" },
        { icon: Mail, label: "Email", value: "f.adeyemi@kdu.edu.ng" },
        { icon: Phone, label: "Phone", value: "+234 803 ••• ••42" },
      ],
    },
    sources: ["KDU faculty directory · updated 12 Jun 2026"],
  },
];

/* ---------- Animation variants ---------- */

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const Chat = () => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  const send = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg = {
      id: Date.now(),
      role: "user",
      text: trimmed,
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsTyping(true);

    // Mock AI response — swap for real API call
    setTimeout(() => {
      const reply = mockReply(trimmed);
      setMessages((m) => [...m, { id: Date.now() + 1, role: "ai", ...reply }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div
      style={{
        backgroundColor: COLORS.bg,
        color: COLORS.ink,
        fontFamily: "Inter, system-ui, sans-serif",
        height: "100vh",
        display: "flex",
        overflow: "hidden",
      }}
    >
      <AppSidebar />
      <ChatHistory />
      <main className="flex-1 min-w-0 flex flex-col" style={{ backgroundColor: COLORS.bg }}>
        <ChatTopbar />
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 md:px-8 py-6"
        >
          <div className="max-w-3xl mx-auto space-y-5">
            <AnimatePresence initial={false}>
              {messages.map((m) =>
                m.role === "user" ? (
                  <UserMessage key={m.id} text={m.text} time={m.time} />
                ) : (
                  <AiMessage key={m.id} msg={m} onAction={send} />
                )
              )}
              {isTyping && <TypingIndicator key="typing" />}
            </AnimatePresence>
          </div>
        </div>
        <ChatInputArea
          value={input}
          onChange={setInput}
          onSend={() => send(input)}
          suggestions={FOLLOWUP_SUGGESTIONS}
          onSuggestion={send}
        />
      </main>
    </div>
  );
};

export default Chat;

/* ---------- Mock reply logic ---------- */

function mockReply(text) {
  const q = text.toLowerCase();
  const time = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  if (q.includes("event") || q.includes("nacos") || q.includes("weekend")) {
    return {
      text: "There are 2 events this weekend on campus. Here's the highlight:",
      time,
      card: {
        type: "event",
        title: "AI & Robotics Workshop",
        date: "Saturday, 21 Jun",
        time: "4:00 PM",
        location: "Lab Block C, Room 301",
        organizer: "NACOS · Faculty of Applied Sciences",
        attendees: 89,
      },
      actions: [
        { label: "RSVP", icon: Bookmark, primary: true },
        { label: "Add to calendar", icon: CalendarPlus },
      ],
    };
  }

  if (q.includes("syllabus") || q.includes("material") || q.includes("study")) {
    return {
      text: "I found 4 resources for your current courses. Here's a quick summary:",
      time,
      card: {
        type: "resources",
        items: [
          { course: "CSC 423", title: "Lecture slides · weeks 1-8", type: "PDF · 4.2 MB" },
          { course: "CSC 423", title: "Backprop practice problems", type: "Worksheet" },
          { course: "CSC 415", title: "Raft consensus paper", type: "PDF · 1.1 MB" },
          { course: "CSC 401", title: "Software engineering textbook ch. 3-5", type: "EPUB" },
        ],
      },
    };
  }

  if (q.includes("email") || q.includes("draft") || q.includes("message")) {
    return {
      text: "Here's a draft you can review and send. Polite, direct, and respects her time.",
      time,
      card: {
        type: "draft",
        subject: "Question about Friday's CSC 423 lecture",
        body: "Dear Dr. Adeyemi,\n\nI hope this finds you well. I had a quick question about the backpropagation derivation we covered in Friday's lecture. Specifically, I'm unclear on the chain rule application when there are multiple hidden layers. Could I come by during your office hours on Tuesday to clarify?\n\nThank you for your time.\n\nBest regards,\nEmmanuel Adeyemi\nCSC 423 · 400L",
      },
      actions: [
        { label: "Send to Gmail", icon: Mail, primary: true },
        { label: "Copy to clipboard", icon: FileText },
      ],
    };
  }

  if (q.includes("deadline") || q.includes("assignment") || q.includes("due")) {
    return {
      text: "You have 4 upcoming deadlines. The most urgent one is today:",
      time,
      card: {
        type: "deadlines",
        items: [
          { course: "CSC 423", title: "Quiz 3 — Neural networks", due: "Today, 9:00 AM", urgency: "high" },
          { course: "CSC 401", title: "Group project milestone 2", due: "Thursday, 18 Jun", urgency: "med" },
          { course: "CSC 415", title: "Lab report on consensus", due: "Monday, 22 Jun", urgency: "low" },
        ],
      },
    };
  }

  return {
    text: "Got it. I can help with that — can you give me a bit more context so I point you to the right resource?",
    time,
  };
}

/* ---------- App sidebar (matches Dashboard) ---------- */

const NAV_ITEMS = [
  { icon: LayoutGrid, label: "Dashboard", id: "dashboard", to: "/dashboard" },
  { icon: MessageSquare, label: "AI Chat", id: "chat", to: "/chat", active: true, badge: 2 },
  { icon: Calendar, label: "Schedule", id: "schedule", to: "/schedule" },
  { icon: BookOpen, label: "Courses", id: "courses", to: "/courses" },
  { icon: FolderOpen, label: "Resources", id: "resources", to: "/resources" },
  { icon: TrendingUp, label: "Grades", id: "grades", to: "/grades" },
];

function AppSidebar() {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="hidden md:flex flex-col"
      style={{
        width: 72,
        backgroundColor: COLORS.paper,
        borderRight: `1px solid ${COLORS.border}`,
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div className="px-4 py-5 flex justify-center">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: COLORS.primary }}
        >
          <Sparkles size={16} color={COLORS.accent} />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 mt-2 space-y-1.5">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = item.active;
          return (
            <Link
              key={item.id}
              to={item.to}
              className="relative w-full h-11 rounded-lg flex items-center justify-center transition-colors group"
              style={{
                color: isActive ? COLORS.primary : COLORS.muted,
                backgroundColor: isActive ? COLORS.bg : "transparent",
              }}
              title={item.label}
            >
              {isActive && (
                <motion.div
                  layoutId="chat-nav-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full"
                  style={{ backgroundColor: COLORS.primary }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon size={17} />
              {item.badge && (
                <span
                  className="absolute -top-0.5 -right-0.5 text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 space-y-1.5" style={{ borderTop: `1px solid ${COLORS.border}` }}>
        <button
          className="w-full h-11 mt-3 rounded-lg flex items-center justify-center"
          style={{ color: COLORS.muted }}
          title="Settings"
        >
          <Settings size={17} />
        </button>
        <div
          className="w-10 h-10 mx-auto rounded-full flex items-center justify-center mt-1"
          style={{ backgroundColor: COLORS.primary, color: COLORS.accent, fontWeight: 600, fontSize: 12 }}
          title={STUDENT.firstName}
        >
          {STUDENT.initials}
        </div>
      </div>
    </motion.aside>
  );
}

/* ---------- Chat history sidebar ---------- */

function ChatHistory() {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.05 }}
      className="hidden lg:flex flex-col"
      style={{
        width: 280,
        backgroundColor: COLORS.paper,
        borderRight: `1px solid ${COLORS.border}`,
        flexShrink: 0,
      }}
    >
      {/* Header */}
      <div className="px-5 py-5">
        <button
          className="w-full px-3.5 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-transform hover:scale-[1.02]"
          style={{ backgroundColor: COLORS.primary, color: "white" }}
        >
          <Plus size={14} />
          New chat
        </button>

        <div
          className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{ backgroundColor: COLORS.bg, border: `1px solid ${COLORS.border}` }}
        >
          <Search size={13} color={COLORS.muted} />
          <input
            placeholder="Search chats"
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: COLORS.ink }}
          />
        </div>
      </div>

      {/* History list */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="flex-1 overflow-y-auto px-3 pb-4 space-y-4"
      >
        {CHAT_HISTORY.map((section) => (
          <div key={section.section}>
            <div
              className="px-2 mb-1.5 text-[10px] uppercase tracking-widest font-semibold"
              style={{ color: COLORS.muted, letterSpacing: "0.12em" }}
            >
              {section.section}
            </div>
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <motion.button
                  key={item.id}
                  variants={fadeUp}
                  className="w-full text-left px-3 py-2.5 rounded-lg group relative transition-colors"
                  style={{
                    backgroundColor: item.active ? COLORS.bg : "transparent",
                    color: item.active ? COLORS.ink : COLORS.muted,
                  }}
                >
                  {item.active && (
                    <motion.div
                      layoutId="chat-history-indicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full"
                      style={{ backgroundColor: COLORS.primary }}
                    />
                  )}
                  <div className="flex items-start gap-2">
                    <MessageSquare
                      size={13}
                      className="mt-0.5 flex-shrink-0"
                      color={item.active ? COLORS.primary : COLORS.muted}
                    />
                    <div className="flex-1 min-w-0">
                      <div
                        className="truncate"
                        style={{
                          fontSize: 13,
                          fontWeight: item.active ? 600 : 500,
                          color: item.active ? COLORS.ink : COLORS.muted,
                          lineHeight: 1.3,
                        }}
                      >
                        {item.title}
                      </div>
                      <div style={{ fontSize: 10, color: COLORS.muted, marginTop: 2 }}>
                        {item.time}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Bottom hint */}
      <div
        className="mx-3 mb-3 p-3 rounded-lg"
        style={{ backgroundColor: COLORS.bg, border: `1px solid ${COLORS.border}` }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <Lightbulb size={13} color={COLORS.primary} />
          <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.ink }}>Pro tip</span>
        </div>
        <p style={{ fontSize: 11, color: COLORS.muted, lineHeight: 1.45 }}>
          Press{" "}
          <kbd className="px-1 py-0.5 rounded text-[10px]" style={{ backgroundColor: COLORS.paper, border: `1px solid ${COLORS.border}` }}>
            ⌘K
          </kbd>{" "}
          to search past chats from anywhere.
        </p>
      </div>
    </motion.aside>
  );
}

/* ---------- Chat topbar ---------- */

function ChatTopbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="px-5 md:px-8 py-3.5 flex items-center justify-between gap-4"
      style={{
        backgroundColor: COLORS.paper,
        borderBottom: `1px solid ${COLORS.border}`,
      }}
    >
      <div className="flex-1 min-w-0">
        <h1
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: COLORS.ink,
            letterSpacing: "-0.01em",
          }}
          className="truncate"
        >
          Tomorrow's schedule and quiz prep
        </h1>
        <div className="flex items-center gap-1.5" style={{ fontSize: 11, color: COLORS.muted, marginTop: 2 }}>
          <PulseDot />
          CampusMind is online · context: CSC 423
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
          style={{ backgroundColor: COLORS.bg, color: COLORS.muted, border: `1px solid ${COLORS.border}` }}
          aria-label="Share"
        >
          <Share2 size={14} />
        </button>
        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
          style={{ backgroundColor: COLORS.bg, color: COLORS.muted, border: `1px solid ${COLORS.border}` }}
          aria-label="History"
        >
          <History size={14} />
        </button>
        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
          style={{ backgroundColor: COLORS.bg, color: COLORS.muted, border: `1px solid ${COLORS.border}` }}
          aria-label="More"
        >
          <MoreHorizontal size={14} />
        </button>
      </div>
    </motion.header>
  );
}

function PulseDot() {
  return (
    <span className="relative inline-flex w-1.5 h-1.5">
      <motion.span
        animate={{ scale: [1, 2.2, 1], opacity: [0.7, 0, 0.7] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: COLORS.accent }}
      />
      <span
        className="relative inline-flex w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: COLORS.accent }}
      />
    </span>
  );
}

/* ---------- Messages ---------- */

function UserMessage({ text, time }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-end"
    >
      <div className="max-w-[80%]">
        <div
          className="rounded-2xl rounded-br-md px-4 py-2.5 text-sm"
          style={{ backgroundColor: COLORS.primary, color: "white", lineHeight: 1.5 }}
        >
          {text}
        </div>
        <div className="text-right mt-1" style={{ fontSize: 10, color: COLORS.muted }}>
          {time}
        </div>
      </div>
    </motion.div>
  );
}

function AiMessage({ msg, onAction }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex gap-2.5 items-start"
    >
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ backgroundColor: COLORS.primary }}
      >
        <Sparkles size={13} color={COLORS.accent} />
      </div>

      <div className="flex-1 min-w-0 max-w-[88%] space-y-2.5">
        {msg.text && (
          <div
            className="inline-block rounded-2xl rounded-bl-md px-4 py-2.5 text-sm"
            style={{
              backgroundColor: COLORS.paper,
              border: `1px solid ${COLORS.border}`,
              color: COLORS.ink,
              lineHeight: 1.55,
            }}
          >
            {msg.text}
          </div>
        )}

        {msg.card && <ResponseCard card={msg.card} />}

        {msg.followup && (
          <div
            className="inline-block rounded-2xl rounded-bl-md px-4 py-2.5 text-sm"
            style={{
              backgroundColor: COLORS.paper,
              border: `1px solid ${COLORS.border}`,
              color: COLORS.ink,
              lineHeight: 1.55,
            }}
          >
            {msg.followup}
          </div>
        )}

        {msg.actions && (
          <div className="flex flex-wrap gap-2 pt-1">
            {msg.actions.map((a, i) => {
              const Icon = a.icon;
              return (
                <motion.button
                  key={i}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onAction(a.label)}
                  className="text-xs px-3.5 py-2 rounded-full inline-flex items-center gap-1.5 font-medium"
                  style={
                    a.primary
                      ? { backgroundColor: COLORS.primary, color: "white" }
                      : { backgroundColor: COLORS.paper, color: COLORS.ink, border: `1px solid ${COLORS.border}` }
                  }
                >
                  {Icon && <Icon size={12} />}
                  {a.label}
                </motion.button>
              );
            })}
          </div>
        )}

        {msg.sources && (
          <div className="pt-1 flex items-center gap-1.5" style={{ fontSize: 10, color: COLORS.muted }}>
            <CheckCircle2 size={10} color={COLORS.success} />
            {msg.sources.join(" · ")}
          </div>
        )}

        {msg.time && (
          <div style={{ fontSize: 10, color: COLORS.muted, marginTop: 4 }}>{msg.time}</div>
        )}
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex gap-2.5 items-start"
    >
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ backgroundColor: COLORS.primary }}
      >
        <Sparkles size={13} color={COLORS.accent} />
      </div>
      <div
        className="rounded-2xl rounded-bl-md px-4 py-3 inline-flex gap-1"
        style={{ backgroundColor: COLORS.paper, border: `1px solid ${COLORS.border}` }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: COLORS.muted }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ---------- Response cards ---------- */

function ResponseCard({ card }) {
  if (card.type === "schedule") return <ScheduleResponseCard classes={card.classes} />;
  if (card.type === "confirmation") return <ConfirmationCard {...card} />;
  if (card.type === "contact") return <ContactResponseCard {...card} />;
  if (card.type === "event") return <EventResponseCard {...card} />;
  if (card.type === "resources") return <ResourcesCard items={card.items} />;
  if (card.type === "deadlines") return <DeadlinesCard items={card.items} />;
  if (card.type === "draft") return <DraftCard {...card} />;
  return null;
}

function ScheduleResponseCard({ classes }) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: COLORS.paper, border: `1px solid ${COLORS.border}`, maxWidth: 460 }}
    >
      {classes.map((c, i) => (
        <div
          key={i}
          className="flex items-center gap-3 px-4 py-3"
          style={{
            borderBottom: i < classes.length - 1 ? `1px solid ${COLORS.border}` : "none",
            backgroundColor: c.quiz ? COLORS.bg : "transparent",
          }}
        >
          <div style={{ minWidth: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.ink }}>{c.time}</div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.ink }}>{c.code}</span>
              {c.quiz && (
                <motion.span
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
                >
                  QUIZ
                </motion.span>
              )}
            </div>
            <div style={{ fontSize: 12, color: COLORS.muted }}>
              {c.name} · {c.room}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ConfirmationCard({ title, rows }) {
  return (
    <motion.div
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      className="rounded-xl p-4"
      style={{
        backgroundColor: COLORS.bg,
        border: `1px solid ${COLORS.primary}`,
        maxWidth: 380,
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle2 size={15} color={COLORS.success} />
        <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.ink }}>{title}</span>
      </div>
      <div className="space-y-1.5">
        {rows.map((r, i) => (
          <div key={i} className="flex justify-between gap-3" style={{ fontSize: 12 }}>
            <span style={{ color: COLORS.muted }}>{r.label}</span>
            <span style={{ color: COLORS.ink, fontWeight: 500, textAlign: "right" }}>{r.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ContactResponseCard({ name, title, initials, rows }) {
  return (
    <div
      className="rounded-xl p-4"
      style={{ backgroundColor: COLORS.paper, border: `1px solid ${COLORS.border}`, maxWidth: 460 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: COLORS.primary, color: COLORS.accent, fontWeight: 700, fontSize: 14 }}
        >
          {initials}
        </div>
        <div className="min-w-0">
          <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.ink }}>{name}</div>
          <div style={{ fontSize: 11, color: COLORS.muted }}>{title}</div>
        </div>
      </div>
      <div className="space-y-2" style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 12 }}>
        {rows.map((r, i) => {
          const Icon = r.icon;
          return (
            <div key={i} className="flex items-center justify-between gap-3" style={{ fontSize: 12 }}>
              <span className="flex items-center gap-1.5" style={{ color: COLORS.muted }}>
                <Icon size={11} />
                {r.label}
              </span>
              <span style={{ color: COLORS.ink, textAlign: "right" }}>{r.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EventResponseCard({ title, date, time, location, organizer, attendees }) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: COLORS.paper, border: `1px solid ${COLORS.border}`, maxWidth: 460 }}
    >
      <div className="px-4 py-3" style={{ backgroundColor: COLORS.primary, color: "white" }}>
        <div className="flex items-center gap-2" style={{ fontSize: 11, color: COLORS.accent, marginBottom: 4 }}>
          <Calendar size={11} />
          {date}
        </div>
        <h4 style={{ fontSize: 15, fontWeight: 700 }}>{title}</h4>
      </div>
      <div className="p-4 space-y-1.5" style={{ fontSize: 12 }}>
        <div className="flex items-center gap-2" style={{ color: COLORS.muted }}>
          <Clock size={11} />
          {time}
        </div>
        <div className="flex items-center gap-2" style={{ color: COLORS.muted }}>
          <MapPin size={11} />
          {location}
        </div>
        <div className="flex items-center gap-2" style={{ color: COLORS.muted }}>
          <Users size={11} />
          {attendees} going · Hosted by {organizer}
        </div>
      </div>
    </div>
  );
}

function ResourcesCard({ items }) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: COLORS.paper, border: `1px solid ${COLORS.border}`, maxWidth: 460 }}
    >
      {items.map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ backgroundColor: COLORS.bg }}
          className="px-4 py-3 flex items-center gap-3 cursor-pointer"
          style={{ borderBottom: i < items.length - 1 ? `1px solid ${COLORS.border}` : "none" }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: COLORS.bg, color: COLORS.primary }}
          >
            <FileText size={14} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.secondary }}>{item.course}</span>
            </div>
            <div style={{ fontSize: 12, color: COLORS.ink, fontWeight: 500 }} className="truncate">
              {item.title}
            </div>
            <div style={{ fontSize: 10, color: COLORS.muted, marginTop: 1 }}>{item.type}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function DeadlinesCard({ items }) {
  return (
    <div className="space-y-2" style={{ maxWidth: 460 }}>
      {items.map((d, i) => {
        const c =
          d.urgency === "high"
            ? COLORS.danger
            : d.urgency === "med"
            ? COLORS.warn
            : COLORS.secondary;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 * i, duration: 0.3 }}
            className="rounded-lg p-3 flex items-center gap-3"
            style={{
              backgroundColor: COLORS.paper,
              border: `1px solid ${COLORS.border}`,
              borderLeft: `3px solid ${c}`,
            }}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.secondary }}>{d.course}</span>
                <AlertCircle size={11} color={c} />
              </div>
              <div style={{ fontSize: 12, color: COLORS.ink, fontWeight: 500 }} className="truncate">
                {d.title}
              </div>
            </div>
            <div style={{ fontSize: 11, color: COLORS.muted, textAlign: "right", whiteSpace: "nowrap" }}>
              {d.due}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function DraftCard({ subject, body }) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: COLORS.paper, border: `1px solid ${COLORS.border}`, maxWidth: 480 }}
    >
      <div
        className="px-4 py-2.5 flex items-center gap-2"
        style={{ backgroundColor: COLORS.bg, borderBottom: `1px solid ${COLORS.border}` }}
      >
        <Mail size={13} color={COLORS.primary} />
        <div className="flex-1 min-w-0">
          <div style={{ fontSize: 10, color: COLORS.muted }}>Subject</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.ink }} className="truncate">
            {subject}
          </div>
        </div>
      </div>
      <div
        className="px-4 py-3 whitespace-pre-line"
        style={{ fontSize: 12, color: COLORS.ink, lineHeight: 1.6, fontFamily: "Inter, sans-serif" }}
      >
        {body}
      </div>
    </div>
  );
}

/* ---------- Input area with suggestions ---------- */

function ChatInputArea({ value, onChange, onSend, suggestions, onSuggestion }) {
  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="px-4 md:px-8 pt-3 pb-5"
      style={{ backgroundColor: COLORS.bg }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Suggested follow-ups */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-wrap gap-2 mb-3"
        >
          {suggestions.map((s, i) => (
            <motion.button
              key={i}
              variants={fadeUp}
              onClick={() => onSuggestion(s)}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="text-xs px-3 py-1.5 rounded-full transition-colors"
              style={{
                backgroundColor: COLORS.paper,
                color: COLORS.ink,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              {s}
            </motion.button>
          ))}
        </motion.div>

        {/* Input */}
        <div
          className="rounded-2xl"
          style={{
            backgroundColor: COLORS.paper,
            border: `1px solid ${value.trim() ? COLORS.primary : COLORS.border}`,
            transition: "border-color 0.2s",
            boxShadow: value.trim() ? "0 0 0 3px rgba(9, 60, 93, 0.08)" : "none",
          }}
        >
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKey}
            placeholder="Ask anything about your courses, schedule, or campus…"
            rows={2}
            className="w-full px-4 py-3 bg-transparent text-sm outline-none resize-none"
            style={{ color: COLORS.ink, fontFamily: "Inter, sans-serif", lineHeight: 1.5 }}
          />
          <div
            className="px-3 py-2 flex items-center justify-between"
            style={{ borderTop: `1px solid ${COLORS.border}` }}
          >
            <div className="flex items-center gap-1">
              <button
                className="w-7 h-7 rounded-md flex items-center justify-center transition-colors hover:bg-gray-50"
                style={{ color: COLORS.muted }}
                aria-label="Attach"
              >
                <Paperclip size={14} />
              </button>
              <button
                className="w-7 h-7 rounded-md flex items-center justify-center transition-colors hover:bg-gray-50"
                style={{ color: COLORS.muted }}
                aria-label="Voice"
              >
                <Mic size={14} />
              </button>
              <span className="ml-2" style={{ fontSize: 10, color: COLORS.muted }}>
                Shift + Enter for new line
              </span>
            </div>
            <motion.button
              animate={value.trim() ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.4 }}
              onClick={onSend}
              disabled={!value.trim()}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
              style={{
                backgroundColor: value.trim() ? COLORS.primary : COLORS.border,
                color: value.trim() ? "white" : COLORS.muted,
                cursor: value.trim() ? "pointer" : "not-allowed",
              }}
              aria-label="Send"
            >
              <Send size={13} />
            </motion.button>
          </div>
        </div>

        <div
          className="mt-2 text-center"
          style={{ fontSize: 10, color: COLORS.muted }}
        >
          CampusMind can make mistakes. Verify time-sensitive information.
        </div>
      </div>
    </motion.div>
  );
}
