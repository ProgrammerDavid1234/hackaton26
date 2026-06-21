import { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Bell, Menu, Sparkles, Plus,
  X, MessageSquare, BookOpen, Megaphone,
} from 'lucide-react'
import UserDropdown from './UserDropdown'

const C = {
  primary:   '#093C5D',
  secondary: '#3B7597',
  accent:    '#6FD1D7',
  mint:      '#5DF8D8',
  ink:       '#082235',
  muted:     '#5E7585',
  bg:        '#F0F7FA',
  bgSoft:    '#E0EEF2',
  paper:     '#FFFFFF',
  border:    '#D0E1E8',
}

// Maps routes → page meta
const PAGE_META = {
  '/chat':          { title: 'CampusMind AI', subtitle: 'Ask anything about your university', isChat: true },
  '/announcements': { title: 'Announcements', subtitle: 'University updates & notices' },
  '/resources':     { title: 'Resources',     subtitle: 'Study materials & documents' },
  '/history':       { title: 'Chat History',  subtitle: 'Your past conversations' },
  '/profile':       { title: 'Profile',       subtitle: 'Your account & settings' },
  '/dashboard':     { title: 'Dashboard',     subtitle: 'Welcome back' },
  '/settings':      { title: 'Settings',      subtitle: 'Preferences & account' },
}

// Fake notifications
const NOTIFICATIONS = [
  { id: 1, icon: Megaphone, color: '#093C5D', title: 'Exam timetable released', body: '2nd semester exam schedule is now available', time: '5m ago', unread: true },
  { id: 2, icon: BookOpen,  color: '#3B7597', title: 'New resource uploaded',   body: 'CSC 423 — Lecture slides week 9', time: '1h ago', unread: true },
  { id: 3, icon: MessageSquare, color: '#6FD1D7', title: 'AI Chat tip',         body: 'Try asking about your course schedule', time: '2h ago', unread: false },
]

function NotificationPanel({ onClose }) {
  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.15 }}
      style={{
        position: 'absolute', top: 'calc(100% + 8px)', right: 0,
        width: 320, background: C.paper,
        border: `1px solid ${C.border}`, borderRadius: 14,
        boxShadow: '0 8px 30px rgba(9,60,93,0.12)',
        overflow: 'hidden', zIndex: 100,
      }}
    >
      {/* Header */}
      <div style={{
        padding: '14px 16px 12px',
        borderBottom: `1px solid ${C.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>Notifications</span>
          {unreadCount > 0 && (
            <span style={{
              fontSize: 10, fontWeight: 800, padding: '2px 7px',
              borderRadius: 999, background: C.accent, color: C.primary,
            }}>
              {unreadCount} new
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          style={{
            width: 26, height: 26, borderRadius: 6, border: 'none',
            background: C.bg, cursor: 'pointer', color: C.muted,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <X size={13} />
        </button>
      </div>

      {/* List */}
      <div style={{ maxHeight: 320, overflowY: 'auto' }}>
        {NOTIFICATIONS.map((n, i) => {
          const Icon = n.icon
          return (
            <motion.div
              key={n.id}
              whileHover={{ background: C.bg }}
              style={{
                padding: '12px 16px',
                borderBottom: i < NOTIFICATIONS.length - 1 ? `1px solid ${C.border}` : 'none',
                background: n.unread ? 'rgba(111,209,215,0.04)' : 'transparent',
                cursor: 'pointer', display: 'flex', gap: 12, alignItems: 'flex-start',
                transition: 'background 0.1s',
              }}
            >
              <div style={{
                width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                background: `${n.color}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={15} color={n.color} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.ink, lineHeight: 1.3 }}>
                    {n.title}
                  </span>
                  {n.unread && (
                    <div style={{
                      width: 7, height: 7, borderRadius: '50%',
                      background: C.accent, flexShrink: 0, marginTop: 4,
                    }}/>
                  )}
                </div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 2, lineHeight: 1.4 }}>
                  {n.body}
                </div>
                <div style={{ fontSize: 10.5, color: C.accent, marginTop: 4, fontWeight: 500 }}>
                  {n.time}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Footer */}
      <div style={{
        padding: '10px 16px', borderTop: `1px solid ${C.border}`,
        display: 'flex', justifyContent: 'center',
      }}>
        <button style={{
          fontSize: 12, fontWeight: 600, color: C.secondary,
          background: 'none', border: 'none', cursor: 'pointer',
        }}>
          View all notifications →
        </button>
      </div>
    </motion.div>
  )
}

export default function Navbar({ user, onMenuClick, sidebarWidth = 280 }) {
  const location                    = useLocation()
  const navigate                    = useNavigate()
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchVal, setSearchVal]   = useState('')
  const [notifOpen, setNotifOpen]   = useState(false)
  const notifRef                    = useRef(null)

  const meta       = PAGE_META[location.pathname] || { title: 'CampusMind AI', subtitle: '' }
  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length

  // Close notif panel on outside click
  useEffect(() => {
    const handler = (e) => { if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed', top: 0, right: 0, zIndex: 30,
        left: 0,
        height: 72,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${C.border}`,
        display: 'flex', alignItems: 'center',
        padding: '0 20px',
        gap: 16,
      }}
      // Offset for desktop sidebar
      className="md:pl-0"
    >
      {/* ── Mobile hamburger ── */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onMenuClick}
        className="md:hidden"
        style={{
          width: 38, height: 38, borderRadius: 10,
          border: `1px solid ${C.border}`, background: C.bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: C.primary, flexShrink: 0,
        }}
        aria-label="Open menu"
      >
        <Menu size={18} />
      </motion.button>

      {/* ── Page title (left, desktop — indented past sidebar) ── */}
      <div
        className="hidden md:block"
        style={{ flexShrink: 0, paddingLeft: sidebarWidth + 20 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <div style={{ fontSize: 16, fontWeight: 800, color: C.ink, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              {meta.title}
            </div>
            {meta.subtitle && (
              <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
                {meta.subtitle}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Search bar (center) ── */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <motion.div
          animate={{ width: searchFocused ? 480 : 380 }}
          transition={{ duration: 0.2 }}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '0 14px', height: 42, borderRadius: 12,
            background: searchFocused ? C.paper : C.bg,
            border: `1.5px solid ${searchFocused ? C.accent : C.border}`,
            boxShadow: searchFocused ? `0 0 0 3px rgba(111,209,215,0.18)` : 'none',
            transition: 'border-color 0.15s, box-shadow 0.15s, background 0.15s',
            maxWidth: '100%',
          }}
        >
          <Search size={15} color={searchFocused ? C.secondary : C.muted} style={{ flexShrink: 0, transition: 'color 0.15s' }} />
          <input
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Search resources, announcements…"
            style={{
              flex: 1, border: 'none', outline: 'none',
              background: 'transparent', fontSize: 13.5,
              color: C.ink, fontFamily: 'Inter, system-ui, sans-serif',
            }}
          />
          {searchVal && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setSearchVal('')}
              style={{
                width: 18, height: 18, borderRadius: '50%', border: 'none',
                background: C.border, cursor: 'pointer', color: C.muted,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}
            >
              <X size={10} />
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* ── Right section ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>

        {/* New Chat button (chat page only) */}
        {meta.isChat && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/chat')}
            className="hidden sm:flex"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 14px', borderRadius: 10, border: 'none',
              background: `linear-gradient(135deg, ${C.secondary}, ${C.accent})`,
              color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(59,117,151,0.30)',
              transition: 'box-shadow 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 14px rgba(59,117,151,0.40)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(59,117,151,0.30)'}
          >
            <Plus size={14} strokeWidth={2.5} />
            New Chat
          </motion.button>
        )}

        {/* Ask AI button (non-chat pages) */}
        {!meta.isChat && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/chat')}
            className="hidden sm:flex"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 14px', borderRadius: 10, border: 'none',
              background: `linear-gradient(135deg, ${C.secondary}, ${C.accent})`,
              color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(59,117,151,0.30)',
              transition: 'box-shadow 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 14px rgba(59,117,151,0.40)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(59,117,151,0.30)'}
          >
            <Sparkles size={13} />
            Ask AI
          </motion.button>
        )}

        {/* Notification bell */}
        <div ref={notifRef} style={{ position: 'relative' }}>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setNotifOpen(v => !v)}
            style={{
              width: 40, height: 40, borderRadius: 10, border: `1px solid ${C.border}`,
              background: notifOpen ? C.bgSoft : C.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', position: 'relative', transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = C.bgSoft}
            onMouseLeave={e => { if (!notifOpen) e.currentTarget.style.background = C.bg }}
            aria-label="Notifications"
          >
            <Bell size={17} color={notifOpen ? C.primary : C.muted} />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  position: 'absolute', top: 7, right: 7,
                  width: 8, height: 8, borderRadius: '50%',
                  background: C.accent, border: `2px solid ${C.paper}`,
                }}
              />
            )}
          </motion.button>

          <AnimatePresence>
            {notifOpen && <NotificationPanel onClose={() => setNotifOpen(false)} />}
          </AnimatePresence>
        </div>

        {/* User dropdown */}
        <UserDropdown user={user} />
      </div>
    </motion.header>
  )
}
