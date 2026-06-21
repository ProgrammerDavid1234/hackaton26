import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageSquare, Bell, BookOpen, History,
  User, LogOut, Sparkles, GraduationCap,
  ChevronLeft, ChevronRight,
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import NavItem from './NavItem'

const C = {
  primary:     '#093C5D',
  primaryDark: '#051e30',
  secondary:   '#3B7597',
  accent:      '#6FD1D7',
  mint:        '#5DF8D8',
  muted:       'rgba(255,255,255,0.45)',
  border:      'rgba(255,255,255,0.08)',
  paper:       '#FFFFFF',
}

const NAV_ITEMS = [
  { icon: MessageSquare, label: 'AI Chat',       to: '/chat',          badge: null },
  { icon: Bell,          label: 'Announcements', to: '/announcements', badge: 3 },
  { icon: BookOpen,      label: 'Resources',     to: '/resources',     badge: null },
  { icon: History,       label: 'Chat History',  to: '/history',       badge: null },
  { icon: User,          label: 'Profile',       to: '/profile',       badge: null },
]

export default function Sidebar({ user, onCollapseChange }) {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  const initials = user?.full_name
    ? user.full_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'EA'

  const width = collapsed ? 72 : 280

  return (
    <motion.aside
      animate={{ width }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, bottom: 0,
        width, zIndex: 40, flexShrink: 0,
        display: 'flex', flexDirection: 'column',
        background: `linear-gradient(180deg, ${C.primaryDark} 0%, ${C.primary} 60%, #0d4a73 100%)`,
        borderRight: `1px solid ${C.border}`,
        overflow: 'hidden',
      }}
      className="hidden md:flex"
    >
      {/* Subtle texture overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 20% 20%, rgba(111,209,215,0.06) 0%, transparent 60%)',
      }}/>

      {/* ── Logo ── */}
      <div style={{
        padding: collapsed ? '20px 0' : '20px 20px',
        borderBottom: `1px solid ${C.border}`,
        display: 'flex', alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'flex-start',
        gap: 10, position: 'relative',
      }}>
        {/* Icon mark */}
        <div style={{
          width: 36, height: 36, borderRadius: 10, flexShrink: 0,
          background: 'rgba(93,248,216,0.12)',
          border: '1px solid rgba(93,248,216,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Sparkles size={17} color={C.mint} />
        </div>

        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.18 }}
            >
              <div style={{
                fontSize: 15, fontWeight: 800, color: C.paper,
                letterSpacing: '-0.02em', lineHeight: 1.1,
              }}>
                CampusMind AI
              </div>
              <div style={{
                fontSize: 10, fontWeight: 600, color: C.accent,
                letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 2,
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                <GraduationCap size={9} />
                AI Campus Assistant
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Collapse toggle ── */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => { const next = !collapsed; setCollapsed(next); onCollapseChange?.(next) }}
        style={{
          position: 'absolute', top: 22, right: 0,
          width: 30, height: 30, borderRadius: '50%',
          background: C.primary, border: `2px solid rgba(111,209,215,0.3)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 10, transition: 'border-color 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = C.accent}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(111,209,215,0.3)'}
        className="hidden lg:flex"
      >
        {collapsed
          ? <ChevronRight size={12} color={C.accent} />
          : <ChevronLeft  size={12} color={C.accent} />
        }
      </motion.button>

      {/* ── Nav items ── */}
      <nav style={{ flex: 1, padding: collapsed ? '16px 10px' : '16px 14px', overflowY: 'auto' }}>
        {/* Section label */}
        {!collapsed && (
          <div style={{
            fontSize: 9, fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.14em', color: 'rgba(255,255,255,0.25)',
            padding: '0 14px', marginBottom: 8,
          }}>
            Navigation
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {NAV_ITEMS.map(item => (
            <NavItem key={item.to} {...item} collapsed={collapsed} />
          ))}
        </div>
      </nav>

      {/* ── User section ── */}
      <div style={{
        borderTop: `1px solid ${C.border}`,
        padding: collapsed ? '14px 10px' : '14px 16px',
      }}>
        {!collapsed ? (
          /* Expanded user card */
          <div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 12,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
              marginBottom: 10,
            }}>
              {/* Avatar */}
              <div style={{
                width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                background: `linear-gradient(135deg, ${C.accent}, ${C.mint})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 800, color: C.primary,
              }}>
                {initials}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 13, fontWeight: 700, color: C.paper,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {user?.full_name || 'Emmanuel Adeyemi'}
                </div>
                <div style={{ fontSize: 10.5, color: C.accent, marginTop: 1 }}>
                  {user?.matric_number || 'KDU/CSC/24043'}
                </div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>
                  {user?.department || 'Computer Science'} · {user?.level || '400L'}
                </div>
              </div>
            </div>

            {/* Logout button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleLogout}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                padding: '9px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)',
                background: 'transparent', cursor: 'pointer',
                fontSize: 12.5, fontWeight: 600, color: 'rgba(255,255,255,0.55)',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(239,68,68,0.12)'
                e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)'
                e.currentTarget.style.color = '#fca5a5'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
              }}
            >
              <LogOut size={14} />
              Sign out
            </motion.button>
          </div>
        ) : (
          /* Collapsed — just avatar + logout icon */
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: `linear-gradient(135deg, ${C.accent}, ${C.mint})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 800, color: C.primary, cursor: 'pointer',
            }}
              title={user?.full_name || 'Emmanuel Adeyemi'}
            >
              {initials}
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleLogout}
              title="Sign out"
              style={{
                width: 34, height: 34, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
                background: 'transparent', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.4)', transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(239,68,68,0.12)'
                e.currentTarget.style.color = '#fca5a5'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'rgba(255,255,255,0.4)'
              }}
            >
              <LogOut size={14} />
            </motion.button>
          </div>
        )}
      </div>
    </motion.aside>
  )
}
