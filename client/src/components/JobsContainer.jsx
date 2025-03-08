import Job from './Job';
import JobsContainerWrapper from '../assets/wrappers/JobsContainer';
import PageBtnContainer from './PageBtnContainer';
import { useAllJobsContext } from '../utils/contextServices';

const JobsContainer = () => {
  const { data } = useAllJobsContext();
  const { jobs, totalJobs, numOfPages } = data;
  if (jobs.length === 0) {
    return (
      <JobsContainerWrapper>
        <h2>No Jobs to display...</h2>
      </JobsContainerWrapper>
    );
  }
  return (
    <JobsContainerWrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => (
          <Job key={job._id} {...job} />
        ))}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </JobsContainerWrapper>
  );
};

export default JobsContainer;
