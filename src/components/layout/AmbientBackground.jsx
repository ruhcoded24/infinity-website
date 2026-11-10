import React from 'react';

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#070711]">
      {/* Background Cyber Grid Matrix */}
      <div 
        className="absolute inset-0 bg-cyber-grid opacity-30" 
        style={{ backgroundSize: '40px 40px' }} 
      />

      {/* Cyberpunk Radial Glow Auroras */}
      {/* 1. Violet Aurora (Top Left / Center) */}
      <div 
        className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full blur-[140px] opacity-25 mix-blend-screen"
        style={{ backgroundColor: '#8B5CF6' }}
      />

      {/* 2. Cyan Aurora (Center Right) */}
      <div 
        className="absolute top-[35%] -right-[15%] w-[50vw] h-[50vw] rounded-full blur-[150px] opacity-20 mix-blend-screen"
        style={{ backgroundColor: '#00E5FF' }}
      />

      {/* 3. Acid Green Aurora (Bottom Center / Accent) */}
      <div 
        className="absolute -bottom-[15%] left-[25%] w-[45vw] h-[45vw] rounded-full blur-[160px] opacity-15 mix-blend-screen"
        style={{ backgroundColor: '#C6FF00' }}
      />

      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 scanline-overlay opacity-40" />
    </div>
  );
}
