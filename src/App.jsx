import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Landing from '../frontend/src/pages/Landing'
import Login from '../frontend/src/pages/Login'
import Dashboard from '../frontend/src/pages/Dashboard'

const App = () => {
  return (
    <div>
      {/* <Landing /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />


        </Routes>
      </Router>
    </div>
  )
}

export default App