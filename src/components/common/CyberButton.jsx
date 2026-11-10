import React from 'react';

export default function CyberButton({
  children,
  variant = 'cyan',
  size = 'md',
  onClick,
  className = '',
  icon: Icon,
  href,
  ...props
}) {
  const baseStyles = "relative inline-flex items-center justify-center font-display uppercase tracking-wider font-bold transition-all duration-300 clip-cyber-corner-sm select-none cursor-pointer group";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3 text-base gap-3",
  };

  const variantStyles = {
    cyan: "bg-[#00E5FF] text-black hover:bg-[#38eeff] hover:shadow-glow-cyan active:translate-y-0.5",
    violet: "bg-[#8B5CF6] text-white hover:bg-[#9d74f7] hover:shadow-glow-violet active:translate-y-0.5",
    acid: "bg-[#C6FF00] text-black hover:bg-[#d4ff33] hover:shadow-glow-green active:translate-y-0.5",
    outlineCyan: "border border-[#00E5FF]/60 text-[#00E5FF] bg-[#00E5FF]/5 hover:bg-[#00E5FF]/20 hover:border-[#00E5FF] hover:shadow-glow-cyan",
    outlineViolet: "border border-[#8B5CF6]/60 text-[#8B5CF6] bg-[#8B5CF6]/5 hover:bg-[#8B5CF6]/20 hover:border-[#8B5CF6] hover:shadow-glow-violet",
    outlineAcid: "border border-[#C6FF00]/60 text-[#C6FF00] bg-[#C6FF00]/5 hover:bg-[#C6FF00]/20 hover:border-[#C6FF00] hover:shadow-glow-green",
  };

  const Component = href ? 'a' : 'button';

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant] || variantStyles.cyan} ${className}`}
      {...props}
    >
      {/* Corner Cyber Cut Highlight */}
      <span className="absolute top-0 right-0 w-2 h-2 bg-white/40 transform rotate-45 translate-x-1 -translate-y-1" />
      
      {Icon && <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />}
      <span>{children}</span>
    </Component>
  );
}
