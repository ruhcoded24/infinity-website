import React, { useState } from 'react';
import { Palette, Check, Copy } from 'lucide-react';
import CyberCard from '../common/CyberCard';
import CyberBadge from '../common/CyberBadge';

export default function ColorPaletteHUD() {
  const [copiedHex, setCopiedHex] = useState(null);

  const colors = [
    {
      name: "CYBER BACKGROUND",
      hex: "#070711",
      role: "Base canvas & deep void foundation",
      textColor: "text-slate-400",
      accent: "cyan",
      border: "border-slate-700",
    },
    {
      name: "NEON VIOLET",
      hex: "#8B5CF6",
      role: "Quantum AI & neural network auroras",
      textColor: "text-[#8B5CF6]",
      accent: "violet",
      border: "border-[#8B5CF6]/50",
    },
    {
      name: "CYBER CYAN",
      hex: "#00E5FF",
      role: "High-voltage data telemetry & optics",
      textColor: "text-[#00E5FF]",
      accent: "cyan",
      border: "border-[#00E5FF]/50",
    },
    {
      name: "ACID GREEN",
      hex: "#C6FF00",
      role: "Terminal status alerts & cyber security indicators",
      textColor: "text-[#C6FF00]",
      accent: "acid",
      border: "border-[#C6FF00]/50",
    },
  ];

  const handleCopy = (hex) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <section className="relative py-16 sm:py-24 border-t border-[#1f1f44] bg-[#0c0c1d]/40" id="palette">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Palette className="w-4 h-4 text-[#C6FF00]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#C6FF00]">
                DESIGN SYSTEM ENGINE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-wide">
              CYBERPUNK CHROMATIC MATRIX
            </h2>
          </div>
          <p className="font-mono text-sm text-slate-400 max-w-md">
            Verified design system tokens configured in Tailwind CSS and application theme primitives.
          </p>
        </div>

        {/* Color Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {colors.map((c) => (
            <CyberCard key={c.hex} accent={c.accent} className="flex flex-col justify-between">
              <div>
                {/* Visual Swatch */}
                <div 
                  className={`w-full h-24 mb-4 rounded border ${c.border} relative overflow-hidden flex items-end p-3 shadow-inner`}
                  style={{ backgroundColor: c.hex }}
                >
                  <span className="font-mono text-xs px-2 py-0.5 bg-black/60 backdrop-blur rounded text-white uppercase tracking-wider">
                    {c.hex}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-display font-bold text-base text-white">
                    {c.name}
                  </h4>
                  <CyberBadge color={c.accent} pulse={false}>
                    TOKEN
                  </CyberBadge>
                </div>

                <p className="font-mono text-xs text-slate-400 mt-2 leading-relaxed">
                  {c.role}
                </p>
              </div>

              <button
                onClick={() => handleCopy(c.hex)}
                className="mt-6 w-full py-2 px-3 border border-[#1f1f44] bg-[#12122b] hover:bg-[#1f1f44] text-xs font-mono flex items-center justify-center gap-2 text-slate-300 hover:text-white transition-colors rounded-sm"
              >
                {copiedHex === c.hex ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#C6FF00]" />
                    <span className="text-[#C6FF00]">HEX COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY HEX ({c.hex})</span>
                  </>
                )}
              </button>
            </CyberCard>
          ))}
        </div>

        {/* Live Gradient Bar */}
        <div className="mt-8 p-4 bg-[#0c0c1d] border border-[#1f1f44] rounded clip-cyber-corner">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-2">
            <span>SYNTHESIS GRADIENT SPECTRUM</span>
            <span className="text-[#00E5FF]">#070711 ➔ #8B5CF6 ➔ #00E5FF ➔ #C6FF00</span>
          </div>
          <div 
            className="h-3 w-full rounded"
            style={{ 
              background: 'linear-gradient(90deg, #070711 0%, #8B5CF6 35%, #00E5FF 70%, #C6FF00 100%)' 
            }}
          />
        </div>

      </div>
    </section>
  );
}
