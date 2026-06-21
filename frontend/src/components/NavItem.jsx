import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const C = {
  accent:     '#6FD1D7',
  accentMint: '#5DF8D8',
  muted:      'rgba(255,255,255,0.45)',
  hover:      'rgba(255,255,255,0.08)',
  active:     'rgba(111,209,215,0.15)',
}

export default function NavItem({ icon: Icon, label, to, badge, collapsed, onClick }) {
  const location = useLocation()
  const isActive = location.pathname === to ||
    (to !== '/' && location.pathname.startsWith(to))

  return (
    <NavLink
      to={to}
      onClick={onClick}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <motion.div
        whileHover={{ x: collapsed ? 0 : 2 }}
        whileTap={{ scale: 0.97 }}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: collapsed ? '11px 0' : '10px 14px',
          justifyContent: collapsed ? 'center' : 'flex-start',
          borderRadius: 10,
          cursor: 'pointer',
          background: isActive ? C.active : 'transparent',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = C.hover }}
        onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = isActive ? C.active : 'transparent' }}
      >
        {/* Left accent bar */}
        {isActive && (
          <motion.div
            layoutId="nav-accent-bar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: 'absolute',
              left: -14,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 3,
              height: 22,
              borderRadius: '0 4px 4px 0',
              background: C.accentMint,
            }}
          />
        )}

        {/* Icon */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <Icon
            size={18}
            color={isActive ? C.accent : C.muted}
            strokeWidth={isActive ? 2.2 : 1.8}
            style={{ transition: 'color 0.15s' }}
          />
          {/* Badge */}
          {badge && (
            <span style={{
              position: 'absolute',
              top: -5, right: -6,
              minWidth: 15, height: 15,
              borderRadius: 999,
              background: C.accentMint,
              color: '#093C5D',
              fontSize: 9,
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 3px',
            }}>
              {badge}
            </span>
          )}
        </div>

        {/* Label */}
        {!collapsed && (
          <span style={{
            fontSize: 13.5,
            fontWeight: isActive ? 600 : 500,
            color: isActive ? '#fff' : C.muted,
            letterSpacing: '-0.01em',
            transition: 'color 0.15s',
            flex: 1,
          }}>
            {label}
          </span>
        )}

        {/* Active dot for collapsed */}
        {collapsed && isActive && (
          <motion.div
            layoutId="collapsed-dot"
            style={{
              position: 'absolute',
              bottom: 4,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: C.accentMint,
            }}
          />
        )}
      </motion.div>
    </NavLink>
  )
}
