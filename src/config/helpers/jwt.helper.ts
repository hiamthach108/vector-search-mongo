import jwt from 'jsonwebtoken';

const JWT_SECRET = 'my_secret_key';

export type Payload = {
  userId: string;
  iat: number;
  exp: number;
};

export const generateAccessToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '6h' });
};

export const verifyAccessToken = (token: string): Payload => {
  return jwt.verify(token, JWT_SECRET) as Payload;
};
