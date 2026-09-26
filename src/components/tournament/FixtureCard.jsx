import React from 'react';
import { motion } from 'framer-motion';
import { Swords, Clock, Shield } from 'lucide-react';

const getTeamName = (team, fallback = 'SQUAD') => {
  if (!team) return fallback;
  if (typeof team === 'string') return team;
  if (typeof team === 'object') {
    if (typeof team.name === 'string' && team.name.trim()) return team.name;
    if (typeof team.teamName === 'string' && team.teamName.trim()) return team.teamName;
  }
  return fallback;
};

export const FixtureCard = ({ match, index }) => {
  const matchNumStr = String(match.matchNumber || index + 1).padStart(2, '0');
  const teamAName = getTeamName(match.teamA || match.team1, 'SQUAD A');
  const teamBName = getTeamName(match.teamB || match.team2, 'SQUAD B');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -3 }}
      className="bg-surface/80 border border-white/10 hover:border-accent-cyan/50 transition-all duration-300 clip-corner-both p-6 relative overflow-hidden group shadow-card"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Large Match Number Watermark */}
      <div className="absolute top-2 right-4 font-display text-7xl font-extrabold text-white/5 select-none pointer-events-none group-hover:text-accent-cyan/10 transition-colors">
        {matchNumStr}
      </div>

      {/* Top Meta Bar */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-accent-cyan tracking-widest uppercase">
            MATCH {matchNumStr}
          </span>
          <span className="text-text-dim text-xs font-mono">//</span>
          <span className="font-mono text-[11px] text-text-muted uppercase tracking-wider">
            {match.roundName || 'ROUND ROBIN'}
          </span>
        </div>

        {/* Status Pill */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface-card border border-white/10 group-hover:border-accent-cyan/40 text-[10px] font-mono tracking-widest uppercase text-accent-cyan clip-corner-tl">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
          <span>{match.status || 'SCHEDULED'}</span>
        </div>
      </div>

      {/* Clash Faceoff Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-11 items-center gap-4 py-2 relative z-10">
        {/* Team A */}
        <div className="sm:col-span-5 flex flex-col justify-center">
          <div className="text-[10px] font-mono text-text-dim uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full" />
            <span>HOME SQUAD</span>
          </div>
          <div className="font-mono text-xl sm:text-2xl font-bold uppercase text-white tracking-wide break-words group-hover:text-accent-cyan transition-colors truncate">
            {teamAName}
          </div>
          <div className="text-[10px] font-mono text-text-muted uppercase mt-0.5">
            5 OPERATORS // READY
          </div>
        </div>

        {/* VS Indicator */}
        <div className="sm:col-span-1 flex items-center justify-center my-1 sm:my-0">
          <div className="w-9 h-9 rounded bg-surface-card border border-white/10 group-hover:border-accent-cyan/50 flex items-center justify-center font-mono text-xs font-extrabold text-accent-cyan shadow-cyan">
            VS
          </div>
        </div>

        {/* Team B */}
        <div className="sm:col-span-5 flex flex-col justify-center sm:text-right">
          <div className="text-[10px] font-mono text-text-dim uppercase tracking-wider mb-1 flex items-center sm:justify-end gap-1.5">
            <span>AWAY SQUAD</span>
            <span className="w-1.5 h-1.5 bg-accent-violet rounded-full" />
          </div>
          <div className="font-mono text-xl sm:text-2xl font-bold uppercase text-white tracking-wide break-words group-hover:text-accent-cyan transition-colors truncate">
            {teamBName}
          </div>
          <div className="text-[10px] font-mono text-text-muted uppercase mt-0.5">
            5 OPERATORS // READY
          </div>
        </div>
      </div>

      {/* Bottom Telemetry */}
      <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-text-dim relative z-10">
        <span>COLLISION: #M{matchNumStr}</span>
        <span className="text-white/60 group-hover:text-accent-cyan transition-colors">
          NEXUS ARENA 01
        </span>
      </div>
    </motion.div>
  );
};
