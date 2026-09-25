import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Zap, Crosshair } from 'lucide-react';

export const CTA = () => {
  return (
    <section className="py-28 relative bg-background overflow-hidden border-t border-white/5">
      {/* Background visual atmosphere */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=2070&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Center cyan & violet ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-accent-cyan/6 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[450px] h-[280px] bg-accent-violet/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border border-white/10 bg-surface/80 backdrop-blur-md p-10 sm:p-16 clip-corner-both shadow-2xl relative"
        >
          {/* Top Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-card border border-white/10 text-accent-cyan font-mono text-[10px] tracking-widest uppercase mb-6 clip-corner-tl">
            <Crosshair className="w-3.5 h-3.5 text-accent-cyan" />
            NEXUS // 07 · THE ARENA GATEWAY
          </div>

          {/* Heading */}
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold uppercase tracking-tight text-white mb-6 leading-[0.9]">
            READY TO ENTER
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-white to-accent-violet drop-shadow-[0_0_30px_rgba(0,240,255,0.35)]">
              THE ARENA?
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-text-muted text-base sm:text-lg max-w-xl mx-auto font-sans mb-10 leading-relaxed">
            Register your 5-player combat roster, launch the round-robin generator, and enter the official NEXUS fixture wall.
          </p>

          {/* Action Button */}
          <div className="flex justify-center">
            <Link
              to="/tournament"
              className="inline-flex items-center gap-3 px-10 py-5 bg-accent-cyan text-black font-mono font-bold text-sm tracking-wider uppercase clip-corner-tr hover:bg-accent-cyan-hover transition-all duration-200 shadow-cyan hover:shadow-cyan-strong group"
            >
              <span>ENTER ARENA</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
