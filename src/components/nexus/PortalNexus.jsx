import React, { useState, useEffect } from 'react';
import PortalNexusCanvas from './PortalNexusCanvas';
import NexusHUD from './NexusHUD';
import WarpTransition from '../transitions/WarpTransition';
import { UNIVERSES, REALM_KEYS } from '../../data/universesData';

// Helper to check WebGL availability
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}

export default function PortalNexus({ onEnterUniverse }) {
  const [hoveredRealmId, setHoveredRealmId] = useState(null);
  const [isWarping, setIsWarping] = useState(false);
  const [targetPortalPos, setTargetPortalPos] = useState(null);
  const [selectedUniverse, setSelectedUniverse] = useState(null);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    setWebGLSupported(isWebGLAvailable());
  }, []);

  const handleSelectPortal = (realmId, position) => {
    if (isWarping) return;
    const universe = UNIVERSES[realmId];
    setSelectedUniverse(universe);
    setIsWarping(true);
    setTargetPortalPos(position || { x: 0, y: 0, z: 0 });
  };

  const handleWarpComplete = () => {
    if (selectedUniverse) {
      onEnterUniverse(selectedUniverse.id);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#070711] select-none">
      
      {/* 3D WebGL Canvas or CSS 3D Fallback */}
      {webGLSupported ? (
        <PortalNexusCanvas
          onSelectPortal={handleSelectPortal}
          hoveredRealmId={hoveredRealmId}
          setHoveredRealmId={setHoveredRealmId}
          isWarping={isWarping}
          targetPortalPos={targetPortalPos}
        />
      ) : (
        /* CSS Fallback for Non-WebGL Environments */
        <div className="absolute inset-0 z-0 flex items-center justify-center p-8 bg-cyber-grid">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl z-10">
            {REALM_KEYS.map((key) => {
              const u = UNIVERSES[key];
              return (
                <div
                  key={u.id}
                  onClick={() => handleSelectPortal(u.id)}
                  className="bg-[#0c0c1d] border border-[#1f1f44] p-6 clip-cyber-corner hover:border-white transition-all cursor-pointer text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full border flex items-center justify-center"
                    style={{ borderColor: u.color }}
                  >
                    <span className="w-4 h-4 rounded-full" style={{ backgroundColor: u.color }} />
                  </div>
                  <h3 className="font-display font-bold text-white uppercase text-sm mb-1">
                    {u.name}
                  </h3>
                  <p className="font-mono text-xs text-slate-400">
                    {u.realmTitle}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Cyberpunk HUD Interface & Instructions */}
      <NexusHUD
        hoveredRealmId={hoveredRealmId}
        setHoveredRealmId={setHoveredRealmId}
        onSelectPortal={(id) => handleSelectPortal(id)}
        isWarping={isWarping}
      />

      {/* Full-Screen Warp Cinematic Transition */}
      {isWarping && (
        <WarpTransition
          universe={selectedUniverse}
          onComplete={handleWarpComplete}
        />
      )}

    </div>
  );
}
