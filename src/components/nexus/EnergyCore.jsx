import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function EnergyCore({ isWarping = false }) {
  const coreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const lightRef = useRef();

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const pulseSpeed = isWarping ? 8 : 2;

    // Breathing scale effect
    if (coreRef.current) {
      const scale = 1 + Math.sin(time * pulseSpeed) * 0.08;
      coreRef.current.scale.set(scale, scale, scale);
      coreRef.current.rotation.y += delta * 0.5;
      coreRef.current.rotation.z += delta * 0.2;
    }

    // Gyroscopic outer rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.4;
      ring1Ref.current.rotation.y = time * 0.6;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -time * 0.5;
      ring2Ref.current.rotation.z = time * 0.4;
    }

    // Dynamic light pulsation
    if (lightRef.current) {
      lightRef.current.intensity = 2.5 + Math.sin(time * pulseSpeed) * 1.0;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Dynamic central point light */}
      <pointLight ref={lightRef} color="#00E5FF" intensity={3} distance={14} decay={2} />
      <pointLight color="#8B5CF6" intensity={2} distance={10} decay={2} />

      {/* Inner glowing energy sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#8B5CF6"
          emissiveIntensity={1.8}
          roughness={0.1}
          metalness={0.9}
          wireframe={false}
        />
      </mesh>

      {/* Core crystalline outer wireframe */}
      <mesh>
        <octahedronGeometry args={[0.95, 1]} />
        <meshBasicMaterial
          color="#00E5FF"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Orbital Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.35, 0.02, 16, 64]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.65} />
      </mesh>

      {/* Orbital Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.65, 0.02, 16, 64]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.55} />
      </mesh>
    </group>
  );
}
