// src/types/custom-types.d.ts
import { User } from '../interfaces/User';  // Adjust the import path as necessary

declare global {
    namespace Express {
        interface Request {
            user?: User;  // Now available in all request objects across your app
        }
    }
}
