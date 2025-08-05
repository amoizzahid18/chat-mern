import express from 'express';
import { getUsersForSidebar } from '../controllers/userControllers.js';
import { deleteAccount } from '../controllers/userControllers.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/', protectRoute, getUsersForSidebar);
router.delete('/delete-account', protectRoute, deleteAccount);
export default router;