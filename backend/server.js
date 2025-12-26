import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDb } from './config/db.js';
import noteRoutes from './routes/notesRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/notes', noteRoutes);

const PORT = process.env.PORT || 3000;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });
