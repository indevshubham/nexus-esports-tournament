import React from 'react';
import { motion } from 'framer-motion';
import { useTournament } from '../../context/TournamentContext';

export const HeroStats = () => {
  const { teams, fixtures } = useTournament();

  const totalPlayers = teams.reduce((acc, team) => acc + (team.players?.length || 0), 0);

  const statsData = [
    {
      value: `${teams.length} / 05`,
      label: 'REGISTERED TEAMS',
      detail: 'CAPACITY: 5 SQUADS',
    },
    {
      value: `${totalPlayers} / 25`,
      label: 'REGISTERED PLAYERS',
      detail: 'CAPACITY: 25 PLAYERS',
    },
    {
      value: `${fixtures.length} / 10`,
      label: 'FIXTURES',
      detail: 'CAPACITY: 10 MATCHES',
    },
    {
      value: '01',
      label: 'CHAMPION',
      detail: 'TOURNAMENT TITLE',
    },
  ];

  return (
    <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-secondary/95 backdrop-blur-md border border-border clip-corner-both shadow-2xl relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

        {/* Top accent line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-neon to-transparent opacity-60" />

        <div className="p-6 sm:p-8 lg:p-10">
          {/* Section meta tag */}
          <div className="flex items-center justify-between pb-6 border-b border-border/50 text-[10px] font-mono tracking-widest text-text-dim uppercase">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-neon rounded-full" />
              LIVE TOURNAMENT TELEMETRY
            </span>
            <span>FORMAT: ROUND ROBIN SINGLE-TIER</span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-8">
            {statsData.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative flex flex-col group pl-4 border-l border-border/70 hover:border-neon transition-colors duration-300"
              >
                <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white group-hover:text-neon transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="font-mono text-xs sm:text-sm font-bold tracking-widest text-text-primary uppercase mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] font-mono tracking-wider text-text-dim uppercase mt-0.5">
                  {stat.detail}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
