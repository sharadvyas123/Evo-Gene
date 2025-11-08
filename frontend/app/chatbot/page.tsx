"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import ThemeToggleButton from "@/components/ThemeToggleButton";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div
      className="
        min-h-screen flex flex-col 
        bg-[#050B1E] text-white 
        dark:bg-[#050B1E] dark:text-white 
        bg-white text-black
        transition-colors duration-500
      "
    >
      {/* Header */}
      <header
        className="
          p-5 flex justify-between items-center border-b shadow-md
          bg-white text-black 
          dark:bg-[#0B1228] dark:text-white border-gray-200 dark:border-cyan-700/40
        "
      >
        <div>
          <h1
            className="
              text-3xl font-bold 
              bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent 
              dark:from-cyan-400 dark:to-blue-500
            "
          >
            EvoGene Chat Assistant 💬
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            AI-driven health insights at your fingertips
          </p>
        </div>
        <ThemeToggleButton />
      </header>

      {/* Chat Section */}
      <main className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-cyan-700/30">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-20">
            👋 Start chatting with EvoGene Assistant
          </p>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`px-4 py-3 rounded-2xl max-w-[75%] leading-relaxed text-sm md:text-base ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-none dark:from-cyan-500 dark:to-blue-600"
                    : "bg-gray-100 border border-gray-300 text-black rounded-bl-none dark:bg-[#101832] dark:border-cyan-700/40 dark:text-gray-200"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </main>

      {/* Input Section */}
      <div
        className="
          border-t p-4 flex items-center gap-3
          bg-white text-black border-gray-200
          dark:bg-[#0B1228] dark:border-cyan-800/30 dark:text-white
        "
      >
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="
            flex-1 p-3 rounded-xl focus:outline-none focus:ring-2
            bg-gray-100 placeholder-gray-500 border border-gray-300 text-black
            dark:bg-[#101832] dark:text-white dark:border-cyan-700/40 dark:placeholder-gray-400
          "
        />
        <button
          onClick={handleSend}
          className="
            p-3 rounded-xl hover:scale-105 transition-transform 
            bg-gradient-to-r from-cyan-500 to-blue-600 text-white
          "
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
