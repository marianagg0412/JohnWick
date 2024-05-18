import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.utils";
import { User, UserRole } from "../interfaces/User";

export const verifyTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.sendStatus(401); // Unauthorized
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }
    try {
        const decoded = verifyToken(token) as User;  // Assuming verifyToken returns the decoded token
        if (!decoded) {
            return res.sendStatus(403); // Forbidden
        }
        req.user = decoded;  // Set the user on the request
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(403).send({ message: "Invalid token" }); // Forbidden
    }
};

export const checkUserRole = (requiredRole: UserRole) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || req.user.role !== requiredRole) {
            return res.status(403).send('Forbidden'); // User does not have the required role
        }
        next(); // Proceed to the route handler
    };
};