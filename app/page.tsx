"use client";

import PageWrapper from "components/layout/PageWrapper";
import Hero from "components/sections/Hero";
import Projects from "components/sections/Projects";
import Contact from "components/sections/Contact";
import GLBPortfolio from "components/sections/3DViewer/3DPortfolio";
import ParticleNetwork from "components/background/ParticleNetwork";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <PageWrapper>
      <main className="min-h-screen bg-gradient-to-b from-gray-900/90 via-gray-800/90 to-gray-900/90 relative z-10">
        
        {/* me */}
        <section id="hero" className="relative pt-16 scroll-mt-24 overflow-hidden">
          <ParticleNetwork />
          <Hero />
        </section>

        {/* technical */}
        <motion.section
          id="technical"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="relative overflow-hidden"
        >
          <ParticleNetwork />
          <Projects />
        </motion.section>

        {/* mechanical */}
        <motion.section
          id="mechanical"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1], delay: 0.2 }}
          className="relative overflow-hidden"
        >
          <ParticleNetwork />
          <GLBPortfolio />
        </motion.section>

        {/* contact */}
        <section id="contact" className="relative overflow-hidden">
          <ParticleNetwork />
          <Contact />
        </section>
      </main>
    </PageWrapper>
  );
}
