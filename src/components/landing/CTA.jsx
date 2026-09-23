import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Crosshair, Zap } from 'lucide-react';

export const CTA = () => {
  return (
    <section className="py-28 relative bg-background overflow-hidden">
      {/* Background visual atmosphere */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=2070&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Center neon glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-neon/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border border-border/80 bg-secondary/80 backdrop-blur-md p-10 sm:p-16 clip-corner-both shadow-2xl relative"
        >
          {/* Top Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-border text-neon font-mono text-xs tracking-widest uppercase mb-6 clip-tag">
            <Zap className="w-3.5 h-3.5 fill-neon" />
            REGISTRATION GATEWAY
          </div>

          {/* Heading */}
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-white mb-6 leading-none">
            READY TO ENTER
            <br />
            <span className="text-neon drop-shadow-[0_0_20px_rgba(204,255,0,0.3)]">
              THE ARENA?
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-text-muted text-base sm:text-xl max-w-xl mx-auto font-sans mb-10">
            Build your squad and create your tournament fixtures.
          </p>

          {/* Action Button */}
          <div className="flex justify-center">
            <Link
              to="/tournament"
              className="inline-flex items-center gap-3 px-10 py-5 bg-neon text-black font-mono font-bold text-sm tracking-wider uppercase clip-corner-tr hover:bg-neon-hover transition-all duration-200 shadow-neon hover:shadow-neon-strong group"
            >
              <span>ENTER TOURNAMENT</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
