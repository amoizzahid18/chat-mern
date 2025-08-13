import express from 'express';
import { sendMsg, getMsgs, delMsg, editMsg, delConvo } from '../controllers/msgControllers.js';
import { protectRoute } from '../middleware/protectRoute.js';
const router = express.Router();

router.post('/dms/send/:id', protectRoute, sendMsg);
router.get('/dms/:id', protectRoute, getMsgs);
router.put('/dms/message/delete/:id', protectRoute, delMsg);
router.put('/message/edit/:id', protectRoute, editMsg); // Assuming you have an edit message route
router.put('/convo/delete/:id', protectRoute, delConvo); // Assuming you have a delete chat route
export default router;