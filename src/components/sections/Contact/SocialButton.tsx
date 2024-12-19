"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SocialLink } from "@/types";

interface SocialButtonProps {
  social: SocialLink;
}

export default function SocialButton({ social }: SocialButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="w-full md:w-auto">
      <Button
        variant="outline"
        className="w-full md:w-auto bg-gray-700/50 hover:bg-gray-700 border-gray-600"
        onClick={() => window.open(social.url, "_blank")}
      >
        {social.icon}
        {social.name}
      </Button>
    </motion.div>
  );
}