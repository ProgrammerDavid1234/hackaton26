import { useState } from 'react'

// ── Palette (single source of truth) ─────────────────────────────
const C = {
  bg:          '#F0F7FA',
  bgSoft:      '#E0EEF2',
  primary:     '#093C5D',
  secondary:   '#3B7597',
  accentSoft:  '#6FD1D7',
  accent:      '#5DF8D8',
  ink:         '#082235',
  muted:       '#5E7585',
  paper:       '#FFFFFF',
  border:      '#D0E1E8',
  borderFocus: '#6FD1D7',
  borderErr:   '#f87171',
  err:         '#dc2626',
  errBg:       '#fef2f2',
  errBorder:   '#fecaca',
  okBg:        '#f0fdf4',
  okBorder:    '#bbf7d0',
  ok:          '#16a34a',
}

// ── SVG Icons ─────────────────────────────────────────────────────
const EyeIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
  </svg>
)
const EyeOffIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
  </svg>
)
const AlertCircleIcon = ({ size = 16, color = C.err }) => (
  <svg width={size} height={size} fill={color} viewBox="0 0 20 20" style={{ flexShrink: 0 }}>
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
  </svg>
)
const CheckCircleIcon = ({ size = 16, color = C.ok }) => (
  <svg width={size} height={size} fill={color} viewBox="0 0 20 20" style={{ flexShrink: 0 }}>
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
  </svg>
)
const InfoIcon = ({ size = 16, color = C.secondary }) => (
  <svg width={size} height={size} fill={color} viewBox="0 0 20 20" style={{ flexShrink: 0 }}>
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
  </svg>
)

// ── Shared input style factory ────────────────────────────────────
function inputStyle(hasErr, extraLeft = false, extraRight = false) {
  return {
    display: 'block',
    width: '100%',
    padding: `11px ${extraRight ? 40 : 14}px 11px ${extraLeft ? 40 : 14}px`,
    fontSize: '0.875rem',
    fontWeight: 500,
    fontFamily: 'Inter, system-ui, sans-serif',
    color: C.ink,
    background: C.paper,
    border: `1.5px solid ${hasErr ? C.borderErr : C.border}`,
    borderRadius: 10,
    outline: 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s',
    boxSizing: 'border-box',
    boxShadow: hasErr ? `0 0 0 3px rgba(248,113,113,0.14)` : 'none',
  }
}

// ── Field (label + children + error/hint) ─────────────────────────
export function Field({ label, id, error, children, hint }) {
  return (
    <div style={{ marginBottom: 0 }}>
      {label && (
        <label htmlFor={id} style={{
          display: 'block', fontSize: '0.72rem', fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.1em',
          color: C.muted, marginBottom: 6,
        }}>
          {label}
        </label>
      )}
      {children}
      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 6 }}>
          <AlertCircleIcon size={13} color={C.err}/>
          <span style={{ fontSize: '0.75rem', fontWeight: 500, color: C.err }}>{error}</span>
        </div>
      )}
      {hint && !error && (
        <p style={{ fontSize: '0.72rem', color: C.muted, marginTop: 5 }}>{hint}</p>
      )}
    </div>
  )
}

// ── Input ─────────────────────────────────────────────────────────
export function Input({ error, icon, style: extraStyle, ...props }) {
  const [focused, setFocused] = useState(false)
  const base = inputStyle(!!error, !!icon, false)

  return (
    <div style={{ position: 'relative' }}>
      {icon && (
        <div style={{
          position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)',
          color: C.muted, pointerEvents: 'none', display: 'flex',
        }}>
          {icon}
        </div>
      )}
      <input
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...base,
          paddingLeft: icon ? 40 : 14,
          borderColor: error ? C.borderErr : focused ? C.borderFocus : C.border,
          boxShadow: error
            ? '0 0 0 3px rgba(248,113,113,0.14)'
            : focused
            ? `0 0 0 3px rgba(111,209,215,0.22)`
            : 'none',
          ...extraStyle,
        }}
        {...props}
      />
    </div>
  )
}

// ── Password Input ────────────────────────────────────────────────
export function PasswordInput({ error, style: extraStyle, ...props }) {
  const [show,    setShow]    = useState(false)
  const [focused, setFocused] = useState(false)

  return (
    <div style={{ position: 'relative' }}>
      <input
        type={show ? 'text' : 'password'}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...inputStyle(!!error, false, true),
          borderColor: error ? C.borderErr : focused ? C.borderFocus : C.border,
          boxShadow: error
            ? '0 0 0 3px rgba(248,113,113,0.14)'
            : focused
            ? '0 0 0 3px rgba(111,209,215,0.22)'
            : 'none',
          ...extraStyle,
        }}
        {...props}
      />
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setShow(v => !v)}
        aria-label={show ? 'Hide password' : 'Show password'}
        style={{
          position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: 'none', cursor: 'pointer', padding: 2,
          color: C.muted, display: 'flex', alignItems: 'center',
          transition: 'color 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = C.secondary}
        onMouseLeave={e => e.currentTarget.style.color = C.muted}
      >
        {show ? <EyeOffIcon/> : <EyeIcon/>}
      </button>
    </div>
  )
}

// ── Select ────────────────────────────────────────────────────────
export function Select({ error, children, style: extraStyle, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <select
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputStyle(!!error),
        appearance: 'none',
        cursor: 'pointer',
        paddingRight: 40,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%233B7597' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 14px center',
        borderColor: error ? C.borderErr : focused ? C.borderFocus : C.border,
        boxShadow: error
          ? '0 0 0 3px rgba(248,113,113,0.14)'
          : focused
          ? '0 0 0 3px rgba(111,209,215,0.22)'
          : 'none',
        ...extraStyle,
      }}
      {...props}
    >
      {children}
    </select>
  )
}

// ── Primary Button ────────────────────────────────────────────────
export function PrimaryButton({ children, loading, disabled, style: extraStyle, ...props }) {
  const [hovered, setHovered] = useState(false)
  const isDisabled = disabled || loading

  return (
    <button
      disabled={isDisabled}
      onMouseEnter={() => !isDisabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        width: '100%', padding: '12px 20px',
        fontSize: '0.875rem', fontWeight: 600, fontFamily: 'Inter, system-ui, sans-serif',
        color: '#fff',
        background: hovered && !isDisabled ? C.secondary : C.primary,
        border: 'none', borderRadius: 10, cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.6 : 1,
        transition: 'background 0.15s, transform 0.1s, box-shadow 0.15s',
        boxShadow: hovered && !isDisabled
          ? `0 4px 14px rgba(9,60,93,0.30)`
          : `0 1px 3px rgba(9,60,93,0.15)`,
        transform: 'scale(1)',
        ...extraStyle,
      }}
      onMouseDown={e => { if (!isDisabled) e.currentTarget.style.transform = 'scale(0.985)' }}
      onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)' }}
      {...props}
    >
      {loading && <Spinner size={15}/>}
      {children}
    </button>
  )
}

// ── Ghost / Outline Button ────────────────────────────────────────
export function GhostButton({ children, disabled, style: extraStyle, ...props }) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      disabled={disabled}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        width: '100%', padding: '12px 20px',
        fontSize: '0.875rem', fontWeight: 600, fontFamily: 'Inter, system-ui, sans-serif',
        color: hovered ? C.primary : C.secondary,
        background: hovered ? C.bgSoft : 'transparent',
        border: `1.5px solid ${hovered ? C.secondary : C.border}`,
        borderRadius: 10, cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.55 : 1,
        transition: 'all 0.15s',
        ...extraStyle,
      }}
      onMouseDown={e => { if (!disabled) e.currentTarget.style.transform = 'scale(0.985)' }}
      onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)' }}
      {...props}
    >
      {children}
    </button>
  )
}

// ── Alert Banner ──────────────────────────────────────────────────
export function Alert({ type = 'error', children }) {
  const config = {
    error: {
      bg:     C.errBg,
      border: C.errBorder,
      color:  C.err,
      icon:   <AlertCircleIcon size={16} color={C.err}/>,
    },
    success: {
      bg:     C.okBg,
      border: C.okBorder,
      color:  C.ok,
      icon:   <CheckCircleIcon size={16} color={C.ok}/>,
    },
    info: {
      bg:     C.bgSoft,
      border: C.border,
      color:  C.primary,
      icon:   <InfoIcon size={16} color={C.secondary}/>,
    },
  }
  const { bg, border, color, icon } = config[type] || config.error

  return (
    <div
      role="alert"
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 10,
        padding: '12px 14px',
        background: bg, border: `1.5px solid ${border}`, borderRadius: 10,
        fontSize: '0.8125rem', fontWeight: 500, color,
        lineHeight: 1.5,
        animation: 'fadeIn 0.25s ease-out both',
      }}
    >
      <div style={{ marginTop: 1 }}>{icon}</div>
      <span>{children}</span>
    </div>
  )
}

// ── Inline field-level error (used inside Field) ──────────────────
export function FieldError({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 6 }}>
      <AlertCircleIcon size={13} color={C.err}/>
      <span style={{ fontSize: '0.75rem', fontWeight: 500, color: C.err }}>{children}</span>
    </div>
  )
}

// ── Spinner ───────────────────────────────────────────────────────
export function Spinner({ size = 18 }) {
  return (
    <svg
      style={{ width: size, height: size, animation: 'spin 0.75s linear infinite', flexShrink: 0 }}
      viewBox="0 0 24 24" fill="none"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3.5" style={{ opacity: 0.2 }}/>
      <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
    </svg>
  )
}

// ── Password Strength Meter ───────────────────────────────────────
export function StrengthMeter({ password }) {
  if (!password) return null
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  const levels = [
    { label: 'Too short', color: '#ef4444', pct: 12 },
    { label: 'Weak',      color: '#f97316', pct: 32 },
    { label: 'Fair',      color: '#eab308', pct: 56 },
    { label: 'Good',      color: C.accentSoft, pct: 78 },
    { label: 'Strong',    color: C.accent,    pct: 100 },
  ]
  const lvl = levels[Math.min(score, 4)]

  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ height: 4, background: C.bgSoft, borderRadius: 9999, overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 9999, background: lvl.color,
          width: `${lvl.pct}%`, transition: 'width 0.4s ease, background 0.4s ease',
        }}/>
      </div>
      <p style={{ fontSize: '0.7rem', fontWeight: 700, color: lvl.color, marginTop: 4 }}>{lvl.label}</p>
    </div>
  )
}

// ── Divider ───────────────────────────────────────────────────────
export function Divider({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
      <div style={{ flex: 1, height: 1, background: C.border }}/>
      {label && (
        <span style={{
          fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.12em', color: C.muted, whiteSpace: 'nowrap',
        }}>
          {label}
        </span>
      )}
      <div style={{ flex: 1, height: 1, background: C.border }}/>
    </div>
  )
}
