"use client";

import React, { Suspense, memo, useRef, useEffect } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { Vector3, Box3 } from "three";
import { motion } from "framer-motion";

interface GLBViewerProps {
  fileUrl: string;
  ref?: React.RefObject<THREE.Object3D>;
}

const GLBModel = memo(({ fileUrl }: GLBViewerProps) => {
  const { scene } = useLoader(GLTFLoader, fileUrl);
  const modelRef = useRef<THREE.Object3D>(null);

  useEffect(() => {
    if (modelRef.current) {
      const box = new Box3().setFromObject(modelRef.current);
      const center = new Vector3();
      const size = new Vector3();

      box.getCenter(center);
      box.getSize(size);

      modelRef.current.position.set(-center.x, -center.y, -center.z);

      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 3 / maxDim;
      modelRef.current.scale.setScalar(scale);
    }
  }, [scene]);

  return <primitive ref={modelRef} object={scene} />;
});

GLBModel.displayName = "GLBModel";

function DynamicOrbitControls({ modelRef }: { modelRef: React.RefObject<THREE.Object3D> }) {
  const { camera } = useThree();

  useEffect(() => {
    if (modelRef.current) {
      const box = new Box3().setFromObject(modelRef.current);
      const size = new Vector3();
      box.getSize(size);

      const maxDim = Math.max(size.x, size.y, size.z);
      const cameraDistance = maxDim * 2;

      camera.position.set(cameraDistance, cameraDistance, cameraDistance);
      camera.lookAt(0, 0, 0);
    }
  }, [camera, modelRef]);

  return <OrbitControls target={[0, -1, 0]} autoRotate autoRotateSpeed={0.6} />;
}

export default function GLBViewer({ fileUrl }: GLBViewerProps) {
  const modelRef = useRef<THREE.Object3D>(null);

  return (
    <div className="w-full h-[500px] bg-gray-800 rounded-md overflow-hidden">
      <Canvas
        camera={{ position: [0, 2, 4] }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <GLBModel fileUrl={fileUrl} ref={modelRef} />
        </Suspense>
        <DynamicOrbitControls modelRef={modelRef} />
        <Environment preset="studio" background backgroundBlurriness={0.6} />
      </Canvas>
    </div>
  );
}
