import { StatusCodes } from 'http-status-codes';
import JobModel from '../models/Job.js';
import { createBadRequestError } from '../errors/custom-error.js';
import mongoose from 'mongoose';
import day from 'dayjs';

export const getAllJobs = async (req, res) => {
  const { search, sort, status, jobType } = req.query;
  const queryObj = {
    createdBy: req.user.userId
  };
  // const queryObj = {};

  if (search) {
    queryObj.$or = [
      { position: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } }
    ];
  }

  if (status && status !== 'all') {
    queryObj.status = status;
  }

  if (jobType && jobType !== 'all') {
    queryObj.jobType = jobType;
  }

  let theJobSearch;
  if (req.user.role === 'admin') {
    delete queryObj.createdBy;
  }

  const sortOptions = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'position',
    'z-a': '-position'
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;
  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const totalJobs = await JobModel.countDocuments(queryObj);
  const numOfPages = Math.ceil(totalJobs / limit);

  // if (page > numOfPages) {
  //   throw createBadRequestError(
  //     'Page request exceeds available number of pages'
  //   );
  // }

  theJobSearch = await JobModel.find(queryObj)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, jobs: theJobSearch });
};

export const getJob = async (req, res) => {
  const job = await JobModel.findById(req.params.id);

  res.status(StatusCodes.OK).json({ job });
};

export const createJob = async (req, res, next) => {
  //req.body.jobLocation = req.body.jobLocation ?? req.params.user.location;
  const aJob = await JobModel.create({
    ...req.body,
    createdBy: req.user.userId
  });
  res.status(StatusCodes.CREATED).json({ aJob });
};

export const showStats = async (req, res) => {
  let stats = await JobModel.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);
  stats = stats.reduce((acc, cur) => {
    const { _id: title, count } = cur;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending ?? 0,
    interview: stats.interview ?? 0,
    declined: stats.declined ?? 0
  };

  let monthlyApplications = await JobModel.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 }
      }
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 }
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count
      } = item;
      const date = day()
        .month(month - 1)
        .year(year)
        .format('MMM YY');
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

//   let monthlyApplications = await JobModel.aggregate([
//     { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
//     {
//       $group: {
//         _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
//         count: { $sum: 1 }
//       }
//     },
//     { $sort: { '_id.year': -1, '_id.month': -1 } },
//     { $limit: 6 }
//   ]);

//   monthlyApplications = monthlyApplications
//     .map((item) => {
//       const {
//         _id: { year, month },
//         count
//       } = item;
//       const date = moment()
//         .month(month - 1)
//         .year(year)
//         .format('MM Y');
//       return { date, count };
//     })
//     .reverse();

//   console.log(monthlyApplications);

//   res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
// };

export const updateJob = async (req, res) => {
  const {
    body: { company, position },
    //user: { userId },
    params: { id: jobId }
  } = req;

  if (!position && !company) {
    throw createBadRequestError('Requires position and/or company to update');
  }

  const filter = {
    _id: jobId
    //createdBy: userId
  };

  //const updateItems = { company, position };
  const job = await JobModel.findOneAndUpdate(filter, req.body, {
    returnOriginal: false
  });

  res.status(StatusCodes.OK).json({ job });
};

export const deleteJob = async (req, res, next) => {
  const {
    //user: { userId },
    params: { id: jobId }
  } = req;

  const filter = {
    _id: jobId
    //createdBy: userId
  };

  const job = await JobModel.findOneAndDelete(filter);

  res.status(StatusCodes.OK).send('Job Deleted');
};
