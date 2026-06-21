import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Settings, LogOut, ChevronDown, Shield } from 'lucide-react'
import { supabase } from '../lib/supabase'

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

export default function UserDropdown({ user, variant = 'light' }) {
  const [open, setOpen]     = useState(false)
  const ref                 = useRef(null)
  const navigate            = useNavigate()

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  const initials = user?.full_name
    ? user.full_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'ST'

  const items = [
    { icon: User,     label: 'View Profile', action: () => navigate('/profile') },
    { icon: Settings, label: 'Settings',     action: () => navigate('/settings') },
    { icon: Shield,   label: 'Privacy',      action: () => {} },
  ]

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {/* Trigger */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen(v => !v)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '5px 10px 5px 5px',
          borderRadius: 999, border: `1px solid ${C.border}`,
          background: open ? C.bgSoft : C.paper,
          cursor: 'pointer', transition: 'all 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = C.bgSoft}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = C.paper }}
      >
        {/* Avatar */}
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: C.mint, fontSize: 12, fontWeight: 700, flexShrink: 0,
        }}>
          {initials}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }} className="hidden sm:flex">
          <span style={{ fontSize: 12, fontWeight: 600, color: C.ink, lineHeight: 1.2 }}>
            {user?.full_name?.split(' ')[0] || 'Student'}
          </span>
          <span style={{ fontSize: 10, color: C.muted, lineHeight: 1.2 }}>
            {user?.matric_number || 'KDU/CSC/24043'}
          </span>
        </div>
        <ChevronDown
          size={13} color={C.muted}
          style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute', top: 'calc(100% + 8px)', right: 0,
              width: 220, background: C.paper,
              border: `1px solid ${C.border}`, borderRadius: 14,
              boxShadow: '0 8px 30px rgba(9,60,93,0.12), 0 2px 8px rgba(9,60,93,0.06)',
              overflow: 'hidden', zIndex: 100,
            }}
          >
            {/* Profile header */}
            <div style={{
              padding: '14px 16px 12px',
              borderBottom: `1px solid ${C.border}`,
              background: C.bg,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: C.mint, fontSize: 14, fontWeight: 700,
                }}>
                  {initials}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>
                    {user?.full_name || 'Emmanuel Adeyemi'}
                  </div>
                  <div style={{ fontSize: 11, color: C.muted }}>
                    {user?.matric_number || 'KDU/CSC/24043'}
                  </div>
                  <div style={{
                    display: 'inline-block', marginTop: 3,
                    fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
                    padding: '2px 7px', borderRadius: 999,
                    background: `rgba(93,248,216,0.15)`, color: C.primary,
                  }}>
                    {user?.role || 'Student'} · {user?.level || '400L'}
                  </div>
                </div>
              </div>
            </div>

            {/* Menu items */}
            <div style={{ padding: '6px 8px' }}>
              {items.map(({ icon: Icon, label, action }) => (
                <motion.button
                  key={label}
                  whileHover={{ x: 2 }}
                  onClick={() => { action(); setOpen(false) }}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                    padding: '9px 10px', borderRadius: 8, border: 'none',
                    background: 'transparent', cursor: 'pointer',
                    fontSize: 13, fontWeight: 500, color: C.ink,
                    textAlign: 'left', transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = C.bg}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <Icon size={15} color={C.muted} />
                  {label}
                </motion.button>
              ))}
            </div>

            {/* Logout */}
            <div style={{ padding: '6px 8px 8px', borderTop: `1px solid ${C.border}` }}>
              <motion.button
                whileHover={{ x: 2 }}
                onClick={handleLogout}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '9px 10px', borderRadius: 8, border: 'none',
                  background: 'transparent', cursor: 'pointer',
                  fontSize: 13, fontWeight: 600, color: '#dc2626',
                  textAlign: 'left', transition: 'background 0.1s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#fef2f2'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <LogOut size={15} color="#dc2626" />
                Sign out
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
