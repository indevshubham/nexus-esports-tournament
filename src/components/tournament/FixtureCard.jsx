import React from 'react';
import { motion } from 'framer-motion';
import { Swords, Clock, Shield } from 'lucide-react';

export const FixtureCard = ({ match, index }) => {
  const matchNumStr = String(match.matchNumber || index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -3 }}
      className="bg-secondary/70 border border-border hover:border-neon/60 transition-all duration-300 clip-corner-both p-6 relative overflow-hidden group shadow-card"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Large Match Number Watermark */}
      <div className="absolute top-2 right-4 font-display text-7xl font-extrabold text-white/5 select-none pointer-events-none group-hover:text-neon/10 transition-colors">
        {matchNumStr}
      </div>

      {/* Top Meta Bar */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-border/60 relative z-10">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-neon tracking-widest uppercase">
            MATCH {matchNumStr}
          </span>
          <span className="text-text-dim text-xs font-mono">//</span>
          <span className="font-mono text-[11px] text-text-muted uppercase tracking-wider">
            {match.roundName || 'ROUND ROBIN'}
          </span>
        </div>

        {/* Status Pill: UPCOMING */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface border border-border group-hover:border-neon/40 text-[10px] font-mono tracking-widest uppercase text-neon clip-tag">
          <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
          <span>{match.status || 'UPCOMING'}</span>
        </div>
      </div>

      {/* Clash Faceoff Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-11 items-center gap-4 py-2 relative z-10">
        {/* Team A */}
        <div className="sm:col-span-5 flex flex-col justify-center">
          <div className="text-[10px] font-mono text-text-dim uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-border rounded-full" />
            <span>BLUE SIDE</span>
          </div>
          <div className="font-display text-2xl sm:text-3xl font-bold uppercase text-white tracking-wide break-words group-hover:text-neon transition-colors">
            {match.teamA?.name || 'CONFIRMED SQUAD'}
          </div>
          <div className="text-[11px] font-mono text-text-muted uppercase mt-0.5">
            ROSTER // 5 PLAYERS
          </div>
        </div>

        {/* VS Indicator */}
        <div className="sm:col-span-1 flex items-center justify-center my-1 sm:my-0">
          <div className="w-9 h-9 rounded-full bg-surface border border-border group-hover:border-neon/50 flex items-center justify-center font-display text-base font-bold text-neon shadow-sm">
            VS
          </div>
        </div>

        {/* Team B */}
        <div className="sm:col-span-5 flex flex-col justify-center sm:text-right">
          <div className="text-[10px] font-mono text-text-dim uppercase tracking-wider mb-1 flex items-center sm:justify-end gap-1.5">
            <span>RED SIDE</span>
            <span className="w-1.5 h-1.5 bg-border rounded-full" />
          </div>
          <div className="font-display text-2xl sm:text-3xl font-bold uppercase text-white tracking-wide break-words group-hover:text-neon transition-colors">
            {match.teamB?.name || 'CONFIRMED SQUAD'}
          </div>
          <div className="text-[11px] font-mono text-text-muted uppercase mt-0.5">
            ROSTER // 5 PLAYERS
          </div>
        </div>
      </div>

      {/* Bottom Telemetry */}
      <div className="mt-5 pt-3 border-t border-border/40 flex items-center justify-between text-[10px] font-mono text-text-dim relative z-10">
        <span>COLLISION CODE: #M{matchNumStr}</span>
        <span>TACTICAL ARENA: HYPERION</span>
      </div>
    </motion.div>
  );
};
