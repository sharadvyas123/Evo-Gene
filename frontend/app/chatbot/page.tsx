"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import Link from "next/link";
import axios from "axios";

// 🧬 Message type
interface Message {
  sender: "user" | "bot";
  text: string;
}

// 🧠 API response types
interface ChatResponse {
  task_id: string;
  status: string;
  message: string;
}

interface StatusResponse {
  status: "processing" | "completed" | "error";
  summary?: string;
  report?: string;
  response?: string;
  error?: string;
}

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // ✅ Auth check
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token !== "loggedin-token") {
      localStorage.setItem("redirectAfterLogin", "/chatbot");
      router.push("/login");
    }
  }, [router]);

  // ✅ Scroll to bottom when new messages appear
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🚀 Send message to backend
  const handleSend = async (): Promise<void> => {
    if (!input.trim()) return;

    const userMsg: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Step 1️⃣ — Start background analysis
      const startRes = await axios.post<ChatResponse>("http://localhost:8000/api/chat/", {
        prompt: input,
      });

      const taskId = startRes.data.task_id;
      if (!taskId) throw new Error("No task ID returned from backend!");

      // Show interim message
      const botProcessing: Message = {
        sender: "bot",
        text: "🧬 EvoGene Assistant: Working on your variant analysis... please wait a bit!",
      };
      setMessages((prev) => [...prev, botProcessing]);

      // Step 2️⃣ — Poll the /status endpoint
      let done = false;
      let attempt = 0;

      while (!done && attempt < 30) {
        await new Promise((r) => setTimeout(r, 3000)); // wait 3s
        attempt++;

        try {
          const statusRes = await axios.get<StatusResponse>(
            `http://localhost:8000/api/status/${taskId}/`
          );
          const data = statusRes.data;

          if (data.status === "completed") {
            const botReply =
              data.summary ||
              data.report ||
              data.response ||
              "✅ EvoGene Assistant: Analysis complete, but no summary returned.";

            const botMsg: Message = { sender: "bot", text: botReply };
            setMessages((prev) => [...prev, botMsg]);
            done = true;
          } else if (data.status === "error") {
            const botMsg: Message = {
              sender: "bot",
              text: `⚠️ EvoGene Assistant: ${data.error || "Something went wrong during analysis."}`,
            };
            setMessages((prev) => [...prev, botMsg]);
            done = true;
          }
        } catch (pollErr) {
          console.warn("Polling error:", pollErr);
        }
      }

      if (!done) {
        const botMsg: Message = {
          sender: "bot",
          text: "⌛ EvoGene Assistant: Still processing... try again later!",
        };
        setMessages((prev) => [...prev, botMsg]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      const botMsg: Message = {
        sender: "bot",
        text: "⚠️ EvoGene Assistant: The server seems unreachable. Please try again later.",
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050B1E] text-white relative">
      {/* ✅ Clickable Logo */}
      <div className="absolute top-6 left-6 z-50 cursor-pointer">
        <Link href="/">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-white font-bold text-xl drop-shadow-lg">EvoGene</span>
          </div>
        </Link>
      </div>

      {/* Header */}
      <header className="p-5 text-center bg-[#0B1228] border-b border-cyan-700/40">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          EvoGene Chat Assistant 💬
        </h1>
      </header>

      {/* Chat messages */}
      <main className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <p className="text-center text-gray-400 mt-20">
            👋 Start chatting with EvoGene Assistant
          </p>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-3 rounded-2xl max-w-[75%] leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                    : "bg-[#101832] border border-cyan-700/40 text-gray-200"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </main>

      {/* Input Box */}
      <div className="border-t p-4 flex items-center gap-3 bg-[#0B1228] border-cyan-800/30 text-white">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 p-3 rounded-xl bg-[#101832] border border-cyan-700/40 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          disabled={loading}
        />
        <button
          onClick={handleSend}
          className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:scale-105 transition-transform disabled:opacity-50"
          disabled={loading}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
