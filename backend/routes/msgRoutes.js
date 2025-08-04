import express from 'express';
import { sendMsg } from '../controllers/msgControllers.js';
import { protectMsg } from '../middleware/protectMsg.js';
const router = express.Router();

router.post('/send/:id', protectMsg, sendMsg);


export default router;