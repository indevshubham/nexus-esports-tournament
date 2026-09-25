import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, CheckCircle2, ShieldCheck, Swords, Scale } from 'lucide-react';

export const TournamentStructure = () => {
  const slots = ['SQUAD 01', 'SQUAD 02', 'SQUAD 03', 'SQUAD 04', 'SQUAD 05'];

  return (
    <section className="py-28 relative bg-secondary/40 border-t border-white/5 overflow-hidden">
      {/* Background Architectural Patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[350px] bg-accent-violet/6 blur-[160px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-white/10 text-accent-cyan font-mono text-[10px] tracking-[0.25em] uppercase mb-4 clip-corner-tl">
              <Calculator className="w-3 h-3 text-accent-cyan" />
              <span>NEXUS // 04 · MATHEMATICAL RIGOR</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-none">
              THE ROUND-ROBIN
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-violet ml-3">
                EQUATION
              </span>
            </h2>
          </div>
          <p className="text-text-muted font-sans text-sm sm:text-base max-w-md">
            Championship legitimacy demands mathematical fairness. Every squad encounters every rival in direct combat under uniform rules.
          </p>
        </div>

        {/* Content Layout: Formula Card + Matrix Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Mathematical Formula & Principles (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* The Equation Display Box */}
            <div className="p-8 bg-surface border border-white/10 clip-corner-br relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-cyan/5 blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-text-dim tracking-widest uppercase">
                  PAIRWISE COMBINATION FORMULA
                </span>
                <span className="font-mono text-[10px] text-accent-cyan px-2 py-0.5 border border-accent-cyan/30">
                  C(5, 2) = 10
                </span>
              </div>

              {/* Formula Visual */}
              <div className="py-6 flex items-center justify-center font-mono">
                <div className="flex items-center gap-4 text-2xl sm:text-4xl font-bold text-white tracking-wider">
                  <span>M</span>
                  <span className="text-accent-cyan">=</span>
                  <div className="flex flex-col items-center">
                    <span className="border-b-2 border-white/30 px-3 pb-1">n · (n - 1)</span>
                    <span className="pt-1 text-accent-cyan">2</span>
                  </div>
                  <span className="text-white/40">=</span>
                  <div className="flex flex-col items-center">
                    <span className="border-b-2 border-white/30 px-3 pb-1">5 · 4</span>
                    <span className="pt-1 text-accent-cyan">2</span>
                  </div>
                  <span className="text-accent-cyan">=</span>
                  <span className="font-display text-4xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-white font-extrabold">
                    10
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-text-muted">
                <span>n = 5 CONFIRMED SQUADS</span>
                <span>M = 10 CLOSED FIXTURES</span>
              </div>
            </div>

            {/* Architectural Principles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-surface/60 border border-white/5 clip-corner-tl">
                <Scale className="w-5 h-5 text-accent-cyan mb-2" />
                <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  Zero RNG Seeding
                </h4>
                <p className="text-[11px] text-text-muted font-sans mt-1 leading-relaxed">
                  No squad enjoys bracket bypass or easier placement. True parity across all 5 competitors.
                </p>
              </div>

              <div className="p-4 bg-surface/60 border border-white/5 clip-corner-tl">
                <Swords className="w-5 h-5 text-accent-violet mb-2" />
                <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  4 Matches / Squad
                </h4>
                <p className="text-[11px] text-text-muted font-sans mt-1 leading-relaxed">
                  Every team faces each of the 4 opponent teams exactly once. Zero double-plays or exemptions.
                </p>
              </div>

              <div className="p-4 bg-surface/60 border border-white/5 clip-corner-tl">
                <ShieldCheck className="w-5 h-5 text-emerald-400 mb-2" />
                <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  Full Roster Integrity
                </h4>
                <p className="text-[11px] text-text-muted font-sans mt-1 leading-relaxed">
                  All 25 registered combatants receive certified battlefield exposure throughout the schedule.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Collision Matrix Grid (5 cols) */}
          <div className="lg:col-span-5">
            <div className="p-6 bg-surface/90 border border-white/10 clip-corner-both">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 font-mono text-xs">
                <span className="text-white font-bold tracking-wider">5×5 PAIRWISE MATRIX</span>
                <span className="text-accent-cyan text-[10px]">10 ACTIVE CELLS</span>
              </div>

              {/* Table/Matrix Display */}
              <div className="overflow-x-auto">
                <table className="w-full text-center font-mono text-[10px]">
                  <thead>
                    <tr>
                      <th className="p-1.5 text-text-dim">VS</th>
                      {slots.map((s, i) => (
                        <th key={s} className="p-1.5 text-accent-cyan font-bold">
                          T{i + 1}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {slots.map((rowSquad, r) => (
                      <tr key={rowSquad} className="border-t border-white/5">
                        <td className="p-1.5 text-accent-cyan font-bold text-left">
                          T{r + 1}
                        </td>
                        {slots.map((colSquad, c) => {
                          if (r === c) {
                            return (
                              <td key={colSquad} className="p-1.5 bg-white/5 text-text-dim select-none">
                                —
                              </td>
                            );
                          }
                          const isUpper = r < c;
                          return (
                            <td
                              key={colSquad}
                              className={`p-1.5 font-bold transition-colors ${
                                isUpper
                                  ? 'text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20'
                                  : 'text-text-dim/40'
                              }`}
                            >
                              {isUpper ? `M${r * 4 + c - (r * (r + 1)) / 2}` : '•'}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-text-dim">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded bg-accent-cyan/20 border border-accent-cyan" />
                  Upper Triangle = 10 Clashes
                </span>
                <span>Self Matches = Null</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
