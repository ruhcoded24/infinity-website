import React from 'react';
import { Terminal, Shield, Zap, Sparkles, Compass, Radio, ArrowRight, Cpu, Layers } from 'lucide-react';
import CyberBadge from '../common/CyberBadge';
import CyberButton from '../common/CyberButton';
import { UNIVERSES, REALM_KEYS } from '../../data/universesData';

export default function NexusHUD({
  hoveredRealmId,
  setHoveredRealmId,
  onSelectPortal,
  isWarping
}) {
  const activeUniverse = hoveredRealmId ? UNIVERSES[hoveredRealmId] : null;

  return (
    <div className="relative z-10 w-full h-full min-h-screen flex flex-col justify-between p-4 sm:p-8 pointer-events-none select-none">
      
      {/* Top Header Bar */}
      <header className="w-full flex items-center justify-between pointer-events-auto">
        {/* Brand Emblem */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0c0c1d] border border-[#00E5FF]/40 clip-cyber-corner flex items-center justify-center shadow-glow-cyan">
            <svg viewBox="0 0 100 100" className="w-7 h-7 stroke-[#00E5FF] fill-none stroke-[8]">
              <path d="M30,50 C15,30 0,70 30,70 C50,70 50,30 70,30 C100,30 85,70 70,70 C50,70 50,30 30,30" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-xl sm:text-2xl tracking-widest text-white">
                INFINITY
              </span>
              <span className="text-[#00E5FF] font-mono text-xs font-bold tracking-wider hidden sm:inline">
                // PORTAL NEXUS
              </span>
            </div>
            <p className="font-mono text-[10px] sm:text-xs text-slate-400">
              SGGSCC // UNIVERSITY OF DELHI
            </p>
          </div>
        </div>

        {/* System Telemetry Chips */}
        <div className="flex items-center gap-2 sm:gap-4 font-mono text-xs">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-[#0c0c1d]/80 border border-[#1f1f44] clip-cyber-badge text-slate-300">
            <Radio className="w-3.5 h-3.5 text-[#C6FF00] animate-pulse" />
            <span>CORE HARMONIC: 99.98%</span>
          </div>

          <CyberBadge color="cyan">
            GATEWAY ONLINE
          </CyberBadge>
        </div>
      </header>

      {/* Center Cinematic Title & Instruction */}
      <div className="my-auto text-center max-w-3xl mx-auto space-y-3 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#12122b]/60 border border-[#8B5CF6]/30 backdrop-blur-md font-mono text-xs text-[#C084FC]">
          <Compass className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span>MULTIVERSE RECOGNITION SYSTEM</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-wider text-white text-glow-cyan leading-tight">
          ONE SOCIETY. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#FF0055]">
            INFINITE WORLDS.
          </span>
        </h1>

        <div className="flex items-center justify-center gap-3 pt-2">
          <span className="w-8 h-[1px] bg-[#00E5FF]/60" />
          <p className="font-mono text-xs sm:text-sm tracking-widest text-[#00E5FF] uppercase font-bold animate-pulse">
            // SELECT YOUR DIMENSION //
          </p>
          <span className="w-8 h-[1px] bg-[#00E5FF]/60" />
        </div>
        
        <p className="text-xs sm:text-sm text-slate-400 font-sans max-w-lg mx-auto">
          Hover or tap any 3D portal ring to inspect its neural matrix, projects, and curriculum. Click to warp directly into the realm.
        </p>
      </div>

      {/* Floating Holographic Inspector on Hover */}
      {activeUniverse && (
        <div 
          className="fixed bottom-28 left-1/2 transform -translate-x-1/2 z-20 w-[92%] sm:w-[480px] bg-[#0c0c1d]/95 border p-5 clip-cyber-corner backdrop-blur-xl shadow-2xl transition-all duration-300 pointer-events-auto"
          style={{ borderColor: activeUniverse.color, boxShadow: `0 0 30px ${activeUniverse.glowColor}` }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: activeUniverse.color }} />
              <span className="font-mono text-xs tracking-wider uppercase font-bold" style={{ color: activeUniverse.color }}>
                {activeUniverse.codename}
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">STATUS: ACCESSIBLE</span>
          </div>

          <h3 className="font-display font-black text-xl text-white tracking-wide">
            {activeUniverse.name}
          </h3>

          <p className="font-mono text-xs text-slate-300 mt-1 mb-3">
            "{activeUniverse.tagline}"
          </p>

          <div className="grid grid-cols-2 gap-2 my-3 py-2 border-y border-[#1f1f44] text-[11px] font-mono text-slate-300">
            <div>
              <span className="text-slate-500 block">KEY FOCUS:</span>
              <span className="text-white">{activeUniverse.overview.focusAreas[0]}</span>
            </div>
            <div>
              <span className="text-slate-500 block">REALM MOTTO:</span>
              <span className="text-white italic">"{activeUniverse.motto}"</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] font-mono text-slate-400">
              CLICK PORTAL OR BUTTON TO WARP
            </span>
            <button
              onClick={() => onSelectPortal(activeUniverse.id)}
              className="px-4 py-1.5 font-display text-xs font-bold uppercase tracking-wider text-black clip-cyber-corner-sm flex items-center gap-1.5 hover:brightness-110 transition-all cursor-pointer"
              style={{ backgroundColor: activeUniverse.color }}
            >
              <span>WARP IN</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Dimensional Quick-Selector Strip */}
      <footer className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#1f1f44]/80 pointer-events-auto">
        <div className="font-mono text-xs text-slate-400 flex items-center gap-3">
          <span className="text-[#00E5FF]">DIMENSIONAL MATRIX:</span>
          <span className="hidden md:inline text-slate-500">5 ACTIVE GATES</span>
        </div>

        {/* 5 Dimensional Selector Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {REALM_KEYS.map((key) => {
            const u = UNIVERSES[key];
            const isActive = hoveredRealmId === u.id;
            return (
              <button
                key={u.id}
                onMouseEnter={() => setHoveredRealmId(u.id)}
                onMouseLeave={() => setHoveredRealmId(null)}
                onClick={() => onSelectPortal(u.id)}
                className={`px-3 py-1.5 font-display text-xs uppercase tracking-wider transition-all duration-200 clip-cyber-corner-sm border flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'text-white border-white scale-105'
                    : 'text-slate-300 bg-[#0c0c1d]/80 border-[#1f1f44] hover:border-slate-500'
                }`}
                style={{
                  backgroundColor: isActive ? u.color : undefined,
                  borderColor: isActive ? u.color : undefined,
                  color: isActive ? '#000000' : undefined,
                  boxShadow: isActive ? `0 0 15px ${u.glowColor}` : undefined
                }}
              >
                <span 
                  className="w-1.5 h-1.5 rounded-full" 
                  style={{ backgroundColor: isActive ? '#000000' : u.color }} 
                />
                <span>{u.id.toUpperCase()}</span>
              </button>
            );
          })}
        </div>

        <div className="font-mono text-xs text-slate-500 hidden sm:block">
          NAV: MOUSE DRAG / TOUCH INTERACTION
        </div>
      </footer>

    </div>
  );
}
