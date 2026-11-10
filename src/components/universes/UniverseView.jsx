import React, { useEffect } from 'react';
import { ArrowLeft, Compass, Radio, ChevronRight } from 'lucide-react';
import RealmCanvasBackdrop from './RealmCanvasBackdrop';
import UniverseHero from './UniverseHero';
import UniverseProjects from './UniverseProjects';
import UniverseCurriculum from './UniverseCurriculum';
import UniverseMissions from './UniverseMissions';
import UniverseTeam from './UniverseTeam';
import Footer from '../layout/Footer';
import { UNIVERSES, REALM_KEYS } from '../../data/universesData';

export default function UniverseView({ realmId, onBackToNexus, onSwitchRealm }) {
  const universe = UNIVERSES[realmId] || UNIVERSES.ai;

  // Listen to Escape key to quickly return to nexus
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onBackToNexus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [realmId, onBackToNexus]);

  return (
    <div 
      className="relative min-h-screen text-slate-100 flex flex-col selection:bg-white selection:text-black overflow-x-hidden"
      style={{ backgroundColor: '#070711', backgroundImage: universe.bgGradient }}
    >
      {/* Realm-specific dynamic interactive canvas backdrop */}
      <RealmCanvasBackdrop realmId={universe.id} color={universe.color} />

      {/* Sticky Dimensional Navigation Bar */}
      <nav className="sticky top-0 z-40 w-full border-b border-[#1f1f44] bg-[#070711]/90 backdrop-blur-md px-4 sm:px-8 py-3 flex items-center justify-between">
        
        {/* Left: Back to Nexus */}
        <button
          onClick={onBackToNexus}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#0c0c1d] border border-[#1f1f44] hover:border-[#00E5FF] text-xs font-mono text-slate-300 clip-cyber-badge hover:text-white transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 text-[#00E5FF] group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold">RETURN TO NEXUS</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.2 bg-black/50 text-[10px] text-slate-400 rounded">ESC</kbd>
        </button>

        {/* Center: Realm Switcher */}
        <div className="hidden lg:flex items-center gap-1.5 font-mono text-xs">
          <span className="text-slate-500 mr-2">WARP TO:</span>
          {REALM_KEYS.map((key) => {
            const u = UNIVERSES[key];
            const isCurrent = u.id === universe.id;
            return (
              <button
                key={u.id}
                onClick={() => onSwitchRealm(u.id)}
                className={`px-2.5 py-1 text-[11px] clip-cyber-corner-sm border transition-all cursor-pointer ${
                  isCurrent
                    ? 'font-bold text-black border-white'
                    : 'text-slate-400 border-[#1f1f44] hover:border-slate-500 hover:text-white'
                }`}
                style={{
                  backgroundColor: isCurrent ? u.color : 'transparent',
                }}
              >
                {u.id.toUpperCase()}
              </button>
            );
          })}
        </div>

        {/* Right: Chapter Branding */}
        <div className="flex items-center gap-2 text-right">
          <div>
            <div className="font-display text-xs sm:text-sm font-bold text-white tracking-widest">
              INFINITY // SGGSCC
            </div>
            <div className="text-[10px] font-mono text-slate-400 hidden sm:block">
              UNIVERSITY OF DELHI
            </div>
          </div>
          <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: universe.color }} />
        </div>

      </nav>

      {/* Main Realm Content Modules */}
      <main className="relative z-10 flex-grow">
        {/* 1. Cinematic Hero Section */}
        <UniverseHero universe={universe} onBackToNexus={onBackToNexus} />

        {/* 2. Featured Projects & Blueprints */}
        <UniverseProjects universe={universe} />

        {/* 3. Structured Realm Curriculum */}
        <UniverseCurriculum universe={universe} />

        {/* 4. Historical Missions & Competitions */}
        <UniverseMissions universe={universe} />

        {/* 5. Executive Leadership & Commanders */}
        <UniverseTeam universe={universe} />

        {/* 6. Warp Terminal Bottom Bar */}
        <section className="py-16 text-center border-t border-[#1f1f44] bg-[#0c0c1d]/60">
          <div className="max-w-3xl mx-auto px-4 space-y-4">
            <div className="font-mono text-xs tracking-widest uppercase text-slate-400">
              EXPLORATION FINISHED FOR {universe.realmTitle}
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
              READY TO TRAVERSE ANOTHER DIMENSION?
            </h3>
            <div className="pt-2">
              <button
                onClick={onBackToNexus}
                className="px-6 py-3 font-display font-bold text-sm uppercase tracking-wider text-black clip-cyber-corner hover:brightness-110 shadow-glow-cyan transition-all cursor-pointer inline-flex items-center gap-2"
                style={{ backgroundColor: universe.color }}
              >
                <span>OPEN PORTAL NEXUS GATEWAY</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Society Footer */}
      <Footer />
    </div>
  );
}
