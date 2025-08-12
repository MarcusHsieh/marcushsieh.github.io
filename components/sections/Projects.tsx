"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "components/ui/card";
import { Github, ExternalLink, Eye, ChevronLeft, ChevronRight, Video, Trophy } from "lucide-react";
import { Button } from "components/ui/button";
import { projects } from "data/projects";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';
import { useScrollDirection } from "hooks/useScrollDirection";
import { createDirectionalAnimation } from "lib/animations";
import ProjectModal from "components/modals/ProjectModal";
import { logOptimizationRecommendations } from "lib/mediaLoader";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const DEFAULT_IMAGE_WIDTH = 1920;
const DEFAULT_IMAGE_HEIGHT = 1080;

function ImageCarousel({ images, title, onClick, projectId }: { images: string[]; title: string; onClick?: () => void; projectId: string }) {
  const handleImageClick = (e: React.MouseEvent) => {
    // Only open modal if clicking on image area, not navigation controls
    if (onClick && !e.currentTarget.closest('.swiper-button-next, .swiper-button-prev, .swiper-pagination')) {
      onClick();
    }
  };

  if (images.length === 1) {
    return (
      <div className="relative w-full aspect-[4/3] cursor-pointer group" onClick={handleImageClick}>
        <Image
          src={images[0]}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    );
  }
  return (
    <div className="relative group w-full h-full">
      <Swiper 
        modules={[Navigation, Pagination]}
        spaceBetween={0} 
        slidesPerView={1} 
        navigation={{
          prevEl: `.custom-swiper-prev-${projectId}`,
          nextEl: `.custom-swiper-next-${projectId}`,
        }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true,
          el: `.custom-pagination-${projectId}`
        }}
        className={`w-full h-full project-swiper-${projectId}`}
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full aspect-[4/3] cursor-pointer" onClick={handleImageClick}>
              <Image
                src={src}
                alt=""
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom Navigation Buttons */}
      <button className={`custom-swiper-prev-${projectId} absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity`}>
        <ChevronLeft className="w-4 h-4 text-white" />
      </button>
      <button className={`custom-swiper-next-${projectId} absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity`}>
        <ChevronRight className="w-4 h-4 text-white" />
      </button>
      
      {/* Custom Pagination */}
      <div className={`custom-pagination-${projectId} absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20`}></div>
      
      <div className="absolute top-2 left-2 z-20 bg-black/70 text-white text-xs px-2 py-1 rounded">
        {images.length} {images.length === 1 ? 'image' : 'images'}
      </div>
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center pointer-events-none">
        <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
}

function AnimatedImageContainer({ hovered, children }: { hovered: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      animate={{ 
        height: hovered ? "22rem" : "16rem",
        scale: hovered ? 1.02 : 1
      }}
      transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
      className="w-full overflow-hidden rounded-t-lg"
    >
      {children}
    </motion.div>
  );
}

function ProjectCard({ project, scrollDirection, onOpenModal }: { 
  project: typeof projects[0]; 
  scrollDirection: 'up' | 'down' | null;
  onOpenModal: (project: typeof projects[0]) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const animation = createDirectionalAnimation(scrollDirection);
  const hasVideo = project.media?.some(item => item.type === 'video');
  
  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group"
      {...animation}
      whileHover={{ y: -8 }}
    >
      <Card className="relative flex flex-col overflow-hidden bg-gray-800/60 backdrop-blur-sm border-gray-700 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 h-full">
        <AnimatedImageContainer hovered={hovered}>
          <div className="relative">
            <ImageCarousel 
              images={project.media?.filter(m => m.type === 'image').map(m => m.src) || project.images} 
              title={project.title} 
              onClick={() => onOpenModal(project)}
              projectId={project.title.toLowerCase().replace(/\s+/g, '-')}
            />
            <div className="absolute top-2 right-2 flex flex-col gap-2 z-30">
              {project.hackathon && (
                <div className="bg-yellow-500/90 text-white p-1.5 rounded-full" title={`${project.hackathon.achievement} at ${project.hackathon.event}`}>
                  <Trophy className="w-4 h-4" />
                </div>
              )}
              {hasVideo && (
                <div className="bg-red-500/90 text-white p-1.5 rounded-full">
                  <Video className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>
        </AnimatedImageContainer>
        <div className="flex flex-col justify-between p-6 flex-grow">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-gray-300 mb-4">{project.description}</p>
            {project.hackathon && (
              <div className="mb-4 p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 font-semibold text-sm">
                    {project.hackathon.achievement}
                  </span>
                </div>
                <p className="text-yellow-300/80 text-xs mt-1">
                  {project.hackathon.event}
                </p>
              </div>
            )}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onOpenModal(project)}
              className="flex-1 min-w-fit"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
            {project.github && (
              <Button variant="outline" size="sm" asChild className="min-w-fit">
                <Link href={project.github} target="_blank">
                  <Github className="w-4 h-4 mr-1" />
                  Code
                </Link>
              </Button>
            )}
            {project.demo && (
              <Button variant="outline" size="sm" asChild className="min-w-fit">
                <Link href={project.demo} target="_blank">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Demo
                </Link>
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function Projects() {
  const scrollDirection = useScrollDirection();
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Log optimization recommendations in development
  React.useEffect(() => {
    logOptimizationRecommendations();
  }, []);

  const handleOpenModal = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <section className="py-8 sm:py-12 md:py-16 px-4" id="projects">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            {...createDirectionalAnimation(scrollDirection)}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 text-center"
          >
            Technical Portfolio
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-center text-sm text-gray-400 mb-8"
          >
            Click &quot;View Details&quot; for expanded gallery with zoom • Navigate images with arrows • Red video icon indicates demo video
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <ProjectCard 
                key={index} 
                project={project} 
                scrollDirection={scrollDirection}
                onOpenModal={handleOpenModal}
              />
            ))}
          </div>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
