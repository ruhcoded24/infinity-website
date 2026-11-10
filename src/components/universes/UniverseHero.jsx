import React from 'react';
import { ArrowLeft, Sparkles, Terminal, Activity, Zap, ExternalLink } from 'lucide-react';

export default function UniverseHero({ universe, onBackToNexus }) {
  const { color, secondaryColor, realmTitle, name, codename, tagline, motto, stats, overview } = universe;

  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-[#1f1f44]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top telemetry & Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToNexus}
              className="inline-flex items-center gap-2 px-3 py-1 bg-[#0c0c1d] border border-[#1f1f44] hover:border-white text-xs font-mono text-slate-300 clip-cyber-badge hover:text-white transition-all cursor-pointer group"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#00E5FF] group-hover:-translate-x-1 transition-transform" />
              <span>RETURN TO PORTAL NEXUS</span>
              <kbd className="hidden sm:inline px-1 bg-black/40 rounded text-[10px] text-slate-500">ESC</kbd>
            </button>

            <span className="text-slate-600 font-mono">/</span>

            <div className="inline-flex items-center gap-2 px-3 py-1 font-mono text-xs border clip-cyber-badge"
              style={{ borderColor: `${color}60`, backgroundColor: `${color}15`, color: color }}
            >
              <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: color }} />
              <span>{codename}</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 font-mono text-xs text-slate-400">
            <span className="text-slate-500">DIMENSIONAL HARMONIC:</span>
            <span className="text-white">SYNCHRONIZED (100%)</span>
          </div>
        </div>

        {/* Cinematic Title & Mottos */}
        <div className="max-w-4xl space-y-4">
          <p className="font-mono text-sm tracking-widest uppercase font-bold" style={{ color: color }}>
            // {realmTitle} //
          </p>

          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
            {name}
          </h1>

          <p className="text-xl sm:text-2xl font-display text-slate-200 font-semibold italic">
            "{motto}"
          </p>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed pt-2 max-w-3xl font-sans">
            {overview.philosophy}
          </p>
        </div>

        {/* Tech Stack Pill List */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-slate-400 mr-2">PRIMARY COGNITIVE STACK:</span>
          {overview.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-mono bg-[#0c0c1d] border border-[#1f1f44] text-slate-300 rounded-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Live Realm Statistics Board */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="relative bg-[#0c0c1d]/90 border border-[#1f1f44] p-5 clip-cyber-corner hover:border-slate-500 transition-all group"
            >
              <div className="font-mono text-xs text-slate-400 mb-1 flex items-center justify-between">
                <span>{stat.label}</span>
                <span className="text-slate-600 font-mono">0{idx + 1}</span>
              </div>
              <div 
                className="text-3xl sm:text-4xl font-display font-black tracking-tight"
                style={{ color: idx % 2 === 0 ? color : secondaryColor }}
              >
                {stat.value}
              </div>
              <div 
                className="absolute bottom-0 right-0 w-2 h-2"
                style={{ backgroundColor: color }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
