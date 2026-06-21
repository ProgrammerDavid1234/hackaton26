import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase, getEmailByMatric } from "../lib/supabase";
import Logo from "../components/Logo";
import HeroPanel from "../components/HeroPanel";
import {
  Field,
  Input,
  PasswordInput,
  Alert,
  Spinner,
  Divider,
  PrimaryButton,
  GhostButton,
} from "../components/UI";

const MATRIC_REGEX = /^[A-Z]{3}\/[A-Z]{2,5}\/\d{4,6}$/i;

const C = {
  bg: "#F0F7FA",
  ink: "#082235",
  muted: "#5E7585",
  primary: "#093C5D",
  secondary: "#3B7597",
  border: "#D0E1E8",
};

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    matric: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) =>
    setForm((f) => ({
      ...f,
      [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const validate = () => {
    const e = {};
    const m = form.matric.trim().toUpperCase();
    if (!m) e.matric = "Matric number is required";
    else if (!MATRIC_REGEX.test(m)) e.matric = "Format: KDU/CSC/24043";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6)
      e.password = "At least 6 characters required";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    setStatus(null);

    const matricUpper = form.matric.trim().toUpperCase();
    const { email, error: lookupErr } = await getEmailByMatric(matricUpper);
    if (lookupErr || !email) {
      setLoading(false);
      setErrors({ matric: "Matric number not found. Please sign up first." });
      return;
    }

    const { error: authErr } = await supabase.auth.signInWithPassword({
      email,
      password: form.password,
    });
    setLoading(false);

    if (authErr) {
      setStatus({
        type: "error",
        message: "Incorrect password. Please try again.",
      });
      return;
    }

    setStatus({ type: "success", message: "Welcome back! Redirecting…" });
    setTimeout(() => navigate("/chat"), 1400);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
      }}
      className="lg:grid-cols-[1fr_1.15fr]"
    >
      {/* ── Left: form ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "48px 24px",
          background: C.bg,
          minHeight: "100vh",
        }}
        className="lg:min-h-0"
      >
        <div
          style={{ width: "100%", maxWidth: 400 }}
          className="animate-fade-up"
        >
          {/* Logo */}
          <div style={{ marginBottom: 36 }}>
            <Logo size="md" />
          </div>

          {/* Heading */}
          <div style={{ marginBottom: 28 }}>
            <h1
              style={{
                color: C.ink,
                fontWeight: 800,
                fontSize: "1.65rem",
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
                marginBottom: 6,
                margin: "0 0 6px",
              }}
            >
              Welcome back
            </h1>
            <p style={{ color: C.muted, fontSize: "0.875rem", margin: 0 }}>
              Sign in with your matric number to continue
            </p>
          </div>

          {/* Alert */}
          {status && (
            <div style={{ marginBottom: 20 }}>
              <Alert type={status.type}>{status.message}</Alert>
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <Field
              label="Matric Number"
              id="matric"
              error={errors.matric}
              hint="Format: KDU/CSC/24043"
            >
              <Input
                id="matric"
                type="text"
                placeholder="KDU/CSC/24043"
                value={form.matric}
                onChange={set("matric")}
                error={errors.matric}
                autoComplete="username"
                autoCapitalize="characters"
                spellCheck={false}
                icon={
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <path d="M16 3v4M8 3v4M2 9h20" strokeLinecap="round" />
                  </svg>
                }
              />
            </Field>

            <Field label="Password" id="password" error={errors.password}>
              <PasswordInput
                id="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={set("password")}
                error={errors.password}
                autoComplete="current-password"
              />
            </Field>

            {/* Remember + Forgot */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={set("remember")}
                  style={{
                    width: 15,
                    height: 15,
                    accentColor: C.primary,
                    cursor: "pointer",
                  }}
                />
                <span style={{ fontSize: "0.8125rem", color: C.muted }}>
                  Remember me
                </span>
              </label>
              <button
                type="button"
                onClick={() =>
                  alert(
                    "Please contact the ICT Administrator to reset your password.",
                  )
                }
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: C.secondary,
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.primary)}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = C.secondary)
                }
              >
                Forgot password?
              </button>
            </div>

            <PrimaryButton loading={loading} type="submit">
              {!loading && "Sign in"}
            </PrimaryButton>
          </form>

          <Divider label="New to CampusMind?" />

          <Link to="/signup" style={{ textDecoration: "none" }}>
            <GhostButton>
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              Create an account
            </GhostButton>
          </Link>

          <p
            style={{
              textAlign: "center",
              fontSize: "0.7rem",
              color: C.muted,
              marginTop: 24,
            }}
          >
            Protected by 256-bit encryption.{" "}
            <a href="#" style={{ color: C.secondary, textDecoration: "none" }}>
              Privacy Policy
            </a>
          </p>
        </div>
      </div>

      {/* ── Right: hero ── */}
      <HeroPanel />
    </div>
  );
}
