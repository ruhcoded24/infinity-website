import React from 'react';
import { Terminal, Github, Linkedin, Instagram, ArrowUp } from 'lucide-react';
import { SOCIETY_DATA } from '../../config/constants';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-[#1f1f44] bg-[#070711] z-10 font-mono text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#00E5FF] rotate-45" />
              <span className="font-display font-black text-xl text-white tracking-widest">
                INFINITY
              </span>
              <span className="text-[#8B5CF6] text-xs font-mono font-bold">
                // TECH SOCIETY
              </span>
            </div>

            <p className="text-slate-400 font-sans text-sm max-w-sm">
              Official technology society of Sri Guru Gobind Singh College of Commerce (SGGSCC), University of Delhi. Fostering innovation across machine intelligence, cybersecurity, software engineering, and competitive gaming.
            </p>

            <div className="text-[11px] text-slate-500 pt-1">
              CAMPUS: Opposite TV Tower, Pitampura, Delhi – 110034
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-display text-white text-sm font-bold uppercase tracking-wider mb-3">
              SYSTEM NODES
            </h4>
            <ul className="space-y-2">
              {SOCIETY_DATA.navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-[#00E5FF] transition-colors">
                    &gt; {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Social Uplinks */}
          <div>
            <h4 className="font-display text-white text-sm font-bold uppercase tracking-wider mb-3">
              CYBER UPLINKS
            </h4>
            <div className="flex flex-col space-y-2">
              <a
                href={SOCIETY_DATA.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-[#00E5FF] transition-colors"
              >
                <Linkedin className="w-4 h-4 text-[#00E5FF]" />
                <span>LINKEDIN // INFINITY</span>
              </a>
              <a
                href={SOCIETY_DATA.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-[#8B5CF6] transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#8B5CF6]" />
                <span>INSTAGRAM // OFFICIAL</span>
              </a>
              <a
                href="https://sggscc.ac.in"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-[#C6FF00] transition-colors"
              >
                <Terminal className="w-4 h-4 text-[#C6FF00]" />
                <span>SGGSCC.AC.IN // PORTAL</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 border-t border-[#1f1f44]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © {new Date().getFullYear()} INFINITY TECH SOCIETY. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#00E5FF]">ENGINEERED WITH REACT + VITE + TAILWIND</span>
            <button
              onClick={scrollToTop}
              className="p-2 border border-[#1f1f44] bg-[#0c0c1d] hover:border-[#00E5FF] hover:text-[#00E5FF] text-slate-400 transition-colors rounded-sm"
              title="Return to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
