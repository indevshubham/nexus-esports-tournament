import React from 'react';
import { motion } from 'framer-motion';
import { Users, ShieldCheck, Cpu, Trophy, Terminal, ArrowUpRight } from 'lucide-react';

const steps = [
  {
    step: '01',
    code: 'STEP // 01',
    title: 'SQUAD REGISTRATION',
    desc: 'Name your team and designate official callsign.',
    detail: 'Lock in your organization name and aesthetic emblem. Maximum pool capacity is strictly limited to 5 squads.',
    icon: Users,
    highlight: '5 SQUAD MAXIMUM',
    accent: 'text-accent-cyan border-accent-cyan/30',
  },
  {
    step: '02',
    code: 'STEP // 02',
    title: '5-PLAYER ROSTER',
    desc: 'Submit exactly five validated combatant handles.',
    detail: 'Every squad must possess exactly 5 verified players before entering the match generator. Zero stand-in ambiguity.',
    icon: ShieldCheck,
    highlight: 'STRICT 5v5 VALIDATION',
    accent: 'text-accent-violet border-accent-violet/30',
  },
  {
    step: '03',
    code: 'STEP // 03',
    title: 'FIXTURE ENGINE',
    desc: 'Deterministic round-robin algorithm calculates pairings.',
    detail: 'The algorithmic matrix generates all 10 pairwise clashes: n(n-1)/2 = 10. Every squad faces every rival once.',
    icon: Cpu,
    highlight: '10 TOTAL CLASHES',
    accent: 'text-accent-cyan border-accent-cyan/30',
  },
  {
    step: '04',
    code: 'STEP // 04',
    title: 'THE ARENA WALL',
    desc: 'Persist to cloud database and battle for the title.',
    detail: 'Live fixture pairings persist across sessions in MongoDB Atlas. Inspect match cards, telemetry, and track the championship.',
    icon: Trophy,
    highlight: 'MONGODB PERSISTENCE',
    accent: 'text-emerald-400 border-emerald-400/30',
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-28 relative bg-background overflow-hidden border-t border-white/5">
      {/* Background Architectural Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-accent-cyan/4 blur-[180px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-white/10 text-accent-cyan font-mono text-[10px] tracking-[0.25em] uppercase mb-4 clip-corner-tl">
              <Terminal className="w-3 h-3 text-accent-cyan" />
              <span>NEXUS // 03 · PROTOCOL STEPS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-none">
              HOW THE ARENA
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-white ml-3">
                OPERATES
              </span>
            </h2>
          </div>
          <p className="text-text-muted font-sans text-sm sm:text-base max-w-md mt-4 md:mt-0">
            Four disciplined phases from squad inception to the championship fixture wall. Pure deterministic rules with zero arbitrary seeding.
          </p>
        </div>

        {/* 4 Cards Grid with Big Editorial Step Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="group relative bg-surface/80 hover:bg-surface border border-white/10 hover:border-accent-cyan/40 p-7 flex flex-col justify-between transition-all duration-300 clip-corner-br"
              >
                {/* Massive Number Watermark */}
                <div className="absolute top-3 right-5 font-display text-7xl font-extrabold text-white/5 select-none pointer-events-none group-hover:text-accent-cyan/10 transition-colors">
                  {item.step}
                </div>

                <div>
                  {/* Step Code Pill & Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <span className={`font-mono text-[10px] font-bold tracking-widest px-2.5 py-1 bg-surface-card border ${item.accent} clip-corner-tl uppercase`}>
                      {item.code}
                    </span>
                    <div className="w-9 h-9 rounded bg-surface-card border border-white/10 flex items-center justify-center text-white/70 group-hover:text-accent-cyan group-hover:border-accent-cyan/40 transition-colors">
                      <Icon className="w-4 h-4 stroke-[1.5]" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-mono text-base font-bold text-white tracking-wider uppercase mb-2 group-hover:text-accent-cyan transition-colors">
                    {item.title}
                  </h3>

                  {/* Short Summary */}
                  <p className="text-white/80 text-xs font-medium mb-3">
                    {item.desc}
                  </p>

                  {/* Long Detail */}
                  <p className="text-text-muted text-xs leading-relaxed font-sans">
                    {item.detail}
                  </p>
                </div>

                {/* Bottom Highlight */}
                <div className="pt-6 mt-8 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-text-dim">
                  <span className="uppercase tracking-wider text-text-muted group-hover:text-accent-cyan transition-colors font-semibold">
                    {item.highlight}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
