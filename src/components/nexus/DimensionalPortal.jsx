import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export default function DimensionalPortal({
  universe,
  index,
  total = 5,
  radius = 5.2,
  isHovered = false,
  isSelected = false,
  onHover,
  onUnhover,
  onSelect,
}) {
  const groupRef = useRef();
  const ringRef = useRef();
  const discRef = useRef();
  const [internalHover, setInternalHover] = useState(false);

  // Position on circle around origin:
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const basePosition = [x, 0, z];

  const activeHover = isHovered || internalHover;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime + index * 1.5;

    // Smooth idle bobbing animation
    const idleY = Math.sin(time * 1.5) * 0.18;
    groupRef.current.position.y = idleY;

    // Face towards the center (or slightly tilted towards camera)
    groupRef.current.lookAt(0, 0, 0);

    // Inner vortex rotation
    if (discRef.current) {
      discRef.current.rotation.z += delta * (activeHover ? 2.5 : 0.8);
    }

    // Outer ring rotation
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * (activeHover ? 1.2 : 0.4);
    }

    // Hover scale interpolation
    const targetScale = isSelected ? 1.4 : activeHover ? 1.18 : 1.0;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8);
  });

  const portalColor = universe.color;

  return (
    <group
      ref={groupRef}
      position={basePosition}
      onPointerOver={(e) => {
        e.stopPropagation();
        setInternalHover(true);
        onHover && onHover(universe);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setInternalHover(false);
        onUnhover && onUnhover();
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect && onSelect(universe.id, groupRef.current.position);
      }}
    >
      {/* Outer Torus Portal Frame */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.05, 0.05, 16, 64]} />
        <meshStandardMaterial
          color={portalColor}
          emissive={portalColor}
          emissiveIntensity={activeHover ? 2.2 : 1.0}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Decorative Outer Runes Ring */}
      <mesh>
        <ringGeometry args={[1.15, 1.22, 32]} />
        <meshBasicMaterial
          color={portalColor}
          wireframe
          transparent
          opacity={activeHover ? 0.8 : 0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner Swirling Vortex Core Disk */}
      <mesh ref={discRef}>
        <circleGeometry args={[0.98, 32]} />
        <meshBasicMaterial
          color={portalColor}
          transparent
          opacity={activeHover ? 0.75 : 0.4}
          side={THREE.DoubleSide}
          wireframe={!activeHover}
        />
      </mesh>

      {/* Dimensional Glow Light */}
      <pointLight
        color={portalColor}
        intensity={activeHover ? 3.5 : 1.2}
        distance={4.5}
        decay={2}
      />

      {/* Portal Codename Label Floating Above */}
      <Text
        position={[0, 1.45, 0]}
        fontSize={0.16}
        color={activeHover ? "#ffffff" : portalColor}
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/orbitron/v31/yMJRMIlzdpvBhQQL_Qq7dy22.woff2"
      >
        {universe.realmTitle}
      </Text>

      {/* Sub-label */}
      <Text
        position={[0, -1.35, 0]}
        fontSize={0.11}
        color={activeHover ? portalColor : "#94a3b8"}
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/rajdhani/v15/L0x5DF4xlVxd-G6Mo9bJ-66K.woff2"
      >
        [ ENTER REALM ]
      </Text>
    </group>
  );
}
