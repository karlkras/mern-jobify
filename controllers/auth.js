import { StatusCodes } from 'http-status-codes';
import UserModel from '../models/User.js';
import { USER_ROLE } from '../utils/constants.js';
import {
  hashPassword,
  comparePasswords,
  attachCookiesToResponse,
  expireCookie
} from '../utils.js';

export const register = async (req, res, next) => {
  const isFirst = (await UserModel.countDocuments()) === 0;
  req.body.role = isFirst ? USER_ROLE.ADMIN : USER_ROLE.USER;
  req.body.password = await hashPassword(req.body.password);

  await UserModel.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ msg: 'User created.' });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  await comparePasswords(password, user.password);
  attachCookiesToResponse({ name: 'token', res, user });
  res.status(StatusCodes.OK).json({ msg: 'Successful Login' });
};

export const logout = (req, res) => {
  expireCookie({ name: 'token', res });
  res.status(StatusCodes.OK).json({ msg: 'successfully logged out' });
};

//const token = user.generateToken();
//const { name, lastName, email, location } = user;
// res
//   .status(StatusCodes.CREATED)
//   .json({ user: { name, lastName, email, location, token } });
// res
//   .status(StatusCodes.CREATED)
//   .json({ user: { name, lastName, email, location } });

// export const updateUser = async (req, res, next) => {
//   const { email, name, lastName, location } = req.body;
//   if (!email && !name && !lastName && !location) {
//     throw createBadRequestError('nothing to update');
//   }

//   const {
//     user: { userId }
//   } = req;

//   const user = await UserModel.findOne({ _id: userId });
//   user.location = location ?? user.location;
//   user.lastName = lastName ?? user.lastName;
//   user.name = name ?? user.name;
//   user.email = email ?? user.email;

//   await user.save();
//   const token = user.generateToken();

//   res.status(StatusCodes.OK).json({
//     user: {
//       name: user.name,
//       lastName: user.lastName,
//       location: user.location,
//       email: user.email,
//       token
//     }
//   });
// };
