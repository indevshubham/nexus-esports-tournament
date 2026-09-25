import React from 'react';
import { Crosshair, Plus, ArrowUpRight } from 'lucide-react';

export const EmptyState = ({ onActionClick }) => {
  return (
    <div className="border border-dashed border-white/10 bg-surface/50 p-12 sm:p-16 text-center clip-corner-both relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-md mx-auto space-y-6 relative z-10">
        {/* Radar / Crosshair Icon Container */}
        <div className="w-16 h-16 mx-auto bg-surface-card border border-accent-cyan/30 flex items-center justify-center text-accent-cyan clip-corner-tl shadow-cyan">
          <Crosshair className="w-8 h-8 animate-spin-slow stroke-[1.5]" />
        </div>

        <div>
          <span className="font-mono text-[10px] text-accent-cyan tracking-widest uppercase block mb-1">
            STATUS // THE ARENA IS WAITING
          </span>
          <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white tracking-wide">
            NO SQUADS REGISTERED
          </h3>
          <p className="text-text-muted text-sm sm:text-base font-sans mt-3">
            No combat squads have stepped forward to claim a tournament slot yet. Enlist your organization and claim the initial roster position.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={onActionClick}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent-cyan text-black hover:bg-accent-cyan-hover font-mono font-bold text-xs tracking-wider uppercase clip-corner-tr transition-all duration-200 shadow-cyan group"
          >
            <Plus className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90" />
            <span>REGISTER FIRST SQUAD</span>
          </button>
        </div>
      </div>
    </div>
  );
};
