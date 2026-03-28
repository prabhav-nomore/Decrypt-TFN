import express from 'express';
import { createServer as createViteServer } from 'vite';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import cors from 'cors';
import apiRoutes from './server/routes/api.ts';
import { setupSocket } from './server/socket.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  app.use(cors());
  app.use(express.json());

  // Setup Socket.IO
  setupSocket(io);

  // API routes
  app.use('/api', apiRoutes);

  // Serve puzzles directory for HTML inspection
  app.use('/puzzles', (req, res, next) => {
    const lowerUrl = req.url.toLowerCase();
    const isSensitive = 
      lowerUrl.includes('solution') || 
      lowerUrl.includes('answer') || 
      lowerUrl.includes('verifier') || 
      lowerUrl.includes('organizer') || 
      lowerUrl.includes('reference') ||
      lowerUrl.includes('plaintext');

    if (isSensitive) {
      return res.status(403).json({ error: 'Access to internal files is forbidden' });
    }
    next();
  }, express.static(path.join(__dirname, 'server', 'puzzle_bank')));

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
