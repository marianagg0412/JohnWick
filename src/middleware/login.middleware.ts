import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.utils";
import { User, UserRole } from "../interfaces/User";

declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}

export const verifyTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.sendStatus(401); // Unauthorized
    }
    try {
        const jwt = authHeader.split(' ')[1];
        const valid = verifyToken(jwt);
        if (!valid) {
            return res.sendStatus(403).send({message:"Forbidden log"}); // Forbidden
        }
        next();
    } catch (error) {
        return res.sendStatus(403).send({message:"Invalid log"}); // Forbidden
    }
};

export const checkUserRole = (requiredRole: UserRole) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.user.role !== requiredRole) {
            return res.status(403).send('Forbidden'); // User does not have the required role
        }
        next(); // Proceed to the route handler
    };
};
