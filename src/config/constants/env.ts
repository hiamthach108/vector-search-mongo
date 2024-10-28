import dotenv from 'dotenv';

dotenv.config();

export const HTTP_PORT = process.env.HTTP_PORT || 8080;

export const DB_URL = process.env.DB_URL as string;
