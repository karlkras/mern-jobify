import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';

dotenv.config();

const jobSchema = new mongoose.Schema(
  {
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.FULL_TIME
    },
    company: String,
    position: String,
    status: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.PENDING
    },
    jobLocation: {
      type: String,
      trim: true,
      maxlength: 40,
      default: 'my city'
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user']
    }
  },
  { timestamps: true }
);

export default mongoose.model('Job', jobSchema);
