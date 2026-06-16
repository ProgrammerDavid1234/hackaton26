// frontend/src/components/AiAssistant.jsx
import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Sparkles, RotateCcw, Copy, Mic } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

const SUGGESTED = [
  "Where is the ICT center?",
  "How do I apply for hostel?",
  "What events are this week?",
  "Where is the library?",
  "Show available resources",
];

const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const askGemini = async (message, history) => {
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `You are CampusMind AI, a helpful university campus assistant. Answer questions about campus locations, resources, academic info, events, and student services. Be concise and friendly.`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Understood! I am CampusMind AI, ready to help students with campus information.",
        },
      ],
    },
    ...history.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    })),
    { role: "user", parts: [{ text: message }] },
  ];

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    },
  );
  const data = await res.json();
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Sorry, I could not process that."
  );
};

export default function AiAssistant() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const loadHistory = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("chat_logs")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true })
      .limit(20);
    if (data) {
      const msgs = [];
      data.forEach((log) => {
        msgs.push({ role: "user", content: log.message });
        msgs.push({ role: "assistant", content: log.response });
      });
      setMessages(msgs);
      setHistory(msgs);
    }
  };

  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;
    setInput("");
    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await askGemini(userMsg, history);
      const updated = [
        ...newMessages,
        { role: "assistant", content: response },
      ];
      setMessages(updated);
      setHistory(updated);

      if (user) {
        await supabase.from("chat_logs").insert([
          {
            user_id: user.id,
            message: userMsg,
            response,
          },
        ]);
      }
    } catch (e) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const copyText = (text) => navigator.clipboard.writeText(text);

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
          <Bot size={20} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">CampusMind AI</p>
          <p className="text-xs text-blue-100">Always here to help</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-xs text-blue-100">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center">
              <Sparkles size={28} className="text-blue-500" />
            </div>
            <div>
              <p className="text-slate-700 font-semibold">
                How can I help you today?
              </p>
              <p className="text-slate-400 text-sm mt-1">
                Ask me anything about campus
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
              {SUGGESTED.map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(s)}
                  className="text-left text-sm px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-slate-600 transition-colors border border-slate-100"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot size={14} className="text-white" />
              </div>
            )}
            <div
              className={`group max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed relative
              ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-tr-sm"
                  : "bg-slate-100 text-slate-800 rounded-tl-sm"
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
              {msg.role === "assistant" && (
                <button
                  onClick={() => copyText(msg.content)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Copy
                    size={12}
                    className="text-slate-400 hover:text-slate-600"
                  />
                </button>
              )}
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center flex-shrink-0 mt-1">
                <User size={14} className="text-slate-600" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
              <Bot size={14} className="text-white" />
            </div>
            <div className="bg-slate-100 rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1 items-center h-5">
                <span
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-slate-100 bg-white">
        <div className="flex items-end gap-2 bg-slate-50 rounded-2xl px-4 py-2 border border-slate-200 focus-within:border-blue-400 transition-colors">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Ask about campus, resources, events..."
            rows={1}
            className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 resize-none outline-none py-1 max-h-32"
          />
          <div className="flex items-center gap-1.5 pb-1">
            <button className="p-1.5 text-slate-400 hover:text-blue-500 transition-colors">
              <Mic size={16} />
            </button>
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 flex items-center justify-center transition-colors"
            >
              <Send size={14} className="text-white" />
            </button>
          </div>
        </div>
        <p className="text-xs text-slate-400 text-center mt-2">
          CampusMind AI · Powered by Gemini
        </p>
      </div>
    </div>
  );
}
