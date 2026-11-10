import React from 'react';
import { Layers, CheckCircle2, ArrowRight } from 'lucide-react';

export default function UniverseCurriculum({ universe }) {
  const { color, curriculum, overview } = universe;

  return (
    <section className="py-16 sm:py-24 border-b border-[#1f1f44]/80 bg-[#0c0c1d]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest" style={{ color }}>
              <Layers className="w-4 h-4" />
              <span>COGNITIVE ROADMAP</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-wide">
              STRUCTURED REALM CURRICULUM
            </h2>
          </div>
          <p className="font-mono text-sm text-slate-400 max-w-md">
            From algorithmic fundamentals to competitive tournament mastery and real-world deployment.
          </p>
        </div>

        {/* 3-Cycle Curriculum Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {curriculum.map((cycle, idx) => (
            <div
              key={cycle.level}
              className="bg-[#0c0c1d]/90 border border-[#1f1f44] p-6 clip-cyber-corner flex flex-col justify-between"
            >
              <div>
                {/* Cycle Badge */}
                <div className="inline-block px-2.5 py-1 text-[11px] font-mono border rounded-sm mb-3"
                  style={{ borderColor: `${color}60`, color }}
                >
                  {cycle.level}
                </div>

                <h3 className="font-display font-bold text-lg text-white mb-4">
                  {cycle.title}
                </h3>

                <ul className="space-y-2.5">
                  {cycle.topics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs font-mono text-slate-300">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color }} />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1f1f44] text-[11px] font-mono text-slate-500">
                MODULE STATUS: ACTIVE // OPEN TO MEMBERS
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
