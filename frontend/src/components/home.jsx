// frontend/src/components/home.jsx
import { useState, useEffect } from "react";
import {
  MessageSquare,
  BookOpen,
  Megaphone,
  Bell,
  TrendingUp,
  Clock,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

const StatCard = ({ icon: Icon, label, value, color, sub }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}
    >
      <Icon size={22} className="text-white" />
    </div>
    <div>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
    </div>
  </div>
);

export default function Home() {
  const { profile } = useAuth();
  const [stats, setStats] = useState({
    chats: 0,
    resources: 0,
    announcements: 0,
    notifications: 0,
  });
  const [recentChats, setRecentChats] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [chats, resources, announcements, notifications] =
        await Promise.all([
          supabase.from("chat_logs").select("id", { count: "exact" }),
          supabase.from("resources").select("id", { count: "exact" }),
          supabase
            .from("announcements")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(3),
          supabase
            .from("notifications")
            .select("id", { count: "exact" })
            .eq("is_read", false),
        ]);
      setStats({
        chats: chats.count || 0,
        resources: resources.count || 0,
        announcements: announcements.data?.length || 0,
        notifications: notifications.count || 0,
      });
      setAnnouncements(announcements.data || []);

      const { data: chatData } = await supabase
        .from("chat_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(4);
      setRecentChats(chatData || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const suggestedPrompts = [
    "Where is the ICT center?",
    "How do I apply for hostel?",
    "What events are happening this week?",
    "Where is the library?",
    "Show available resources",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
        <p className="text-blue-100 text-sm font-medium">{greeting} 👋</p>
        <h1 className="text-2xl font-bold mt-1">
          {profile?.full_name || "Welcome back"}
        </h1>
        <p className="text-blue-100 text-sm mt-1 capitalize">
          {profile?.role || "Student"} ·{" "}
          {profile?.department || "CampusMind University"}
        </p>
        <div
          className="mt-4 flex items-center gap-2 bg-white/20 backdrop-blur rounded-xl px-4 py-2.5 max-w-md cursor-pointer hover:bg-white/30 transition-colors"
          onClick={() => (window.location.href = "/dashboard/chat")}
        >
          <MessageSquare size={16} />
          <span className="text-sm">Ask the AI assistant anything...</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={MessageSquare}
          label="AI Conversations"
          value={stats.chats}
          color="bg-blue-500"
          sub="Total chats"
        />
        <StatCard
          icon={BookOpen}
          label="Resources"
          value={stats.resources}
          color="bg-indigo-500"
          sub="Available files"
        />
        <StatCard
          icon={Megaphone}
          label="Announcements"
          value={stats.announcements}
          color="bg-violet-500"
          sub="Recent posts"
        />
        <StatCard
          icon={Bell}
          label="Unread Alerts"
          value={stats.notifications}
          color="bg-pink-500"
          sub="Notifications"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Suggested Prompts */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-700">
              Quick Questions
            </h2>
            <TrendingUp size={16} className="text-slate-400" />
          </div>
          <div className="space-y-2">
            {suggestedPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => (window.location.href = "/dashboard/chat")}
                className="w-full text-left text-sm px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-slate-600 transition-colors flex items-center justify-between group"
              >
                <span>{prompt}</span>
                <ChevronRight
                  size={14}
                  className="text-slate-300 group-hover:text-blue-500"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-700">
              Recent Announcements
            </h2>
            <Clock size={16} className="text-slate-400" />
          </div>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-14 bg-slate-100 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : announcements.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              No announcements yet
            </div>
          ) : (
            <div className="space-y-3">
              {announcements.map((a) => (
                <div
                  key={a.id}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-slate-700 line-clamp-1">
                      {a.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                      {a.content}
                    </p>
                    <p className="text-xs text-slate-300 mt-1">
                      {new Date(a.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Chats */}
      {recentChats.length > 0 && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-700">
              Recent AI Conversations
            </h2>
            <button
              onClick={() => (window.location.href = "/dashboard/chat")}
              className="text-xs text-blue-600 hover:underline"
            >
              View all
            </button>
          </div>
          <div className="space-y-2">
            {recentChats.map((chat) => (
              <div
                key={chat.id}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <MessageSquare size={14} className="text-blue-600" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm text-slate-700 truncate">
                    {chat.message}
                  </p>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {chat.response}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
