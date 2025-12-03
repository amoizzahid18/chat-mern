import express from 'express';
import { login, logout, signup, validate } from '../controllers/authControllers.js';
import protectRoute from '../middleware/protectRoute.js';
const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/logout', protectRoute,logout);
router.get("/validate", protectRoute, validate);

export default router;