import React, { useEffect } from 'react';
import { Hero } from '../components/landing/Hero';
import { HeroStats } from '../components/landing/HeroStats';
import { TheArena } from '../components/landing/TheArena';
import { HowItWorks } from '../components/landing/HowItWorks';
import { TournamentStructure } from '../components/landing/TournamentStructure';
import { LandingRosters } from '../components/landing/LandingRosters';
import { LandingFixtures } from '../components/landing/LandingFixtures';
import { CTA } from '../components/landing/CTA';

export const Landing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative overflow-hidden bg-background">
      <Hero />
      <HeroStats />
      <TheArena />
      <HowItWorks />
      <TournamentStructure />
      <LandingRosters />
      <LandingFixtures />
      <CTA />
    </div>
  );
};
