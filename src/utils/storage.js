/**
 * Safe local storage utility for UI preferences (theme, audio, layout toggles).
 * NOTE: As per tournament integrity rules, NO tournament data (teams, players, fixtures)
 * is stored in localStorage. All tournament records are stored and fetched from MongoDB.
 */

const PREF_KEY = 'nexus_ui_preferences';

export const storage = {
  getPreferences: () => {
    try {
      const data = localStorage.getItem(PREF_KEY);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  savePreferences: (prefs) => {
    try {
      localStorage.setItem(PREF_KEY, JSON.stringify(prefs));
      return true;
    } catch {
      return false;
    }
  },

  clearPreferences: () => {
    try {
      localStorage.removeItem(PREF_KEY);
      return true;
    } catch {
      return false;
    }
  },
};
