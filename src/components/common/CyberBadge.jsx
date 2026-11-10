import React from 'react';

export default function CyberBadge({
  children,
  color = 'cyan',
  pulse = true,
  className = '',
}) {
  const colorStyles = {
    cyan: {
      wrap: "border-[#00E5FF]/40 text-[#00E5FF] bg-[#00E5FF]/10",
      dot: "bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]",
    },
    violet: {
      wrap: "border-[#8B5CF6]/40 text-[#8B5CF6] bg-[#8B5CF6]/10",
      dot: "bg-[#8B5CF6] shadow-[0_0_8px_#8B5CF6]",
    },
    acid: {
      wrap: "border-[#C6FF00]/40 text-[#C6FF00] bg-[#C6FF00]/10",
      dot: "bg-[#C6FF00] shadow-[0_0_8px_#C6FF00]",
    },
  };

  const current = colorStyles[color] || colorStyles.cyan;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 font-mono text-xs uppercase tracking-widest border clip-cyber-badge ${current.wrap} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot} ${pulse ? 'animate-pulse' : ''}`} />
      <span>{children}</span>
    </div>
  );
}
