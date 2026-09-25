import React from 'react';
import { motion } from 'framer-motion';
import { useTournament } from '../../context/TournamentContext';
import { Database, ShieldCheck, Users, Swords } from 'lucide-react';

export const HeroStats = () => {
  const { teams, fixtures, serverError } = useTournament();

  const totalPlayers = teams.reduce((acc, team) => acc + (team.players?.length || 0), 0);

  const statsData = [
    {
      value: `${teams.length} / 05`,
      label: 'CONFIRMED SQUADS',
      detail: teams.length === 5 ? 'CAPACITY REACHED' : `${5 - teams.length} SLOTS REMAINING`,
      icon: ShieldCheck,
      accent: 'text-accent-cyan border-accent-cyan',
    },
    {
      value: `${totalPlayers} / 25`,
      label: 'ENROLLED OPERATORS',
      detail: totalPlayers === 25 ? 'FULL ROSTER ARMED' : '5 COMBATANTS / SQUAD',
      icon: Users,
      accent: 'text-accent-violet border-accent-violet',
    },
    {
      value: `${fixtures.length} / 10`,
      label: 'FIXTURE PAIRINGS',
      detail: fixtures.length === 10 ? 'CLOSED MATCH SCHEDULE' : 'UNLOCKED AT 5 SQUADS',
      icon: Swords,
      accent: 'text-accent-cyan border-accent-cyan',
    },
    {
      value: serverError ? 'OFFLINE' : 'ONLINE',
      label: 'ATLAS PERSISTENCE',
      detail: serverError ? 'CHECK SERVER CONNECTION' : 'MONGODB SYNCHRONIZED',
      icon: Database,
      accent: serverError ? 'text-red-400 border-red-400' : 'text-emerald-400 border-emerald-400',
    },
  ];

  return (
    <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-surface/95 backdrop-blur-md border border-white/10 clip-corner-both shadow-2xl relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

        {/* Top accent beam */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-accent-cyan to-transparent opacity-80" />

        <div className="p-6 sm:p-8 lg:p-10">
          {/* Section meta tag */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 text-[10px] font-mono tracking-widest text-text-dim uppercase gap-2">
            <span className="flex items-center gap-2 text-accent-cyan">
              <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full animate-ping" />
              LIVE TELEMETRY // REAL-TIME TOURNAMENT METRICS
            </span>
            <span className="text-white/60">
              ROUND ROBIN PROTOCOL · C(5,2)=10
            </span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-8">
            {statsData.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex flex-col group pl-4 border-l border-white/10 hover:border-accent-cyan transition-colors duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-4 h-4 text-text-dim group-hover:text-accent-cyan transition-colors" />
                    <span className="text-[9px] font-mono text-text-dim uppercase">SYS//0{index + 1}</span>
                  </div>
                  <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white group-hover:text-accent-cyan transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="font-mono text-xs sm:text-sm font-bold tracking-widest text-white uppercase mt-1">
                    {stat.label}
                  </div>
                  <div className="text-[11px] font-mono tracking-wider text-text-dim uppercase mt-0.5">
                    {stat.detail}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
