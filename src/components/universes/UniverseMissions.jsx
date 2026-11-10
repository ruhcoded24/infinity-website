import React from 'react';
import { Calendar, MapPin, Award, Flag, Sparkles } from 'lucide-react';

export default function UniverseMissions({ universe }) {
  const { color, missions } = universe;

  return (
    <section className="py-16 sm:py-24 border-b border-[#1f1f44]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest" style={{ color }}>
              <Flag className="w-4 h-4" />
              <span>EXPEDITIONS & SUMMITS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-wide">
              HISTORICAL MISSIONS & EVENTS
            </h2>
          </div>
          <p className="font-mono text-sm text-slate-400 max-w-md">
            Verifiable institutional achievements, hands-on masterclasses, and collegiate competitions.
          </p>
        </div>

        {/* Missions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {missions.map((mission) => (
            <div
              key={mission.id}
              className="bg-[#0c0c1d]/90 border border-[#1f1f44] p-6 clip-cyber-corner hover:border-slate-400 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 text-xs font-mono border rounded-sm"
                    style={{ borderColor: `${color}60`, color }}
                  >
                    {mission.badge}
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    {mission.type}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display uppercase tracking-wider text-white mb-2">
                  {mission.title}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{mission.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{mission.venue}</span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {mission.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1f1f44] flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">IMPACT METRIC:</span>
                <span className="font-bold text-white" style={{ color }}>
                  {mission.metric}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
