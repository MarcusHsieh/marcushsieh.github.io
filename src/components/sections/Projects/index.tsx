"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";
import { fadeInUp } from "@/lib/animations";

export default function Projects() {
  return (
    <section className="py-20 px-4" id="projects">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          {...fadeInUp}
          className="text-3xl font-bold text-white mb-12 text-center"
        >
          Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}