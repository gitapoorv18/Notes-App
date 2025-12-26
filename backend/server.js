import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import { connectDb } from './config/db.js';
import noteRoutes from './routes/notesRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/notes', noteRoutes);

// __dirname fix for ES modules
const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDb();
  console.log(`Server running on port ${PORT}`);
});
