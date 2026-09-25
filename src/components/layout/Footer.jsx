import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="relative bg-background border-t border-border/80 pt-16 pb-12 overflow-hidden">
      {/* Background grid accent */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-border/60">
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/nexus-mark.png"
                alt="NEXUS"
                className="w-9 h-9 object-contain drop-shadow-[0_0_12px_rgba(204,255,0,0.25)]"
              />
              <span className="font-display text-2xl font-bold tracking-wider text-white">
                NEXUS
              </span>
            </div>
            <p className="text-xs font-mono uppercase tracking-widest text-neon">
              ESPORTS TOURNAMENT PLATFORM
            </p>
            <p className="text-sm text-text-muted max-w-md leading-relaxed font-sans">
              Tactical esports tournament management and fixture generation engine. Built for competitive precision and pure competitive integrity.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-6 flex flex-col md:items-end justify-between space-y-4">
            <div className="space-y-3">
              <span className="text-xs font-mono tracking-widest text-text-dim uppercase block md:text-right">
                Platform Navigation
              </span>
              <ul className="flex flex-wrap md:justify-end gap-x-8 gap-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-sm font-mono text-text-muted hover:text-neon transition-colors duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tournament"
                    className="text-sm font-mono text-text-muted hover:text-neon transition-colors duration-200"
                  >
                    Tournament
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tournament#teams"
                    className="text-sm font-mono text-text-muted hover:text-neon transition-colors duration-200"
                  >
                    Teams
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tournament#fixtures"
                    className="text-sm font-mono text-text-muted hover:text-neon transition-colors duration-200"
                  >
                    Fixtures
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-xs font-mono text-text-dim md:text-right">
              SYSTEM STATUS: <span className="text-neon">ONLINE</span> // LATENCY: 12ms
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-dim">
          <div>
            &copy; {new Date().getFullYear()} NEXUS TOURNAMENT PLATFORM. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-block w-2 h-2 rounded-full bg-neon animate-pulse" />
            <span>TACTICAL ROUND ROBIN ENGINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
