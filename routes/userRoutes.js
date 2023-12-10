import express from "express";
import { loginController, registerController } from "../controllers/userController.js";

//route object
const router = express.Router();

router.post("/register", registerController);

//login controller
router.post('/login', loginController);

export default router;
