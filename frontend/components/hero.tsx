"use client"

import { ArrowRight, Zap } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-transparent pt-24">

      {/* 🎬 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-0"
      >
        <source src="bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/50 -z-5" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-400/30 rounded-full">
          <Zap size={16} className="text-cyan-400" />
          <span className="text-sm text-cyan-400">Powered by Advanced AI Models</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
          Evolving Intelligence
        </h1>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-700 bg-clip-text text-transparent leading-tight">
          Empowering Innovation
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto leading-relaxed">
          Bridge the gaps in proactive healthcare with AI-driven analysis combining DNA insights, diagnostic imaging,
          and clinical data for truly personalized medicine.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button className="px-8 py-4 bg-linear-to-r from-cyan-400 to-blue-500 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-cyan-400/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
            Start Analysis
            <ArrowRight size={20} />
          </button>
          <button className="px-8 py-4 border-2 border-cyan-400/50 text-cyan-300 rounded-lg font-semibold hover:bg-cyan-400/10 transition-all duration-300">
            View Demo
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-blue-400/20">
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-cyan-400">98%</p>
            <p className="text-sm text-gray-400 mt-2">Accuracy Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-blue-400">{"<1s"}</p>
            <p className="text-sm text-gray-400 mt-2">Analysis Time</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-cyan-400">3x</p>
            <p className="text-sm text-gray-400 mt-2">Earlier Detection</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-blue-400">24/7</p>
            <p className="text-sm text-gray-400 mt-2">Always Available</p>
          </div>
        </div>
      </div>
    </section>
  )
}
