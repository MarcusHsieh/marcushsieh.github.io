"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "components/ui/badge";
import { Button } from "components/ui/button";
import { X, Github, ExternalLink, ZoomIn, ZoomOut, Play, Grid3X3, ChevronLeft, ChevronRight, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Project, MediaItem } from "types";

// Utility function to convert YouTube URL to embed URL
const getYouTubeEmbedUrl = (url: string): string => {
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  } else if (url.includes('youtube.com/watch')) {
    const videoId = new URL(url).searchParams.get('v');
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  } else if (url.includes('youtube.com/shorts/')) {
    const videoId = url.split('/shorts/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return url;
};

const isYouTubeUrl = (url: string): boolean => {
  return url.includes('youtube.com') || url.includes('youtu.be');
};

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

// Removed ViewMode types as we're using gallery only

function GalleryViewer({ 
  mediaItems, 
  onImageClick, 
  onZoom 
}: { 
  mediaItems: MediaItem[], 
  onImageClick: (index: number) => void,
  onZoom: (src: string, alt: string) => void
}) {
  const handleVideoClick = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.stopPropagation();
    const video = e.currentTarget;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {mediaItems.map((media, index) => (
        <motion.div 
          key={index} 
          className="relative aspect-[4/3] cursor-pointer group rounded-lg overflow-hidden bg-gray-800"
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            if (media.type === 'image') {
              onZoom(media.src, media.alt || '');
            }
          }}
        >
          {media.type === 'image' ? (
            <>
              <Image
                src={media.src}
                alt={media.alt || ''}
                fill
                className="object-cover transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <Button
                  variant="secondary" 
                  size="sm"
                  className="h-8 w-8 p-0 bg-black/50 hover:bg-black/70"
                  onClick={(e) => {
                    e.stopPropagation();
                    onZoom(media.src, media.alt || '');
                  }}
                >
                  <ZoomIn className="w-3 h-3 text-white" />
                </Button>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </>
          ) : (
            <>
              {isYouTubeUrl(media.src) ? (
                <iframe
                  src={getYouTubeEmbedUrl(media.src)}
                  className="w-full h-full object-cover"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={media.src}
                  poster={media.thumbnail}
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                  onClick={handleVideoClick}
                />
              )}
              <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1 pointer-events-none">
                <Play className="w-3 h-3" />
                {isYouTubeUrl(media.src) ? 'YouTube' : 'Video'}
              </div>
            </>
          )}
        </motion.div>
      ))}
    </div>
  );
}

function MediaViewer({ 
  mediaItems, 
  currentIndex, 
  onNext, 
  onPrev,
  onZoom 
}: { 
  mediaItems: MediaItem[], 
  currentIndex: number,
  onNext: () => void,
  onPrev: () => void,
  onZoom: () => void
}) {
  const currentMedia = mediaItems[currentIndex];
  
  if (!currentMedia) return null;

  return (
    <div className="relative group">
      {currentMedia.type === 'image' ? (
        <div className="relative w-full h-[40vh] bg-gray-900 rounded-lg overflow-hidden cursor-zoom-in flex items-center justify-center" onClick={onZoom}>
          <Image
            src={currentMedia.src}
            alt=""
            fill
            className="object-contain hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            style={{ maxHeight: '100%', maxWidth: '100%' }}
          />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-black/50 rounded-full p-1">
            <ZoomIn className="w-4 h-4 text-white" />
          </div>
        </div>
      ) : (
        <div className="relative w-full h-[40vh] bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
          {isYouTubeUrl(currentMedia.src) ? (
            <iframe
              src={getYouTubeEmbedUrl(currentMedia.src)}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={currentMedia.src}
              poster={currentMedia.thumbnail}
              controls
              className="w-full h-full object-contain"
              preload="metadata"
            />
          )}
          <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
            <Play className="w-3 h-3" />
            {isYouTubeUrl(currentMedia.src) ? 'YouTube' : 'Video'}
          </div>
        </div>
      )}
      
      {mediaItems.length > 1 && (
        <>
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 rounded-full p-2 z-20"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 rounded-full p-2 z-20"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            disabled={currentIndex === mediaItems.length - 1}
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </>
      )}
    </div>
  );
}

function ZoomModal({ 
  src, 
  alt, 
  isOpen, 
  onClose 
}: { 
  src: string, 
  alt: string, 
  isOpen: boolean, 
  onClose: () => void 
}) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [viewportPosition, setViewportPosition] = useState({ scrollY: 0, innerHeight: 0 });

  // Calculate viewport position when zoom modal opens
  React.useEffect(() => {
    if (isOpen) {
      setViewportPosition({
        scrollY: window.scrollY,
        innerHeight: window.innerHeight
      });
    }
  }, [isOpen]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoom = (direction: 'in' | 'out') => {
    const newScale = direction === 'in' ? Math.min(scale * 1.5, 4) : Math.max(scale / 1.5, 1);
    setScale(newScale);
    if (newScale === 1) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleDoubleClick = () => {
    if (scale === 1) {
      handleZoom('in');
    } else {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoom('in');
    } else {
      handleZoom('out');
    }
  };

  const zoomModalContent = (
    <AnimatePresence>
      {isOpen && (
        <div 
          style={{ 
            position: 'fixed', 
            top: `${viewportPosition.scrollY}px`,
            left: 0, 
            width: '100vw',
            height: `${viewportPosition.innerHeight}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: `${viewportPosition.scrollY}px`,
              left: 0,
              width: '100vw',
              height: `${viewportPosition.innerHeight}px`,
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              zIndex: 9998
            }}
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '95vw', maxHeight: '95vh', zIndex: 10000 }}
          >
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleZoom('in')}
              disabled={scale >= 4}
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleZoom('out')}
              disabled={scale <= 1}
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <div className="text-white text-sm bg-black/50 px-2 py-1 rounded">
              {Math.round(scale * 100)}%
            </div>
          </div>
          <motion.div
            animate={{ 
              scale,
              x: position.x,
              y: position.y
            }}
            transition={{ duration: isDragging ? 0 : 0.2 }}
            className={`relative max-w-full max-h-full ${scale > 1 ? 'cursor-move' : 'cursor-zoom-in'} select-none`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onDoubleClick={handleDoubleClick}
            onWheel={handleWheel}
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          >
            <Image
              src={src}
              alt=""
              width={1920}
              height={1080}
              className="max-w-full max-h-full object-contain pointer-events-none"
              style={{ maxWidth: '90vw', maxHeight: '90vh' }}
            />
          </motion.div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded">
              {scale === 1 ? 'Double-click to zoom • Mouse wheel to zoom' : 'Drag to pan • Double-click to reset'}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return typeof window !== 'undefined' ? createPortal(zoomModalContent, document.body) : null;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [zoomImage, setZoomImage] = useState<{ src: string; alt: string } | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [viewportPosition, setViewportPosition] = useState({ scrollY: 0, innerHeight: 0 });
  // Removed viewMode state - using gallery only

  // Ensure we're on client side
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculate viewport position when modal opens
  React.useEffect(() => {
    if (isOpen && isMounted) {
      const updateViewportPosition = () => {
        setViewportPosition({
          scrollY: window.scrollY,
          innerHeight: window.innerHeight
        });
      };

      updateViewportPosition();
      
      // Optional: Update if user scrolls while modal is open
      // window.addEventListener('scroll', updateViewportPosition);
      // return () => window.removeEventListener('scroll', updateViewportPosition);
    }
  }, [isOpen, isMounted]);

  // Reset modal state when modal opens/closes or project changes
  React.useEffect(() => {
    if (isOpen && project) {
      setCurrentMediaIndex(0);
      setZoomImage(null); // Clear any previous zoom modal state
    }
  }, [isOpen, project]); // Reset when project changes

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Also clear zoom modal when main modal closes
      setZoomImage(null);
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close modal on Escape key
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (zoomImage) {
          // If zoom modal is open, close it first
          setZoomImage(null);
        } else if (isOpen) {
          // If main modal is open, close it
          onClose();
        }
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, zoomImage]);

  if (!project) return null;

  // Convert legacy images to media format for backward compatibility
  const mediaItems: MediaItem[] = project.media || project.images.map(img => ({
    type: 'image' as const,
    src: img,
    alt: `${project.title} image`
  }));

  const handleNext = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const handlePrev = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  const handleZoom = (src?: string, alt?: string) => {
    if (src && alt !== undefined) {
      // Direct zoom from gallery
      setZoomImage({ src, alt });
    } else {
      // Zoom from slideshow
      const currentMedia = mediaItems[currentMediaIndex];
      if (currentMedia.type === 'image') {
        setZoomImage({ src: currentMedia.src, alt: currentMedia.alt || '' });
      }
    }
  };

  // Simplified handleImageClick for compatibility - no longer used directly
  const handleImageClick = (index: number) => {
    setCurrentMediaIndex(index);
  };

  if (!isMounted) {
    return null;
  }

  const modalContent = (
    <>
      <AnimatePresence>
        {isOpen && (
          <div 
            style={{ 
              position: 'fixed', 
              top: `${viewportPosition.scrollY}px`,
              left: '0px',
              width: '100vw',
              height: `${viewportPosition.innerHeight}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              zIndex: 50
            }}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                top: `${viewportPosition.scrollY}px`,
                left: 0,
                width: '100vw',
                height: `${viewportPosition.innerHeight}px`,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(4px)',
                zIndex: 49
              }}
              onClick={onClose}
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl mx-2 sm:mx-0"
              onClick={(e) => e.stopPropagation()}
              style={{
                maxHeight: '90vh',
                maxWidth: '95vw',
                zIndex: 51
              }}
            >
              <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white"
                    onClick={onClose}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
          
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* Media Gallery */}
                <div className="space-y-4">
                  {/* Gallery Title */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Grid3X3 className="w-5 h-5" />
                      Media Gallery
                    </h3>
                  </div>

                  {/* Media Content - Gallery Only */}
                  <GalleryViewer
                    mediaItems={mediaItems}
                    onImageClick={handleImageClick}
                    onZoom={handleZoom}
                  />
                </div>

                {/* Project Details */}
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    {project.longDescription || project.description}
                  </p>
                  
                  {/* Hackathon Achievement */}
                  {project.hackathon && (
                    <div className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="w-5 h-5 text-yellow-400" />
                        <span className="text-yellow-400 font-semibold">
                          Hackathon Achievement
                        </span>
                      </div>
                      <p className="text-yellow-300 font-medium mb-1">
                        {project.hackathon.achievement}
                      </p>
                      <p className="text-yellow-300/80 text-sm">
                        {project.hackathon.event}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-blue-500/20 text-blue-400">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                    {project.github && (
                      <Button asChild variant="outline" className="w-full sm:w-auto">
                        <Link href={project.github} target="_blank">
                          <Github className="w-4 h-4 mr-2" />
                          View Code
                        </Link>
                      </Button>
                    )}
                    {project.demo && (
                      <Button asChild variant="outline" className="w-full sm:w-auto">
                        <Link href={project.demo} target="_blank">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Zoom Modal */}
      {zoomImage && (
        <ZoomModal
          src={zoomImage.src}
          alt={zoomImage.alt}
          isOpen={!!zoomImage}
          onClose={() => setZoomImage(null)}
        />
      )}
    </>
  );

  return createPortal(modalContent, document.body);
}