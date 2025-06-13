import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


// Verify token
export const authenticateJWT = (req: any, res: any, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "User Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
    if (err) return res.status(403).json({ message: "User Forbidden" });
    req.user = user;
    next();
  });
};

// Authorize roles
export const authorizeRoles = (...roles: string[]) => {
  return (req: any, res: any, next: NextFunction) => {
    if (!roles.includes(req.user.role)) return res.status(403).json({ message: "User Forbidden" });
    next();
  };
};