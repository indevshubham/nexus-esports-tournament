import React from 'react';
import { motion } from 'framer-motion';
import { Users, ShieldAlert, Cpu, Trophy, ArrowRight } from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'BUILD YOUR TEAM',
    desc: 'Create a team and add five players.',
    detail: 'Assign an elite callsign and register five active operators for your official tournament roster.',
    icon: Users,
    highlight: 'Roster validation',
  },
  {
    step: '02',
    title: 'ENTER THE ARENA',
    desc: 'Register your squad for the tournament.',
    detail: 'Lock in your squad into the NEXUS tournament engine until the 5-team limit is achieved.',
    icon: ShieldAlert,
    highlight: 'Squad locked',
  },
  {
    step: '03',
    title: 'GENERATE FIXTURES',
    desc: 'Generate a complete round-robin fixture schedule.',
    detail: 'Algorithmic calculation generates 10 balanced round-robin clashes ensuring equal battlefield exposure.',
    icon: Cpu,
    highlight: 'Pure algorithmic math',
  },
  {
    step: '04',
    title: 'FIGHT FOR THE TITLE',
    desc: 'Every team faces every other team.',
    detail: 'Every squad faces all 4 opponents in direct head-to-head combat. The ultimate team takes the crown.',
    icon: Trophy,
    highlight: 'Single champion',
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-24 sm:py-32 relative bg-background overflow-hidden">
      {/* Background Subtle Elements */}
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-neon/3 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-border/80">
          <div>
            <div className="text-neon font-mono text-xs tracking-[0.25em] uppercase mb-2 flex items-center gap-2">
              <span className="w-2 h-[2px] bg-neon" />
              OPERATIONAL PROTOCOL
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white">
              HOW IT WORKS
            </h2>
          </div>
          <p className="text-text-muted font-mono text-xs sm:text-sm tracking-wider max-w-md mt-4 md:mt-0 uppercase">
            Four disciplined steps from squad inception to the championship battleground.
          </p>
        </div>

        {/* Editorial Layout: Staggered Timeline / Asymmetric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative bg-secondary/70 border border-border hover:border-neon/60 p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-card hover:-translate-y-1"
              >
                {/* Step number watermark */}
                <div className="absolute top-4 right-6 font-display text-6xl font-extrabold text-white/5 select-none pointer-events-none group-hover:text-neon/10 transition-colors">
                  {item.step}
                </div>

                <div>
                  {/* Step tag */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-xs font-bold text-neon tracking-widest px-2.5 py-1 bg-surface border border-border group-hover:border-neon/40 clip-tag">
                      STAGE {item.step}
                    </span>
                    <Icon className="w-5 h-5 text-text-dim group-hover:text-neon transition-colors" />
                  </div>

                  {/* Heading */}
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-wide uppercase mb-3">
                    {item.title}
                  </h3>

                  {/* Short summary */}
                  <p className="text-text-primary text-sm font-medium mb-3">
                    {item.desc}
                  </p>

                  {/* Longer detail */}
                  <p className="text-text-muted text-xs leading-relaxed font-sans">
                    {item.detail}
                  </p>
                </div>

                {/* Bottom Highlight */}
                <div className="pt-6 mt-8 border-t border-border/50 flex items-center justify-between text-[11px] font-mono text-text-dim">
                  <span className="uppercase tracking-wider group-hover:text-text-muted transition-colors">
                    {item.highlight}
                  </span>
                  <span className="text-neon opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
