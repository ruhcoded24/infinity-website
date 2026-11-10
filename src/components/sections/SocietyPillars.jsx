import React from 'react';
import { Cpu, ShieldAlert, Globe, Gamepad2, ArrowUpRight } from 'lucide-react';
import CyberCard from '../common/CyberCard';
import CyberBadge from '../common/CyberBadge';
import { SOCIETY_DATA } from '../../config/constants';

export default function SocietyPillars() {
  const iconMap = {
    'ai-systems': Cpu,
    'cyber-security': ShieldAlert,
    'web-matrix': Globe,
    'esports-competitive': Gamepad2,
  };

  return (
    <section className="relative py-16 sm:py-24 border-t border-[#1f1f44]" id="domains">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[#00E5FF] rotate-45" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#00E5FF]">
                CORE DIRECTIVES
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-wide">
              SPECIALIZED DEPARTMENTS
            </h2>
          </div>
          <p className="font-mono text-sm text-slate-400 max-w-md">
            Multidisciplinary wings operating in synergy to develop high-impact technological solutions.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SOCIETY_DATA.pillars.map((pillar) => {
            const Icon = iconMap[pillar.id] || Cpu;
            return (
              <CyberCard
                key={pillar.id}
                accent={pillar.accent}
                className="group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <CyberBadge color={pillar.accent}>
                      {pillar.badge}
                    </CyberBadge>
                    <div className="w-10 h-10 rounded-sm bg-[#12122b] border border-[#1f1f44] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className={`w-5 h-5 ${
                        pillar.accent === 'acid' ? 'text-[#C6FF00]' :
                        pillar.accent === 'violet' ? 'text-[#8B5CF6]' :
                        'text-[#00E5FF]'
                      }`} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-display uppercase tracking-wider text-white group-hover:text-[#00E5FF] transition-colors mb-2">
                    {pillar.title}
                  </h3>
                  
                  <p className="font-mono text-xs text-slate-400 mb-3 tracking-wide">
                    // {pillar.tagline}
                  </p>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1f1f44] flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500 uppercase">ACCESS PROTOCOL</span>
                  <span className="flex items-center gap-1 text-[#00E5FF] group-hover:translate-x-1 transition-transform">
                    INSPECT <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </CyberCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}
