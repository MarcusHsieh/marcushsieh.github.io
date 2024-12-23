"use client";

import { motion } from "framer-motion";
import { Card } from "components/ui/card";
import { Button } from "components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { Project } from "types";
import { fadeInScroll } from "lib/animations";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      {...fadeInScroll}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="w-full h-[400px]"
    >
      <Card className="overflow-hidden bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-blue-500 transition-colors h-full flex flex-col">
        {/* image */}
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            width={500}
            height={192}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400 text-sm">Image Unavailable</span>
          </div>
        )}
        
        {/* content */}
        <div className="p-6 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">
              {project.title}
            </h3>
            <p className="text-gray-300 mb-4 line-clamp-3">
              {project.description}
            </p>
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

          {/* buttons */}
          <div className="flex gap-4 mt-4">
            {project.github && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(project.github, "_blank")}
              >
                <Github className="w-4 h-4 mr-2" />
                Code
              </Button>
            )}
            {project.demo && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(project.demo, "_blank")}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Demo
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
