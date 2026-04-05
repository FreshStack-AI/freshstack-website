"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

function LiquidBackground({ reduceMotion }: { reduceMotion: boolean }) {
  const { viewport } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [],
  );

  useFrame((state) => {
    const { clock, mouse } = state;
    if (!materialRef.current) {
      return;
    }

    materialRef.current.uniforms.uTime.value = reduceMotion ? 0 : clock.getElapsedTime();

    if (!reduceMotion) {
      materialRef.current.uniforms.uMouse.value.lerp(mouse, 0.05);
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec2 uMouse;
          varying vec2 vUv;

          void main() {
            vec2 uv = vUv;
            float t = uTime * 0.15;
            vec2 m = uMouse * 0.1;

            float color = smoothstep(
              0.0,
              1.0,
              (sin(uv.x * 8.0 + t + m.x * 12.0) + sin(uv.y * 6.0 - t + m.y * 12.0)) * 0.5 + 0.5
            );

            gl_FragColor = vec4(mix(vec3(0.004), vec3(0.04), color), 1.0);
          }
        `}
      />
    </mesh>
  );
}

function ChainLink({
  position,
  rotation,
  scale,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <torusGeometry args={[5.7, 1.08, 48, 220]} />
      <meshPhysicalMaterial
        color="#202023"
        metalness={0.95}
        roughness={0.24}
        clearcoat={0.95}
        clearcoatRoughness={0.16}
        reflectivity={1}
      />
    </mesh>
  );
}

function LinkedForms({ reduceMotion }: { reduceMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    const t = state.clock.getElapsedTime();

    groupRef.current.rotation.y += reduceMotion ? delta * 0.045 : delta * 0.13;
    groupRef.current.rotation.x = reduceMotion
      ? -0.22
      : -0.22 + Math.sin(t * 0.35) * 0.045;
    groupRef.current.rotation.z = reduceMotion
      ? 0.18
      : 0.18 + Math.cos(t * 0.25) * 0.035;
  });

  return (
    <Float
      speed={reduceMotion ? 0.35 : 0.95}
      rotationIntensity={reduceMotion ? 0.04 : 0.12}
      floatIntensity={reduceMotion ? 0.08 : 0.2}
    >
      <group ref={groupRef} position={[16.8, 0.6, -2]}>
        <ChainLink
          position={[-4.9, -0.25, 0.1]}
          rotation={[1.2, 0.18, -0.74]}
          scale={[1.22, 2.05, 0.9]}
        />
        <ChainLink
          position={[4.8, 0.95, -0.4]}
          rotation={[1.05, -0.44, 0.68]}
          scale={[1.18, 1.96, 0.9]}
        />
      </group>
    </Float>
  );
}

export function SiteWebglBackground({ className }: { className?: string }) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none z-0", className)}
    >
      <Canvas camera={{ position: [0, 0, 60], fov: 35 }}>
        <ambientLight intensity={0.22} />
        <spotLight position={[38, 30, 48]} intensity={2.8} angle={0.38} penumbra={0.7} />
        <spotLight position={[18, -14, 34]} intensity={1.45} angle={0.42} penumbra={0.95} />
        <pointLight position={[12, 8, 16]} intensity={0.7} color="#f5f0e8" />
        <LiquidBackground reduceMotion={reduceMotion} />
        <LinkedForms reduceMotion={reduceMotion} />
      </Canvas>
    </div>
  );
}
