"use client";

import PageWrapper from "components/layout/PageWrapper";
import ParticleNetwork from "components/background/ParticleNetwork";
import Hero from "components/sections/Hero";
import Projects from "components/sections/Projects";
import Contact from "components/sections/Contact";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

export default function Home() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <PageWrapper>
      <ParticleNetwork />
      <main className="min-h-screen bg-gradient-to-b from-gray-900/90 via-gray-800/90 to-gray-900/90">
        <Hero />
        
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Projects />
        </motion.div>

        {/* <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Contact />
        </motion.div> */}
      </main>
    </PageWrapper>
  );
}