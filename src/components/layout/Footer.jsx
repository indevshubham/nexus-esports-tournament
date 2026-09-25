import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="relative bg-background border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Background grid accent */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/nexus-mark.png"
                alt="NEXUS"
                className="w-8 h-8 object-contain drop-shadow-[0_0_12px_rgba(0,240,255,0.3)]"
              />
              <span className="font-display text-2xl font-bold tracking-wider text-white">
                NEXUS
              </span>
            </div>
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent-cyan">
              THE ARENA BETWEEN CHAMPIONS
            </p>
            <p className="text-xs text-text-muted max-w-md leading-relaxed font-sans">
              High-stakes round-robin esports tournament engine. Engineered with mathematical pairing integrity, 5v5 squad enforcement, and real-time MongoDB Atlas cloud persistence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-6 flex flex-col md:items-end justify-between space-y-4">
            <div className="space-y-3">
              <span className="text-[10px] font-mono tracking-widest text-text-dim uppercase block md:text-right">
                CHAMPIONSHIP NAVIGATION
              </span>
              <ul className="flex flex-wrap md:justify-end gap-x-8 gap-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-xs font-mono text-text-muted hover:text-accent-cyan transition-colors duration-200 uppercase"
                  >
                    Arena Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tournament"
                    className="text-xs font-mono text-text-muted hover:text-accent-cyan transition-colors duration-200 uppercase"
                  >
                    Control Deck
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tournament#teams"
                    className="text-xs font-mono text-text-muted hover:text-accent-cyan transition-colors duration-200 uppercase"
                  >
                    Squad Rosters
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tournament#fixtures"
                    className="text-xs font-mono text-text-muted hover:text-accent-cyan transition-colors duration-200 uppercase"
                  >
                    Fixture Wall
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-[10px] font-mono text-text-dim md:text-right">
              TELEMETRY: <span className="text-emerald-400">ONLINE</span> // ENGINE: ROUND_ROBIN_V1
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-text-dim">
          <div>
            &copy; {new Date().getFullYear()} NEXUS ESPORTS ARENA. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-block w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
            <span>ATLAS REAL-TIME PERSISTENCE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
