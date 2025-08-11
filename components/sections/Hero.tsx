"use client";

import { motion } from "framer-motion";
import { Avatar } from "components/ui/avatar";
import { Card } from "components/ui/card";
import Image from "next/image";
import { profileConfig } from "@/config/profile";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  const { name, title, university, description, imageUrl, social } = profileConfig;

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="w-6 h-6 mr-2" />,
      url: social.github,
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-6 h-6 mr-2" />,
      url: social.linkedin,
    },
    {
      name: "Email",
      icon: <Mail className="w-6 h-6 mr-2" />,
      url: `mailto:${social.email}`,
    },
  ];

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 py-8">
      <Card className="max-w-4xl w-full bg-gray-800/60 backdrop-blur-sm border-gray-700 p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center space-y-4 sm:space-y-6"
        >
          {/* Profile Section */}
          <Avatar className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-2 sm:mb-4 border-4 border-blue-500">
            <Image
              src={imageUrl}
              alt={`${name}'s Profile Picture`}
              className="object-cover rounded-full"
              width={256}
              height={256}
            />
          </Avatar>
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{name}</h1>
            <p className="text-lg sm:text-xl text-blue-400">{title}</p>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 mt-1 sm:mt-2 italic">{university}</p>
          </div>

          {/* desc */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto px-2 sm:px-0"
          >
            {description}
          </motion.p>

          {/* socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mt-4 sm:mt-6"
          >
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-2 bg-gray-700/70 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-600 rounded-lg transition min-w-[140px] sm:min-w-0"
              >
                <span className="w-6 h-6 mr-2 flex items-center justify-center">{social.icon}</span>
                <span className="text-sm sm:text-base">{social.name}</span>
              </a>
            ))}
          </motion.div>
        </motion.div>
      </Card>
    </section>
  );
}
