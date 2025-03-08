import express from 'express';
import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats
} from '../controllers/jobs.js';
import { checkForTestUser } from '../middleware/auth.js';

import {
  validateJobCreateInput,
  validateIdParam
} from '../middleware/validationMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(getAllJobs)
  .post(checkForTestUser, validateJobCreateInput, createJob);

router.route('/stats').get(showStats);

router
  .route('/:id')
  .get(validateIdParam, getJob)
  .delete(checkForTestUser, validateIdParam, deleteJob)
  .patch(checkForTestUser, validateIdParam, updateJob);

export default router;
