import { Project } from "types";

export const projects: Project[] = [
  {
    title: "Moonify",
    description: "A gesture-based Spotify carplay device, utilizing OpenCV, Python, and the Spotify API to control song playback. Won 2nd place at UCR Cutie Hack 2024.",
    image: "/space.png", 
    github: "https://github.com/MarcusHsieh/Moonify",
    demo: "",
    tags: ["OpenCV", "Python", "Spotify API", "STM32", "ESP8266"],
  },
  {
    title: "MOLL-E Autonomous Shopping Cart",
    description: "A small-scale autonomous shopping cart designed to navigate grocery stores, featuring 3D printed parts and sensor integration for obstacle avoidance.",
    image: "/shopping-cart.png", 
    github: "",
    demo: "",
    tags: ["OpenCV", "Python", "Raspberry Pi", "Arduino", "3D Printing"],
  },
  {
    title: "Raspbery Pi Wi-Fi Router",
    description: "A customizable Raspberry Pi-based Wi-Fi router with a built-in web interface for managing connections. Supports both WPA2 Enterprise and standard WPA2 networks.",
    image: "/wifi-router.jpg", 
    github: "https://github.com/MarcusHsieh/rpi-wifi-router",
    demo: "",
    tags: ["Python", "Flask", "Raspberry Pi", "HTML", "CSS"],
  },
  {
    title: "YumTogether",
    description: "A solution to circumvent data security concerns in AI-assisted health counseling, featuring a containerized local LLM for secure data handling. Won 1st place research poster at the 2024 UCF Artificial Intelligence in Medicine Summit.",
    image: "/yum-together.png", 
    github: "https://github.com/MarcusHsieh/yum-together",
    demo: "",
    tags: ["Docker", "React", "Next.js", "TailwindCSS", "SQLite"],
  },
  {
    title: "Chess Crusaders",
    description: "A fully published ASCII chess fighting game, implementing SOLID principles and advanced OOP, optimized with data structures and algorithms.",
    image: "/chess-crusaders.png", 
    github: "https://github.com/MarcusHsieh/Chess-Crusaders",
    demo: "",
    tags: ["C++", "CMake", "Google Test", "Valgrind"],
  },
  {
    title: "FSAE Airfoil Wing Generator",
    description: "A computational tool for designing and analyzing airfoil wings for Formula SAE cars, optimized for aerodynamics and structural performance.",
    image: "/E423.png",
    github: "https://github.com/MarcusHsieh/fsae-airfoil-wing-generator_v1",
    demo: "",
    tags: ["Python", "Matplotlib", "Aerodynamics", "Data Analysis"],
  },
];