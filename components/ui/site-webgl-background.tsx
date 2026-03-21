"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

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

function Monolith({ reduceMotion }: { reduceMotion: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) {
      return;
    }

    meshRef.current.rotation.y += reduceMotion ? delta * 0.04 : delta * 0.22;
  });

  return (
    <Float
      speed={reduceMotion ? 0.5 : 2}
      rotationIntensity={reduceMotion ? 0.12 : 0.5}
      floatIntensity={reduceMotion ? 0.2 : 1}
    >
      <mesh ref={meshRef} position={[17.5, -3.8, 0]}>
        <icosahedronGeometry args={[13, 1]} />
        <MeshDistortMaterial
          color="#0a0a0a"
          speed={reduceMotion ? 0.8 : 4}
          distort={reduceMotion ? 0.12 : 0.4}
          roughness={0.05}
          metalness={1}
        />
      </mesh>
    </Float>
  );
}

export function SiteWebglBackground() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 60], fov: 35 }}>
        <ambientLight intensity={0.32} />
        <spotLight position={[50, 50, 50]} intensity={2.4} />
        <LiquidBackground reduceMotion={reduceMotion} />
        <Monolith reduceMotion={reduceMotion} />
      </Canvas>
    </div>
  );
}
