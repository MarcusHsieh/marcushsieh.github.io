"use client";

import { motion } from "framer-motion";
import { Card } from "components/ui/card";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "components/ui/button";
import { projects } from "data/projects";
import Image from "next/image";
import Link from "next/link";

export default function Projects() {
  return (
    <section className="py-20 px-4" id="projects">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-white mb-12 text-center"
        >
          Technical Portfolio
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="flex flex-col overflow-hidden bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-blue-500 transition-colors h-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={500}
                  height={192}
                  className="w-full h-48 object-cover"
                />
                <div className="flex flex-col justify-between p-6 flex-grow">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    {project.github && (
                      <Link href={project.github} passHref>
                        <Button variant="outline" size="sm" asChild>
                          <a target="_blank">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      </Link>
                    )}
                    {project.demo && (
                      <Link href={project.demo} passHref>
                        <Button variant="outline" size="sm" asChild>
                          <a target="_blank">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Demo
                          </a>
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
