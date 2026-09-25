import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTournament } from '../../context/TournamentContext';
import { FixtureCard } from './FixtureCard';
import { Cpu, Sparkles, AlertCircle, ArrowUpRight, Swords } from 'lucide-react';

export const FixtureSection = () => {
  const { teams, fixtures, generateFixtures, canGenerate, hasFixtures, isGeneratingFixtures } = useTournament();
  const [errorMsg, setErrorMsg] = useState(null);

  const handleGenerate = async () => {
    setErrorMsg(null);
    const res = await generateFixtures();
    if (!res.success) {
      setErrorMsg(res.error);
    }
  };

  return (
    <section id="fixtures" className="scroll-mt-24 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <span className="text-accent-cyan font-mono text-xs tracking-widest uppercase flex items-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full animate-ping" />
            SCHEDULE ENGINE // ROUND ROBIN C(5, 2)
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
            THE FIXTURE WALL
          </h2>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="px-3 py-1 bg-surface-card border border-white/10 text-text-muted clip-corner-tl">
            {fixtures.length} / 10 MATCHES
          </span>
          <span className="px-3 py-1 bg-surface-card border border-white/10 text-accent-cyan clip-corner-tl font-bold">
            ROUND ROBIN
          </span>
        </div>
      </div>

      {/* Error Message if any */}
      {errorMsg && (
        <div className="p-4 bg-red-950/40 border border-red-500/50 text-red-300 flex items-center gap-3 font-mono text-xs tracking-wider uppercase clip-corner-tl">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Fixture Generator Action Banner */}
      {!hasFixtures && (
        <div className="bg-surface/80 border border-white/10 clip-corner-both p-8 sm:p-10 relative overflow-hidden shadow-card">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

          <div className="max-w-xl relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-card border border-white/10 text-accent-cyan font-mono text-xs tracking-widest uppercase clip-corner-tl">
              <Cpu className="w-3.5 h-3.5" />
              DETERMINISTIC GENERATOR
            </div>

            <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white tracking-wide">
              {teams.length === 5
                ? 'ALL 5 SQUADS LOCKED & READY'
                : `AWAITING TEAMS (${teams.length} / 5 REGISTERED)`}
            </h3>

            <p className="text-text-muted text-sm font-sans leading-relaxed">
              {teams.length === 5
                ? 'The tournament roster is fully locked. Generate the algorithmic 10-match round-robin fixture matrix now.'
                : 'Register all 5 teams to generate fixtures. The round-robin algorithm requires exactly 5 squads to compute all 10 unique clashes.'}
            </p>

            <div className="pt-2">
              {teams.length === 5 ? (
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGeneratingFixtures}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-accent-cyan text-black font-mono font-bold text-xs sm:text-sm tracking-wider uppercase clip-corner-tr hover:bg-accent-cyan-hover transition-all duration-200 shadow-cyan hover:shadow-cyan-strong disabled:opacity-50 group"
                >
                  <Sparkles className="w-4 h-4 transition-transform group-hover:rotate-12" />
                  <span>{isGeneratingFixtures ? 'COMPUTING FIXTURES...' : 'GENERATE 10 FIXTURES'}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-surface-card border border-white/10 text-text-dim font-mono text-xs tracking-wider uppercase clip-corner-tl">
                  <span className="w-2 h-2 rounded-full bg-white/20" />
                  <span>Register all 5 teams to unlock generator.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fixtures List Display */}
      {hasFixtures ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs font-mono text-text-dim uppercase tracking-wider pb-2 border-b border-white/10">
            <span>OFFICIAL ROUND-ROBIN COMBAT MATRIX</span>
            <span className="text-accent-cyan flex items-center gap-2 font-bold">
              <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
              10 MATCHES PERSISTED TO ATLAS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fixtures.map((match, index) => (
              <FixtureCard key={match._id || match.id} match={match} index={index} />
            ))}
          </div>
        </div>
      ) : (
        <div className="p-10 border border-dashed border-white/10 bg-surface/40 text-center clip-corner-both">
          <span className="text-accent-cyan font-mono text-xs tracking-widest uppercase block mb-1">
            SCHEDULE STATUS: PENDING
          </span>
          <h4 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white tracking-wide">
            NO FIXTURES GENERATED YET
          </h4>
          <p className="text-text-muted text-xs sm:text-sm font-sans mt-2">
            Register all 5 teams to create the official tournament schedule.
          </p>
        </div>
      )}
    </section>
  );
};
