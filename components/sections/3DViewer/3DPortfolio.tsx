"use client";

import React, { useState, useEffect, useRef } from "react";
import GLBViewer from "components/sections/GLBViewer";
import { glbModels } from "data/glbModels";
import { Card } from "components/ui/card";
import { X } from "lucide-react";
import { motion } from "framer-motion";

export default function GLBPortfolio() {
  const [showTooltip, setShowTooltip] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleDismiss();
    }, 60000);
    return () => clearTimeout(timeout);
  }, []);

  const handleDismiss = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 500);
  };

  return (
    <section className="py-16 px-4 relative w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex justify-center items-center relative mb-8"
      >
        <h2 className="text-4xl font-bold text-white text-center">
          Mechanical Portfolio
        </h2>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-8">
        {glbModels.map((model, index) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="max-w-md flex-1"
          >
            <Card className="flex flex-col p-4 bg-gray-800 border border-gray-700 rounded-md overflow-hidden bg-gray-800/50 backdrop-blur-sm hover:border-blue-500 transition-colors h-full justify-start">
              <h3 className="text-xl text-white font-semibold mb-2">{model.name}</h3>
              <p className="text-gray-400 mb-4">{model.description}</p>
              <div className="h-64 bg-gray-700 rounded-md overflow-hidden mt-auto">
                <GLBViewer fileUrl={model.fileUrl} />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
