"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import ProfileInfo from "./ProfileInfo";
import { scaleIn } from "@/lib/animations";
import { profileConfig } from "@/config/profile";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <Card className="max-w-4xl w-full bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <motion.div {...scaleIn} className="p-8 text-center">
          <ProfileInfo {...profileConfig} />
        </motion.div>
      </Card>
    </section>
  );
}