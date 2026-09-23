import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import teamRoutes from './routes/teamRoutes.js';
import fixtureRoutes from './routes/fixtureRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Security and utility middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. curl, server-to-server)
      if (!origin) return callback(null, true);
      // Allow any local origin (localhost, 127.0.0.1 on any port) or configured frontend
      if (
        origin === frontendUrl ||
        /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
      ) {
        return callback(null, true);
      }
      return callback(null, true); // Dev-friendly fallback
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json({ limit: '10kb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'NEXUS Tournament API',
  });
});

// Mount Routes
app.use('/api/teams', teamRoutes);
app.use('/api/fixtures', fixtureRoutes);

// Catch-all 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.originalUrl} not found on this server.`,
  });
});

// Centralized error handling middleware
app.use(errorHandler);

// Start server after connecting to database
let server;

export const startServer = async () => {
  try {
    await connectDB();
    return new Promise((resolve, reject) => {
      server = app.listen(PORT, '0.0.0.0', () => {
        console.log(`NEXUS Tournament Backend listening on port ${PORT}`);
        console.log(`Allowed CORS Origin: ${frontendUrl}`);
        resolve(server);
      });
      server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          console.error(`\n[NEXUS BACKEND ERROR] Port ${PORT} is already in use.`);
          console.error(`Another process is already running on port ${PORT}.`);
          console.error(`To release port ${PORT} on macOS, run:`);
          console.error(`  lsof -ti :${PORT} | xargs kill -9\n`);
        }
        reject(err);
      });
    });
  } catch (error) {
    console.error(`Failed to launch server: ${error.message}`);
    process.exit(1);
  }
};

// Graceful termination and nodemon reload handlers
const gracefulExit = (signal) => {
  if (server) {
    server.close(() => {
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGINT', () => gracefulExit('SIGINT'));
process.on('SIGTERM', () => gracefulExit('SIGTERM'));
process.once('SIGUSR2', () => {
  if (server) {
    server.close(() => {
      process.kill(process.pid, 'SIGUSR2');
    });
  } else {
    process.kill(process.pid, 'SIGUSR2');
  }
});

// Start automatically if run directly via CLI (not when imported in test suites)
import { fileURLToPath } from 'node:url';
const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];

if (isDirectRun && process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;
