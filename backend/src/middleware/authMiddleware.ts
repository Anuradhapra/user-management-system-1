// backend/src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

// Extend the Request interface to include user property
interface AuthRequest extends Request {
    user?: { id: number; role: string; username: string };
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Extract token from "Bearer TOKEN"

        jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_change_this', (err, user) => {
            if (err) {
                console.error("JWT Verification Error:", err.message);
                return res.sendStatus(403); // Forbidden: Token is invalid or expired
            }
            req.user = user as { id: number; role: string; username: string };
            next(); // Proceed to the next middleware or route handler
        });
    } else {
        res.sendStatus(401); // Unauthorized: No token provided
    }
};

export const authorizeRoles = (roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.sendStatus(403); // Forbidden: User does not have the required role
        }
        next();
    };
};