import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, LayoutGrid, MessageSquare, Calendar, BookOpen,
  FolderOpen, TrendingUp, Settings, Bell, Clock, MapPin,
  Plus, Send, Paperclip, Mic, MoreHorizontal, Share2,
  Search, CalendarPlus, Mail, Phone, Users, CheckCircle2,
  Bookmark, GraduationCap, AlertCircle, Lightbulb, Brain,
  FileText, History, ChevronRight, Zap,
} from 'lucide-react'
import { sendToGroq } from '../lib/ai'

const C = {
  bg: '#F0F7FA', bgSoft: '#E0EEF2',
  primary: '#093C5D', secondary: '#3B7597',
  accentSoft: '#6FD1D7', accent: '#5DF8D8',
  ink: '#082235', muted: '#5E7585',
  paper: '#FFFFFF', border: '#D0E1E8',
  success: '#22C55E', warn: '#F59E0B', danger: '#EF4444',
}

const STUDENT = { firstName: 'Emmanuel', initials: 'EA', level: '400L · CSC' }

const CHAT_HISTORY = [
  {
    section: 'Today',
    items: [
      { id: 'c1', title: "Tomorrow's schedule and quiz prep", time: 'Just now', active: true },
      { id: 'c2', title: 'Library hours during finals week', time: '2h ago' },
    ],
  },
  {
    section: 'Yesterday',
    items: [
      { id: 'c3', title: 'Career fair company list', time: 'Yesterday' },
      { id: 'c4', title: 'Lab 4 booking process', time: 'Yesterday' },
    ],
  },
  {
    section: 'Last week',
    items: [
      { id: 'c5', title: 'How to drop a course safely', time: '5d ago' },
      { id: 'c6', title: 'Scholarship application essay help', time: '6d ago' },
    ],
  },
]

const SUGGESTED_PROMPTS = [
  { icon: Calendar,      text: "What's my schedule tomorrow?" },
  { icon: Brain,         text: 'Generate quiz questions for CSC 423' },
  { icon: GraduationCap, text: 'When is the next NACOS meeting?' },
  { icon: FileText,      text: 'Help me draft an email to my lecturer' },
  { icon: AlertCircle,   text: 'Show my upcoming deadlines' },
  { icon: BookOpen,      text: 'Summarise my AI Fundamentals notes' },
]


// ── Markdown-lite renderer ─────────────────────────────────────────
function RenderText({ text }) {
  // Convert **bold**, bullet points, and newlines
  const lines = text.split('\n')
  return (
    <div style={{ lineHeight: 1.6 }}>
      {lines.map((line, i) => {
        if (!line.trim()) return <br key={i}/>
        // Bullet
        const isBullet = /^[•\-*]\s/.test(line.trim())
        const clean = line.replace(/^[•\-*]\s/, '')
        // Bold **text**
        const parts = clean.split(/(\*\*[^*]+\*\*)/)
        const rendered = parts.map((part, j) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={j} style={{ color: C.ink, fontWeight: 700 }}>{part.slice(2, -2)}</strong>
            : part
        )
        if (isBullet) return (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 3 }}>
            <span style={{ color: C.accentSoft, fontWeight: 700, marginTop: 1, flexShrink: 0 }}>•</span>
            <span>{rendered}</span>
          </div>
        )
        return <div key={i} style={{ marginBottom: i < lines.length - 1 ? 4 : 0 }}>{rendered}</div>
      })}
    </div>
  )
}

// ── Main Chat component ────────────────────────────────────────────
export default function Chat() {
  const [messages,     setMessages]     = useState([])
  const [input,        setInput]        = useState('')
  const [isTyping,     setIsTyping]     = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const [showWelcome,  setShowWelcome]  = useState(true)
  const [error,        setError]        = useState(null)
  const scrollRef = useRef(null)
  // Conversation history for context (what we send to AI)
  const historyRef = useRef([])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isTyping, streamingText])

  const send = async (text) => {
    const trimmed = (text || input).trim()
    if (!trimmed || isTyping) return

    setError(null)
    setShowWelcome(false)
    setInput('')

    // Add user message to UI
    const userMsg = {
      id:   Date.now(),
      role: 'user',
      text: trimmed,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    }
    setMessages(m => [...m, userMsg])

    // Add to conversation history for AI context
    historyRef.current = [
      ...historyRef.current,
      { role: 'user', content: trimmed },
    ]

    setIsTyping(true)
    setStreamingText('')

    try {
      let fullText = ''

      // Stream response chunk by chunk
      await sendToGroq(historyRef.current, (chunk) => {
        fullText += chunk
        setStreamingText(fullText)
      })

      // Add completed AI message to history
      historyRef.current = [
        ...historyRef.current,
        { role: 'assistant', content: fullText },
      ]

      // Move from streaming state to messages list
      setMessages(m => [...m, {
        id:   Date.now() + 1,
        role: 'ai',
        text: fullText,
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      }])
      setStreamingText('')
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setMessages(m => m.filter(msg => msg.id !== userMsg.id))
    } finally {
      setIsTyping(false)
    }
  }

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <div style={{
      backgroundColor: C.bg, color: C.ink,
      fontFamily: 'Inter, system-ui, sans-serif',
      height: '100vh', display: 'flex', overflow: 'hidden',
    }}>
      <ChatHistorySidebar />

      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', backgroundColor: C.bg }}>

        {/* Message area */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '24px 16px' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>

            {/* Welcome / empty state */}
            {showWelcome && messages.length === 0 && (
              <WelcomeScreen onPrompt={send} />
            )}

            {/* Messages */}
            <AnimatePresence initial={false}>
              {messages.map(m =>
                m.role === 'user'
                  ? <UserBubble key={m.id} text={m.text} time={m.time} />
                  : <AiBubble   key={m.id} text={m.text} time={m.time} onAction={send} />
              )}

              {/* Streaming AI response */}
              {isTyping && streamingText && (
                <AiBubble key="streaming" text={streamingText} time="" streaming />
              )}

              {/* Typing dots (before first chunk) */}
              {isTyping && !streamingText && <TypingDots key="dots" />}
            </AnimatePresence>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                style={{
                  margin: '12px 0', padding: '10px 14px', borderRadius: 10,
                  background: '#fef2f2', border: '1px solid #fecaca',
                  color: '#dc2626', fontSize: 13, fontWeight: 500,
                  display: 'flex', alignItems: 'center', gap: 8,
                }}
              >
                <AlertCircle size={14}/> {error}
              </motion.div>
            )}
          </div>
        </div>

        {/* Input */}
        <InputArea
          value={input} onChange={setInput}
          onSend={send} onKey={onKey}
          disabled={isTyping}
          showSuggestions={messages.length > 0 && !isTyping}
        />
      </main>
    </div>
  )
}

// ── Welcome / empty state ──────────────────────────────────────────
function WelcomeScreen({ onPrompt }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ paddingBottom: 32 }}
    >
      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '40px 16px 32px' }}>
        <div style={{
          width: 56, height: 56, borderRadius: 16, background: C.primary,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
          boxShadow: `0 8px 24px rgba(9,60,93,0.20)`,
        }}>
          <Sparkles size={26} color={C.accent} />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: C.ink, letterSpacing: '-0.03em', margin: '0 0 8px' }}>
          How can I help, {STUDENT.firstName}?
        </h2>
        <p style={{ color: C.muted, fontSize: '0.9rem', margin: 0 }}>
          Ask me anything about your courses, schedule, campus, or deadlines.
        </p>
      </div>

      {/* Prompt suggestions grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 10, marginBottom: 16,
      }}>
        {SUGGESTED_PROMPTS.map(({ icon: Icon, text }, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => onPrompt(text)}
            style={{
              background: C.paper, border: `1px solid ${C.border}`,
              borderRadius: 12, padding: '12px 14px', cursor: 'pointer',
              textAlign: 'left', transition: 'all 0.15s',
              display: 'flex', alignItems: 'flex-start', gap: 10,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.accentSoft; e.currentTarget.style.background = C.bg }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border;     e.currentTarget.style.background = C.paper }}
          >
            <div style={{
              width: 30, height: 30, borderRadius: 8, background: C.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Icon size={14} color={C.primary} />
            </div>
            <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: C.ink, lineHeight: 1.45 }}>
              {text}
            </span>
          </motion.button>
        ))}
      </div>

      {/* API status badge */}
      <ApiStatusBadge />
    </motion.div>
  )
}

function ApiStatusBadge() {
  const hasKey = !!import.meta.env.VITE_GROQ_API_KEY
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '6px 12px', borderRadius: 999,
      background: hasKey ? '#f0fdf4' : C.bgSoft,
      border: `1px solid ${hasKey ? '#bbf7d0' : C.border}`,
      fontSize: 11, fontWeight: 600,
      color: hasKey ? '#16a34a' : C.muted,
      margin: '0 auto', display: 'flex', width: 'fit-content',
    }}>
      <Zap size={11} />
      {hasKey ? 'Live AI · Groq Llama 3.1' : 'Demo mode · Add VITE_GROQ_API_KEY for live AI'}
    </div>
  )
}

// ── User bubble ────────────────────────────────────────────────────
function UserBubble({ text, time }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}
    >
      <div style={{ maxWidth: '78%' }}>
        <div style={{
          background: C.primary, color: '#fff',
          borderRadius: '18px 18px 4px 18px',
          padding: '10px 16px', fontSize: 14, lineHeight: 1.55,
        }}>
          {text}
        </div>
        {time && (
          <div style={{ textAlign: 'right', fontSize: 10, color: C.muted, marginTop: 4 }}>{time}</div>
        )}
      </div>
    </motion.div>
  )
}

// ── AI bubble ──────────────────────────────────────────────────────
function AiBubble({ text, time, streaming, onAction }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 16 }}
    >
      {/* Avatar */}
      <div style={{
        width: 30, height: 30, borderRadius: '50%', background: C.primary,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2,
      }}>
        <Sparkles size={13} color={C.accent} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          background: C.paper, border: `1px solid ${C.border}`,
          borderRadius: '18px 18px 18px 4px',
          padding: '12px 16px', fontSize: 14, color: C.ink,
          maxWidth: '90%', display: 'inline-block',
          position: 'relative',
        }}>
          <RenderText text={text} />
          {/* Blinking cursor while streaming */}
          {streaming && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{
                display: 'inline-block', width: 2, height: 14,
                background: C.primary, borderRadius: 1,
                marginLeft: 2, verticalAlign: 'middle',
              }}
            />
          )}
        </div>

        {time && !streaming && (
          <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>{time}</div>
        )}
      </div>
    </motion.div>
  )
}

// ── Typing dots ────────────────────────────────────────────────────
function TypingDots() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 16 }}
    >
      <div style={{
        width: 30, height: 30, borderRadius: '50%', background: C.primary,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <Sparkles size={13} color={C.accent} />
      </div>
      <div style={{
        background: C.paper, border: `1px solid ${C.border}`,
        borderRadius: '18px 18px 18px 4px', padding: '14px 16px',
        display: 'inline-flex', gap: 5,
      }}>
        {[0, 1, 2].map(i => (
          <motion.span key={i}
            animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
            style={{ width: 6, height: 6, borderRadius: '50%', background: C.muted, display: 'block' }}
          />
        ))}
      </div>
    </motion.div>
  )
}

// ── Input area ─────────────────────────────────────────────────────
const QUICK_SUGGESTIONS = [
  'What are my deadlines?',
  "What's happening this weekend?",
  'Help me study for CSC 423',
  'Draft an email to my lecturer',
]

function InputArea({ value, onChange, onSend, onKey, disabled, showSuggestions }) {
  const hasText = value.trim().length > 0

  return (
    <div style={{ padding: '12px 16px 20px', background: C.bg }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>

        {/* Follow-up suggestions */}
        {showSuggestions && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
            {QUICK_SUGGESTIONS.map((s, i) => (
              <motion.button key={i}
                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => onSend(s)}
                style={{
                  fontSize: 12, padding: '5px 12px', borderRadius: 999,
                  background: C.paper, border: `1px solid ${C.border}`,
                  color: C.ink, cursor: 'pointer', fontWeight: 500, transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.primary; e.currentTarget.style.color = C.primary }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border;  e.currentTarget.style.color = C.ink }}
              >
                {s}
              </motion.button>
            ))}
          </div>
        )}

        {/* Text box */}
        <div style={{
          background: C.paper, borderRadius: 16,
          border: `1.5px solid ${hasText ? C.primary : C.border}`,
          boxShadow: hasText ? '0 0 0 3px rgba(9,60,93,0.07)' : 'none',
          transition: 'border-color 0.15s, box-shadow 0.15s',
          overflow: 'hidden',
        }}>
          <textarea
            value={value}
            onChange={e => onChange(e.target.value)}
            onKeyDown={onKey}
            disabled={disabled}
            placeholder="Ask anything about your courses, schedule, or campus…"
            rows={2}
            style={{
              width: '100%', padding: '14px 16px', background: 'transparent',
              fontSize: 14, outline: 'none', resize: 'none',
              color: C.ink, fontFamily: 'Inter, system-ui, sans-serif',
              lineHeight: 1.5, boxSizing: 'border-box',
              opacity: disabled ? 0.6 : 1,
            }}
          />

          {/* Toolbar */}
          <div style={{
            padding: '8px 12px', borderTop: `1px solid ${C.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {[{ icon: Paperclip, label: 'Attach' }, { icon: Mic, label: 'Voice' }].map(({ icon: Icon, label }) => (
                <button key={label} aria-label={label} style={{
                  width: 30, height: 30, borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: 'transparent', color: C.muted, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = C.bg}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <Icon size={14} />
                </button>
              ))}
              <span style={{ fontSize: 10, color: C.muted, marginLeft: 4 }}>
                Shift+Enter for new line
              </span>
            </div>

            <motion.button
              onClick={() => onSend()}
              disabled={!hasText || disabled}
              whileTap={hasText ? { scale: 0.93 } : {}}
              style={{
                width: 34, height: 34, borderRadius: 10, border: 'none', cursor: hasText && !disabled ? 'pointer' : 'not-allowed',
                background: hasText && !disabled ? C.primary : C.border,
                color: hasText && !disabled ? '#fff' : C.muted,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s',
              }}
              aria-label="Send"
            >
              <Send size={14} />
            </motion.button>
          </div>
        </div>

        <div style={{ textAlign: 'center', fontSize: 10, color: C.muted, marginTop: 8 }}>
          CampusMind AI can make mistakes. Verify time-sensitive information with your department.
        </div>
      </div>
    </div>
  )
}


// ── Chat history sidebar ───────────────────────────────────────────
function ChatHistorySidebar() {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.05 }}
      style={{
        width: 272, background: C.paper, borderRight: `1px solid ${C.border}`,
        flexShrink: 0, display: 'flex', flexDirection: 'column',
      }}
      className="hidden lg:flex"
    >
      {/* New chat + search */}
      <div style={{ padding: '16px 14px 12px' }}>
        <button style={{
          width: '100%', padding: '9px 14px', borderRadius: 10,
          background: C.primary, color: '#fff', border: 'none', cursor: 'pointer',
          fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: 6, transition: 'background 0.15s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = C.secondary}
          onMouseLeave={e => e.currentTarget.style.background = C.primary}
        >
          <Plus size={14} /> New chat
        </button>

        <div style={{
          marginTop: 10, display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 12px', borderRadius: 8,
          background: C.bg, border: `1px solid ${C.border}`,
        }}>
          <Search size={13} color={C.muted} />
          <input placeholder="Search chats" style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            fontSize: 13, color: C.ink, fontFamily: 'Inter, sans-serif',
          }}/>
        </div>
      </div>

      {/* History */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 10px 16px' }}>
        {CHAT_HISTORY.map(({ section, items }) => (
          <div key={section} style={{ marginBottom: 16 }}>
            <div style={{
              fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.12em', color: C.muted, padding: '4px 8px 6px',
            }}>
              {section}
            </div>
            {items.map(item => (
              <button key={item.id} style={{
                width: '100%', textAlign: 'left', padding: '8px 10px', borderRadius: 8,
                background: item.active ? C.bg : 'transparent', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'flex-start', gap: 8, position: 'relative',
                transition: 'background 0.15s',
              }}
                onMouseEnter={e => { if (!item.active) e.currentTarget.style.background = C.bg }}
                onMouseLeave={e => { if (!item.active) e.currentTarget.style.background = 'transparent' }}
              >
                {item.active && (
                  <div style={{
                    position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
                    width: 2, height: 18, borderRadius: '0 3px 3px 0', background: C.primary,
                  }}/>
                )}
                <MessageSquare size={13} color={item.active ? C.primary : C.muted} style={{ marginTop: 2, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 13, fontWeight: item.active ? 600 : 500,
                    color: item.active ? C.ink : C.muted,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    lineHeight: 1.35,
                  }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{item.time}</div>
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Pro tip */}
      <div style={{
        margin: '0 10px 12px', padding: '10px 12px', borderRadius: 10,
        background: C.bg, border: `1px solid ${C.border}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <Lightbulb size={12} color={C.primary} />
          <span style={{ fontSize: 12, fontWeight: 600, color: C.ink }}>Pro tip</span>
        </div>
        <p style={{ fontSize: 11, color: C.muted, lineHeight: 1.5, margin: 0 }}>
          Press <kbd style={{
            padding: '1px 5px', borderRadius: 4, fontSize: 10,
            background: C.paper, border: `1px solid ${C.border}`,
          }}>⌘K</kbd> to search past chats from anywhere.
        </p>
      </div>
    </motion.aside>
  )
}

function PulseDot() {
  return (
    <span style={{ position: 'relative', display: 'inline-flex', width: 7, height: 7 }}>
      <motion.span
        animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: C.accent }}
      />
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: C.accent, display: 'block' }} />
    </span>
  )
}
