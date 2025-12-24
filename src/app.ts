import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { connectDB } from './config/db';

const app = express();

// 🔴 THIS WAS MISSING FOR VERCEL
connectDB().catch(err => {
  console.error('Database connection error:', err);
});

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get('/', (req, res) => {
  const statusMap: any = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting',
  };

  res.json({
    database: statusMap[mongoose.connection.readyState],
  });
});

export default app;
