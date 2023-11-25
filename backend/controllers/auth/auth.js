import express from 'express';
import { login } from '../../services/authservice/auth.js';
import { register } from '../../services/authservice/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;