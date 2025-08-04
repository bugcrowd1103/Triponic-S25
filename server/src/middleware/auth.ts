import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {config } from '../config/env';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ status: 401, message: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret as string);
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ status: 401, message: 'Invalid or expired token' });
  }
}
