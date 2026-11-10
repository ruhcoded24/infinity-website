import React, { useEffect, useState } from 'react';

export default function WarpTransition({ universe, onComplete }) {
  const [stage, setStage] = useState('accelerating'); // 'accelerating' -> 'flash' -> 'complete'

  useEffect(() => {
    const t1 = setTimeout(() => {
      setStage('flash');
    }, 650);

    const t2 = setTimeout(() => {
      setStage('complete');
      onComplete && onComplete();
    }, 1100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  const realmColor = universe?.color || '#00E5FF';

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
      {/* Hyper-speed Radial Lines */}
      <div 
        className={`absolute inset-0 transition-opacity duration-300 ${
          stage === 'accelerating' ? 'opacity-90' : 'opacity-100'
        }`}
        style={{
          background: `radial-gradient(circle at center, transparent 10%, ${realmColor}22 40%, #070711 90%)`,
        }}
      />

      {/* Warp Tunnel Tunnel Effect */}
      <div className="absolute w-[200vw] h-[200vw] rounded-full border-[10px] border-white/20 animate-ping opacity-60" />
      <div 
        className="absolute w-[120vw] h-[120vw] rounded-full border-[6px] animate-ping opacity-75"
        style={{ borderColor: realmColor }} 
      />

      {/* Chromatic Flash Overlay */}
      {stage === 'flash' && (
        <div 
          className="absolute inset-0 bg-white transition-opacity duration-500 opacity-90 mix-blend-overlay"
        />
      )}

      {/* Holographic HUD Center Telemetry */}
      <div className="relative z-10 text-center space-y-2 p-6 bg-black/80 border border-white/20 clip-cyber-corner backdrop-blur-md">
        <div className="font-mono text-xs tracking-widest text-[#00E5FF] animate-pulse">
          // QUANTUM TRANSIT MATRIX //
        </div>
        <div className="font-display font-black text-2xl sm:text-3xl tracking-widest text-white uppercase">
          WARP PROTOCOL ENGAGED
        </div>
        <div className="font-mono text-sm tracking-wider uppercase" style={{ color: realmColor }}>
          ➔ ENTERING {universe?.realmTitle || 'THE UNKNOWN'}
        </div>
      </div>
    </div>
  );
}
