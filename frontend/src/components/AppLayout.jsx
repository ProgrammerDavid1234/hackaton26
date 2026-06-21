import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Sidebar from './Sidebar'
import MobileSidebar from './MobileSidebar'
import Navbar from './Navbar'

const SIDEBAR_WIDTH_EXPANDED  = 280
const SIDEBAR_WIDTH_COLLAPSED = 72

export default function AppLayout({ children }) {
  const [user,          setUser]          = useState(null)
  const [mobileOpen,    setMobileOpen]    = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const location = useLocation()

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user: authUser } }) => {
      if (!authUser) return
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single()
      setUser(data)
    })
  }, [])

  // Close mobile sidebar on route change
  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  // Listen for sidebar collapse state changes (Sidebar manages its own state,
  // but we need the width here for Navbar offset)
  // We pass a callback down instead
  const sidebarWidth = sidebarCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F0F7FA',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      {/* Desktop sidebar */}
      <Sidebar
        user={user}
        onCollapseChange={setSidebarCollapsed}
      />

      {/* Mobile sidebar */}
      <MobileSidebar
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        user={user}
      />

      {/* Main area — pushed right by sidebar on desktop */}
      <div
        style={{ transition: 'padding-left 0.25s ease' }}
        className="md:pl-[280px]"
      >
        {/* Top navbar */}
        <Navbar
          user={user}
          onMenuClick={() => setMobileOpen(true)}
          sidebarWidth={sidebarWidth}
        />

        {/* Page content — below the 72px navbar */}
        <main style={{ paddingTop: 72, minHeight: '100vh' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
