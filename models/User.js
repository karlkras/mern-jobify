import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { USER_ROLE } from '../utils/constants.js';

dotenv.config();

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: 'lastname'
  },
  location: {
    type: String,
    trim: true,
    maxlength: 20,
    default: 'my city'
  },
  role: {
    type: String,
    enum: Object.values(USER_ROLE),
    default: USER_ROLE.USER
  },
  avatar: String,
  avatarPublicId: String
});

// userSchema.pre('save', async function () {
//   if (!this.isModified('password')) return;
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// userSchema.methods.generateToken = function () {
//   return jwt.sign(
//     { userId: this._id, name: this.name },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: process.env.JWT_TOKEN_EXPIRATION
//     }
//   );
// };

// userSchema.methods.comparePassword = async function (providedPassword) {
//   return await bcrypt.compare(providedPassword, this.password);
// };
userSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model('User', userSchema);
