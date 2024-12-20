"use client";

import { motion } from "framer-motion";
import { Card } from "components/ui/card";
import { Github, Linkedin, Mail } from "lucide-react";
import SocialButton from "./SocialButton";
import { SocialLink } from "types";
import { fadeInUp } from "lib/animations";
import { profileConfig } from "config/profile";

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    icon: <Github className="w-5 h-5 mr-2" />,
    url: profileConfig.social.github,
  },
  {
    name: "LinkedIn",
    icon: <Linkedin className="w-5 h-5 mr-2" />,
    url: profileConfig.social.linkedin,
  },
  {
    name: "Email",
    icon: <Mail className="w-5 h-5 mr-2" />,
    url: `mailto:${profileConfig.social.email}`,
  },
];

export default function Contact() {
  return (
    <section className="py-20 px-4" id="contact">
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeInUp}>
          <Card className="p-8 bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Get In Touch</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              {socialLinks.map((social) => (
                <SocialButton key={social.name} social={social} />
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}