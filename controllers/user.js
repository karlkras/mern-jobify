import { StatusCodes } from 'http-status-codes';
import UserModel from '../models/User.js';
import JobModel from '../models/Job.js';
import cloudinary from 'cloudinary';
import { formatImage } from '../middleware/multer.js';

export const getCurrentUser = async (req, res) => {
  const user = (await UserModel.findById(req.user.userId)).toJSON();
  res.status(StatusCodes.OK).json({ user });
};

export const getApplicationStats = async (req, res) => {
  const jobCount = await JobModel.countDocuments();
  const userCount = await UserModel.countDocuments();
  res.status(StatusCodes.OK).json({ jobs: jobCount, users: userCount });
};

export const updateUser = async (req, res) => {
  const updatedUser = { ...req.body };

  delete updatedUser.password;
  delete updatedUser.role;
  if (req.file) {
    const formFile = formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(formFile);
    updatedUser.avatar = response.secure_url;
    updatedUser.avatarPublicId = response.public_id;
  }

  const originalUser = await UserModel.findByIdAndUpdate(
    req.user.userId,
    updatedUser
  );
  if (req.file && originalUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(originalUser.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ msg: 'user updated' });
};
