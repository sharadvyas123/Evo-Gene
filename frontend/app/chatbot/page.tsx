"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import Link from "next/link";

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // ✅ Authentication check – only logged-in users can access
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token !== "loggedin-token") {
      localStorage.setItem("redirectAfterLogin", "/chatbot");
      router.push("/login");
    }
  }, [router]);

  // ✅ Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const botMsg = { sender: "bot", text: "🤖 EvoGene Assistant: How can I help you today?" };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050B1E] text-white relative">

      {/* ✅ CLICKABLE LOGO */}
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

      {/* Chat section */}
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
        />
        <button
          onClick={handleSend}
          className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:scale-105 transition-transform"
        >
          <Send size={20} />
        </button>
      </div>

    </div>
  );
}
