import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTournament } from '../context/TournamentContext';
import { TournamentStats } from '../components/tournament/TournamentStats';
import { TeamForm } from '../components/tournament/TeamForm';
import { TeamCard } from '../components/tournament/TeamCard';
import { EmptyState } from '../components/tournament/EmptyState';
import { FixtureSection } from '../components/tournament/FixtureSection';
import { ConfirmModal } from '../components/tournament/ConfirmModal';
import { Terminal, Shield, Crosshair, Users, Swords } from 'lucide-react';

export const Tournament = () => {
  const { teams, resetTournament, isLoading, serverError, refreshData } = useTournament();
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const location = useLocation();
  const formRef = useRef(null);

  // Handle hash scrolling (#teams, #fixtures)
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace('#', '');
      const element = document.getElementById(elementId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-background relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-violet/5 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-accent-cyan/5 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Page Command Center Header */}
        <div className="border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-white/10 text-accent-cyan font-mono text-[10px] tracking-widest uppercase mb-4 clip-corner-tl">
            <Terminal className="w-3.5 h-3.5 text-accent-cyan" />
            NEXUS // CONTROL DECK · ARENA PROTOCOL
          </div>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white leading-none">
            TOURNAMENT CONTROL
          </h1>
          <p className="text-text-muted text-base sm:text-lg font-sans mt-3">
            Register your squads, verify 5v5 rosters, and compute the 10-match round-robin fixture matrix.
          </p>
        </div>

        {/* Server Error Notification if backend unavailable */}
        {serverError && (
          <div className="p-4 bg-red-950/40 border border-red-500/50 text-red-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs tracking-wider uppercase clip-corner-tl">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
              <span>SERVER TELEMETRY ERROR: {serverError}</span>
            </div>
            <button
              type="button"
              onClick={refreshData}
              className="px-3 py-1 bg-surface border border-red-500/40 hover:bg-surface-card text-white transition-colors"
            >
              RETRY CONNECTION
            </button>
          </div>
        )}

        {/* Dynamic Tournament Metrics & Status */}
        <TournamentStats onResetClick={() => setIsResetModalOpen(true)} />

        {/* Create Squad Form */}
        <div ref={formRef} id="register" className="scroll-mt-28">
          <TeamForm />
        </div>

        {/* Registered Teams Section */}
        <section id="teams" className="scroll-mt-28 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <span className="text-accent-cyan font-mono text-xs tracking-widest uppercase flex items-center gap-1.5 mb-1">
                <Users className="w-3.5 h-3.5 text-accent-cyan" />
                ACTIVE ROSTERS // CONFIRMED POOL
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
                REGISTERED SQUADS
              </h2>
            </div>
            <div className="font-mono text-xs text-text-dim uppercase">
              {teams.length} of 5 squads registered
            </div>
          </div>

          {/* Teams Grid or Sophisticated Empty State */}
          {teams.length === 0 ? (
            <EmptyState onActionClick={handleScrollToForm} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((team, index) => (
                <TeamCard key={team._id || team.id} team={team} index={index} />
              ))}
            </div>
          )}
        </section>

        {/* Tournament Fixtures Section */}
        <FixtureSection />
      </div>

      {/* Reset Confirmation Modal */}
      <ConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={resetTournament}
      />
    </div>
  );
};
