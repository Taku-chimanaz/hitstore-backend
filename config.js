import dotenv from 'dotenv';

dotenv.config();

export const envVariables = {
  database: process.env.databaseUrl,
  secretKey: process.env.secretKey,
};