import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  IdCard,
  ShieldCheck,
  Calendar,
  MessageSquare,
  TrendingUp,
  AlertCircle,
  Loader2,
} from "lucide-react";

/**
 * Login — KDU student login page.
 * Uses matric number (format: KDUC/CSC/240587) instead of email.
 * Drop in as your /login route component.
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
  danger: "#EF4444",
};

// Matric format: KDUC/CSC/240587
// - KDUC = school code (Koladaisi University, College)
// - CSC = department code (3 letters)
// - 240587 = student number (6 digits)
const MATRIC_PATTERN = /^KDUC\/[A-Z]{3}\/\d{6}$/i;

const Login = () => {
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  const [matric, setMatric] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

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

  // Auto-format input as user types (uppercase, auto-add slashes)
  const formatMatric = (raw) => {
    let cleaned = raw.toUpperCase().replace(/[^A-Z0-9/]/g, "");
    // Allow user to clear/backspace freely. Only suggest formatting on input.
    return cleaned;
  };

  const handleMatricChange = (e) => {
    setMatric(formatMatric(e.target.value));
    if (error) setError("");
  };

  const isValidMatric = MATRIC_PATTERN.test(matric);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);

    if (!isValidMatric) {
      setError("Matric number must be in the format KDUC/CSC/240587");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");
    setLoading(true);

    // Mock auth — swap for real API call
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1200);
  };

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
      {/* Left: form */}
      <div className="flex-1 flex flex-col px-6 md:px-12 py-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" style={{ textDecoration: "none" }}>
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: COLORS.primary }}
          >
            <Sparkles size={15} color={COLORS.accent} />
          </div>
          <span style={{ fontWeight: 700, fontSize: "1.1rem", color: COLORS.ink }}>
            CampusMind AI
          </span>
        </Link>

        {/* Form */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <h1
              style={{
                fontWeight: 800,
                fontSize: "clamp(1.85rem, 4vw, 2.5rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: COLORS.ink,
                marginBottom: "0.75rem",
              }}
            >
              Welcome back to{" "}
              <span style={{ color: COLORS.primary, position: "relative", display: "inline-block" }}>
                campus
                <motion.span
                  aria-hidden="true"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
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
              </span>
              .
            </h1>
            <p style={{ fontSize: "0.95rem", color: COLORS.muted, lineHeight: 1.55, marginBottom: "2rem" }}>
              Sign in with your KDU matric number to access your dashboard, chat, and schedule.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Matric number field */}
              <FormField
                label="Matric number"
                icon={IdCard}
                hint="Format: KDUC/CSC/240587"
              >
                <input
                  type="text"
                  value={matric}
                  onChange={handleMatricChange}
                  onBlur={() => setTouched(true)}
                  placeholder="KDUC/CSC/240587"
                  autoComplete="username"
                  spellCheck={false}
                  className="w-full px-3.5 py-2.5 bg-transparent text-sm outline-none"
                  style={{
                    color: COLORS.ink,
                    fontFamily: "ui-monospace, SFMono-Regular, monospace",
                    letterSpacing: "0.02em",
                  }}
                />
                {matric && (
                  <ValidationBadge valid={isValidMatric} />
                )}
              </FormField>

              {/* Password field */}
              <FormField label="Password" icon={Lock}>
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full px-3.5 py-2.5 bg-transparent text-sm outline-none"
                  style={{ color: COLORS.ink }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="mr-2 w-7 h-7 rounded-md flex items-center justify-center"
                  style={{ color: COLORS.muted }}
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </FormField>

              {/* Remember + forgot */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <button
                    type="button"
                    onClick={() => setRemember((r) => !r)}
                    className="w-4 h-4 rounded flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: remember ? COLORS.primary : "transparent",
                      border: `1.5px solid ${remember ? COLORS.primary : COLORS.border}`,
                    }}
                    aria-label="Remember me"
                  >
                    {remember && (
                      <motion.svg
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.2 }}
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <motion.path
                          d="M2 5L4 7L8 3"
                          stroke={COLORS.accent}
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      </motion.svg>
                    )}
                  </button>
                  <span style={{ fontSize: 12, color: COLORS.ink }}>Keep me signed in</span>
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs font-medium"
                  style={{ color: COLORS.primary, textDecoration: "none" }}
                >
                  Forgot password?
                </Link>
              </div>

              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2 px-3 py-2.5 rounded-lg"
                  style={{
                    backgroundColor: `${COLORS.danger}10`,
                    border: `1px solid ${COLORS.danger}30`,
                  }}
                >
                  <AlertCircle size={13} color={COLORS.danger} className="flex-shrink-0 mt-0.5" />
                  <span style={{ fontSize: 12, color: COLORS.danger, lineHeight: 1.4 }}>{error}</span>
                </motion.div>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={loading ? {} : { scale: 1.01 }}
                whileTap={loading ? {} : { scale: 0.99 }}
                className="w-full mt-2 px-4 py-3 rounded-lg text-sm font-medium inline-flex items-center justify-center gap-2 transition-opacity"
                style={{
                  backgroundColor: COLORS.primary,
                  color: "white",
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? "wait" : "pointer",
                }}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader2 size={14} />
                    </motion.div>
                    Signing you in
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight size={14} />
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px" style={{ backgroundColor: COLORS.border }} />
              <span style={{ fontSize: 11, color: COLORS.muted }}>OR</span>
              <div className="flex-1 h-px" style={{ backgroundColor: COLORS.border }} />
            </div>

            {/* First-time signup */}
            <div
              className="px-4 py-3 rounded-lg flex items-center justify-between gap-3"
              style={{ backgroundColor: COLORS.paper, border: `1px solid ${COLORS.border}` }}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.ink }}>
                  New to CampusMind?
                </div>
                <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 1 }}>
                  Create your account with your matric.
                </div>
              </div>
              <Link
                to="/signup"
                className="text-xs font-medium px-3 py-1.5 rounded-lg inline-flex items-center gap-1"
                style={{
                  backgroundColor: COLORS.bg,
                  color: COLORS.primary,
                  border: `1px solid ${COLORS.border}`,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                Sign up
                <ArrowRight size={11} />
              </Link>
            </div>

            {/* Trust line */}
            <div
              className="mt-6 flex items-center gap-1.5"
              style={{ fontSize: 11, color: COLORS.muted }}
            >
              <ShieldCheck size={11} color={COLORS.secondary} />
              Verified through the KDU student portal · Your data stays private
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3" style={{ fontSize: 11, color: COLORS.muted }}>
          <span>© 2026 CampusMind AI · Koladaisi University</span>
          <div className="flex items-center gap-4">
            <a href="#" style={{ color: COLORS.muted, textDecoration: "none" }}>Help</a>
            <a href="#" style={{ color: COLORS.muted, textDecoration: "none" }}>Privacy</a>
            <a href="#" style={{ color: COLORS.muted, textDecoration: "none" }}>Terms</a>
          </div>
        </div>
      </div>

      {/* Right: branded panel */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden"
        style={{ backgroundColor: COLORS.primary, color: "white", width: "44%", maxWidth: 640 }}
      >
        {/* Decorative blobs */}
        <motion.div
          aria-hidden="true"
          animate={reduce ? {} : { scale: [1, 1.15, 1], rotate: [0, 8, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -right-16 rounded-full"
          style={{
            width: 320,
            height: 320,
            backgroundColor: COLORS.accent,
            opacity: 0.15,
            filter: "blur(50px)",
          }}
        />
        <motion.div
          aria-hidden="true"
          animate={reduce ? {} : { scale: [1, 1.2, 1], rotate: [0, -6, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-24 -left-16 rounded-full"
          style={{
            width: 360,
            height: 360,
            backgroundColor: COLORS.accentSoft,
            opacity: 0.12,
            filter: "blur(60px)",
          }}
        />

        {/* Top: pulse + tagline */}
        <div className="relative">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs mb-6"
            style={{ backgroundColor: "rgba(255,255,255,0.1)", color: COLORS.accent }}
          >
            <PulseDot />
            12,847 students online
          </div>
          <h2
            style={{
              fontWeight: 800,
              fontSize: "clamp(1.85rem, 3.5vw, 2.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Your campus,
            <br />
            <span style={{ color: COLORS.accent }}>one chat away.</span>
          </h2>
          <p
            className="mt-4 max-w-sm"
            style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.55 }}
          >
            Schedules, deadlines, NACOS updates, lecturer contacts — all in one place,
            personalized to your faculty and level.
          </p>
        </div>

        {/* Middle: floating cards */}
        <div className="relative my-8 flex flex-col gap-3">
          <FloatingPreview
            icon={Calendar}
            title="Tomorrow at 9:00 AM"
            sub="CSC 423 · Hall A · Quiz scheduled"
            delay={0.6}
            offset={-8}
          />
          <FloatingPreview
            icon={MessageSquare}
            title="AI is ready to help"
            sub="Try: What's my schedule today?"
            delay={0.8}
            offset={20}
            highlight
          />
          <FloatingPreview
            icon={TrendingUp}
            title="GPA up 0.3 this semester"
            sub="Based on graded coursework"
            delay={1.0}
            offset={4}
          />
        </div>

        {/* Bottom: testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="relative rounded-xl p-5"
          style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <p style={{ fontSize: 13, lineHeight: 1.55, color: "rgba(255,255,255,0.9)" }}>
            "I stopped missing assignments after my first week. CampusMind tells me what's due
            and when, before I even open my laptop."
          </p>
          <div className="mt-3 flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ backgroundColor: COLORS.accent, color: COLORS.primary, fontWeight: 700, fontSize: 11 }}
            >
              CO
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>Chioma Okeke</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)" }}>
                300L · Faculty of Applied Sciences
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;

/* ---------- Sub-components ---------- */

function FormField({ label, icon: Icon, hint, children }) {
  return (
    <div>
      <label
        className="block mb-1.5"
        style={{ fontSize: 12, fontWeight: 600, color: COLORS.ink }}
      >
        {label}
      </label>
      <div
        className="flex items-center rounded-lg transition-colors focus-within:ring-2"
        style={{
          backgroundColor: COLORS.paper,
          border: `1px solid ${COLORS.border}`,
        }}
      >
        <div className="pl-3.5" style={{ color: COLORS.muted }}>
          <Icon size={15} />
        </div>
        {children}
      </div>
      {hint && (
        <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 6 }}>{hint}</div>
      )}
    </div>
  );
}

function ValidationBadge({ valid }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="mr-3"
      style={{ color: valid ? "#22C55E" : COLORS.danger }}
      aria-label={valid ? "Valid matric format" : "Invalid format"}
    >
      {valid ? (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="6" fill="currentColor" opacity="0.15" />
          <path
            d="M4 7L6 9L10 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <AlertCircle size={14} />
      )}
    </motion.div>
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

function FloatingPreview({ icon: Icon, title, sub, delay, offset, highlight }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      style={{ marginLeft: offset }}
    >
      <motion.div
        animate={reduce ? {} : { y: [0, -4, 0] }}
        transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}
        className="rounded-xl px-4 py-3 flex items-center gap-3"
        style={{
          backgroundColor: highlight ? COLORS.accent : "rgba(255,255,255,0.1)",
          border: highlight ? "none" : "1px solid rgba(255,255,255,0.15)",
          backdropFilter: "blur(8px)",
          color: highlight ? COLORS.primary : "white",
        }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: highlight ? COLORS.primary : "rgba(255,255,255,0.15)",
            color: highlight ? COLORS.accent : "white",
          }}
        >
          <Icon size={14} />
        </div>
        <div className="min-w-0">
          <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.3 }}>{title}</div>
          <div style={{ fontSize: 10.5, opacity: 0.75, marginTop: 2 }}>{sub}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
