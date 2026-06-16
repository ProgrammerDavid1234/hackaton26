/*import React from 'react'

const Dashboard = () => {
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard
*/
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useInView,
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
  Search,
  Bell,
  ChevronRight,
  ArrowUpRight,
  Clock,
  MapPin,
  Flame,
  CheckCircle2,
  Circle,
  AlertCircle,
  Plus,
  LogOut,
  Users,
  Bookmark,
  Send,
  ArrowRight,
} from "lucide-react";

/**
 * Dashboard — Student home screen after login.
 * Drop in as your /dashboard route component.
 * Reuses the same palette + design language as Landing.jsx.
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
  lastName: "Adeyemi",
  initials: "EA",
  faculty: "Faculty of Applied Sciences",
  level: "400L · CSDT",
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const Dashboard = () => {
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

  return (
    <div
      style={{
        backgroundColor: COLORS.bg,
        color: COLORS.ink,
        fontFamily: "Inter, system-ui, sans-serif",
        minHeight: "100vh",
        display: "flex",
      }}
    >
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar />
        <Main />
      </div>
    </div>
  );
};

export default Dashboard;

/* ---------- Sidebar ---------- */

const NAV_ITEMS = [
  { icon: LayoutGrid, label: "Dashboard", id: "dashboard", to: "/dashboard" },
  { icon: MessageSquare, label: "AI Chat", id: "chat", to: "/chat", badge: 2 },
  { icon: Calendar, label: "Schedule", id: "schedule", to: "/schedule" },
  { icon: BookOpen, label: "Courses", id: "courses", to: "/courses" },
  { icon: FolderOpen, label: "Resources", id: "resources", to: "/resources" },
  { icon: TrendingUp, label: "Grades", id: "grades", to: "/grades" },
];

function Sidebar() {
  const location = useLocation();

  return (
    <motion.aside
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="hidden md:flex flex-col"
      style={{
        width: 240,
        backgroundColor: COLORS.paper,
        borderRight: `1px solid ${COLORS.border}`,
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div className="px-5 py-5 flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: COLORS.primary }}
        >
          <Sparkles size={14} color={COLORS.accent} />
        </div>
        <span style={{ fontWeight: 700, fontSize: "1.05rem", color: COLORS.ink }}>
          CampusMind AI
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 mt-2 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.id}
              to={item.to}
              className="w-full relative px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm transition-colors"
              style={{
                color: isActive ? COLORS.primary : COLORS.muted,
                fontWeight: isActive ? 600 : 500,
                backgroundColor: isActive ? COLORS.bg : "transparent",
                textDecoration: "none",
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full"
                  style={{ backgroundColor: COLORS.primary }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon size={16} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span
                  className="text-[10px] font-semibold w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom — settings + profile */}
      <div className="px-3 pb-4 space-y-1" style={{ borderTop: `1px solid ${COLORS.border}` }}>
        <button
          className="w-full mt-3 px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm transition-colors"
          style={{ color: COLORS.muted, fontWeight: 500 }}
        >
          <Settings size={16} />
          Settings
        </button>

        <div
          className="mt-1 px-3 py-3 rounded-lg flex items-center gap-3"
          style={{ backgroundColor: COLORS.bg }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: COLORS.primary, color: COLORS.accent, fontWeight: 600, fontSize: 13 }}
          >
            {STUDENT.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.ink }}>
              {STUDENT.firstName} {STUDENT.lastName}
            </div>
            <div style={{ fontSize: 11, color: COLORS.muted }} className="truncate">
              {STUDENT.level}
            </div>
          </div>
          <Link to="/" aria-label="Log out" style={{ color: COLORS.muted }}>
            <LogOut size={14} />
          </Link>
        </div>
      </div>
    </motion.aside>
  );
}

/* ---------- Topbar ---------- */

function Topbar() {
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="px-5 md:px-8 py-4 flex items-center gap-4"
      style={{
        backgroundColor: COLORS.paper,
        borderBottom: `1px solid ${COLORS.border}`,
      }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <h1 style={{ fontWeight: 700, fontSize: "1.05rem", color: COLORS.ink, letterSpacing: "-0.01em" }}>
            Hi {STUDENT.firstName} 👋
          </h1>
          <span className="hidden sm:inline" style={{ fontSize: 13, color: COLORS.muted }}>
            · {today}
          </span>
        </div>
      </div>

      {/* Search */}
      <div
        className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
        style={{
          backgroundColor: COLORS.bg,
          color: COLORS.muted,
          border: `1px solid ${COLORS.border}`,
          width: 280,
        }}
      >
        <Search size={14} />
        <span className="flex-1">Ask anything…</span>
        <kbd
          className="text-[10px] px-1.5 py-0.5 rounded"
          style={{ backgroundColor: COLORS.paper, border: `1px solid ${COLORS.border}` }}
        >
          ⌘K
        </kbd>
      </div>

      {/* Notifications */}
      <button
        className="relative w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
        style={{ backgroundColor: COLORS.bg, color: COLORS.primary, border: `1px solid ${COLORS.border}` }}
        aria-label="Notifications"
      >
        <Bell size={15} />
        <motion.span
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
          style={{ backgroundColor: COLORS.accent, borderColor: COLORS.paper }}
        />
      </button>

      {/* Mobile profile */}
      <div
        className="md:hidden w-9 h-9 rounded-full flex items-center justify-center"
        style={{ backgroundColor: COLORS.primary, color: COLORS.accent, fontWeight: 600, fontSize: 13 }}
      >
        {STUDENT.initials}
      </div>
    </motion.header>
  );
}

/* ---------- Main ---------- */

function Main() {
  return (
    <motion.main
      variants={stagger}
      initial="hidden"
      animate="show"
      className="flex-1 p-5 md:p-8 overflow-y-auto"
    >
      <WelcomeRow />
      <ScheduleAndStreakRow />
      <ChatAndDeadlinesRow />
      <EventsRow />
    </motion.main>
  );
}

/* ---------- Welcome row ---------- */

const QUICK_STATS = [
  { label: "Current GPA", value: 3.8, suffix: "", icon: TrendingUp, decimal: true },
  { label: "Attendance", value: 94, suffix: "%", icon: CheckCircle2 },
  { label: "AI queries", value: 247, suffix: "", icon: MessageSquare },
  { label: "Hours saved", value: 18, suffix: "h", icon: Clock },
];

function WelcomeRow() {
  return (
    <motion.div variants={stagger} className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-5">
      {/* Big welcome card */}
      <motion.div variants={fadeUp} className="lg:col-span-8">
        <div
          className="rounded-2xl p-6 md:p-7 relative overflow-hidden h-full"
          style={{ backgroundColor: COLORS.primary, color: "white" }}
        >
          {/* Decorative blobs */}
          <motion.div
            aria-hidden="true"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 8, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-16 -right-10 w-48 h-48 rounded-full"
            style={{ backgroundColor: COLORS.accent, opacity: 0.18, filter: "blur(30px)" }}
          />

          <div className="relative">
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium mb-4"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", color: COLORS.accent }}
            >
              <Sparkles size={11} />
              Your daily briefing
            </div>

            <h2
              style={{
                fontWeight: 700,
                fontSize: "clamp(1.4rem, 3vw, 1.85rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
              }}
            >
              Good morning, {STUDENT.firstName}.{" "}
              <span style={{ color: COLORS.accent }}>
                You have 3 classes and a quiz today.
              </span>
            </h2>

            <p
              className="mt-3 max-w-md"
              style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.55 }}
            >
              CSC 423 quiz starts at 9:00 AM. I prepared 12 practice questions from last
              year's paper if you want to review.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                className="px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-1.5 transition-transform hover:scale-[1.03]"
                style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
              >
                <BookOpen size={13} />
                Start review
              </button>
              <button
                className="px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-1.5"
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                Skip for now
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick stats grid */}
      <motion.div variants={fadeUp} className="lg:col-span-4">
        <div className="grid grid-cols-2 gap-3 h-full">
          {QUICK_STATS.map((s, i) => (
            <StatCard key={i} {...s} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function StatCard({ label, value, suffix, icon: Icon, decimal }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-xl p-3.5"
      style={{ backgroundColor: COLORS.paper, border: `1px solid ${COLORS.border}` }}
    >
      <div className="flex items-center justify-between mb-2">
        <span style={{ fontSize: 11, color: COLORS.muted, fontWeight: 500 }}>{label}</span>
        <div
          className="w-6 h-6 rounded-md flex items-center justify-center"
          style={{ backgroundColor: COLORS.bg, color: COLORS.primary }}
        >
          <Icon size={11} />
        </div>
      </div>
      <div style={{ fontWeight: 700, fontSize: "1.3rem", color: COLORS.ink, letterSpacing: "-0.02em", lineHeight: 1 }}>
        <CountUp to={value} decimal={decimal} />
        <span style={{ fontSize: "0.85rem", color: COLORS.muted, fontWeight: 600 }}>{suffix}</span>
      </div>
    </motion.div>
  );
}

function CountUp({ to, duration = 1.4, decimal = false }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    let raf;
    const tick = () => {
      const elapsed = (Date.now() - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = to * eased;
      setCount(decimal ? next : Math.floor(next));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, decimal]);

  return <span ref={ref}>{decimal ? count.toFixed(1) : count}</span>;
}

/* ---------- Schedule + Streak row ---------- */

const SCHEDULE = [
  {
    time: "9:00 AM",
    end: "10:30 AM",
    code: "CSC 423",
    name: "AI Fundamentals",
    location: "Hall A",
    type: "Lecture",
    quiz: true,
    status: "current",
  },
  {
    time: "11:00 AM",
    end: "12:30 PM",
    code: "CSC 415",
    name: "Distributed Systems",
    location: "Lab 4",
    type: "Practical",
    status: "upcoming",
  },
  {
    time: "2:00 PM",
    end: "3:30 PM",
    code: "CSC 401",
    name: "Software Engineering",
    location: "Hall B",
    type: "Lecture",
    status: "upcoming",
  },
];

function ScheduleAndStreakRow() {
  return (
    <motion.div variants={stagger} className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-5">
      {/* Today's schedule */}
      <motion.div variants={fadeUp} className="lg:col-span-8">
        <Card>
          <CardHeader
            title="Today's schedule"
            sub="Tuesday, 16 June"
            action={
              <Link to="/schedule" className="text-xs font-medium inline-flex items-center gap-1" style={{ color: COLORS.primary }}>
                Full week <ArrowRight size={11} />
              </Link>
            }
          />
          <div className="px-5 pb-5 space-y-3">
            {SCHEDULE.map((c, i) => (
              <ScheduleItem key={i} {...c} index={i} />
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Streak card */}
      <motion.div variants={fadeUp} className="lg:col-span-4">
        <StreakCard />
      </motion.div>
    </motion.div>
  );
}

function ScheduleItem({ time, end, code, name, location, type, quiz, status, index }) {
  const isCurrent = status === "current";
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.35 }}
      className="flex gap-4 items-stretch rounded-xl p-3.5"
      style={{
        backgroundColor: isCurrent ? COLORS.bg : COLORS.paper,
        border: `1px solid ${isCurrent ? COLORS.primary : COLORS.border}`,
        position: "relative",
      }}
    >
      {/* Time column */}
      <div className="flex flex-col items-start" style={{ minWidth: 60 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.ink }}>{time}</span>
        <span style={{ fontSize: 10, color: COLORS.muted, marginTop: 2 }}>{end}</span>
      </div>

      {/* Vertical bar */}
      <div className="flex flex-col items-center">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: isCurrent ? COLORS.primary : COLORS.border }}
        />
        <div className="flex-1 w-px mt-1" style={{ backgroundColor: COLORS.border }} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.ink }}>{code}</span>
          <span
            className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded font-semibold"
            style={{
              backgroundColor: COLORS.bgSoft,
              color: COLORS.secondary,
              letterSpacing: "0.08em",
            }}
          >
            {type}
          </span>
          {quiz && (
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
              style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
            >
              QUIZ
            </motion.span>
          )}
        </div>
        <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 4 }}>{name}</div>
        <div className="flex items-center gap-1.5" style={{ fontSize: 11, color: COLORS.muted }}>
          <MapPin size={10} />
          {location}
        </div>
      </div>

      {isCurrent && (
        <div className="flex flex-col items-end justify-center">
          <span
            className="text-[10px] uppercase tracking-widest font-semibold inline-flex items-center gap-1"
            style={{ color: COLORS.primary, letterSpacing: "0.1em" }}
          >
            <PulseDot />
            Now
          </span>
        </div>
      )}
    </motion.div>
  );
}

function StreakCard() {
  const reduce = useReducedMotion();
  const days = 23;

  return (
    <Card>
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.muted }}>Study streak</span>
          <motion.div
            animate={reduce ? {} : { rotate: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: COLORS.accent }}
          >
            <Flame size={14} color={COLORS.primary} />
          </motion.div>
        </div>

        <div className="flex items-baseline gap-1.5 mb-4">
          <span
            style={{
              fontWeight: 800,
              fontSize: "2.5rem",
              color: COLORS.primary,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            <CountUp to={days} />
          </span>
          <span style={{ fontSize: 14, color: COLORS.muted, fontWeight: 600 }}>days</span>
        </div>

        {/* Week dots */}
        <div className="flex gap-1.5 mb-4">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.05 * i, duration: 0.3 }}
              className="flex-1 flex flex-col items-center gap-1"
            >
              <div
                className="w-full h-7 rounded-md flex items-center justify-center"
                style={{
                  backgroundColor: i < 5 ? COLORS.primary : i === 5 ? COLORS.accent : COLORS.bg,
                  border: i === 5 ? `none` : `1px solid ${COLORS.border}`,
                }}
              >
                {i < 5 && <CheckCircle2 size={12} color={COLORS.accent} />}
                {i === 5 && <Circle size={10} color={COLORS.primary} />}
              </div>
              <span style={{ fontSize: 9, color: COLORS.muted, fontWeight: 600 }}>{d}</span>
            </motion.div>
          ))}
        </div>

        <div
          className="text-xs px-3 py-2 rounded-lg"
          style={{ backgroundColor: COLORS.bg, color: COLORS.ink }}
        >
          <span style={{ fontWeight: 600 }}>2 more days</span>{" "}
          <span style={{ color: COLORS.muted }}>to unlock the 25-day badge</span>
        </div>
      </div>
    </Card>
  );
}

function PulseDot() {
  return (
    <span className="relative inline-flex w-1.5 h-1.5">
      <motion.span
        animate={{ scale: [1, 2.2, 1], opacity: [0.7, 0, 0.7] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: COLORS.primary }}
      />
      <span
        className="relative inline-flex w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: COLORS.primary }}
      />
    </span>
  );
}

/* ---------- Chat + Deadlines row ---------- */

function ChatAndDeadlinesRow() {
  return (
    <motion.div variants={stagger} className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-5">
      <motion.div variants={fadeUp} className="lg:col-span-5">
        <ChatPreview />
      </motion.div>
      <motion.div variants={fadeUp} className="lg:col-span-7">
        <DeadlinesCard />
      </motion.div>
    </motion.div>
  );
}

function ChatPreview() {
  return (
    <Card>
      <CardHeader
        title="Continue chatting"
        sub="Last message · 23 min ago"
        action={
          <Link to="/chat" className="text-xs font-medium inline-flex items-center gap-1" style={{ color: COLORS.primary }}>
            Open chat <ArrowRight size={11} />
          </Link>
        }
      />
      <div className="px-5 pb-5 space-y-2.5">
        <div className="flex justify-end">
          <div
            className="rounded-2xl rounded-br-md px-3.5 py-2 text-sm max-w-[80%]"
            style={{ backgroundColor: COLORS.primary, color: "white" }}
          >
            What topics will the CSC 423 quiz cover?
          </div>
        </div>

        <div className="flex gap-2 items-start">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ backgroundColor: COLORS.primary }}
          >
            <Sparkles size={11} color={COLORS.accent} />
          </div>
          <div
            className="rounded-2xl rounded-bl-md px-3.5 py-2 text-sm"
            style={{ backgroundColor: COLORS.bg, color: COLORS.ink, border: `1px solid ${COLORS.border}` }}
          >
            Based on Dr. Adeyemi's syllabus, the quiz covers: neural networks basics, gradient
            descent, and the backprop derivation we did last Friday.
          </div>
        </div>

        {/* Input */}
        <div
          className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{ backgroundColor: COLORS.bg, border: `1px solid ${COLORS.border}` }}
        >
          <input
            placeholder="Type a follow-up…"
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: COLORS.ink }}
          />
          <button
            className="w-7 h-7 rounded-md flex items-center justify-center"
            style={{ backgroundColor: COLORS.primary, color: "white" }}
            aria-label="Send"
          >
            <Send size={12} />
          </button>
        </div>
      </div>
    </Card>
  );
}

const DEADLINES = [
  {
    course: "CSC 423",
    title: "Quiz 3 — Neural networks",
    due: "Today, 9:00 AM",
    urgency: "high",
    progress: 80,
  },
  {
    course: "CSC 401",
    title: "Group project milestone 2",
    due: "Thursday, 18 Jun",
    urgency: "med",
    progress: 45,
  },
  {
    course: "CSC 415",
    title: "Lab report — Consensus algorithms",
    due: "Monday, 22 Jun",
    urgency: "low",
    progress: 10,
  },
  {
    course: "GST 411",
    title: "Final research paper",
    due: "Friday, 26 Jun",
    urgency: "low",
    progress: 30,
  },
];

function DeadlinesCard() {
  return (
    <Card>
      <CardHeader
        title="Upcoming deadlines"
        sub="4 items"
        action={
          <button
            className="text-xs font-medium inline-flex items-center gap-1 px-2.5 py-1 rounded-md"
            style={{ backgroundColor: COLORS.bg, color: COLORS.primary, border: `1px solid ${COLORS.border}` }}
          >
            <Plus size={11} /> Add
          </button>
        }
      />
      <div className="px-5 pb-5 space-y-2.5">
        {DEADLINES.map((d, i) => (
          <DeadlineItem key={i} {...d} index={i} />
        ))}
      </div>
    </Card>
  );
}

function DeadlineItem({ course, title, due, urgency, progress, index }) {
  const urgencyColor =
    urgency === "high" ? COLORS.danger : urgency === "med" ? COLORS.warn : COLORS.secondary;
  const urgencyLabel = urgency === "high" ? "Due today" : urgency === "med" ? "This week" : "Next week";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.3 }}
      whileHover={{ x: 2 }}
      className="rounded-xl p-3 flex items-center gap-3"
      style={{ backgroundColor: COLORS.paper, border: `1px solid ${COLORS.border}` }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${urgencyColor}15`, color: urgencyColor }}
      >
        {urgency === "high" ? <AlertCircle size={15} /> : <Clock size={15} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.secondary }}>{course}</span>
          <span
            className="text-[9px] uppercase tracking-widest font-semibold px-1.5 py-0.5 rounded"
            style={{ backgroundColor: `${urgencyColor}15`, color: urgencyColor, letterSpacing: "0.1em" }}
          >
            {urgencyLabel}
          </span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.ink }} className="truncate">
          {title}
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ backgroundColor: COLORS.bg }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, delay: 0.1 * index, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ backgroundColor: COLORS.primary }}
            />
          </div>
          <span style={{ fontSize: 10, fontWeight: 600, color: COLORS.muted, minWidth: 26, textAlign: "right" }}>
            {progress}%
          </span>
        </div>
      </div>
      <div style={{ fontSize: 11, color: COLORS.muted, textAlign: "right", whiteSpace: "nowrap" }}>{due}</div>
    </motion.div>
  );
}

/* ---------- Events row ---------- */

const EVENTS = [
  {
    day: "19",
    month: "JUN",
    title: "NACOS General Meeting",
    time: "2:00 PM",
    location: "CSDT Hall 2",
    tag: "Academic",
    attendees: 142,
  },
  {
    day: "24",
    month: "JUN",
    title: "AI & Robotics Workshop",
    time: "4:00 PM",
    location: "Lab Block C",
    tag: "Workshop",
    attendees: 89,
  },
  {
    day: "27",
    month: "JUN",
    title: "Career Fair 2026",
    time: "10:00 AM",
    location: "Main Auditorium",
    tag: "Career",
    attendees: 412,
  },
];

function EventsRow() {
  return (
    <motion.div variants={fadeUp}>
      <Card>
        <CardHeader
          title="Upcoming events"
          sub="This month on campus"
          action={
            <Link to="/events" className="text-xs font-medium inline-flex items-center gap-1" style={{ color: COLORS.primary }}>
              View all <ArrowRight size={11} />
            </Link>
          }
        />
        <div className="px-5 pb-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {EVENTS.map((e, i) => (
            <EventCard key={i} {...e} index={i} />
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

function EventCard({ day, month, title, time, location, tag, attendees, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * index, duration: 0.4 }}
      whileHover={{ y: -3 }}
      className="rounded-xl p-4 flex gap-3 cursor-pointer"
      style={{ backgroundColor: COLORS.bg, border: `1px solid ${COLORS.border}` }}
    >
      <div
        className="rounded-lg flex flex-col items-center justify-center flex-shrink-0"
        style={{
          backgroundColor: COLORS.primary,
          color: "white",
          width: 52,
          height: 52,
        }}
      >
        <span style={{ fontSize: 18, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.02em" }}>
          {day}
        </span>
        <span style={{ fontSize: 9, fontWeight: 600, color: COLORS.accent, marginTop: 2, letterSpacing: "0.05em" }}>
          {month}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <span
          className="text-[9px] uppercase tracking-widest font-semibold inline-block mb-1"
          style={{ color: COLORS.secondary, letterSpacing: "0.12em" }}
        >
          {tag}
        </span>
        <h4 style={{ fontSize: 13, fontWeight: 600, color: COLORS.ink, lineHeight: 1.3, marginBottom: 6 }}>
          {title}
        </h4>
        <div className="flex items-center gap-3" style={{ fontSize: 11, color: COLORS.muted }}>
          <span className="flex items-center gap-1">
            <Clock size={10} />
            {time}
          </span>
          <span className="flex items-center gap-1">
            <Users size={10} />
            {attendees}
          </span>
        </div>
      </div>

      <button
        className="self-start w-7 h-7 rounded-md flex items-center justify-center transition-colors"
        style={{ backgroundColor: COLORS.paper, color: COLORS.primary, border: `1px solid ${COLORS.border}` }}
        aria-label="Save"
      >
        <Bookmark size={12} />
      </button>
    </motion.div>
  );
}

/* ---------- Shared ---------- */

function Card({ children }) {
  return (
    <div
      className="rounded-2xl overflow-hidden h-full"
      style={{ backgroundColor: COLORS.paper, border: `1px solid ${COLORS.border}` }}
    >
      {children}
    </div>
  );
}

function CardHeader({ title, sub, action }) {
  return (
    <div className="px-5 pt-5 pb-3 flex items-center justify-between gap-3">
      <div>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: COLORS.ink, letterSpacing: "-0.01em" }}>
          {title}
        </h3>
        {sub && <p style={{ fontSize: 11, color: COLORS.muted, marginTop: 2 }}>{sub}</p>}
      </div>
      {action}
    </div>
  );
}
