import express from 'express';
import { authLoginRoute } from '../controllers/authControllers.js';
const router = express.Router();

router.get('/login', authLoginRoute);

export default router;