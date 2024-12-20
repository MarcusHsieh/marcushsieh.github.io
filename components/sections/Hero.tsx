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
    <section className="min-h-screen flex items-center justify-center px-6 py-12">
      <Card className="max-w-4xl w-full bg-gray-800/60 backdrop-blur-sm border-gray-700 p-8 rounded-lg shadow-lg">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          {/* Profile Section */}
          <Avatar className="w-48 h-48 mx-auto mb-4 border-4 border-blue-500">
            <Image
              src={imageUrl}
              alt={`${name}'s Profile Picture`}
              className="object-cover rounded-full"
              width={256}
              height={256}
            />
          </Avatar>
          <div>
            <h1 className="text-4xl font-bold text-white">{name}</h1>
            <p className="text-xl text-blue-400">{title}</p>
            <p className="text-lg text-gray-300 mt-2 italic">{university}</p>
          </div>

          {/* Description Section */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto"
          >
            {description}
          </motion.p>

          {/* Social Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mt-6"
          >
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-gray-700/70 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-600 rounded-lg transition"
              >
                {social.icon}
                {social.name}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </Card>
    </section>
  );
}
