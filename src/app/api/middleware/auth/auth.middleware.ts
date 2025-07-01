import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env['SECRET'];

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: "Formato de token inválido" });
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!JWT_SECRET) {
    res.status(500).json({ error: "Error del servidor: JWT_SECRET no definido" });
    return;
  }

  try {
    const validToken = jwt.verify(token, JWT_SECRET);

    if (typeof validToken !== 'object' || !validToken) {
      res.status(401).json({ error: "Token no autorizado" });
      return;
    }
    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido o expirado" });
    return;
  }
};