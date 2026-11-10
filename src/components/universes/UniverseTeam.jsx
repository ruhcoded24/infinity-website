import React from 'react';
import { Users, Linkedin, ShieldCheck } from 'lucide-react';

export default function UniverseTeam({ universe }) {
  const { color, commanders } = universe;

  return (
    <section className="py-16 sm:py-24 border-b border-[#1f1f44]/80 bg-[#0c0c1d]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest" style={{ color }}>
              <Users className="w-4 h-4" />
              <span>REALM COMMAND</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-wide">
              EXECUTIVE LEADERSHIP & SPECIALISTS
            </h2>
          </div>
          <p className="font-mono text-sm text-slate-400 max-w-md">
            Verified 2025–26 office bearers and domain architects steering technical initiatives at SGGSCC.
          </p>
        </div>

        {/* Commanders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
          {commanders.map((commander) => (
            <div
              key={commander.name}
              className="bg-[#0c0c1d]/90 border border-[#1f1f44] p-5 clip-cyber-corner hover:border-slate-400 transition-all flex items-start gap-4"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-[#12122b] border border-[#1f1f44] clip-cyber-corner overflow-hidden">
                <img
                  src={commander.image}
                  alt={commander.name}
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                  onError={(e) => {
                    e.target.src = '/assets/images/tech-sphere-dark.jpg';
                  }}
                />
              </div>

              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-base text-white">
                    {commander.name}
                  </h3>
                  <a
                    href={commander.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 hover:text-[#00E5FF] text-slate-400 transition-colors"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>

                <div className="text-xs font-mono font-semibold" style={{ color }}>
                  {commander.role}
                </div>
                
                <div className="text-[10px] font-mono text-slate-400 mb-2">
                  SESSION {commander.session} // SGGSCC
                </div>

                <p className="text-slate-300 text-xs leading-relaxed font-sans">
                  {commander.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
