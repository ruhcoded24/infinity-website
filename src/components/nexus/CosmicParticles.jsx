import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CosmicParticles({ count = 1200, isWarping = false }) {
  const meshRef = useRef();

  const [positions, colors, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sca = new Float32Array(count);

    const palette = [
      new THREE.Color('#8B5CF6'), // Violet
      new THREE.Color('#00E5FF'), // Cyan
      new THREE.Color('#C6FF00'), // Acid Green
      new THREE.Color('#FF0055'), // Crimson
      new THREE.Color('#FF6B00'), // Orange
      new THREE.Color('#ffffff')  // Pure Starlight
    ];

    for (let i = 0; i < count; i++) {
      // Cylindrical/spherical cosmic distribution
      const r = THREE.MathUtils.randFloat(3, 24);
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const y = THREE.MathUtils.randFloatSpread(16);

      pos[i * 3] = r * Math.cos(theta);
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = r * Math.sin(theta);

      const color = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;

      sca[i] = Math.random() * 1.5 + 0.5;
    }

    return [pos, col, sca];
  }, [count]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Normal ambient rotation vs hyper-warp acceleration
    const speed = isWarping ? delta * 3.5 : delta * 0.08;
    meshRef.current.rotation.y += speed;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;

    // Mouse parallax
    const targetX = state.pointer.x * 0.3;
    const targetY = state.pointer.y * 0.3;
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.04;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.04;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
