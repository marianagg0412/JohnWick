import { Router } from "express";
import {
    registerMissionController,
    getMissionsController,
    executeMissionController,
    getMissionByExecutorUsernameController
} from "../controllers/mission.controller";
import {checkUserRole, verifyTokenMiddleware} from "../middleware/login.middleware";

const router = Router();

router.post('/register', verifyTokenMiddleware, checkUserRole('AltaMesa'), registerMissionController);
router.get('/get-missions', getMissionsController);
router.get('/get-missions/:username', getMissionByExecutorUsernameController);
router.put('/execute/:id', executeMissionController);

export { router };
