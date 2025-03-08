import JobInfoWrapper from '../assets/wrappers/JobInfo';

const JobInfo = ({ icon, text }) => {
  return (
    <JobInfoWrapper>
      <span className="job-icon">{icon}</span>
      <span className="job-text">{text}</span>
    </JobInfoWrapper>
  );
};

export default JobInfo;
