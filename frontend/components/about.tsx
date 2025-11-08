"use client"

import { useEffect, useRef } from "react"
import { Heart, Brain, TrendingUp } from "lucide-react"

export default function About() {
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
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 to-blue-950/30">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              About EvoGene
            </h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              EvoGene is revolutionizing healthcare by bridging critical gaps in proactive, personalized, and
              data-driven medical management. We tackle three fundamental healthcare challenges:
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Heart size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Personalized Prevention</h3>
                  <p className="text-gray-400">
                    Eliminate generic advice with genetics-based insights tailored to your unique biological profile.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Brain size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Early Detection</h3>
                  <p className="text-gray-400">
                    Identify conditions like brain tumors years before symptoms appear through advanced AI screening.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <TrendingUp size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Unified Data</h3>
                  <p className="text-gray-400">
                    Integrate DNA analysis, imaging, and clinical records into one coherent health picture.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-300 text-lg">
              We empower patients to transition from reactive treatment to proactive health management, with AI-driven
              insights that put control back in your hands.
            </p>
          </div>

          {/* Right Visual */}
          <div className="relative h-96 hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl blur-2xl" />
            <div className="absolute inset-0 border border-cyan-400/30 rounded-2xl backdrop-blur-sm p-8 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="p-4 bg-blue-500/10 border border-blue-400/30 rounded-lg hover:border-blue-400/60 transition-all duration-300 transform hover:scale-105">
                  <p className="text-cyan-400 font-semibold text-sm mb-1">DNA Analysis</p>
                  <p className="text-gray-300 text-xs">Comprehensive genetic profiling</p>
                </div>
                <div className="p-4 bg-blue-500/10 border border-blue-400/30 rounded-lg hover:border-blue-400/60 transition-all duration-300 transform hover:scale-105 ml-4">
                  <p className="text-cyan-400 font-semibold text-sm mb-1">Diagnostic Imaging</p>
                  <p className="text-gray-300 text-xs">AI-powered scan analysis</p>
                </div>
                <div className="p-4 bg-blue-500/10 border border-blue-400/30 rounded-lg hover:border-blue-400/60 transition-all duration-300 transform hover:scale-105">
                  <p className="text-cyan-400 font-semibold text-sm mb-1">Clinical Records</p>
                  <p className="text-gray-300 text-xs">Complete health integration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
