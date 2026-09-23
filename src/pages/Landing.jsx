import React, { useEffect } from 'react';
import { Hero } from '../components/landing/Hero';
import { HeroStats } from '../components/landing/HeroStats';
import { HowItWorks } from '../components/landing/HowItWorks';
import { TournamentIntro } from '../components/landing/TournamentIntro';
import { CTA } from '../components/landing/CTA';

export const Landing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <Hero />
      <HeroStats />
      <HowItWorks />
      <TournamentIntro />
      <CTA />
    </div>
  );
};
