import { Router } from "express";
import { registerMissionController, getMissionByExecutorIdController, getMissionsController, executeMissionController } from "../controllers/mission.controller";

const router = Router();

// Mission routes
router.post('/missions', registerMissionController);
router.get('/missions', getMissionsController);
router.get('/missions/:id', getMissionByExecutorIdController);
router.put('/missions/:id', executeMissionController);

export { router };
