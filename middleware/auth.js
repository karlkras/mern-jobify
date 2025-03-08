import {
  createAuthError,
  createBadRequestError,
  createForbiddenError
} from '../errors/custom-error.js';
import dotenv from 'dotenv';
import { manageJWT } from '../utils.js';

dotenv.config();

const auth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw createAuthError('Access denied');
  }
  manageJWT({ token, req });
  next();
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw createForbiddenError('Access denied');
    }
    next();
  };
};

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw createBadRequestError('Test user is read only');
  }
  next();
};

export default auth;
