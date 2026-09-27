"use client";

import React from "react";
import { ContactShadows } from "@react-three/drei";

interface SceneLightingProps {
  atmosphereColor?: string;
  accentColor?: string;
}

export function SceneLighting({
  atmosphereColor = "#374635",
  accentColor = "#B9955A",
}: SceneLightingProps) {
  return (
    <>
      {/* Ambient base light */}
      <ambientLight intensity={0.7} color="#FFFDF8" />

      {/* Hemisphere light for warm ceiling vs earth ground contrast */}
      <hemisphereLight
        args={["#FFFDF8", atmosphereColor, 0.8]}
        position={[0, 15, 0]}
      />

      {/* Key light casting soft shadow */}
      <directionalLight
        position={[4, 7, 5]}
        intensity={1.4}
        color="#FFFBF0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* Warm Fill Light */}
      <directionalLight
        position={[-4, 3, 3]}
        intensity={0.6}
        color="#F6E7D0"
      />

      {/* Rim light highlighting box edges */}
      <spotLight
        position={[0, 6, -5]}
        intensity={1.2}
        color={accentColor}
        angle={0.6}
        penumbra={0.8}
      />

      {/* Soft floor contact shadow */}
      <ContactShadows
        position={[0, -0.65, 0]}
        opacity={0.65}
        scale={6}
        blur={2}
        far={2}
        color="#152018"
      />
    </>
  );
}
