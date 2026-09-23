import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TournamentProvider } from './context/TournamentContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Landing } from './pages/Landing';
import { Tournament } from './pages/Tournament';

export const App = () => {
  return (
    <TournamentProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-background text-text-primary selection:bg-neon selection:text-black">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/tournament" element={<Tournament />} />
              {/* Fallback to landing */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </TournamentProvider>
  );
};

export default App;
