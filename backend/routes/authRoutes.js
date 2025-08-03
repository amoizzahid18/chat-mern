import express from 'express';
import { login, logout, signup } from '../controllers/authControllers.js';
const router = express.Router();

router.get('/login', login);

export default router;