import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'Paramjeet';
    const decoded = jwt.verify(token, secret) as { id: string };

    (req as any).userId = decoded.id; 
    
    next(); 
  } catch (error) {
    res.status(403).json({ message: 'Invalid or Expired Token' });
  }
};