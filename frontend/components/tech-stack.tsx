"use client"

import { useEffect, useRef } from "react"

const technologies = [
  { name: "React", icon: "⚛️", color: "from-blue-400 to-cyan-500" },
  { name: "Next.js", icon: "▲", color: "from-cyan-400 to-blue-500" },
  { name: "Tailwind CSS", icon: "🎨", color: "from-teal-400 to-blue-500" },
  { name: "Django", icon: "🐍", color: "from-blue-400 to-cyan-500" },
  { name: "Python", icon: "🐍", color: "from-cyan-400 to-teal-500" },
  { name: "PostgreSQL", icon: "🗄️", color: "from-blue-400 to-teal-500" },
  { name: "TensorFlow", icon: "📊", color: "from-cyan-400 to-blue-500" },
  { name: "CUDA", icon: "⚡", color: "from-blue-400 to-cyan-500" },
]

export default function TechStack() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-fade-in")
            }, index * 50)
          }
        })
      },
      { threshold: 0.1 },
    )

    const items = ref.current?.querySelectorAll(".tech-item")
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="tech" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 to-blue-950/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
            Built with Modern Tech
          </h2>
          <p className="text-gray-300 text-lg">Leveraging the latest technologies for performance and reliability</p>
        </div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="tech-item opacity-0 group relative p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-400/20 rounded-lg hover:border-cyan-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20 transform hover:scale-110 cursor-pointer text-center"
            >
              <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">{tech.icon}</div>
              <p className="font-semibold text-white text-sm">{tech.name}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/30 rounded-xl text-center">
          <p className="text-gray-300 text-lg mb-4">
            Seamless integration between frontend and backend for a cohesive healthcare experience
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
            <span className="text-cyan-400 font-semibold">Frontend Stack:</span>
            <span className="text-gray-300">React • Next.js • Tailwind CSS</span>
            <span className="hidden md:inline text-gray-500">|</span>
            <span className="text-cyan-400 font-semibold">Backend Stack:</span>
            <span className="text-gray-300">Django • Python • PostgreSQL</span>
          </div>
        </div>
      </div>
    </section>
  )
}
