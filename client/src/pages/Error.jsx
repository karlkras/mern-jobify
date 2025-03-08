import { Link, useRouteError } from 'react-router-dom';
import ErrorWrapper from '../assets/wrappers/ErrorPage';
import img404 from '../assets/images/not-found.svg';
const Error = () => {
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <ErrorWrapper>
        <div>
          <img src={img404} alt="not found" />
          <h3>Page not found</h3>
          <p>We can't seem to find the page you're looking for</p>
          <Link to="/">home</Link>
        </div>
      </ErrorWrapper>
    );
  }
  return (
    <ErrorWrapper>
      <h3>Something Went Wrong!</h3>
    </ErrorWrapper>
  );
};

export default Error;
