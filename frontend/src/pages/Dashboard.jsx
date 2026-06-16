import React from 'react'
import AiAssistant from '../components/Ai Assistant'
import Sidebar from '../components/Sidebar'
import Timetable from '../components/Timetable'
import CampusGuide from '../components/CampusGuide'
import Announcements from '../components/Announcements'
import Profile from '../components/Profile'

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <AiAssistant />
        <Timetable />
        <CampusGuide />
        <Announcements />
        <Profile />
      </main>
    </div>
  )
}

export default Dashboard