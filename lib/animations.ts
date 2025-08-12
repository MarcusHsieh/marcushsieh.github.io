import { MotionProps } from "framer-motion";

export const fadeInUp: MotionProps = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }
};

export const fadeInUpDelayed = (delay: number): MotionProps => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] }
});

export const scaleIn: MotionProps = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }
};

export const fadeInScroll: MotionProps = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }
};

export const staggerContainer: MotionProps = {
  initial: {},
  animate: {},
  transition: {
    staggerChildren: 0.1,
    delayChildren: 0.2
  }
};

export const slideInLeft: MotionProps = {
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }
};

export const slideInRight: MotionProps = {
  initial: { opacity: 0, x: 60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }
};

export const scaleInHover = {
  whileHover: { 
    scale: 1.05, 
    transition: { duration: 0.3, ease: [0.25, 0.4, 0.25, 1] } 
  },
  whileTap: { 
    scale: 0.95,
    transition: { duration: 0.1, ease: [0.25, 0.4, 0.25, 1] } 
  }
};

// Directional scroll animations based on scroll direction
export const createDirectionalAnimation = (scrollDirection: 'up' | 'down' | null) => {
  if (scrollDirection === 'down') {
    return {
      initial: { opacity: 0, y: 80 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.2 },
      transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }
    };
  } else if (scrollDirection === 'up') {
    return {
      initial: { opacity: 0, y: -80 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: false, amount: 0.2 }, // Re-animate when scrolling back up
      transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }
    };
  }
  
  // Fallback animation
  return {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }
  };
};