"use client";

import { motion } from "framer-motion";
import { Avatar } from "components/ui/avatar";
import Image from "next/image";
import { fadeInUpDelayed } from "lib/animations";

interface ProfileInfoProps {
  imageUrl: string;
  name: string;
  title: string;
  university: string;
  description: string;
}

export default function ProfileInfo({
  imageUrl,
  name,
  title,
  university,
  description,
}: ProfileInfoProps) {
  return (
    <>
      <motion.div {...fadeInUpDelayed(0.2)} className="mb-8">
        <Avatar className="w-48 h-48 mx-auto mb-6 border-4 border-blue-500">
        <Image
            src={imageUrl}
            alt={name}
            className="object-cover"
            width={192}
            height={192}
          />
        </Avatar>
        <h1 className="text-4xl font-bold text-white mb-2">{name}</h1>
        <p className="text-xl text-blue-400">{title}</p>
        <p className="text-gray-400 mt-4">{university}</p>
      </motion.div>

      <motion.p
        {...fadeInUpDelayed(0.4)}
        className="text-gray-300 max-w-2xl mx-auto"
      >
        {description}
      </motion.p>
    </>
  );
}