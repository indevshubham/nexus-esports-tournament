const rawBaseUrl = import.meta.env.VITE_API_URL || 'https://nexus-esports-tournament.onrender.com/api';
// Normalize base URL: strip trailing slashes and ensure /api suffix
const trimmedBase = rawBaseUrl.replace(/\/+$/, '');
const API_BASE_URL = trimmedBase.endsWith('/api') ? trimmedBase : `${trimmedBase}/api`;

/**
 * Standard fetch helper with error handling and user-friendly error messages
 */
async function request(endpoint, options = {}) {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMessage =
        json.message || `Request failed with status ${response.status}`;
      const error = new Error(errorMessage);
      error.status = response.status;
      error.data = json;
      throw error;
    }

    return json;
  } catch (error) {
    // Distinguish network/connection failure vs server response across browsers
    const isNetworkError =
      error.name === 'TypeError' &&
      (error.message.includes('fetch') ||
       error.message.includes('Load failed') ||
       error.message.includes('NetworkError') ||
       error.message.includes('network'));

    if (isNetworkError || error.isNetworkError) {
      const connectionError = new Error(
        'Unable to connect to the NEXUS backend server. Please verify the backend is running.'
      );
      connectionError.isNetworkError = true;
      throw connectionError;
    }
    throw error;
  }
}

export const api = {
  // Teams
  getTeams: async () => {
    const res = await request('/teams');
    return res.data || [];
  },

  getTeamById: async (id) => {
    const res = await request(`/teams/${id}`);
    return res.data;
  },

  createTeam: async ({ name, players }) => {
    const res = await request('/teams', {
      method: 'POST',
      body: JSON.stringify({ name, players }),
    });
    return res;
  },

  deleteTeam: async (id) => {
    const res = await request(`/teams/${id}`, {
      method: 'DELETE',
    });
    return res;
  },

  // Fixtures
  getFixtures: async () => {
    const res = await request('/fixtures');
    return res.data || [];
  },

  generateFixtures: async () => {
    const res = await request('/fixtures/generate', {
      method: 'POST',
    });
    return res;
  },

  resetFixtures: async () => {
    const res = await request('/fixtures/reset', {
      method: 'DELETE',
    });
    return res;
  },

  // Full Tournament Reset
  resetTournament: async () => {
    const res = await request('/teams/reset', {
      method: 'POST',
    });
    return res;
  },

  // System Health
  checkHealth: async () => {
    const res = await request('/health');
    return res;
  },
};
