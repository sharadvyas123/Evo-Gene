"use client"

import { useEffect, useRef } from "react"
import { ArrowRight, Sparkles } from "lucide-react"

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-950/30 to-slate-950 opacity-0"
    >
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 p-12 md:p-16 border border-cyan-400/30">
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -ml-48 -mb-48" />

          {/* Content */}
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-400/50 rounded-full mb-6">
              <Sparkles size={16} className="text-cyan-400 animate-pulse" />
              <span className="text-sm font-semibold text-cyan-300">Ready to evolve your health?</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              Join the Evolution in Health Intelligence
            </h2>

            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience personalized, proactive healthcare powered by genetic insights and AI-driven analysis. Your
              health, optimized.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-cyan-400/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 group">
                Start Your Journey
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border-2 border-cyan-400/50 text-cyan-300 rounded-lg font-semibold hover:bg-cyan-400/10 transition-all duration-300">
                Schedule Consultation
              </button>
            </div>

            <p className="text-gray-400 text-sm mt-8">
              No credit card required • Free preliminary assessment • HIPAA compliant
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
