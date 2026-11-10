import React from 'react';
import { Terminal, Code, Cpu, ExternalLink, Sparkles } from 'lucide-react';
import CyberCard from '../common/CyberCard';

export default function UniverseProjects({ universe }) {
  const { color, projects } = universe;

  return (
    <section className="py-16 sm:py-24 border-b border-[#1f1f44]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest" style={{ color }}>
              <Cpu className="w-4 h-4" />
              <span>LABORATORY BLUEPRINTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-wide">
              FEATURED INITIATIVES & ARTIFACTS
            </h2>
          </div>
          <p className="font-mono text-sm text-slate-400 max-w-md">
            Production builds, research prototypes, and open-source infrastructure engineered by realm members.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="relative bg-[#0c0c1d]/90 border border-[#1f1f44] p-6 clip-cyber-corner hover:border-slate-400 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header Tag & Status */}
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <span className="px-2 py-0.5 border rounded-sm" style={{ borderColor: `${color}60`, color }}>
                    {proj.tag}
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">
                    {proj.status}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-bold font-display uppercase tracking-wider text-white group-hover:text-white transition-colors mb-2">
                  {proj.title}
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {proj.description}
                </p>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-[#12122b] text-[10px] font-mono text-slate-300 border border-[#1f1f44]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Metrics Bar */}
              <div className="pt-4 border-t border-[#1f1f44] flex items-center justify-between font-mono text-xs">
                <span className="text-slate-400">BENCHMARK:</span>
                <span className="font-bold text-white" style={{ color }}>
                  {proj.metrics}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
