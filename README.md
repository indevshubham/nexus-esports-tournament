# NEXUS — Esports Tournament Platform

> **"WHERE CHAMPIONS COLLIDE."**  
> Full-Stack Tactical Esports Tournament Management & Fixture Generation Engine.

---

## 1. Overview

**NEXUS** is a full-stack esports tournament management platform designed for competitive precision, disciplined team registration, and algorithmic round-robin scheduling. Engineered as an esports tournament control center, NEXUS features a separated client-server architecture: a modern React frontend connected via REST API to a Node.js + Express backend powered by MongoDB Atlas with Mongoose ODM.

The application adheres strictly to competitive integrity:
- **Zero Fake Data**: The database starts completely pristine. All squads, rosters, and fixtures are created in real time through user operations.
- **Strict Capacity**: Hard limit of exactly 5 teams ($N = 5$).
- **Fixed Squad Composition**: Exactly 5 players per team (25 total combatants).
- **Mathematical Round-Robin Engine**: Generates exactly 10 unique clashes ($5 \times 4 / 2 = 10$).

---

## 2. Features

- **Full-Stack Architecture**: Clean separation between React (Vite) client and Node/Express REST API.
- **Persistent Database Storage**: Real-time persistence with MongoDB Atlas and Mongoose schemas.
- **Dynamic Tournament Telemetry**: Live updating counters tracking registered squads (0/5), confirmed operators (0/25), scheduled matches (0/10), and operational status.
- **Squad Registration Protocol**:
  - Exactly 5 player inputs per team (Player 01 through Player 05).
  - Strict whitespace trimming and case-insensitive unique squad name enforcement.
  - Squad-internal duplicate player prevention.
  - Inline error messaging and field validation feedback.
  - Hard backend limit preventing more than 5 squads.
- **Algorithmic Round-Robin Fixture Engine**:
  - Mathematically generates all 10 unique head-to-head clashes for 5 teams:
    $$\text{Matches} = \frac{N \times (N - 1)}{2} = \frac{5 \times 4}{2} = 10$$
  - Prevents teams from playing themselves and guarantees exactly 4 matches per squad.
  - References MongoDB Team document IDs.
  - Status tracking with `UPCOMING` match badges.
  - Duplicate fixture protection (returns existing schedule if already generated).
- **Safe Tournament Reset**: Atomic endpoint and double-confirmation dialog to safely purge rosters and schedules.
- **Error Handling & Resilience**: Centralized middleware on the backend and user-friendly error banners on the frontend.
- **Approved Visual Identity**: Dark palette (`#08090D`, `#101218`, `#151821`), subtle grid/grain textures, sharp geometric chamfers (`clip-path`), electric lime (`#CCFF00`) accents, and Framer Motion micro-interactions.

---

## 3. Tech Stack

### Frontend
- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom dark tactical theme
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: Centralized native `fetch` service with error handling

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas) with [Mongoose ODM](https://mongoosejs.com/)
- **Security**: [Helmet](https://helmetjs.github.io/) & [CORS](https://github.com/expressjs/cors)
- **Configuration**: [dotenv](https://github.com/motdotla/dotenv)
- **Dev Server**: [Nodemon](https://nodemon.io/)

---

## 4. Architecture

```text
React/Vite Frontend (Port 5173)
        │
        ▼ REST API (JSON / HTTP)
Node.js + Express Backend (Port 5000)
        │
        ▼ Mongoose ODM
MongoDB Atlas / Local MongoDB
```

### Frontend Architecture
- `src/services/api.js`: Centralized API service for all HTTP communications.
- `src/context/TournamentContext.jsx`: Reactive state management connecting the UI directly to backend endpoints, managing loading flags and telemetry.
- `src/components/`: Reusable tactical UI components (Navbar, Hero, Stats, HowItWorks, TeamForm, TeamCard, FixtureSection, FixtureCard, ConfirmModal).
- `src/pages/`: Landing page (`/`) and Tournament Control Center (`/tournament`).

### Backend Architecture
- `backend/src/config/database.js`: Mongoose connection lifecycle manager.
- `backend/src/models/`: Schema definitions with strict validation for `Team` and `Fixture`.
- `backend/src/services/fixtureService.js`: Pure mathematical round-robin calculation and database population.
- `backend/src/controllers/`: Request handling, validation, status codes, and JSON responses (`teamController.js`, `fixtureController.js`).
- `backend/src/routes/`: Express routers mapping URLs to controllers (`teamRoutes.js`, `fixtureRoutes.js`).
- `backend/src/middleware/errorHandler.js`: Centralized error handler returning clean JSON responses.

---

## 5. Database Architecture

### Team Model (`teams` collection)
```javascript
{
  _id: ObjectId,
  name: { type: String, required: true, unique: true, trim: true },
  players: [
    {
      _id: ObjectId,
      name: { type: String, required: true, trim: true }
    } // Exactly 5 player objects
  ],
  createdAt: Date,
  updatedAt: Date
}
```
**Validation Rules**:
- Team name is required, trimmed, and case-insensitively unique.
- Players array must contain exactly 5 objects.
- Each player name must be non-empty and trimmed.
- Duplicate player names within the same squad are rejected.

### Fixture Model (`fixtures` collection)
```javascript
{
  _id: ObjectId,
  matchNumber: { type: Number, required: true, min: 1, max: 10, unique: true },
  teamA: { type: ObjectId, ref: 'Team', required: true },
  teamB: { type: ObjectId, ref: 'Team', required: true },
  roundName: { type: String, default: 'ROUND ROBIN' },
  status: { type: String, enum: ['UPCOMING', 'IN_PROGRESS', 'COMPLETED'], default: 'UPCOMING' },
  createdAt: Date,
  updatedAt: Date
}
```

---

## 6. Tournament Logic

NEXUS implements a single-tier **Round-Robin** schedule matrix. For a closed tournament of $N = 5$ squads, each team must face every other team once:

$$\text{Total Matches} = \frac{N \times (N - 1)}{2} = \frac{5 \times 4}{2} = 10 \text{ matches}$$

The generator algorithm iterates through all combinations $(i, j)$ where $0 \le i < j < 5$, creating the 10 canonical pairings:

1. **Match 01**: Team 1 vs Team 2
2. **Match 02**: Team 1 vs Team 3
3. **Match 03**: Team 1 vs Team 4
4. **Match 04**: Team 1 vs Team 5
5. **Match 05**: Team 2 vs Team 3
6. **Match 06**: Team 2 vs Team 4
7. **Match 07**: Team 2 vs Team 5
8. **Match 08**: Team 3 vs Team 4
9. **Match 09**: Team 3 vs Team 5
10. **Match 10**: Team 4 vs Team 5

**Integrity Protections**:
- Cannot generate fixtures before exactly 5 teams exist.
- Duplicate generation returns the existing 10 fixtures without recreating them.
- If teams are deleted or reset, existing fixtures are purged.

---

## 7. API Endpoints

### Teams
| Method | Endpoint | Description | Status Codes |
|---|---|---|---|
| `GET` | `/api/teams` | Get all registered teams | `200` |
| `POST` | `/api/teams` | Register a new squad (hard limit of 5) | `201`, `400` |
| `GET` | `/api/teams/:id` | Get team by ID | `200`, `404` |
| `DELETE` | `/api/teams/:id` | Delete team by ID (invalidates fixtures) | `200`, `404` |
| `POST` | `/api/teams/reset` | Purge all teams and fixtures | `200` |

### Fixtures
| Method | Endpoint | Description | Status Codes |
|---|---|---|---|
| `GET` | `/api/fixtures` | Get all generated fixtures (populated) | `200` |
| `POST` | `/api/fixtures/generate` | Generate 10 round-robin fixtures | `201` (new), `200` (exists), `400` |
| `DELETE` | `/api/fixtures/reset` | Clear all fixtures | `200` |

### System
| Method | Endpoint | Description | Status Code |
|---|---|---|---|
| `GET` | `/api/health` | Service health status | `200` |

---

## 8. Environment Variables

### Backend (`backend/.env`)
```bash
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/nexus_tournament
# Or MongoDB Atlas connection string:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/nexus_tournament?retryWrites=true&w=majority
FRONTEND_URL=http://localhost:5173
```

### Frontend (`.env`)
```bash
VITE_API_URL=http://localhost:5000/api
```

---

## 9. MongoDB Atlas Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Create a new cluster (e.g. Shared M0 free tier).
3. Under **Database Access**, create a database user with username and password (read/write access).
4. Under **Network Access**, add your current IP address (or `0.0.0.0/0` for cloud deployment).
5. Under **Database** > **Connect**, choose **Drivers** (Node.js) and copy the connection string.
6. Replace `<password>` with your database user password.
7. Paste this connection string into `backend/.env` as `MONGODB_URI`:
   ```bash
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/nexus_tournament?retryWrites=true&w=majority
   ```

---

## 10. Local Development Setup

### 1. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install && cd ..
```

### 2. Configure Environment Files
```bash
# Frontend
cp .env.example .env

# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your MONGODB_URI if using Atlas
```

### 3. Run the Backend
```bash
cd backend
npm run dev
# Server will connect to MongoDB and start on http://localhost:5000
```

### 4. Run the Frontend
```bash
# In the project root (in a separate terminal)
npm run dev
# Frontend will start on http://localhost:5173
```

---

## 11. Running Automated Tests

Run all unit, integration, and end-to-end tests across the entire project:

```bash
# Run all tests (frontend + backend)
npm run test:all

# Run only frontend tests
npm test

# Run only backend tests (integration + 22-step e2e verification)
cd backend && npm test
```

### Test Coverage Summary:
- **Frontend Storage**: Fallback resilience, JSON corruption recovery, empty initial states.
- **Frontend Logic**: 5 teams $\to$ 10 unique matches, team count boundary checks.
- **Backend API**: Validation of 5 players, duplicate player rejection, unique team names, 6th team rejection (400), round-robin match generation, duplicate generation prevention, and atomic tournament reset.
- **Section 22 E2E Flow**: Full 22-step lifecycle test covering the exact user journey.

---

## 12. Deployment Instructions

### Backend (e.g. Render, Railway, Heroku)
1. Set the root directory to `backend`.
2. Build command: `npm install`.
3. Start command: `npm start`.
4. Environment variables:
   - `PORT`: (provided automatically by host or set to 5000)
   - `MONGODB_URI`: Your MongoDB Atlas connection string.
   - `FRONTEND_URL`: URL of the deployed frontend (e.g. `https://nexus-esports.vercel.app`).

### Frontend (e.g. Vercel, Netlify)
1. Set the root directory to `./`.
2. Build command: `npm run build`.
3. Output directory: `dist`.
4. Environment variable:
   - `VITE_API_URL`: URL of the deployed backend (e.g. `https://nexus-api.onrender.com/api`).
