import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTournament } from '../../context/TournamentContext';
import { ArrowRight, Shield, Layers, Award, Terminal } from 'lucide-react';

export const TournamentIntro = () => {
  const { teams } = useTournament();

  return (
    <section className="py-24 sm:py-32 relative bg-secondary/40 border-y border-border/80 overflow-hidden">
      {/* Background Bracket Geometric Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="bracket-grid" width="160" height="160" patternUnits="userSpaceOnUse">
              <path d="M 0 80 L 80 80 L 80 0 M 80 80 L 80 160 M 80 80 L 160 80" fill="none" stroke="#232736" strokeWidth="1" />
              <circle cx="80" cy="80" r="3" fill="#CCFF00" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bracket-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading and Specifications */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-border text-neon font-mono text-xs tracking-widest uppercase clip-tag">
              <Terminal className="w-3.5 h-3.5" />
              FORMAT ARCHITECTURE
            </div>

            <h2 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight text-white leading-none">
              THE ROAD TO
              <br />
              <span className="text-neon">CHAMPIONSHIP</span>
            </h2>

            <p className="text-text-muted text-base sm:text-lg max-w-xl font-sans leading-relaxed">
              Every squad enters the round-robin grid with identical standing. Complete transparency, zero arbitrary seeding, and pure tactical execution decide the ultimate champion.
            </p>

            {/* Spec Matrix List */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
              <div className="p-4 bg-surface/80 border border-border clip-corner-tr">
                <div className="font-display text-3xl font-bold text-white">5</div>
                <div className="font-mono text-xs text-text-muted tracking-wider uppercase mt-1">MAX TEAMS</div>
              </div>
              <div className="p-4 bg-surface/80 border border-border clip-corner-tr">
                <div className="font-display text-3xl font-bold text-white">25</div>
                <div className="font-mono text-xs text-text-muted tracking-wider uppercase mt-1">MAX PLAYERS</div>
              </div>
              <div className="p-4 bg-surface/80 border border-border clip-corner-tr">
                <div className="font-display text-3xl font-bold text-white">10</div>
                <div className="font-mono text-xs text-text-muted tracking-wider uppercase mt-1">TOTAL MATCHES</div>
              </div>
              <div className="p-4 bg-surface/80 border border-border clip-corner-tr">
                <div className="font-display text-3xl font-bold text-neon">RR</div>
                <div className="font-mono text-xs text-text-muted tracking-wider uppercase mt-1">ROUND ROBIN</div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/tournament"
                className="inline-flex items-center gap-3 px-8 py-4 bg-neon text-black font-mono font-bold text-xs sm:text-sm tracking-wider uppercase clip-corner-tr hover:bg-neon-hover transition-all duration-200 shadow-neon group"
              >
                <span>CREATE YOUR TEAM</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: Live Status & Bracket Geometry Display */}
          <div className="lg:col-span-5">
            <div className="bg-surface-card border border-border p-6 sm:p-8 clip-corner-both relative shadow-card">
              {/* Corner badge */}
              <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-6">
                <span className="font-mono text-xs text-neon tracking-widest uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
                  CURRENT TOURNAMENT POOL
                </span>
                <span className="font-mono text-xs text-text-dim">
                  {teams.length} / 5 REGISTERED
                </span>
              </div>

              {/* Real Data State or Elegant Empty State */}
              {teams.length === 0 ? (
                <div className="py-12 px-4 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-surface border border-border/80 flex items-center justify-center text-text-dim">
                    <Shield className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white tracking-wide uppercase">
                      NO ACTIVE ROSTERS
                    </h3>
                    <p className="text-text-muted text-sm font-sans mt-2 max-w-xs mx-auto">
                      Your tournament is waiting for its first squad.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-xs font-mono text-text-dim uppercase tracking-wider mb-2">
                    Confirmed Combatants:
                  </div>
                  {teams.map((team, idx) => (
                    <div
                      key={team._id || team.id}
                      className="flex items-center justify-between p-3 bg-secondary/80 border border-border/80 clip-tag"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-neon font-bold">
                          0{idx + 1}
                        </span>
                        <span className="font-mono text-sm font-semibold text-white uppercase tracking-wider">
                          {team.name}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-text-dim">
                        5 OPERATORS
                      </span>
                    </div>
                  ))}

                  {teams.length < 5 && (
                    <div className="p-3 border border-dashed border-border/60 text-center font-mono text-xs text-text-dim uppercase">
                      {5 - teams.length} MORE SQUAD{5 - teams.length > 1 ? 'S' : ''} NEEDED
                    </div>
                  )}
                </div>
              )}

              {/* Bottom decorative telemetry */}
              <div className="mt-8 pt-4 border-t border-border/40 flex items-center justify-between text-[10px] font-mono text-text-dim">
                <span>COLLISION MATRIX: COMPLETE</span>
                <span>MATCHES PLANNED: 10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
