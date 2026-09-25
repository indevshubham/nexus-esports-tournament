import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Crosshair, ChevronDown, ShieldCheck, Users, Swords, Database } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-background">
      {/* Background Architectural Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle arena photo underlay with heavy dark grade */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2070&q=80')`,
            filter: 'brightness(0.2) contrast(1.3) grayscale(0.5)',
          }}
        />

        {/* Deep dark gradient fades */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-background" />

        {/* Asymmetric focal glow: Cyan on left top, Violet on right center */}
        <div className="absolute top-1/4 left-1/6 w-[500px] h-[350px] bg-accent-cyan/8 blur-[160px] rounded-full" />
        <div className="absolute top-1/3 right-1/10 w-[550px] h-[450px] bg-accent-violet/12 blur-[170px] rounded-full" />

        {/* Technical grid lines */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />

        {/* Perimeter Telemetry Labels */}
        <div className="hidden xl:flex absolute top-28 left-8 flex-col gap-1 text-[10px] font-mono tracking-widest text-text-dim/70 uppercase">
          <span>SEC // 01 · SYSTEM READY</span>
          <span>COORDS // 44.8012°N 20.4651°E</span>
          <span>PROTOCOL // ROUND_ROBIN_V1</span>
        </div>
        <div className="hidden xl:flex absolute top-28 right-8 flex-col items-end gap-1 text-[10px] font-mono tracking-widest text-text-dim/70 uppercase">
          <span className="flex items-center gap-1.5 text-accent-cyan">
            <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full animate-ping" />
            TELEMETRY ACTIVE
          </span>
          <span>DB PERSISTENCE // VERIFIED</span>
          <span>CAPACITY // 5 SQUADS</span>
        </div>
      </div>

      {/* Main Content Container: Asymmetric Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (Editorial Typography & Actions) - 7 cols */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Section Tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-surface-card/90 border border-white/10 text-accent-cyan font-mono text-[11px] tracking-[0.25em] uppercase mb-6 clip-corner-tl"
            >
              <Crosshair className="w-3.5 h-3.5 text-accent-cyan animate-pulse" />
              <span>NEXUS // 01 · COMPETITIVE PROTOCOL</span>
            </motion.div>

            {/* Massive Editorial Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display text-6xl sm:text-7xl md:text-8xl xl:text-9xl font-extrabold text-white tracking-tight uppercase leading-[0.88] mb-6 drop-shadow-2xl"
            >
              WHERE
              <br />
              <span className="text-white/90">CHAMPIONS</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-white to-accent-violet drop-shadow-[0_0_35px_rgba(0,240,255,0.4)]">
                COLLIDE.
              </span>
            </motion.h1>

            {/* Subtitle Statement */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-base sm:text-lg md:text-xl text-text-muted max-w-xl mb-8 font-sans font-normal leading-relaxed"
            >
              A pure round-robin tournament battleground. Five elite squads. Ten high-stakes clashes. Zero margin for error. Real database persistence.
            </motion.p>

            {/* Rule Telemetry Strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-xl mb-8 p-3.5 bg-surface/80 border border-white/5 clip-corner-br"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent-cyan shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-mono font-bold text-white tracking-wide">5 SQUADS</span>
                  <span className="text-[9px] font-mono text-text-dim uppercase tracking-wider">MAX LIMIT</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-accent-cyan shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-mono font-bold text-white tracking-wide">5 PLAYERS</span>
                  <span className="text-[9px] font-mono text-text-dim uppercase tracking-wider">PER SQUAD</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Swords className="w-4 h-4 text-accent-violet shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-mono font-bold text-white tracking-wide">10 MATCHES</span>
                  <span className="text-[9px] font-mono text-text-dim uppercase tracking-wider">ROUND-ROBIN</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-mono font-bold text-white tracking-wide">MONGODB</span>
                  <span className="text-[9px] font-mono text-text-dim uppercase tracking-wider">REAL PERSISTENCE</span>
                </div>
              </div>
            </motion.div>

            {/* Primary & Secondary Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              <Link
                to="/tournament"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent-cyan text-black font-mono font-bold text-sm tracking-wider uppercase clip-corner-tr hover:bg-accent-cyan-hover transition-all duration-200 shadow-cyan hover:shadow-cyan-strong group"
              >
                <span>ENTER ARENA</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                to="/tournament#fixtures"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-surface-card border border-white/10 hover:border-accent-cyan/50 text-white font-mono font-medium text-sm tracking-wider uppercase clip-corner-bl hover:bg-surface-hover transition-all duration-200 group"
              >
                <span>VIEW FIXTURES</span>
                <span className="text-accent-cyan transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>

          </div>

          {/* Right Column (Emerging Metallic NEXUS Emblem in Darkness) - 5 cols */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="relative w-full max-w-[420px] aspect-square flex items-center justify-center"
            >
              {/* Outer decorative tactical ring with rotating dashes */}
              <div className="absolute inset-0 rounded-full border border-white/10 [border-dasharray:6px_8px] pointer-events-none" />
              <div className="absolute -inset-4 rounded-full border border-accent-cyan/20 animate-spin-slow pointer-events-none" style={{ animationDuration: '40s' }} />

              {/* Edge glow halo */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-accent-cyan/15 via-transparent to-accent-violet/25 blur-2xl pointer-events-none" />

              {/* Dark chassis frame */}
              <div className="relative w-[300px] sm:w-[340px] aspect-square rounded-2xl bg-surface/90 border border-white/15 p-6 flex flex-col items-center justify-between shadow-2xl backdrop-blur-md overflow-hidden">
                {/* Tech corner markings */}
                <div className="absolute top-2 left-2 text-[8px] font-mono text-text-dim">┌ NEXUS-CORE</div>
                <div className="absolute top-2 right-2 text-[8px] font-mono text-accent-cyan">STABLE // 1.0 ┐</div>
                <div className="absolute bottom-2 left-2 text-[8px] font-mono text-text-dim">└ ATLAS:CONNECTED</div>
                <div className="absolute bottom-2 right-2 text-[8px] font-mono text-accent-violet">SYS // OK ┘</div>

                {/* Grid scanline effect */}
                <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent" />

                {/* Subtitle tag */}
                <div className="pt-2 text-[10px] font-mono uppercase tracking-[0.3em] text-text-dim">
                  CHAMPIONSHIP EMBLEM
                </div>

                {/* Official Metallic NEXUS Emblem */}
                <div className="relative my-auto flex items-center justify-center group">
                  <div className="absolute -inset-4 rounded-full bg-accent-cyan/20 blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
                  <img
                    src="/nexus-mark.png"
                    alt="Official NEXUS Championship Emblem"
                    className="relative w-40 sm:w-48 h-40 sm:h-48 object-contain filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Technical status pill */}
                <div className="w-full flex items-center justify-between pt-2 border-t border-white/5 font-mono text-[10px]">
                  <span className="text-text-dim">CHAMPIONSHIP ARENA</span>
                  <span className="text-accent-cyan flex items-center gap-1.5 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                    ONLINE
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 pointer-events-none"
      >
        <span className="text-[10px] font-mono tracking-[0.25em] text-text-dim uppercase">
          EXPLORE ARENA
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-accent-cyan/80" />
        </motion.div>
      </motion.div>
    </section>
  );
};
