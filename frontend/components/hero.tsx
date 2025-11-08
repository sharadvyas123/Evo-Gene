"use client"

import { useEffect, useRef } from "react"
import { ArrowRight, Zap } from "lucide-react"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight * 0.6

    let animationId: number

    const drawDNA = (time: number) => {
      ctx.fillStyle = "rgba(15, 23, 42, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const numPoints = 100
      const radius = 80
      const amplitude = 60

      ctx.strokeStyle = "rgba(34, 211, 238, 0.3)"
      ctx.lineWidth = 2

      for (let i = 0; i < numPoints; i++) {
        const t = i / numPoints
        const angle = t * Math.PI * 4 + time * 0.0005
        const x = centerX + Math.cos(angle) * (radius + Math.sin(t * Math.PI * 2 + time * 0.0002) * amplitude)
        const y = centerY + t * 200 - 100 + Math.sin(angle) * 30

        if (i === 0) ctx.beginPath()
        ctx.lineTo(x, y)
      }
      ctx.stroke()

      // Draw second strand
      ctx.strokeStyle = "rgba(6, 182, 212, 0.3)"
      for (let i = 0; i < numPoints; i++) {
        const t = i / numPoints
        const angle = t * Math.PI * 4 + time * 0.0005 + Math.PI
        const x = centerX + Math.cos(angle) * (radius + Math.sin(t * Math.PI * 2 + time * 0.0002) * amplitude)
        const y = centerY + t * 200 - 100 + Math.sin(angle) * 30

        if (i === 0) ctx.beginPath()
        ctx.lineTo(x, y)
      }
      ctx.stroke()

      // Draw connecting points
      ctx.fillStyle = "rgba(34, 211, 238, 0.6)"
      for (let i = 0; i < numPoints; i += 5) {
        const t = i / numPoints
        const angle1 = t * Math.PI * 4 + time * 0.0005
        const angle2 = t * Math.PI * 4 + time * 0.0005 + Math.PI
        const x1 = centerX + Math.cos(angle1) * (radius + Math.sin(t * Math.PI * 2 + time * 0.0002) * amplitude)
        const y1 = centerY + t * 200 - 100 + Math.sin(angle1) * 30
        const x2 = centerX + Math.cos(angle2) * (radius + Math.sin(t * Math.PI * 2 + time * 0.0002) * amplitude)
        const y2 = centerY + t * 200 - 100 + Math.sin(angle2) * 30

        ctx.strokeStyle = "rgba(59, 130, 246, 0.4)"
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()

        ctx.fillRect(x1 - 2, y1 - 2, 4, 4)
        ctx.fillRect(x2 - 2, y2 - 2, 4, 4)
      }

      animationId = requestAnimationFrame(drawDNA)
    }

    animationId = requestAnimationFrame(drawDNA)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 0.6
    }

    window.addEventListener("resize", handleResize)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated DNA Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-blue-950/40 to-slate-950/80" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-400/30 rounded-full">
          <Zap size={16} className="text-cyan-400" />
          <span className="text-sm text-cyan-400">Powered by Advanced AI Models</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-400 bg-clip-text text-transparent leading-tight">
          Evolving Intelligence
          <br />
          Empowering Innovation
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Bridge the gaps in proactive healthcare with AI-driven analysis combining DNA insights, diagnostic imaging,
          and clinical data for truly personalized medicine.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-cyan-400/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
            Start Analysis
            <ArrowRight size={20} />
          </button>
          <button className="px-8 py-4 border-2 border-cyan-400/50 text-cyan-300 rounded-lg font-semibold hover:bg-cyan-400/10 transition-all duration-300">
            View Demo
          </button>
        </div>

        {/* Stats */}
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
