// @ts-nocheck
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const colors = {
  ink: "#000000",
  paper: "#FFFDF5",
  white: "#FFFFFF",
  red: "#FF6B6B",
  yellow: "#FFD93D",
  violet: "#C4B5FD"
};

function PanelRect({
  position,
  size,
  color,
  z = 0
}: {
  position: [number, number, number];
  size: [number, number];
  color: string;
  z?: number;
}) {
  return (
    <mesh position={[position[0], position[1], position[2] + z]}>
      <planeGeometry args={size} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function SearchBoard() {
  const scanRef = useRef<THREE.Mesh>(null);
  const markerRef = useRef<THREE.Group>(null);
  const accentRef = useRef<THREE.Mesh>(null);

  const bars = useMemo(
    () => [
      { x: -2.35, h: 0.9, color: colors.red },
      { x: -1.25, h: 1.35, color: colors.yellow },
      { x: -0.15, h: 1.95, color: colors.violet },
      { x: 0.95, h: 2.55, color: colors.red },
      { x: 2.05, h: 3.08, color: colors.yellow }
    ],
    []
  );

  const nodes = useMemo(
    () => [
      [-2.6, 1.3],
      [-1.45, 0.84],
      [-0.25, 1.08],
      [0.9, 0.42],
      [2.35, 0.78],
      [-2.1, -0.15],
      [-0.65, -0.35],
      [1.4, -0.05]
    ] as const,
    []
  );

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (scanRef.current) {
      scanRef.current.position.y = -1.55 + ((time * 0.42) % 3.1);
    }

    if (markerRef.current) {
      markerRef.current.position.x = -2.65 + ((time * 0.36) % 5.3);
    }

    if (accentRef.current) {
      accentRef.current.rotation.z = Math.sin(time * 0.45) * 0.08;
    }
  });

  return (
    <group scale={0.92} position={[0, -0.05, 0]}>
      <PanelRect position={[0.16, 0.1, -0.35]} size={[6.55, 3.85]} color={colors.ink} />
      <PanelRect position={[0, 0.25, -0.25]} size={[6.55, 3.85]} color={colors.white} />

      <PanelRect position={[0, -1.55, -0.12]} size={[5.9, 0.12]} color={colors.ink} />
      <PanelRect position={[-2.8, 1.72, -0.1]} size={[0.5, 0.12]} color={colors.ink} />
      <PanelRect position={[-2.1, 1.72, -0.1]} size={[0.5, 0.12]} color={colors.ink} />
      <PanelRect position={[-1.4, 1.72, -0.1]} size={[0.5, 0.12]} color={colors.ink} />

      {bars.map((bar) => (
        <group key={bar.x}>
          <PanelRect position={[bar.x + 0.13, -1.5 + bar.h / 2 - 0.13, -0.08]} size={[0.64, bar.h]} color={colors.ink} />
          <PanelRect position={[bar.x, -1.5 + bar.h / 2, 0]} size={[0.64, bar.h]} color={bar.color} />
        </group>
      ))}

      <group ref={markerRef} position={[-2.65, 0, 0.1]}>
        <PanelRect position={[0, 1.33, 0]} size={[0.22, 0.22]} color={colors.red} />
        <PanelRect position={[0, -0.22, 0]} size={[0.16, 2.92]} color={colors.ink} />
      </group>

      <mesh ref={scanRef} position={[0, -1.55, 0.13]}>
        <planeGeometry args={[5.92, 0.08]} />
        <meshBasicMaterial color={colors.ink} transparent opacity={0.55} />
      </mesh>

      {nodes.map(([x, y], index) => (
        <group key={`${x}-${y}`}>
          <PanelRect position={[x + 0.05, y - 0.05, 0.03]} size={[0.22, 0.22]} color={colors.ink} />
          <PanelRect position={[x, y, 0.09]} size={[0.22, 0.22]} color={index % 2 === 0 ? colors.violet : colors.yellow} />
        </group>
      ))}

      <mesh ref={accentRef} position={[2.35, 1.4, 0.14]}>
        <torusGeometry args={[0.48, 0.06, 12, 48]} />
        <meshBasicMaterial color={colors.ink} />
      </mesh>
    </group>
  );
}

export function HeroScene() {
  return (
    <div className="hero-canvas-frame noise-card relative h-[280px] w-full max-w-full contain-strict overflow-hidden border-4 border-black bg-[#FFFDF5] sm:h-[340px] lg:h-[420px]">
      <div className="pointer-events-none absolute inset-3 z-10 border-4 border-black" />
      <div className="pointer-events-none absolute left-5 top-5 z-20 border-4 border-black bg-[#FFD93D] px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-black sm:left-6 sm:top-6">
        Search Signals
      </div>
      <Canvas
        className="hero-canvas"
        dpr={1}
        frameloop="always"
        gl={{ antialias: false, alpha: false, powerPreference: "low-power" }}
        resize={{ scroll: false, debounce: { scroll: 100, resize: 100 } }}
        orthographic
        camera={{ position: [0, 0, 10], zoom: 70 }}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
      >
        <color attach="background" args={[colors.paper]} />
        <SearchBoard />
      </Canvas>
    </div>
  );
}
