import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageSquare, Bell, BookOpen, History,
  User, LogOut, Sparkles, GraduationCap, X,
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import NavItem from './NavItem'

const C = {
  primary:     '#093C5D',
  primaryDark: '#051e30',
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

export default function MobileSidebar({ open, onClose, user }) {
  const location = useLocation()
  const navigate = useNavigate()

  // Close on route change
  useEffect(() => { onClose() }, [location.pathname])

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  const initials = user?.full_name
    ? user.full_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'EA'

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 50,
              background: 'rgba(5,30,48,0.65)',
              backdropFilter: 'blur(3px)',
            }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'fixed', top: 0, left: 0, bottom: 0,
              width: 290, zIndex: 51,
              display: 'flex', flexDirection: 'column',
              background: `linear-gradient(180deg, ${C.primaryDark} 0%, ${C.primary} 60%, #0d4a73 100%)`,
              boxShadow: '4px 0 24px rgba(5,30,48,0.4)',
            }}
          >
            {/* Texture */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'radial-gradient(ellipse at 20% 20%, rgba(111,209,215,0.07) 0%, transparent 60%)',
            }}/>

            {/* Header */}
            <div style={{
              padding: '18px 20px',
              borderBottom: `1px solid ${C.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'rgba(93,248,216,0.12)',
                  border: '1px solid rgba(93,248,216,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Sparkles size={16} color={C.mint} />
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: C.paper, letterSpacing: '-0.02em' }}>
                    CampusMind AI
                  </div>
                  <div style={{
                    fontSize: 9.5, fontWeight: 600, color: C.accent,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                    display: 'flex', alignItems: 'center', gap: 3, marginTop: 1,
                  }}>
                    <GraduationCap size={9} />
                    AI Campus Assistant
                  </div>
                </div>
              </div>

              {/* Close button */}
              <motion.button
                whileTap={{ scale: 0.9, rotate: 90 }}
                onClick={onClose}
                style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: 'rgba(255,255,255,0.08)', border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: C.muted, transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = C.muted }}
              >
                <X size={16} />
              </motion.button>
            </div>

            {/* Nav */}
            <nav style={{ flex: 1, padding: '16px 14px', overflowY: 'auto' }}>
              <div style={{
                fontSize: 9, fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.14em', color: 'rgba(255,255,255,0.25)',
                padding: '0 14px', marginBottom: 8,
              }}>
                Navigation
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {NAV_ITEMS.map(item => (
                  <NavItem key={item.to} {...item} onClick={onClose} />
                ))}
              </div>
            </nav>

            {/* User section */}
            <div style={{ padding: '14px 16px', borderTop: `1px solid ${C.border}` }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 12,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                marginBottom: 10,
              }}>
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

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleLogout}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                  padding: '10px 14px', borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'transparent', cursor: 'pointer',
                  fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.55)',
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
                <LogOut size={15} />
                Sign out
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
