import { readFile } from 'fs/promises';
import connectDB from './db/connect.js';
import dotenv from 'dotenv';
dotenv.config();

// first build the data...

import JobModel from './models/Job.js';
import UserModel from './models/User.js';

try {
  connectDB(process.env.MONGO_URI);
  const user = await UserModel.findOne({ email: 'karl@gmail.com' });
  // const user = await UserModel.findOne({ email: 'test@test.com' });

  const jsonJobs = JSON.parse(
    await readFile(new URL('./utils/mockData.json', import.meta.url))
  );
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id };
  });

  await JobModel.deleteMany({ createdBy: user._id });
  await JobModel.create(jobs);
  console.log('Success!!!');
  process.exit(0);
  console.log(jobs);
} catch (err) {}
