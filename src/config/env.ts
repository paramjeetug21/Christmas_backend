import 'dotenv/config';

export const env = {
  mongoUri: process.env.MONGO_URI as string,
  port: Number(process.env.PORT) || 5000,
};

if (!env.mongoUri) {
  throw new Error('MONGO_URI missing');
}
