import React from 'react';
import AmbientBackground from './components/layout/AmbientBackground';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/sections/HeroSection';
import SocietyPillars from './components/sections/SocietyPillars';
import ColorPaletteHUD from './components/sections/ColorPaletteHUD';
import Footer from './components/layout/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#070711] text-slate-100 flex flex-col font-sans selection:bg-[#00E5FF] selection:text-black">
      {/* Dynamic Cyber Ambient Lighting & Grid */}
      <AmbientBackground />

      {/* Main Top Navigation */}
      <Navbar />

      {/* Main Landing Page Content */}
      <main className="flex-grow z-10">
        {/* Hero Section with Branding & Primary Actions */}
        <HeroSection />

        {/* Specialized Tech Domains / Pillars */}
        <SocietyPillars />

        {/* Visual Design System Swatch & HUD Inspector */}
        <ColorPaletteHUD />
      </main>

      {/* Society Cyber Footer */}
      <Footer />
    </div>
  );
}
