import { Router } from 'express';
import {
  getCurrentUser,
  getApplicationStats,
  updateUser
} from '../controllers/user.js';

import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';
import { authorizePermissions, checkForTestUser } from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const router = Router();

router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', [
  authorizePermissions('admin'),
  getApplicationStats
]);

router.patch(
  '/update-user',
  checkForTestUser,
  upload.single('avatar'),
  validateUpdateUserInput,
  updateUser
);

export default router;
