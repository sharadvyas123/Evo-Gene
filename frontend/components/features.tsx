"use client"

import { useEffect, useRef } from "react"
import { Dna, Zap, BarChart3, Shield, Clock, Brain } from "lucide-react"

const featureList = [
  {
    icon: Dna,
    title: "DNA Analysis",
    description:
      "Advanced genetic profiling to identify predispositions to diseases and optimal health interventions tailored to your biology.",
    color: "from-cyan-400 to-blue-500",
  },
  {
    icon: Brain,
    title: "Brain Tumor Screening",
    description: "AI-assisted diagnostic imaging analysis for early detection of brain tumors with 98% accuracy rate.",
    color: "from-blue-400 to-cyan-500",
  },
  {
    icon: BarChart3,
    title: "Diabetes Prediction",
    description: "Personalized risk assessment and management strategies based on genetics and lifestyle factors.",
    color: "from-cyan-400 to-teal-500",
  },
  {
    icon: Shield,
    title: "Data Security",
    description:
      "Enterprise-grade encryption and HIPAA compliance ensuring your health data remains completely secure.",
    color: "from-teal-400 to-blue-500",
  },
  {
    icon: Clock,
    title: "Instant Results",
    description: "Get comprehensive analysis results in under a second with our GPU-accelerated processing.",
    color: "from-blue-400 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Real-time Insights",
    description: "Continuous monitoring and updates to keep your health profile current and actionable.",
    color: "from-cyan-400 to-blue-500",
  },
]

export default function Features() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-fade-in")
            }, index * 100)
          }
        })
      },
      { threshold: 0.1 },
    )

    const cards = ref.current?.querySelectorAll(".feature-card")
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="features"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-950/30 to-slate-950"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
            Core Capabilities
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Experience the power of integrated health analysis with cutting-edge AI technology
          </p>
        </div>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureList.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="feature-card opacity-0 group p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-400/20 rounded-xl hover:border-cyan-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20 transform hover:scale-105 cursor-pointer"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-cyan-400/50 transition-all duration-300`}
                >
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
