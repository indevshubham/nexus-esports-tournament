import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTournament } from '../../context/TournamentContext';
import { Swords, Lock, ArrowUpRight, Zap } from 'lucide-react';

export const LandingFixtures = () => {
  const { teams, fixtures } = useTournament();

  return (
    <section className="py-28 relative bg-background border-t border-white/5 overflow-hidden">
      {/* Background Architectural Patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-accent-violet/5 blur-[160px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-white/10 text-accent-cyan font-mono text-[10px] tracking-[0.25em] uppercase mb-4 clip-corner-tl">
              <Swords className="w-3 h-3 text-accent-cyan" />
              <span>NEXUS // 06 · THE FIXTURES</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-none">
              THE TOURNAMENT
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-white ml-3">
                MATCHES
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-text-dim uppercase">
              {fixtures.length} OF 10 FIXTURES GENERATED
            </span>
            <Link
              to="/tournament#fixtures"
              className="inline-flex items-center gap-2 px-4 py-2 bg-surface hover:bg-surface-card border border-white/10 hover:border-accent-cyan/40 text-accent-cyan font-mono text-xs uppercase tracking-wider transition-colors clip-corner-tr"
            >
              <span>FIXTURE WALL</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Empty State vs Real Fixtures */}
        {fixtures.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 sm:p-16 bg-surface/70 border border-white/10 text-center clip-corner-both relative overflow-hidden"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-surface-card border border-white/10 flex items-center justify-center text-text-dim">
              <Lock className="w-10 h-10 text-accent-violet/70 stroke-[1.2]" />
            </div>

            <span className="inline-block px-3 py-1 font-mono text-[10px] text-accent-violet bg-accent-violet/10 border border-accent-violet/20 uppercase tracking-widest mb-4">
              STATUS // FIXTURES LOCKED
            </span>

            <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight mb-3">
              {teams.length === 5 ? '5 SQUADS ENROLLED — READY TO COMPUTE' : 'NO FIXTURES GENERATED YET.'}
            </h3>

            <p className="text-text-muted font-sans text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
              {teams.length === 5
                ? 'All 5 team slots are occupied. Enter the tournament engine and trigger generation to compute the 10 pairwise clashes.'
                : `Round-robin pairing requires all 5 squads to be registered before fixtures can be generated. Currently ${teams.length} / 5 squads confirmed.`}
            </p>

            <Link
              to="/tournament"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-accent-cyan text-black font-mono font-bold text-xs uppercase tracking-wider clip-corner-tr hover:bg-accent-cyan-hover transition-all shadow-cyan"
            >
              <span>{teams.length === 5 ? 'GENERATE 10 FIXTURES' : 'GO TO CONTROL DECK'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {fixtures.map((fixture, idx) => (
              <motion.div
                key={fixture._id || fixture.id || idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="p-5 bg-surface/80 hover:bg-surface border border-white/10 hover:border-accent-cyan/40 clip-corner-br flex flex-col justify-between group transition-all"
              >
                <div>
                  {/* Match Top Bar */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5 font-mono text-[10px]">
                    <span className="text-accent-cyan font-bold tracking-widest">
                      MATCH // {String(fixture.matchNumber || idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-text-dim uppercase">ROUND ROBIN</span>
                  </div>

                  {/* Versus Teams Layout */}
                  <div className="py-2 flex items-center justify-between gap-4">
                    {/* Team 1 */}
                    <div className="flex-1 text-left">
                      <div className="text-[10px] font-mono text-text-dim uppercase">HOME SQUAD</div>
                      <div className="font-mono text-base font-bold text-white uppercase truncate mt-0.5">
                        {fixture.teamA?.name || fixture.team1?.name || fixture.teamA || fixture.team1 || 'TBD'}
                      </div>
                    </div>

                    {/* VS Badge */}
                    <div className="px-2.5 py-1 bg-surface-card border border-white/10 font-mono text-[11px] font-extrabold text-accent-cyan">
                      VS
                    </div>

                    {/* Team 2 */}
                    <div className="flex-1 text-right">
                      <div className="text-[10px] font-mono text-text-dim uppercase">AWAY SQUAD</div>
                      <div className="font-mono text-base font-bold text-white uppercase truncate mt-0.5">
                        {fixture.teamB?.name || fixture.team2?.name || fixture.teamB || fixture.team2 || 'TBD'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Match Bottom Bar */}
                <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between font-mono text-[9px] text-text-dim">
                  <span>STATUS: {fixture.status || 'SCHEDULED'}</span>
                  <span className="text-white/60 group-hover:text-accent-cyan transition-colors">
                    NEXUS ARENA 01
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
