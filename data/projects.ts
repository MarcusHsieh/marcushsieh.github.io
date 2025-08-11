import { Project } from "types";
import { getProjectMedia } from "lib/mediaLoader";

// Helper function to create a project with standardized structure
function createProject({
  title,
  description,
  longDescription,
  images = [],
  videoUrl,
  github = "",
  demo = "",
  tags = [],
  hackathon,
}: {
  title: string;
  description: string;
  longDescription?: string;
  images?: string[];
  videoUrl?: string;
  github?: string;
  demo?: string;
  tags?: string[];
  hackathon?: {
    event: string;
    achievement: string;
  };
}): Project {
  const baseProject: Project = {
    title,
    description: hackathon ? `${description} ${hackathon.achievement} at ${hackathon.event}` : description,
    longDescription,
    images,
    media: getProjectMedia(title.toLowerCase().replace(/[\s-]+/g, '-')),
    github,
    demo,
    tags,
  };

  // Add video to media if provided
  if (videoUrl && baseProject.media) {
    baseProject.media.push({
      type: 'video',
      src: videoUrl,
      alt: `${title} video demonstration`
    });
  }

  return baseProject;
}

export const projects: Project[] = [
  // Recent Hackathon Projects
  createProject({
    title: "NavAid",
    description: "Visually impaired navigation system with 2D LiDAR obstacle detection and LED belt warnings.",
    longDescription: "Best Overall Hack Runnerup at UC Irvine VenusHacks 2025 for visually impaired navigation system. Integrated 2D LiDAR with threshold-based obstacle detection, 8m max, triggering LED belt warnings within 1m proximity. Implemented complementary filter for IMU drift correction, achieving stable orientation tracking. Designed modular ROS pipeline processing multi-sensor data via UART and I2C using onboard computation.",
    images: [],
    github: "https://github.com/MarcusHsieh/NavAid",
    tags: ["Jetson Nano", "ROS2", "C++", "Python", "LiDAR", "IMU", "UART", "I2C"],
    hackathon: {
      event: "UC Irvine VenusHacks 2025",
      achievement: "Best Overall Hack Runnerup"
    }
  }),

  createProject({
    title: "Kerminator",
    description: "A Kermit hand puppet transformed into smart robotic companion. Features smart tracking, responsive movement, and verbal conversational AI.",
    longDescription: "The Kerminator project transforms a simple Kermit hand puppet into an intelligent robotic companion with advanced AI capabilities. The system integrates computer vision for object tracking, servo motors for realistic head and arm movements, and conversational AI for natural interactions. Built on Raspberry Pi with custom I2C communication protocols, the robot can engage in conversations using Whisper for speech recognition and Tortoise TTS for voice synthesis, powered by a local Llama 2 7B model for intelligent responses. Built speech pipeline processing audio through Whisper STT, LLaMA-2 NLP, and Tortoise TTS achieving <15s latency. Designed 3D-printed skeletal framework with synchronized servo control via I2C for realistic animations. Trained custom Kermit voice model using Tortoise TTS with curated audio dataset for character-specific speech generation.",
    images: [], 
    github: "https://github.com/MarcusHsieh/Kerminator",
    tags: ["Raspberry Pi", "Python", "I2C", "3D Printing", "Whisper STT", "LLaMA-2", "Tortoise TTS", "PyTorch"],
    hackathon: {
      event: "UC Riverside Rose Hack 2025",
      achievement: "Hardware Track Winner"
    }
  }),

  // Major Projects
  createProject({
    title: "SpiderBot",
    description: "Complete hexapod robot with 6-leg 4-bar linkage system, distributed control architecture, and advanced sensor integration.",
    longDescription: "Designed complete chassis in SOLIDWORKS featuring 6-leg 4-bar linkage system, implementing tolerance analysis for threads and joint clearances, with assembly modeling to verify component fit. Manufactured and assembled complete hexapod through 50+ hours of 3D printing and 15+ hours of careful mechanical assembly including heat-pressed threaded inserts and fastening all components. Engineered distributed control architecture with K64F to ESP32, implementing 3-byte SPI protocol for real-time control. Designed 12-servo coordination system using PCA9685 PWM driver controlled by ESP32 for tripod gait locomotion. Implemented MPU6050 IMU with Mahony AHRS filter (10Hz), dual VL53L0X ToF sensors for obstacle detection (30-2000mm range), and ADC photoresistor for time-of-day detection.",
    images: [],
    github: "https://github.com/MarcusHsieh/SpiderBot",
    tags: ["C", "K64F", "ESP32", "PCA9685", "SPI", "I2C", "UART", "SOLIDWORKS", "3D Printing"],
  }),

  createProject({
    title: "Bin Boy",
    description: "Fully autonomous trash can with computer vision-based person tracking and voice command system.",
    longDescription: "Developing fully autonomous trash can with computer vision-based person tracking housed in custom 3D-printed chassis designed for sensor integration. Optimized computer vision pipeline using GStreamer and cv_bridge, achieving 30 FPS CPU-based person tracking with MobileNet-SSD, migrating to NVIDIA DeepStream for GPU acceleration. Implementing user-specific tracking via clothing recognition and gesture commands. Designing voice command system for hands-free operation with onboard processing.",
    images: [],
    github: "https://github.com/MarcusHsieh/bin-boy",
    tags: ["Jetson Nano", "ROS2", "C++", "Python", "ESP32", "PID Motor Control", "Computer Vision"],
  }),

  createProject({
    title: "MOLL-E Autonomous Shopping Cart",
    description: "Small-scale autonomous shopping cart with planned SLAM-based navigation and multi-sensor fusion.",
    longDescription: "Building small-scale autonomous shopping cart with planned SLAM-based navigation, modifying existing cart chassis with custom motor mounts and sensor integration. Integrating multi-sensor fusion (camera, ultrasonic, IMU) for obstacle avoidance and environmental mapping. Developing hybrid navigation system to support both pre-mapped routes and dynamic user following via BLE. Designed custom motor replacement system and sensor mounting solutions for commercial cart modification.",
    images: [], 
    github: "https://github.com/MarcusHsieh/MOLL-E",
    tags: ["Jetson Nano", "ROS2", "Python", "Docker", "ESP32", "BLE", "PID Control", "SLAM"],
  }),

  createProject({
    title: "Racer 3000",
    description: "Embedded Arduino racing game with dual LCD displays, optimized for memory-constrained hardware.",
    longDescription: "Custom Arduino racing game built entirely in C without external libraries. Features 480x320 SPI LCD for main display with optimized screen refreshing algorithms for fast frame rates. Includes joystick controls, secondary 2x16 character LCD (1602) for score display controlled via shift register for pin expansion, and passive buzzer for car sound effects. Extensively optimized for Arduino's limited memory constraints while maintaining smooth gameplay performance.",
    images: [],
    github: "",
    tags: ["Arduino", "C", "SPI", "LCD", "Embedded Systems", "Memory Optimization", "Game Development", "Shift Register"],
  }),

  // AI/ML Projects
  createProject({
    title: "YumTogether",
    description: "Privacy-first health counseling platform using containerized local LLM, avoiding cloud data exposure.",
    longDescription: "Architected privacy-first health counseling platform using containerized local LLM, avoiding cloud data exposure. Reduced sensitive data transmission through Docker-based Ollama deployment with local inference. A solution to circumvent data security concerns in AI-assisted health counseling, featuring a containerized local LLM for secure data handling.",
    images: [], 
    github: "https://github.com/MarcusHsieh/yum-together",
    tags: ["TypeScript", "Docker", "Ollama", "React", "Next.js", "SQLite"],
    hackathon: {
      event: "2024 UCF Artificial Intelligence in Medicine Summit",
      achievement: "1st Place Research Poster"
    }
  }),

  createProject({
    title: "Moonify",
    description: "A gesture-based Spotify carplay device, utilizing OpenCV, Python, and the Spotify API to control song playback.",
    images: [], 
    github: "https://github.com/MarcusHsieh/Moonify",
    tags: ["OpenCV", "Python", "Spotify API", "STM32", "ESP8266"],
    hackathon: {
      event: "UCR Cutie Hack 2024",
      achievement: "2nd place"
    }
  }),

  // Development Tools
  createProject({
    title: "Labeling Tool",
    description: "A labeling tool for intuitive annotation of image datasets with bounding boxes and classification tags, streamlining dataset preparation for computer vision projects.",
    images: [], 
    github: "https://github.com/MarcusHsieh/Labeling-Tool",
    tags: ["Computer Vision", "Python", "PyQt", "Bounding Box", "Classification"],
  }),

  createProject({
    title: "Raspberry Pi Wi-Fi Router",
    description: "A customizable Raspberry Pi-based Wi-Fi router with a built-in web interface for managing connections. Supports both WPA2 Enterprise and standard WPA2 networks.",
    images: [], 
    github: "https://github.com/MarcusHsieh/rpi-wifi-router",
    tags: ["Python", "Flask", "Raspberry Pi", "HTML", "CSS"],
  }),

  // Games & Software
  createProject({
    title: "Chess Crusaders",
    description: "A fully published ASCII chess fighting game, implementing SOLID principles and advanced OOP, optimized with data structures and algorithms.",
    longDescription: "Architected and deployed combat-enhanced chess game using object-oriented design and SOLID principles, refactoring initial design to fix SRP and DIP violations through proper class separation and dependency injection. Implemented comprehensive test suite achieving 93% line coverage and 100% function coverage across 50 functions using Google Test framework, with automated gcov/lcov reporting and Valgrind memory debugging in CI/CD pipeline. Led 4-person team using Agile methodology, implementing complex turn-based combat system with RNG mechanics.",
    images: [], 
    github: "https://github.com/MarcusHsieh/Chess-Crusaders",
    tags: ["C++", "CMake", "Google Test", "Valgrind", "CI/CD"],
  }),

  // Engineering Tools
  createProject({
    title: "FSAE Airfoil Wing Generator",
    description: "A computational tool for designing and analyzing airfoil wings for Formula SAE cars, optimized for aerodynamics and structural performance.",
    images: [],
    github: "https://github.com/MarcusHsieh/fsae-airfoil-wing-generator_v1",
    tags: ["Python", "Matplotlib", "Aerodynamics", "Data Analysis"],
  }),
];