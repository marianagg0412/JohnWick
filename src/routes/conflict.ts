import { Router } from "express";
import {verifyTokenMiddleware, checkUserRole} from "../middleware/login.middleware";
import {
    getConflictByIdController,
    getConflictsController,
    registerConflictController, resolveConflictController
} from "../controllers/conflict.controller";

const router = Router();

router.post('/register-conflict', verifyTokenMiddleware, checkUserRole('AltaMesa'), registerConflictController);
router.get('/get', verifyTokenMiddleware, checkUserRole('AltaMesa'), getConflictsController);
router.get('/get/:id', verifyTokenMiddleware, checkUserRole('AltaMesa'), getConflictByIdController);
router.put('/resolve-conflicts/:id', verifyTokenMiddleware, checkUserRole('AltaMesa'), resolveConflictController);

export { router };
