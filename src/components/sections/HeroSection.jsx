import React from 'react';
import { Terminal, Shield, Zap, ArrowRight, Cpu, Activity, Sparkles } from 'lucide-react';
import CyberButton from '../common/CyberButton';
import CyberBadge from '../common/CyberBadge';
import { SOCIETY_DATA } from '../../config/constants';

export default function HeroSection() {
  return (
    <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-32 overflow-hidden" id="protocol">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top telemetry tag */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <CyberBadge color="violet">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
              EST. SGGSCC // DU
            </span>
          </CyberBadge>

          <CyberBadge color="cyan">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-[#00E5FF]" />
              CYBER TECH COLLECTIVE
            </span>
          </CyberBadge>

          <div className="hidden sm:flex items-center font-mono text-xs text-slate-400 gap-2 border-l border-[#1f1f44] pl-3">
            <span className="text-[#C6FF00]">PROTOCOL:</span>
            <span>INITIAL_LAUNCH // 2026</span>
          </div>
        </div>

        {/* Hero Headline */}
        <div className="max-w-4xl space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-none">
            WHERE CODE MEETS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#C6FF00] text-glow-cyan">
              INFINITE HORIZONS
            </span>
          </h1>

          <p className="font-mono text-sm sm:text-base text-[#00E5FF] tracking-wider uppercase font-semibold">
            {SOCIETY_DATA.tagline} // {SOCIETY_DATA.chapter}
          </p>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-sans leading-relaxed pt-2">
            {SOCIETY_DATA.subtext} We engineer forward-thinking software, conduct deep cyber security audits, develop autonomous AI agents, and build competitive technology ecosystems.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-8">
          <CyberButton
            variant="cyan"
            size="lg"
            icon={Zap}
            onClick={() => alert("Connecting to INFINITY neural network...")}
          >
            ENTER THE MATRIX
          </CyberButton>

          <CyberButton
            variant="outlineViolet"
            size="lg"
            icon={Terminal}
            href="#domains"
          >
            EXPLORE DOMAINS
          </CyberButton>

          <CyberButton
            variant="outlineAcid"
            size="lg"
            icon={Shield}
            href="#palette"
          >
            SYSTEM PALETTE
          </CyberButton>
        </div>

        {/* Society Stats HUD Bar */}
        <div className="mt-16 sm:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {SOCIETY_DATA.stats.map((stat, idx) => {
            const colorClass = 
              stat.color === 'acid' ? 'text-[#C6FF00] border-[#C6FF00]/30' :
              stat.color === 'violet' ? 'text-[#8B5CF6] border-[#8B5CF6]/30' :
              'text-[#00E5FF] border-[#00E5FF]/30';

            return (
              <div
                key={idx}
                className="relative bg-[#0c0c1d]/90 border border-[#1f1f44] p-5 clip-cyber-corner hover:border-[#00E5FF]/40 transition-all duration-300 group"
              >
                <div className="font-mono text-xs text-slate-400 tracking-wider mb-1 flex items-center justify-between">
                  <span>{stat.label}</span>
                  <span className="text-[10px] text-slate-600 font-mono">0{idx + 1}</span>
                </div>
                <div className={`text-3xl sm:text-4xl font-display font-black tracking-tight ${colorClass}`}>
                  {stat.value}
                </div>
                {/* Micro accent corner */}
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#1f1f44] group-hover:bg-[#00E5FF] transition-colors" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
