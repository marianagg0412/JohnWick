import { Router } from "express";
import { registerSanctionController, getSanctionsController, getSanctionByIdController, updateSanctionController } from "../controllers/sanction.controller";
import { verifyTokenMiddleware, checkUserRole } from "../middleware/login.middleware";

const router = Router();

router.post('/sanctions', verifyTokenMiddleware, checkUserRole('AltaMesa'), registerSanctionController);
router.get('/sanctions', getSanctionsController);
router.get('/sanctions/:id', getSanctionByIdController);
router.put('/sanctions/:id', verifyTokenMiddleware, checkUserRole('AltaMesa'), updateSanctionController);

export { router };
