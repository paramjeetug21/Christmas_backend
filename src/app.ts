import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import userRouter from './modules/user/user.server';
import router from './modules/massage/message.server';
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

console.log('Environment variables loaded');

app.get('/', (req, res) => {
  res.send('Express API running successfully');
});
app.use('/users', userRouter);
app.use('/messages', router);         

export default app;
