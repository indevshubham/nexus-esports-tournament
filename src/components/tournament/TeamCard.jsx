import React from 'react';
import { motion } from 'framer-motion';
import { Shield, User, Hash } from 'lucide-react';

// Abstract geometric emblems for teams based on their tournament slot (1 to 5)
const GeometricEmblem = ({ index }) => {
  const emblems = [
    // Slot 1: Diamond Chevron
    (
      <svg viewBox="0 0 40 40" className="w-8 h-8 text-neon" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="20 4 36 20 20 36 4 20" />
        <line x1="20" y1="12" x2="20" y2="28" />
        <line x1="12" y1="20" x2="28" y2="20" />
      </svg>
    ),
    // Slot 2: Hexagon Core
    (
      <svg viewBox="0 0 40 40" className="w-8 h-8 text-neon" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="20 4 35 12 35 28 20 36 5 28 5 12" />
        <circle cx="20" cy="20" r="4" fill="currentColor" />
      </svg>
    ),
    // Slot 3: Delta Vanguard
    (
      <svg viewBox="0 0 40 40" className="w-8 h-8 text-neon" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="20 5 36 34 4 34" />
        <polygon points="20 18 28 32 12 32" strokeWidth="1.5" />
      </svg>
    ),
    // Slot 4: Cross Quadrant
    (
      <svg viewBox="0 0 40 40" className="w-8 h-8 text-neon" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="6" y="6" width="12" height="12" />
        <rect x="22" y="6" width="12" height="12" />
        <rect x="6" y="22" width="12" height="12" />
        <rect x="22" y="22" width="12" height="12" />
      </svg>
    ),
    // Slot 5: Octagon Matrix
    (
      <svg viewBox="0 0 40 40" className="w-8 h-8 text-neon" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 4 28 4 36 12 36 28 28 36 12 36 4 28 4 12" />
        <circle cx="20" cy="20" r="5" strokeWidth="1.5" />
      </svg>
    ),
  ];

  return emblems[(index - 1) % emblems.length];
};

export const TeamCard = ({ team, index }) => {
  const teamSlot = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="bg-secondary/80 border border-border hover:border-neon/60 transition-all duration-300 clip-corner-both p-6 relative flex flex-col justify-between group shadow-card"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4 pb-4 border-b border-border/60">
          <div>
            <div className="font-mono text-xs font-bold text-neon tracking-widest uppercase flex items-center gap-1.5 mb-1">
              <span>TEAM {teamSlot}</span>
              <span className="text-text-dim">// SEED {index + 1}</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white tracking-wide break-words group-hover:text-neon transition-colors">
              {team.name}
            </h3>
          </div>

          {/* Abstract Generated Identity */}
          <div className="p-2.5 bg-surface border border-border group-hover:border-neon/40 clip-tag flex items-center justify-center">
            <GeometricEmblem index={index + 1} />
          </div>
        </div>

        {/* Players List */}
        <div className="space-y-2 mt-4">
          <div className="text-[10px] font-mono tracking-widest text-text-dim uppercase pb-1 flex items-center justify-between">
            <span>ROSTER SPECIFICATION</span>
            <span>5 PLAYERS</span>
          </div>

          {team.players?.map((player, pIdx) => {
            const playerNum = String(pIdx + 1).padStart(2, '0');
            return (
              <div
                key={player._id || player.id || pIdx}
                className="flex items-center justify-between p-2.5 bg-surface/80 border border-border/60 clip-tag group-hover:border-border transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[10px] text-neon font-bold">
                    P{playerNum}
                  </span>
                  <span className="font-mono text-xs text-text-primary uppercase tracking-wider font-medium truncate max-w-[170px] sm:max-w-[200px]">
                    {player.name}
                  </span>
                </div>
                <span className="text-[9px] font-mono text-text-dim uppercase">
                  ACTIVE
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Card Footer Telemetry */}
      <div className="mt-6 pt-3 border-t border-border/40 flex items-center justify-between text-[10px] font-mono text-text-dim relative z-10">
        <span>STATUS: READY</span>
        <span className="text-neon/80">CONFIRMED</span>
      </div>
    </motion.div>
  );
};
