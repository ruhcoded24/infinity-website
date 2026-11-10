import React, { useState } from 'react';
import { Menu, X, Terminal, Shield, Zap } from 'lucide-react';
import CyberButton from '../common/CyberButton';
import CyberBadge from '../common/CyberBadge';
import { SOCIETY_DATA } from '../../config/constants';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1f1f44] bg-[#070711]/85 backdrop-blur-md">
      {/* Top micro status bar */}
      <div className="hidden sm:flex justify-between items-center px-6 py-1 bg-[#0c0c1d] border-b border-[#1f1f44]/60 font-mono text-[11px] text-slate-400">
        <div className="flex items-center gap-4">
          <span className="text-[#00E5FF] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-ping" />
            NODE: SGGSCC_DELHI_IN
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-[#C6FF00]">AUTH_LVL: GUEST_01</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[#8B5CF6]">FREQ: 2.4GHz MATRIX</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">{SOCIETY_DATA.status}</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 bg-[#0c0c1d] border border-[#00E5FF]/40 clip-cyber-corner group-hover:border-[#00E5FF] group-hover:shadow-glow-cyan transition-all duration-300">
              {/* Infinity Symbol Vector */}
              <svg 
                viewBox="0 0 100 100" 
                className="w-6 h-6 stroke-[#00E5FF] fill-none stroke-[8] group-hover:stroke-[#C6FF00] transition-colors duration-300"
              >
                <path d="M30,50 C15,30 0,70 30,70 C50,70 50,30 70,30 C100,30 85,70 70,70 C50,70 50,30 30,30" />
              </svg>
              {/* Center Glow Core */}
              <span className="absolute w-1.5 h-1.5 rounded-full bg-[#C6FF00] shadow-[0_0_6px_#C6FF00]" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-xl sm:text-2xl tracking-wider text-white group-hover:text-[#00E5FF] transition-colors">
                  INFINITY
                </span>
                <span className="text-[#8B5CF6] text-xs font-mono font-bold tracking-widest hidden sm:inline-block">
                  // TECH
                </span>
              </div>
              <span className="font-mono text-[10px] text-slate-400 tracking-wider">
                {SOCIETY_DATA.chapter}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-6">
            {SOCIETY_DATA.navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative px-3 py-2 text-sm font-display tracking-widest uppercase text-slate-300 hover:text-[#00E5FF] transition-colors group"
              >
                <span className="group-hover:text-glow-cyan transition-all">
                  {item.name}
                </span>
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#00E5FF] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
              </a>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <CyberBadge color="acid">SYS: ACTIVE</CyberBadge>
            <CyberButton
              variant="cyan"
              size="sm"
              icon={Terminal}
              onClick={() => alert("INFINITY Terminal Initializing... Welcome to the Tech Society!")}
            >
              INITIALIZE LINK
            </CyberButton>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <CyberButton
              variant="outlineCyan"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </CyberButton>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#1f1f44] bg-[#070711] px-4 pt-4 pb-6 space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-[#1f1f44]/60">
            <CyberBadge color="cyan">SYS_READY</CyberBadge>
            <span className="font-mono text-xs text-slate-400">{SOCIETY_DATA.chapter}</span>
          </div>

          <div className="flex flex-col space-y-2 pt-2">
            {SOCIETY_DATA.navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 font-display text-sm tracking-widest uppercase text-slate-200 hover:bg-[#12122b] hover:text-[#00E5FF] rounded"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-[#1f1f44]">
            <CyberButton
              variant="cyan"
              className="w-full"
              icon={Terminal}
              onClick={() => {
                setMobileMenuOpen(false);
                alert("INFINITY Terminal Initializing...");
              }}
            >
              INITIALIZE LINK
            </CyberButton>
          </div>
        </div>
      )}
    </header>
  );
}
