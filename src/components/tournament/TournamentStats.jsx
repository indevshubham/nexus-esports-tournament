import React from 'react';
import { motion } from 'framer-motion';
import { useTournament } from '../../context/TournamentContext';
import { Users, Shield, Calendar, Activity, RotateCcw } from 'lucide-react';

export const TournamentStats = ({ onResetClick }) => {
  const { teams = [], fixtures = [], tournamentStatus } = useTournament();
  const safeTeams = Array.isArray(teams) ? teams : [];
  const safeFixtures = Array.isArray(fixtures) ? fixtures : [];

  const playerCount = safeTeams.reduce((acc, team) => acc + (Array.isArray(team?.players) ? team.players.length : 0), 0);

  const getStatusColor = (status) => {
    switch (status) {
      case 'FIXTURES GENERATED':
        return 'text-accent-cyan border-accent-cyan/40 bg-accent-cyan/10';
      case 'REGISTRATION COMPLETE':
        return 'text-white border-white/40 bg-white/10';
      default:
        return 'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/5';
    }
  };

  return (
    <div className="bg-surface/90 border border-white/10 clip-corner-both p-6 sm:p-8 relative shadow-2xl overflow-hidden mb-12">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Top subtle highlight */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-cyan/60 to-transparent" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-text-dim uppercase tracking-widest mb-1">
            <Activity className="w-3.5 h-3.5 text-accent-cyan" />
            TELEMETRY // CONTROL DESK
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white">
            OPERATIONAL METRICS
          </h2>
        </div>

        {/* Status Pill & Reset Button */}
        <div className="flex flex-wrap items-center gap-3">
          <div className={`px-3 py-1.5 rounded-none font-mono text-xs font-bold tracking-widest border clip-corner-tl flex items-center gap-2 ${getStatusColor(tournamentStatus)}`}>
            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
            <span>{tournamentStatus}</span>
          </div>

          {(safeTeams.length > 0 || safeFixtures.length > 0) && (
            <button
              type="button"
              onClick={onResetClick}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface hover:bg-red-950/40 text-text-muted hover:text-red-400 border border-white/10 hover:border-red-500/50 font-mono text-xs tracking-wider transition-all duration-200 clip-corner-br"
              title="Reset all tournament data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET TOURNAMENT</span>
            </button>
          )}
        </div>
      </div>

      {/* Dynamic Counter Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6">
        {/* Teams Metric */}
        <motion.div
          key={safeTeams.length}
          initial={{ scale: 0.96 }}
          animate={{ scale: 1 }}
          className="p-4 bg-surface-card/70 border border-white/10 hover:border-accent-cyan/40 clip-corner-tr relative group transition-colors"
        >
          <div className="flex items-center justify-between text-text-dim mb-1">
            <span className="font-mono text-xs tracking-wider uppercase">SQUADS</span>
            <Shield className="w-4 h-4 text-text-dim group-hover:text-accent-cyan transition-colors" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
              {String(safeTeams.length).padStart(2, '0')}
            </span>
            <span className="font-mono text-sm text-text-dim">/ 05</span>
          </div>
          <div className="w-full bg-white/5 h-1 mt-3 overflow-hidden">
            <div
              className="bg-accent-cyan h-full transition-all duration-500 shadow-cyan"
              style={{ width: `${(safeTeams.length / 5) * 100}%` }}
            />
          </div>
        </motion.div>

        {/* Players Metric */}
        <motion.div
          key={playerCount}
          initial={{ scale: 0.96 }}
          animate={{ scale: 1 }}
          className="p-4 bg-surface-card/70 border border-white/10 hover:border-accent-violet/40 clip-corner-tr relative group transition-colors"
        >
          <div className="flex items-center justify-between text-text-dim mb-1">
            <span className="font-mono text-xs tracking-wider uppercase">OPERATORS</span>
            <Users className="w-4 h-4 text-text-dim group-hover:text-accent-violet transition-colors" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
              {String(playerCount).padStart(2, '0')}
            </span>
            <span className="font-mono text-sm text-text-dim">/ 25</span>
          </div>
          <div className="w-full bg-white/5 h-1 mt-3 overflow-hidden">
            <div
              className="bg-accent-violet h-full transition-all duration-500 shadow-violet"
              style={{ width: `${(playerCount / 25) * 100}%` }}
            />
          </div>
        </motion.div>

        {/* Fixtures Metric */}
        <motion.div
          key={safeFixtures.length}
          initial={{ scale: 0.96 }}
          animate={{ scale: 1 }}
          className="p-4 bg-surface-card/70 border border-white/10 hover:border-accent-cyan/40 clip-corner-tr relative group transition-colors"
        >
          <div className="flex items-center justify-between text-text-dim mb-1">
            <span className="font-mono text-xs tracking-wider uppercase">FIXTURES</span>
            <Calendar className="w-4 h-4 text-text-dim group-hover:text-accent-cyan transition-colors" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
              {String(safeFixtures.length).padStart(2, '0')}
            </span>
            <span className="font-mono text-sm text-text-dim">/ 10</span>
          </div>
          <div className="w-full bg-white/5 h-1 mt-3 overflow-hidden">
            <div
              className="bg-accent-cyan h-full transition-all duration-500 shadow-cyan"
              style={{ width: `${(safeFixtures.length / 10) * 100}%` }}
            />
          </div>
        </motion.div>

        {/* Status Metric */}
        <div className="p-4 bg-surface-card/70 border border-white/10 clip-corner-tr relative group flex flex-col justify-between">
          <div className="flex items-center justify-between text-text-dim mb-1">
            <span className="font-mono text-xs tracking-wider uppercase">STATUS</span>
            <Activity className="w-4 h-4 text-accent-cyan" />
          </div>
          <div className="font-mono text-sm sm:text-base font-bold text-accent-cyan uppercase tracking-wider leading-snug">
            {tournamentStatus}
          </div>
          <div className="text-[10px] font-mono text-text-dim uppercase mt-2">
            {safeTeams.length === 5 ? (safeFixtures.length === 10 ? 'Ready for combat' : 'Ready to generate') : `${5 - safeTeams.length} slots remaining`}
          </div>
        </div>
      </div>
    </div>
  );
};
