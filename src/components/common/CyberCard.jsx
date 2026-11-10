import React from 'react';

export default function CyberCard({
  children,
  accent = 'cyan',
  className = '',
  hoverEffect = true,
}) {
  const accentBorders = {
    cyan: "hover:border-[#00E5FF]/60 hover:shadow-glow-cyan",
    violet: "hover:border-[#8B5CF6]/60 hover:shadow-glow-violet",
    acid: "hover:border-[#C6FF00]/60 hover:shadow-glow-green",
  };

  const cornerColors = {
    cyan: "border-[#00E5FF]",
    violet: "border-[#8B5CF6]",
    acid: "border-[#C6FF00]",
  };

  return (
    <div
      className={`relative bg-[#0c0c1d]/90 border border-[#1f1f44] p-6 transition-all duration-300 clip-cyber-corner backdrop-blur-md ${
        hoverEffect ? accentBorders[accent] || accentBorders.cyan : ''
      } ${className}`}
    >
      {/* Corner Brackets */}
      <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${cornerColors[accent] || cornerColors.cyan} opacity-70`} />
      <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${cornerColors[accent] || cornerColors.cyan} opacity-70`} />

      {/* Decorative cyber grid accent dots */}
      <div className="absolute top-2 right-3 flex space-x-1 opacity-30">
        <span className="w-1 h-1 bg-white rounded-full"></span>
        <span className="w-1 h-1 bg-white rounded-full"></span>
        <span className="w-1 h-1 bg-white rounded-full"></span>
      </div>

      {children}
    </div>
  );
}
