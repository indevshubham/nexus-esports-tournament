import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Cpu, Server, Compass, Crosshair } from 'lucide-react';

export const TheArena = () => {
  const features = [
    {
      code: 'SYS // 01',
      title: 'DETERMINISTIC ENGINE',
      description: 'Zero randomness. Every team plays every opposing team once in a mathematically closed 10-match round-robin matrix.',
      icon: Cpu,
      tag: 'ALGORITHM',
      accent: 'border-accent-cyan/30 text-accent-cyan',
    },
    {
      code: 'SYS // 02',
      title: 'STRICT SQUAD PROTOCOL',
      description: 'Exactly 5 squads of 5 registered players each. No incomplete rosters, no phantom participants. Pure tactical integrity.',
      icon: Shield,
      tag: '5v5 STANDARD',
      accent: 'border-accent-violet/30 text-accent-violet',
    },
    {
      code: 'SYS // 03',
      title: 'ATLAS PERSISTENCE',
      description: 'Real-time MongoDB cloud storage guarantees immediate persistence. Teams, rosters, and fixture pairings survive across reloads.',
      icon: Server,
      tag: 'DATABASE',
      accent: 'border-emerald-400/30 text-emerald-400',
    },
    {
      code: 'SYS // 04',
      title: 'BROADCAST PRECISION',
      description: 'Industrial-grade typography, dark steel surfaces, and micro-telemetry built for competitive tournament streaming and stadium screens.',
      icon: Zap,
      tag: 'TELEMETRY',
      accent: 'border-accent-cyan/30 text-accent-cyan',
    },
  ];

  return (
    <section className="relative py-28 bg-secondary/60 border-t border-white/5 overflow-hidden">
      {/* Background Architectural Geometry */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-violet/5 blur-[160px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-cyan/5 blur-[160px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-white/10 text-accent-cyan font-mono text-[10px] tracking-[0.25em] uppercase mb-4 clip-corner-tl">
              <Compass className="w-3 h-3 text-accent-cyan" />
              <span>NEXUS // 02 · ARCHITECTURE</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-none">
              THE ARENA
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-white ml-3">
                FRAMEWORK
              </span>
            </h2>
          </div>
          <p className="text-text-muted font-sans text-sm sm:text-base max-w-md">
            Engineered from ground up to deliver uncompromising tournament integrity, deterministic matchups, and real-time database synchronization.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative p-6 bg-surface/70 hover:bg-surface border border-white/10 hover:border-accent-cyan/40 transition-all duration-300 clip-corner-br flex flex-col justify-between"
              >
                {/* Top Corner Mark */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-[10px] text-text-dim tracking-widest uppercase">
                    {f.code}
                  </span>
                  <span className={`px-2 py-0.5 font-mono text-[9px] font-semibold border ${f.accent} tracking-wider uppercase`}>
                    {f.tag}
                  </span>
                </div>

                {/* Center Icon & Title */}
                <div className="mb-6">
                  <div className="w-12 h-12 mb-4 rounded-lg bg-surface-card border border-white/10 flex items-center justify-center text-white group-hover:border-accent-cyan/50 group-hover:text-accent-cyan transition-colors">
                    <Icon className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h3 className="font-mono text-base font-bold text-white tracking-wider uppercase group-hover:text-accent-cyan transition-colors">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-text-muted font-sans text-xs leading-relaxed">
                    {f.description}
                  </p>
                </div>

                {/* Bottom line status */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-text-dim">
                  <span>ACTIVE PROTOCOL</span>
                  <span className="text-white/60 group-hover:text-accent-cyan transition-colors">VERIFIED 0{idx + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
