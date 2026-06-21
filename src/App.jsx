import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "../frontend/src/pages/Landing";
import Login from "../frontend/src/pages/Login";
import Signup from "../frontend/src/pages/Signup";
import Chat from "../frontend/src/pages/Chat";
import AppLayout from "../frontend/src/components/AppLayout";

function Protected({ children }) {
  return <AppLayout>{children}</AppLayout>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing is the first page */}
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />

        {/* Public auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/chat"
          element={
            <Protected>
              <Chat />
            </Protected>
          }
        />
        <Route
          path="/announcements"
          element={
            <Protected>
              {/* replace with the file component */}
              <PlaceholderPage title="Announcements" />
            </Protected>
          }
        />
        <Route
          path="/resources"
          element={
            <Protected>
              {/* replace with the file component */}
              <PlaceholderPage title="Resources" />
            </Protected>
          }
        />
        <Route
          path="/history"
          element={
            <Protected>
              {/* replace with the file component */}
              <PlaceholderPage title="Chat History" />
            </Protected>
          }
        />
        <Route
          path="/profile"
          element={
            <Protected>
              {/* replace with the file component */}
              <PlaceholderPage title="Profile" />
            </Protected>
          }
        />
        <Route
          path="/settings"
          element={
            <Protected>
              {/* replace with the file component */}
              <PlaceholderPage title="Settings" />
            </Protected>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function PlaceholderPage({ title }) {
  return (
    <div
      style={{
        padding: 32,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 72px)",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 18,
          background: "linear-gradient(135deg, #093C5D, #3B7597)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          marginBottom: 20,
          boxShadow: "0 8px 24px rgba(9,60,93,0.20)",
        }}
      >
        🚧
      </div>
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: 800,
          color: "#082235",
          margin: "0 0 8px",
          letterSpacing: "-0.03em",
        }}
      >
        {title}
      </h2>
      <p style={{ color: "#5E7585", fontSize: 14, margin: 0 }}>
        This page is coming soon. Replace with your component.
      </p>
    </div>
  );
}
