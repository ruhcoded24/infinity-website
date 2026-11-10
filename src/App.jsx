import React, { useState, useEffect, Suspense, lazy } from 'react';
import PortalNexus from './components/nexus/PortalNexus';
import { UNIVERSES } from './data/universesData';

// Lazy-load UniverseView for performance optimization and code-splitting
const UniverseView = lazy(() => import('./components/universes/UniverseView'));

function UniverseLoadingFallback() {
  return (
    <div className="w-full h-screen bg-[#070711] flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="w-16 h-16 border-2 border-[#00E5FF]/40 border-t-[#00E5FF] rounded-full animate-spin mb-4" />
      <div className="font-mono text-xs text-[#00E5FF] tracking-widest uppercase animate-pulse">
        // SYNCHRONIZING DIMENSIONAL DATA //
      </div>
      <div className="font-display text-white text-lg font-bold mt-1">
        MATERIALIZING REALM MATRIX...
      </div>
    </div>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash && UNIVERSES[hash]) {
      return hash;
    }
    return 'nexus';
  });

  // Sync state with URL hash for intuitive browser forward/back navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash && UNIVERSES[hash]) {
        setCurrentView(hash);
      } else {
        setCurrentView('nexus');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleEnterUniverse = (realmId) => {
    window.location.hash = realmId;
    setCurrentView(realmId);
  };

  const handleBackToNexus = () => {
    window.location.hash = 'nexus';
    setCurrentView('nexus');
  };

  const handleSwitchRealm = (realmId) => {
    window.location.hash = realmId;
    setCurrentView(realmId);
  };

  return (
    <div className="w-full min-h-screen bg-[#070711] text-slate-100 font-sans selection:bg-[#00E5FF] selection:text-black">
      {currentView === 'nexus' ? (
        <PortalNexus onEnterUniverse={handleEnterUniverse} />
      ) : (
        <Suspense fallback={<UniverseLoadingFallback />}>
          <UniverseView
            realmId={currentView}
            onBackToNexus={handleBackToNexus}
            onSwitchRealm={handleSwitchRealm}
          />
        </Suspense>
      )}
    </div>
  );
}
