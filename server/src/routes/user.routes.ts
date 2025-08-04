import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  loginUser,
  logoutUser,
  getCurrentUser,
} from '../controllers/user.controller';

import { authenticate } from '../middleware/auth'; // ✅ add this

const router = Router();

router.get('/', getAllUsers);
router.post('/register', createUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);  // logout route

// ✅ Add this protected route
router.get('/me', authenticate, getCurrentUser);

export default router;
