import express from 'express';
import { register, login, logout } from '../controllers/auth.js';
import authenticateMiddleware from '../middleware/auth.js';
import testUserMiddleware from '../middleware/testUser.js';
import rateLimiter from 'express-rate-limit';
import {
  validateUserCreateInput,
  validateLoginInput
} from '../middleware/validationMiddleware.js';
const router = express.Router();

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    msg: 'Exceeded requests from this IP, please try again after 15 minutes'
  }
});

// router.post('/login', apiLimiter, login);
// router.post('/register', apiLimiter, register);
router.post('/login', validateLoginInput, login);
router.post('/register', validateUserCreateInput, register);
router.get('/logout', logout);

// router.patch(
//   "/updateUser",
//   authenticateMiddleware,
//   testUserMiddleware,
//   updateUser
// );

export default router;
