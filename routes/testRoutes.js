import express from 'express';
import { testController } from '../controllers/testController.js';

//route object
const router = express.Router();


router.get('/test', testController)

export default router