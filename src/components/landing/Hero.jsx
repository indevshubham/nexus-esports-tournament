import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Shield, Target, Crosshair } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-background">
      {/* Background Cinematic Treatment */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Esports Arena Background with dark overlays */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transform motion-safe:animate-pulse-glow"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2070&q=80')`,
            filter: 'brightness(0.28) contrast(1.2) saturate(1.1)',
          }}
        />

        {/* Tactical Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />

        {/* Neon accent glow spot */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-neon/5 blur-[140px] pointer-events-none rounded-full" />

        {/* Tactical grid & noise */}
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
        <div className="absolute inset-0 noise-overlay pointer-events-none" />

        {/* Decorative tactical coordinate tags */}
        <div className="hidden lg:flex absolute top-28 left-8 flex-col gap-1 text-[10px] font-mono text-text-dim select-none">
          <span>SEC: 01 // ALPHA_SECTOR</span>
          <span>LAT: 44.8012° N</span>
          <span>LNG: 20.4651° E</span>
        </div>
        <div className="hidden lg:flex absolute top-28 right-8 flex-col items-end gap-1 text-[10px] font-mono text-text-dim select-none">
          <span>ARENA: HYPERION_CORE</span>
          <span className="text-neon flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-neon rounded-full animate-ping" />
            BROADCAST ACTIVE
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-surface-card/90 border border-border/80 text-neon font-mono text-xs tracking-[0.25em] uppercase mb-8 clip-tag shadow-neon-sm"
        >
          <Crosshair className="w-3.5 h-3.5" />
          <span>NEXUS // ESPORTS CHAMPIONSHIP</span>
        </motion.div>

        {/* Large Editorial Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tight uppercase leading-[0.9] text-center mb-8 drop-shadow-2xl"
        >
          WHERE
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-text-muted">
            CHAMPIONS
          </span>
          <br />
          <span className="text-neon drop-shadow-[0_0_25px_rgba(204,255,0,0.35)]">
            COLLIDE.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-base sm:text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10 font-sans font-normal leading-relaxed"
        >
          Build your squad. Enter the arena. Fight for the championship.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <Link
            to="/tournament"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-neon text-black font-mono font-bold text-sm tracking-wider uppercase clip-corner-tr hover:bg-neon-hover transition-all duration-200 shadow-neon hover:shadow-neon-strong group"
          >
            <span>ENTER TOURNAMENT</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          <Link
            to="/tournament#fixtures"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-surface-card border border-border hover:border-text-primary text-text-primary font-mono font-medium text-sm tracking-wider uppercase clip-corner-bl hover:bg-surface-hover transition-all duration-200 group"
          >
            <span>VIEW FIXTURES</span>
            <span className="text-neon transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] font-mono tracking-[0.2em] text-text-dim uppercase">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-neon/80" />
        </motion.div>
      </motion.div>
    </section>
  );
};
