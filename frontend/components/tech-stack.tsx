"use client";

import { useEffect, useRef } from "react";
import { Brain, Dna, Activity, MessagesSquare } from "lucide-react";

const services = [
  {
    name: "Brain Tumor Analysis",
    icon: <Brain className="w-10 h-10 text-cyan-400" />,
    desc: "Upload MRI scans and get AI-powered tumor segmentation and insights.",
  },
  {
    name: "Diabetes Prediction",
    icon: <Activity className="w-10 h-10 text-blue-400" />,
    desc: "Predict diabetes risk using medical factors and AI probability scoring.",
  },
  {
    name: "DNA-Based Insights",
    icon: <Dna className="w-10 h-10 text-purple-400" />,
    desc: "Analyze genetic markers to uncover personalized hereditary risks.",
  },
  {
    name: "AI Health Chatbot",
    icon: <MessagesSquare className="w-10 h-10 text-teal-400" />,
    desc: "24/7 intelligent chatbot for instant health support and guidance.",
  },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);

  // ✅ Fade-in animation like your original tech section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-fade-in");
            }, index * 80);
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = ref.current?.querySelectorAll(".service-item");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 to-blue-950/30"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-gray-300 text-lg">
            Explore EvoGene’s AI-powered diagnostic and predictive healthcare tools
          </p>
        </div>

        {/* Services Grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-item opacity-0 group p-7 bg-white/10 backdrop-blur-xl border border-cyan-400/20 rounded-2xl 
              hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 transition duration-300 text-center cursor-pointer"
            >
              <div className="mb-4 flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{service.name}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 p-8 bg-white/10 backdrop-blur-xl border border-cyan-400/20 rounded-xl text-center">
          <p className="text-gray-300 text-lg">
            EvoGene brings together diagnostics, genomics, and AI automation for a unified health experience.
          </p>
        </div>
      </div>
    </section>
  );
}
