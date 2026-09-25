import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Shield, Zap } from 'lucide-react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    if (href.startsWith('/tournament#')) {
      const hash = href.split('#')[1];
      if (location.pathname === '/tournament') {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(href);
      }
    }
  };

  const navLinks = [
    { label: 'HOME', href: '/' },
    { label: 'TOURNAMENT', href: '/tournament' },
    { label: 'TEAMS', href: '/tournament#teams' },
    { label: 'FIXTURES', href: '/tournament#fixtures' },
  ];

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/' && !location.hash;
    if (href === '/tournament') return location.pathname === '/tournament' && !location.hash;
    if (href === '/tournament#teams') return location.pathname === '/tournament' && location.hash === '#teams';
    if (href === '/tournament#fixtures') return location.pathname === '/tournament' && location.hash === '#fixtures';
    return false;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/90 backdrop-blur-md border-b border-border/80 py-3 shadow-xl'
            : 'bg-gradient-to-b from-background/90 via-background/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-neon"
            aria-label="NEXUS Home"
          >
            {/* Desktop & Tablet: Full Official Logo */}
            <img
              src="/nexus-logo.png"
              alt="NEXUS Esports Tournament"
              className="h-10 sm:h-11 w-auto max-w-[140px] object-contain hidden sm:block group-hover:scale-105 group-hover:brightness-110 transition-all duration-300"
            />
            {/* Mobile: Compact N Symbol & Brand */}
            <div className="flex sm:hidden items-center gap-2">
              <img
                src="/nexus-mark.png"
                alt="NEXUS"
                className="h-8 w-8 object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <span className="font-display text-xl font-bold tracking-wider text-white">
                NEXUS
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={(e) => {
                  if (link.href.startsWith('/tournament#') && location.pathname === '/tournament') {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }
                }}
                className={`relative text-xs tracking-widest font-mono uppercase transition-colors duration-200 py-1 ${
                  isActive(link.href)
                    ? 'text-neon font-semibold'
                    : 'text-text-muted hover:text-white'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-neon shadow-[0_0_8px_#CCFF00]"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Action */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/tournament"
              className="relative inline-flex items-center gap-2 px-5 py-2.5 bg-neon text-black font-mono font-bold text-xs tracking-wider uppercase clip-corner-tr hover:bg-neon-hover transition-all duration-200 shadow-neon hover:shadow-neon-strong group"
            >
              <span>ENTER TOURNAMENT</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-surface border border-border text-white hover:text-neon hover:border-neon transition-colors focus:outline-none focus:ring-2 focus:ring-neon"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] z-40 bg-secondary/95 backdrop-blur-xl border-b border-border p-6 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              <div className="text-[10px] font-mono tracking-widest text-text-dim uppercase border-b border-border/50 pb-2">
                Navigation
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (link.href.startsWith('/tournament#') && location.pathname === '/tournament') {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }
                  }}
                  className={`text-sm tracking-wider font-mono uppercase py-2 px-3 rounded flex items-center justify-between ${
                    isActive(link.href)
                      ? 'bg-neon/10 text-neon font-bold border-l-2 border-neon'
                      : 'text-text-muted hover:text-white hover:bg-surface'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-text-dim">→</span>
                </Link>
              ))}

              <div className="pt-4 border-t border-border/50">
                <Link
                  to="/tournament"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-neon text-black font-mono font-bold text-xs tracking-wider uppercase clip-corner-tr hover:bg-neon-hover transition-all"
                >
                  <span>ENTER TOURNAMENT</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
