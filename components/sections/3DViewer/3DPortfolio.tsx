"use client";

import React, { useState, useEffect, useRef } from "react";
import GLBViewer from "components/sections/GLBViewer";
import { glbModels } from "data/glbModels";
import { Card } from "components/ui/card";
import { X } from "lucide-react"; 

export default function GLBPortfolio() {
  const [showTooltip, setShowTooltip] = useState(true);
  const [fadeOut, setFadeOut] = useState(false); 
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // auto-hide tooltip 
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
    <section className="py-16 px-4 bg-gray-900 relative w-full overflow-hidden">
      <div className="flex justify-center items-center relative mb-8">
        <h2 className="text-4xl font-bold text-white text-center relative">
          Mechanical Portfolio
        </h2>

        {/* tooltip notifs */}
        {showTooltip && (
          <div
            ref={tooltipRef}
            onClick={handleDismiss} 
            className={`absolute top-[3rem] left-1/2 transform -translate-x-1/2 mt-2 transition-opacity cursor-pointer ${
              fadeOut ? "opacity-0" : "opacity-90"
            }`}
          >
            <div className="relative bg-blue-500 text-white text-sm px-3 py-1 rounded-md shadow-md animate-soft-pulse">
              🖱️ You can interact with the 3D objects!
              <button
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleDismiss();
                }}
                className="absolute top-0 right-0 -mt-2 -mr-2 bg-blue-700 text-white rounded-full p-1 hover:bg-blue-600 transition-colors"
                aria-label="Dismiss tooltip"
              >
                <X size={12} />
              </button>
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-blue-500"></div>
            </div>
          </div>
        )}
      </div>

      {/* mechanical portfolio */}
      <div className="flex flex-wrap justify-center gap-8">
        {glbModels.map((model) => (
          <Card
            key={model.id}
            className="p-4 bg-gray-800 border border-gray-700 rounded-md max-w-md flex-1"
          >
            <h3 className="text-xl text-white font-semibold mb-2">{model.name}</h3>
            <p className="text-gray-400 mb-4">{model.description}</p>
            <div className="h-64 bg-gray-700 rounded-md overflow-hidden">
              <GLBViewer fileUrl={model.fileUrl} />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
