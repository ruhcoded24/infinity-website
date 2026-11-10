import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import CosmicParticles from './CosmicParticles';
import EnergyCore from './EnergyCore';
import DimensionalPortal from './DimensionalPortal';
import { UNIVERSES, REALM_KEYS } from '../../data/universesData';

function CameraRig({ isWarping, targetPosition }) {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (isWarping && targetPosition) {
      // Zoom camera smoothly into the portal
      gsap.to(camera.position, {
        x: targetPosition.x * 0.85,
        y: targetPosition.y * 0.85,
        z: targetPosition.z * 0.85,
        duration: 1.1,
        ease: "power3.inOut"
      });
      gsap.to(camera, {
        fov: 30,
        duration: 1.1,
        ease: "power3.inOut",
        onUpdate: () => camera.updateProjectionMatrix()
      });
    } else {
      // Return camera to default position
      gsap.to(camera.position, {
        x: 0,
        y: 2.5,
        z: 9.8,
        duration: 0.8,
        ease: "power2.out"
      });
      gsap.to(camera, {
        fov: 50,
        duration: 0.8,
        ease: "power2.out",
        onUpdate: () => camera.updateProjectionMatrix()
      });
    }
  }, [isWarping, targetPosition, camera]);

  useFrame(() => {
    if (!isWarping) {
      // Subtle mouse parallax
      camera.position.x += (mouse.current.x * 1.2 - camera.position.x) * 0.03;
      camera.position.y += (2.5 + mouse.current.y * 0.8 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
}

export default function PortalNexusCanvas({
  onSelectPortal,
  hoveredRealmId,
  setHoveredRealmId,
  isWarping,
  targetPortalPos
}) {
  return (
    <div className="absolute inset-0 z-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 2.5, 9.8], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ scene }) => {
          scene.fog = new THREE.FogExp2('#070711', 0.03);
        }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[0, 10, 5]} intensity={0.6} color="#ffffff" />

        {/* Dynamic Starfield & Floating Particles */}
        <CosmicParticles count={1400} isWarping={isWarping} />

        {/* Central Pulsating Multiverse Energy Core */}
        <EnergyCore isWarping={isWarping} />

        {/* 5 Dimensional Portals Arranged Radially */}
        {REALM_KEYS.map((key, index) => {
          const universe = UNIVERSES[key];
          return (
            <DimensionalPortal
              key={universe.id}
              universe={universe}
              index={index}
              total={REALM_KEYS.length}
              radius={5.4}
              isHovered={hoveredRealmId === universe.id}
              isSelected={isWarping && targetPortalPos && hoveredRealmId === universe.id}
              onHover={() => setHoveredRealmId(universe.id)}
              onUnhover={() => setHoveredRealmId(null)}
              onSelect={(id, pos) => onSelectPortal(id, pos)}
            />
          );
        })}

        {/* Smooth Camera Parallax & Zoom Rig */}
        <CameraRig isWarping={isWarping} targetPosition={targetPortalPos} />
      </Canvas>
    </div>
  );
}
