"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "components/ui/card";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "components/ui/button";
import { projects } from "data/projects";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const DEFAULT_IMAGE_WIDTH = 1920;
const DEFAULT_IMAGE_HEIGHT = 1080;

function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  if (images.length === 1) {
    return (
      <div className="relative w-full aspect-[16/9]">
        <Image
          src={images[0]}
          alt={`${title} image`}
          fill
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div className="relative group w-full h-full">
      <Swiper spaceBetween={10} slidesPerView={1} className="w-full h-full">
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={src}
                alt={`${title} image ${idx + 1}`}
                fill
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute bottom-2 right-2 z-20 transition-opacity duration-300 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded pointer-events-none">
        Swipe →
      </div>
    </div>
  );
}

function AnimatedImageContainer({ hovered, children }: { hovered: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      animate={{ height: hovered ? "20rem" : "16rem" }}
      transition={{ duration: 0.3 }}
      className="w-full overflow-hidden"
    >
      {children}
    </motion.div>
  );
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="relative flex flex-col overflow-hidden bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-blue-500 transition-colors h-full">
        <AnimatedImageContainer hovered={hovered}>
          <ImageCarousel images={project.images} title={project.title} />
        </AnimatedImageContainer>
        <div className="flex flex-col justify-between p-6 flex-grow">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-gray-300 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            {project.github && (
              <Link href={project.github} target="_blank" passHref>
                <Button variant="outline" size="sm" asChild>
                  <a target="_blank">
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </a>
                </Button>
              </Link>
            )}
            {project.demo && (
              <Link href={project.demo} target="_blank" passHref>
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
        <div className="absolute top-2 right-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300 text-xs text-white bg-black bg-opacity-60 px-2 py-1 rounded pointer-events-none z-10">
          View Details
        </div>
      </Card>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section className="py-20 px-4" id="projects">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-white mb-2 text-center"
        >
          Technical Portfolio
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-sm text-gray-400 mb-8"
        >
          Hover or tap on a project to see more details and swipe through images.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
