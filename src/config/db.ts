import mongoose from 'mongoose';
import { env } from './env';

export const connectDB = async () => {
  // 1. Check if we already have a connection
  if (mongoose.connection.readyState >= 1) {
    return; 
  }

  try {
    // 2. Use the URI from your env file
    // Ensure env.mongoUri is correctly mapping to process.env.MONGO_URI
    await mongoose.connect(env.mongoUri);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:');
    // Throw error so the calling function knows the DB is down
    throw error; 
  }
};