import { Router } from "express";
import { CreateRuleController, GetRulesController, GetRuleByIdController, getRulesByCreatorIdController, modifyRuleController } from "../controllers/rule.controller";
import {checkUserRole, verifyTokenMiddleware} from "../middleware/login.middleware";

const router = Router();

// Rule routes
router.post('/rules', verifyTokenMiddleware, checkUserRole('AltaMesa'), CreateRuleController);
router.get('/rules', GetRulesController);
router.get('/rules/:id', GetRuleByIdController);
router.get('/rules/creator/:id', getRulesByCreatorIdController);
router.put('/rules/:id', modifyRuleController);

export { router };
