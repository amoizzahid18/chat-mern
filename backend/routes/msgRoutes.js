import express from 'express';
import { sendMsg, getMsgs } from '../controllers/msgControllers.js';
import { protectRoute } from '../middleware/protectRoute.js';
const router = express.Router();

router.post('/send/:id', protectRoute, sendMsg);
router.get('/dms/:id', protectRoute, getMsgs);


export default router;