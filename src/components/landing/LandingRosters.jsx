import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTournament } from '../../context/TournamentContext';
import { Users, Shield, ArrowUpRight, Crosshair, Sparkles } from 'lucide-react';

export const LandingRosters = () => {
  const { teams } = useTournament();

  return (
    <section className="py-28 relative bg-secondary/50 border-t border-white/5 overflow-hidden">
      {/* Background Architectural Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-accent-cyan/5 blur-[160px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-white/10 text-accent-cyan font-mono text-[10px] tracking-[0.25em] uppercase mb-4 clip-corner-tl">
              <Users className="w-3 h-3 text-accent-cyan" />
              <span>NEXUS // 05 · COMBAT SQUADS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-none">
              THE CONFIRMED
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-white ml-3">
                ROSTERS
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-text-dim uppercase">
              {teams.length} OF 5 SQUADS REGISTERED
            </span>
            <Link
              to="/tournament"
              className="inline-flex items-center gap-2 px-4 py-2 bg-surface hover:bg-surface-card border border-white/10 hover:border-accent-cyan/40 text-accent-cyan font-mono text-xs uppercase tracking-wider transition-colors clip-corner-tr"
            >
              <span>MANAGE SQUADS</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Empty State vs Real Teams Grid */}
        {teams.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 sm:p-16 bg-surface/70 border border-white/10 text-center clip-corner-both relative overflow-hidden"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-surface-card border border-white/10 flex items-center justify-center text-text-dim">
              <Shield className="w-10 h-10 text-accent-cyan/60 stroke-[1.2]" />
            </div>

            <span className="inline-block px-3 py-1 font-mono text-[10px] text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20 uppercase tracking-widest mb-4">
              STATUS // NO SQUADS REGISTERED
            </span>

            <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight mb-3">
              THE ARENA IS WAITING.
            </h3>

            <p className="text-text-muted font-sans text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
              No combat squads have stepped forward to claim a tournament slot yet. Enlist your organization and claim the initial roster position.
            </p>

            <Link
              to="/tournament"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-accent-cyan text-black font-mono font-bold text-xs uppercase tracking-wider clip-corner-tr hover:bg-accent-cyan-hover transition-all shadow-cyan"
            >
              <span>REGISTER FIRST SQUAD</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team, idx) => (
              <motion.div
                key={team._id || team.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group p-6 bg-surface/80 hover:bg-surface border border-white/10 hover:border-accent-cyan/50 clip-corner-br flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  {/* Top Bar: Squad Number & Slot */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5 font-mono text-[10px]">
                    <span className="text-accent-cyan font-bold tracking-widest">
                      SQUAD // 0{idx + 1}
                    </span>
                    <span className="px-2 py-0.5 bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 uppercase">
                      CONFIRMED
                    </span>
                  </div>

                  {/* Team Name */}
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-wide uppercase mb-4 group-hover:text-accent-cyan transition-colors">
                    {team.name}
                  </h3>

                  {/* Player Roster Handles */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[10px] font-mono text-text-dim uppercase tracking-wider block">
                      ACTIVE OPERATORS ({team.players?.length || 0} / 5):
                    </span>
                    <div className="grid grid-cols-1 gap-1.5 font-mono text-xs">
                      {team.players && team.players.length > 0 ? (
                        team.players.map((player, pIdx) => (
                          <div
                            key={pIdx}
                            className="px-2.5 py-1.5 bg-surface-card border border-white/5 flex items-center justify-between text-text-muted hover:text-white"
                          >
                            <span className="text-[10px] text-text-dim font-bold">P{pIdx + 1}</span>
                            <span className="font-semibold text-white/90">{player}</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-xs text-text-dim italic font-sans py-1">
                          No players enrolled yet
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer Telemetry */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-text-dim">
                  <span>ATLAS ID: {(team._id || team.id || '').substring(0, 8)}...</span>
                  <span className="text-accent-cyan">VERIFIED 5v5</span>
                </div>
              </motion.div>
            ))}

            {/* Remaining empty slots up to 5 */}
            {teams.length < 5 && (
              <div className="p-6 border border-dashed border-white/10 rounded flex flex-col items-center justify-center text-center py-12">
                <span className="font-mono text-xs text-text-dim uppercase tracking-widest mb-2">
                  SLOT 0{teams.length + 1} OPEN
                </span>
                <p className="font-sans text-xs text-text-muted max-w-[200px] mb-4">
                  {5 - teams.length} more squad{5 - teams.length > 1 ? 's' : ''} needed to unlock the round-robin fixture engine.
                </p>
                <Link
                  to="/tournament"
                  className="font-mono text-xs text-accent-cyan hover:underline uppercase flex items-center gap-1"
                >
                  <span>CLAIM SLOT</span>
                  <span>→</span>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
