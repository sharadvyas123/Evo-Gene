"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Needed so the button doesn’t mismatch during SSR
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle Theme"
      className="flex items-center justify-center w-10 h-10 rounded-full border border-cyan-500/30 bg-[#0b1228] text-cyan-400 
                 hover:border-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_10px_rgba(34,211,238,0.6)] 
                 transition-all duration-300"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-yellow-400 transition-transform duration-300 rotate-0" />
      ) : (
        <Moon className="w-5 h-5 text-blue-400 transition-transform duration-300 rotate-0" />
      )}
    </button>
  );
}
