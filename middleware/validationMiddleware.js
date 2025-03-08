import { cookie, param, body, validationResult } from 'express-validator';
import {
  createAuthError,
  createBadRequestError,
  createNotFoundError
} from '../errors/custom-error.js';
import { JOB_STATUS, JOB_TYPE, USER_ROLE } from '../utils/constants.js';
import mongoose from 'mongoose';
import JobModel from '../models/Job.js';
import UserModel from '../models/User.js';

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors
          .array()
          .map((error) => error.msg)
          .join(', ');
        if (errorMessages.includes('not exist')) {
          throw createNotFoundError(errorMessages);
        }
        if (errorMessages.includes('Access denied')) {
          throw createAuthError(errorMessages);
        }
        throw createBadRequestError(errorMessages);
      }
      next();
    }
  ];
};

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) {
      throw new Error('invalid id format');
    }
    const job = await JobModel.findById(value);
    if (!job) {
      throw new Error('job does not exist');
    }
    const isAdmin = req.user.role === USER_ROLE.ADMIN;
    const isOwner = req.user.userId === job.createdBy.toString();
    if (!isAdmin && !isOwner) {
      throw new Error('Access denied');
    }
  })
]);

export const validateJobCreateInput = withValidationErrors([
  body('company').notEmpty().withMessage('company is required'),
  body('position').notEmpty().withMessage('position is required'),
  body('status')
    .default(JOB_STATUS.PENDING)
    .isIn(Object.values(JOB_STATUS))
    .withMessage('invalid status value'),
  body('jobType')
    .default(JOB_TYPE.FULL_TIME)
    .isIn(Object.values(JOB_TYPE))
    .withMessage('invalid job type')
]);

export const validateUserCreateInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('Invalid email')
    .custom(async (email) => {
      const user = await UserModel.findOne({ email });
      if (user) {
        throw new Error('Access denied');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters long')
]);

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (email) => {
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw createAuthError('Access denied');
      }
    }),
  body('password').notEmpty().withMessage('password is required')
]);

export const validateUpdateUserInput = withValidationErrors([
  body('email')
    .optional()
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (email, { req }) => {
      const user = await UserModel.findOne({ email });

      if (user && user._id.toString() !== req.user.userId) {
        throw new Error('Email already in use');
      }
    })
  // body('password').custom(() => {
  //   throw new Error('Password cannot be updated here.');
  // })
]);
