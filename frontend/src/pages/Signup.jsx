import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase, matricToEmail } from "../lib/supabase";
import Logo from "../components/Logo";
import {
  Field,
  Input,
  PasswordInput,
  Select,
  Alert,
  Spinner,
  StrengthMeter,
  PrimaryButton,
  GhostButton,
} from "../components/UI";

const C = {
  bg: "#F0F7FA",
  bgSoft: "#E0EEF2",
  ink: "#082235",
  muted: "#5E7585",
  primary: "#093C5D",
  secondary: "#3B7597",
  accentSoft: "#6FD1D7",
  accent: "#5DF8D8",
  paper: "#FFFFFF",
  border: "#D0E1E8",
};

const DEPARTMENTS = [
  "Computer Science",
  "Computer Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Architecture",
  "Medicine & Surgery",
  "Pharmacy",
  "Nursing",
  "Biochemistry",
  "Mass Communication",
  "Business Administration",
  "Accounting",
  "Law",
  "Education",
  "Agriculture",
  "Other",
];
const LEVELS = [
  "100 Level",
  "200 Level",
  "300 Level",
  "400 Level",
  "500 Level",
];
const MATRIC_REGEX = /^[A-Z]{3}\/[A-Z]{2,5}\/\d{4,6}$/i;

// ── Step bar ──────────────────────────────────────────────────────
function StepBar({ current, steps }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        marginBottom: 24,
      }}
    >
      {steps.map((label, i) => {
        const n = i + 1;
        const active = current === n;
        const done = current > n;

        return (
          <div
            key={label}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 12px",
                borderRadius: 999,
                fontSize: "0.72rem",
                fontWeight: 700,
                background: active
                  ? C.primary
                  : done
                    ? C.bgSoft
                    : "transparent",
                color: active ? C.paper : done ? C.secondary : C.muted,
                border: active || done ? "none" : `1.5px solid ${C.border}`,
                transition: "all 0.2s",
              }}
            >
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  fontSize: "0.65rem",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  background: active
                    ? "rgba(255,255,255,0.18)"
                    : done
                      ? C.accentSoft
                      : C.border,
                  color: active ? C.paper : done ? C.primary : C.muted,
                }}
              >
                {done ? "✓" : n}
              </span>
              {label}
            </div>

            {i < steps.length - 1 && (
              <div
                style={{
                  width: 24,
                  height: 1.5,
                  borderRadius: 9999,
                  background: done ? C.accentSoft : C.border,
                  transition: "background 0.3s",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Section heading ───────────────────────────────────────────────
function SectionTitle({ children }) {
  return (
    <p
      style={{
        fontSize: "0.68rem",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        color: C.muted,
        marginBottom: 16,
      }}
    >
      {children}
    </p>
  );
}

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    matric: "",
    department: "",
    level: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const set = (k) => (e) =>
    setForm((f) => ({
      ...f,
      [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const nextStep = () => {
    const e = {};
    if (step === 1) {
      if (!form.fullName.trim()) e.fullName = "Full name is required";
      else if (form.fullName.trim().split(" ").filter(Boolean).length < 2)
        e.fullName = "Enter first and last name";
      const m = form.matric.trim().toUpperCase();
      if (!m) e.matric = "Matric number is required";
      else if (!MATRIC_REGEX.test(m)) e.matric = "Format: KDU/CSC/24043";
    }
    if (step === 2) {
      if (!form.department) e.department = "Select your department";
      if (!form.level) e.level = "Select your level";
    }
    setErrors(e);
    if (!Object.keys(e).length) setStep((s) => s + 1);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = {};
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "Minimum 8 characters";
    if (!form.confirmPassword)
      e.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match";
    if (!form.terms) e.terms = "You must accept the Terms and Conditions";
    setErrors(e);
    if (Object.keys(e).length) return;

    setLoading(true);
    setStatus(null);

    const matricUpper = form.matric.trim().toUpperCase();
    const hiddenEmail = matricToEmail(matricUpper);

    const { data, error: signUpErr } = await supabase.auth.signUp({
      email: hiddenEmail,
      password: form.password,
    });

    if (signUpErr) {
      setLoading(false);
      if (signUpErr.message.toLowerCase().includes("already registered")) {
        setErrors({ matric: "This matric number is already registered." });
        setStep(1);
      } else {
        setStatus({ type: "error", message: signUpErr.message });
      }
      return;
    }

    const { error: profileErr } = await supabase.from("profiles").insert({
      id: data.user.id,
      matric_number: matricUpper,
      full_name: form.fullName.trim(),
      email: hiddenEmail,
      role: "student",
      department: form.department,
      level: form.level,
    });

    setLoading(false);

    if (profileErr) {
      setStatus({
        type: "error",
        message: "Account created but profile setup failed. Contact support.",
      });
      return;
    }

    setStatus({
      type: "success",
      message: "Account created successfully. Redirecting to login…",
    });
    setTimeout(() => navigate("/login"), 3000);
  };

  const STEPS = ["Personal", "Academic", "Security"];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.bg,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Nav ── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${C.border}`,
          padding: "14px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 560,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Logo size="sm" />
          <span style={{ fontSize: "0.8125rem", color: C.muted }}>
            Have an account?{" "}
            <Link
              to="/login"
              style={{
                fontWeight: 700,
                color: C.primary,
                textDecoration: "none",
              }}
            >
              Sign in
            </Link>
          </span>
        </div>
      </nav>

      {/* ── Body ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 16px",
        }}
      >
        <div
          style={{ width: "100%", maxWidth: 520 }}
          className="animate-fade-up"
        >
          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <h1
              style={{
                color: C.ink,
                fontWeight: 800,
                fontSize: "1.65rem",
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
                margin: "0 0 6px",
              }}
            >
              Join CampusMind AI
            </h1>
            <p style={{ color: C.muted, fontSize: "0.875rem", margin: 0 }}>
              Your matric number is your identity — no email needed
            </p>
          </div>

          {/* Step bar */}
          <StepBar current={step} steps={STEPS} />

          {/* Alert */}
          {status && (
            <div style={{ marginBottom: 16 }}>
              <Alert type={status.type}>{status.message}</Alert>
            </div>
          )}

          {/* Card */}
          <div
            style={{
              background: C.paper,
              border: `1.5px solid ${C.border}`,
              borderRadius: 16,
              boxShadow:
                "0 1px 3px rgba(9,60,93,0.06), 0 8px 24px rgba(9,60,93,0.07)",
              padding: 28,
            }}
          >
            <form onSubmit={handleSubmit} noValidate>
              {/* Step 1 — Personal */}
              {step === 1 && (
                <div
                  className="animate-fade-up"
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  <SectionTitle>Personal Information</SectionTitle>

                  <Field
                    label="Full Name"
                    id="fullName"
                    error={errors.fullName}
                  >
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Ada Okonkwo"
                      value={form.fullName}
                      onChange={set("fullName")}
                      error={errors.fullName}
                      autoComplete="name"
                      icon={
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
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      }
                    />
                  </Field>

                  <Field
                    label="Matric Number"
                    id="matric"
                    error={errors.matric}
                    hint="Example: KDU/CSC/24043"
                  >
                    <Input
                      id="matric"
                      type="text"
                      placeholder="KDU/CSC/24043"
                      value={form.matric}
                      onChange={set("matric")}
                      error={errors.matric}
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
                          <path
                            d="M16 3v4M8 3v4M2 9h20"
                            strokeLinecap="round"
                          />
                        </svg>
                      }
                    />
                  </Field>

                  {form.matric && MATRIC_REGEX.test(form.matric.trim()) && (
                    <div
                      className="animate-fade-in"
                      style={{
                        padding: "10px 14px",
                        borderRadius: 8,
                        background: C.bgSoft,
                        border: `1px solid ${C.border}`,
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: C.muted,
                          margin: "0 0 3px",
                        }}
                      >
                        Your login ID
                      </p>
                      <p
                        style={{
                          fontWeight: 700,
                          fontSize: "0.875rem",
                          color: C.primary,
                          margin: 0,
                        }}
                      >
                        {form.matric.trim().toUpperCase()}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2 — Academic */}
              {step === 2 && (
                <div
                  className="animate-fade-up"
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  <SectionTitle>Academic Profile</SectionTitle>

                  <Field
                    label="Department"
                    id="department"
                    error={errors.department}
                  >
                    <Select
                      id="department"
                      value={form.department}
                      onChange={set("department")}
                      error={errors.department}
                    >
                      <option value="">Select your department</option>
                      {DEPARTMENTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </Select>
                  </Field>

                  <Field label="Level / Year" id="level" error={errors.level}>
                    <Select
                      id="level"
                      value={form.level}
                      onChange={set("level")}
                      error={errors.level}
                    >
                      <option value="">Select your level</option>
                      {LEVELS.map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </Select>
                  </Field>

                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      padding: "12px 14px",
                      borderRadius: 8,
                      background: C.bgSoft,
                      border: `1px solid ${C.border}`,
                    }}
                  >
                    <svg
                      width="15"
                      height="15"
                      fill={C.secondary}
                      viewBox="0 0 20 20"
                      style={{ flexShrink: 0, marginTop: 1 }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        color: C.secondary,
                        lineHeight: 1.55,
                        margin: 0,
                      }}
                    >
                      Your role is set to{" "}
                      <strong style={{ color: C.primary }}>Student</strong> by
                      default. Contact your administrator to change it.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3 — Security */}
              {step === 3 && (
                <div
                  className="animate-fade-up"
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  <SectionTitle>Set Your Password</SectionTitle>

                  <Field label="Password" id="password" error={errors.password}>
                    <PasswordInput
                      id="password"
                      placeholder="Min. 8 characters"
                      value={form.password}
                      onChange={set("password")}
                      error={errors.password}
                      autoComplete="new-password"
                    />
                    {!errors.password && (
                      <StrengthMeter password={form.password} />
                    )}
                  </Field>

                  <Field
                    label="Confirm Password"
                    id="confirmPassword"
                    error={errors.confirmPassword}
                  >
                    <PasswordInput
                      id="confirmPassword"
                      placeholder="Repeat your password"
                      value={form.confirmPassword}
                      onChange={set("confirmPassword")}
                      error={errors.confirmPassword}
                      autoComplete="new-password"
                    />
                  </Field>

                  {/* Terms checkbox */}
                  <div>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={form.terms}
                        onChange={set("terms")}
                        style={{
                          width: 15,
                          height: 15,
                          marginTop: 3,
                          accentColor: C.primary,
                          cursor: "pointer",
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontSize: "0.8125rem",
                          lineHeight: 1.6,
                          color: errors.terms ? "#dc2626" : C.muted,
                        }}
                      >
                        I agree to the{" "}
                        <a
                          href="#"
                          style={{
                            fontWeight: 600,
                            color: C.primary,
                            textDecoration: "none",
                          }}
                        >
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                          href="#"
                          style={{
                            fontWeight: 600,
                            color: C.primary,
                            textDecoration: "none",
                          }}
                        >
                          Privacy Policy
                        </a>
                        . My data is secured and never shared without consent.
                      </span>
                    </label>
                    {errors.terms && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          marginTop: 6,
                          marginLeft: 25,
                        }}
                      >
                        <svg
                          width="13"
                          height="13"
                          fill="#dc2626"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            color: "#dc2626",
                          }}
                        >
                          {errors.terms}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                {step > 1 && (
                  <GhostButton
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    style={{ flex: 1 }}
                  >
                    ← Back
                  </GhostButton>
                )}
                {step < 3 ? (
                  <PrimaryButton
                    type="button"
                    onClick={nextStep}
                    style={{ flex: 1 }}
                  >
                    Continue →
                  </PrimaryButton>
                ) : (
                  <PrimaryButton
                    type="submit"
                    loading={loading}
                    style={{ flex: 1 }}
                  >
                    {!loading && "Create account"}
                  </PrimaryButton>
                )}
              </div>
            </form>
          </div>

          <p
            style={{
              textAlign: "center",
              fontSize: "0.78rem",
              color: C.muted,
              marginTop: 20,
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                fontWeight: 700,
                color: C.primary,
                textDecoration: "none",
              }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
