import { Router } from "express";
import {
    CreateRuleController,
    GetRulesController,
    GetRuleByIdController,
    modifyRuleController, getRulesByCreatorIdController
} from "../controllers/rule.controller";
import {checkUserRole, verifyTokenMiddleware} from "../middleware/login.middleware";

const router = Router();

// Rule routes
router.post('/create', verifyTokenMiddleware, checkUserRole('AltaMesa'), CreateRuleController);
router.get('/get', GetRulesController);
router.get('/get/:id', GetRuleByIdController);
router.get('/get-creator/:id', getRulesByCreatorIdController);
router.put('/modify/:id',verifyTokenMiddleware, checkUserRole('AltaMesa'), modifyRuleController);

export { router };
