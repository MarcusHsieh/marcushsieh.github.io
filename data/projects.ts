import { Project } from "types";

export const projects: Project[] = [
  {
    title: "Moonify",
    description: "A gesture-based Spotify carplay device, utilizing OpenCV, Python, and the Spotify API to control song playback. Won 2nd place at UCR Cutie Hack 2024.",
    images: ["/moonify/image-1.png", "/moonify/image-2.png", "/moonify/space.png"], 
    github: "https://github.com/MarcusHsieh/Moonify",
    demo: "",
    tags: ["OpenCV", "Python", "Spotify API", "STM32", "ESP8266"],
  },
  {
    title: "Kerminator",
    description: "A Kermit hand puppet transformed into smart robotic companion. Features smart tracking, responsive movement, and verbal conversational AI. Won Hardware Track at UCR Rose Hack 2025",
    images: ["/kerminator/image-2.png", "/kerminator/image-3.png", "/kerminator/image-4.png", "/kerminator/image-5.png", "/kerminator/image-6.png", "/kerminator/image.webp","/kerminator/image-1.png"], 
    github: "https://github.com/MarcusHsieh/Kerminator",
    demo: "",
    tags: ["Raspberry Pi", "Python", "I2C", "3D Printing", "Whisper", "Llama 2 7B", "Tortoise TTS"],
  },
  {
    title: "Labeling Tool",
    description: "A labeling tool for intuitive annotation of image datasets with bounding boxes and classification tags, streamlining dataset preparation for computer vision projects.",
    images: ["/labeling-tool/image-1.png", "/labeling-tool/image-2.png", "/labeling-tool/image-3.png", "/labeling-tool/image-4.png"], 
    github: "https://github.com/MarcusHsieh/Labeling-Tool",
    demo: "",
    tags: ["Computer Vision", "Python", "PyQt", "Bounding Box", "Classification"],
  },
  {
    title: "MOLL-E Autonomous Shopping Cart",
    description: "A small-scale autonomous shopping cart designed to navigate grocery stores, featuring 3D printed parts and sensor integration for obstacle avoidance.",
    images: ["/moll-e/shopping-cart.png"], 
    github: "",
    demo: "",
    tags: ["OpenCV", "Python", "Raspberry Pi", "Arduino", "3D Printing"],
  },
  {
    title: "Raspbery Pi Wi-Fi Router",
    description: "A customizable Raspberry Pi-based Wi-Fi router with a built-in web interface for managing connections. Supports both WPA2 Enterprise and standard WPA2 networks.",
    images: ["/wifi-router/wifi-router.jpg", "/wifi-router/image-1.png"], 
    github: "https://github.com/MarcusHsieh/rpi-wifi-router",
    demo: "",
    tags: ["Python", "Flask", "Raspberry Pi", "HTML", "CSS"],
  },
  {
    title: "YumTogether",
    description: "A solution to circumvent data security concerns in AI-assisted health counseling, featuring a containerized local LLM for secure data handling. Won 1st place research poster at the 2024 UCF Artificial Intelligence in Medicine Summit.",
    images: ["yum/image-1.png", "/yum/yum-together.png"], 
    github: "https://github.com/MarcusHsieh/yum-together",
    demo: "",
    tags: ["Docker", "React", "Next.js", "TailwindCSS", "SQLite"],
  },
  {
    title: "Chess Crusaders",
    description: "A fully published ASCII chess fighting game, implementing SOLID principles and advanced OOP, optimized with data structures and algorithms.",
    images: ["/chess-crusaders/chess-crusaders.png", "/chess-crusaders/image-1.png", "/chess-crusaders/image-2.png", "/chess-crusaders/image-3.png", "/chess-crusaders/image-4.png"], 
    github: "https://github.com/MarcusHsieh/Chess-Crusaders",
    demo: "",
    tags: ["C++", "CMake", "Google Test", "Valgrind"],
  },
  {
    title: "FSAE Airfoil Wing Generator",
    description: "A computational tool for designing and analyzing airfoil wings for Formula SAE cars, optimized for aerodynamics and structural performance.",
    images: ["/airfoil/E423.png"],
    github: "https://github.com/MarcusHsieh/fsae-airfoil-wing-generator_v1",
    demo: "",
    tags: ["Python", "Matplotlib", "Aerodynamics", "Data Analysis"],
  },
];