import express from 'express';
import { login, logout, signup, } from '../controllers/authControllers.js';
const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/logout', logout);


export default router;