import { Router } from "express";
import { registerSanctionController, getSanctionsController, getSanctionByIdController, updateSanctionController } from "../controllers/sanction.controller";
import { verifyTokenMiddleware, checkUserRole } from "../middleware/login.middleware";

const router = Router();

router.post('/register', verifyTokenMiddleware, checkUserRole('AltaMesa'), registerSanctionController);
router.get('/get', getSanctionsController);
router.get('/get/:id', getSanctionByIdController);
router.put('/update/:id', verifyTokenMiddleware, checkUserRole('AltaMesa'), updateSanctionController);

export { router };
