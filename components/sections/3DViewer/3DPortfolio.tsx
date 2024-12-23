"use client";

import React from "react";
import GLBViewer from "components/sections/GLBViewer";
import { glbModels } from "data/glbModels";
import { Card } from "components/ui/card";

export default function GLBPortfolio() {
  return (
    <section className="py-16 px-4 bg-gray-900">
      <h2 className="text-4xl font-bold text-white text-center mb-8">3D Viewer</h2>
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
