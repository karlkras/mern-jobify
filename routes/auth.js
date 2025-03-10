import express from 'express';
import { register, login, logout } from '../controllers/auth.js';
import rateLimiter from 'express-rate-limit';
import {
  validateUserCreateInput,
  validateLoginInput
} from '../middleware/validationMiddleware.js';
const router = express.Router();

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    msg: 'Exceeded requests from this IP, please try again after 15 minutes'
  }
});

router.post('/login', apiLimiter, validateLoginInput, login);
router.post('/register', apiLimiter, validateUserCreateInput, register);
router.get('/logout', logout);

export default router;
