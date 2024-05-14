import { Router } from "express";
import { registerUserController, loginUserController, getUserController } from "../controllers/user.controller";
import {verifyTokenMiddleware, checkUserRole} from "../middleware/login.middleware";

const router = Router();

router.post('/register', registerUserController);
router.post('/login', loginUserController);
router.get('/', verifyTokenMiddleware, checkUserRole('AltaMesa'), getUserController);

export { router };
