import express from 'express';
import { sendMsg, getMsgs } from '../controllers/msgControllers.js';
import { protectMsg } from '../middleware/protectMsg.js';
const router = express.Router();

router.post('/send/:id', protectMsg, sendMsg);
router.get('/dms/:id', protectMsg, getMsgs);


export default router;