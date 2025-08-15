import { Router } from 'express';
import { login, register, me, updateMe, changePassword } from '../controllers/auth.controller.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();
router.post('/login', login);
router.post('/register', register);
router.get('/me', authRequired, me);
router.put('/me', authRequired, updateMe);
router.post('/change-password', authRequired, changePassword);
export default router;
