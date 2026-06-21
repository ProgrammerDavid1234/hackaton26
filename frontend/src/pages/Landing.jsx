import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
} from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  MessageSquare,
  Map,
  TrendingUp,
  FolderOpen,
  Clock,
  Brain,
  Award,
  ChevronDown,
  Play,
  Calendar,
  Megaphone,
  Trophy,
  GraduationCap,
  Zap,
  BookOpen,
  Users,
  MapPin,
  Bell,
  Bookmark,
  CheckCircle2,
} from "lucide-react";

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
  footer: "#093C5D",
};

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=80&auto=format&fit=crop";

const BENEFITS_IMAGE =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80&auto=format&fit=crop";

/* ---------- Social icons (inline SVG — lucide-react removed branded icons in v0.456+) ---------- */

const TwitterIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
  </svg>
);

/* ---------- Animation variants ---------- */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const Landing = () => {
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
        overflowX: "hidden",
      }}
    >
      <Nav />
      <Hero />
      <Announcements />
      <Stats />
      <ChatMockup />
      <Features />
      <Events />
      <Benefits />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Landing;

/* ---------- Nav ---------- */

function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-6 md:px-10 py-5 flex items-center justify-between max-w-7xl mx-auto"
    >
      <div className="flex items-center gap-2">
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

      <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: COLORS.muted }}>
        <a href="#features" className="hover:text-black transition-colors">Features</a>
        <a href="#events" className="hover:text-black transition-colors">Events</a>
        <a href="#faq" className="hover:text-black transition-colors">FAQ</a>
      </div>

      <Link
        to="/login"
        className="text-sm px-4 py-2 rounded-lg font-medium transition-transform hover:scale-[1.03] inline-flex items-center gap-1.5"
        style={{ backgroundColor: COLORS.primary, color: "white" }}
      >
        Get Started
      </Link>
    </motion.nav>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="px-6 md:px-10 pt-8 md:pt-12 pb-16 md:pb-20 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-center">
        <motion.div
          className="md:col-span-6"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs mb-7"
            style={{
              backgroundColor: COLORS.paper,
              color: COLORS.primary,
              border: `1px solid ${COLORS.border}`,
            }}
          >
            <PulseDot />
            12,847 students online right now
          </motion.div>

          <motion.h1
            variants={fadeUp}
            style={{
              fontWeight: 800,
              fontSize: "clamp(2.25rem, 5.5vw, 4rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              color: COLORS.ink,
            }}
          >
            Your Intelligent{" "}
            <span style={{ color: COLORS.primary, position: "relative", display: "inline-block" }}>
              Campus
              <motion.span
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: "0.05em",
                  height: "0.18em",
                  backgroundColor: COLORS.accent,
                  zIndex: -1,
                  transformOrigin: "left",
                  borderRadius: "2px",
                }}
              />
            </span>{" "}
            Companion
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl"
            style={{ fontSize: "1.0625rem", lineHeight: 1.6, color: COLORS.muted }}
          >
            From NACOS dues to tomorrow's timetable, get straight answers in seconds. Real
            schedules, real announcements, real events — all in one chat.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-medium transition-transform hover:scale-[1.03]"
              style={{ backgroundColor: COLORS.primary, color: "white" }}
            >
              Launch AI Chat
              <ArrowRight size={15} />
            </Link>
            <a
              href="#chat-demo"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-medium transition-colors"
              style={{
                backgroundColor: "transparent",
                color: COLORS.ink,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <Play size={13} />
              Watch Demo
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex items-center gap-3 text-xs"
            style={{ color: COLORS.muted }}
          >
            <div className="flex -space-x-2">
              {[COLORS.primary, COLORS.secondary, COLORS.accentSoft].map((c, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2"
                  style={{ backgroundColor: c, borderColor: COLORS.bg }}
                />
              ))}
            </div>
            <span>Loved by students at KDU, Unilag, OAU, Covenant</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="md:col-span-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="relative">
            <motion.div
              animate={reduce ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-3xl overflow-hidden"
              style={{
                border: `1px solid ${COLORS.border}`,
                aspectRatio: "5 / 4",
                boxShadow: "0 30px 60px -30px rgba(9, 60, 93, 0.3)",
              }}
            >
              <img
                src={HERO_IMAGE}
                alt="A student using CampusMind AI"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </motion.div>

            {/* Top floating tag */}
            <motion.div
              animate={reduce ? {} : { y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 -right-2 md:right-6 px-3.5 py-2 rounded-full text-xs font-medium inline-flex items-center gap-1.5"
              style={{
                backgroundColor: COLORS.paper,
                color: COLORS.ink,
                border: `1px solid ${COLORS.border}`,
                boxShadow: "0 8px 24px -8px rgba(9, 60, 93, 0.2)",
              }}
            >
              <PulseDot />
              Exam Prep Ready
            </motion.div>

            {/* Bottom floating tag */}
            <motion.div
              animate={reduce ? {} : { y: [0, 6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-4 -left-2 md:left-6 px-3.5 py-2.5 rounded-xl text-xs inline-flex items-center gap-2"
              style={{
                backgroundColor: COLORS.paper,
                color: COLORS.ink,
                border: `1px solid ${COLORS.border}`,
                boxShadow: "0 8px 24px -8px rgba(9, 60, 93, 0.2)",
              }}
            >
              <Calendar size={14} color={COLORS.primary} />
              <div>
                <div style={{ fontWeight: 600, fontSize: "11px" }}>Quiz tomorrow</div>
                <div style={{ color: COLORS.muted, fontSize: "10px" }}>CSC 423 · 9:00 AM</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PulseDot() {
  return (
    <span className="relative inline-flex w-2 h-2">
      <motion.span
        animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: COLORS.accent }}
      />
      <span
        className="relative inline-flex w-2 h-2 rounded-full"
        style={{ backgroundColor: COLORS.accent }}
      />
    </span>
  );
}

/* ---------- Announcements Ticker ---------- */

const ANNOUNCEMENTS = [
  { icon: Megaphone, text: "Library now open 24/7 during finals week", tone: "info" },
  { icon: Trophy, text: "CSDT wins Inter-faculty Hackathon 2026", tone: "success" },
  { icon: GraduationCap, text: "Spring 2026 registration opens Monday 23 June", tone: "info" },
  { icon: Zap, text: "New AI tutor for Calculus II — free for all students", tone: "accent" },
  { icon: BookOpen, text: "Past papers archive expanded to 12,000+ documents", tone: "info" },
  { icon: Bell, text: "Career Fair this Saturday — 47 companies confirmed", tone: "success" },
];

function Announcements() {
  return (
    <section
      className="py-4 overflow-hidden relative"
      style={{
        backgroundColor: COLORS.primary,
        borderTop: `1px solid ${COLORS.primary}`,
        borderBottom: `1px solid ${COLORS.primary}`,
      }}
    >
      <div className="flex items-center gap-4 max-w-7xl mx-auto px-6 md:px-10">
        <div
          className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 z-10"
          style={{
            backgroundColor: COLORS.accent,
            color: COLORS.primary,
          }}
        >
          <PulseDotDark />
          LIVE
        </div>
        <div className="flex-1 overflow-hidden relative" style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}>
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          >
            {[...ANNOUNCEMENTS, ...ANNOUNCEMENTS].map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className="inline-flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.9)" }}>
                  <Icon size={14} color={COLORS.accent} />
                  {a.text}
                  <span style={{ color: "rgba(255,255,255,0.3)", marginLeft: "1rem" }}>•</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PulseDotDark() {
  return (
    <span className="relative inline-flex w-1.5 h-1.5">
      <motion.span
        animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
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

/* ---------- Stats with count-up ---------- */

const STATS = [
  { value: 12, suffix: "k+", label: "Active Students" },
  { value: 850, suffix: "k+", label: "Questions Answered" },
  { value: 23, suffix: "+", label: "Universities" },
  { value: 4.9, suffix: "/5", label: "Student Rating", decimal: true },
];

function Stats() {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="px-6 md:px-10 py-16 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {STATS.map((s, i) => (
          <motion.div key={i} variants={fadeUp} className="text-center">
            <div
              style={{
                fontWeight: 800,
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                color: COLORS.primary,
                letterSpacing: "-0.025em",
                lineHeight: 1,
              }}
            >
              <CountUp to={s.value} decimal={s.decimal} />
              {s.suffix}
            </div>
            <div
              className="mt-2 text-xs uppercase tracking-widest"
              style={{ color: COLORS.muted, letterSpacing: "0.15em" }}
            >
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function CountUp({ to, duration = 1.8, decimal = false }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const startTime = Date.now();
    let raf;
    const tick = () => {
      const elapsed = (Date.now() - startTime) / 1000;
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

/* ---------- Chat Mockup (animated) ---------- */

const CHAT_SCRIPT = [
  { delay: 600, type: "user", text: "What's my schedule tomorrow?" },
  { delay: 900, type: "typing" },
  { delay: 1800, type: "ai", text: "You have 3 classes tomorrow:" },
  { delay: 600, type: "ai-card" },
  { delay: 700, type: "ai", text: "Heads up: CSC 423 has a quiz. Want me to set a study reminder?" },
  { delay: 500, type: "actions" },
];

function ChatMockup() {
  const [visibleSteps, setVisibleSteps] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    let totalDelay = 0;
    CHAT_SCRIPT.forEach((step, i) => {
      totalDelay += step.delay;
      setTimeout(() => {
        if (!cancelled) setVisibleSteps(i + 1);
      }, totalDelay);
    });
    return () => {
      cancelled = true;
    };
  }, [inView]);

  return (
    <section
      id="chat-demo"
      className="px-6 md:px-10 py-20 md:py-24"
      style={{ backgroundColor: COLORS.paper }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 md:gap-14 items-center">
        <motion.div
          className="md:col-span-5"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs mb-5"
            style={{
              backgroundColor: COLORS.bg,
              color: COLORS.primary,
              border: `1px solid ${COLORS.border}`,
            }}
          >
            <MessageSquare size={12} />
            Live chat preview
          </div>
          <h2
            style={{
              fontWeight: 800,
              fontSize: "clamp(1.85rem, 4vw, 2.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: COLORS.ink,
            }}
          >
            Ask anything.
            <br />
            <span style={{ color: COLORS.primary }}>Get answers that act.</span>
          </h2>
          <p className="mt-5 max-w-md" style={{ fontSize: "1rem", lineHeight: 1.6, color: COLORS.muted }}>
            CampusMind doesn't just answer questions. It pulls your real schedule, sets reminders,
            and connects to your calendar in one tap.
          </p>

          <div className="mt-7 space-y-3">
            {[
              "Personalized to your courses and faculty",
              "Connected to your campus calendar",
              "Citations from official university sources",
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
                className="flex items-center gap-2.5 text-sm"
                style={{ color: COLORS.ink }}
              >
                <CheckCircle2 size={16} color={COLORS.primary} />
                {t}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Chat panel */}
        <motion.div
          className="md:col-span-7"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              backgroundColor: COLORS.bg,
              border: `1px solid ${COLORS.border}`,
              boxShadow: "0 30px 60px -30px rgba(9, 60, 93, 0.25)",
            }}
          >
            {/* Chat header */}
            <div
              className="px-5 py-3.5 flex items-center gap-3"
              style={{
                backgroundColor: COLORS.primary,
                color: "white",
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                <Sparkles size={14} color={COLORS.accent} />
              </div>
              <div className="flex-1">
                <div style={{ fontSize: "13px", fontWeight: 600 }}>CampusMind AI</div>
                <div className="flex items-center gap-1.5" style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)" }}>
                  <PulseDot />
                  Online · Replies instantly
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="p-5 md:p-7 space-y-3 min-h-[420px]">
              <AnimatePresence>
                {CHAT_SCRIPT.map((step, i) => {
                  if (i >= visibleSteps) return null;

                  if (step.type === "user") {
                    return <UserMessage key={i} text={step.text} />;
                  }
                  if (step.type === "typing") {
                    // Hide typing once next step appears
                    if (visibleSteps > i + 1) return null;
                    return <TypingIndicator key={i} />;
                  }
                  if (step.type === "ai") {
                    return <AiMessage key={i} text={step.text} />;
                  }
                  if (step.type === "ai-card") {
                    return <ScheduleCard key={i} />;
                  }
                  if (step.type === "actions") {
                    return <ActionButtons key={i} />;
                  }
                  return null;
                })}
              </AnimatePresence>
            </div>

            {/* Input bar (decorative) */}
            <div
              className="px-5 py-3.5 flex items-center gap-3"
              style={{ borderTop: `1px solid ${COLORS.border}`, backgroundColor: COLORS.paper }}
            >
              <div
                className="flex-1 px-3.5 py-2 rounded-lg text-sm"
                style={{
                  backgroundColor: COLORS.bg,
                  color: COLORS.muted,
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                Ask about your courses, deadlines, or campus events…
              </div>
              <button
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: COLORS.primary, color: "white" }}
                aria-label="Send"
              >
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function UserMessage({ text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex justify-end"
    >
      <div
        className="rounded-2xl rounded-br-md px-4 py-2.5 text-sm max-w-[75%]"
        style={{ backgroundColor: COLORS.primary, color: "white" }}
      >
        {text}
      </div>
    </motion.div>
  );
}

function AiMessage({ text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex gap-2 items-start"
    >
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ backgroundColor: COLORS.primary }}
      >
        <Sparkles size={13} color={COLORS.accent} />
      </div>
      <div
        className="rounded-2xl rounded-bl-md px-4 py-2.5 text-sm max-w-[75%]"
        style={{ backgroundColor: COLORS.paper, color: COLORS.ink, border: `1px solid ${COLORS.border}` }}
      >
        {text}
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex gap-2 items-start"
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

function ScheduleCard() {
  const classes = [
    { time: "9:00 AM", code: "CSC 401", name: "Software Engineering", room: "Hall B" },
    { time: "11:00 AM", code: "CSC 415", name: "Distributed Systems", room: "Lab 4" },
    { time: "2:00 PM", code: "CSC 423", name: "AI Fundamentals", room: "Hall A", quiz: true },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="ml-9 rounded-xl overflow-hidden"
      style={{ border: `1px solid ${COLORS.border}`, backgroundColor: COLORS.paper, maxWidth: "85%" }}
    >
      {classes.map((c, i) => (
        <div
          key={i}
          className="flex items-center gap-3 px-3.5 py-2.5"
          style={{
            borderBottom: i < classes.length - 1 ? `1px solid ${COLORS.border}` : "none",
            backgroundColor: c.quiz ? COLORS.bg : "transparent",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: COLORS.muted,
              minWidth: "55px",
            }}
          >
            {c.time}
          </div>
          <div className="flex-1">
            <div style={{ fontSize: "13px", fontWeight: 600, color: COLORS.ink }}>
              {c.code}
            </div>
            <div style={{ fontSize: "11px", color: COLORS.muted }}>
              {c.name} · {c.room}
            </div>
          </div>
          {c.quiz && (
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
            >
              QUIZ
            </span>
          )}
        </div>
      ))}
    </motion.div>
  );
}

function ActionButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="ml-9 flex gap-2 pt-1"
    >
      <button
        className="text-xs px-3.5 py-2 rounded-full inline-flex items-center gap-1.5 font-medium"
        style={{ backgroundColor: COLORS.primary, color: "white" }}
      >
        <Bell size={12} />
        Set reminder
      </button>
      <button
        className="text-xs px-3.5 py-2 rounded-full inline-flex items-center gap-1.5 font-medium"
        style={{
          backgroundColor: COLORS.paper,
          color: COLORS.ink,
          border: `1px solid ${COLORS.border}`,
        }}
      >
        View full week
      </button>
    </motion.div>
  );
}

/* ---------- Features ---------- */

function Features() {
  return (
    <section id="features" className="px-6 md:px-10 py-20 md:py-24 max-w-7xl mx-auto">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="text-center max-w-2xl mx-auto mb-14"
      >
        <motion.h2
          variants={fadeUp}
          style={{
            fontWeight: 800,
            fontSize: "clamp(1.85rem, 3.8vw, 2.5rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: COLORS.ink,
          }}
        >
          Built for the way you actually study.
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mt-4"
          style={{ fontSize: "1rem", lineHeight: 1.6, color: COLORS.muted }}
        >
          One platform, every resource. Designed specifically for the high-speed demands of
          modern university life.
        </motion.p>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5"
      >
        <motion.div variants={fadeUp} className="md:col-span-8">
          <FeatureCard light>
            <FeatureIcon icon={MessageSquare} />
            <FeatureTitle>Context-Aware AI Search</FeatureTitle>
            <FeatureText>
              Search across your lecture notes, textbooks, and university portal in one go. Get
              citations instantly.
            </FeatureText>
            <div
              className="mt-5 rounded-lg px-4 py-3 text-sm"
              style={{
                backgroundColor: COLORS.bgSoft,
                color: COLORS.muted,
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
                fontSize: "13px",
              }}
            >
              "Summarize Tuesday's Bio 101 lecture on cell respiration…"
            </div>
          </FeatureCard>
        </motion.div>

        <motion.div variants={fadeUp} className="md:col-span-4">
          <FeatureCard dark>
            <FeatureIcon icon={Map} light />
            <FeatureTitle light>Campus Navigator</FeatureTitle>
            <FeatureText light>
              Real-time floor plans for every campus building. Never be late to a lab again.
            </FeatureText>
            <button
              className="mt-5 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium"
              style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
            >
              Open Maps
              <ArrowRight size={12} />
            </button>
          </FeatureCard>
        </motion.div>

        <motion.div variants={fadeUp} className="md:col-span-4">
          <FeatureCard light>
            <FeatureIcon icon={TrendingUp} />
            <FeatureTitle>Grade Predictor</FeatureTitle>
            <FeatureText>
              AI-driven insights into your performance based on weighted assignments and trends.
            </FeatureText>
          </FeatureCard>
        </motion.div>

        <motion.div variants={fadeUp} className="md:col-span-5">
          <FeatureCard light>
            <FeatureIcon icon={FolderOpen} />
            <FeatureTitle>Resource Hub</FeatureTitle>
            <FeatureText>
              A unified library for all your course materials, shared study guides, and past
              exams.
            </FeatureText>
          </FeatureCard>
        </motion.div>

        <motion.div variants={fadeUp} className="md:col-span-3">
          <div
            className="h-full rounded-2xl p-6 flex flex-col items-center justify-center text-center"
            style={{ backgroundColor: COLORS.accentSoft, minHeight: 180 }}
          >
            <Users size={28} color={COLORS.primary} />
            <div
              className="mt-3"
              style={{ fontWeight: 700, fontSize: "1.5rem", color: COLORS.primary, lineHeight: 1 }}
            >
              <CountUp to={847} />
            </div>
            <div style={{ fontSize: "11px", color: COLORS.primary, marginTop: 4 }}>
              studying right now
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function FeatureCard({ children, dark }) {
  const styles = dark
    ? { backgroundColor: COLORS.primary, color: "white" }
    : { backgroundColor: COLORS.paper, color: COLORS.ink, border: `1px solid ${COLORS.border}` };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="h-full rounded-2xl p-6 md:p-7"
      style={styles}
    >
      {children}
    </motion.div>
  );
}

function FeatureIcon({ icon: Icon, light }) {
  return (
    <div
      className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
      style={{
        backgroundColor: light ? "rgba(255,255,255,0.15)" : COLORS.bgSoft,
        color: light ? "white" : COLORS.primary,
      }}
    >
      <Icon size={18} />
    </div>
  );
}

function FeatureTitle({ children, light }) {
  return (
    <h3
      style={{
        fontWeight: 700,
        fontSize: "1.1rem",
        color: light ? "white" : COLORS.ink,
        marginBottom: "0.5rem",
      }}
    >
      {children}
    </h3>
  );
}

function FeatureText({ children, light }) {
  return (
    <p
      style={{
        fontSize: "0.9rem",
        lineHeight: 1.55,
        color: light ? "rgba(255,255,255,0.85)" : COLORS.muted,
      }}
    >
      {children}
    </p>
  );
}

/* ---------- Events ---------- */

const EVENTS = [
  {
    day: "19",
    month: "JUN",
    title: "NACOS General Meeting",
    time: "2:00 PM",
    location: "CSDT Hall 2",
    tag: "Academic",
    tagColor: COLORS.primary,
    attendees: 142,
  },
  {
    day: "24",
    month: "JUN",
    title: "AI & Robotics Workshop",
    time: "4:00 PM",
    location: "Lab Block C",
    tag: "Workshop",
    tagColor: COLORS.secondary,
    attendees: 89,
  },
  {
    day: "27",
    month: "JUN",
    title: "Career Fair 2026",
    time: "10:00 AM",
    location: "Main Auditorium",
    tag: "Career",
    tagColor: COLORS.accentSoft,
    attendees: 412,
  },
  {
    day: "04",
    month: "JUL",
    title: "Inter-Faculty Football Final",
    time: "3:00 PM",
    location: "Sports Complex",
    tag: "Sports",
    tagColor: COLORS.accent,
    attendees: 678,
  },
];

function Events() {
  return (
    <section
      id="events"
      className="px-6 md:px-10 py-20 md:py-24"
      style={{ backgroundColor: COLORS.bgSoft }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-wrap items-end justify-between gap-4 mb-12"
        >
          <div>
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs mb-4"
              style={{
                backgroundColor: COLORS.paper,
                color: COLORS.primary,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <Calendar size={12} />
              This month on campus
            </motion.div>
            <motion.h2
              variants={fadeUp}
              style={{
                fontWeight: 800,
                fontSize: "clamp(1.85rem, 3.8vw, 2.5rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: COLORS.ink,
              }}
            >
              Don't miss what's happening.
            </motion.h2>
          </div>
          <motion.a
            variants={fadeUp}
            href="#"
            className="text-sm font-medium inline-flex items-center gap-1.5 hover:gap-2 transition-all"
            style={{ color: COLORS.primary }}
          >
            View all events
            <ArrowRight size={14} />
          </motion.a>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {EVENTS.map((e, i) => (
            <motion.div key={i} variants={fadeUp}>
              <EventCard {...e} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function EventCard({ day, month, title, time, location, tag, tagColor, attendees }) {
  return (
    <motion.div
      whileHover={{ y: -6, rotate: -0.5 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl overflow-hidden cursor-pointer h-full flex flex-col"
      style={{
        backgroundColor: COLORS.paper,
        border: `1px solid ${COLORS.border}`,
      }}
    >
      {/* Date strip */}
      <div
        className="px-5 py-4 flex items-center justify-between"
        style={{ borderBottom: `1px dashed ${COLORS.border}` }}
      >
        <div>
          <div
            style={{
              fontWeight: 800,
              fontSize: "1.75rem",
              lineHeight: 1,
              color: COLORS.primary,
              letterSpacing: "-0.025em",
            }}
          >
            {day}
          </div>
          <div
            className="uppercase tracking-widest"
            style={{ fontSize: "10px", color: COLORS.muted, letterSpacing: "0.15em", marginTop: 2 }}
          >
            {month}
          </div>
        </div>
        <span
          className="text-[10px] uppercase tracking-widest px-2 py-1 rounded font-semibold inline-flex items-center gap-1.5"
          style={{
            backgroundColor: tag === "Sports" ? COLORS.accent : COLORS.bgSoft,
            color: COLORS.primary,
            letterSpacing: "0.1em",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tagColor }} />
          {tag}
        </span>
      </div>

      {/* Content */}
      <div className="px-5 py-4 flex-1 flex flex-col">
        <h3
          style={{
            fontWeight: 700,
            fontSize: "1rem",
            lineHeight: 1.25,
            color: COLORS.ink,
            marginBottom: "0.75rem",
          }}
        >
          {title}
        </h3>
        <div className="space-y-1.5 text-xs" style={{ color: COLORS.muted }}>
          <div className="flex items-center gap-1.5">
            <Clock size={11} />
            {time}
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={11} />
            {location}
          </div>
        </div>

        <div className="mt-4 pt-4 flex items-center justify-between" style={{ borderTop: `1px solid ${COLORS.border}` }}>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: COLORS.muted }}>
            <Users size={11} />
            {attendees} going
          </div>
          <button
            className="text-xs font-medium inline-flex items-center gap-1"
            style={{ color: COLORS.primary }}
          >
            <Bookmark size={12} />
            RSVP
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- Benefits ---------- */

const BENEFITS = [
  {
    icon: Clock,
    title: "Save 10+ Hours Weekly",
    text: "Automated scheduling and smart research tools mean more time for what actually matters.",
  },
  {
    icon: Brain,
    title: "Reduce Cognitive Load",
    text: "Let the AI track deadlines, prerequisites, and administrative tasks so you don't have to.",
  },
  {
    icon: Award,
    title: "Grade Improvement",
    text: "Users report an average 15% increase in GPA within the first semester of active use.",
  },
];

function Benefits() {
  return (
    <section id="benefits" className="px-6 md:px-10 py-20 md:py-24 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-center">
        <motion.div
          className="md:col-span-6"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              backgroundColor: COLORS.footer,
              aspectRatio: "4 / 3",
              border: `1px solid ${COLORS.border}`,
            }}
          >
            <img
              src={BENEFITS_IMAGE}
              alt="Students working together"
              className="w-full h-full object-cover"
              style={{ opacity: 0.9 }}
            />
          </div>
        </motion.div>

        <motion.div
          className="md:col-span-6"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            variants={fadeUp}
            style={{
              fontWeight: 800,
              fontSize: "clamp(1.85rem, 4vw, 2.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: COLORS.ink,
            }}
          >
            Built for the <span style={{ color: COLORS.primary }}>stress-free</span> student.
          </motion.h2>

          <div className="mt-8 space-y-6">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div key={i} variants={fadeUp} className="flex gap-4 items-start">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: COLORS.bgSoft, color: COLORS.primary }}
                  >
                    <Icon size={17} />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontWeight: 700,
                        fontSize: "1.0625rem",
                        color: COLORS.ink,
                        marginBottom: "0.25rem",
                      }}
                    >
                      {b.title}
                    </h3>
                    <p style={{ fontSize: "0.925rem", lineHeight: 1.55, color: COLORS.muted }}>
                      {b.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

const FAQS = [
  {
    q: "Is CampusMind AI free for students?",
    a: "Yes. Our base 'Student Core' plan is completely free. We also offer a 'Premium' tier for advanced researchers and graduate students that includes API access and priority processing.",
  },
  {
    q: "Does it work with my university's LMS?",
    a: "CampusMind AI integrates natively with Canvas, Blackboard, Moodle, and Google Classroom. Connect once during onboarding and your assignments and announcements sync automatically.",
  },
  {
    q: "How does it handle academic integrity?",
    a: "Every output includes citations linking back to your source materials. We never write essays or complete assignments for you. We help you understand, organize, and prepare.",
  },
];

function FAQ() {
  return (
    <section id="faq" className="px-6 md:px-10 py-20 md:py-24" style={{ backgroundColor: COLORS.paper }}>
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
          style={{
            fontWeight: 800,
            fontSize: "clamp(1.85rem, 3.8vw, 2.5rem)",
            letterSpacing: "-0.02em",
            color: COLORS.ink,
            marginBottom: "3rem",
          }}
        >
          Frequently Asked Questions
        </motion.h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-3"
        >
          {FAQS.map((f, i) => (
            <motion.div key={i} variants={fadeUp}>
              <FAQItem question={f.q} answer={f.a} defaultOpen={i === 0} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: COLORS.bg, border: `1px solid ${COLORS.border}` }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full px-5 py-4 flex items-center justify-between text-left"
        style={{ color: COLORS.ink }}
      >
        <span style={{ fontWeight: 500, fontSize: "0.95rem" }}>{question}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={18} color={COLORS.muted} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="px-5 pb-4"
              style={{ fontSize: "0.9rem", lineHeight: 1.6, color: COLORS.muted }}
            >
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Final CTA ---------- */

function FinalCTA() {
  return (
    <section className="px-6 md:px-10 py-16 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="rounded-3xl px-6 md:px-10 py-14 md:py-20 text-center relative overflow-hidden"
        style={{ backgroundColor: COLORS.primary, color: "white" }}
      >
        {/* Decorative mint blob */}
        <motion.div
          aria-hidden="true"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -right-20 w-60 h-60 rounded-full"
          style={{ backgroundColor: COLORS.accent, opacity: 0.15, filter: "blur(40px)" }}
        />
        <motion.div
          aria-hidden="true"
          animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full"
          style={{ backgroundColor: COLORS.accentSoft, opacity: 0.15, filter: "blur(40px)" }}
        />

        <div className="relative">
          <h2
            style={{
              fontWeight: 800,
              fontSize: "clamp(1.85rem, 4.2vw, 2.75rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Ready to transform your campus life?
          </h2>
          <p
            className="mt-4 max-w-md mx-auto"
            style={{ fontSize: "1rem", color: "rgba(255,255,255,0.8)" }}
          >
            Join over 12,000 students already using CampusMind AI to stay ahead.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-medium transition-transform hover:scale-[1.03]"
              style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
            >
              Get Started for Free
              <ArrowRight size={15} />
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-medium"
              style={{
                backgroundColor: "transparent",
                color: "white",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              Contact Sales
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Footer ---------- */

const FOOTER_COLS = [
  { title: "Product", links: ["Features", "Pricing", "Security"] },
  { title: "Company", links: ["About", "Careers", "Blog"] },
  { title: "Support", links: ["Help Center", "API Docs", "Privacy"] },
];

function Footer() {
  return (
    <footer
      className="px-6 md:px-10 pt-16 pb-8"
      style={{ backgroundColor: COLORS.footer, color: "rgba(255,255,255,0.7)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <Sparkles size={14} color={COLORS.accent} />
              </div>
              <span style={{ color: "white", fontWeight: 700, fontSize: "1rem" }}>
                CampusMind AI
              </span>
            </div>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.55, maxWidth: 280 }}>
              Empowering the next generation of scholars with intelligent, context-aware
              academic tools.
            </p>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h4 style={{ color: "white", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.875rem" }}>
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-white transition-colors" style={{ fontSize: "0.85rem" }}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 style={{ color: "white", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.875rem" }}>
              Social
            </h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.2)", color: "white" }}
                aria-label="Twitter"
              >
                <TwitterIcon size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.2)", color: "white" }}
                aria-label="LinkedIn"
              >
                <LinkedInIcon size={14} />
              </a>
            </div>
          </div>
        </div>

        <div
          className="mt-12 pt-6 flex flex-wrap items-center justify-between gap-3 text-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <span>© 2026 CampusMind AI. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
