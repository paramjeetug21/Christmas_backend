import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import userRouter from './modules/user/user.server';
import router from './modules/massage/message.server';
import mongoose from 'mongoose';
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

console.log('Environment variables loaded');

app.get('/', (req, res) => {
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const dbStatus = mongoose.connection.readyState;
  const statusMap:any = {
    0: "Disconnected",
    1: "Connected",
    2: "Connecting",
    3: "Disconnecting"
  };

  res.status(200).json({
    message: 'Express API running successfully',
    database: statusMap[dbStatus] || "Unknown",
    timestamp: new Date().toISOString()
  });
});
app.use('/users', userRouter);
app.use('/messages', router);         

export default app;
