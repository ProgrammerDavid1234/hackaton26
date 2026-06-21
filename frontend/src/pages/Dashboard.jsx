// frontend/src/pages/Dashboard.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Home from "../components/home";
import AiAssistant from "../components/AiAssistant";
import Timetable from "../components/timetable";
import CampusGuide from "../components/CampusGuide";
import Announcements from "../components/announcements";
import Profile from "../components/profile";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<Home />} />
        <Route path="chat" element={<AiAssistant />} />
        <Route path="timetable" element={<Timetable />} />
        <Route path="navigator" element={<CampusGuide />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </DashboardLayout>
  );
};
