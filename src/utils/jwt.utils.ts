import jwt from 'jsonwebtoken'
import {UserRole} from '../interfaces/User'

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret'

export const signToken = (id: string, role: UserRole) => {
    return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: '2h' });
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
};