import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTournament } from '../../context/TournamentContext';
import { ShieldCheck, Plus, AlertCircle, CheckCircle2, UserCheck, Lock, ArrowUpRight } from 'lucide-react';

export const TeamForm = () => {
  const { addTeam, teams, isCreatingTeam } = useTournament();

  const [teamName, setTeamName] = useState('');
  const [players, setPlayers] = useState(['', '', '', '', '']);
  const [errors, setErrors] = useState({
    name: null,
    players: [null, null, null, null, null],
    general: null,
  });
  const [successMessage, setSuccessMessage] = useState(null);

  const handlePlayerChange = (index, value) => {
    const updated = [...players];
    updated[index] = value;
    setPlayers(updated);

    // Clear field error on change
    if (errors.players[index]) {
      const updatedErrors = { ...errors };
      const updatedPlayerErrors = [...errors.players];
      updatedPlayerErrors[index] = null;
      updatedErrors.players = updatedPlayerErrors;
      setErrors(updatedErrors);
    }
  };

  const handleNameChange = (value) => {
    setTeamName(value);
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isCreatingTeam) return;
    setSuccessMessage(null);

    const result = await addTeam({
      name: teamName,
      players: players,
    });

    if (!result.success) {
      setErrors(result.errors);
    } else {
      // Success: clear form and show feedback
      setTeamName('');
      setPlayers(['', '', '', '', '']);
      setErrors({
        name: null,
        players: [null, null, null, null, null],
        general: null,
      });
      setSuccessMessage(`Squad "${result.team.name}" successfully registered into Atlas database!`);

      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    }
  };

  // If 5 teams exist, disable creation & display registration complete
  if (teams.length >= 5) {
    return (
      <div className="bg-surface/80 border border-white/10 clip-corner-both p-8 sm:p-10 relative overflow-hidden text-center shadow-card">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

        <div className="max-w-md mx-auto space-y-4 relative z-10">
          <div className="w-16 h-16 mx-auto bg-surface-card border border-accent-cyan/50 flex items-center justify-center text-accent-cyan clip-corner-tl shadow-cyan">
            <Lock className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan font-mono text-xs tracking-widest uppercase clip-corner-tl">
            REGISTRATION CLOSED // ROSTER LOCKED
          </div>

          <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white tracking-wide">
            TOURNAMENT POOL FULL
          </h3>

          <p className="font-mono text-base font-bold text-accent-cyan tracking-widest uppercase">
            5 / 5 SQUADS REGISTERED
          </p>

          <p className="text-text-muted text-sm font-sans max-w-sm mx-auto">
            Maximum team capacity reached for this tournament bracket. Proceed to fixture generation below to schedule the 10 round-robin clashes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface/80 border border-white/10 clip-corner-both p-6 sm:p-8 relative shadow-card overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/10 relative z-10 gap-2">
        <div>
          <span className="text-accent-cyan font-mono text-xs tracking-widest uppercase flex items-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full animate-ping" />
            REGISTRATION PROTOCOL // SLOT 0{teams.length + 1} OF 05
          </span>
          <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
            REGISTER COMBAT SQUAD
          </h3>
        </div>
        <div className="text-xs font-mono text-text-dim uppercase">
          Required: 1 Squad Name + 5 Active Operators
        </div>
      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 bg-accent-cyan/10 border border-accent-cyan/40 text-accent-cyan flex items-center gap-3 font-mono text-xs tracking-wider uppercase clip-corner-tl"
            role="status"
          >
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>{successMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* General Form Error */}
      {errors.general && (
        <div className="mb-6 p-4 bg-red-950/40 border border-red-500/50 text-red-300 flex items-center gap-3 font-mono text-xs tracking-wider uppercase clip-corner-tl">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
          <span>{errors.general}</span>
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-8 relative z-10">
        {/* Team Name Input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="team-name-input"
              className="block font-mono text-xs font-bold uppercase tracking-wider text-text-primary"
            >
              SQUAD NAME <span className="text-accent-cyan">*</span>
            </label>
            <span className="text-[10px] font-mono text-text-dim uppercase">
              Unique squad identifier (2-40 chars)
            </span>
          </div>
          <div className="relative">
            <input
              id="team-name-input"
              type="text"
              value={teamName}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. PHANTOM DIVISION"
              maxLength={40}
              className={`w-full px-4 py-3.5 bg-surface-card text-white placeholder-text-dim font-mono text-sm border focus:outline-none transition-colors clip-corner-tr ${
                errors.name
                  ? 'border-red-500/80 focus:border-red-500'
                  : 'border-white/10 focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan'
              }`}
            />
          </div>
          {errors.name && (
            <p className="mt-2 text-xs font-mono text-red-400 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* 5 Player Inputs */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-accent-cyan" />
              ACTIVE OPERATORS ROSTER (EXACTLY 5 REQUIRED)
            </span>
            <span className="text-[10px] font-mono text-text-dim uppercase">
              Slot verification
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {players.map((playerVal, index) => {
              const playerNum = String(index + 1).padStart(2, '0');
              const hasError = !!errors.players[index];

              return (
                <div key={index} className="space-y-1.5">
                  <label
                    htmlFor={`player-input-${index}`}
                    className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-text-muted"
                  >
                    <span>OPERATOR {playerNum} <span className="text-accent-cyan">*</span></span>
                    <span className="text-[9px] text-text-dim">SLOT {playerNum}</span>
                  </label>
                  <input
                    id={`player-input-${index}`}
                    type="text"
                    value={playerVal}
                    onChange={(e) => handlePlayerChange(index, e.target.value)}
                    placeholder={`Operator ${playerNum} handle`}
                    maxLength={30}
                    className={`w-full px-3.5 py-2.5 bg-surface-card text-white placeholder-text-dim font-mono text-xs border focus:outline-none transition-colors clip-corner-tl ${
                      hasError
                        ? 'border-red-500/80 focus:border-red-500'
                        : 'border-white/10 focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan'
                    }`}
                  />
                  {hasError && (
                    <p className="text-[10px] font-mono text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>{errors.players[index]}</span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
          <div className="text-xs font-mono text-text-dim">
            {5 - teams.length} squad slot{5 - teams.length > 1 ? 's' : ''} available in tournament pool.
          </div>

          <button
            type="submit"
            disabled={isCreatingTeam}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-accent-cyan text-black font-mono font-bold text-xs tracking-wider uppercase clip-corner-tr hover:bg-accent-cyan-hover transition-all duration-200 shadow-cyan hover:shadow-cyan-strong disabled:opacity-50 group"
          >
            <span>{isCreatingTeam ? 'REGISTERING SQUAD...' : 'REGISTER SQUAD'}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </form>
    </div>
  );
};
