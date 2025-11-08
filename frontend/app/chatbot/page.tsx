"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // 👇 scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 👇 handle send
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // 🔹 Simulate API call (later connect to Django or OpenAI)
    setTimeout(() => {
      const botResponse = {
        sender: "bot",
        text:
          "I'm EvoGene Assistant 🤖 — analyzing your health data and questions with precision! (Backend not connected yet)",
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050B1E] text-white">
      {/* Header */}
      <header className="p-5 text-center border-b border-cyan-700/40 bg-[#0B1228] shadow-lg">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          EvoGene Chat Assistant 💬
        </h1>
        <p className="text-sm text-gray-400 mt-2">
          Get personalized AI-driven health insights
        </p>
      </header>

      {/* Chat window */}
      <main className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-cyan-700/30">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500 mt-20">
            👋 Start chatting with EvoGene Assistant
          </p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-3 rounded-2xl max-w-[75%] leading-relaxed text-sm md:text-base ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-none shadow-cyan-600/30"
                    : "bg-[#101832] border border-cyan-700/40 text-gray-200 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </main>

      {/* Input section */}
      <div className="border-t border-cyan-800/30 bg-[#0B1228] p-4 flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your question..."
          className="flex-1 bg-[#101832] text-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-500"
        />
        <button
          onClick={handleSend}
          className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl hover:scale-105 transition-transform"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
