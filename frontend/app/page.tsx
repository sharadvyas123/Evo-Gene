"use client"

import { useEffect } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Features from "@/components/features"
import About from "@/components/about"
import TechStack from "@/components/tech-stack"
import CTA from "@/components/cta"
import Footer from "@/components/footer"

export default function Home() {
  useEffect(() => {
    // Add smooth scrolling
    document.documentElement.style.scrollBehavior = "smooth"
  }, [])

  return (
    <main className="bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <TechStack />
      <CTA />
      <Footer />
    </main>
  )
}
