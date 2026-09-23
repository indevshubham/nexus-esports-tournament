import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { api } from '../services/api';

const TournamentContext = createContext(null);

export const TournamentProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const [isGeneratingFixtures, setIsGeneratingFixtures] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [serverError, setServerError] = useState(null);

  // Fetch initial tournament data from backend
  const loadTournamentData = useCallback(async () => {
    try {
      setServerError(null);
      const [teamsData, fixturesData] = await Promise.all([
        api.getTeams().catch((err) => {
          console.warn('Teams fetch error:', err.message);
          throw err;
        }),
        api.getFixtures().catch((err) => {
          console.warn('Fixtures fetch error:', err.message);
          throw err;
        }),
      ]);

      setTeams(Array.isArray(teamsData) ? teamsData : []);
      setFixtures(Array.isArray(fixturesData) ? fixturesData : []);
    } catch (err) {
      setServerError(err.message || 'Unable to connect to tournament backend.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTournamentData();
  }, [loadTournamentData]);

  // Create Squad via Backend API
  const addTeam = async ({ name, players }) => {
    const trimmedName = (name || '').trim();
    const cleanPlayers = (players || []).map((p) => (p || '').trim());

    const errors = {
      name: null,
      players: [null, null, null, null, null],
      general: null,
    };

    // Client-side pre-validation
    if (teams.length >= 5) {
      errors.general = 'Tournament team limit reached (Maximum 5 squads allowed).';
      return { success: false, errors };
    }

    if (!trimmedName) {
      errors.name = 'Team name is required.';
    } else if (
      teams.some((t) => t.name.toLowerCase() === trimmedName.toLowerCase())
    ) {
      errors.name = 'A squad with this name already exists.';
    }

    if (cleanPlayers.length !== 5) {
      errors.general = 'Exactly 5 players are required for registration.';
    }

    let hasPlayerError = false;
    const seenPlayerNames = new Set();

    cleanPlayers.forEach((playerName, idx) => {
      if (!playerName) {
        errors.players[idx] = `Player ${idx + 1} name is required.`;
        hasPlayerError = true;
      } else if (seenPlayerNames.has(playerName.toLowerCase())) {
        errors.players[idx] = 'Duplicate player name within the same squad.';
        hasPlayerError = true;
      } else {
        seenPlayerNames.add(playerName.toLowerCase());
      }
    });

    if (errors.name || hasPlayerError || errors.general) {
      return { success: false, errors };
    }

    setIsCreatingTeam(true);
    setServerError(null);

    try {
      const response = await api.createTeam({
        name: trimmedName,
        players: cleanPlayers.map((p) => ({ name: p })),
      });

      if (response.success && response.data) {
        // Update local state with persisted team from MongoDB
        setTeams((prev) => [...prev, response.data]);
        // Fixtures are invalidated on squad change
        setFixtures([]);
        return { success: true, team: response.data };
      } else {
        errors.general = response.message || 'Failed to create squad.';
        return { success: false, errors };
      }
    } catch (err) {
      errors.general = err.message || 'Server error while creating squad.';
      return { success: false, errors };
    } finally {
      setIsCreatingTeam(false);
    }
  };

  // Generate Fixtures via Backend API
  const generateFixtures = async () => {
    if (teams.length !== 5) {
      return {
        success: false,
        error: 'Exactly 5 teams must be registered before generating fixtures.',
      };
    }

    setIsGeneratingFixtures(true);
    setServerError(null);

    try {
      const response = await api.generateFixtures();
      if (response.success && response.data) {
        setFixtures(response.data);
        return { success: true, fixtures: response.data };
      } else {
        return { success: false, error: response.message || 'Failed to generate fixtures.' };
      }
    } catch (err) {
      return { success: false, error: err.message || 'Server error while generating fixtures.' };
    } finally {
      setIsGeneratingFixtures(false);
    }
  };

  // Reset Tournament via Backend API
  const resetTournament = async () => {
    setIsResetting(true);
    setServerError(null);

    try {
      await api.resetTournament();
      setTeams([]);
      setFixtures([]);
      return { success: true };
    } catch (err) {
      setServerError(err.message || 'Failed to reset tournament on server.');
      return { success: false, error: err.message };
    } finally {
      setIsResetting(false);
    }
  };

  // Status computation
  const tournamentStatus = useMemo(() => {
    if (fixtures.length === 10) return 'FIXTURES GENERATED';
    if (teams.length === 5) return 'REGISTRATION COMPLETE';
    return 'REGISTRATION OPEN';
  }, [teams.length, fixtures.length]);

  const value = {
    teams,
    fixtures,
    isLoading,
    isCreatingTeam,
    isGeneratingFixtures,
    isResetting,
    serverError,
    addTeam,
    generateFixtures,
    resetTournament,
    refreshData: loadTournamentData,
    tournamentStatus,
    maxTeams: 5,
    maxPlayers: 25,
    totalMatches: 10,
    isComplete: teams.length === 5,
    canGenerate: teams.length === 5 && fixtures.length === 0,
    hasFixtures: fixtures.length > 0,
  };

  return (
    <TournamentContext.Provider value={value}>
      {children}
    </TournamentContext.Provider>
  );
};

export const useTournament = () => {
  const context = useContext(TournamentContext);
  if (!context) {
    throw new Error('useTournament must be used within a TournamentProvider');
  }
  return context;
};
