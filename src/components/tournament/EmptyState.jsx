import React from 'react';
import { ShieldAlert, Plus, Crosshair } from 'lucide-react';

export const EmptyState = ({ onActionClick }) => {
  return (
    <div className="border border-dashed border-border/80 bg-secondary/30 p-12 sm:p-16 text-center clip-corner-both relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-md mx-auto space-y-6 relative z-10">
        {/* Radar / Crosshair Icon Container */}
        <div className="w-16 h-16 mx-auto bg-surface border border-border flex items-center justify-center text-neon clip-tag shadow-neon-sm">
          <Crosshair className="w-8 h-8 animate-spin-slow stroke-[1.5]" />
        </div>

        <div>
          <span className="font-mono text-xs text-neon tracking-widest uppercase block mb-1">
            TOURNAMENT ROSTER EMPTY
          </span>
          <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white tracking-wide">
            NO SQUADS REGISTERED
          </h3>
          <p className="text-text-muted text-sm sm:text-base font-sans mt-3">
            Your tournament is waiting for its competitors.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={onActionClick}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-surface-card border border-neon/50 text-neon hover:bg-neon hover:text-black font-mono font-bold text-xs tracking-wider uppercase clip-corner-tr transition-all duration-200 shadow-neon-sm group"
          >
            <Plus className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90" />
            <span>CREATE FIRST TEAM</span>
          </button>
        </div>
      </div>
    </div>
  );
};
